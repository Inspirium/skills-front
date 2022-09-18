<template>
  <div class="sm:col-span-6">
    <div>
      <div class="flex items-center justify-between">
        <h2 class="text-md font-medium text-gray-900 -mb-1">
          {{ label }}
        </h2>
      </div>
      <RadioGroup v-model="selectedOption" class="mt-2">
        <RadioGroupLabel class="sr-only">
          Choose a selectedOptionory option
        </RadioGroupLabel>
        <div class="grid grid-cols-3 gap-3 sm:grid-cols-3">
          <RadioGroupOption v-for="option in options" :key="option.name" v-slot="{ active, checked }" as="template" :value="option">
            <div :class="[option.color ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed', active ? 'ring-2 ring-offset-2 ring-sky-500' : '', checked ? [option.color, 'text-white', 'border-transparent']: 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50', 'border rounded-md py-2 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 drop-shadow-sm']">
              <RadioGroupLabel as="p" class="text-md">
                {{ option.name }}
              </RadioGroupLabel>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
  </div>
</template>

<script setup lang="ts">

import { computed, ref } from 'vue'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

const selectedOption = ref(props.options[0])

const emit = defineEmits(['update'])

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: [],
  },
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
})

watch(selectedOption, (newValues) => {
  emit('update', selectedOption)
})

</script>
