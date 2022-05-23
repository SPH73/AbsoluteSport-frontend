<template>
    <div class="party-list">
        <h2>Party List</h2>
        <div class="grid">
            <div class="party-items">
                <div v-for="party in parties" :key="party.id">
                    <PartyItem :party="party" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PartyItem from './partyItem.vue';
export default {
    name: 'PartyContent',
    props: ['parties'],
    components: { PartyItem },
    setup(props) {
        console.log(props.parties);
    },
};
</script>

<style></style>
