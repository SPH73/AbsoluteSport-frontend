const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.VUE_APP_AT_API_KEY }).base(
    process.env.VUE_APP_BASE_ID,
);

import { ref } from 'vue';

const getFaqs = () => {
    const table = base('FAQs');
    const error = ref(null);
    let faq = {};
    const faqList = ref([]);

    const load = async () => {
        try {
            const records = await table.select().firstPage();
            if (!records) {
                throw Error('unable to fetch data');
            }
            records.forEach(record => {
                faq = {
                    id: record.id,
                    question: record.get('question'),
                    answer: record.get('answer'),
                    tags: record.get('tags'),
                };
                faqList.value.push(faq);
            });
        } catch (err) {
            error.value = err.message;
            console.log(error.value);
        }
    };
    return { faqList, error, load };
};

export default getFaqs;
