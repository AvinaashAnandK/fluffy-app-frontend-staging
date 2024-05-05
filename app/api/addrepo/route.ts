import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";

export const maxDuration = 60;

export async function POST(req: Request) {
    const { userId, sessionClaims } = auth();
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const headers = {
        'Content-Type': 'application/json'
    };
    const dbUpdateData = {
        userId: userId
    }

    try {
        const body = await req.json();
        const github_url = body.github_url;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!github_url) {
            return new NextResponse("Github URL is required", { status: 400 });
        }

        try {
            const checkRepoLimitUrl = `${baseUrl}/api/dbcalls/checkrepolimit`;
            const checkRepoLimitResponse = await fetch(checkRepoLimitUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(dbUpdateData)
              });
              
            if (checkRepoLimitResponse.status === 200) {
                const { canCreateRepo } = await checkRepoLimitResponse.json();
        
                if (!canCreateRepo) {
                    return new NextResponse("Limit reached, Upgrade to continue", { status: 403 });
                    // [TO-DO]: Activate Pro Modal
                }
            } else {
                return new NextResponse("Something went wrong!", { status: 500 });
            }
        } catch (error) {
            console.error('Error in fetching user limits request:', error);
            return new NextResponse("Something went wrong!", { status: 500 });
        }

        const ingestionUrl = 'https://run.mocky.io/v3/dd045df5-9078-45b1-ab76-cd47ce9a7b49';

        const user_email = sessionClaims.email;

        const ingestion_data = {
            "github_url": github_url,
            "user_id": user_email,
        };

        let data = JSON.stringify(ingestion_data)

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://20.197.51.194:80/ingestrepo',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };

        const response = await axios.request(config)

        const increaseRepoLimitUrl = `${baseUrl}/api/dbcalls/increaserepolimit`;
        await fetch(increaseRepoLimitUrl);

        try {
            const increaseRepoLimitUrl = `${baseUrl}/api/dbcalls/increaserepolimit`;
            const checkRepoLimitResponse = await fetch(increaseRepoLimitUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(dbUpdateData)
              });

            console.log(checkRepoLimitResponse)
            // if (checkRepoLimitResponse.status === 200) {
            //     // [TO-DO]: Handle error cases of db update failure
            // } else {
            //     // [TO-DO]: Handle error cases of db update failure
            // }
        } catch (error) {
            // [TO-DO]: Handle error cases of db update failure
            console.error('Error in updating user limit:', error);
        }
        return new NextResponse(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error("[ERROR_IN_INGESTREPO_ENDPOINT]", error);
        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
