<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'

const navigation = [
  { name: 'Početna', href: '#', current: true },
  { name: 'Više o projektu', href: '#', current: false },
  { name: 'MROSP', href: 'https://mrosp.gov.hr/', current: false },
  { name: 'Kontakt', href: '#', current: false },
]

</script>

<template>
  <div class="">
    <Html class="h-full backtiles">
    <Body class="h-full" />
    </Html>
    <Disclosure as="nav" class="b" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 sm:pt-8">
        <div class="relative flex items-center justify-between h-28">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div class="flex-1 flex items-center justify-center sm:items-end sm:justify-start">
            <NuxtLink to="/" class="flex-shrink-0 flex items-center">
              <img class="block lg:hidden h-8 w-auto" src="/logo.svg" alt="Workflow" />
              <img class="hidden lg:block h-20 w-auto" src="/logo.svg" alt="Workflow" />
            </NuxtLink>
            <div class="hidden sm:ml-auto sm:flex items-center justify-end ">
              <div class="flex space-x-4 ">
                <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'text-cyan-400 font-semibold' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-lg uppercase font-medium font-dosis ']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
              </div>
            </div>
          </div>
          <!--        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">-->
          <!--          <button type="button" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">-->
          <!--            <span class="sr-only">View notifications</span>-->
          <!--            <BellIcon class="h-6 w-6" aria-hidden="true" />-->
          <!--          </button>-->

          <!--          &lt;!&ndash; Profile dropdown &ndash;&gt;-->
          <!--          <Menu as="div" class="ml-3 relative">-->
          <!--            <div>-->
          <!--              <MenuButton class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">-->
          <!--                <span class="sr-only">Open user menu</span>-->
          <!--                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />-->
          <!--              </MenuButton>-->
          <!--            </div>-->
          <!--            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">-->
          <!--              <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">-->
          <!--                <MenuItem v-slot="{ active }">-->
          <!--                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your Profile</a>-->
          <!--                </MenuItem>-->
          <!--                <MenuItem v-slot="{ active }">-->
          <!--                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</a>-->
          <!--                </MenuItem>-->
          <!--                <MenuItem v-slot="{ active }">-->
          <!--                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</a>-->
          <!--                </MenuItem>-->
          <!--              </MenuItems>-->
          <!--            </transition>-->
          <!--          </Menu>-->
          <!--        </div>-->
        </div>
        <div class="container">
          <div class="border-bottom-das"></div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium font-dosis']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <div class="h-full">
      <NuxtPage></NuxtPage>
    </div>
    <!--  <div class="footer text-gray-500 text-center w-full mt-28 pb-20 uppercase leading-6 tracking-[.5rem] text-sm">-->
    <!--    <div class="p">Vještine — sva prava zadržana @2022. nešto</div>-->
    <!--  </div>-->
  </div>

</template>
