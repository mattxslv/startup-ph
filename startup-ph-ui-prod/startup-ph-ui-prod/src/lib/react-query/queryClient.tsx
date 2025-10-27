import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 2 * 60 * 1000, // Default: Cache for 2 minutes
      cacheTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
    }
  }
})

export default queryClient
