<script setup>
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const categories = ['concert', 'convention', 'sport', 'digital']

const editableTowerEventData = ref({
  name: '',
  location: '',
  startDate: '',
  capacity: '',
  description: '',
  coverImg: '',
  type: '',
});

async function createTowerEvent() {
  try {
    const towerEvent = await towerEventsService.createTowerEvent(editableTowerEventData.value)
    router.push({ name: 'Events', params: { towerEventId: towerEvent.id } })
    logger.log('tower event', towerEvent)
  } catch (error) {
    Pop.error(error, 'Could not create Tower Event')
    logger.log('COULD NOT CREATE TOWER EVENT', error)
  }
}

</script>


<template>
  <form @submit.prevent="createTowerEvent()">
    <div class="form-floating mb-3">
      <input v-model="editableTowerEventData.name" type="text" class="form-control" id="towerEventName"
        placeholder="Event Name..." minlength="3" maxlength="50" required>
      <label for="towerEventName">Event Name</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editableTowerEventData.location" type="text" class="form-control" id="towerEventLocation"
        placeholder="Event Location..." minlength="1" maxlength="500" required>
      <label for="towerEventLocation">Event Location</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editableTowerEventData.startDate" type="date" class="form-control" id="towerEventStartDate"
        placeholder="Event Start Date..." required>
      <label for="towerEventStartDate">Event Start Date</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editableTowerEventData.capacity" type="number" class="form-control" id="towerEventCapacity"
        placeholder="Event Capacity..." min="1" max="5000" required>
      <label for="towerEventCapacity">Event Capacity</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editableTowerEventData.coverImg" type="url" class="form-control" id="towerEventCoverImg"
        placeholder="Event Cover Image" maxlength="1000" required>
      <label for="towerEventCoverImg">Event Cover Image</label>
    </div>
    <div v-if="editableTowerEventData.coverImg" class="mb-3">
      <p>Image Preview</p>
      <img :src="editableTowerEventData.coverImg" alt="Preview of your cover image" class="w-100">
    </div>
    <div class="form-floating mb-3">
      <textarea v-model="editableTowerEventData.description" class="form-control" placeholder="Event Description"
        id="towerEventDescription" minlength="15" maxlength="1000"></textarea>
      <label for="towerEventDescription">Event Description</label>
    </div>
    <div class="form-floating mb-3">
      <select v-model="editableTowerEventData.type" class="form-select" id="towerEventType"
        aria-label="Tower Event Type" required>
        <option selected>Choose a category</option>
        <option v-for="type in categories" :key="'option ' + type" :value="type">
          {{ type }}
        </option>
      </select>
      <label for="towerEventType">Event Category</label>
    </div>
    <div class="text-end">
      <button class="btn btn-success" type="submit" data-bs-dismiss="modal">
        Submit
      </button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>