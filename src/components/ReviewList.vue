<template>
    <div class="reviews">
        <Carousel class="carousel" v-slot="{ currentSlide }">
            <Slide v-for="(review, index) in reviews" :key="index">
                <div class="slide-item" v-show="currentSlide === index + 1">
                    <Review :review="review" class="review-item" />
                </div>
            </Slide>
        </Carousel>
    </div>
</template>

<script scoped>
import Review from '../components/Review.vue';
import Carousel from '../components/UI/Carousel.vue';
import Slide from '../components/UI/Slide.vue';
export default {
    name: 'ReviewList',
    props: ['reviews'],
    components: { Review, Carousel, Slide },
};
</script>

<style scoped>
.reviews {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.carousel {
    border-radius: 0.4rem;
    max-width: 100%;
    margin: auto;
    min-width: 30rem;
    min-height: 19rem;
    padding: 1rem;
    height: 100%;
    width: 100%;
    position: relative;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -40%);
    box-sizing: content-box;
}

.slide-item {
    overflow: hidden;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.review-item {
    min-height: 100%;
    min-width: 100%;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
}

/* @media screen and (max-width: 414px) and (max-height: 736px) {
    .reviews {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .carousel {
        border-radius: 0.4rem;
        max-width: 100%;
        margin: auto;
        min-width: 30rem;
        min-height: 19rem;
        padding: 1rem;
        height: 100%;
        width: 100%;
        position: relative;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -40%);
        box-sizing: content-box;
    }

    .slide-item {
        overflow: hidden;
        height: 100%;
        width: 100%;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .review-item {
        min-height: 100%;
        min-width: 100%;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding-top: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
} */
/* @media screen and (min-width: 414px) {
    .reviews {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .carousel {
        border-radius: 0.4rem;
        max-width: 100%;
        margin: auto;
        min-width: 25rem;
        min-height: 19rem;
        padding: 1rem;
        height: 100%;
        width: 100%;
        position: relative;
        left: 50%;
        top: 68%;
        transform: translate(-50%, -68%);
        box-sizing: content-box;
    }

    .slide-item {
        overflow: hidden;
        height: 100%;
        width: 100%;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .review-item {
        min-height: 100%;
        min-width: 100%;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding-top: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
} */
</style>
