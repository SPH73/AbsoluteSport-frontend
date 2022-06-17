const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.VUE_APP_AT_API_KEY }).base(
    process.env.VUE_APP_BASE_ID,
);

import { ref } from 'vue';
const getClubsContent = () => {
    const table = base('clubsContent');
    const error = ref(null);
    let club = {};
    const clubsContent = ref([]);

    const loadClubsContent = async () => {
        try {
            const records = await table
                .select({
                    filterByFormula: "{page} = 'Clubs Page'",
                })
                .firstPage();
            if (!records) {
                throw Error('unable to fetch data');
            }
            records.forEach(record => {
                club = {
                    id: record.id,
                    heading: record.get('pageheading'),
                    description: record.get('detailedDescription'),
                };
                clubsContent.value.push(club);
            });
        } catch (err) {
            error.value = err.message;
            console.log(error.value);
        }
    };
    return { clubsContent, error, loadClubsContent };
};

export default getClubsContent;
