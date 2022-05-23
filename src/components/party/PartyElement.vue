<template>
    <div class="card" @click="selectParty(id)">
        <h3>{{ partyName }}</h3>
        <template v-for="(el, index) in thumbnails" :key="index">
            <img :src="el.url" :alt="el.filename" class="click" />
        </template>
    </div>
</template>

<script>
import { inject } from '@vue/runtime-core';
export default {
    name: 'PartyElement',
    props: ['id', 'partyName', 'summary', 'thumbnails', 'linkedViewID', 'slug'],
    emits: ['select-party'],

    setup() {
        const selectParty = inject('selectParty');
        const activeParty = inject('activeParty');

        return { selectParty, activeParty };
    },
};
</script>

<style>
div.btn-group {
    display: flex;
    justify-content: space-between;
}
div.btn-group > * {
    flex: 1 1 auto;
}

.card img {
    width: 100%;
    border: 0.6rem solid white;
    border-radius: 0.4rem;
}
</style>
