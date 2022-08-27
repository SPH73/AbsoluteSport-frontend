<template>
  <main>
    <section class="section search">
      <div class="container">
        <h1>Frequently Asked Question's</h1>
        <p>Filter by search or tag or browse the list of FAQ's</p>
        <input
          class="searchInput"
          type="text"
          name="search"
          id="search"
          v-model="search"
          placeholder="Search..."
        />

        <div v-if="error">{{ error }}</div>
        <div v-if="faqList.length">
          <TagCloud :faqs="faqList" @select-tag="selectTag" :selected-tag="selectedTag" />
          <div v-if="selectedTag" id="selected-tag">
            <p class="center">
              Searching all Faq's tagged with #{{ selectedTag }}&nbsp;
              <base-button class="trash" @click="clearTag">&#128465;</base-button>
            </p>
          </div>
        </div>
        <!-- <div v-else>
                    <spinner></spinner>
                </div> -->
        <div class="btn-group">
          <base-button class="btn" @click="clearFilters"> Clear All </base-button>
          <base-button class="btn" v-if="showFaqs" @click="hideFaqList">
            Hide All
          </base-button>
          <base-button class="btn" v-else @click="showFaqList"> Show All </base-button>
        </div>
      </div>
    </section>
    <section class="section faqs">
      <div class="container"></div>
      <transition name="showFiltered">
        <div v-if="selectedTag" class="section tag">
          <div class="container" id="search-tag">
            <div v-if="filteredFAQs.length">
              <TagSearch :filteredFAQs="filteredFAQs" />
            </div>
            <div v-else>
              <p>Oops! We seem to be having a problem searching that tag...</p>
            </div>
          </div>
        </div>
        <div v-else-if="search.length">
          <div v-if="matchingFAQ.length">
            <InputSearch :matchingFAQ="matchingFAQ" />
          </div>
          <div v-else>
            <p>Try a typing a different search term or phrase or use search by tag...</p>
          </div>
        </div>
      </transition>
      <transition name="showFaq">
        <div v-if="showFaqs && !search.length && !selectedTag" class="section questions">
          <div class="container" id="faq-list">
            <div v-if="error">
              <p>{{ error }}</p>
            </div>

            <div v-if="faqList.length">
              <base-card>
                <FAQList v-if="showFaqs" :faqList="faqList" />
              </base-card>
            </div>
            <div v-else>
              <spinner></spinner>
            </div>
          </div>
        </div>
      </transition>
    </section>
  </main>
</template>

<script setup>
import FAQList from "../components/FAQList.vue";
import InputSearch from "../components/InputSearch.vue";
import TagSearch from "../components/TagSearch.vue";
import TagCloud from "../components/TagCloud.vue";
import getFaqs from "../composables/getFaqs";
import { ref, computed } from "vue";
import Spinner from "@/components/UI/Spinner.vue";

const { faqList, error, load } = getFaqs();
load();

const showFaqs = ref(false);
const search = ref("");
const selectedTag = ref(null);

const matchingFAQ = computed(() => {
  return faqList.value.filter((faq) => faq.question.includes(search.value));
});
const showFaqList = () => {
  showFaqs.value = true;
  selectedTag.value = null;
  search.value = "";
};
const hideFaqList = () => {
  showFaqs.value = false;
};

const selectTag = (tag) => {
  return (selectedTag.value = tag);
};

const filteredFAQs = computed(() => {
  return faqList.value.filter((faq) => faq.tags.includes(selectedTag.value));
});

const clearTag = () => {
  selectedTag.value = null;
};

const clearInput = () => {
  search.value = "";
};

const clearFilters = () => {
  clearTag();
  clearInput();
  hideFaqList();
};
</script>

<style scoped>
p {
  color: var(--color-light);
}
.center {
  margin-inline: auto;
}
#selected-tag > p > button {
  color: var(--color-primary);
  padding-block: 0;
}
.section.search {
  background-color: var(--color-secondary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.searchInput {
  width: calc(100vw / 2);
  height: 3rem;
  border: none;
  border-radius: 2.5rem;
  color: var(--color-grey);
  font-size: 1.5rem;
}

.section.faqs {
  background-color: var(--color-primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card {
  background-color: var(--color-secondary);
  border: 0.6rem solid var(--color-light);
  border-radius: 0.4rem;
  padding: 2rem;
}
.card > h3 {
  color: var(--color-accent);
}

.btn-group {
  display: flex;
  justify-content: space-between;
}
.btn-group > * {
  flex: 1 1 auto;
}
@keyframes slide-out {
  0% {
    opacity: 0;
    transform: translateY(-110px) scale(0.9);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.showFaq-enter-active,
.showFiltered-enter-active {
  animation: slide-out 0.5s ease-in-out;
}

.showFaq-leave-active,
.showFiltered-leave-active {
  animation: slide-out 0.5s ease-in-out reverse;
}
</style>
