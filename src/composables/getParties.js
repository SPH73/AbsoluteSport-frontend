const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.VUE_APP_AT_API_KEY }).base(
    process.env.VUE_APP_BASE_ID,
);

import { ref } from 'vue';
const getParties = () => {
    const table = base('partiesList');
    const error = ref(null);
    let party = {};
    const partyList = ref([]);

    const load = async () => {
        try {
            const records = await table
                .select({
                    sort: [{ field: 'partyName', direction: 'asc' }],
                })
                .firstPage();
            if (!records) {
                throw Error('Unable to fetch data');
            }
            records.forEach(record => {
                party = {
                    id: record.id,
                    partyName: record.get('partyName'),
                    partyRef: record.get('partyRef'),
                };
                partyList.value.push(party);
            });
        } catch (err) {
            error.value = err.message;
            console.log(error.value);
        }
    };
    return { partyList, error, load };
};

export default getParties;
