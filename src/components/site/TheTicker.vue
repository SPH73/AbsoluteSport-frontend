<template>
    <div class="ticker-text-container">
        <!-- get ticker text and repeat *3 -->
        <div class="two-col-text-container">
            <div class="ticker-line"></div>
            <h4 class="ticker-text">this is the animated ticker text</h4>
            <div class="ticker-line"></div>
            <h4 class="ticker-text">this is the animated ticker text</h4>
            <div class="ticker-line"></div>
            <h4 class="ticker-text">this is the animated ticker text</h4>
            <div class="ticker-line"></div>
            <h4 class="ticker-text">this is the animated ticker text</h4>
            <div class="ticker-line"></div>
            <h4 class="ticker-text">this is the animated ticker text</h4>
            <div class="ticker-line"></div>
            <h4 class="ticker-text">this is the animated ticker text</h4>
            <div class="ticker-line"></div>
            <h4 class="ticker-text">this is the animated ticker text</h4>
            <div class="ticker-line"></div>
            <h4 class="ticker-text">this is the animated ticker text</h4>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.ticker-text-container {
    background: var(--color-secondary);
    width: 100vw;
    overflow: hidden;
}
.two-col-text-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    animation-duration: 15s;
    animation-name: ticker-animation;
    animation-iteration-count: infinite;
    animation-direction: reverse;
    animation-timing-function: linear;
    animation-play-state: running;
}

.ticker-text {
    text-transform: uppercase;
    white-space: nowrap;
    font-size: 1.4rem;
    font-family: Mulish, sans-serif;
}
.ticker-line {
    width: 4rem;
    height: 0.1rem;
    min-width: 4rem;
    margin-right: 2rem;
    margin-left: 2rem;
    background-color: var(--color-light);
}

@keyframes ticker-animation {
    0% {
        transform: translateX(-50%);
    }
    100% {
        transform: translateX(0);
    }
}
</style>
