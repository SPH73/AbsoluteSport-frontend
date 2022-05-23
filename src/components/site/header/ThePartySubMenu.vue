<template>
    <div class="sub-menu" v-if="isOpen">
        <div class="menu-item">
            <router-link :to="{ name: 'parties' }">Parties</router-link>
        </div>
        <template v-for="party in parties" :key="party.id" :id="party.id">
            <div class="menu-item">
                <router-link
                    :to="{
                        name: 'partyDetails',
                        params: { id: party.id },
                    }"
                    >{{ party.partyName }}</router-link
                >
            </div>
        </template>
    </div>
</template>

<script>
import { inject } from '@vue/runtime-core';
export default {
    name: 'ThePartySubMenu',
    props: ['isOpen', 'parties'],

    setup() {
        // inject from App
        const parties = inject('party-list');

        return { parties };
    },
};
</script>

<style></style>
