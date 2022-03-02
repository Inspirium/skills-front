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

const occupations = [
  { id: 1, name: 'Raskužitelj štetočina' },
  { id: 2, name: 'Energetski analitičar' },
  { id: 3, name: 'Energetski certifikator' },
  { id: 4, name: 'Energetski menadžer' },
  { id: 5, name: 'Energetski menadžer za alternativna goriva' },
]
const skomp = [
  { id: 1, name: 'Raskužitelj štetočina' },
  { id: 2, name: 'Energetski analitičar' },
  { id: 3, name: 'Energetski certifikator' },
  { id: 4, name: 'Energetski menadžer' },
  { id: 5, name: 'Energetski menadžer za alternativna goriva' },
]
const sector = [
  { id: 1, name: 'Poljoprivreda, prehrana i veterina' },
  { id: 2, name: 'Šumarstvo i drvna tehnologija' },
  { id: 3, name: 'Geologija, rudarstvo, nafta i kemijska tehnologija' },
  { id: 4, name: 'Moda, tekstil i koža' },
  { id: 5, name: 'Grafička tehnologija i audiovizualne tehnologije' },
]
const subSector = [
  { id: 1, name: 'Poljoprivreda, prehrana i veterina' },
  { id: 2, name: 'Šumarstvo i drvna tehnologija' },
  { id: 3, name: 'Geologija, rudarstvo, nafta i kemijska tehnologija' },
  { id: 4, name: 'Moda, tekstil i koža' },
  { id: 5, name: 'Grafička tehnologija i audiovizualne tehnologije' },
]
const type = [
  { id: 1, name: 'Zelena' },
  { id: 2, name: 'Digitalna' },
]
const level = [
  { id: 1, name: 'Specifična' },
  { id: 2, name: 'Transferzalna' },
]
const source = [
  { id: 1, name: 'ESCO' },
  { id: 2, name: 'ANSC' },
]

definePageMeta({
  layout: 'admin',
})

const data = ref({
  ime: ''
})
const selectedType = ref(type[0])
const selectedLevel = ref(level[0])
const selectedSource = ref(source[0])

const query = ref('')
const selectedOccupation = ref()
const filteredOccupation = computed(() =>
  query.value === ''
      ? occupations
      : occupations.filter((item) => {
        return item.name.toLowerCase().includes(query.value.toLowerCase())
      })
)

const querySkomp = ref('')
const selectedSkomp = ref()
const filteredSkomp = computed(() =>
    query.value === ''
        ? skomp
        : skomp.filter((item) => {
          return item.name.toLowerCase().includes(query.value.toLowerCase())
        })
)

const querySector = ref('')
const selectedSector = ref()
const filteredSector = computed(() =>
    query.value === ''
        ? sector
        : sector.filter((item) => {
          return item.name.toLowerCase().includes(query.value.toLowerCase())
        })
)

const querySubSector = ref('')
const selectedSubSector = ref()
const filteredSubSector = computed(() =>
    query.value === ''
        ? subSector
        : subSector.filter((item) => {
          return item.name.toLowerCase().includes(query.value.toLowerCase())
        })
)

const { $jsonSerializer } = useNuxtApp()
const { data: levels } = await useApiFetch('/api/v1/skill-levels', {
  parseResponse: txt => $jsonSerializer.deserialize('skill-levels', JSON.parse(txt)),
})
</script>

<template>
  <div class="px-8">
    <div v-for="level in levels">{{ level.name }}</div>
    <div class="block text-gray-700 font-medium text-xl mb-2">
      Vještina
    </div>
    <input v-model="data.ime" class="sm:text-lg p-3 shadow-sm focus:ring-cup-300 focus:border-cup-300 block w-full border-gray-300 border-2 rounded-md" />
    <div class="mt-5">
      <label for="comment" class="block text-sm font-medium text-gray-700 mb-2">Opis vještine</label>
      <textarea rows="4" name="comment" id="comment" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
    </div>

    <Listbox as="div" v-model="selectedType" class="mt-5">
      <ListboxLabel class="block text-sm font-medium text-gray-700"> Tip </ListboxLabel>
      <div class="mt-1 relative">
        <ListboxButton class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <span class="block truncate">{{ selectedType.name }}</span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
        </ListboxButton>

        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <ListboxOption as="template" v-for="person in type" :key="person.id" :value="person" v-slot="{ active, selected }">
              <li :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-8 pr-4']">
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                {{ person.name }}
              </span>

                <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <Listbox as="div" v-model="selectedLevel" class="mt-5">
      <ListboxLabel class="block text-sm font-medium text-gray-700"> Razina </ListboxLabel>
      <div class="mt-1 relative">
        <ListboxButton class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <span class="block truncate">{{ selectedLevel.name }}</span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
        </ListboxButton>

        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <ListboxOption as="template" v-for="person in level" :key="person.id" :value="person" v-slot="{ active, selected }">
              <li :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-8 pr-4']">
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                {{ person.name }}
              </span>

                <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <Listbox as="div" v-model="selectedSource" class="mt-5">
      <ListboxLabel class="block text-sm font-medium text-gray-700"> Izvor </ListboxLabel>
      <div class="mt-1 relative">
        <ListboxButton class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <span class="block truncate">{{ selectedSource.name }}</span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
        </ListboxButton>

        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <ListboxOption as="template" v-for="person in source" :key="person.id" :value="person" v-slot="{ active, selected }">
              <li :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-8 pr-4']">
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                {{ person.name }}
              </span>

                <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <Combobox as="div" v-model="selectedOccupation" class="mt-3">
      <ComboboxLabel class="block text-sm font-medium text-gray-700">Zanimanja</ComboboxLabel>
      <div class="relative mt-1">
        <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" @change="query = $event.target.value" :display-value="(occupations) => occupations.name" />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>

        <ComboboxOptions v-if="filteredOccupation.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ComboboxOption v-for="person in filteredOccupation" :key="person.id" :value="person" as="template" v-slot="{ active, selected }">
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
    <Combobox as="div" v-model="selectedSkomp" class="mt-3">
      <ComboboxLabel class="block text-sm font-medium text-gray-700">SKOMP</ComboboxLabel>
      <div class="relative mt-1">
        <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" @change="query = $event.target.value" :display-value="(skomp) => skomp.name" />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>

        <ComboboxOptions v-if="filteredSkomp.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ComboboxOption v-for="person in filteredSkomp" :key="person.id" :value="person" as="template" v-slot="{ active, selected }">
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
    <Combobox as="div" v-model="selectedSubSector" class="mt-3">
      <ComboboxLabel class="block text-sm font-medium text-gray-700">Podsektor</ComboboxLabel>
      <div class="relative mt-1">
        <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" @change="querySubSector = $event.target.value" :display-value="(subSector) => subSector.name" />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>

        <ComboboxOptions v-if="filteredSubSector.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ComboboxOption v-for="person in filteredSubSector" :key="person.id" :value="person" as="template" v-slot="{ active, selected }">
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
</template>
