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

const sector = [
  { id: 1, name: 'Poljoprivreda, prehrana i veterina' },
  { id: 2, name: 'Šumarstvo i drvna tehnologija' },
  { id: 3, name: 'Geologija, rudarstvo, nafta i kemijska tehnologija' },
  { id: 4, name: 'Moda, tekstil i koža' },
  { id: 5, name: 'Grafička tehnologija i audiovizualne tehnologije' },
]

const querySector = ref('')
const selectedSector = ref()
const filteredSector = computed(() =>
    querySector.value === ''
        ? sector
        : sector.filter((item) => {
          return item.name.toLowerCase().includes(query.value.toLowerCase())
        })
)

definePageMeta({
  layout: 'admin',
})

const data = ref({
  ime: ''
})

const { $jsonSerializer } = useNuxtApp()
const { data: levels } = await useApiFetch('/api/v1/skill-levels', {
  parseResponse: txt => $jsonSerializer.deserialize('skill-levels', JSON.parse(txt)),
})

const subsectors = [
  { subsector: 'Poljoprivreda', sector: 'Poljoprivreda, prehrana i veterina' },
  { subsector: 'Veterinarska medicina', sector: 'Šumarstvo i drvna tehnologija' },
  // More people...
]
</script>

<template>
  <div class="bg-indigo-600">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <h2 class="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
        <span class="block">Unesi novi podsektor</span>
<!--        <span class="block text-indigo-600">Start your free trial today.</span>-->
      </h2>
    </div>
  </div>
  <div class="px-8 bg-gray-100 py-10">
    <div class="grid grid-cols-2 gap-6">
      <Combobox as="div" v-model="selectedSector" class="mt-3">
        <ComboboxLabel class="block text-sm font-medium text-gray-700">Sektor</ComboboxLabel>
        <div class="relative mt-1">
          <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" @change="querySector = $event.target.value" :display-value="(sector) => sector.name" />
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
    <div class="block text-gray-700 font-medium text-xl mb-3 mt-6">
      <div class="text-3xl mb-2">Podsektor</div>
      <input v-model="data.ime" class="sm:text-lg p-3 shadow-sm focus:ring-cup-300 focus:border-cup-300 block w-full border-gray-300 border rounded-md" />
    </div>
    <div class="mt-8 flex">
      <div class="inline-flex rounded-md shadow">
        <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"> Spremi </a>
      </div>
      <div class="ml-3 inline-flex">
        <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-red-600 hover:text-white"> Otkaži </a>
      </div>
    </div>
  </div>

  <div class="p-8">
    <h2 class="text-2xl font-bold tracking-tight text-gray-700 sm:text-2xl">
      Popis podsektora
    </h2>
  </div>
  <div class="flex flex-col w-full">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Podsektor</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sektor</th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(subsector, personIdx) in subsectors" :key="personIdx" :class="personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ subsector.subsector }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ subsector.sector }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Obriši</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
