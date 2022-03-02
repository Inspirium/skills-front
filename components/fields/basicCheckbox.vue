<script setup lang="ts">

import {ref, watch} from 'vue'
import { Switch } from '@headlessui/vue'
import { connectedProposition } from '/stores/proposition'

const emit = defineEmits(['update'])

const propoStore = connectedProposition()
const checkBox = ref(false)

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  haveProposition: {
    type: Boolean,
    required: false,
    default: false,
  },
  forEdit: {
    type: Boolean,
    required: false,
    default: null,
  }
})

const isEdit = ref(props.forEdit)

watch(checkBox, newValues => {
  emit('update', newValues)
})

function editPopulate() {
  if (isEdit.value !== null) {
    checkBox.value = isEdit.value
  }
}
editPopulate()

</script>

<template>
  <div @click="checkBox = !checkBox" class="sm:col-span-1 border transition duration-200 border-gray-300 p-3 flex flex-col justify-center items-center rounded-md shadow-sm" :class="checkBox ? 'bg-cup-300' : 'bg-white'">
    <label class="text-md font-medium -mb-1 block" :class="checkBox ? 'text-white' : 'text-gray-900'">
      {{ label }}
    </label>
    <Switch :class="[checkBox ? 'bg-cup-500' : 'bg-gray-200', 'mt-3 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-50']">
      <span :class="[checkBox ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']">
        <span :class="[checkBox ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']" aria-hidden="true">
          <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
            <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span :class="[checkBox ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']" aria-hidden="true">
          <svg class="h-3 w-3 text-cup-500" fill="currentColor" viewBox="0 0 12 12">
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg>
        </span>
      </span>
    </Switch>
  </div>
</template>


