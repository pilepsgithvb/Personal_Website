<template>
  <div class="body">
    <div class="container">
      <div class="tile" @click="showContent('about')" style="--top-color: #ac663e;">About Me</div>
      <div class="tile" @click="showContent('education')" style="--top-color: #add8e6;">Education and Achievements</div>
      <div class="tile" @click="showContent('course')" style="--top-color: #de1d7b;">Course</div>
      <div class="tile" @click="showContent('experience')" style="--top-color: #f9943b;">IT Experience</div>
    </div>

    <div class="header">PHILIPPE'S PERSONAL WEBSITE</div>

    <div class="container">
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
        <!---<div class="carousel-images">
          <img src="pic1.jpg" alt="Picture 1" :class="{ active: currentSlide === 0 }">
          <img src="pic2.jpg" alt="Bonding with friends" :class="{ active: currentSlide === 1 }">
          <img src="pic3.jpg" alt="Bonding with friends 2" :class="{ active: currentSlide === 2 }">
        </div>--->
        <button class="next" @click="moveSlide(1)">&#10095;</button>
      </div>
    </div>

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
  background-size: cover;
  margin: 0;
}

.header {
  background-color: #c70000;
  color: white;
  padding: 30px;
  font-size: 50px;
  border: 5px solid white;
  margin: 20px auto;
  display: inline-block;
}

.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 900px;
  margin: 20px auto;
}

.tile {
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
}

.tile::before {
  content: '';
  position: absolute;
  top: 0;
  width: 100%;
  height: 20px;
  background-color: var(--top-color);
  border-bottom: 2px solid black;
}

.content {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: left;
}

/* Image Carousel Styles */
.carousel {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
}

.carousel-images {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-images img {
  width: 100%;
  max-width: 100%;
  height: 500px;
  object-fit: cover;
  display: none; /* Hide all images initially */
}

.carousel-images img.active {
  display: block; /* Only show the active image */
}

.carousel button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  z-index: 1;
}

.carousel .prev {
  left: 10px;
}

.carousel .next {
  right: 10px;
}
</style>
