const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.VUE_APP_AT_API_KEY }).base(
    process.env.VUE_APP_BASE_ID,
);

import { ref } from 'vue';

const getCamps = () => {
    const table = base('campsList');
    const campsList = ref([]);
    let camp = {};
    const error = ref(null);
    const loadCamps = async () => {
        try {
            const records = await table
                .select({
                    sort: [{ field: 'campDate', direction: 'asc' }],
                    filterByFormula:
                        'AND(spaceAvailable > 0, status = "current")',
                })
                .firstPage();
            if (!records) {
                throw Error('unable to fetch data');
            }
            records.forEach(record => {
                camp = {
                    id: record.id,
                    campName: record.get('campName'),
                    campRef: record.get('campRef'),
                    campDate: record.get('campDate'),
                    pricePerDay: record.get('pricePerDay'),
                    spaces: record.get('spaceAvailable'),
                };
                campsList.value.push(camp);
            });
        } catch (err) {
            error.value = err.message;
            console.log(error.value);
        }
    };

    return { campsList, error, loadCamps };
};

export default getCamps;
