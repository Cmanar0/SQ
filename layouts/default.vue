<template>
  <div class="min-h-screen flex-col">
    <div class="nav-bar">
      <header class="bg-gray-800 text-white p-5">
        <span>
          <hamburger class="ham hover:text-gray-300" @click="toggleMenu" />
        </span>
        <a href="#" class="text-white text-2xl font-semibold uppercase hover:text-gray-300">Logo</a>
        <div v-if="isMobile">Mobile</div>
        <div v-else>Desktop</div>
      </header>
    </div>
    <div class="flex">
      <!-- Sidebar -->
      <div
        :class="{ menuClosed: !mennuOpen }"
        class="menu h-screen-minus-80 space-y-6 py-7 px-2 bg-gray-800 text-white flex flex-col"
      >
        <nav>
          <a
            href="/"
            class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            <users class="icon" />
            <span class="menu-item" :class="{ 'menu-item-hide': !mennuOpen }"> Users </span>
          </a>
        </nav>
      </div>
      <!-- Main content -->
      <main class="p-5">
        <NuxtPage />
        {{ mennuOpen }}
        <NuxtPage />
        <NuxtPage />
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
import hamburger from '../assets/svg/hamburger.vue'
import users from '../assets/svg/users.vue'

import { onMounted, onUnmounted, ref, computed } from 'vue'

const windowWidth = ref(0)

// ------------- toggle menu on mobile start ------------- :
const mennuOpen = ref(false)

const toggleMenu = () => {
  mennuOpen.value = !mennuOpen.value
}
// ------------- toggle menu on mobile end -------------

// ------------- update window width start ------------- :
const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

const isMobile = computed(() => {
  return windowWidth.value < 768
})
// ------------- update window width end -------------

onMounted(() => {
  window.addEventListener('resize', updateWidth)
  updateWidth() // Ensure correct initial value
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<style scoped>
.nav-bar header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.h-screen-minus-80 {
  position: fixed;
  top: 80px;
  height: calc(100vh - 80px);
}

.nav-bar {
  height: 80px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

main {
  margin-top: 80px;
  width: 100%;
}
.menu {
  width: 264px;
  transition: width 0.5s;
}
.menuClosed {
  width: 70px;
  transition: width 0.5s;
}
.menu a {
  display: flex;
  align-items: center;

  min-height: 44px;
}

.ham {
  cursor: pointer;
}
.icon {
  min-width: 1.1em;
  min-height: 1em;
  cursor: pointer;
  display: flex;
}
.menu-item {
  margin-left: 8px;
  transition: opacity 0.5s;
  opacity: 1;
}
.menu-item-hide {
  transition: opacity 0.5s;
  opacity: 0;
}
</style>
