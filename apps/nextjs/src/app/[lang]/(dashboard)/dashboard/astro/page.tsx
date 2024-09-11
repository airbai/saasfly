/*import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getCurrentUser } from "@saasfly/auth";

import { getChat } from '~/app/actions'
import { Chat } from '~/components/chat/chat'


export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  
  const user = await getCurrentUser();

  if (!user) {
    return {}
  }

  const chat = await getChat(params.id, user.id)
  return {
    title: chat?.title.slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const user = await getCurrentUser();

  console.log('user is :' + user?.id)
  if (!user) {
    redirect("/login")
  }

  const chat = await getChat(params.id, user.id)

  if (!chat) {
    notFound()
  }

  if (chat?.userId !== user?.id) {
    notFound()
  }

  return <Chat id={chat.id} initialMessages={chat.messages} />
}
*/

import { nanoid } from '~/lib/utils'
import { Chat } from '~/components/chat/chat'
import { AI } from '~/lib/chat/actions'
//import { auth } from '@/auth'
import { Session } from '@saasfly/auth'
import { getMissingKeys } from '~/app/actions'
import { getServerSession } from "next-auth"
import { authOptions } from "@saasfly/auth"



export default async function ChatPage() {
  const id = nanoid()
  const session = getServerSession(authOptions)
  const missingKeys = await getMissingKeys()

  return (

    <AI initialAIState={{ chatId: id, messages: [] }}>
          <Chat id={id} session={session} missingKeys={missingKeys} />
    </AI>
  )
}
