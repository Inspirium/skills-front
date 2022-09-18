// import { useUserStore } from "~/stores/user";

const useApiFetch = async(url: string, options) => {
  const config = useRuntimeConfig()
  /* const userStore = useUserStore()
  const router = useRouter()
  if (!userStore.token) {
    router.push('/login')
    return
  } */
      return await $fetch(url, {
        baseURL: config.URL,
        headers: {
          // 'Authorization': `Bearer ${userStore.token}`,
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json',
        },
        parseResponse: txt => JSON.parse(txt),
        ...options,
      })
}

export default useApiFetch
