<template>
  <label for="price" class="text-md font-medium text-gray-900 -mb-1">{{ label }}</label>
  <div class="mt-1 relative rounded-md shadow-sm">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <span class="text-gray-500 sm:text-sm pr-3">
        {{ sufix }}
      </span>
    </div>
    <input autocomplete="off" v-bind="$attrs" @input="data.amount = $event.target.value" type="text" name="price" id="price" class="focus:ring-blue-50 focus:border-blue-50 block w-full pl-9 pr-12 sm:text-sm border-gray-300 rounded-md"  />
    <div class="absolute inset-y-0 right-0 flex items-center">
      <label for="currency" class="sr-only">Currency</label>
      <select v-model="data.type" id="currency" name="currency" class="focus:ring-blue-50 focus:border-blue-50 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
        <option>Bruto</option>
        <option>Neto</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update'])

const data = reactive({
  amount: null,
  type: 'Bruto',
})

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
  sufix: {
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

watch(data, newValues => {
  emit('update', newValues)
})


</script>
