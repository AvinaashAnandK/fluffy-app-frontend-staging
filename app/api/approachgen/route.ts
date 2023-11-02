import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!messages) {
            return new NextResponse("Query is required", { status: 400 });
        }

        // Construct request headers and data
        const headers = {
            'Content-Type': 'application/json'
        };
        const data = {
            "input_query": messages  // Use the messages value for input_query
        };

        // Make the POST request using axios
        const response = await axios.post('http://20.219.193.181/genapproach', data, { headers: headers });

        // Return the response from the external API
        return NextResponse.json(response.data);

    } catch (error) {
        console.log("[ERROR_IN_APPROACH_GENERATION]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
