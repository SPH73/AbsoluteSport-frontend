const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.VUE_APP_AT_API_KEY }).base(
    process.env.VUE_APP_BASE_ID,
);

import { ref } from 'vue';
const partiesTable = base('partiesContent');
const clubsTable = base('clubsContent');
const campsTable = base('campsContent');

const getHomepageContent = () => {
    const homepageContent = ref([]);
    const homepageError = ref(null);
    let partySection = {};
    let clubSection = {};
    let campSection = {};

    const loadHomepageContent = async () => {
        try {
            const partyRecords = await partiesTable
                .select({
                    view: 'Homepage Content',
                    fields: [
                        'pageHeading',
                        // 'thumbnail',
                        'summaryP1',
                        'summaryP2',
                        'summaryP3',
                    ],
                })
                .firstPage();

            if (!partyRecords) {
                throw Error('Unable to fetch data');
            }

            partyRecords.forEach(partyRecord => {
                // let aTURL = partyRecord.fields.thumbnail[0].url;
                // let ext = aTURL.lastIndexOf('.');
                // aTURL = aTURL.slice(0, ext) + '.webp';
                partySection = {
                    section: 'party',
                    id: partyRecord.id,
                    pageHeading: partyRecord.get('pageHeading'),
                    // thumbnails: [
                    //     {
                    //         id: partyRecord.fields.thumbnail[0].id,
                    //         url: aTURL,
                    //         filename: partyRecord.fields.thumbnail[0].filename,
                    //         type: partyRecord.fields.thumbnail[0].type,
                    //         size: partyRecord.fields.thumbnail[0].size,
                    //     },
                    // ],
                    summaryBody: {
                        p1: partyRecord.get('summaryP1'),
                        p2: partyRecord.get('summaryP2'),
                        p3: partyRecord.get('summaryP3'),
                    },
                };
                homepageContent.value.push(partySection);
            });

            const clubRecords = await clubsTable
                .select({
                    view: 'Homepage Content',
                    fields: ['pageHeading', 'summary'],
                })
                .firstPage();

            if (!clubRecords) {
                throw Error('Unable to fetch data');
            }

            clubRecords.forEach(clubRecord => {
                // let aTURL = clubRecord.fields.thumbnail[0].url;
                // let ext = aTURL.lastIndexOf('.');
                // aTURL = aTURL.slice(0, ext) + '.webp';
                clubSection = {
                    section: 'club',
                    id: clubRecord.id,
                    pageHeading: clubRecord.get('pageHeading'),
                    summary: clubRecord.get('summary'),
                    // thumbnails: [
                    //     {
                    //         id: clubRecord.fields.thumbnail[0].id,
                    //         url: aTURL,
                    //         filename: clubRecord.fields.thumbnail[0].filename,
                    //         type: clubRecord.fields.thumbnail[0].type,
                    //         size: clubRecord.fields.thumbnail[0].size,
                    //     },
                    // ],
                };
                homepageContent.value.push(clubSection);
            });

            const campRecords = await campsTable
                .select({
                    view: 'Homepage Content',
                    fields: [
                        'pageHeading',
                        // 'thumbnail',
                        'summaryP1',
                        'summaryP2',
                        'summaryP3',
                    ],
                })
                .firstPage();

            if (!campRecords) {
                throw Error('Unable to fetch data');
            }

            campRecords.forEach(campRecord => {
                // let aTURL = campRecord.fields.thumbnail[0].url;
                // let ext = aTURL.lastIndexOf('.');
                // aTURL = aTURL.slice(0, ext) + '.webp';
                campSection = {
                    section: 'camp',
                    id: campRecord.id,
                    pageHeading: campRecord.get('pageHeading'),
                    // thumbnails: [
                    //     {
                    //         id: campRecord.fields.thumbnail[0].id,
                    //         url: aTURL,
                    //         filename: campRecord.fields.thumbnail[0].filename,
                    //         type: campRecord.fields.thumbnail[0].type,
                    //         size: campRecord.fields.thumbnail[0].size,
                    //     },
                    // ],
                    summaryBody: {
                        p1: campRecord.get('summaryP1'),
                        p2: campRecord.get('summaryP2'),
                        p3: campRecord.get('summaryP3'),
                    },
                };
                homepageContent.value.push(campSection);
            });
        } catch (err) {
            homepageError.value = err.message;
            console.log(homepageError.value);
        }
    };

    return {
        homepageContent,
        homepageError,
        loadHomepageContent,
    };
};

export default getHomepageContent;
