<script setup lang="ts">

import { ref, watch } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

const props = defineProps({
  options: {
    type: Array,
    required: false,
    default: [],
  },
  label: {
    type: String,
    required: true,
    default: 'Filtriraj',
  },
  size: {
    type: String,
    required: false,
    default: '',
  },
  forEdit: {
    type: Object,
    required: false,
    default: {},
  }
})

const isEdit = ref(props.forEdit)
const isOptions = ref(props.options)
const isoptionsObject = ref(props.optionsObject)
const emit = defineEmits(['update'])
const selected = ref({})

watch(selected, newValues => {
  emit('update', selected)
})

function editPopulate() {
  if (Object.keys(isEdit.value).length) {
    selected.value = isEdit.value
  } else {
    selected.value = isOptions.value[0]
  }
}
editPopulate()


</script>

<template>
  <Listbox as="div" v-model="selected" class="sm:col-span-3">
    <ListboxLabel class="block font-medium text-gray-700 font-medium text-md">
      {{label }}
    </ListboxLabel>
    <div class="mt-1 relative">
      <ListboxButton class="relative border border-gray-300 w-full shadow-sm bg-white rounded-full pl-5 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-cup-300 focus:border-blue-50 text-md font-medium">
        <span :class="size === 'large' ? '' : 'text-sm'" class="block truncate">{{ selected.name }}</span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto sm:text-sm">
          <ListboxOption as="template" v-for="item in options" :key="item.id" :value="item" v-slot="{ active, selected }">
            <li :class="[active ? 'text-white bg-sky-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-8 pr-4']">
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                  {{ item.name }}
                </span>
              <span v-if="selected" :class="[active ? 'text-white' : 'text-cup-500', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>


