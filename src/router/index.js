import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PartyView from '../views/PartyView.vue';
import PartyDetailView from '../views/PartyDetailView.vue';
import ClubView from '../views/ClubView.vue';
import CampView from '../views/CampView.vue';
import PartyBooking from '../components/bookings/PartyBooking.vue';
import CampBooking from '../components/bookings/CampBooking.vue';
import ClubBooking from '../components/bookings/ClubBooking.vue';
import ContactForm from '../components/ContactForm.vue';
import FAQsView from '../views/FAQsView.vue';

import PoliciesView from '../views/PoliciesView.vue';
import NotFound from '../components/site/NotFound.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            title: 'AbsoluteSport',
        },
    },
    {
        path: '/bookings/party',
        name: 'partyBooking',
        component: PartyBooking,
        meta: {
            title: 'AbsoluteSport Party Booking',
        },
    },
    {
        path: '/bookings/camp',
        name: 'campBooking',
        component: CampBooking,
        meta: {
            title: 'AbsoluteSport Activity Camp Booking',
        },
    },
    {
        path: '/bookings/club',
        name: 'clubBooking',
        component: ClubBooking,
        meta: {
            title: 'AbsoluteSport School Club Booking',
        },
    },
    {
        path: '/contact',
        name: 'contactForm',
        component: ContactForm,
        meta: {
            title: 'Chat with AbsoluteSport',
        },
    },
    {
        path: '/parties',
        name: 'parties',
        component: PartyView,
        meta: {
            title: 'AbsoluteSport Parties',
        },
    },
    {
        path: '/parties/:id',
        name: 'partyDetails',
        component: PartyDetailView,
        props: true,
        meta: {
            title: 'AbsoluteSport Party Details',
        },
    },
    {
        path: '/clubs',
        name: 'clubs',
        component: ClubView,
        meta: {
            title: 'AbsoluteSport School Clubs',
        },
    },
    {
        path: '/camps',
        name: 'camps',
        component: CampView,
        meta: {
            title: 'AbsoluteSport Activity Camps',
        },
    },
    {
        path: '/faqs',
        name: 'faqs',
        component: FAQsView,
        meta: {
            title: 'AbsoluteSport Frequently Asked Questions',
        },
    },
    {
        path: '/policies-and-procedures',
        name: 'policies',
        component: PoliciesView,
        meta: {
            title: 'AbsoluteSport Policies & Procedures',
        },
    },
    {
        path: '/:notFound(.*)',
        component: NotFound,
        meta: {
            title: 'Page Not Found',
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(_, _2, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { top: 0 };
    },
});

router.beforeEach((to, _, next) => {
    document.title = `${to.meta.title}`;
    next();
});

export default router;
