<script setup lang="ts">
import gsap from 'gsap'
import { useWindowSize } from '@vueuse/core'
import useApiFetch
  from '~/composables/useApiFetch'
import {
  nextTick,
  onUpdated
} from "vue";
const config = useRuntimeConfig()

const { $jsonSerializer } = useNuxtApp()
const router = useRouter()
const { width } = useWindowSize()
const hover = ref(null)
let t

const sectors = await $fetch('/api/v1/sectors', {
  params: {
    'filter[parent]': false,
  },
  baseURL: config.public.URL,
  headers: {
    // 'Authorization': `Bearer ${userStore.token}`,
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json',
  },
  parseResponse: txt => $jsonSerializer.deserialize('sectors', JSON.parse(txt)),
})

let currentNumber = ref(0)
let totalGreen = ref(500)
let totalDigital = ref(null)

function loadItTotalGreen() {
  useApiFetch('/api/v1/skill-types', {
    params: {
      'withCount': 'skills',
      'filter[name]': 'Zelena',
    }
  }).then((data) => {
    totalGreen.value = data.data[0].relationships.skills.meta.count
    animateNumber()
  })
}
function loadItTotalDigital() {
  useApiFetch('/api/v1/skill-types', {
    params: {
      'withCount': 'skills',
      'filter[name]': 'Digitalna',
    }
  }).then((data) => {
    totalDigital.value = data.data[0].relationships.skills.meta.count
  })
}
loadItTotalGreen()
loadItTotalDigital()

function animateNumber() {
  setInterval(() => {
    currentNumber.value = totalGreen.value;
  }, 1000);
}

onMounted(() => {
  setTimeout(() => {
    t = gsap.to('.sace', {
      duration: 0.2,
      opacity: 1,
      scale: 1,
      y: 0,
      ease: 'power1',
      stagger: 0.1,
    })
  }, 500)
})
onUnmounted(() => {
  //t.kill()
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

<style>
.count-enter-active, .count-leave-active {
  transition: all 1s;
}
.count-enter, .count-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>

<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-40">
    <div class="md:flex justify-between sm:space-x-20 md:mt-12 md:items-center">
      <div class="bounce-reverse">
        <h1 class="font-bold text-[3rem] leading-[3.5rem] md:my-0 my-6 md:text-[4.5rem] md:leading-[5rem] font-dosis text-grey-700">
          Katalog digitalnih i zelenih vještina
        </h1>
        <div class="md:flex md:space-x-2 space-y-2 items-baseline">
          <h2 class="font-semibold text-2xl md:text-2xl font-dosis md:mt-6">
            Prikaži izdvojeno:
          </h2>
          <NuxtLink class="text-white mr-3 md:mr-0 inline-block rounded-lg bg-cyan-500 sm:px-2 px-4 sm:py-1 py-2 font-semibold cursor-pointer hover:scale-110 hover:shadow-xl transition" to="/sector/digital">
            Digitalne vještine <span>({{ totalDigital }})</span>
          </NuxtLink>
          <NuxtLink class="text-white inline-block rounded-lg bg-lime-500 sm:px-2 px-4 sm:py-1 py-2 font-semibold cursor-pointer hover:scale-110 hover:shadow-xl transition" to="/sector/green">
            Zelene vještine <transition easing="ease-in-out"><span>({{ totalGreen }})</span></transition>
          </NuxtLink>
        </div>
      </div>
      <p class="max-w-xl text-left sm:text-right md:mt-0 mt-10">
        <span class="text-cyan-500 font-bold text-2xl font-dosis">Vještine</span>  predstavljaju primjenu znanja i upotrebu propisanih načina rada u izvršenju zadaća i rješavanju problema. U Hrvatskome kvalifikacijskom okviru vještine se dijele na kognitivne (logičko, intuitivno i kreativno razmišljanje) i psihomotoričke (fizička spretnost te upotreba metoda, instrumenata, alata i materijala).
        Standardi zanimanja, skupovi kompetencija, standardi kvalifikacija, skupovi ishodi učenja i obrazovni programi svrstavaju se u sektore utvrđene za potrebe provedbe Hrvatskoga kvalifikacijskog okvira.
      </p>
    </div>
    <div v-if="sectors.length">
      <div v-if="lineBreak > 2" class="flex-wrap mt-12 flex">
        <div v-for="(item, index) in sectors" :key="index" :class="[hover === index ? 'activecell bounce' : 'bounce-reverse', index % lineBreak ? '' : 'ml-[6.8rem]']" class="-mr-[3.2rem] w-[270px] h-[240px] relative -mb-[3.2rem] opacity-0 scale-50 translate-y-[100px] cursor-pointer transition sace" @click="router.push(`/sector/${item.id}`)" @mouseover="hover = index" @mouseleave="hover = null">
          <h3 class="z-10 w-3/5 absolute text-center hex-text-center font-roboto font-medium text-lg text-gray-800 leading-6 -mt-3 transition">
            {{ item.name }}
          </h3>
          <font-awesome-icon v-if="item.color" class="absolute hex-icon w-10 h-10 " :color="hover !== index ? `#${item.color}` : '#ffffff'" :icon="item.icon" />
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
            {{ item.name }}          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
