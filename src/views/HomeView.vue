<template>
    <main>
        <section class="section hero">
            <div class="container">
                <h1>Fun, Laughter, Games and Exercise with AbsoluteSport</h1>
                <h2>
                    Kids learn while having fun at our clubs, camps and parties
                </h2>
            </div>
        </section>
        <section>
            <aside class="home reviews">
                <div class="reviews-container">
                    <div class="error" v-if="error">{{ error }}</div>
                    <div v-if="reviews.length">
                        <ReviewList :reviews="reviews" />
                    </div>
                    <div v-else>
                        <spinner></spinner>
                    </div>
                </div>
            </aside>
            <div v-if="homepageError">{{ homepageError }}</div>
            <div v-if="homepageContent.length">
                <article class="home section club">
                    <div class="container">
                        <base-card>
                            <h2 class="text-accent">During School Term's</h2>
                            <div v-if="clubSection">
                                <template
                                    v-for="el in clubSection"
                                    :key="el.id"
                                >
                                    <router-link :to="{ name: 'clubs' }">
                                        <h3 class="text-accent">
                                            {{ el.pageHeading }}
                                        </h3></router-link
                                    >
                                    <p>{{ el.summary }}</p>
                                </template>
                            </div>
                        </base-card>
                    </div>
                </article>
                <article class="section">
                    <div class="container">
                        <base-card>
                            <h2 class="text-accent">During School Holiday's</h2>
                            <div v-if="campSection">
                                <template
                                    v-for="el in campSection"
                                    :key="el.id"
                                >
                                    <router-link :to="{ name: 'camps' }">
                                        <h3 class="text-accent">
                                            {{ el.pageHeading }}
                                        </h3></router-link
                                    >
                                    <p v-for="p in el.summaryBody" :key="p">
                                        {{ p }}
                                    </p>
                                </template>
                            </div>
                        </base-card>
                    </div>
                </article>
                <article class="home section party">
                    <div class="container">
                        <base-card>
                            <h2 class="text-accent">All Year</h2>
                            <div v-if="partySection">
                                <template
                                    v-for="el in partySection"
                                    :key="el.id"
                                >
                                    <router-link :to="{ name: 'parties' }">
                                        <h3 class="text-accent">
                                            {{ el.pageHeading }}
                                        </h3></router-link
                                    >
                                    <p v-for="p in el.summaryBody" :key="p">
                                        {{ p }}
                                    </p>
                                </template>
                            </div>
                        </base-card>
                    </div>
                </article>
            </div>
            <div v-else>
                <spinner></spinner>
            </div>
        </section>
        <section class="section about">
            <div class="container">
                <h2>“FUN FOR EVERYONE” - AbsoluteSport</h2>
                <h3>
                    Service Provider to Parents, Schools, Councils and Sport
                    Coaches in West Sussex and Hampshire
                </h3>
                <p>
                    Whether you're a parent seeking ways to help your children
                    become more active or a school or other organisation looking
                    for a provider of first-class sports coaching, mentoring or
                    training, AbsoluteSport is certified to help.
                </p>
                <p>
                    Our highly qualified and experienced team will provide
                    programmes and activities tailored to your exact needs.
                </p>
                <p>
                    Our mission is to engage children and young people in
                    physical activity, by providing innovative delivery and
                    training services and the resources to educate and inspire.
                </p>
                <p>Read more about AbsoluteSport -> (leads to About page).</p>
            </div>
        </section>
        <ContactForm />
    </main>
</template>

<script>
import ContactForm from '../components/ContactForm.vue';
import ReviewList from '../components/ReviewList.vue';
import getReviews from '../composables/getReviews';
import getHomepageContent from '../composables/getHomePageContent';
import { computed } from '@vue/runtime-core';
import Spinner from '@/components/UI/Spinner.vue';

export default {
    props: ['reviews'],
    components: {
        ReviewList,
        ContactForm,
        Spinner,
    },
    setup() {
        const { reviews, error, load } = getReviews();
        load();
        const { homepageContent, homepageError, loadHomepageContent } =
            getHomepageContent();
        loadHomepageContent();
        // console.log('Homepage content', homepageContent.value);

        // segment content
        const partySection = computed(() =>
            homepageContent.value.filter(
                content => content.section === 'party',
            ),
        );
        // console.log('partySection', partySection);

        const campSection = computed(() =>
            homepageContent.value.filter(content => content.section === 'camp'),
        );
        // console.log('campSection', campSection);

        const clubSection = computed(() =>
            homepageContent.value.filter(content => content.section === 'club'),
        );

        // console.log('clubSection', clubSection);
        return {
            reviews,
            error,
            load,
            homepageContent,
            homepageError,
            loadHomepageContent,
            partySection,
            campSection,
            clubSection,
        };
    },
};
</script>

<style scoped>
p {
    color: var(--color-light);
}
.container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
}
.section.hero {
    display: flex;
    padding-top: 2rem;
    height: 90vh;
}

.hero {
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;
}

.reviews-container {
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 20%;
    left: 50%;
    transform: translate(-20%, -50%);
}

.section.about {
    min-height: 80vh;
    padding-top: 2rem;
    display: flex;
}
.about {
    background-position: left top;
    background-size: cover;
    background-repeat: no-repeat;
}

@media screen and (max-width: 480px) {
    .section.hero {
        display: flex;
        flex-direction: row;
        padding: 2rem;
        height: 90vh;
    }
    .hero {
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.25)
            ),
            url('@/assets/hero_1200.webp');
    }
    .about {
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.25)
            ),
            url('@/assets/home_about_sml.webp');
    }
}

@media screen and (min-width: 481px) and (max-width: 1024px) {
    .hero {
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.25)
            ),
            url('@/assets/hero_1200.webp');
    }
    .about {
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.25)
            ),
            url('@/assets/home_about_sml.webp');
    }
}

@media screen and (min-width: 1367px) and (orientation: landscape) {
    .hero {
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.25)
            ),
            url('@/assets/hero_1920.webp');
        background-attachment: fixed;
    }

    .about {
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.25)
            ),
            url('@/assets/home_about_1920.webp');
        background-attachment: fixed;
    }
}
/* orientation landscape? */
@media screen and (min-width: 1025px) {
    .hero {
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.25)
            ),
            url('@/assets/hero_1200.webp');
    }

    .about {
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.25)
            ),
            url('@/assets/home_about_1920.webp');
    }
}

@media only screen and (min-height: 1024px) {
    .section.hero {
        height: 50vh;
    }
    .reviews-container {
        position: absolute;
        display: flex;
        align-items: center;
        top: 58%;
        left: 50%;
        transform: translate(-58%, -50%);
    }
}

@media screen and (max-height: 568px) {
    .reviews-container {
        display: none;
    }
}
</style>
