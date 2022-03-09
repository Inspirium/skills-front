<script setup lang="ts">

import {ref} from 'vue'

const router = useRouter()
const route = useRoute()

const { $jsonSerializer } = useNuxtApp()

const skill = ref({})
function loadIt() {
  useApiFetch(`/api/v1/skills/${route.params.id}`, {
    params: {
      'include': 'occupations,skillType,skillLevel,source',
    },
  }).then((data) => {
    skill.value = $jsonSerializer.deserialize('skills', data.data.value)
  })
}
loadIt()

const hover = ref(null)


</script>

<template>
  <div v-if="Object.keys(skill).length" class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <!--    <font-awesome-icon icon="tree"></font-awesome-icon>-->
    <div class="flex justify-between text-white items-end mt-12">
      <div class="">
        <h1 class="fly-in font-semibold sm:text-[5rem] font-dosis leading-[5rem]">Detalji vještine</h1>
      </div>
    </div>
    <div v-if="true" class="flex relative mt-12">
      <div @click="router.back()" class="relative flex cursor-pointer self-start">
        <h3 class="z-10 w-3/5 absolute text-center hex-text-center font-roboto font-medium text-2xl leading-8 transition text-white flex flex-col items-center justify-center">Povratak
          <font-awesome-icon class="w-14 h-14 mt-5" color="#ffffff" icon="arrow-left-long" />
        </h3>
        <svg class="dropshadow subhexmain" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="300px" height="380px" viewBox="0 0 141.74 162.98" xml:space="preserve">
          <polygon fill-rule="evenodd" clip-rule="evenodd" fill="#333" class="text-white transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "/>
          <path fill-rule="evenodd" clip-rule="evenodd" fill="#555" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"/>
        </svg>
      </div>
      <div class="w-2/5">
        <div class="text-white font-dosis ml-16">
          <h2 class="text-5xl font-semibold pt-3">{{ skill.name }}</h2>
          <h3 class="text-2xl font-normal py-3">{{ skill.description }}</h3>
          <div class="container mb-4 mt-6 w-3/4">
            <div class="border-bottom-das"></div>
          </div>
          <ul class="font-roboto flex flex-col space-y-4 text-lg mt-4">
            <li class="text-gray-500">Tip vještine: <span class="font-medium text-white">{{ skill.skillType.name }}</span></li>
            <li class="text-gray-500">Razina vještine: <span class="font-medium text-white">{{ skill.skillLevel.name }}</span></li>
            <li class="text-gray-500">Izvor: <span class="font-medium text-white">{{ skill.source.name }}</span></li>
          </ul>
        </div>
      </div>
      <div class="ml-16 ">
        <h3 class="font-dosis font-medium text-4xl leading-8 transition text-cyan-400">Povezana zanimanja</h3>
        <div class="container mb-4 mt-6">
          <div class="border-bottom-das"></div>
        </div>
        <ul class="font-roboto flex flex-col items-start space-y-4 text-lg list-disc">
          <li v-for="item in skill.occupations" class="text-gray-500"><span class="font-normal text-white">{{ item.name }}</span></li>
        </ul>
        <svg class="dropshadow hexoccupation bounce-reverse" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="960px" height="1120px" viewBox="0 0 141.74 162.98" xml:space="preserve">
          <polygon fill-rule="evenodd" clip-rule="evenodd" fill="#1B2330" class="text-white transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "/>
        </svg>

      </div>
    </div>

  </div>

</template>
