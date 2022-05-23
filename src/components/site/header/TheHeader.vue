<template>
    <header class="header">
        <div>
            <router-link :to="{ name: 'home' }" class="header-logo"
                ><img
                    src="@/assets/logo.webp"
                    alt="AbsoluteSport"
                    class="header-logo"
            /></router-link>
        </div>
        <TheNavbarMobile
            :class="{ open: showNav }"
            :toggleShowNav="toggleShowNav"
        />
        <div id="nav-menu-icon" v-if="mobileView">
            <img
                @click.self="toggleShowNav"
                src="@/assets/menu-icon.svg"
                alt="menu"
            />
        </div>
        <TheNavbar v-if="!mobileView" />
    </header>
</template>

<script>
import { ref } from 'vue';
import TheNavbar from './TheNavbar.vue';
import TheNavbarMobile from './TheNavbarMobile.vue';

export default {
    components: {
        TheNavbar,
        TheNavbarMobile,
    },
    setup() {
        const mobileView = ref(false);
        const showNav = ref(false);
        const handleView = () => {
            mobileView.value = window.innerWidth <= 990;
        };
        const toggleShowNav = () => {
            showNav.value = !showNav.value;
        };
        window.addEventListener('resize', handleView);

        return { mobileView, showNav, handleView, toggleShowNav };
    },
};
</script>

<style>
#nav-menu-icon {
    margin-right: 1rem;
    cursor: pointer;
    z-index: 1000;
}
#nav-menu-icon > img {
    width: 2rem;
}

header {
    padding: 1vmin 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-accent);
    position: relative;
}
.open {
    transform: translateY(110vh);
    height: 100vh;
}

header img {
    vertical-align: middle;
    max-width: calc(100vw / 5);
    z-index: 8;
    height: auto;
}

@media screen and (max-width: 667px) {
    .header-logo {
        min-width: calc(100vw / 3);
    }
}

@media screen and (max-width: 375px) {
    .header-logo {
        min-width: calc(100vw / 2);
    }
}
</style>
