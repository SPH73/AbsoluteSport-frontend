<template>
  <transition name="activeParty">
    <div class="active-card-wrapper">
      <div v-for="image in thumbnails" :key="image.id" class="active-card">
        <img :src="image.url" :alt="image.filename" />
      </div>
      <div class="active-card">
        <h3 class="text-accent">{{ partyName }}</h3>
        <p v-for="p in description" :key="p">{{ p }}</p>
        <router-link :to="{ name: 'partyDetails', params: { id: id } }">
          <base-button>Party Details<span>&nbsp;⟼</span></base-button>
        </router-link>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps(["partyName", "description", "thumbnails", "id", "slug"]);
</script>

<style>
.active-card-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 4px;
  border: 1rem solid #fff;
  background: var(--color-secondary);
}

.active-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-basis: 500px;
  background: var(--color-secondary);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 2rem 1rem;
  margin: 0 auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.active-card > p {
  color: var(--color-light);
}

.activeParty-enter-active {
  animation: fade-in 2s ease-out;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
