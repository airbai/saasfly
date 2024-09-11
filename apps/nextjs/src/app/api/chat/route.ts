import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { nanoid } from '~/lib/utils'
import { authOptions } from "@saasfly/auth"

//export const runtime = 'edge'

async function createCompletion(apiUrl: string, apiKey: string, model: string, messages: any[], temperature: number) {
  console.log(apiUrl)
  console.log(apiKey)
  console.log(model)

    const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      stream: true,
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response
}

export async function POST(req: NextRequest) {
  const json = await req.json()
  const { messages, previewToken } = json
  console.log("messages:" + JSON.stringify(json));

  const session = await getServerSession(authOptions)
console.log("user id :" + session?.user.id);
  /*if (process.env.VERCEL_ENV !== 'preview') {
    if (session == null) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
  }*/

  const apiUrl = process.env.GPT_API_BASE_URL as string
  const apiKey = process.env.GPT_API_KEY as string
  const model = process.env.GPT_API_MODEL as string

  try {
    const response = await createCompletion(apiUrl, previewToken || apiKey, model, messages, 0.7)

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        if (!reader) {
          controller.close()
          return
        }

        let completion = ''
        /*while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = new TextDecoder().decode(value)
          
          controller.enqueue(chunk)
          completion += chunk
        }*/
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n').filter(line => line.trim() !== '');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const jsonData = JSON.parse(line.slice(5));
                if (jsonData.choices && jsonData.choices.length > 0) {
                  const content = jsonData.choices[0].delta?.content || '';
                  controller.enqueue(content);
                  completion += content;
                }
              } catch (error) {
                console.error('Error parsing JSON:', error);
                // Skip this line if it's not valid JSON
              }
            }
          }
        }
  

        controller.close()

        // Save the chat
        const title = json.messages[0].content.substring(0, 100)
        const userId = session?.user.id
        if (userId) {
          const id = json.id ?? nanoid()
          const createdAt = Date.now()
          const path = `/dashboard/astro/chat/${id}`
          const payload = {
            id,
            title,
            userId,
            createdAt,
            path,
            messages: [
              ...messages,
              { content: completion, role: 'assistant' }
            ]
          }
          await kv.hmset(`chat:${id}`, payload)
          await kv.zadd(`user:chat:${userId}`, { score: createdAt, member: `chat:${id}` })
        }
      }
    })

    return new NextResponse(stream)
  } catch (error) {
    console.error('Error:', error)
    return new NextResponse('An error occurred', { status: 500 })
  }
}