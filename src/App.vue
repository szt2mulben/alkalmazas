<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="app-container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-success">
      <a class="s navbar-brand" href="/">Időnyilvántartó </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/Entries">Bejegyzések</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/TimeEntry">Adminisztráció</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Kezdőlap</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <RouterView />

</template>

<style scoped>
.navbar {
  padding: 0.5rem 1rem;
}

.nav-link {
  color: rgb(12, 10, 10) !important;
  text-align: center;
}

.nav-link:hover {
  font-weight: bold;
  background-color: rgb(98, 175, 98);
  border-radius: 10px;
}

@media (max-width: 768px) {
  .navbar-nav {
    text-align: center;
  }
}
</style>
