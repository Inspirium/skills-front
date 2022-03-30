<script setup lang="ts">
import { ref, watch } from 'vue'
import { PlusIcon, XIcon } from '@heroicons/vue/outline'

const emit = defineEmits(['update', 'reset'])

const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: 'Pretraži...',
  },
})

const propsValue = ref(props)
const term = ref('')

watch(term, () => {
  if (term.value === '') {
    emit('reset')
  } else {
    emit('update', term)
  }
})

</script>

<template>
  <div class="px-4 py-4 flex justify-center">
    <div class="flex flex-grow max-w-lg items-center">
      <input
          id="search"
          autocomplete="off"
          v-model="term"
          type="text"
          name="name"
          class="shadow-sm pb-3 placeholder:text-gray-300 placeholder:text-lg block w-full sm:text-2xl border-white px-4 rounded-full  ring-0"
          :placeholder="propsValue.placeholder"
      >
      <transition name="fade">
        <div v-if="term === ''">
          <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="magnifying-glass"
              class="w-8 h-8 ml-5"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
          ><path fill="#888" class="text-cup-50" d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" /></svg>
        </div>
        <div v-else @click="term = ''" class="hover:cursor-pointer hover:scale-125 transition">
          <XIcon class="w-8 h-8 ml-5 text-gray-700" aria-hidden="true" />
        </div>
      </transition>
    </div>
  </div>
</template>
