<script setup>
import { AppState } from '@/AppState.js';
import { commentService } from '@/services/CommentService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const comments = computed(() => AppState.comments)

const route = useRoute()

const editableCommentData = ref({
  body: '',
  eventId: route.params.towerEventId,
});

async function createComment() {
  try {
    const commentData = editableCommentData.value
    await commentService.createComment(commentData)
  }
  catch (error) {
    Pop.error(error, 'Could not create comment');
    logger.log('COULD NOT CREATE COMMENT', error)
  }
}
</script>


<template>
  <form @submit.prevent="createComment()" class="ps-3 pe-3">
    <div class="mb-3">
      <label for="body" class="form-label">Add a comment</label>
      <textarea v-model="editableCommentData.body" type="text" class="form-control" id="body" name="body" rows="3"
        minLength="1" maxLength="500" required></textarea>
    </div>
    <button type="submit" class="btn btn-success mb-2">Submit</button>
  </form>
</template>


<style lang="scss" scoped></style>