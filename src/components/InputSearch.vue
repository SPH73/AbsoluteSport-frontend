<template>
    <div id="search-input">
        <base-card>
            <h2>Search Results</h2>
            <FAQList :faqList="matchingFAQ" />
        </base-card>
    </div>
</template>

<script>
import FAQList from '../components/FAQList.vue';
export default {
    name: 'InputSearch',
    props: ['matchingFAQ'],
    components: { FAQList },
};
</script>
<style scoped>
#search-input {
    margin-block: 0 2rem;
}
</style>
