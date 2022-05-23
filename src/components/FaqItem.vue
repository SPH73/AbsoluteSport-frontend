<template>
    <div class="faq">
        <h3 @click="toggleAnswer" class="text-accent">
            {{ faq.question }} &#9662;
        </h3>
        <div>
            <transition name="answer">
                <p v-if="showAnswer">{{ faq.answer }}</p>
            </transition>
            <span class="tag" v-for="tag in faq.tags" :key="tag">
                #{{ tag }}</span
            >
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
    props: ['faq'],
    setup() {
        const showAnswer = ref(false);

        const toggleAnswer = () => {
            showAnswer.value = !showAnswer.value;
        };
        return { showAnswer, toggleAnswer };
    },
};
</script>

<style>
p {
    color: var(--color-light);
    /* margin-bottom: 0.6rem; */
}
.tag {
    color: var(--color-accent);
    font-size: 1.1rem;
    /* margin-block: 2rem 0; */
}
.faq > h3 {
    cursor: pointer;
}
@keyframes slide-scale {
    0% {
        opacity: 0;
        transform: translateY(-2rem) scale(0.8);
    }

    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
.answer-enter-active {
    animation: slide-scale 0.5s ease-in-out;
}

.answer-leave-active {
    animation: slide-scale 0.5s ease-in-out reverse;
}
</style>
