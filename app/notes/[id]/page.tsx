import { getSingleNote } from '@/lib/api'
import NoteDetailsClient from './NoteDetails.client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ noteId: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { noteId } = await params
  const data = await getSingleNote(noteId)

  return {
    title: data.title.slice(0, 8),
    description: data.content.slice(0, 10),
    openGraph: {
      title: data.title.slice(0, 8),
      description: 'qwerty',
    },
  }
}

const NoteDetails = async ({ params }: Props) => {
  const { noteId } = await params

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => getSingleNote(noteId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  )
}

export default NoteDetails