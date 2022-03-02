<script setup lang="ts">

import { ref, computed } from 'vue'
import { connectedProposition } from '/stores/proposition'

const propoStore = connectedProposition()

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
  numberOfRows: {
    type: Number,
    required: false,
    default: 5,
  },
  modelValue: {
    type: [String, Number],
    required: false,
    default: '',
  }
})

</script>

<template>
  <label :for="name" class="block text-gray-700 font-medium text-md">
    {{ label }}
  </label>
  <div class="mt-1" :class="{'select-none': haveProposition, 'opacity-40': haveProposition}">
    <textarea v-bind="$attrs" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" name="info" :rows="numberOfRows" class="shadow-sm focus:ring-cup-300 focus:border-cup-300 block w-full sm:text-sm border border-gray-300 rounded-md sm:text-sm" />
  </div>
</template>

