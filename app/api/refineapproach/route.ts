import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";
export const maxDuration = 60;
export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { approach_raw } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!approach_raw) {
            return new NextResponse("Generated approaches are required", { status: 400 });
        }

        const headers = {
            'Content-Type': 'application/json'
        };
        const data = {
            "approach_raw": JSON.stringify(approach_raw.data)
        };

        console.log("Constructing the payload for refined approach")
        console.log(data)

        const response = await axios.post('http://20.219.193.181/refapproachtest', data, { headers: headers });
        console.log(response)
        return NextResponse.json(response.data);

    } catch (error) {
        console.log("[ERROR_IN_REFINING_APPROACHES]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
