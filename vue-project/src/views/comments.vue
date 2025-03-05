<template>
  <div class="comments-container">
    <!-- Error State -->
    <div v-if="errorState" class="error-container">
      <h2>⚠️ Something Went Wrong</h2>
      <p>{{ initializationError }}</p>
      <button @click="initializeApp" class="retry-btn">Retry</button>
    </div>

    <!-- Normal State -->
    <template v-else>
      <div class="comment-form">
        <h2>Leave a Comment</h2>
        <form @submit.prevent="submitComment">
          <div class="input-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              v-model="name"
              placeholder="Your name"
              required
              :disabled="loading"
            >
          </div>
          <div class="input-group">
            <label for="comment">Comment</label>
            <textarea
              id="comment"
              v-model="comment"
              placeholder="Share your thoughts..."
              rows="4"
              required
              :disabled="loading"
            ></textarea>
          </div>
          <button
            type="submit"
            class="submit-btn"
            :disabled="loading"
          >
            <span v-if="!loading">Post Comment</span>
            <span v-else class="loading"></span>
          </button>
          <div
            v-if="submissionStatus"
            class="status-message"
            :class="statusClass"
          >
            {{ submissionStatus }}
          </div>
        </form>
      </div>

      <div class="comment-list">
        <div v-if="loadingComments" class="loading-comments">
          Loading comments...
        </div>
        <template v-else>
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="comment-card"
          >
            <div class="comment-header">
              <div class="user-avatar">
                {{ getInitials(comment.name) }}
              </div>
              <div class="user-info">
                <span class="comment-name">{{ comment.name }}</span>
                <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
              </div>
            </div>
            <p class="comment-content">{{ comment.comment }}</p>
          </div>
          <div v-if="comments.length === 0" class="no-comments">
            No comments yet. Be the first to share your thoughts!
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { createClient } from '@supabase/supabase-js'

// Configuration
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

// Reactive state
const name = ref('')
const comment = ref('')
const comments = ref([])
const loading = ref(false)
const loadingComments = ref(true)
const errorState = ref(false)
const initializationError = ref('')
const submissionStatus = ref('')

// Computed properties
const statusClass = computed(() => ({
  success: submissionStatus.value?.includes('success'),
  error: submissionStatus.value?.includes('Error')
}))

// Helper functions
const getInitials = (name) => {
  return name.split(' ')
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Core functionality
const initializeApp = async () => {
  try {
    errorState.value = false
    loadingComments.value = true
    
    // Test connection
    const { error: connError } = await supabase
      .from('comments')
      .select('*')
      .limit(1)
      
    if (connError) throw new Error('Database connection failed')

    // Load comments
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    comments.value = data
    loadingComments.value = false
  } catch (err) {
    handleError(err)
  }
}

const submitComment = async () => {
  if (loading.value) return
  
  loading.value = true
  submissionStatus.value = 'Submitting...'
  
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        name: name.value.trim(),
        comment: comment.value.trim()
      }])
      .select()

    if (error) throw error

    comments.value = [data[0], ...comments.value]
    name.value = ''
    comment.value = ''
    submissionStatus.value = 'Comment submitted successfully!'
  } catch (err) {
    submissionStatus.value = `Error: ${err.message}`
    console.error('Submission error:', err)
  } finally {
    loading.value = false
  }
}

// Error handling
const handleError = (err) => {
  console.error('Application error:', err)
  errorState.value = true
  initializationError.value = err.message
  loadingComments.value = false
  loading.value = false
}

// Lifecycle hooks
onMounted(() => {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_KEY) {
    handleError(new Error('Missing Supabase configuration'))
    return
  }
  
  initializeApp()
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