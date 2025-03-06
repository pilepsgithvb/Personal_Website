<template>
  <div class="comments-container">
    <div class="comment-form">
      <h2>Leave a Comment</h2>
      <form @submit.prevent="submitComment" id="commentForm">
        <input type="text" id="name" v-model="name" placeholder="Your Name" required>
        <textarea id="comment" v-model="comment" placeholder="Your Comment" rows="4" required></textarea>
        <button type="submit" class="submit-btn">Submit Comment</button>
        <div v-if="submissionStatus" class="status-message">
          {{ submissionStatus }}
        </div>
      </form>
    </div>

    <div class="comment-list">
      <h2>Recent Comments</h2>
      <div v-for="comment in comments" :key="comment.id" class="comment-card">
        <div class="comment-header">
          <span class="comment-name">{{ comment.name }}</span>
          <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
        </div>
        <p class="comment-text">{{ comment.comment }}</p>
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
/* Background Image */
body {
  background-image: url('bgIMG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* Container */
.comments-container {
  width: 80%;
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8); /* Slight white transparency for readability */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Form Styling */
.comment-form {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
}

h2 {
  text-align: center;
  color: #333;
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
}

input:focus, textarea:focus {
  border-color: #c70000;
  outline: none;
  box-shadow: 0 0 5px rgba(199, 0, 0, 0.3);
}

/* Updated Button Color */
.submit-btn {
  width: 100%;
  padding: 12px;
  background: #c70000; /* Deep Red */
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #a30000; /* Slightly Darker Red */
}

.status-message {
  text-align: center;
  margin-top: 10px;
  color: green;
}

/* Comments Section */
.comment-list {
  margin-top: 20px;
}

.comment-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #c70000;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: #333;
}

.comment-text {
  margin-top: 5px;
  color: #555;
}
</style>
