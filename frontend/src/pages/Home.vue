<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="homepage">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h2>Welcome to Bubble Judge</h2>
        <p>Your hub for mastering competitive programming and showcasing your skills!</p>
        <a @click="router.push('/problems')" class="cta-button">Explore problems</a>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
      <div class="container">
        <h2>Why Bubble Judge?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <h3>Real-Time Feedback</h3>
            <p>Get instant feedback on your code submissions.</p>
          </div>
          <div class="feature-card">
            <h3>Diverse Challenges</h3>
            <p>From beginner to advanced, we have it all.</p>
          </div>
          <div class="feature-card">
            <h3>Leaderboard</h3>
            <p>Track your progress and compete with others.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Competitions -->
    <!-- <section id="competitions" class="competitions">
      <div class="container">
        <h2>Upcoming Competitions</h2>
        <div class="competitions-grid">
          <div class="competition-card" v-for="competition in competitions" :key="competition.id">
            <h3>{{ competition.name }}</h3>
            <p>{{ competition.description }}</p>
            <a :href="competition.link" class="cta-button">Join Now</a>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background: #f9f9f9;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* Navbar */
.navbar {
  background: #0066cc;
  padding: 10px 0;
  color: #fff;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar .logo {
  font-size: 24px;
  font-weight: bold;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

.navbar a {
  text-decoration: none;
  color: #fff;
}

/* Hero Section */
.hero {
  background: #e6f7ff;
  text-align: center;
  padding: 50px 15px;
}

.hero h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

.hero .cta-button {
  cursor: pointer;
  display: inline-block;
  margin-top: 20px;
  background: #0066cc;
  color: #fff;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
}

/* Features Section */
.features {
  padding: 50px 15px;
  background: #fff;
}

.features-grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.feature-card {
  flex: 1;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
}
</style>