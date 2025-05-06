<script setup>
import { AppState } from '@/AppState.js';
import ModalComponent from '@/components/ModalComponent.vue';
import TowerEventsCard from '@/components/TowerEventsCard.vue';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';

const account = computed(() => AppState.account)

const towerEvent = computed(() => {
  if (filterCategory.value == 'all') {
    return AppState.towerEvent
  }
  return AppState.towerEvent.filter(towerEvent => towerEvent.type == filterCategory.value)
})

const filterCategory = ref('all')

const categories = [
  {
    name: 'All'
  },
  {
    name: 'Concert'
  },
  {
    name: 'Convention'
  },
  {
    name: 'Sport'
  },
  {
    name: 'Digital'
  },
]

onMounted(() => {
  getTowerEvents()
})

async function getTowerEvents() {
  try {
    await towerEventsService.getTowerEvents()
  }
  catch (error) {
    Pop.error(error, 'Could not get Tower Events!');
    logger.log('COULD NOT GET TOWER EVENTS!', error)
  }
}

</script>

<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-12 bg-img">
        <div class="d-flex flex-column header-card w-50 mt-5 ms-3 rounded-4">
          <h1 class="p-2">Discover events you're interested in</h1>
          <p class="fs-4 mt-3 p-2">Event management for people, by people.</p>
          <div></div>
          <p class="p-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium nam et illo optio numquam
            odit,
            repellendus quaerat perferendis nulla adipisci necessitatibus dicta ducimus ratione minus suscipit corporis
            eligendi a at?</p>
        </div>
      </div>
    </div>
    <div class="row justify-content-center text-center">
      <div class="col-md-5 fs-2 mt-3">How Tower Works</div>
    </div>
    <div class="row justify-content-evenly">
      <div class="col-md-5 info-card border border-3 border-dark-subtle shadow m-3 p-2">
        <h3>Discover events your interested in</h3>
        <p>Browse through community hosted events for all the things you love</p>
      </div>
      <div class="col-md-5 info-card border border-3 border-dark-subtle shadow m-3 p-2">
        <h3>Start an event to invite your friends</h3>
        <p>Create your own Tower event, and draw form a community of millions</p>
        <button v-if="account" class="btn btn-outline-success shadow text-shadow" role="button"
          title="Create new tower event" data-bs-toggle="modal" data-bs-target="#ModalComponent">Create an
          event</button>
      </div>
    </div>
    <div class="row justify-content-between">
      <div v-for="type in categories" :key="'filter ' + type.name" class="col-md-2 d-flex">
        <div @click="filterCategory = type.name"
          class="p-2 m-3 fs-4 border border-2 rounded-2 shadow category-btn text-center" role="button">{{
            type.name }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h2>Upcoming Events</h2>
      </div>
      <div v-for="towerEvent in towerEvent" :key="towerEvent.id" class="col-md-3">
        <TowerEventsCard :towerEvent="towerEvent" />
      </div>
    </div>
  </section>
  <ModalComponent />
</template>

<style scoped lang="scss">
.bg-img {
  background-image: url('https://images.unsplash.com/photo-1556913337-57357cda0264?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fHBlb3BsZSUyMGF0JTIwYSUyMGNvbnZlbnRpb258ZW58MHwwfDB8fHwy');
  height: 500px;
  background-size: cover;
  aspect-ratio: 1/1;
  background-position: center;
  object-fit: cover;
  width: 100%;
  image-rendering: smooth;
}

.header-card {
  background-color: rgba(255, 255, 255, 0.54);
}

.category-btn {
  width: 9rem;
}

.info-card {
  background-color: #8c8a8fc8;
  border-width: 6px;
  border-color: black;
}
</style>
