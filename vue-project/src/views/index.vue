<template>
<div class="body">
   <div class="container">
        <div class="tile" onclick="showContent('about')" style="--top-color: #ac663e;">About Me</div>
        <div class="tile" onclick="showContent('education')" style="--top-color: #add8e6;">Education and Achievements</div>
        <div class="tile" onclick="showContent('course')" style="--top-color: #de1d7b;">Course</div>
        <div class="tile" onclick="showContent('experience')" style="--top-color: #f9943b;">IT Experience</div>
        </div>
        
        <div class="header">PHILIPPE'S PERSONAL WEBSITE</div>
        
    <div class="container">
        <div class="tile" onclick="showContent('hobbies')" style="--top-color: #e90d0d;">Hobbies and Interests</div>
        <div class="tile" onclick="showContent('goals')" style="--top-color: #f2f212;">Goals in Life</div>
        <div class="tile" onclick="showContent('gallery')" style="--top-color: #089c08;">Picture Gallery</div>
        <div class="tile" onclick="showContent('links')" style="--top-color: #145da0;">Links to Socials</div>
    </div>

    <div id="about" class="content hidden">
        <h2>About Me</h2>
        <p>Hello! My name is Philippe, I am an aspiring IT student passionate about technology and improving myself and welcome to my personal website!</p>
    </div>

    <div id="education" class="content hidden">
        <h2>Education and Achievements</h2>
        <ul>
            <li>With High Honors (Malate Catholic School, 2019-2020)</li>
            <li>With Honors (Asia Pacific College, 2023-2024)</li>
        </ul>
    </div>

    <div id="course" class="content hidden">
        <h2>Course</h2>
        <p>Bachelor of Science in Information Technology Specializing in Mobile and Internet Technology</p>
        </div>

    <div id="experience" class="content hidden">
        <h2>IT Experience</h2>
        <table>
            <tr>
                <th>Project</th>
                <th>Position</th>
            </tr>
            <tr>
                <td>Tutor Booking App</td>
                <td>UI Designer</td>
            </tr>
            <tr>
                <td>Gamified Course: APC Dungeon</td>
                <td>Head Animator</td>
            </tr>
            <tr>
                <td>Facility Booking System: Rambook</td>
                <td>Head Developer</td>
            </tr>
        </table>
        </div>

    <div id="hobbies" class="content hidden">
        <h2>Hobbies and Interests</h2>
        <ul>
            <li>Basketball</li>
            <li>Gaming</li>
            <li>Music</li>
            <li>Watching Movies</li>
        </ul>
    </div>

    <div id="goals" class="content hidden">
        <h2>Goals in Life</h2>
        <p>To be successful in life and give back to my family.</p>
        </div>

    <div id="gallery" class="content hidden">
    <h2>Picture Gallery</h2>
    <div class="carousel">
        <button class="prev" onclick="moveSlide(-1)">&#10094;</button>
        <div class="carousel-images">
            <img src="pic1.jpg" alt="Picture">
            <img src="pic2.jpg" alt="Bonding with friends">
            <img src="pic3.jpg" alt="Bonding with friends2">
        </div>
        <button class="next" onclick="moveSlide(1)">&#10095;</button>
    </div>
</div>

    <div id="links" class="content hidden">
        <h2>Links to Socials</h2>
        <p>You can connect with me through the socials I have provided below:</p>
        <ul>
            <li><a href="https://github.com/pilepsgithvb">Github Account</a></li>
            <li><a href="https://www.linkedin.com/in/philippe-gerong-67705a24a">LinkedIn Profile</a></li>
        </ul>
    </div>
    </div>
</template>
<script>
let currentSlide = 0;

function showContent(id) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function moveSlide(direction) {
    const images = document.querySelectorAll('.carousel img');
    const totalSlides = images.length;
    
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    
    const carouselImages = document.querySelector('.carousel-images');
    carouselImages.style.transform = `translateX(-${currentSlide * 100}%)`;
}
</script>
<style>
.body {
    font-family: Corbel, Arial, sans-serif;
    text-align: center;
    background-image: url('bgIMG.png');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    margin: 0; 
}

.header {
    font-family: 'Copperplate Gothic Bold', sans-serif;
    background-color: #c70000;
    color: white;
    outline: 5px solid #c70000;
    padding: 30px;
    font-size: 50px;
    border: 5px solid white;
    margin: 20px auto; 
    display: inline-block;
    text-transform: uppercase;
}

.container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    max-width: 900px;
    margin: 20px auto; 
    align-items: center;
    justify-content: center; 
}

.tile {
    position: relative;
    width: 250px;
    height: 150px;
    background-color: #e0e0e0;
    border: 2px solid black;
    cursor: pointer;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center; 
    text-align: center;
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

.tile:hover {
    opacity: 0.9;
}

.hidden {
    display: none;
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
    flex-shrink: 0;
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
