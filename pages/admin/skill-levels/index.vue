<script setup lang="ts">

definePageMeta({
  layout: 'admin',
})

const { $jsonSerializer } = useNuxtApp()
const { data: levels } = await useApiFetch('/api/v1/skill-levels', {
  parseResponse: txt => $jsonSerializer.deserialize('skill-levels', JSON.parse(txt)),
})
</script>

<template>
  <div>
    <div v-for="level in levels">{{ level.name }}</div>
  </div>
</template>
