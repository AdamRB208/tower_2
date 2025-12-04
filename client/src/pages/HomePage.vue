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
    name: 'all'
  },
  {
    name: 'concert'
  },
  {
    name: 'convention'
  },
  {
    name: 'sport'
  },
  {
    name: 'digital'
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
      <div class="col-12 bg-img overflow-auto">
        <div class="d-flex flex-column header-card w-50 mt-5 ms-3 rounded-4">
          <h1 class="p-2">Discover events you're interested in</h1>
          <p class="fs-4 mt-3 p-2">Event management for people, by people.</p>
          <div></div>
          <p class="p-2">Whatever your interest, from hiking and reading to networking and skill sharing, there are
            thousands of people who share it on Tower. Events are happening everyday - log in to join the fun.</p>
        </div>
      </div>
    </div>
    <div class="row justify-content-center text-center">
      <div class="col-md-5 fs-2 mt-3 mb-3">How Tower Works</div>
    </div>
    <div class="row-fluid justify-content-evenly d-flex d-inline">
      <div class="col-md-5 info-card border border-dark-subtle rounded-2 shadow m-3 p-2">
        <h3>Discover events your interested in</h3>
        <p>Browse through community hosted events for all the things you love</p>
      </div>
      <div class="col-md-5 info-card border border-dark-subtle rounded-2 shadow m-3 p-2">
        <h3>Start an event to invite your friends</h3>
        <p>Create your own Tower event, and draw form a community of millions</p>
        <button v-if="account" class="btn btn-outline-success shadow-lg text-shadow-lg align-items-center" role="button"
          title="Create new tower event" data-bs-toggle="modal" data-bs-target="#ModalComponent">Create an
          event</button>
      </div>
    </div>
    <div class="row justify-content-between">
      <div class="fs-2" style="margin-left: 4rem; margin-top: 2rem;">Explore Top Categories</div>
      <div v-for="type in categories" :key="'filter' + type.name" class="col-md-2 d-flex">
        <div @click="filterCategory = type.name"
          class="p-2 m-3 fs-4 rounded-2 shadow category-btn text-center btn btn-outline-vue" role="button">{{
          type.name }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h2 style="margin-left: 4rem; margin-top: 2rem;">Upcoming Events</h2>
      </div>
      <div v-for="towerEvent in towerEvent" :key="towerEvent.id" class="col-md-4 mb-4">
        <TowerEventsCard :towerEvent="towerEvent" />
      </div>
    </div>
  </section>
  <ModalComponent />
</template>

<style scoped lang="scss">
.bg-img {
  background-image: url('https://images.unsplash.com/photo-1559171667-74fe3499b5ba?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbnZlbnRpb258ZW58MHx8MHx8fDI%3D');
  height: 500px;
  background-size: cover;
  aspect-ratio: 1/1;
  background-position: center;
  object-fit: cover;
  width: 100%;
  image-rendering: smooth;
}

.header-card {
  background-color: #ededf175;
  color: white;
  text-shadow: 2px 2px 4px black;
}

.category-btn {
  width: 9rem;
}

.info-card {
  background-color: #ededf1;
  border-width: 2px;
}
</style>
