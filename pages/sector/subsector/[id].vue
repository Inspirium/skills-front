<script setup lang="ts">

import {ref} from 'vue'
import gsap from 'gsap'


const router = useRouter()
const route = useRoute()

const { $jsonSerializer } = useNuxtApp()

const sectors = ref([])
function loadIt() {
  useApiFetch(`/api/v1/sectors/${route.params.id}`, {
    params: {
      'include': 'subsectors,parent',
      'with': 'skills'
    },
  }).then((data) => {
    sectors.value = $jsonSerializer.deserialize('sectors', data.data.value)
  })
}
loadIt()

const hover = ref(null)

function showslow1() {
  gsap.from('.test', {
    duration: 0.5,
    opacity: 0,
    scale: 0,
    y: 200,
    ease: 'power1',
    stagger: {
      from: 'edges',
      each: 0.1
    }
  })
}
showslow1()

function source(item) {
  switch (item) {
    case 1:
      return 'Registar HKO'
      break
    case 2:
      return 'Registar HKO'
      break
  }
}

</script>

<template>
  <div v-if="Object.keys(sectors).length" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!--    <font-awesome-icon icon="tree"></font-awesome-icon>-->
    <div class="flex justify-between sm:flex-row flex-col text-grey-700 sm:items-end items-start mt-6">
      <div class="block sm:hidden mx-auto">
        <div @click="router.back()" class="relative flex cursor-pointer self-start group">
          <h3 class="z-10 w-3/5 absolute text-center hex-text-center font-roboto font-medium text-xl leading-6 transition text-white flex flex-col items-center justify-center">{{ sectors.name }}
            <font-awesome-icon class="w-14 h-14 mt-5" color="#ffffff" icon="arrow-left-long" />
          </h3>
          <svg class="dropshadow" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="270px" height="220px" viewBox="0 0 141.74 162.98" xml:space="preserve">
          <polygon fill-rule="evenodd" clip-rule="evenodd" :fill="`#${sectors.parent.color}`" class="text-grey-700 transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "/>
            <path fill-rule="evenodd" clip-rule="evenodd" :fill="`#${sectors.parent.color}`" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"/>
          </svg>
        </div>

      </div>

      <div class="sm:flex justify-between items-center text-center sm:space-x-8 w-full">
        <h1 class="font-semibold sm:text-[5rem] text-[2.5rem] font-dosis fly-in mb-4">Vještine</h1>
<!--        <p class="max-w-xl sm:text-right "><span :style="`color:#${sectors.parent.color}`" class="font-bold text-2xl font-dosis">{{ sectors.name }} </span> prikazuju grupe sličnih specijalističkih zadataka. Specijalistički zadaci osmišljeni su tako da opisuju svakodnevni rad unutar zanimanja. Ovi zadaci su uglavnom prenosivi – ako možete obaviti jedan zadatak u klasteru, možete obaviti i ostale.-->
<!--        </p>-->
      </div>
    </div>
    <div class="flex sm:mt-12 mt-6 mb-20">
      <div @click="router.push(`/sector/${sectors.parent.id}`)" class="relative sm:flex cursor-pointer self-start hidden">
        <h3 class="z-10 w-3/5 absolute text-center hex-text-center font-roboto font-medium text-2xl leading-8 transition text-white flex flex-col items-center justify-center">{{ sectors.name }}
          <font-awesome-icon class="w-14 h-14 mt-5" color="#ffffff" icon="arrow-left-long" />
        </h3>
        <svg class="dropshadow subhexmain" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="300px" height="380px" viewBox="0 0 141.74 162.98" xml:space="preserve">
          <polygon fill-rule="evenodd" clip-rule="evenodd" :fill="`#${sectors.parent.color}`" class="text-grey-700 transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "/>
          <path fill-rule="evenodd" clip-rule="evenodd" :fill="`#${sectors.parent.color}`" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"/>
        </svg>
      </div>
      <div class="w-full">
        <div v-for="(item, index) in sectors.skills" @click="$router.push(`/sector/skill/${item.id}`)" class="font-dosis sm:ml-16 cursor-pointer group test">
          <div v-if="index !== 0" class="container mt-2">
            <div class="border-bottom-das"></div>
          </div>
          <h2 class="text-2xl sm:text-3xl font-semibold pt-3 group-hover:scale-105 origin-left transition text-gray-800">{{ item.name }}</h2>
          <div class="flex space-x-4 items-center">
            <h3 class="sm:text-lg text-lg font-normal py-1 sm:py-2 text-grey-700"><span class="font-semibold uppercase text-base">Izvor: </span>{{ source(item.source_id) }}</h3>
            <h3 class="text-sm font-normal px-2 py-[1px] whitespace-nowrap rounded-md text-white uppercase" :class="item.skill_type_id === 1 ? 'bg-lime-600' : 'bg-cyan-500'">{{ item.skill_type_id === 1 ? 'Zelena' : 'Digitalna' }} vještina</h3>
          </div>
          <ul v-if="false" class="font-roboto flex space-x-4 text-lg">
            <li class="text-gray-500">Tip vještine: <span class="font-medium text-grey-700">{{ item.skill_level_id }}</span></li>
            <li class="text-gray-500">Razina vještine: <span class="font-medium text-grey-700">{{ item.skill_type_id }}</span></li>
            <li class="text-gray-500">Izvor: <span class="font-medium text-grey-700">{{ item.source_id }}</span></li>
          </ul>
        </div>
      </div>

    </div>

  </div>

</template>
