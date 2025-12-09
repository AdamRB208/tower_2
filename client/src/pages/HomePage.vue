<script setup>
import { AppState } from '@/AppState.js';
import ModalComponent from '@/components/ModalComponent.vue';
import TowerEventsCard from '@/components/TowerEventsCard.vue';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';

const account = computed(() => AppState.account)

const towerEvents = computed(() => {
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
      <div class="col-12 bg-img">
        <div class="d-flex flex-column header-card rounded-4">
          <h1 class="p-2">Discover events you're interested in</h1>
          <p class="fs-4 mt-3 p-2">Event management for people, by people.</p>
          <div></div>
          <p class="p-2">Whatever your interest, from hiking and reading to networking and skill sharing, there are
            thousands of people who share it on Tower. Events are happening everyday - log in to join the fun.</p>
        </div>
      </div>
    </div>
    <div class="row info-container">
      <div class="col-md-5 fs-2 title-section">How Tower Works</div>
    </div>
    <div class="row d-flex info-container">
      <div class="col-md-4 info-card border border-dark-subtle rounded-2 shadow m-3 p-2">
        <h3>Discover events your interested in</h3>
        <p>Browse through community hosted events for all the things you love</p>
      </div>
      <div class="col-md-4 info-card border border-dark-subtle rounded-2 shadow m-3 p-2">
        <h3>Start an event to invite your friends</h3>
        <p>Create your own Tower event, and draw form a community of millions</p>
        <button v-if="account" class="btn btn-outline-success shadow-lg text-shadow-lg align-items-center" role="button"
          title="Create new tower event" data-bs-toggle="modal" data-bs-target="#ModalComponent">Create an
          event</button>
      </div>
    </div>
    <div class="row row-title info-container justify-content-evenly flex-wrap">
      <div class="fs-2 title-section">Explore Top Categories</div>
      <div v-for="type in categories" :key="'filter' + type.name" class="col-auto d-flex mb-3 mt-3"
        style="overflow: none;">
        <div @click="filterCategory = type.name"
          class="fs-4 rounded-2 shadow category-btn text-center btn btn-outline-vue" role="button">{{
          type.name }}</div>
      </div>
    </div>
    <div class="row info-container">
      <div class="col-12">
        <h2 class="title-section">Upcoming Events</h2>
      </div>
      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-md-4 mb-4 tower-event-card">
        <TowerEventsCard :towerEvent="towerEvent" />
      </div>
    </div>
  </section>
  <ModalComponent />
</template>

<style scoped lang="scss">

.bg-img {
  background-image: url('https://images.unsplash.com/photo-1559171667-74fe3499b5ba?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbnZlbnRpb258ZW58MHx8MHx8fDI%3D');
  height: 700px;
  background-size: cover;
  aspect-ratio: 1/1;
  background-position: bottom;
  object-fit: cover;
  width: 100%;
  image-rendering: smooth;
}

.header-card {
  background-color: #ededf175;
  color: white;
  text-shadow: 2px 2px 4px black;
  margin-top: 10rem;
    margin-left: 2rem;
    margin-right: 2rem;
    
      @media (min-width:770px) {
        width: 50%;
      }
}

// .row-title {
//   margin-left: 8rem;
//   margin-right: 8rem;
//   @media (min-width: 700px) {
  //     margin-left: 0rem;
  //     margin-right: 0rem;
  //   }
// }

.title-section {
  margin-top: 5rem;
}
.category-btn {
  width: 9rem;
}

.info-container {
    margin-left: 0rem;
      margin-right: 2rem;
    
      @media (min-width: 770px) {
        margin-left: 8rem;
        margin-right: 8rem;
      }
}
.info-card {
  background-color: #ededf1;
  border-width: 2px;
}
</style>
