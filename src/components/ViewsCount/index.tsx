'use client'

import { useEffect } from 'react'
import useSWR from 'swr'

type Props = { slug: string; trackView?: boolean; views?: string }

async function fetcher<JSON>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const response = await fetch(input, init)

  return response.json()
}

const ViewsCount = ({ slug, trackView = false, views }: Props) => {
  const { data, mutate } = useSWR<{ views: Record<string, string> }>(
    '/api/views',
    fetcher,
    views
      ? {
          fallbackData: { views: { [slug]: views } },
        }
      : undefined,
  )

  useEffect(() => {
    if (slug && trackView) {
      fetch(`/api/views/${slug}`, { method: 'POST' })
        .then((response) => response.json())
        .then((payload: Record<string, string>) => {
          mutate({
            views: {
              ...data?.views,
              ...payload,
            },
          })
        })
    }
  }, [slug, trackView])

  return <>{data?.views?.[slug]}</>
}

export default ViewsCount
