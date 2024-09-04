<template>
  <Menu as="div" class="relative ml-4">
    <div>
      <MenuButton @click="toggle_effects_block" class="flex rounded-full bg-zinc-200 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2">
        <span class="sr-only">Effects On/Off</span>
        <Icon name="heroicons:sparkles" class="h-7 w-7 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
      </MenuButton>
    </div>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <div id="Effects_block" v-show="showEffectsBlock"  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-zinc-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <MenuItem as="div" class="">
          <button type="button"  @click="toggleEffects" id="menu_button"  class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">Light Mode</span>
          </button>
        </MenuItem>
        <MenuItem as="div" class="">
          <button type="button"  class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">Light Mode</span>
          </button>
        </MenuItem>
        <MenuItem as="div" class="">
          <button type="button"  class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">Light Mode</span>
          </button>
        </MenuItem>
        <MenuItem as="div" class="">
          <button type="button"  class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">Light Mode</span>
          </button>
        </MenuItem>
      </div>

    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ref, onMounted } from 'vue';

// Функции для работы с localStorage
function getItem(item) {
  if (import.meta.client) {
    return localStorage.getItem(item);
  } else {
    return undefined;
  }
}

function setItem(item, value) {
  if (import.meta.client) {
    localStorage.setItem(item, value);
    return true;
  } else {
    return false;
  }
}
// Состояние для показа/скрытия Effects_block
const showEffectsBlock = ref(false);
function toggle_effects_block() {
  showEffectsBlock.value = !showEffectsBlock.value;
}
// Функция для изменения состояния элементов и localStorage
function toggleEffects() {
  const overlays = ["overlay0", "overlay1", "overlay2", "overlay3", "overlay4", "overlay5"];
  const button = document.getElementById("menu_button");

  let effectsOn = overlays.some(overlayId => {
    const overlay = document.getElementById(overlayId);
    return overlay.style.display === "flex";
  });

  overlays.forEach(overlayId => {
    const overlay = document.getElementById(overlayId);
    if (effectsOn) {
      overlay.style.display = "none";
      setItem("effects", "false");
      button.classList.remove("bg-zinc-200");
      button.classList.remove("dark:bg-zinc-800");
      button.classList.add("bg-red-400");
      button.classList.add("dark:bg-red-400");
    } else {
      overlay.style.display = "flex";
      setItem("effects", "true");
      button.classList.remove("bg-red-400");
      button.classList.remove("dark:bg-red-400");
      button.classList.add("bg-zinc-200");
      button.classList.add("dark:bg-zinc-800");
    }
  });
}

// Изменение состояния элементов при загрузке страницы
onMounted(() => {
  const effectsToggle = getItem("effects");
  const overlays = ["overlay0", "overlay1", "overlay2", "overlay3", "overlay4", "overlay5"];

  // Проверяем значение effectsToggle и устанавливаем display 
  if (effectsToggle === "true" || effectsToggle === null) { //  Если effectsToggle == "true" или null, то overlays должны быть видны
    overlays.forEach(overlayId => {
      const overlay = document.getElementById(overlayId);
      overlay.style.display = "flex";
    });
  } else { // Если effectsToggle == "false", то overlays должны быть не видны
    overlays.forEach(overlayId => {
      const overlay = document.getElementById(overlayId);
      overlay.style.display = "none";
    });
  }

  // Устанавливаем стиль кнопки
  const button = document.getElementById("menu_button");
  if (effectsToggle === "true" || effectsToggle === null) { // "true" или null - overlays видны, кнопка белая
    button.classList.remove("bg-red-400");
    button.classList.remove("dark:bg-red-400");
    button.classList.add("bg-zinc-200");
    button.classList.add("dark:bg-zinc-800");
  } else { // "false" - overlays не видны, кнопка красная
    button.classList.remove("bg-zinc-200");
    button.classList.remove("dark:bg-zinc-800");
    button.classList.add("bg-red-400");
    button.classList.add("dark:bg-red-400");
  }
});
</script>


