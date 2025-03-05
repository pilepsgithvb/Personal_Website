<template>

<div class="comments-container">
      <div class="comment-form">
          <h2>Leave a Comment</h2>
          <form @submit.prevent="submitComment" id="commentForm">
              <input type="text" id="name" v-model="name" placeholder="Your Name" required>
              <textarea id="comment" v-model="comment" placeholder="Your Comment" rows="4" required></textarea>
              <button type="submit" class="submit-btn">Submit Comment</button>
              <div v-if="submissionStatus" class="mt-2">
                  {{ submissionStatus }}
              </div>
          </form>
      </div>

      <div class="comment-list" id="commentList">
          <div v-for="comment in comments" :key="comment.id" class="comment">
              <div class="comment-header">
                  <span class="comment-name">{{ comment.name }}</span>
                  <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
              </div>
              <p>{{ comment.comment }}</p>
          </div>
      </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'

const name = ref('')
const comment = ref('')
const submissionStatus = ref(null)
const comments = ref([])

const tableName = 'comments'

function formatDate(dateString) {
return new Date(dateString).toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
})
}

async function submitComment() {
submissionStatus.value = "Submitting..."
try {
  const { error } = await supabase
    .from(tableName)
    .insert([{ name: name.value, comment: comment.value }])

  if (error) throw error

  submissionStatus.value = "Comment submitted successfully!"
  name.value = ''
  comment.value = ''
  await getComments()
} catch (err) {
  console.error("Error submitting comment:", err)
  submissionStatus.value = "Error submitting comment. Please try again."
}
}

async function getComments() {
try {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error

  comments.value = data
} catch (err) {
  console.error("Error fetching comments:", err)
  submissionStatus.value = "Error loading comments."
}
}

onMounted(() => {
getComments()
})
  </script>
<style>

</style>