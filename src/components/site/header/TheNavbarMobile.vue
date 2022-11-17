<template>
    <div id="nav-mobile" @click="toggleShowNav">
        <nav>
            <div class="menu-item">
                <router-link :to="{ name: 'clubs' }">School Clubs</router-link>
            </div>
            <div class="menu-item">
                <router-link :to="{ name: 'camps' }"
                    >Activity Camps</router-link
                >
            </div>
            <div class="menu-item">
                <router-link :to="{ name: 'parties' }"
                    >Kids Parties</router-link
                >
            </div>
            <template v-for="party in partyList" :key="party.id" :id="party.id">
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
            <div class="menu-item">
                <router-link class="" :to="{ name: 'contactForm' }"
                    >Contact</router-link
                >
            </div>
        </nav>
    </div>
</template>

<script>
import { inject } from '@vue/runtime-core';
import ThePartyDropdown from './ThePartyDropdown.vue';

export default {
    name: 'TheNavbarMobile',
    props: {
        toggleShowNav: Function,
    },
    components: { ThePartyDropdown },

    setup() {
        const partyList = inject('party-list');

        return {
            partyList,
        };
    },
};
</script>

<style scoped>
nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 90%;
    background-color: var(--color-accent);
    color: var(--color-secondary);
    text-transform: uppercase;
    font-size: 2rem;
    line-height: 2;
}
nav .menu-item ~ a {
    font-size: 1.2rem;
    color: var(--color-secondary);
    text-transform: uppercase;
    font-weight: 700;
}

nav a.router-link-active {
    border-bottom: 3px solid var(--color-primary);
}

#nav-mobile {
    position: absolute;
    width: 100vw;
    height: 100vh;
    margin: 0;
    top: -110vh;
    left: 0;
    background-color: var(--color-accent);
    z-index: 100;
    transition: all 0.7s ease-in-out;
}

nav .menu-item svg {
    width: 0.8rem;
    margin-right: 0.8rem;
    margin-left: 0;
}
</style>
