<script setup lang="ts">

import {ref} from 'vue'

const router = useRouter()
const route = useRoute()

const { $jsonSerializer } = useNuxtApp()

const sectors = ref([])
function loadIt() {
  useApiFetch(`/api/v1/sectors/${route.params.id}`, {
    params: {
      'include': 'subsectors',
      'with': 'skills'
    },
  }).then((data) => {
    sectors.value = $jsonSerializer.deserialize('sectors', data.data.value)
  })
}
loadIt()

const hover = ref(null)


</script>

<template>
  <div v-if="Object.keys(sectors).length" class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <!--    <font-awesome-icon icon="tree"></font-awesome-icon>-->
    <div class="flex justify-between text-white items-end mt-12">
      <div class="">
        <h1 class="font-semibold sm:text-[5rem] font-dosis">Podgrupe vještine</h1>
      </div>
      <p class="max-w-xl text-right"><span class="text-cyan-400 font-bold text-2xl font-dosis">{{ sectors.name }} </span> prikazuju grupe sličnih specijalističkih zadataka. Specijalistički zadaci osmišljeni su tako da opisuju svakodnevni rad unutar zanimanja. Ovi zadaci su uglavnom prenosivi – ako možete obaviti jedan zadatak u klasteru, možete obaviti i ostale.
      </p>
    </div>
    <div class="flex mt-12">
      <div @click="router.push('/')" class="relative flex cursor-pointer self-start group">
        <h3 class="z-10 w-3/5 absolute text-center hex-text-center font-roboto font-medium text-2xl leading-8 transition text-white flex flex-col items-center justify-center">{{ sectors.name }}
          <font-awesome-icon class="w-14 h-14 mt-5 transition group-hover:hidden" color="#ffffff" :icon="sectors.icon" />
          <font-awesome-icon class="w-14 h-14 mt-5 transition hidden group-hover:flex" color="#ffffff" icon="arrow-left-long" />
        </h3>
        <svg class="dropshadow subhexmain" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="380px" viewBox="0 0 141.74 162.98" xml:space="preserve">
          <polygon fill-rule="evenodd" clip-rule="evenodd" :fill="`#${sectors.color}`" class="text-white transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "/>
          <path fill-rule="evenodd" clip-rule="evenodd" :fill="`#${sectors.color}`" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"/>
        </svg>
      </div>

      <div v-if="sectors.subsectors.length" class="flex flex-wrap subhexlist">
        <div v-for="(item, index) in sectors.subsectors" :class="hover === index ? 'activecell bounce' : 'bounce-reverse', index === 0 || index === 10 || index === 20 ? 'ml-[6.8rem]' : ''" class="-mr-[3.2rem] w-[270px] h-[240px] relative -mb-[3.2rem] cursor-pointer transition sace" @mouseover="hover = index" @mouseleave="hover = null" @click="router.push(`/sector/subsector/${item.id}`)">
          <h3 class="z-10 w-3/5 absolute text-center hex-text-center font-roboto font-medium text-lg text-gray-800 leading-6 -mt-3 transition">{{ item.name }}</h3>
          <svg class="dropshadow z-20" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="270px" height="240px" viewBox="0 0 141.74 162.98" xml:space="preserve">
            <polygon fill-rule="evenodd" clip-rule="evenodd" :fill="hover === index ? `#${sectors.color}` : '#ffffff'" class="text-white transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "/>
            <path fill-rule="evenodd" clip-rule="evenodd" :fill="`#${sectors.color}`" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"/>
        </svg>
        </div>
      </div>
      <div v-else class="w-full">
        <div v-for="(item, index) in sectors.skills" class="text-white font-dosis ml-16 ">
          <div v-if="index === 0" class="container mt-8">
            <div class="border-bottom-das"></div>
          </div>
          <h2 class="text-4xl font-semibold pt-3" :style="`color:#${sectors.color}`">{{ item.name }}</h2>
          <h3 class="text-2xl font-normal py-3">{{ item.description }}</h3>
          <ul class="font-roboto flex space-x-4 text-lg">
            <li class="text-gray-500">Tip vještine: <span class="font-medium text-white">{{ item.skill_level_id }}</span></li>
            <li class="text-gray-500">Razina vještine: <span class="font-medium text-white">{{ item.skill_type_id }}</span></li>
            <li class="text-gray-500">Izvor: <span class="font-medium text-white">{{ item.source_id }}</span></li>
          </ul>
        </div>

      </div>
    </div>
  </div>

</template>
