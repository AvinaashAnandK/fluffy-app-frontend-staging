import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { auth } from "@clerk/nextjs"
import { chatIdGenerator, repoIdExtractor } from '@/lib/utils'

import { type Message } from 'ai'
import messageRagResponseData from './myList.json';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'


export const runtime = 'edge'
export const maxDuration = 60;

const messageRagResponse: Message[] = messageRagResponseData as Message[];
const transformedMessages = messageRagResponse.map((message): ChatCompletionMessageParam => {
  let role: 'system' | 'user' | 'assistant' | 'tool' | 'function';
  switch (message.role) {
    case 'system':
      role = 'system';
      break;
    case 'user':
      role = 'user';
      break;
    default:
      role = 'user'; 
  }
  return {
    content: message.content,
    role: role,
  };
});


const openai = new OpenAI({
  apiKey: process.env.TURBO_AZURE_KEY,
  baseURL: process.env.TURBO_FULL_ENDPOINT,
  defaultQuery: { 'api-version': process.env.TURBO_API_VERSION },
  defaultHeaders: { 'api-key': process.env.TURBO_AZURE_KEY },
});

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, chatId, repoId } = json
  let messages_fe = messages
  const { userId } = auth();
  console.log(messages_fe)
  const repoUrl = repoIdExtractor(repoId);
  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  let retrievedInfo = {};

  const data = {
    github_url: 'https://github.com/huggingface/transformers', // Replace with actual data
    user_id: 'admin',
    user_query: messages_fe[0].content
  };

  const headers = {
    'Content-Type': 'application/json'
  };
  
  try {
    const response = await fetch('http://20.193.139.202:80/fetchdata', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });
    const retrievedInfo = await response.json();
    console.log(retrievedInfo.code_sources);
    console.log(retrievedInfo.documentation_sources_list);
    console.log(retrievedInfo.download_sources);
  } catch (error) {
    console.error('Error in fetch POST request:', error);
  }

  const res = await openai.chat.completions.create({
    model: 'gpt4turbopreview',
    messages: transformedMessages,
    temperature: 0,
    stream: true
  })

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages_fe[0].content.substring(0, 100)
      const id = chatId ?? chatIdGenerator()
      const createdAt = Date.now()
      const path = `${id}/repochat/${repoId}`

      const payload = {
        chatId: id,
        title,
        userId,
        createdAt,
        path,
        repoUrl,
        repoId,
        messages: [
          ...messages_fe,
          {
            content: completion,
            role: 'assistant'
          }
        ],
        retrievedInfo: retrievedInfo
      }

      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
      const updateChatUrl = `${baseUrl}/api/dbcalls/chat/createchat`;
      const response = await fetch(updateChatUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload }), // Ensure the payload is stringified
      });
    
      const responseData = await response.json();

      if (!response.ok) {
        console.error('Failed to create or update chat:', responseData.message);
      }

    }
  })

  return new StreamingTextResponse(stream)
}