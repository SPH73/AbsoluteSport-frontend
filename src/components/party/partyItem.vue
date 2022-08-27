<template>
  <div class="party-item">
    <h3>{{ party.partyName }}</h3>
    <h4>{{ party.summaryHeading }}</h4>
    <div>
      <img src="" alt="{{party.partyName}}" />
      <p>{{ party.partySummary }}</p>
    </div>
    <div class="buttons">
      <button class="btn primary">View</button>
      <button class="btn secondary">Book</button>
    </div>
  </div>
</template>

<script setup>
// party item for detail page list
const props = defineProps(["party"]);
</script>
