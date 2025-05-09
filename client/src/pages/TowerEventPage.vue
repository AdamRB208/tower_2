<script setup>
import { AppState } from '@/AppState.js';
import { ticketService } from '@/services/TicketsService.js';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';



const towerEvent = computed(() => AppState.activeTowerEvent)

const account = computed(() => AppState.account)

const ticketProfile = computed(() => AppState.ticketProfile)

const route = useRoute()

onMounted(() => {
  getTowerEventById()
  getTicketsByEventId()
})


async function getTowerEventById() {
  try {
    const towerEventId = route.params.towerEventId
    logger.log('Tower Event Id', towerEventId)
    await towerEventsService.getTowerEventById(towerEventId)
    logger.log(towerEvent)
  }
  catch (error) {
    Pop.error(error, 'Could not get Tower Event by ID!');
    logger.log('COULD NOT GET TOWER EVENT BY ID!', error)
  }
}

async function cancelTowerEvent() {
  try {
    const confirmed = await Pop.confirm(`Are you sure you want to ${towerEvent.value.isCanceled ? 'un-cancel' : 'cancel'} ${towerEvent.value.name}?`)
    if (!confirmed) {
      return
    }
    const towerEventId = route.params.towerEventId
    await towerEventsService.cancelTowerEvent(towerEventId)
  }
  catch (error) {
    Pop.error(error, 'Could not cancel Tower Event!');
    logger.log('COULD NOT CANCEL TOWER EVENT!', error)
  }
}

async function createTicket() {
  try {
    const ticketData = { eventId: route.params.towerEventId }
    await ticketService.createTicket(ticketData)
  } catch (error) {
    Pop.error(error, 'Could not create Ticket')
    logger.log('COULD NOT CREATE TICKET!', error)
  }
}

async function getTicketsByEventId() {
  try {
    const towerEventId = route.params.towerEventId
    logger.log('Tower Event Id', towerEventId)
    await ticketService.getTicketByEventId(towerEventId)
  }
  catch (error) {
    Pop.error(error, 'Could not get ticket by Tower Event Id');
    logger.log('COULD NOT GET TICKET BY TOWER EVENT ID!', error)
  }
}


</script>


<template>
  <section v-if="towerEvent" class="container">
    <div class="row">
      <div class="col-12">
        <img :src="towerEvent.coverImg" alt="picture of event" class="mt-5">
        <div class="d-flex gap-5 align-items-center">
          <h1>{{ towerEvent.name }}</h1>
          <span class="border">{{ towerEvent.type }}</span>
        </div>
        <div>
          <p class="mt-4">{{ towerEvent.description }}</p>
          <p v-if="towerEvent.isCanceled" class="text-center">
            <span class="mdi mdi-alert text-danger"></span>
            This event has been canceled!
            <span class="mdi mdi-alert text-danger"></span>
          </p>
        </div>
        <div>
          <p class="fs-4 mt-5">Date and Time</p>
          <p class="mdi mdi-clipboard-text-clock-outline">{{ towerEvent.startDate }}</p>
        </div>
        <div>
          <p class="fs-4">Location</p>
          <p class="mdi mdi-map-marker-outline">{{ towerEvent.location }}</p>
        </div>
        <div>
          <button @click="cancelTowerEvent()" v-if="towerEvent.creatorId == account?.id"
            class="btn btn-danger rounded-pill text-light">
            {{ towerEvent.isCanceled ? 'Un-cancel' : 'Cancel Event' }} <span class="mdi"
              :class="towerEvent.isCanceled ? 'mdi-publish' : 'mdi-close-circle'"> </span>
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div class="d-flex mb-3">
          <div class="bg-dark-glass rounded p-2 flex-grow-1">
            <span class="d-block"> </span>
            <span>Tickets left : {{ towerEvent.capacity - towerEvent.ticketCount }}</span>
          </div>
          <div v-if="towerEvent.isCanceled == false">
            <button @click="createTicket()" v-if="account" class="btn btn-success" type="button">
              <span class="mdi mdi-account-plus d-block"></span>
              <span>Attend</span>
            </button>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div v-if="towerEvent.ticketCount"
          :title="towerEvent.ticketCount + (towerEvent.ticketCount == 1 ? ' person is ' : ' people are ') + 'attending this event'">
          <span>Number of attendees: {{ towerEvent.ticketCount }}</span>
        </div>
        <div>
          <div>These people are going:
            <div v-for="ticket in ticketProfile" :key="ticket.id">
              <img :src="account.picture" :alt="account.name">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <!-- TODO -->
        <!-- COMMENTS GO HERE -->
        <!-- {{ comment }} -->
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped></style>