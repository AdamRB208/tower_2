<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { ticketService } from '@/services/TicketsService.js';
import { useRoute } from 'vue-router';

const account = computed(() => AppState.account)

const ticketEvent = computed(() => AppState.ticketEvent)


const route = useRoute()

onMounted(() => {
  getMyTickets()
})

async function getMyTickets() {
  try {
    await ticketService.getMyTickets()
    logger.log('My tickets running')
  }
  catch (error) {
    Pop.error(error, 'Could not get my tickets!');
    logger.log('COULD NOT GET MY TICKETS!', error)
  }
}

</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
