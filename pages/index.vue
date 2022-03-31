<script setup lang="ts">
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
        <span class="text-cyan-500 font-bold text-2xl font-dosis">Grupe vještina</span> prikazuju grupe sličnih specijalističkih zadataka. Specijalistički zadaci osmišljeni su tako da opisuju svakodnevni rad unutar zanimanja. Ovi zadaci su uglavnom prenosivi – ako možete obaviti jedan zadatak u klasteru, možete obaviti i ostale. Klasteri vještina ilustriraju novi način gledanja na tržište rada na ‘dubljoj’ razini od klasifikacije zanimanja ili kvalifikacija. Ovaj pogled pokazuje kako su vještine povezane i povezane jedna s drugom te ilustrira prenosivost vještina u različitim zanimanjima.
      </p>
    </div>
    <client-only>
      <sace/>
    </client-only>
  </div>
</template>
