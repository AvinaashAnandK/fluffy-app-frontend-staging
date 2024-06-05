import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";
export const maxDuration = 60;

export async function GET(req: Request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const response = await axios.get(`${process.env.REPO_INGESTION_BOX_ENDPOINT}/bulkfetchrepolist`);
        return NextResponse.json(response.data);

    } catch (error) {
        return new NextResponse("Something went wrong: Unable to fetch ingested repo list", { status: 500 });
    }
}
