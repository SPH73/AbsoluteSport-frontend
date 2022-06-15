import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import './assets/base.css';
import './assets/basic-grid.css';
import './assets/animated-grid.css';
import './assets/photo-grid.css';
import Spinner from './components/UI/Spinner.vue';
import BaseCard from './components/UI/BaseCard.vue';
import BaseButton from './components/UI/BaseButton.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import PartyBase from './components/party/PartyBase.vue';
import PartyGrid from './components/party/PartyGrid.vue';
import PartyElement from './components/party/PartyElement.vue';
import ActivePartyElement from './components/party/ActivePartyElement.vue';

const app = createApp(App);
app.component('spinner', Spinner);
app.component('base-dialog', BaseDialog);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('party-base', PartyBase);
app.component('party-grid', PartyGrid);
app.component('party-element', PartyElement);
app.component('active-party-element', ActivePartyElement);

app.use(router);
router.isReady().then(() => {
    app.mount('#app');
});
