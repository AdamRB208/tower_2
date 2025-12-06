<script setup>
import { AppState } from '@/AppState.js';
import CommentForm from '@/components/CommentForm.vue';
import { commentService } from '@/services/CommentService.js';
import { ticketService } from '@/services/TicketsService.js';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';



const towerEvent = computed(() => AppState.activeTowerEvent)

const account = computed(() => AppState.account)

const ticketProfile = computed(() => AppState.ticketProfile)


const comment = computed(() => AppState.comments)

const route = useRoute()

onMounted(() => {
  getTowerEventById()
  getTicketsByEventId()
  getCommentsByEventId()
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

async function getCommentsByEventId() {
  try {
    const TowerEventId = route.params.towerEventId
    logger.log('getting comments by eventId', TowerEventId)
    await towerEventsService.getCommentsByEventId(TowerEventId)
  }
  catch (error) {
    Pop.error(error, 'Could not get comments by event Id');
    logger.log('COULD NOT GET COMMENTS BY EVENT ID', error)
  }
}

async function deleteComment(commentId) {
  const confirmed = await Pop.confirm('Are you sure you want to delete this comment?')
  if (!confirmed) return
  try {
    await commentService.deleteComment(commentId)
  }
  catch (error) {
    Pop.error(error, 'Could not delete comment');
    logger.log('COULD NOT DELETE COMMENT', error)
  }
}

</script>


<template>
  <section v-if="towerEvent" class="container">
    <div class="row">
      <div class="col-12">
        <div class="text-center fs-1">Hosted By {{ towerEvent.creator.name }}!</div>
        <img :src="towerEvent.coverImg" alt="picture of event" class="mt-2 rounded-2 event-img">
        <div class="d-flex gap-5 align-items-center">
          <h1>{{ towerEvent.name }}</h1>
          <span class="border rounded-5 p-2 bg-vue">{{ towerEvent.type }}</span>
        </div>
        <div>
          <p class="mt-4">{{ towerEvent.description }}</p>
          <p v-if="towerEvent.isCanceled" class="text-center">
            <span class="mdi mdi-alert text-danger"></span>
            This event has been canceled!
            <span class="mdi mdi-alert text-danger"></span>
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <p class="fs-4 mt-5">Date and Time</p>
        <p class="mdi mdi-clipboard-text-clock-outline"> {{ towerEvent.startDate.toDateString() }} @ {{
          towerEvent.startDate.toLocaleTimeString() }}</p>
      </div>
      <div>
        <p class="fs-4">Location</p>
        <p class="mdi mdi-map-marker-outline">{{ towerEvent.location }}</p>
      </div>
      <div class="mb-4">
        <button @click="cancelTowerEvent()" v-if="towerEvent.creatorId == account?.id"
          class="btn btn-danger rounded-pill text-light">
          {{ towerEvent.isCanceled ? 'Un-cancel' : 'Cancel Event' }} <span class="mdi"
            :class="towerEvent.isCanceled ? 'mdi-publish' : 'mdi-close-circle'"> </span>
        </button>
      </div>
    </div>
    <div class="row-fluid mt-4 ms-1 me-1 rounded-3 d-flex flex-row-reverse justify-content-between">
      <div class="col-md-3">
        <div class="capacity-bg rounded p-3">
          <div class="mb-2">
            <div>Event Capacity: {{ towerEvent.capacity }}</div>
          </div>
          <div class="d-flex mb-3 align-items-center">
            <div>
              <div>Tickets left: {{ towerEvent.capacity - towerEvent.ticketCount }}</div>
            </div>
            <div v-if="towerEvent.isCanceled == false">
              <button @click.prevent="createTicket()"
                v-if="!ticketProfile.some(ticketProfile => ticketProfile.accountId === account?.id && ticketProfile.profile?.id === ticketProfile.accountId)"
                class="btn btn-success btn-sm mdi mdi-account-plus" type="button">Attend Event</button>
              <button v-else-if="towerEvent.capacity === towerEvent.ticketCount" class="btn btn-primary btn-sm"
                disabled>Sold Out</button>
              <button v-else class="btn btn-success btn-sm" type="button" disabled>Attending!</button>
            </div>
          </div>
        </div>
        <div>
        </div>
        <div v-if="towerEvent.ticketCount"
          :title="towerEvent.ticketCount + (towerEvent.ticketCount == 1 ? ' person is ' : ' people are ') + 'attending this event'">
          <div class="mb-2">Number of attendees: {{ towerEvent.ticketCount }}</div>
        </div>
        <div>
          <div>These people are attending:
            <div v-for="ticketProfile in ticketProfile" :key="ticketProfile.id" class="d-flex align-items-center mt-2">
              <img :src="ticketProfile.profile.picture" alt="profile picture" class="attendee-img">
              <p class="ps-2 profile-name">{{ ticketProfile.profile.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 p-2 rounded shadow comment-section">
        <CommentForm />
        <div v-for="comments in comment" :key="comments.eventId" class="col-md-5 p-2 rounded shadow comment-section">
          <div class="d-flex d-inline align-items-center">
            <img :src="comments.creator.picture" alt="" class="creator-img mt-2">
            <span class="ms-2">{{ comments.creator.name }}</span>
          </div>
          <p class="comment-body">{{ comments.body }}</p>
          <button @click="deleteComment(comments.id)" class="btn btn-sm btn-outline-danger comment-btn m-2"
            type="button">delete</button>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.event-img {
  height: 20em;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.attendee-img {
  height: 2em;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.creator-img {
  height: 2em;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.comment-btn {
  display: flex;
  justify-content: flex-end;
}


.comment-section {
  background-color: white;
  margin: 1rem;
  overflow-x: inherit;
}

.comment-body {
  margin: 2rem;
}

.profile-name {
  margin-bottom: 0;
}
.capacity-bg {
  background-color: gray;
}
</style>