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
    <!--    <font-awesome-icon icon="tree"></font-awesome-icon>-->
    <!--    <client-only>-->
    <!--      <transition @before-enter="beforeEnter" @enter="enter" :css="false" appear>-->
    <!--        <div class="card"></div>-->
    <!--      </transition>-->
    <!--    </client-only>-->
    <div class="md:flex justify-center sm:space-x-20 md:mt-12 md:items-center">
      <div class="bounce-reverse justify-center flex flex-col items-center">
        <h1 class="font-bold text-[3rem] leading-[3.5rem] md:my-0 my-6 md:text-[4.5rem] md:leading-[5rem] font-dosis text-grey-700">
          O projektu
        </h1>
        <div class="md:flex md:space-x-2 space-y-2 items-center justify-center text-center">
          <h2 class="font-semibold text-3xl md:text-4xl font-dosis md:mt-6">
            Katalog <span class="text-cyan-500">digitalnih</span> i <span class="text-lime-500">zelenih</span> vještina
          </h2>
        </div>
      </div>
    </div>
    <div class="max-w-xl text-left mx-auto">
      <p class=" mt-10">
        Ministarstvo rada, mirovinskoga sustava, obitelji i socijalne politike (MROSP) tijekom 2022. godine započelo je s provedbom sustava vaučera, čiji je cilj omogućiti veće sudjelovanje nezaposlenih i zaposlenih osoba u cjeloživotnom obrazovanju s naglaskom na stjecanju vještina povezanih sa <NuxtLink to="/" class="font-bold text-lime-500">zelenom</NuxtLink> i <NuxtLink to="/" class="font-bold text-cyan-500">digitalnom</NuxtLink> tranzicijom. Kako bi se detektiralo koji su to obrazovni programi prihvatljivi za dodjelu vaučera, odnosno stjecanje kojih vještina će se financirati kao odgovor na potrebe tržišta rada, u prvom koraku proveden je postupak inicijalnog mapiranja vještina upisanih u Registar HKO sukladno usuglašenoj metodologiji te je kao finalni rezultat izrađen katalog vještina potrebnih za digitalnu i zelenu transformaciju/tranziciju gospodarstva. U drugom koraku Katalog se kontinuirano nadopunjuje novoupisanim zelenim i digitalnim vještinama iz Registra HKO te zelenim i digitalnim vještinama iz vanjskih baza vještina kao što su ESCO, O*NET, CEDEFOP, Canadian Skills and Knowledge Checklist i slično. U trećem koraku u Katalog će biti uključene nove zelene i digitalne vještine dobivene kontinuiranim pregledom oglasa za poslove.
      <p class="mt-4">Katalog zelenih i digitalnih vještina omogućuje MROSP-u detekciju vještina potrebnih za rad unutar postojećih sektora i podsektora Hrvatskog kvalifikacijskog okvira posebno u kontekstu zelenih i digitalnih tranzicija ključnih za povećanje zapošljivosti, ali i osiguranje postojeće zapošljivosti i prevenciju porasta broja nezaposlenih.</p>
      <p class="mt-4">Do popisa zelenih i digitalnih  vještine u na <NuxtLink to="/" class="font-bold text-cyan-500">Početnoj stranici Kataloga</NuxtLink> dolazi se na dva načina: (i) kroz odabir željenog sektora i podsektora ili (ii) kroz odabir jedne od ikona Digitalne vještine/Zelene vještine. U prvom slučaju prikazuje se lista zelenih i digitalnih vještina u pojedinom podsektoru, a u drugom lista svih zelenih ili digitalnih vještina trenutno upisanih u Katalog. Odabirom pojedine vještine prikazuju se specifični podaci o vještini kao što su tip, izvor te njena veza s pojedinim standardima zanimanja upisanih u Registar HKO.</p>
      </p>
    </div>
  </div>
</template>
