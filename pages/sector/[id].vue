<script setup lang="ts">

import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

const { $jsonSerializer } = useNuxtApp()
const sectors = await useApiFetch(`/api/v1/sectors/${route.params.id}`, {
    params: {
      include: 'subsectors',
      with: 'skills',
    },
    parseResponse: txt => $jsonSerializer.deserialize('sectors', JSON.parse(txt)),
  })
const hover = ref(null)

function source(item) {
  switch (item) {
    case 1:
      return 'Registar HKO'
    case 2:
      return 'ESCO'
  }
}

onMounted(() => {
  window.scrollTo(0, 0)
})

</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!--    <font-awesome-icon icon="tree"></font-awesome-icon>-->
    <div class="flex justify-between sm:flex-row flex-col text-grey-700 sm:items-end items-start mt-6">
      <div class="block sm:hidden mx-auto">
        <div class="relative flex cursor-pointer self-start group" @click="router.push('/')">
          <h3 class="z-10 w-3/5 absolute text-center hex-text-center font-roboto font-medium text-xl leading-6 transition text-white flex flex-col items-center justify-center">
            {{ sectors.name }}
            <font-awesome-icon class="w-10 h-10 mt-2 transition group-hover:hidden transition" color="#ffffff" :icon="sectors.icon" />
          </h3>
          <svg id="Layer_1" class="dropshadow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="270px" height="220px" viewBox="0 0 141.74 162.98" xml:space="preserve">
            <polygon
              fill-rule="evenodd" clip-rule="evenodd" :fill="`#${sectors.color}`" class="text-grey-700 transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "
            />
            <path
              fill-rule="evenodd" clip-rule="evenodd" :fill="`#${sectors.color}`" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"
            />
          </svg>
        </div>
      </div>
      <div class="sm:flex justify-between items-center text-center sm:space-x-8 w-full">
        <h1 class="font-semibold sm:text-[5rem] text-[2.5rem] font-dosis fly-in mb-4">
          Podsektori
        </h1>
        <!--        <p class="max-w-xl sm:text-right "><span :style="`color:#${sectors.color}`" class="font-bold text-2xl font-dosis">{{ sectors.name }} </span> prikazuju grupe sličnih specijalističkih zadataka. Specijalistički zadaci osmišljeni su tako da opisuju svakodnevni rad unutar zanimanja. Ovi zadaci su uglavnom prenosivi – ako možete obaviti jedan zadatak u klasteru, možete obaviti i ostale.-->
        <!--        </p>-->
      </div>
    </div>
    <!--    desktop-->
    <div class="mt-6 mb-28 hidden sm:flex">
      <div class="relative flex cursor-pointer self-start group" @click="router.push('/')">
        <div class="">
          <h3 class="z-10 w-3/5 absolute text-center hex-text-center font-roboto font-medium text-2xl leading-8 transition text-white flex flex-col items-center justify-center">
            {{ sectors.name }}
            <font-awesome-icon class="w-14 h-14 mt-5 transition group-hover:hidden transition" color="#ffffff" :icon="sectors.icon" />
            <font-awesome-icon class="w-14 h-14 mt-5 transition hidden group-hover:flex transition" color="#ffffff" icon="arrow-left-long" />
          </h3>
          <svg id="Layer_1" class="dropshadow subhexmain" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="380px" viewBox="0 0 141.74 162.98" xml:space="preserve">
            <polygon
              fill-rule="evenodd" clip-rule="evenodd" :fill="`#${sectors.color}`" class="text-grey-700 transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "
            />
            <path
              fill-rule="evenodd" clip-rule="evenodd" :fill="`#${sectors.color}`" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"
            />
          </svg>
        </div>
      </div>

      <div v-if="sectors.subsectors.length" class="flex flex-wrap subhexlist">
        <div v-for="(item, index) in sectors.subsectors" :class="hover === index ? 'activecell bounce' : 'bounce-reverse', index === 0 || index === 10 || index === 20 ? 'ml-[6.8rem]' : ''" class="-mr-[3.2rem] w-[270px] h-[240px] relative -mb-[3.2rem] cursor-pointer transition sace" @mouseover="hover = index" @mouseleave="hover = null" @click="router.push(`/sector/subsector/${item.id}`)">
          <h3 class="z-10 w-3/5 absolute text-center hex-text-center font-roboto font-medium text-lg text-gray-800 leading-6 -mt-3 transition">
            {{ item.name }}
          </h3>
          <svg id="Layer_1" class="dropshadow z-20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="270px" height="240px" viewBox="0 0 141.74 162.98" xml:space="preserve">
            <polygon
              fill-rule="evenodd" clip-rule="evenodd" :fill="hover === index ? `#${sectors.color}` : '#ffffff'" class="text-grey-700 transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "
            />
            <path
              fill-rule="evenodd" clip-rule="evenodd" :fill="`#${sectors.color}`" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"
            />
          </svg>
        </div>
      </div>
      <div v-else class="w-full">
        <div v-for="(item, index) in sectors.skills" class="font-dosis sm:ml-16 cursor-pointer group test" @click="$router.push(`/sector/skill/${item.id}`)">
          <div v-if="index !== 0" class="container mt-2">
            <div class="border-bottom-das" />
          </div>
          <h2 class="text-2xl sm:text-3xl font-semibold pt-3 group-hover:scale-105 origin-left transition text-gray-800">
            {{ item.name }}
          </h2>
          <div class="flex space-x-4 items-center">
            <h3 class="sm:text-lg text-lg font-normal py-1 sm:py-2 text-grey-700">
              <span class="font-semibold uppercase text-base">Izvor: </span>{{ source(item.source_id) }}
            </h3>
            <h3 class="text-sm font-normal px-2 py-[1px] whitespace-nowrap rounded-md text-white uppercase" :class="item.skill_type_id === 1 ? 'bg-lime-600' : 'bg-cyan-500'">
              {{ item.skill_type_id === 1 ? 'Zelena' : 'Digitalna' }} vještina
            </h3>
          </div>
          <ul v-if="false" class="font-roboto flex space-x-4 text-lg">
            <li class="text-gray-500">
              Tip vještine: <span class="font-medium text-grey-700">{{ item.skill_level_id }}</span>
            </li>
            <li class="text-gray-500">
              Razina vještine: <span class="font-medium text-grey-700">{{ item.skill_type_id }}</span>
            </li>
            <li class="text-gray-500">
              Izvor: <span class="font-medium text-grey-700">{{ item.source_id }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--    mobile-->
    <div class="flex sm:hidden mt-12 mb-28">
      <div v-if="sectors.subsectors.length" class="flex flex-wrap justify-center">
        <div v-for="(item, index) in sectors.subsectors" class="w-[270px] h-[240px] -mt-10 relative cursor-pointer transition" :class="[index % 2 ? '-mt-4 -ml-[7rem]' : 'ml-[7rem] -mt-4']" @click="router.push(`/sector/subsector/${item.id}`)">
          <h3 class="z-10 w-3/5 absolute text-center hex-text-center font-roboto font-medium text-lg text-gray-800 leading-6 transition">
            {{ item.name }}
          </h3>
          <svg id="Layer_1" class="dropshadow z-20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="270px" height="240px" viewBox="0 0 141.74 162.98" xml:space="preserve">
            <polygon
              fill-rule="evenodd" clip-rule="evenodd" :fill="hover === index ? `#${sectors.color}` : '#ffffff'" class="text-grey-700 transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "
            />
            <path
              fill-rule="evenodd" clip-rule="evenodd" :fill="`#${sectors.color}`" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"
            />
          </svg>
        </div>
      </div>
      <div class="w-full">
        <div v-for="(item, index) in sectors.skills" class="font-dosis sm:ml-16 cursor-pointer group test" @click="$router.push(`/sector/skill/${item.id}`)">
          <div v-if="index !== 0" class="container mt-2">
            <div class="border-bottom-das" />
          </div>
          <h2 class="text-2xl sm:text-3xl font-semibold pt-3 group-hover:scale-105 origin-left transition text-gray-800">
            {{ item.name }}
          </h2>
          <div class="flex space-x-4 items-center">
            <h3 class="sm:text-lg text-lg font-normal py-1 sm:py-2 text-grey-700">
              <span class="font-semibold uppercase text-base">Izvor: </span>{{ source(item.source_id) }}
            </h3>
            <h3 class="text-sm font-normal px-2 py-[1px] whitespace-nowrap rounded-md text-white uppercase" :class="item.skill_type_id === 1 ? 'bg-lime-600' : 'bg-cyan-500'">
              {{ item.skill_type_id === 1 ? 'Zelena' : 'Digitalna' }} vještina
            </h3>
          </div>
          <ul v-if="false" class="font-roboto flex space-x-4 text-lg">
            <li class="text-gray-500">
              Tip vještine: <span class="font-medium text-grey-700">{{ item.skill_level_id }}</span>
            </li>
            <li class="text-gray-500">
              Razina vještine: <span class="font-medium text-grey-700">{{ item.skill_type_id }}</span>
            </li>
            <li class="text-gray-500">
              Izvor: <span class="font-medium text-grey-700">{{ item.source_id }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
