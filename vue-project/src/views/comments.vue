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
/* Base styles */
:root {
  --primary: #3B82F6;
  --success: #10B981;
  --error: #EF4444;
  --text: #1F2937;
  --border: #E5E7EB;
  --background: #F9FAFB;
}

.comments-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

/* Error state */
.error-container {
  text-align: center;
  padding: 2rem;
  background: #FEF2F2;
  border-radius: 8px;
  border: 1px solid #FECACA;
  color: var(--error);
}

.error-container h2 {
  margin-bottom: 1rem;
}

.retry-btn {
  background: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

/* Form styles */
.comment-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.input-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-weight: 500;
}

input, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.submit-btn {
  background: var(--primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading {
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Comments list */
.comment-list {
  display: grid;
  gap: 1.5rem;
}

.comment-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border);
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
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.comment-date {
  font-size: 0.875rem;
  color: #6B7280;
}

.no-comments {
  text-align: center;
  padding: 2rem;
  color: #6B7280;
}

.status-message {
  padding: 0.75rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.status-message.success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success);
}

.status-message.error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Mobile styles */
@media (max-width: 640px) {
  .comment-form {
    padding: 1.5rem;
  }
  
  .comment-card {
    padding: 1rem;
  }
}
</style>