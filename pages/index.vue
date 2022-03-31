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
  console.log('daj nekaj')
  loaded.value = true
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
    <div class="md:flex justify-between sm:space-x-20 md:mt-12 md:items-center">
      <div class="bounce-reverse">
        <h1 class="font-bold text-[3rem] leading-[3.5rem] md:my-0 my-6 md:text-[4.5rem] md:leading-[5rem] font-dosis text-grey-700">
          Katalog digitalnih i zelenih vještina
        </h1>
        <div class="md:flex md:space-x-2 space-y-2 items-baseline">
          <h2 class="font-semibold text-2xl md:text-2xl font-dosis md:mt-6">
            Prikaži izdvojeno:
          </h2>
          <NuxtLink class="text-white mr-3 md:mr-0 inline-block rounded-lg bg-cyan-500 sm:px-2 px-4 sm:py-1 py-2 font-semibold cursor-pointer hover:scale-110 hover:shadow-xl transition" to="/sector/digital">
            Digitalne vještine
          </NuxtLink>
          <NuxtLink class="text-white inline-block rounded-lg bg-lime-500 sm:px-2 px-4 sm:py-1 py-2 font-semibold cursor-pointer hover:scale-110 hover:shadow-xl transition" to="/sector/green">
            Zelene vještine
          </NuxtLink>
        </div>
      </div>
      <p class="max-w-xl text-left sm:text-right md:mt-0 mt-10">
        <span class="text-cyan-500 font-bold text-2xl font-dosis">Vještine</span>  predstavljaju primjenu znanja i upotrebu propisanih načina rada u izvršenju zadaća i rješavanju problema. U Hrvatskome kvalifikacijskom okviru vještine se dijele na kognitivne (logičko, intuitivno i kreativno razmišljanje) i psihomotoričke (fizička spretnost te upotreba metoda, instrumenata, alata i materijala).
        Standardi zanimanja, skupovi kompetencija, standardi kvalifikacija, skupovi ishodi učenja i obrazovni programi svrstavaju se u sektore utvrđene za potrebe provedbe Hrvatskoga kvalifikacijskog okvira.
      </p>
    </div>
    <client-only>
      <sace/>
    </client-only>
  </div>
</template>
