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
                    sort: [{ field: 'clubName', direction: 'asc' }],
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
                    spaces: record.get('spaceAvailable'),
                    yearRange: record.get('yearRange'),
                    schoolName: record.get('schoolName'),
                    schoolRef: record.get('schoolRef'),
                    price: record.get('price'),
                    sessions: record.get('sessions'),
                    termCost: record.get('termCost'),
                    startDate: record.get('startDate'),
                    endDate: record.get('endDate'),
                };
                clubList.value.push(club);
            });
            console.log('clublist', clubList.value);
        } catch (err) {
            clubError.value = err.message;
            console.log(clubError.value);
        }
    };

    return { clubList, clubError, loadClubs };
};

export default getClubList;
