<template>
    <div class="basic-grid btm-space">
        <party-element
            v-for="party in mainPageList"
            :key="party.id"
            :id="party.id"
            :slug="party.slug"
            :linkedViewID="party.linkedViewID"
            :party-name="party.partyName"
            :summary="party.summaryBody"
            :thumbnails="party.images"
        ></party-element>
    </div>
</template>

<script>
import { inject } from '@vue/runtime-core';
import PartyElement from './PartyElement.vue';
export default {
    name: 'PartyGrid',
    components: { PartyElement },

    setup() {
        const mainPageList = inject('main_page_list');

        return { mainPageList };
    },
};
</script>

<style>
.btm-space {
    margin-block-end: 1rem;
}
</style>
