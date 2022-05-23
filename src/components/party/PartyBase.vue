<template>
    <section>
        <h2 v-if="!activeParty">Choose Your Party</h2>
        <party-grid></party-grid>
    </section>
</template>

<script>
import { inject } from '@vue/runtime-core';
import PartyGrid from './PartyGrid.vue';
export default {
    name: 'PartyBase',
    components: { PartyGrid },

    setup() {
        const activeParty = inject('activeParty');

        return { activeParty };
    },
};
</script>
