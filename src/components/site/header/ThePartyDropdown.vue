<template>
  <div class="menu-item" @click="isOpen = !isOpen">
    <a href="#">{{ link }}&#x25BC;</a>
    <transition name="fade" appear>
      <ThePartySubMenu
        :isOpen="isOpen"
        :partyNames="partyList"
        @click.self="selectPartyPage(partyId)"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import ThePartySubMenu from "./ThePartySubMenu.vue";

const props = defineProps(["link", "partyList"]);
const emit = defineEmits(["selectPartyPage"]);
const isOpen = ref(false);
const selectedPartyPage = ref(null);

const selectPartyPage = (partyId) => {
  selectedPartyPage.value = props.partyList.find((party) => party.id === partyId);
};
</script>

<style>
nav .menu-item svg {
  width: 0.8rem;
  margin-right: 0.8rem;
  margin-left: 0;
}
nav .menu-item .sub-menu {
  position: absolute;
  background-color: var(--color-accent);
  top: calc(100%);
  left: 100%;
  transform: translateX(-110%);
  width: max-content;
  border-radius: 0 0 0.4rem 0.4rem;
  z-index: 20;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.sub-menu {
  cursor: pointer;
}
</style>
