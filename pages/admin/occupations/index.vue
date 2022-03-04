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

const datalist = [
  { id: 1, name: 'Poljoprivreda, prehrana i veterina' },
  { id: 2, name: 'Šumarstvo i drvna tehnologija' },
  { id: 3, name: 'Geologija, rudarstvo, nafta i kemijska tehnologija' },
  { id: 4, name: 'Moda, tekstil i koža' },
  { id: 5, name: 'Grafička tehnologija i audiovizualne tehnologije' },
]

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
</script>

<template>
  <div class="bg-indigo-600">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <h2 class="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
        <span class="block">Unesi novo zanimanje</span>
        <!--        <span class="block text-indigo-600">Start your free trial today.</span>-->
      </h2>
    </div>
  </div>
  <div class="px-8 bg-gray-100 py-10">
    <!--    <div v-for="level in levels">{{ level.name }}</div>-->
    <div class="block text-gray-700 font-medium text-xl mb-2">
      <div class="text-3xl mb-3">Zanimanje</div>
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
      Popis sektora
    </h2>
  </div>
  <div class="flex flex-col w-full">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zanimanje</th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Obriši</span>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, personIdx) in datalist" :key="personIdx" :class="personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ item.name }}
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
