const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.VUE_APP_AT_API_KEY }).base(
    process.env.VUE_APP_BASE_ID,
);

import { ref } from 'vue';

const getSchoolList = () => {
    const table = base('schoolList');
    const schoolError = ref(null);
    let school = {};
    const schoolList = ref([]);

    const loadSchools = async () => {
        try {
            const records = await table
                .select({
                    sort: [{ field: 'schoolName', direction: 'asc' }],
                })
                .firstPage();
            if (!records) {
                throw Error('unable to fetch data');
            }
            records.forEach(record => {
                school = {
                    id: record.id,
                    schoolName: record.get('schoolName'),
                    schoolRef: record.get('schoolRef'),
                };
                schoolList.value.push(school);
            });
        } catch (err) {
            schoolError.value = err.message;
            console.log(schoolError.value);
        }
    };
    return { schoolList, schoolError, loadSchools };
};

export default getSchoolList;
