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

        const response = await axios.get('http://20.193.139.202:80/bulkfetchrepolist');

        // console.log(response)
        return NextResponse.json(response.data);

    } catch (error) {
        // console.log("Error in fetching ingested repo list", error);
        return new NextResponse("Something went wrong: Unable to fetch ingested repo list", { status: 500 });
    }
}
