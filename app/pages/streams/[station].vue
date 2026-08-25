<template>
  <div>
    <StationHero :station="station" />
    <StationNowPlaying :station="station" />
  </div>
</template>

<script setup>
import { getStationBySlug, stationSlugs } from '~/config/stations'

// Одна страница на все станции: /streams/rock, /streams/omfm и т.д.
definePageMeta({
  validate: (route) => stationSlugs.includes(String(route.params.station)),
})

const route = useRoute()
const station = computed(() => getStationBySlug(String(route.params.station)))

useSeoMeta({
  title: () => `${station.value.text.hero} — ${station.value.text.tagline} | omFM.ru`,
  description: () => `${station.value.text.menu}: ${station.value.text.tagline}`,
})
</script>
