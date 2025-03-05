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
 <script>
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
 <style></style>
<script>
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
:root {
  --primary-color: #2563eb;
  --success-color: #22c55e;
  --error-color: #ef4444;
  --text-color: #1f2937;
  --border-color: #e5e7eb;
  --bg-color: #f9fafb;
}

.comments-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.comment-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
}

.comment-form h2 {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 500;
}

input, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.submit-btn {
  background: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-btn:hover {
  opacity: 0.9;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

.status-message {
  padding: 0.75rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.success {
  background: rgba(34, 197, 94, 0.1);
  color: var(--success-color);
}

.error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error-color);
}

.comment-list {
  display: grid;
  gap: 1.5rem;
}

.comment-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color);
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.comment-name {
  font-weight: 600;
  color: var(--text-color);
}

.comment-date {
  font-size: 0.875rem;
  color: #6b7280;
}

.comment-content {
  color: var(--text-color);
  line-height: 1.6;
  white-space: pre-wrap;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .comment-form {
    padding: 1.5rem;
  }
  
  .comment-card {
    padding: 1rem;
  }
}
</style>