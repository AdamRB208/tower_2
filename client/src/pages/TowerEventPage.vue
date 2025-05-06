<script setup>
import { AppState } from '@/AppState.js';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';



const towerEvent = computed(() => AppState.activeTowerEvent)

const account = computed(() => AppState.account)

const route = useRoute()

onMounted(() => {
  getTowerEventById()
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

</script>


<template>
  <div v-if="towerEvent">{{ towerEvent }}</div>
</template>


<style lang="scss" scoped></style>