<template>
  <div class="party-list">
    <h2>Party List</h2>
    <div class="grid">
      <div class="party-items">
        <div v-for="party in parties" :key="party.id">
          <PartyItem :party="party" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["parties"]);
import PartyItem from "./partyItem.vue";

console.log(props.parties);
</script>
