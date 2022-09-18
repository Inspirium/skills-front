<script setup>
import gsap from 'gsap'
import { useWindowSize } from '@vueuse/core'

const { $jsonSerializer } = useNuxtApp()
const router = useRouter()
const { width } = useWindowSize()
const hover = ref(null)
let t

const { data: sectors } = await useApiFetch('/api/v1/sectors', {
  params: {
    'filter[parent]': false,
  },
  parseResponse: txt => $jsonSerializer.deserialize('sectors', JSON.parse(txt)),
})

onMounted(() => {
  t = gsap.to('.sace', {
    duration: 0.2,
    opacity: 1,
    scale: 1,
    y: 0,
    ease: 'power1',
    stagger: 0.1,
  })
})

onUnmounted(() => {
  t.kill()
})

const lineBreak = computed(() => {
  let b
  if (width.value < 450)
    b = 2

  if (width.value > 450)
    b = 3

  if (width.value > 580)
    b = ((width.value - 580) / 234 >> 0) * 2 + 4

  if (b > 10)
    b = 10

  return b
})

</script>
<template>
  <div v-if="lineBreak > 2" class="flex-wrap mt-12 flex">
    <div v-for="(item, index) in sectors" :key="index" :class="[hover === index ? 'activecell bounce' : 'bounce-reverse', index % lineBreak ? '' : 'ml-[6.8rem]']" class="-mr-[3.2rem] w-[270px] h-[240px] relative -mb-[3.2rem] opacity-0 scale-50 translate-y-[100px] cursor-pointer transition sace" @click="router.push(`/sector/${item.id}`)" @mouseover="hover = index" @mouseleave="hover = null">
      <h3 class="z-10 w-3/5 absolute text-center hex-text-center font-roboto font-medium text-lg text-gray-800 leading-6 -mt-3 transition">
        {{ item.name }}
      </h3>
      <font-awesome-icon class="absolute hex-icon w-10 h-10 " :color="hover !== index ? `#${item.color}` : '#ffffff'" :icon="item.icon" />
      <svg
        class="dropshadow z-20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="270px" height="240px" viewBox="0 0 141.74 162.98" xml:space="preserve"
      >
        <polygon
          fill-rule="evenodd" clip-rule="evenodd" :fill="hover === index ? `#${item.color}` : '#ffffff'" class="text-grey-700 transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "
        />
        <path
          fill-rule="evenodd" clip-rule="evenodd" :fill="`#${item.color}`" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"
        />
      </svg>
    </div>
  </div>
  <div v-if="lineBreak <= 2" class="flex flex-col mt-12">
    <div v-for="(item, index) in sectors" :key="index" :class="[index % 2 ? '-mt-4' : 'ml-[2rem] -mt-4']" class="h-[120px] relative opacity-0 scale-50 translate-y-[100px] cursor-pointer transition sace flex items-center relative" @click="router.push(`/sector/${item.id}`)">
      <div class="w-[100px] flex justify-center items-center">
        <font-awesome-icon class="absolute z-10 w-10 h-10 z-50" :color="hover !== index ? `#${item.color}` : '#ffffff'" :icon="item.icon" />
        <svg
          class="dropshadow z-20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="100px" height="120px" viewBox="0 0 141.74 162.98" xml:space="preserve"
        >
          <polygon
            fill-rule="evenodd" clip-rule="evenodd" :fill="hover === index ? `#${item.color}` : '#ffffff'" class="text-grey-700 transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "
          />
          <path
            fill-rule="evenodd" clip-rule="evenodd" :fill="`#${item.color}`" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"
          />
        </svg>
      </div>
      <h3 class="z-10 font-roboto font-medium text-lg text-gray-800 leading-6 transition ml-4">
        {{ item.name }}
      </h3>
    </div>
  </div>
</template>
