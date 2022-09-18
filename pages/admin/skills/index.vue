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

definePageMeta({
  layout: 'admin',
})

const occupations = ref([])
const skomp = ref([])

const querySector = ref('')
const selectedSector = ref()
const filteredSector = computed(() =>
  querySector.value === ''
    ? sector.value
    : sector.value.filter((item) => {
      return item.name.toLowerCase().includes(querySector.value.toLowerCase())
    }),
)

const querySubSector = ref('')
const selectedSubSector = ref()
const filteredSubSector = computed(() =>
  querySubSector.value === ''
    ? subSector.value.subsectors
    : subSector.value.subsectors.filter((item) => {
      return item.name.toLowerCase().includes(querySubSector.value.toLowerCase())
    }),
)

const sector = ref([])
const subSector = ref([])
const type = ref([])
const level = ref([])
const source = ref([])
const skills = ref([])

function loadSubSectors() {
  useApiFetch(`/api/v1/sectors/${selectedSector.value.id}`, {
    params: {
      include: 'subsectors',
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

function loadSkills() {
  useApiFetch('/api/v1/skills', {
  }).then((data) => {
    skills.value = $jsonSerializer.deserialize('skills', data.data.value)
  })
}

loadSectors()
loadTypes()
loadLevels()
loadSource()
loadSkills()

const data = ref({
  name: '',
  description: '',
})
const selectedType = ref({ name: 'Odaberi...' })
const selectedLevel = ref({ name: 'Odaberi...' })
const selectedSource = ref({ name: 'Odaberi...' })

const queryOccupation = ref('')
const selectedOccupation = ref()
const filteredOccupation = computed(() =>
  queryOccupation.value === ''
    ? occupations.value
    : occupations.value.filter((item) => {
      return item.name.toLowerCase().includes(queryOccupation.value.toLowerCase())
    }),
)

const querySkomp = ref('')
const selectedSkomp = ref()
const filteredSkomp = computed(() =>
  querySkomp.value === ''
    ? skomp.value
    : skomp.value.filter((item) => {
      return item.name.toLowerCase().includes(querySkomp.value.toLowerCase())
    }),
)

const { $jsonSerializer } = useNuxtApp()
const { data: levels } = await useApiFetch('/api/v1/skills', {
  parseResponse: txt => $jsonSerializer.deserialize('skills', JSON.parse(txt)),
})

function createIt() {
  data.value.skillType = selectedType,
  data.value.skillLevel = selectedLevel,
  data.value.source = selectedSource,
  data.value.occupations = occupationList,
  data.value.clusters = skompList,
  // data.value.sector = selectedSector,
  // data.value.subsectors = selectedSubSector,
  useApiFetch('/api/v1/skills', {
    method: 'POST',
    body: $jsonSerializer.serialize('skills', data.value),
  }).then(() => {
    loadSkills()
  })
}

function loadOccupation() {
  useApiFetch('/api/v1/occupations', {
  }).then((data) => {
    occupations.value = $jsonSerializer.deserialize('occupations', data.data.value)
  })
}
loadOccupation()

const occupationList = ref([])

watch(selectedOccupation, () => {
  addOccupation(selectedOccupation)
})

function addOccupation(item) {
  if (occupationList.value.findIndex(i => i.name === item.value.name) === -1)
    occupationList.value.push(item.value)

  queryOccupation.value = ''
}

function removeOccupation(index) {
  occupationList.value.splice(index, 1)
}

function loadSkomp() {
  useApiFetch('/api/v1/clusters', {
  }).then((data) => {
    skomp.value = $jsonSerializer.deserialize('clusters', data.data.value)
  })
}
loadSkomp()

const skompList = ref([])

function addSkomp(item) {
  if (skompList.value.findIndex(i => i.name === item.value.name) === -1)
    skompList.value.push(item.value)

  querySkomp.value = ''
}

function removeSkrom(index) {
  skompList.value.splice(index, 1)
}

watch(selectedSkomp, () => {
  addSkomp(selectedSkomp)
})

function deleteIt(id) {
  useApiFetch(`/api/v1/skills/${id}`, {
    method: 'delete',
  }).then(() => {
    loadSkills()
  })
}

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
      <div class="text-3xl mb-3">
        Vještina
      </div>
      <input v-model="data.name" class="sm:text-lg p-3 shadow-sm focus:ring-cup-300 focus:border-cup-300 block w-full border-gray-300 border rounded-md">
    </div>
    <div class="mt-5">
      <label for="comment" class="block text-sm font-medium text-gray-700 mb-2">Opis vještine</label>
      <textarea id="comment" v-model="data.description" rows="4" name="comment" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
    </div>
    <div class="grid grid-cols-3 gap-6">
      <Listbox v-model="selectedType" as="div" class="mt-5">
        <ListboxLabel class="block text-sm font-medium text-gray-700">
          Tip
        </ListboxLabel>
        <div class="mt-1 relative">
          <ListboxButton class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <span class="block truncate">{{ selectedType.name }}</span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              <ListboxOption v-for="person in type" :key="person.id" v-slot="{ active, selected }" as="template" :value="person">
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
      <Listbox v-model="selectedLevel" as="div" class="mt-5">
        <ListboxLabel class="block text-sm font-medium text-gray-700">
          Razina
        </ListboxLabel>
        <div class="mt-1 relative">
          <ListboxButton class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <span class="block truncate">{{ selectedLevel.name }}</span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              <ListboxOption v-for="person in level" :key="person.id" v-slot="{ active, selected }" as="template" :value="person">
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
      <Listbox v-model="selectedSource" as="div" class="mt-5">
        <ListboxLabel class="block text-sm font-medium text-gray-700">
          Izvor
        </ListboxLabel>
        <div class="mt-1 relative">
          <ListboxButton class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <span class="block truncate">{{ selectedSource.name }}</span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              <ListboxOption v-for="person in source" :key="person.id" v-slot="{ active, selected }" as="template" :value="person">
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
      <Combobox v-model="selectedOccupation" as="div" class="mt-3">
        <ComboboxLabel class="block text-sm font-medium text-gray-700">
          Zanimanja
        </ComboboxLabel>
        <div class="relative mt-1">
          <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" @change="queryOccupation = $event.target.value" />
          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>

          <ComboboxOptions v-if="filteredOccupation.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ComboboxOption v-for="person in filteredOccupation" :key="person.id" v-slot="{ active, selected }" :value="person" as="template">
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
          <button type="button" class="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white" @click="removeOccupation(index)">
            <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
              <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
            </svg>
          </button>
        </span>
      </Combobox>
      <Combobox v-model="selectedSkomp" as="div" class="mt-3">
        <ComboboxLabel class="block text-sm font-medium text-gray-700">
          SKOMP
        </ComboboxLabel>
        <div class="relative mt-1">
          <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" @change="querySkomp = $event.target.value" />
          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>

          <ComboboxOptions v-if="filteredSkomp.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ComboboxOption v-for="person in filteredSkomp" :key="person.id" v-slot="{ active, selected }" :value="person" as="template">
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
        <span v-for="(item, index) in skompList" :key="item.id" class="inline-flex rounded-full items-center py-0.5 pl-2.5 mt-2 mr-4 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700">
          {{ item.name }}
          <button type="button" class="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white" @click="removeSkrom(index)">
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
    <!--    <div class="grid grid-cols-2 gap-6 mt-4">-->
    <!--      <Combobox as="div" v-model="selectedSector" class="mt-3">-->
    <!--        <ComboboxLabel class="block text-sm font-medium text-gray-700">Sektor</ComboboxLabel>-->
    <!--        <div class="relative mt-1">-->
    <!--          <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="Pretraži sektore..." @change="querySector = $event.target.value" :display-value="(sector) => sector.name" />-->
    <!--          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">-->
    <!--            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />-->
    <!--          </ComboboxButton>-->

    <!--          <ComboboxOptions v-if="filteredSector.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">-->
    <!--            <ComboboxOption v-for="person in filteredSector" :key="person.id" :value="person" as="template" v-slot="{ active, selected }">-->
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
    <!--      <Listbox v-if="selectedSector !== undefined" as="div" v-model="selectedSubSector" class="mt-3">-->
    <!--        <ListboxLabel class="block text-sm font-medium text-gray-700"> Podsektor </ListboxLabel>-->
    <!--        <div class="mt-1 relative">-->
    <!--          <ListboxButton class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">-->
    <!--            <span class="block truncate">{{ selectedSubSector ? selectedSubSector : 'Odaberi podsektor...' }}</span>-->
    <!--            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">-->
    <!--          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />-->
    <!--        </span>-->
    <!--          </ListboxButton>-->

    <!--          <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">-->
    <!--            <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">-->
    <!--              <ListboxOption as="template" v-for="person in filteredSubSector" :key="person.id" :value="person.name" v-slot="{ active, selected }">-->
    <!--                <li :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-8 pr-4']">-->
    <!--              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">-->
    <!--                {{ person.name }}-->
    <!--              </span>-->
    <!--                  <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">-->
    <!--                <CheckIcon class="h-5 w-5" aria-hidden="true" />-->
    <!--              </span>-->
    <!--                </li>-->
    <!--              </ListboxOption>-->
    <!--            </ListboxOptions>-->
    <!--          </transition>-->
    <!--        </div>-->
    <!--      </Listbox>-->
    <!--    </div>-->

    <div class="mt-8 flex">
      <div class="inline-flex rounded-md shadow">
        <div class="cursor-pointer inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700" @click="createIt()">
          Spremi
        </div>
      </div>
    </div>
  </div>
  <div class="p-8">
    <h2 class="text-2xl font-bold tracking-tight text-gray-700 sm:text-2xl">
      Popis vještina
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
                  Izvor vještine
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcija
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, personIdx) in skills" :key="personIdx" :class="personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                <td class="px-6 py-4  text-sm text-gray-500">
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
