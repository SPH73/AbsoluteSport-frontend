<template>
  <main>
    <section class="section">
      <div class="container">
        <div v-if="error">
          <p>{{ error }}</p>
        </div>
        <div v-if="partyList.length">
          <div v-if="selectedParty">
            <div class="party-content">
              <div>
                <h2>{{ selectedParty.pageHeading }}</h2>
                <h3>{{ selectedParty.descriptionHeading }}</h3>
              </div>
              <div
                class="party-images"
                v-for="image in selectedParty.images"
                :key="image.id"
              >
                <img :src="image.url" :alt="image.filename" />
              </div>
              <div v-for="p in selectedParty.descriptionBody" :key="p">
                <p v-html="p" class="text-dark"></p>
              </div>
            </div>
          </div>
          <div v-else>
            <spinner></spinner>
          </div>
        </div>
        <div v-else>
          <spinner></spinner>
        </div>
      </div>
      <div class="container">
        <div class="btn-group">
          <router-link :to="{ name: 'partyBooking' }">
            <base-button>Get A Quote</base-button>
          </router-link>
          <router-link
            :class="{ hide: isActive }"
            :to="{
              name: 'partyDetails',
              params: { id: 'recRLNf8jBkfUWBQI' },
            }"
          >
            <base-button>AbsoluteSport<span>&nbsp;⟼</span></base-button>
          </router-link>
          <router-link
            :class="{ hide: isActive }"
            :to="{
              name: 'partyDetails',
              params: { id: 'recAOjnaVvhaEmrHd' },
            }"
          >
            <base-button>Football Frenzy<span>&nbsp;⟼</span></base-button>
          </router-link>
          <router-link
            :class="{ hide: isActive }"
            :to="{
              name: 'partyDetails',
              params: { id: 'rect00TrzCEYsgDaU' },
            }"
          >
            <base-button>Disco<span>&nbsp;⟼</span></base-button>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { inject, toRef, ref, watchEffect } from "@vue/runtime-core";

const props = defineProps(["id"]);
// inject from App
const partyList = inject("party-list");
const error = inject("party-list-error");

const propsId = toRef(props, "id");

const selectedParty = ref(null);

const loadParty = (propsId) => {
  selectedParty.value = partyList.value.find((party) => party.id === propsId.value);
};
loadParty(propsId);
watchEffect(() => loadParty(propsId));
</script>

<style scoped>
.hide {
  display: none;
}

div.btn-group {
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  flex-wrap: wrap;
}
div.btn-group > * {
  flex: 0 1 auto;
}

/* .party-images {
    display: inline-flex;
    flex: 1 1 auto;
} */

.party-images img {
  width: 35%;
  float: right;
  margin: 2rem;
  border: 0.6rem solid white;
  border-radius: 0.4rem;
  background-color: white;
  object-fit: cover;
  object-position: bottom;
}

.party-images:nth-of-type(odd) img {
  float: left;
}

/* .container.footer {
    position: absolute;
    bottom: 0;
} */
</style>
