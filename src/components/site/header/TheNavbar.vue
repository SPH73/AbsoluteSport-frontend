<template>
  <div id="navbar">
    <nav class="nav-menu">
      <div class="menu-item">
        <router-link class="" :to="{ name: 'contactForm' }">Contact</router-link>
      </div>
      <div class="menu-item">
        <router-link :to="{ name: 'clubs' }">School Clubs</router-link>
      </div>
      <div class="menu-item">
        <router-link :to="{ name: 'camps' }">Activity Camps</router-link>
      </div>
      <the-party-dropdown :link="link"></the-party-dropdown>
    </nav>
  </div>
</template>

<script setup>
import { inject } from "@vue/runtime-core";
import ThePartyDropdown from "./ThePartyDropdown.vue";

const partyList = inject("party-list");
const link = "Kids Parties";
</script>

<style>
.nav-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 1rem;
  margin-top: -1rem;
  background-color: var(--color-accent);
}

.nav-menu a {
  margin: 0.7rem;
  font-size: 1.2rem;
  color: var(--color-secondary);
  text-transform: uppercase;
  font-weight: 700;
  padding: 1.5vmin 1.5rem;
}

.nav-menu a:hover {
  color: var(--color-primary);
  font-weight: 900;
}

.nav-menu a.router-link-exact-active {
  border-bottom: 3px solid var(--color-primary);
  font-weight: 900;
}

#navbar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
