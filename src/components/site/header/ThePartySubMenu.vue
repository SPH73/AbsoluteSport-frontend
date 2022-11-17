<template>
  <div class="sub-menu" v-if="isOpen">
    <div class="menu-item">
      <router-link :to="{ name: 'parties' }">Parties</router-link>
    </div>
    <template v-for="party in parties" :key="party.id" :id="party.id">
      <div class="menu-item">
        <router-link
          :to="{
            name: 'partyDetails',
            params: { id: party.id },
          }"
          >{{ party.partyName }}</router-link
        >
      </div>
    </template>
  </div>
</template>

<script setup>
import { inject } from "@vue/runtime-core";

const props = defineProps(["isOpen", "parties"]);

const parties = inject("party-list");
</script>

<style></style>
