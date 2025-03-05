<template>
  <div class="nav">
      <RouterLink to="/">About me</RouterLink>
      <RouterLink to="/education">Education</RouterLink>
      <RouterLink to="/IT-Experience">IT Experience</RouterLink>
      <RouterLink to="/hobby">Hobbies & Interest</RouterLink>
      <RouterLink to="/goal">Goals In Life</RouterLink>
      <RouterLink to="/gallery">Picture Gallery</RouterLink>
      <RouterLink to="/comments" class="current" style="color: black;">Comments</RouterLink>
  </div>

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

  <footer>
      <div class="image-container">
          <img src="../images/rm.gif">
      </div>
  </footer>
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

body {
          margin: 0;
          padding: 0;
          background-image: linear-gradient(#00539F, #001E39);
          background-repeat: no-repeat;
          background-size: cover;
          font-family: Arial, sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column; 
          color: aliceblue;
      }

      .nav {
          display: flex;
          align-items: center;
          flex-wrap: wrap; 
          background-image: linear-gradient(0.25turn, #001E39, #001F3D, #325D86);
          width: 1600px; 
          height: 55px;
          margin: 45px auto; 
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .nav a {
          color: #f2f2f2;
          font-weight: bold;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
          font-size: 15px;
          transition: background-color 0.3s, color 0.3s;
      }

      .nav a:hover {
          background-color: #ddd;
          color: black;
      }

      .current {
          background-color: #87a9c7;
      }

      .comments-container {
          background-color: #102C46;
          box-shadow: 5px 10px #001424;
          width: 1000px;
          max-width: 90%;
          margin: 100px auto;
          padding: 20px;
      }

      .comment-form {
          margin-bottom: 20px;
      }

      .comment-form input, 
      .comment-form textarea {
          width: 100%;
          background-color: #001E39;
          color: aliceblue;
          border: 1px solid #325D86;
          margin-bottom: 10px;
          padding: 10px;
      }

      .comment-list {
          margin-top: 20px;
      }

      .comment {
          background-color: #001E39;
          border-left: 4px solid #325D86;
          padding: 15px;
          margin-bottom: 15px;
      }

      .comment-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
      }

      .comment-name {
          font-weight: bold;
          color: #87a9c7;
      }

      .comment-date {
          color: #6c757d;
          font-size: 0.8em;
      }

      .submit-btn {
          background-color: #87a9c7;
          color: white;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          transition: background-color 0.3s;
      }

      .submit-btn:hover {
          background-color: #6c8eb3;
      }

      footer {
          position: fixed;
          left: 0;
          bottom: 0;
          width: 100%;
          text-align: center;
      }

      .image-container {
          width: 200px;
          height: 200px; 
          overflow: hidden; 
          position: relative;
      }

      .image-container img {
          width: 100%; 
          height: auto; 
          position: absolute;
          align-items: end;
          top: 55px;
          left: 60px;
      }

      @media (max-width: 1600px) {
          .nav {
              width: 90%; 
          }
      }

      @media (max-width: 768px) {
          .nav a {
              font-size: 14px; 
              padding: 10px 12px; 
          }

          .comments-container {
              width: 95%;
              margin: 50px auto;
          }
      }

      @media (max-width: 576px) {
          .nav {
              width: 100%; 
              margin: 20px auto;
          }

          .nav a {
              font-size: 12px;
              padding: 8px 10px;
          }
      }
</style>