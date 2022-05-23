const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.VUE_APP_AT_API_KEY }).base(
    process.env.VUE_APP_BASE_ID,
);

import { ref } from 'vue';

const getClubList = () => {
    const table = base('clubsList');
    const clubError = ref(null);
    let club = {};
    const clubList = ref([]);

    const loadClubs = async () => {
        try {
            const records = await table
                .select({
                    filterByFormula:
                        'AND(spaceAvailable > 0, status = "current")',
                })
                .firstPage();
            if (!records) {
                throw Error('unable to fetch data');
            }
            records.forEach(record => {
                club = {
                    id: record.id,
                    clubName: record.get('clubName'),
                    clubRef: record.get('clubRef'),
                    schoolRef: record.get('schoolRef'),
                    schoolName: record.get('schoolName'),
                    price: record.get('price'),
                    spaces: record.get('spaceAvailable'),
                };
                clubList.value.push(club);
            });
            console.log(clubList.value);
        } catch (err) {
            clubError.value = err.message;
            console.log(clubError.value);
        }
    };

    return { clubList, clubError, loadClubs };
};

export default getClubList;
