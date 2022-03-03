<template>
  <div class="relative sm:col-span-6 " :class="[size === 'small' ? 'mt-1' : 'mt-8']">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-dashed border-cup-500" />
    </div>
    <div class="relative flex justify-center">
        <span class="px-6 bg-gray-50 text-3xl mt-1 mb-1 text-gray-700 font-poppins font-bold" :class="[size === 'small' ? 'text-xl text-cup-500 font-semibold' : '']">
          {{ label }}
        </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
    default: 'Odvojeno',
  },
  size: {
    type: String,
    required: false,
    default: '',
  }
})





</script>
