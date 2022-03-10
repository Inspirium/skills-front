<script setup lang="ts">

import { ref } from 'vue'
import gsap from 'gsap'

const { $jsonSerializer } = useNuxtApp()

const router = useRouter()
const route = useRoute()

const sectors = ref([])
function loadIt() {
  useApiFetch('/api/v1/sectors', {
    params: {
      'filter[parent]': false,
    },
  }).then((data) => {
    sectors.value = $jsonSerializer.deserialize('sectors', data.data.value)
  })
}
loadIt()

const test = computed(() => {
  return sectors.value.map(item => item.icon)
})

const hover = ref(null)

// onMounted(() => {
//   gasp.to('#sace', {
//     duration: 0.5,
//     opacity: 0,
//     scale: 0,
//     y: 200,
//     ease: 'power1',
//     stagger: 0.1,
//   })
// })


function showslow1() {
  gsap.from('.card', {
    duration: 0.5,
    opacity: 0,
    scale: 0,
    y: 200,
    ease: 'power1',
    stagger: {
      from: 'edges',
      each: 0.1
    }
  })
}
// showslow1()


</script>

<template>
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex">
    <client-only>
        <div v-for="item in 4" class="card mr-20"></div>
    </client-only>
  </div>

</template>
<style scoped>
.card {
  display: block;
  height: 6.5em;
  width: 6.5em;
  border-radius: 1%;
  background-color: #16c0b0;
  box-shadow: 0.08em 0.03em 0.4em #ababab;
}
</style>
