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

definePageMeta({
  layout: 'admin',
})

const occupations = [
  { id: 1, name: 'Raskužitelj štetočina' },
  { id: 2, name: 'Energetski analitičar' },
  { id: 3, name: 'Energetski certifikator' },
  { id: 4, name: 'Energetski menadžer' },
  { id: 5, name: 'Energetski menadžer za alternativna goriva' },
]
const skomp = [
  { id: 1, name: '1Raskužitelj štetočina' },
  { id: 2, name: '1Energetski analitičar' },
  { id: 3, name: '1Energetski certifikator' },
  { id: 4, name: '1Energetski menadžer' },
  { id: 5, name: '1Energetski menadžer za alternativna goriva' },
]
const querySector = ref('')
const selectedSector = ref()
const filteredSector = computed(() =>
    querySector.value === ''
        ? sector.value
        : sector.value.filter((item) => {
          return item.name.toLowerCase().includes(querySector.value.toLowerCase())
        })
)

const querySubSector = ref('')
const selectedSubSector = ref()
const filteredSubSector = computed(() =>
    querySubSector.value === ''
        ? subSector.value.subsectors
        : subSector.value.subsectors.filter((item) => {
          return item.name.toLowerCase().includes(querySubSector.value.toLowerCase())
        })
)

const sector = ref([])
const subSector = ref([])
const type = ref([])
const level = ref([])
const source = ref([])

function loadSubSectors() {
  useApiFetch(`/api/v1/sectors/${selectedSector.value.id}`, {
    params: {
      'include': 'subsectors'
    },
  }).then((data) => {
    subSector.value = $jsonSerializer.deserialize('sectors', data.data.value)
  })
}
watch(selectedSector, () => {
  loadSubSectors()
  selectedSubSector.value = undefined
})

function loadSectors() {
  useApiFetch('/api/v1/sectors', {
    params: {
      'filter[parent]': false,
    },
  }).then((data) => {
    sector.value = $jsonSerializer.deserialize('sectors', data.data.value)
  })
}

function loadTypes() {
  useApiFetch('/api/v1/skill-types', {
  }).then((data) => {
    type.value = $jsonSerializer.deserialize('skill-types', data.data.value)
  })
}
function loadLevels() {
  useApiFetch('/api/v1/skill-levels', {
  }).then((data) => {
    level.value = $jsonSerializer.deserialize('skill-levels', data.data.value)
  })
}
function loadSource() {
  useApiFetch('/api/v1/sources', {
  }).then((data) => {
    source.value = $jsonSerializer.deserialize('sources', data.data.value)
  })
}
loadSectors()
loadTypes()
loadLevels()
loadSource()

const data = ref({
  name: ''
})
const selectedType = ref({'name': 'Odaberi...'})
const selectedLevel = ref({'name': 'Odaberi...'})
const selectedSource = ref({'name': 'Odaberi...'})

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
    querySkomp.value === ''
        ? skomp
        : skomp.filter((item) => {
          return item.name.toLowerCase().includes(querySkomp.value.toLowerCase())
        })
)


const { $jsonSerializer } = useNuxtApp()
const { data: levels } = await useApiFetch('/api/v1/skills', {
  parseResponse: txt => $jsonSerializer.deserialize('skills', JSON.parse(txt)),
})

function createIt() {
  useApiFetch('/api/v2/departments', {
    method: 'post',
    body: $jsonSerializer.serialize('departments', department.value),
  }).then(() => {
    // toast.show('Uspješno je dodana novi odjel', { type: 'success' });
  })
}

const occupationList = ref([])

watch(selectedOccupation, () => {
  addOccupation(selectedOccupation)
})

function addOccupation(item) {
  if (occupationList.value.findIndex(i => i.name === item.value.name) === -1) {
    occupationList.value.push(item.value)
  }
  query.value = ''
}

function removeOccupation(index) {
  occupationList.value.splice(index, 1)
}

const skromList = ref([])

function addSkrom(item) {
  if (skromList.value.findIndex(i => i.name === item.value.name) === -1) {
    skromList.value.push(item.value)
  }
  querySkomp.value = ''
}

function removeSkrom(index) {
  skromList.value.splice(index, 1)
}

watch(selectedSkomp, () => {
  addSkrom(selectedSkomp)
})

</script>

<template>
  <div class="bg-indigo-600">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        <span class="block">Unesi novu vještinu</span>
<!--        <span class="block text-indigo-600">Start your free trial today.</span>-->
      </h2>
    </div>
  </div>

  <div class="px-8 bg-gray-100 py-10">
<!--    <div v-for="level in levels">{{ level.name }}</div>-->
    <div class="block text-gray-700 font-medium text-xl mb-2">
      <div class="text-3xl mb-3">Vještina</div>
      <input v-model="data.ime" class="sm:text-lg p-3 shadow-sm focus:ring-cup-300 focus:border-cup-300 block w-full border-gray-300 border rounded-md" />
    </div>
    <div class="mt-5">
      <label for="comment" class="block text-sm font-medium text-gray-700 mb-2">Opis vještine</label>
      <textarea rows="4" name="comment" id="comment" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
    </div>
    <div class="grid grid-cols-3 gap-6">
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
    </div>
    <div class="grid grid-cols-2 gap-6">
      <Combobox as="div" v-model="selectedOccupation" class="mt-3">
        <ComboboxLabel class="block text-sm font-medium text-gray-700">Zanimanja</ComboboxLabel>
        <div class="relative mt-1">
          <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" @change="query = $event.target.value" />
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
        <span v-for="(item, index) in occupationList" :key="item.id" class="inline-flex rounded-full items-center py-0.5 pl-2.5 mt-2 mr-4 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700">
          {{ item.name }}
          <button @click="removeOccupation(index)" type="button" class="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white">
            <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
              <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
            </svg>
          </button>
        </span>
      </Combobox>
      <Combobox as="div" v-model="selectedSkomp" class="mt-3">
        <ComboboxLabel class="block text-sm font-medium text-gray-700">SKOMP</ComboboxLabel>
        <div class="relative mt-1">
          <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" @change="querySkomp = $event.target.value" />
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
        <span v-for="(item, index) in skromList" :key="item.id" class="inline-flex rounded-full items-center py-0.5 pl-2.5 mt-2 mr-4 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700">
          {{ item.name }}
          <button @click="removeSkrom(index)" type="button" class="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white">
            <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
              <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
            </svg>
          </button>
        </span>
      </Combobox>
<!--      <Combobox as="div" v-model="selectedSkomp" class="mt-3">-->
<!--        <ComboboxLabel class="block text-sm font-medium text-gray-700">SKOMP</ComboboxLabel>-->
<!--        <div class="relative mt-1">-->
<!--          <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" @change="query = $event.target.value" :display-value="(skomp) => skomp.name" />-->
<!--          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">-->
<!--            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />-->
<!--          </ComboboxButton>-->

<!--          <ComboboxOptions v-if="filteredSkomp.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">-->
<!--            <ComboboxOption v-for="person in filteredSkomp" :key="person.id" :value="person" as="template" v-slot="{ active, selected }">-->
<!--              <li :class="['relative cursor-default select-none py-2 pl-8 pr-4', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">-->
<!--            <span :class="['block truncate', selected && 'font-semibold']">-->
<!--              {{ person.name }}-->
<!--            </span>-->

<!--                <span v-if="selected" :class="['absolute inset-y-0 left-0 flex items-center pl-1.5', active ? 'text-white' : 'text-indigo-600']">-->
<!--              <CheckIcon class="h-5 w-5" aria-hidden="true" />-->
<!--            </span>-->
<!--              </li>-->
<!--            </ComboboxOption>-->
<!--          </ComboboxOptions>-->
<!--        </div>-->
<!--      </Combobox>-->
    </div>
    <div class="grid grid-cols-2 gap-6 mt-4">
      <Combobox as="div" v-model="selectedSector" class="mt-3">
        <ComboboxLabel class="block text-sm font-medium text-gray-700">Sektor</ComboboxLabel>
        <div class="relative mt-1">
          <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="Pretraži sektore..." @change="querySector = $event.target.value" :display-value="(sector) => sector.name" />
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
      <Listbox v-if="selectedSector !== undefined" as="div" v-model="selectedSubSector" class="mt-3">
        <ListboxLabel class="block text-sm font-medium text-gray-700"> Podsektor </ListboxLabel>
        <div class="mt-1 relative">
          <ListboxButton class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <span class="block truncate">{{ selectedSubSector ? selectedSubSector : 'Odaberi podsektor...' }}</span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
          </ListboxButton>

          <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              <ListboxOption as="template" v-for="person in filteredSubSector" :key="person.id" :value="person.name" v-slot="{ active, selected }">
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
    </div>

    <div class="mt-8 flex">
      <div class="inline-flex rounded-md shadow">
        <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"> Spremi </a>
      </div>
    </div>
  </div>
  <div class="p-8">
    <h2 class="text-4xl font-bold tracking-tight text-gray-700 sm:text-4xl">
      Popis vještina
    </h2>

  </div>
</template>
