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
//   gasp.to('.sace', {
//     duration: 0.5,
//     opacity: 0,
//     scale: 0,
//     y: 200,
//     ease: 'power1',
//     stagger: {
//       from: 'edges',
//       each: 0.1
//     }
//   })
// })

// function beforeEnter(el) {
//   el.style.opacity = 0
//   el.style.transform = 'scale(0,0)'
// }
//
// function enter(el, done) {
//   gsap.to(el, {
//     duration: 10,
//     opacity: 1,
//     scale: 1,
//     ease: 'bounce.out',
//     onComplete: done
//   })
// }

const beforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = 'scale(0,0)'
}

const enter = (el) => {
  gsap.to(el, {
    duration: 10,
    opacity: 1,
    scale: 1,
    ease: 'bounce.out',
    onComplete: done
  })
}

</script>

<template>
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
<!--    <font-awesome-icon icon="tree"></font-awesome-icon>-->
    <transition appear @before-enter="beforeEnter" @enter="enter" >
      <div class="card"></div>
    </transition>
    <div class="flex justify-between text-white mt-12">
      <div class="bounce-reverse">
        <h1 class="font-semibold sm:text-[5rem] font-dosis">Istraži vještine</h1>
        <h2 class="font-light sm:text-4xl font-dosis -mt-2">Neki zgodan podnaslov</h2>
      </div>
      <p class="max-w-xl text-right"><span class="text-cyan-400 font-bold text-2xl font-dosis">Grupe vještina</span> prikazuju grupe sličnih specijalističkih zadataka. Specijalistički zadaci osmišljeni su tako da opisuju svakodnevni rad unutar zanimanja. Ovi zadaci su uglavnom prenosivi – ako možete obaviti jedan zadatak u klasteru, možete obaviti i ostale. Klasteri vještina ilustriraju novi način gledanja na tržište rada na ‘dubljoj’ razini od klasifikacije zanimanja ili kvalifikacija. Ovaj pogled pokazuje kako su vještine povezane i povezane jedna s drugom te ilustrira prenosivost vještina u različitim zanimanjima.
      </p>
    </div>
    <div class="flex flex-wrap mt-20">
      <div v-for="(item, index) in sectors" :class="hover === index ? 'activecell bounce' : 'bounce-reverse', index === 0 || index === 10 || index === 20 ? 'ml-[6.8rem]' : ''" class="-mr-[3.2rem] w-[270px] h-[240px] relative -mb-[3.2rem] cursor-pointer transition sace" @click="router.push(`/sector/${item.id}`)" @mouseover="hover = index" @mouseleave="hover = null">
        <h3 class="z-10 w-3/5 absolute text-center hex-text-center font-roboto font-medium text-lg text-gray-800 leading-6 -mt-3 transition">{{ item.name }}</h3>
        <font-awesome-icon  class="absolute hex-icon w-10 h-10 " :color="hover !== index ? `#${item.color}` : '#ffffff'" :icon="item.icon"></font-awesome-icon>
        <svg class="dropshadow z-20" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="270px" height="240px" viewBox="0 0 141.74 162.98" xml:space="preserve">
          <polygon fill-rule="evenodd" clip-rule="evenodd" :fill="hover === index ? `#${item.color}` : '#ffffff'" class="text-white transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "/>
          <path fill-rule="evenodd" clip-rule="evenodd" :fill="`#${item.color}`" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"/>
        </svg>
      </div>
    </div>
  </div>

</template>
<style scoped>
.card {
  display: block;
  margin: 0 auto 0 auto;
  height: 6.5em;
  width: 6.5em;
  border-radius: 1%;
  background-color: #16c0b0;
  box-shadow: 0.08em 0.03em 0.4em #ababab;
}
</style>
