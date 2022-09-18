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

const data = ref({
  id: null,
  name: '',
  color: '',
  icon: '',
})

const dataFetched = ref([])

const { $jsonSerializer } = useNuxtApp()
// const { data: dataFetched } = await useApiFetch('/api/v1/sources', {
//   parseResponse: txt => $jsonSerializer.deserialize('sources', JSON.parse(txt)),
// })

function loadIt() {
  useApiFetch('/api/v1/sectors', {
    params: {
      'filter[parent]': false,
    },
  }).then((data) => {
    dataFetched.value = $jsonSerializer.deserialize('sectors', data.data.value)
  })
}
loadIt()

function createIt() {
  useApiFetch('/api/v1/sectors', {
    method: 'post',
    body: $jsonSerializer.serialize('sectors', data.value),
  }).then(() => {
    loadIt()
    // toast.show('Uspješno je dodana novi odjel', { type: 'success' });
  })
}

function updateIt() {
  useApiFetch(`/api/v1/sectors/${isEdit.value}`, {
    method: 'PATCH',
    body: $jsonSerializer.serialize('sectors', data.value),
  }).then(() => {
    isEdit.value = null
    data.value.color = ''
    data.value.icon = ''
    loadIt()
  })
}

function deleteIt(id) {
  useApiFetch(`/api/v1/sectors/${id}`, {
    method: 'delete',
  }).then((data) => {
    loadIt()
    console.log(data)
  })
}

const isEdit = ref(null)
function editIt(item) {
  window.scrollTo(0, 0)
  isEdit.value = item.id
  data.value.id = item.id
  data.value.name = item.name
  data.value.color = item.color
  data.value.icon = item.icon
}

</script>

<template>
  <div class="bg-indigo-600">
    <div class="h-28 max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <h2 class="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
        <span class="block">Unesi novi sektor</span>
      </h2>
    </div>
  </div>
  <div class="px-8 bg-gray-100 py-10">
    <div class="block text-gray-700 font-bold text-xl mb-2">
      <div class="text-3xl mb-3">
        Sektor
      </div>
      <input v-model="data.name" class="sm:text-lg p-3 shadow-sm focus:ring-cup-300 focus:border-cup-300 block w-full border-gray-300 border rounded-md">
    </div>
    <div class="flex space-x-10">
      <div class=" text-gray-700 text-sm font-medium text-base mt-2">
        <div class="text-xl mb-3">
          Boja
        </div>
        <input v-model="data.color" class="sm:text-lg p-3 shadow-sm focus:ring-cup-300 focus:border-cup-300 block w-full border-gray-300 border rounded-md">
      </div>

      <div class=" text-gray-700 text-sm font-medium text-base mt-2">
        <div class="text-xl mb-3">
          Ikona
        </div>
        <input v-model="data.icon" class="sm:text-lg p-3 shadow-sm focus:ring-cup-300 focus:border-cup-300 block w-full border-gray-300 border rounded-md">
      </div>
    </div>
    <div class="mt-8 flex">
      <div class="inline-flex rounded-md shadow">
        <div v-if="!isEdit" class="cursor-pointer inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700" @click="createIt(); data.name = ''">
          Spremi
        </div>
        <div v-else class="cursor-pointer inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700" @click="updateIt(); data.name = ''">
          Osvježi podatke
        </div>
      </div>
    </div>
  </div>
  <div class="p-8">
    <h2 class="text-2xl font-bold tracking-tight text-gray-700 sm:text-2xl">
      Popis sektora
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
                  Sektor
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
                  <div class=" flex justify-end">
                    <div class="cursor-pointer text-indigo-600 hover:text-indigo-900 mr-4" @click="editIt(item)">
                      Uredi
                    </div>
                    <div class="cursor-pointer text-indigo-600 hover:text-indigo-900" @click="deleteIt(item.id)">
                      Obriši
                    </div>
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
