import { ref } from 'vue';

const useTags = faqList => {
    const tags = ref([]);
    const tagSet = new Set();

    faqList.forEach(item => {
        item.tags.forEach(tag => tagSet.add(tag));
    });

    tags.value = [...tagSet];

    return { tags };
};

export default useTags;
