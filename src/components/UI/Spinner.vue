<template>
    <div class="spin"></div>
</template>

<style>
.spin {
    display: block;
    width: 4rem;
    height: 4rem;
    margin: 3rem auto;
    border: 3px solid transparent;
    border-radius: 50%;
    border-top-color: var(--color-secondary);
    border-bottom-color: var(--color-accent);
    animation: spin 1s ease infinite;
}
@keyframes spin {
    to {
        transform: rotateZ(360deg);
    }
}
</style>
