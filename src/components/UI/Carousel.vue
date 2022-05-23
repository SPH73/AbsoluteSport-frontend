<template>
    <div class="carousel">
        <slot :current-slide="currentSlide" />
        <!-- navigation -->
        <div class="navigate">
            <div @click="prevSlide" class="toggle-slide left">
                <i class="fa-solid fa-chevron-left"></i>
            </div>
            <div @click="nextSlide" class="toggle-slide right">
                <i class="fa-solid fa-chevron-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
export default {
    setup() {
        const currentSlide = ref(14);
        const getSlideCount = ref(null);
        const autoPlayEnabled = ref(true);
        const changeDelay = ref(4000);

        // slide navigation
        // next slide
        const nextSlide = () => {
            if (currentSlide.value === getSlideCount.value) {
                currentSlide.value = 1;
                return;
            }
            currentSlide.value += 1;
        };
        // prev slide

        const prevSlide = () => {
            if (currentSlide.value === 1) {
                currentSlide.value = getSlideCount.value;
                return;
            }
            currentSlide.value -= 1;
        };

        // autoplay
        const autoPlay = () => {
            setInterval(() => {
                nextSlide();
            }, changeDelay.value);
        };

        if (autoPlayEnabled.value) {
            autoPlay();
        }

        onMounted(() => {
            getSlideCount.value = document.querySelectorAll('.slide').length;
        });

        return {
            currentSlide,
            nextSlide,
            prevSlide,
            getSlideCount,
        };
    },
};
</script>

<style scoped>
.carousel {
    background-color: rgba(0, 0, 0, 0.05);
}
.navigate {
    /* padding: 0 16px; */
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    z-index: 1000;
}
.toggle-slide {
    display: flex;
    flex: 1;
    cursor: pointer;
    z-index: 1000;
}

.right {
    justify-content: flex-end;
    cursor: pointer;
    z-index: 1000;
}

i {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
    font-size: 2.5rem;
    background-color: rgba(255, 255, 255, 0.6);
    color: #ff4500;
    margin-top: 10rem;
}
</style>
