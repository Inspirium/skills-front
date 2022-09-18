<script setup lang="ts">

import {ref} from 'vue'

const router = useRouter()
const route = useRoute()

const { $jsonSerializer } = useNuxtApp()

const skill = ref({})
function loadIt() {
  useApiFetch(`/api/v1/skills/${route.params.id}`, {
    params: {
      'include': 'occupations,skillType,skillLevel,source,programs',
    },
  }).then((data) => {
    skill.value = $jsonSerializer.deserialize('skills', data.data.value)
  })
}
loadIt()

const hover = ref(null)


</script>

<template>
  <div v-if="Object.keys(skill).length" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!--    <font-awesome-icon icon="tree"></font-awesome-icon>-->
    <div class="flex justify-between sm:flex-row flex-col text-grey-700 sm:items-end items-start mt-6">
      <div @click="router.back()" class="relative flex sm:hidden cursor-pointer self-center group">
        <h3 class="z-10 w-3/5 absolute text-center hex-text-center font-roboto font-medium text-xl leading-6 transition text-white flex flex-col items-center justify-center">Nazad
          <font-awesome-icon class="w-14 h-14 mt-5" color="#ffffff" icon="arrow-left-long" />
        </h3>
        <svg class="dropshadow" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="270px" height="220px" viewBox="0 0 141.74 162.98" xml:space="preserve">
          <polygon fill-rule="evenodd" clip-rule="evenodd" fill="#333" class="text-grey-700 transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "/>
          <path fill-rule="evenodd" clip-rule="evenodd" fill="#333" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"/>
          </svg>
      </div>

    </div>
    <div v-if="true" class="flex sm:flex-row flex-col relative mt-2 sm:mt-12 mb-20">
      <div @click="router.back()" class="grow-0 shrink-0 relative sm:flex cursor-pointer self-start hidden">
        <h3 class="z-10 w-3/5 absolute text-center hex-text-center font-roboto font-medium text-2xl leading-8 transition text-white flex flex-col items-center justify-center">Povratak
          <font-awesome-icon class="w-14 h-14 mt-5" color="#ffffff" icon="arrow-left-long" />
        </h3>
        <svg class="dropshadow subhexmain" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="300px" height="380px" viewBox="0 0 141.74 162.98" xml:space="preserve">
          <polygon fill-rule="evenodd" clip-rule="evenodd" fill="#333" class="text-grey-700 transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "/>
          <path fill-rule="evenodd" clip-rule="evenodd" fill="#555" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"/>
        </svg>
      </div>
      <div class="sm:w-[646px]">
        <div class="text-grey-700 font-dosis sm:ml-10 text-center sm:text-left">
          <h2 class="text-2xl sm:text-4xl font-semibold">{{ skill.name }}</h2>
<!--          <h3 v-if="skill.description !== ''" class="text-2xl font-normal py-3">{{ skill.description }}</h3>-->
          <div class="container mb-4 mt-6">
            <div class="border-bottom-das"></div>
          </div>
          <ul class="font-roboto flex flex-col space-y-3 text-lg mt-4">
            <li class="text-gray-500">Tip vještine: <span class="font-medium text-grey-700">{{ skill.skillType.name }}</span></li>
<!--            <li class="text-gray-500">Razina vještine: <span class="font-medium text-grey-700">{{ skill.skillLevel.name }}</span></li>-->
            <li class="text-gray-500">Izvor: <span class="font-medium text-grey-700">{{ skill.source.name }}</span></li>
          </ul>
          <div class="container mb-4 mt-6">
            <div class="border-bottom-das"></div>
          </div>
          <h3 class="font-dosis font-semibold sm:text-3xl text-3xl leading-8 transition text-cyan-500 mb-2">Obrazovni program</h3>
          <ul class="font-roboto flex flex-col sm:items-start items-center space-y-4 text-lg list-disc sm:list-outside list-inside">
            <li v-for="item in skill.programs" class="text-gray-500"><span class="font-normal text-grey-700">{{ item.name }}</span></li>
          </ul>
        </div>
      </div>
      <div class="shrink-1 grow-0 sm:w-[280px] sm:ml-16 mt-10 sm:mt-0 mb-10 text-center sm:text-left">
        <h3 class="font-dosis font-semibold sm:text-3xl text-3xl leading-8 transition text-cyan-500">Povezana zanimanja</h3>
        <div class="container mb-4 mt-4">
          <div class="border-bottom-das"></div>
        </div>
        <ul class="font-roboto flex flex-col sm:items-start items-center space-y-4 text-lg list-disc sm:list-outside list-inside">
          <li v-for="item in skill.occupations" class="text-gray-700"><span class="font-normal text-grey-700">{{ item.name }}</span></li>
        </ul>
        <svg class="hexoccupation bounce-reverse hidden sm:block" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="960px" height="1120px" viewBox="0 0 141.74 162.98" xml:space="preserve">
          <polygon fill-rule="evenodd" clip-rule="evenodd" fill="#e5e0d8" class="text-grey-700 transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "/>
        </svg>

      </div>
    </div>

  </div>

</template>
