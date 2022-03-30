<script setup lang="ts">
import gsap from 'gsap'

const { $jsonSerializer } = useNuxtApp()

const router = useRouter()
const route = useRoute()

const { data: sectors } = await useApiFetch('/api/v1/sectors', {
  params: {
    'filter[parent]': false,
  },
  parseResponse: txt => $jsonSerializer.deserialize('sectors', JSON.parse(txt)),
})

const test = computed(() => {
  return sectors.value.map(item => item.icon)
})

const hover = ref(null)
const width = ref(320)
const loaded = ref(false)

function initAnimation() {
  window.addEventListener('resize', () => {
    width.value = window.innerWidth
  })
  width.value = window.innerWidth
  showslow1()
}

onUpdated(initAnimation)
onMounted(initAnimation)

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    width.value = window.innerWidth
  })
})

//
// function beforeEnter(el) {
//   el.style.opacity = 0
//   el.style.transform = 'scale(2,2)'
// }
//
// function enter(el, done) {
//   gsap.to(el, {
//     duration: 1,
//     opacity: 1,
//     scale: 1,
//     ease: 'bounce.out',
//     onComplete: done
//   })
// }

function showslow1() {
  gsap.to('.sace', {
    duration: 0.2,
    opacity: 1,
    scale: 1,
    y: 0,
    ease: 'power1',
    stagger: 0.1,
  })
}

const lineBreak = computed(() => {
  let b
  if (width.value < 450)
    b = 2

  if (width.value > 450)
    b = 3

  if (width.value > 580)
    b = ((width.value - 580) / 234 >> 0) * 2 + 4

  if (b > 10)
    b = 10

  return b
})

// const beforeEnter = (el) => {
//   el.style.opacity = 0
//   el.style.transform = 'scale(0,0)'
// }
//
// const enter = (el) => {
//   gsap.to(el, {
//     duration: 10,
//     opacity: 1,
//     scale: 1,
//     ease: 'bounce.out',
//     onComplete: done
//   })
// }

</script>

<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-40">
    <!--    <font-awesome-icon icon="tree"></font-awesome-icon>-->
    <!--    <client-only>-->
    <!--      <transition @before-enter="beforeEnter" @enter="enter" :css="false" appear>-->
    <!--        <div class="card"></div>-->
    <!--      </transition>-->
    <!--    </client-only>-->
    <div class="md:flex justify-between sm:space-x-20 md:mt-12 md:items-center">
      <div class="bounce-reverse">
        <h1 class="font-bold text-[3rem] leading-[3.5rem] md:my-0 my-6 md:text-[4.5rem] md:leading-[5rem] font-dosis text-grey-700">
          Katalog digitalnih i zelenih vještina
        </h1>
        <div class="md:flex md:space-x-2 space-y-2 items-baseline">
          <h2 class="font-semibold text-2xl md:text-2xl font-dosis md:mt-6">
            Prikaži izdvojeno:
          </h2>
          <div @click="router.push('/sector/digital')" class="text-white mr-3 md:mr-0 inline-block rounded-lg bg-cyan-500 sm:px-2 px-4 sm:py-1 py-2 font-semibold cursor-pointer hover:scale-110 hover:shadow-xl	transition">Digitalne vještine</div>
          <div @click="router.push('/sector/green')" class="text-white inline-block rounded-lg bg-lime-500 sm:px-2 px-4 sm:py-1 py-2 font-semibold cursor-pointer hover:scale-110 hover:shadow-xl	transition">Zelene vještine</div>
        </div>
      </div>
      <p class="max-w-xl text-left sm:text-right md:mt-0 mt-10">
        <span class="text-cyan-500 font-bold text-2xl font-dosis">Grupe vještina</span> prikazuju grupe sličnih specijalističkih zadataka. Specijalistički zadaci osmišljeni su tako da opisuju svakodnevni rad unutar zanimanja. Ovi zadaci su uglavnom prenosivi – ako možete obaviti jedan zadatak u klasteru, možete obaviti i ostale. Klasteri vještina ilustriraju novi način gledanja na tržište rada na ‘dubljoj’ razini od klasifikacije zanimanja ili kvalifikacija. Ovaj pogled pokazuje kako su vještine povezane i povezane jedna s drugom te ilustrira prenosivost vještina u različitim zanimanjima.
      </p>
    </div>
    <div v-if="lineBreak > 2" class="flex-wrap mt-12 flex">
      <div v-for="(item, index) in sectors" id="sace" :key="index" :class="[hover === index ? 'activecell bounce' : 'bounce-reverse', index % lineBreak ? '' : 'ml-[6.8rem]']" class="-mr-[3.2rem] w-[270px] h-[240px] relative -mb-[3.2rem] opacity-0 scale-50 translate-y-[100px] cursor-pointer transition sace" @click="router.push(`/sector/${item.id}`)" @mouseover="hover = index" @mouseleave="hover = null">
        <h3 class="z-10 w-3/5 absolute text-center hex-text-center font-roboto font-medium text-lg text-gray-800 leading-6 -mt-3 transition">
          {{ item.name }}
        </h3>
        <font-awesome-icon class="absolute hex-icon w-10 h-10 " :color="hover !== index ? `#${item.color}` : '#ffffff'" :icon="item.icon" />
        <svg class="dropshadow z-20" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="270px" height="240px" viewBox="0 0 141.74 162.98" xml:space="preserve">
          <polygon fill-rule="evenodd" clip-rule="evenodd" :fill="hover === index ? `#${item.color}` : '#ffffff'" class="text-grey-700 transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "/>
          <path fill-rule="evenodd" clip-rule="evenodd" :fill="`#${item.color}`" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"/>
        </svg>
      </div>
    </div>
    <div v-if="lineBreak <= 2" class="flex flex-col mt-12">
      <div v-for="(item, index) in sectors" id="sace" :key="index" :class="[index % 2 ? '-mt-4' : 'ml-[2rem] -mt-4']" class="h-[120px] relative opacity-0 scale-50 translate-y-[100px] cursor-pointer transition sace flex items-center relative" @click="router.push(`/sector/${item.id}`)">
        <div class="w-[100px] flex justify-center items-center">
          <font-awesome-icon class="absolute z-10 w-10 h-10 z-50" :color="hover !== index ? `#${item.color}` : '#ffffff'" :icon="item.icon" />
          <svg class="dropshadow z-20" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               width="100px" height="120px" viewBox="0 0 141.74 162.98" xml:space="preserve">
          <polygon fill-rule="evenodd" clip-rule="evenodd" :fill="hover === index ? `#${item.color}` : '#ffffff'" class="text-grey-700 transition duration-500" points="141.74,40.62 71.21,0 0,40.87 0,122.36 71.21,162.98
          141.74,122.12 "/>
            <path fill-rule="evenodd" clip-rule="evenodd" :fill="`#${item.color}`" d="M141.74,40.62L71.21,0L0,40.87v81.49l71.21,40.62l70.53-40.86
          V40.62z M71.21,4.44l67.06,38.64v77.46l-67.06,38.87L3.48,120.77V43.31L71.21,4.44z"/>
          </svg>
        </div>
        <h3 class="z-10 font-roboto font-medium text-lg text-gray-800 leading-6 transition ml-4">
          {{ item.name }}
        </h3>
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
