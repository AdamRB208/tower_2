<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { ticketService } from '@/services/TicketsService.js';

const account = computed(() => AppState.account)

const ticketEvent = computed(() => AppState.ticketEvent)



onMounted(() => {
  getMyTickets()
})

async function getMyTickets() {
  try {
    await ticketService.getMyTickets()
  }
  catch (error) {
    Pop.error(error, 'Could not get my tickets!');
    logger.log('COULD NOT GET MY TICKETS!', error)
  }
}

async function deleteTicket(ticketId) {
  try {
    const confirmed = await Pop.confirm("Are you sure you want to delete this ticket?")
    if (!confirmed) {
      return
    }
    await ticketService.deleteTicket(ticketId)
  }
  catch (error) {
    Pop.error(error, 'Could not delete ticket!');
    logger.log('COULD NOT DELETE TICKET', error)
  }
}

</script>

<template>
  <section class="container">
    <div v-if="account" class="row justify-content-center p-0">
      <div class="col-md-12 d-flex flex-row justify-content-center m-5">
        <div>
          <img class="d-flex d-column rounded account-img" :src="account.picture"
            :alt="`profile image for ${account.name}`" />
        </div>
        <h1 class="d-flex align-items-center ms-3">{{ account.name }}</h1>
      </div>
      <div v-for="ticketEvent in ticketEvent" :key="ticketEvent.id"
        class="col-md-2 m-2 border border-2 border-dark-subtle d-flex flex-column p-0">
        <img :src="ticketEvent.event.coverImg" :alt="`display image for ${ticketEvent.event.name}`"
          class="ticket-event-img">
        <div class="fw-bold text-uppercase p-1">{{ ticketEvent.event.name }}</div>
        <p class="fw-light p-1">{{ ticketEvent.event.startDate.toDateString() }}</p>
        <p class="fw-light p-1">{{ ticketEvent.event.ticketCount }} attending</p>
        <button @click="deleteTicket()" class="btn btn-danger m-2" type="button">Delete Ticket</button>
      </div>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </section>
</template>

<style scoped lang="scss">
.account-img {
  max-width: 100px;
}

.ticket-event-img {
  max-width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;

}

.col-md-2 {
  justify-content: space-evenly;
}
</style>
