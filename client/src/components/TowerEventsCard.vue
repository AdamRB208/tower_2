<script setup>
import { TowerEvent } from '@/models/TowerEvent.js';


defineProps({
  towerEvent: { type: TowerEvent, required: true }
})
</script>


<template>
  <div class="event-card border border-dark-subtle border-3 shadow mb-4">
    <RouterLink :to="{ name: 'Events', params: { towerEventId: towerEvent.id } }">
      <img :src="towerEvent.coverImg" :alt="'cover image for ' + towerEvent.name" type="button">
    </RouterLink>
    <div class="p-1">
      <h5>{{ towerEvent.name }}</h5>
      <p>Hosted By: {{ towerEvent.creator.name }}</p>
      <p>{{ towerEvent.startDate.toLocaleDateString() }} {{ towerEvent.location }}</p>
      <p>{{ towerEvent.capacity - towerEvent.ticketCount }} Seats {{ towerEvent.ticketCount }} Attending</p>
      <p v-if="towerEvent.isCanceled" class="text-danger">CANCELLED</p>
    </div>
  </div>
</template>


<style lang="scss" scoped>
img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.event-card {
  background-color: #8c8a8f;

}
</style>