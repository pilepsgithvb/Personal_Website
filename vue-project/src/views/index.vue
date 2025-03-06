<template>
  <div class="body">
    <div class="container">
      <div class="tile" @click="showContent('about')" style="--top-color: #ac663e;">About Me</div>
      <div class="tile" @click="showContent('education')" style="--top-color: #add8e6;">Education and Achievements</div>
      <div class="tile" @click="showContent('course')" style="--top-color: #de1d7b;">Course</div>
      <div class="tile" @click="showContent('experience')" style="--top-color: #f9943b;">IT Experience</div>
    </div>

    <div class="header">PHILIPPE'S PERSONAL WEBSITE</div>
    <div class="header">
  <RouterLink to="/comments" style="color: white; text-decoration: none;">
    Add Comments About my website?
  </RouterLink>
</div>    <div class="container">
      <div class="tile" @click="showContent('hobbies')" style="--top-color: #e90d0d;">Hobbies and Interests</div>
      <div class="tile" @click="showContent('goals')" style="--top-color: #f2f212;">Goals in Life</div>
      <div class="tile" @click="showContent('gallery')" style="--top-color: #089c08;">Picture Gallery</div>
      <div class="tile" @click="showContent('links')" style="--top-color: #145da0;">Links to Socials</div>
    </div>

    <!-- Content Sections -->
    <div v-show="activeSection === 'about'" class="content">
      <h2>About Me</h2>
      <p>Hello! My name is Philippe, an aspiring IT student passionate about technology.</p>
    </div>

    <div v-show="activeSection === 'education'" class="content">
      <h2>Education and Achievements</h2>
      <ul>
        <li>With High Honors (Malate Catholic School, 2019-2020)</li>
        <li>With Honors (Asia Pacific College, 2023-2024)</li>
      </ul>
    </div>

    <div v-show="activeSection === 'course'" class="content">
      <h2>Course</h2>
      <p>Bachelor of Science in IT Specializing in Mobile and Internet Technology</p>
    </div>

    <div v-show="activeSection === 'experience'" class="content">
      <h2>IT Experience</h2>
      <table>
        <tr><th>Project</th><th>Position</th></tr>
        <tr><td>Tutor Booking App</td><td>UI Designer</td></tr>
        <tr><td>APC Dungeon</td><td>Head Animator</td></tr>
        <tr><td>Rambook</td><td>Head Developer</td></tr>
      </table>
    </div>

    <div v-show="activeSection === 'hobbies'" class="content">
      <h2>Hobbies and Interests</h2>
      <ul>
        <li>Basketball</li>
        <li>Gaming</li>
        <li>Music</li>
        <li>Watching Movies</li>
      </ul>
    </div>

    <div v-show="activeSection === 'goals'" class="content">
      <h2>Goals in Life</h2>
      <p>To be successful in life and give back to my family.</p>
    </div>

    <!-- Image Carousel -->
<div v-show="activeSection === 'gallery'" class="content">
  <h2>Picture Gallery</h2>
  <div class="carousel">
    <button class="prev" @click="moveSlide(-1)">&#10094;</button>
    
    <div class="carousel-images">
      <img v-for="(image, index) in images" 
           :key="index" 
           :src="image" 
           :alt="'Picture ' + (index + 1)"
           :class="{ active: currentSlide === index }">
    </div>
    
    <button class="next" @click="moveSlide(1)">&#10095;</button>
  </div>
</div>

<script setup>
import { ref } from 'vue';

const images = ref(["pic1.jpg", "pic2.jpg", "pic3.jpg"]);
const currentSlide = ref(0);

const moveSlide = (direction) => {
  currentSlide.value = (currentSlide.value + direction + images.value.length) % images.value.length;
};
</script>

<style>
/* Styling for Carousel */
.carousel {
  position: relative;
  width: 80%;
  max-width: 600px;
  margin: auto;
  overflow: hidden;
  text-align: center;
}

.carousel-images {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-images img {
  display: none;
  max-width: 100%;
  height: auto;
  transition: opacity 0.5s ease-in-out;
}

.carousel-images img.active {
  display: block;
}

.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 20px;
}

.prev { left: 10px; }
.next { right: 10px; }
</style>

    <div v-show="activeSection === 'links'" class="content">
      <h2>Links to Socials</h2>
      <ul>
        <li><a href="https://github.com/pilepsgithvb">GitHub Account</a></li>
        <li><a href="https://www.linkedin.com/in/philippe-gerong-67705a24a">LinkedIn Profile</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeSection: null, // Track active section
      currentSlide: 0 // Track active slide in the gallery
    };
  },
  methods: {
    showContent(id) {
      this.activeSection = id;
    },
    moveSlide(direction) {
      const totalSlides = 3; // Number of images
      this.currentSlide = (this.currentSlide + direction + totalSlides) % totalSlides;
    }
  }
};
</script>

<style scoped>
.body {
  font-family: Corbel, Arial, sans-serif;
  text-align: center;
  background-image: url('bgIMG.png');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  margin: 0;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-image: url('bgIMG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}


.header {
  font-family: 'Copperplate Gothic Bold', sans-serif;
  background-color: #c70000;
  color: white;
  outline: 5px solid #c70000;
  padding: 30px;
  font-size: 50px;
  border: 5px solid white;
  margin: 20px auto; /* Centers the header */
  display: flex;
  justify-content: center; /* Centers text horizontally */
  align-items: center; /* Centers text vertically */
  text-align: center;
  width: 80%; /* Adjust width to fit nicely */
  max-width: 800px; /* Prevents it from being too wide */
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}


.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  gap: 20px;
  max-width: 900px;
  margin: 20px auto;
}

.tile {
  position: relative; /* Ensure the top color bar is aligned to the tile */
  width: 250px;
  height: 150px;
  background-color: #e0e0e0;
  border: 2px solid black;
  cursor: pointer;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  border-radius: 10px; /* Added rounded corners */
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

.tile::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0; /* Ensure alignment */
  width: 100%;
  height: 35px;
  background-color: var(--top-color);
  border-bottom: 2px solid black;
  border-top-left-radius: 10px; 
  border-top-right-radius: 10px;
}


.content {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px; /* Added rounded corners */
  background-color: #f9f9f9;
  text-align: left;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3); /* Added shadow */
}
</style>
