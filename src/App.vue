<template>
  <div id="app">
    <TheTicker />
    <TheHeader />
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from "./components/site/header/TheHeader.vue";
import TheTicker from "./components/site/TheTicker.vue";
import TheFooter from "./components/site/TheFooter.vue";
import getPartyDetailPages from "./composables/getPartyDetailPages";
import { provide } from "@vue/runtime-core";

const { partyDetail, error, loadDetailPages } = getPartyDetailPages();

loadDetailPages();
// provide to Navbar, partySubMenu, partyView, partyDetailView,
provide("party-list", partyDetail);
provide("party-list-error", error);
</script>

<style>
@media screen and (max-width: 568px) {
  .grid-inputs {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: 1fr;
  }

  .form-control {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
  }
}

.route-enter-active {
  animation: dissolve 0.4s ease-out reverse;
}

.route-leave-active {
  animation: dissolve 0.4s ease-in;
}

@keyframes dissolve {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
