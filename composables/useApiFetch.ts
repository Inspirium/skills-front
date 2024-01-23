export function useApiFetch(url: string, options = {}) {
  const config = useRuntimeConfig()
  return $fetch(url, {
    baseURL: config.public.URL,
    headers: {
      // 'Authorization': `Bearer ${userStore.token}`,
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
    },
    parseResponse: (txt:string) => JSON.parse(txt),
    ...options,
  })
}
