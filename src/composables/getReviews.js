const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.VUE_APP_AT_API_KEY }).base(
    process.env.VUE_APP_BASE_ID,
);

import { ref } from 'vue';

const getReviews = () => {
    const table = base('reviews');
    const error = ref(null);
    let review = {};
    const reviews = ref([]);

    const load = async () => {
        try {
            const records = await table
                .select({
                    sort: [
                        { field: 'created', direction: 'desc' },
                        {
                            field: 'reviewerName',
                            direction: 'desc',
                        },
                    ],
                })
                .firstPage();
            if (!records) {
                throw Error('unable to fetch data');
            }
            records.forEach(record => {
                review = {
                    id: record.id,
                    name: record.get('reviewerName'),
                    comment: record.get('reviewerComment'),
                    rating: record.get('rating'),
                    created: record.get('created'),
                };
                reviews.value.push(review);
            });
        } catch (err) {
            error.value = err.message;
            console.log(error.value);
        }
    };
    return { reviews, error, load };
};

export default getReviews;
