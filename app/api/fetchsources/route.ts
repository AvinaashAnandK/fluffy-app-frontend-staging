// api/fetchsources/route.ts
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    console.log("[FETCH_SOURCES_REQUEST] RAW", body);
    
    const { messages } = body;

    const { github_url, user_id, user_query } = messages;

    console.log("[FETCH_SOURCES_REQUEST]", github_url, user_id, user_query);

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!github_url || !user_query) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Construct request headers and data
    const headers = {
      'Content-Type': 'application/json'
    };
    const data = {
      github_url,
      user_id,
      user_query
    };

    // Make the POST request using axios
    const response = await axios.post(`${process.env.RETRIEVAL_BOX_ENDPOINT}/fetchdata`, data, { headers: headers });

    // Return the response from the external API
    return NextResponse.json(response.data);

  } catch (error) {
    console.log("[ERROR_IN_FETCHING_SOURCES]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
