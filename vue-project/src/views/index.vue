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

    <div v-for="section in sections" :key="section.id" :id="section.id" class="content" v-show="activeSection === section.id">
      <h2>{{ section.title }}</h2>
      <p v-if="section.text">{{ section.text }}</p>
      <ul v-if="section.list">
        <li v-for="item in section.list" :key="item">{{ item }}</li>
      </ul>
      <table v-if="section.table">
        <tr><th>Project</th><th>Position</th></tr>
        <tr v-for="row in section.table" :key="row.project">
          <td>{{ row.project }}</td>
          <td>{{ row.position }}</td>
        </tr>
      </table>
      <div v-if="section.isGallery" class="carousel">
        <button class="prev" @click="moveSlide(-1)">&#10094;</button>
        <div class="carousel-images">
          <img v-for="(img, index) in galleryImages" :key="index" :src="img.src" :alt="img.alt" :class="{ active: index === currentSlide }">
        </div>
        <button class="next" @click="moveSlide(1)">&#10095;</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeSection: null,
      currentSlide: 0,
      sections: [
        { id: "about", title: "About Me", text: "Hello! My name is Philippe..." },
        { id: "education", title: "Education and Achievements", list: ["With High Honors (Malate Catholic School, 2019-2020)", "With Honors (Asia Pacific College, 2023-2024)"] },
        { id: "course", title: "Course", text: "Bachelor of Science in IT Specializing in Mobile and Internet Technology" },
        { id: "experience", title: "IT Experience", table: [{ project: "Tutor Booking App", position: "UI Designer" }, { project: "APC Dungeon", position: "Head Animator" }, { project: "Rambook", position: "Head Developer" }] },
        { id: "hobbies", title: "Hobbies and Interests", list: ["Basketball", "Gaming", "Music", "Watching Movies"] },
        { id: "goals", title: "Goals in Life", text: "To be successful and give back to my family." },
        { id: "gallery", title: "Picture Gallery", isGallery: true },
        { id: "links", title: "Links to Socials", text: "Connect with me:", list: ["GitHub", "LinkedIn"] }
      ],
      galleryImages: [
        { src: "/pic1.jpg", alt: "Picture 1" },
        { src: "/pic2.jpg", alt: "Bonding with friends" },
        { src: "/pic3.jpg", alt: "Bonding with friends 2" }
      ]
    };
  },
  methods: {
    showContent(id) {
      this.activeSection = id;
    },
    moveSlide(direction) {
      const totalSlides = this.galleryImages.length;
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
