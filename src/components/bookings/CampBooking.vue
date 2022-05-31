<template>
    <main>
        <section class="section camp-booking">
            <div class="container">
                <base-card>
                    <div class="button-container">
                        <div class="btn-group">
                            <base-button
                                v-show="selectedTab === 'CampForm'"
                                @click="selectedTab = 'CampBookingDetails'"
                                >View Booking Details <span>&nbsp;⟼</span>
                            </base-button>
                            <base-button
                                v-show="selectedTab === 'CampBookingDetails'"
                                @click="selectedTab = 'CampForm'"
                            >
                                <span>⟻&nbsp;</span> Back To Booking
                                Form</base-button
                            >
                        </div>
                    </div>
                    <keep-alive>
                        <camp-form
                            v-if="selectedTab === 'CampForm'"
                            @parent-submitted="handleSaveParent"
                            @booking-item-added="handleAddCampBookingItem"
                            :error="error"
                            :camps-list="campsList"
                            :parent-added="parentAdded"
                        ></camp-form>
                    </keep-alive>
                    <keep-alive>
                        <camp-booking-details
                            v-if="selectedTab === 'CampBookingDetails'"
                            :parent-added="parentAdded"
                            :saved-parent="savedParent"
                            :camp-booking="campBooking"
                            :parent-name="enteredParentName"
                            :main-contact="enteredMainContact"
                            :email="enteredEmail"
                            @removeBookingItem="removeItem"
                        ></camp-booking-details>
                    </keep-alive>
                </base-card>
            </div>
        </section>
    </main>
</template>

<script>
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.VUE_APP_AT_API_KEY }).base(
    process.env.VUE_APP_BASE_ID,
);
import CampBookingDetails from './CampBookingDetails.vue';
import CampForm from './CampForm.vue';
import { ref } from '@vue/reactivity';
import BaseButton from '../UI/BaseButton.vue';
import getCamps from '../../composables/getCamps';
import { computed, watch } from '@vue/runtime-core';
import BaseCard from '../UI/BaseCard.vue';

export default {
    name: 'CampBooking',
    components: { BaseButton, CampBookingDetails, CampForm, BaseCard },
    setup() {
        const selectedTab = ref('CampForm');
        const setSelectedTab = tab => {
            selectedTab.value = tab;
        };
        const campBooking = ref([]);
        const campPayment = ref(null);
        const bookingRef = ref(null);
        const paymentRef = ref(null);
        const children = ref([]);
        const enteredChildName = ref('');
        const enteredChildSurname = ref('');
        const enteredChildAge = ref('select');
        const pupilPrem = ref(false);
        const confirmedPhoto = ref(true);
        const selectedCampName = ref('select');
        const checkedCampDays = ref([
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
        ]);
        const numCampDays = ref(null);
        const enteredParentName = ref('');
        const enteredMainContact = ref('');
        const enteredEmail = ref('');
        const acceptedTerms = ref(false);
        const savedParent = ref({});
        const campBookingItem = ref({});
        const campBookingItemId = ref(Date.now());
        const price = ref(null);

        const createBookingRef = () => {
            bookingRef.value = Date.now().toString(24);
        };

        const createPaymentRef = () => {
            paymentRef.value = Date.now().toString(36);
        };

        const handleSaveParent = (name, contact, email, terms) => {
            createPaymentRef();
            enteredParentName.value = name;
            enteredMainContact.value = contact;
            enteredEmail.value = email;
            acceptedTerms.value = terms;

            savedParent.value = {
                parentName: enteredParentName.value,
                mainContact: enteredMainContact.value,
                email: enteredEmail.value,
                termsAccepted: acceptedTerms.value,
                paymentRef: paymentRef.value,
            };
            console.log('savedParent:_____', savedParent.value);
        };

        const parentAdded = ref(null);
        watch(savedParent, () => {
            parentAdded.value = Object.keys(savedParent.value).length;
        });

        const handleAddCampBookingItem = (
            name,
            surname,
            age,
            pp,
            photo,
            camp,
            days,
        ) => {
            createBookingRef();
            console.log(bookingRef.value);
            campBookingItemId.value = bookingRef.value;
            pupilPrem.value = pp;
            enteredChildName.value = name;
            enteredChildSurname.value = surname;
            enteredChildAge.value = age;
            confirmedPhoto.value = photo;
            selectedCampName.value = camp;
            checkedCampDays.value = days;

            const calculatedDays = computed(() => {
                return (numCampDays.value = days.length);
            });
            const calculatedPrice = computed(() => {
                return (price.value = pupilPrem.value
                    ? 0
                    : numCampDays.value * 25);
            });

            campBookingItem.value = {
                childName: name,
                childSurname: surname,
                parent: enteredParentName.value,
                childAge: age,
                photos: photo,
                campName: camp,
                campDays: days,
                numCampDays: calculatedDays.value,
                bookingRef: bookingRef.value,
                pupilPrem: pp,
                price: calculatedPrice.value,
                paymentRef: paymentRef.value,
                status: 'awaiting payment',
            };

            if (!children.value.includes(enteredChildName.value)) {
                children.value.push(enteredChildName.value);
            }

            campBooking.value.push(campBookingItem.value);
            console.log('Camp Booking Details', campBooking.value);
        };

        const { campsList, error, loadCamps } = getCamps();

        loadCamps();
        // ****No longer need computed value for form but possibly needed if getting all camps to list in view and then change in composable and send to form as current camps not camps-list.
        // const currentCamps = computed(() => {
        //     return campsList.value.filter(camp => camp.status === 'current');
        // });
        const removeItem = item => {
            console.log(`Removing: ${item}`);
            campBooking.value = campBooking.value.filter(
                booking => booking.bookingRef !== item,
            );
        };
        const confirmBooking = () => {
            // add the campBooking to Airtable
            // campBooking.save()

            // add children to savedParent

            // add savedParent to campPayment and send to Airtable

            campPayment.value.push(savedParent.value);
            // campPayment.save()
            console.log('Booking confirmed');
        };

        const handleSmubit = () => {
            console.log('form suubmitted');
        };

        return {
            selectedTab,
            setSelectedTab,
            createBookingRef,
            createPaymentRef,
            campsList,
            error,
            loadCamps,
            enteredParentName,
            enteredMainContact,
            enteredEmail,
            acceptedTerms,
            savedParent,
            parentAdded,
            handleSaveParent,
            bookingRef,
            enteredChildName,
            enteredChildSurname,
            pupilPrem,
            enteredChildAge,
            confirmedPhoto,
            selectedCampName,
            checkedCampDays,
            price,
            campBookingItem,
            campBookingItemId,
            campBooking,
            campPayment,
            handleAddCampBookingItem,
            handleSmubit,
            confirmBooking,
            removeItem,
        };
    },
};
</script>

<style scoped>
p {
    color: var(--color-light);
}
.button-container {
    padding-inline: 1rem;
}
.btn-group {
    display: flex;
    justify-content: space-between;
}
.btn-group > * {
    flex: 1 1 auto;
}
/* .btn-group > * + * {
    margin-left: 0.8rem;
} */
span {
    font-size: larger;
}
</style>
