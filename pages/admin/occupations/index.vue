<script setup lang="ts">
import { computed, ref } from 'vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
  Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions,
} from '@headlessui/vue'

import fieldBasic from '@/components/fields/basic'

const route = useRoute()
definePageMeta({
  layout: 'admin',
})

const dataFetched = ref([])

const { $jsonSerializer } = useNuxtApp()

function loadIt() {
  useApiFetch('/api/v1/occupations', {
    params: {
      include: 'sector',
    },
  }).then((data) => {
    dataFetched.value = $jsonSerializer.deserialize('occupations', data.data.value)
  })
}
loadIt()

function createIt() {
  useApiFetch('/api/v1/occupations', {
    method: 'post',
    body: $jsonSerializer.serialize('occupations', data.value),
  }).then(() => {
    loadIt()
    // toast.show('Uspješno je dodana novi odjel', { type: 'success' });
  })
}

function deleteIt(id) {
  useApiFetch(`/api/v1/occupations/${id}`, {
    method: 'delete',
  }).then((data) => {
    loadIt()
  })
}

const querySector = ref('')
const selectedSector = ref()
const sectors = ref([])
function loadSectors() {
  useApiFetch('/api/v1/sectors/', {
    params: {
      include: 'parent',
    },
  }).then((data) => {
    sectors.value = $jsonSerializer.deserialize('sectors', data.data.value)
  })
}
loadSectors()

const filteredSector = computed(() =>
  querySector.value === ''
    ? sectors.value
    : sectors.value.filter((item) => {
      return item.name.toLowerCase().includes(querySector.value.toLowerCase())
    }),
)

const data = ref({
  name: '',
  sector: selectedSector,
})

</script>

<template>
  <div class="bg-indigo-600">
    <div class="h-28 max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <h2 class="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
        <span class="block">Unesi novo zanimanje</span>
      </h2>
    </div>
  </div>
  <div class="px-8 bg-gray-100 py-10">
    <div class="block text-gray-700 font-bold text-xl mb-2">
      <div class="text-3xl mb-3">
        Zanimanje
      </div>
      <input v-model="data.name" class="sm:text-lg p-3 shadow-sm focus:ring-cup-300 focus:border-cup-300 block w-full border-gray-300 border rounded-md">
    </div>

    <div class="grid grid-cols-2 gap-6">
      <Combobox v-model="selectedSector" as="div" class="mt-3">
        <ComboboxLabel class="block text-sm font-medium text-gray-700">
          Sektor/podsektor
        </ComboboxLabel>
        <div class="relative mt-1">
          <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" :display-value="(sectors) => sectors.name" @change="querySector = $event.target.value" />
          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>

          <ComboboxOptions v-if="sectors.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ComboboxOption v-for="person in filteredSector" :key="person.id" v-slot="{ active, selected }" :value="person" as="template">
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
    <div class="mt-8 flex">
      <div class="inline-flex rounded-md shadow">
        <div class="cursor-pointer inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700" @click="createIt(); data.name = ''">
          Spremi
        </div>
      </div>
    </div>
  </div>
  <div class="p-8">
    <h2 class="text-2xl font-bold tracking-tight text-gray-700 sm:text-2xl">
      Popis zanimanja
    </h2>
  </div>
  <div class="flex flex-col px-8">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zanimanje
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcija
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, personIdx) in dataFetched" :key="personIdx" :class="personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ item.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="cursor-pointer text-indigo-600 hover:text-indigo-900" @click="deleteIt(item.id)">
                    Obriši
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
