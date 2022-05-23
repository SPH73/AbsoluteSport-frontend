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
                        ></camp-booking-details>
                    </keep-alive>
                </base-card>
            </div>
        </section>
    </main>
</template>

<script>
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
        const campPayment = ref([]);
        const bookingRef = ref('');
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
        const campBookingItemId = ref(null);
        const price = ref(null);

        const handleSaveParent = (name, contact, email, terms) => {
            bookingRef.value = contact;
            enteredParentName.value = name;
            enteredMainContact.value = contact;
            enteredEmail.value = email;
            acceptedTerms.value = terms;

            savedParent.value = {
                parentName: enteredParentName.value,
                mainContact: enteredMainContact.value,
                email: enteredEmail.value,
                termsAccepted: acceptedTerms.value,
                bookingRef: bookingRef.value,
            };
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
            id,
        ) => {
            campBookingItemId.value = id;
            pupilPrem.value = pp;
            enteredChildName.value = name;
            enteredChildAge.value = age;
            confirmedPhoto.value = photo;
            selectedCampName.value = camp;
            checkedCampDays.value = days;

            watch(pupilPrem, () => {
                return (ppIsChecked.value = pupilPrem.value ? true : false);
            });
            const calculatedDays = computed(() => {
                return (numCampDays.value = days.length);
            });
            const calculatedPrice = computed(() => {
                return (price.value = pupilPrem.value
                    ? 0
                    : numCampDays.value * 25);
            });

            campBookingItem.value = {
                id: campBookingItemId.value,
                childName: name,
                childSurname: surname,
                childAge: age,
                photos: photo,
                campName: camp,
                campDays: days,
                numCampDays: calculatedDays.value,
                parent: enteredParentName.value,
                boookingRef: bookingRef.value,
                pupilPrem: pp,
                price: calculatedPrice.value,
            };

            children.value.push({
                childName:
                    enteredChildName.value + ' ' + enteredChildSurname.value,
            });
            campBooking.value.push(campBookingItem.value);
            console.log('Camp Booking Details', campBooking.value);
        };

        const { campsList, error, loadCamps } = getCamps();

        loadCamps();
        // ****No longer need computed value for form but maybe needed if getting all camps to list in view and then change in composable and send to form as current camps not camps-list.
        // const currentCamps = computed(() => {
        //     return campsList.value.filter(camp => camp.status === 'current');
        // });

        const confirmBooking = () => {
            // campBooking.save()

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
            campsList,
            error,
            loadCamps,
            enteredParentName,
            enteredMainContact,
            enteredEmail,
            acceptedTerms,
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
            confirmBooking,
            handleSmubit,
            handleSaveParent,
            savedParent,
            parentAdded,
            handleAddCampBookingItem,
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
