<template>
  <main>
    <section class="section">
      <div class="container">
        <div v-if="mainInfo">
          <template v-for="field in mainInfo" :key="field">
            <h1 v-if="field.pageHeading !== undefined">
              {{ field.pageHeading }}
            </h1>
            <h3 v-if="field.descriptionHeading !== undefined">
              {{ field.descriptionHeading }}
            </h3>
            <template v-for="p in field.descriptionBody" :key="p">
              <p v-if="p !== undefined" class="text-dark">
                {{ p }}
              </p>
            </template>
            <ul class="bullets">
              <template v-for="b in field.bulletPoints" :key="b">
                <li class="thumb" v-if="b !== undefined">
                  <span class="text-dark">{{ b }}</span>
                </li>
              </template>
            </ul>
          </template>
        </div>
        <div v-else>
          <spinner></spinner>
        </div>
        <party-base></party-base>
        <transition name="activeCard">
          <div v-if="activeParty">
            <active-party-element
              :id="activeParty && activeParty.id"
              :slug="activeParty && activeParty.slug"
              :partyName="activeParty && activeParty.partyName"
              :description="activeParty && activeParty.summaryBody"
              :thumbnails="activeParty && activeParty.images"
            ></active-party-element>
          </div>
        </transition>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, provide, ref } from "vue";
import getPartyMainPage from "../composables/getPartyMainPage";

const { partyMainPageContent, mainPageError, loadMainContent } = getPartyMainPage();

loadMainContent();

const activeParty = ref(null);

const mainInfo = computed(() =>
  partyMainPageContent.value.filter((content) => content.page === "Main Page Info")
);

const partyList = computed(() =>
  partyMainPageContent.value.filter((content) => content.page === "Detail Page")
);

const activateParty = (partyId) => {
  activeParty.value = partyMainPageContent.value.find((party) => party.id === partyId);
};
// injected into partyGrid for partyElement
provide("main_page_list", partyList);
// trigger ActivePartyElement
provide("selectParty", activateParty);
// injected into partyBase
provide("activeParty", activeParty);
</script>

<style scoped>
ul.bullets {
  margin-top: 2.5em;
  max-width: 700px;
  font-size: 1rem;
  margin-inline: 0;
  line-height: 1.5;
}
li.bullets {
  margin-top: 2.5em;
  max-width: 700px;
  font-size: 1rem;
  margin-inline: 0;
  line-height: 1.5;
}

li span {
  position: relative;
  left: 0.5rem;
}
li.thumb {
  list-style-type: "\1F44D"; /* thumbs up  */
  color: var(--color-light);
}
p {
  max-width: 700px;
}

.party-grid {
  display: grid;
  grid-auto-columns: 1fr 1fr 1fr;
  width: 100%;
  background-color: var(--color-accent);
  border-radius: 0.8em;
  border: 8px solid var(--color-light);
  list-style: none;
  padding: 0 1rem;
  margin: 0 auto;
}

.party-grid-item {
  padding: 1rem;
  width: 70%;
  margin: 0 auto;
}

.activeCard-enter-active {
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
