const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.VUE_APP_AT_API_KEY }).base(
    process.env.VUE_APP_BASE_ID,
);

import { ref } from 'vue';

const getPartyContent = () => {
    const table = base('partiesContent');
    const mainPageError = ref(null);
    let mainPageInfo = {};
    let mainPageList = {};
    const partyMainPageContent = ref([]);

    const loadMainContent = async () => {
        try {
            const mainInfo = await table
                .select({
                    view: 'Main Page Info',
                    fields: [
                        'pageTitle',
                        'pageHeading',
                        'descriptionHeading',
                        'descriptionP1',
                        'descriptionP2',
                        'descriptionP3',
                        'descriptionP4',
                        'bullets1',
                        'bullets2',
                        'bullets3',
                        'bullets4',
                        'bullets5',
                    ],
                })
                .firstPage();
            if (!mainInfo) {
                throw Error('Unable to fetch party page');
            }

            mainInfo.forEach(record => {
                mainPageInfo = {
                    id: record.id,
                    page: record.get('pageTitle'),
                    pageHeading: record.get('pageHeading'),
                    bulletPoints: {
                        b1: record.get('bullets1'),
                        b2: record.get('bullets2'),
                        b3: record.get('bullets3'),
                        p4: record.get('bullets4'),
                        b5: record.get('bullets5'),
                    },
                    descriptionHeading: record.get('descriptionHeading'),
                    descriptionBody: {
                        p1: record.get('descriptionP1'),
                        p2: record.get('descriptionP2'),
                        p3: record.get('descriptionP3'),
                        p4: record.get('descriptionP4'),
                        p5: record.get('descriptionP5'),
                    },
                };
                partyMainPageContent.value.push(mainPageInfo);
            });

            const mainList = await table
                .select({
                    view: 'Party Details',
                    fields: [
                        'pageTitle',
                        'slug',
                        'partyName',
                        'summaryP1',
                        'summaryP2',
                        'summaryP3',
                        'thumbnail',
                    ],
                })
                .firstPage();
            if (!mainList) {
                throw Error('Unable to fetch party list.');
            }

            mainList.forEach(record => {
                let aTURL = record.fields.thumbnail[0].url;
                let ext = aTURL.lastIndexOf('.');
                aTURL = aTURL.slice(0, ext) + '.webp';
                mainPageList = {
                    id: record.id,
                    content: 'mainList',
                    slug: record.get('slug'),
                    page: record.get('pageTitle'),
                    partyName: record.get('partyName'),
                    summaryBody: {
                        p1: record.get('summaryP1'),
                        p2: record.get('summaryP2'),
                        p3: record.get('summaryP3'),
                    },
                    images: [
                        {
                            id: record.fields.thumbnail[0].id,
                            url: aTURL,
                            filename: record.fields.thumbnail[0].filename,
                            type: record.fields.thumbnail[0].type,
                            size: record.fields.thumbnail[0].size,
                        },
                    ],
                };
                partyMainPageContent.value.push(mainPageList);
            });
        } catch (err) {
            mainPageError.value = err.message;
        }

        // console.log(
        //     'mainPage Content composable:-',
        //     partyMainPageContent.value,
        // );
    };
    return {
        partyMainPageContent,
        mainPageError,
        loadMainContent,
    };
};

export default getPartyContent;
