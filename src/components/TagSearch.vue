<template>
    <div class="tag">
        <base-card>
            <h1>Tag Results</h1>
            <FAQList :faqList="filteredFAQs" />
        </base-card>
    </div>
</template>

<script>
import FAQList from './FAQList.vue';

export default {
    name: 'TagSearch',
    props: ['filteredFAQs'],
    components: { FAQList },
};
</script>

<style>
.tag {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
}
</style>
