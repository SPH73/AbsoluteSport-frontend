<template>
    <div class="faq-list">
        <div v-for="faq in faqList" :key="faq.id">
            <FaqItem :faq="faq" />
        </div>
    </div>
</template>

<script>
import FaqItem from './FaqItem.vue';
export default {
    name: 'FAQList',
    components: { FaqItem },
    props: ['faqList'],
};
</script>

<style>
.faq-list {
    background-color: var(--color-secondary);
}
.faq-list > p {
    color: var(--color-light);
}
</style>
