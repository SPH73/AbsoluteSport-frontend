<template>
  <section>
    <h2 v-if="!activeParty">Choose Your Party</h2>
    <party-grid></party-grid>
  </section>
</template>

<script setup>
import { inject } from "@vue/runtime-core";

const activeParty = inject("activeParty");
</script>
