<script setup lang="ts">
import { ref, computed } from 'vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
  Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions
} from '@headlessui/vue'

import fieldBasic from '@/components/fields/basic'

const route = useRoute()
definePageMeta({
  layout: 'admin',
})

const data = ref({
  name: '',
  parent: {}
})

const dataFetched = ref([])

const { $jsonSerializer } = useNuxtApp()
// const { data: dataFetched } = await useApiFetch('/api/v1/sources', {
//   parseResponse: txt => $jsonSerializer.deserialize('sources', JSON.parse(txt)),
// })

// function loadIt() {
//   useApiFetch('/api/v1/sectors', {
//   }).then((data) => {
//     dataFetched.value = $jsonSerializer.deserialize('sectors', data.data.value)
//   })
// }
// loadIt()

function createIt() {
  data.value.parent = selectedSector.value
  useApiFetch('/api/v1/sectors', {
    method: 'post',
    body: $jsonSerializer.serialize('sectors', data.value),
  }).then(() => {
    loadIt()
    loadItSubSectors()
    // toast.show('Uspješno je dodana novi odjel', { type: 'success' });
  })
}

function deleteIt(id) {
  useApiFetch(`/api/v1/sectors/${id}`, {
    method: 'delete',
  }).then((data) => {
    loadIt()
    loadItSectors()
  })
}

const querySector = ref('')
const selectedSector = ref()
const filteredSector = computed(() =>
    querySector.value === ''
        ? dataFetchedSectors.value
        : dataFetchedSectors.value.filter((item) => {
          return item.name.toLowerCase().includes(querySector.value.toLowerCase())
        })
)
const dataFetchedSectors = ref([])
function loadIt() {
  useApiFetch('/api/v1/sectors/', {
    params: {
      'filter[parent]': false,
    },
  }).then((data) => {
    dataFetchedSectors.value = $jsonSerializer.deserialize('sectors', data.data.value)
  })
}
loadIt()

const dataFetchedSubSectors = ref([])
const filterQuerySector = ref('')
const filterSelectedSector = ref({})

const sectorFilter = computed(() =>
    filterQuerySector.value === ''
        ? dataFetchedSectors.value
        : dataFetchedSectors.value.filter((item) => {
          return item.name.toLowerCase().includes(filterQuerySector.value.toLowerCase())
        })
)


const filteredSubSections = ref([])

function loadItSubSectors() {
  useApiFetch(`/api/v1/sectors/${filterSelectedSector.value.id}`, {
    params: {
      'include': 'subsectors'
    },
  }).then((data) => {
    filteredSubSections.value = $jsonSerializer.deserialize('sectors', data.data.value)
  })
}

watch(filterSelectedSector, () => {
  loadItSubSectors()
})


function loadItSectors() {
  useApiFetch(Object.keys(filterSelectedSector.value).length ? `/api/v1/sectors/${filterSelectedSector.value.id}` : `/api/v1/sectors/`, {
    params: {
      'include': 'subsectors'
    },
  }).then((data) => {
    dataFetchedSubSectors.value = $jsonSerializer.deserialize('sectors', data.data.value)
  })
}
loadItSectors()

</script>

<template>
  <div class="bg-indigo-600">
    <div class="h-28 max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <h2 class="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
        <span @click="loadItSectors()" class="block">Unesi novi podsektor</span>
      </h2>
    </div>
  </div>
  <div class="px-8 bg-gray-100 py-10">
    <div class="grid grid-cols-2 gap-6">
      <Combobox as="div" v-model="selectedSector" class="mt-3">
        <ComboboxLabel class="block text-sm font-medium text-gray-700">Sektor</ComboboxLabel>
        <div class="relative mt-1">
          <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" @change="querySector = $event.target.value" :display-value="(dataFetchedSectors) => dataFetchedSectors.name" />
          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>

          <ComboboxOptions v-if="filteredSector.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ComboboxOption v-for="person in filteredSector" :key="person.id" :value="person" as="template" v-slot="{ active, selected }">
              <li :class="['relative cursor-default select-none py-2 pl-8 pr-4', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ person.name }}
            </span>

                <span v-if="selected" :class="['absolute inset-y-0 left-0 flex items-center pl-1.5', active ? 'text-white' : 'text-indigo-600']">
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
    <div class="block text-gray-700 font-bold text-xl mb-2 mt-6">
      <div class="text-3xl mb-3">Podsektor</div>
      <input v-model="data.name" class="sm:text-lg p-3 shadow-sm focus:ring-cup-300 focus:border-cup-300 block w-full border-gray-300 border rounded-md" />
    </div>
    <div class="mt-8 flex">
      <div class="inline-flex rounded-md shadow">
        <div @click="createIt(); data.name = ''" class="cursor-pointer inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"> Spremi </div>
      </div>
    </div>
  </div>
  <div class="px-8 mt-8">
    <h2 class="text-2xl font-bold tracking-tight text-gray-700 sm:text-2xl">
      Popis podsektora
    </h2>
  </div>

  <div class="flex flex-col px-8">
    <div class="grid grid-cols-2 gap-6">
      <Combobox as="div" v-model="filterSelectedSector" class="mb-4 mt-6">
        <ComboboxLabel class="block text-sm font-medium text-gray-700">Filtriraj po sektoru</ComboboxLabel>
        <div class="relative mt-1">
          <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" @change="filterQuerySector = $event.target.value" :display-value="(dataFetchedSectors) => dataFetchedSectors.name" />
          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>

          <ComboboxOptions v-if="sectorFilter.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ComboboxOption v-for="person in sectorFilter" :key="person.id" :value="person" as="template" v-slot="{ active, selected }">
              <li :class="['relative cursor-default select-none py-2 pl-8 pr-4', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
                <span :class="['block truncate', selected && 'font-semibold']">
                  {{ person.name }}
                </span>
                <span v-if="selected" :class="['absolute inset-y-0 left-0 flex items-center pl-1.5', active ? 'text-white' : 'text-indigo-600']">
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Podsektor</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Akcija</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, personIdx) in Object.keys(filteredSubSections).length ? filteredSubSections.subsectors : dataFetchedSubSectors" :key="personIdx" :class="personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ item.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div @click="deleteIt(item.id)" class="cursor-pointer text-indigo-600 hover:text-indigo-900">Obriši</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
