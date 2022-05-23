<template>
    <main>
        <section>
            <h1>Page not found!</h1>
            <h2>Maybe it was moved or no longer exists</h2>
            <p class="text-dark">
                Our homepage will take you where you need to go
            </p>

            <router-link :to="{ name: 'home' }">
                <base-button>Homepage</base-button>
            </router-link>
        </section>
    </main>
</template>
