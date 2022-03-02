<script setup lang="ts">
import {ref, computed, watch} from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  name: {
    type: String,
    required: false,
    default: '',
  },
  haveProposition: {
    type: Boolean,
    required: false,
    default: false,
  },
  size: {
    type: String,
    required: false,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    required: false,
    default: '',
  }
})

</script>


<template>
  <div class="border-0 bg-transparent p-0">
    <label :for="name" class="block text-gray-700" :class="[size === 'lg' ? 'text-lg font-bold' : 'font-medium text-md']">
      {{ label }}
    </label>
    <div class="mt-1">
      <input v-bind="$attrs" @input="$emit('update:modelValue', $event.target.value)" :value="modelValue" placeholder="" :name="name"  class="shadow-sm focus:ring-cup-300 focus:border-cup-300 block w-full border-gray-300 rounded-md" :class="[size === 'lg' ? 'sm:text-lg py-3' : 'sm:text-sm py-3']" />
    </div>
  </div>
</template>

