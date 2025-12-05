<script setup>
import { TowerEvent } from '@/models/TowerEvent.js';


defineProps({
  towerEvent: { type: TowerEvent, required: true }
})
</script>


<template>
  <div class="event-card border border-2 border-dark-subtle shadow">
    <RouterLink :to="{ name: 'Events', params: { towerEventId: towerEvent.id } }">
      <div class="image-container" :style="{ backgroundImage: `url(${towerEvent.coverImg})` }">
        <p v-if="towerEvent.isCanceled" class="notification-text canceled-bg">CANCELED!</p>
        <p v-if="towerEvent.ticketCount == towerEvent.capacity" class="notification-text sold-out-bg">SOLD OUT!</p>
      </div>
    </RouterLink>
    <div class="p-1 details-sec">
      <h5>{{ towerEvent.name }}</h5>
      <p>Hosted By: {{ towerEvent.creator.name }}</p>
      <p>{{ towerEvent.startDate.toLocaleDateString() }} {{ towerEvent.location }}</p>
      <p>{{ towerEvent.capacity - towerEvent.ticketCount }} Seats {{ towerEvent.ticketCount }} Attending</p>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.image-container {
  width: 100%;
  height: 200px;
  aspect-ratio: 1/1;
  background-size: cover;
  background-position: center;
    position: relative;
    border-radius: 5px 5px 0px 0px;
  }
  
  .notification-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
    text-shadow: 2px 2px 5px black;
    padding: .5rem;
    border-radius: 8px;
  }
  
  .canceled-bg {
    background-color: red;
  }
  
  .sold-out-bg {
    background-color: blue;
  }
  
  .event-card {
    background-color: #ededf1;
    height: 100%;
  border-radius: 6px;
}

a {
  text-decoration: none;
}
</style>