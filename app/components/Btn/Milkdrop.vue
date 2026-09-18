<template>
<UTooltip text="MilkDrop" :popper="{ offsetDistance: 5 }" class="">
<button
class="flex items-center self-center ml-1 sm:ml-4 hover:cursor-pointer rounded-xl text-sm
active:ring-2 active:ring-gray-300 focus:ring-offset focus:ring-offset-gray-800 p-2"
:class="{'bg-sxvx-light-bg dark:bg-sxvx-dark-bg': !milkdrop.enabled,
         'bg-green-600': milkdrop.enabled}"
@click="milkdrop.toggle()"
>
<span class="sr-only">MilkDrop</span>
<Icon name="bx:atom" class="h-6 w-6 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
</button>
</UTooltip>
</template>

<script setup>
import { useMilkdropStore } from '@/stores/milkdrop'
const milkdrop = useMilkdropStore()
</script>
