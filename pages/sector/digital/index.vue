<script setup lang="ts">

const router = useRouter()
const route = useRoute()

const { $jsonSerializer } = useNuxtApp()

const skills = await
  useApiFetch('/api/v1/skills/', {
    params: {
      'filter[skillType]': 'Digitalna',
      'include': 'source',
    },
    parseResponse: txt => $jsonSerializer.deserialize('skills', JSON.parse(txt))
  })

const results = ref([])

async function getDataSearch(term) {
  await useApiFetch('/api/v1/skills', {
    params: {
      'filter[skillType]': 'Digitalna',
      'filter[name]': term.value,
      'filter[withCount]': true,
      'include': 'withCount',
      'include': 'source',
    },
  }).then((data) => {
    results.value = $jsonSerializer.deserialize('skills', data)
  })
}

</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!--    <font-awesome-icon icon="tree"></font-awesome-icon>-->
    <div class="sm:flex justify-between items-center text-center mb-8 mt-6 sm:mt-0 sm:space-x-8 w-full">
      <h1 class="font-semibold sm:text-[5rem] text-[2.5rem] font-dosis fly-in mb-4">
        Digitalne vještine
      </h1>
      <!--      <p class="max-w-xl sm:text-right "><span class="font-bold text-2xl font-dosis text-cyan-500">Digitalne vještine...</span> [dolazi tekst]prikazuju grupe sličnih specijalističkih zadataka. Specijalistički zadaci osmišljeni su tako da opisuju svakodnevni rad unutar zanimanja. Ovi zadaci su uglavnom prenosivi – ako možete obaviti jedan zadatak u klasteru, možete obaviti i ostale.-->
      <!--      </p>-->
    </div>

    <div class="flex mt-12">
      <div class="relative sm:flex cursor-pointer self-start hidden" @click="router.back()">
        <h3 class="z-10 w-3/5 absolute text-center hex-text-center font-roboto font-medium text-2xl leading-8 transition text-white flex flex-col items-center justify-center">
          Povratak
          <font-awesome-icon class="w-14 h-14 mt-5" color="#ffffff" icon="arrow-left-long" />
        </h3>
        <svg
          id="Layer_1" class="dropshadow subhexmain" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="300px" height="380px" viewBox="0 0 141.74 162.98" xml:space="preserve"
        >
          <polygon
            fill-rule="evenodd" clip-rule="evenodd" fill="#333" class="text-grey-700 transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "
          />
          <path
            fill-rule="evenodd" clip-rule="evenodd" fill="#555" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"
          />
        </svg>
      </div>
      <div class="w-full mb-10">
        <Search :placeholder="'Pretraži digitalne vještine'" class="mb-4" @update="getDataSearch($event)" @reset="results = []" />
        <div v-for="(item, index) in results.length ? results : skills" class="font-dosis sm:ml-16 cursor-pointer group test" @click="router.push(`/sector/skill/${item.id}`)">
          <div v-if="index !== 0" class="container mt-2">
            <div class="border-bottom-das" />
          </div>
          <h2 class="text-3xl font-semibold pt-3 group-hover:scale-105 origin-left transition text-cyan-500">
            {{ item.name }}
          </h2>
          <div class="flex space-x-4 items-center">
            <h3 class="sm:text-lg text-lg font-normal py-1 sm:py-2 text-grey-700">
              <span class="font-semibold uppercase text-base">Izvor: </span>{{ item.source.name }}
            </h3>
            <!--            <h3 class="text-sm font-normal px-2 py-[1px] whitespace-nowrap rounded-md text-white uppercase" :class="item.skill_type_id === 1 ? 'bg-lime-600' : 'bg-cyan-500'">{{ item.skill_type_id === 1 ? 'Zelena' : 'Digitalna' }} vještina</h3>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
