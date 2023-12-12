"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { trpcReact } from "@/trpc/client";
import { httpBatchLink } from "@trpc/client";

const Providers = ({children} : PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => trpcReact.createClient({
    links: [
      httpBatchLink({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: 'include'
          })
        }
      })
    ]
  }));

  return (
  <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </trpcReact.Provider>
  )
}

export default Providers;