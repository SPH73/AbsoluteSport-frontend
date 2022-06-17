const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.VUE_APP_AT_API_KEY }).base(
    process.env.VUE_APP_BASE_ID,
);

import { ref } from 'vue';
const getCampsContent = () => {
    const table = base('campsContent');
    const error = ref(null);
    let camp = {};
    const campContent = ref([]);

    const loadCampsContent = async () => {
        try {
            const mainContent = await table
                .select({
                    filterByFormula: "{page}= 'Main Page'",
                })
                .firstPage();
            if (!mainContent) {
                throw Error('Unable to fetch data');
            }
            mainContent.forEach(record => {
                mainContent = {
                    heading: record.get('heading'),
                    summary: record.get('summary'),
                    description: record.get('detailedDescrition'),
                    summaryBody: {
                        p1: record.get('summaryP1'),
                        p2: record.get('summaryP2'),
                        p3: record.get('summaryP3'),
                    },
                };
                campContent.value.push(mainContent);
            });

            const mainListContent = await table
                .select({
                    filterByFormula: "{page}= 'Main Page List'",
                })
                .firstPage();
            if (!mainListContent) {
                throw Error('Unable to fetch camps data');
            }
            mainListContent.forEach(camp => {
                mainListContent = {
                    heading: camp.get('heading'),
                    description: camp.get('detailedDescrition'),
                    images: [
                        {
                            id: camp.fields.imagesGallery[0].id,
                            url: aTURL,
                            filename: camp.fields.imagesGallery[0].filename,
                            type: camp.fields.imagesGallery[0].type,
                            size: camp.fields.imagesGallery[0].size,
                        },
                    ],
                };
                campContent.value.push(mainListContent);
            });
        } catch (err) {
            error.value = err.message;
            console.log(error.value);
        }
    };
    return { campContent, error, loadCampsContent };
};

export default getCampsContent;
