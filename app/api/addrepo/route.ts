import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";
import { checkRepoLimits, updateRepoLimit } from "@/lib/mongodbcalls";

export const maxDuration = 180;

// [TODO]
export async function POST(req: Request) {
    const { userId, sessionClaims } = auth();
    const user = await currentUser();

    try {
        const body = await req.json();
        const github_url = body.github_url;
        const userEmail: string = (sessionClaims?.email as string) || "";

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!github_url) {
            return new NextResponse("Github URL is required", { status: 400 });
        }

        try {
            const limitCheck = await checkRepoLimits(userId, userEmail);

            if (limitCheck?.limitExceeded) {
                return new NextResponse("User limits exceeded", { status: 403 });
            }

        } catch (error) {
            console.error('Error in fetching user limits request:', error);
            return new NextResponse("Something went wrong!", { status: 500 });
        }

        const ingestion_data = {
            "github_url": github_url,
            "user_id": userId || userEmail,
            "user_name": `${user.firstName}` || sessionClaims?.fullName || "there",
            "user_email": user.emailAddresses[0].emailAddress || userEmail,
        };

        let data = JSON.stringify(ingestion_data)

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REPO_INGESTION_BOX_ENDPOINT}/ingestrepo`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };

        const response = await axios.request(config)

        try {
            const updateLimitResponse = await updateRepoLimit(userId);
        } catch (error) {
            console.error('Error in updating user limit:', error);
        }

        
        return new NextResponse(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error("[ERROR_IN_INGESTREPO_ENDPOINT]", error);
        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
