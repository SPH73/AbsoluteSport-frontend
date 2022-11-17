const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.VUE_APP_AT_API_KEY }).base(
  process.env.VUE_APP_BASE_ID,
);

import { ref } from 'vue';

const getPartyDetailPages = () => {
  const table = base('partiesContent');
  const error = ref(null);
  let party = {};
  const partyDetail = ref([]);

  const loadDetailPages = async () => {
    try {
      const records = await table
        .select({
          view: 'Party Details',
          fields: [
            'pageTitle',
            'slug',
            'partyName',
            'descriptionHeading',
            'pageHeading',
            'descriptionP1',
            'descriptionP2',
            'descriptionP3',
            'descriptionP4',
            'descriptionP5',
            'imagesGallery',
          ],
        })
        .firstPage();
      if (!records) {
        throw Error('Unable to fetch data');
      }

      records.forEach(record => {
        let imagesGallery = record.fields.imagesGallery;
        let aTURL;
        let images = [];
        let img = {};
        imagesGallery.forEach(image => {
          aTURL = image.url;
          let ext = aTURL.indexOf('?');
          aTURL = aTURL.slice(0, ext);
          img = {
            url: aTURL,
            id: image.id,
            filename: image.filename,
            width: image.width,
            height: image.height,
            size: image.size,
            type: image.type,
          };
          images.push(img);
        });
        party = {
          id: record.id,
          slug: record.fields.slug,
          content: 'detail',
          page: record.fields.pageTitle,
          partyName: record.fields.partyName,
          pageHeading: record.fields.pageHeading,
          descriptionHeading: record.fields.descriptionHeading,
          descriptionBody: {
            p1: record.fields.descriptionP1,
            p2: record.fields.descriptionP2,
            p3: record.fields.descriptionP3,
            p4: record.fields.descriptionP4,
            p5: record.fields.descriptionP5,
          },
          images: images,
        };
        partyDetail.value.push(party);
        // console.log('partyDetail arr: ', partyDetail.value);
      });
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return {
    partyDetail,
    error,
    loadDetailPages,
  };
};

export default getPartyDetailPages;
