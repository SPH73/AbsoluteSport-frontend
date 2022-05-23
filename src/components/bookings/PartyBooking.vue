<template>
    <section class="section party">
        <div class="container">
            <base-card>
                <div class="container">
                    <h1 class="text-accent">Party Booking Enquiry</h1>
                    <p class="text-light">
                        We cover West Sussex and Hampshire, however we may also
                        be able to accomodate parties beyond with an additional
                        travel charge.
                    </p>
                    <p class="text-light">
                        We recommend at least 2 weeks advance booking to secure
                        your preferred date and time. If you have an urgent
                        request please get in touch and we&#39;ll do our best to
                        grant your wish. You can also read our FAQ&#39;s for
                        more info.
                    </p>
                </div>
                <div class="container">
                    <form @submit.prevent="handleSubmit">
                        <h3 class="text-light">Parent Details</h3>
                        <div class="grid-inputs">
                            <div class="form-control">
                                <label for="firstName">First Name</label>
                            </div>
                            <div class="form-control">
                                <input
                                    name="firstName"
                                    id="firstName"
                                    type="text"
                                    v-model="enteredFirstName"
                                />
                            </div>
                            <div class="form-control">
                                <label for="surname">Surname</label>
                            </div>
                            <div class="form-control">
                                <input
                                    name="surname"
                                    id="surname"
                                    type="text"
                                    v-model="enteredSurname"
                                />
                            </div>
                            <div class="form-control">
                                <label for="email">Email Address</label>
                            </div>
                            <div class="form-control">
                                <input
                                    name="email"
                                    id="email"
                                    type="email"
                                    v-model="enteredEmail"
                                />
                            </div>
                            <div class="form-control">
                                <label for="mainContact"
                                    >Main Contact Number</label
                                >
                            </div>
                            <div class="form-control">
                                <input
                                    name="mainContact"
                                    id="mainContact"
                                    type="tel"
                                    v-model="enteredPhone"
                                />
                            </div>
                        </div>
                        <h3 class="text-light">Child Details</h3>
                        <div class="grid-inputs">
                            <div class="form-control">
                                <label for="childName">Name</label>
                            </div>
                            <div class="form-control">
                                <input
                                    name="childName"
                                    id="childName"
                                    type="text"
                                    v-model="enteredChildName"
                                />
                            </div>
                            <div class="form-control">
                                <label for="childAge">Age</label>
                            </div>
                            <div class="form-control">
                                <input
                                    name="childAge"
                                    id="childAge"
                                    type="number"
                                    v-model="enteredChildAge"
                                />
                            </div>
                            <div class="form-control">
                                <label for="childBDay">Actual Birthday</label>
                            </div>
                            <div class="form-control">
                                <input
                                    name="childBDay"
                                    id="childBDay"
                                    type="date"
                                    v-model="enteredChildBDay"
                                />
                            </div>
                            <div class="form-control">
                                <label for="info">Additional Info</label>
                            </div>
                            <div class="form-control">
                                <textarea
                                    rows="5"
                                    v-model="enteredInfo"
                                    name="info"
                                    id="info"
                                    placeholder="Is there anything else you would like us to know?"
                                ></textarea>
                            </div>
                        </div>
                        <h3 class="text-light">Event Details</h3>

                        <div v-if="error" class="error">
                            <p>{{ error }}</p>
                        </div>
                        <div v-if="partyList.length">
                            <div class="grid-inputs">
                                <div class="form-control">
                                    <label for="partyName"
                                        >Select Your Party</label
                                    >
                                </div>
                                <div class="form-control">
                                    <select
                                        name="partyName"
                                        id="partyName"
                                        v-model="selectedParty"
                                    >
                                        <option disabled value="select">
                                            Choose...
                                        </option>
                                        <option
                                            v-for="option in partyList"
                                            :key="option.id"
                                            :value="option.partyRef"
                                        >
                                            {{ option.partyName }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div v-else class="form-control">
                            <p>Loading parties...</p>
                        </div>
                        <div class="grid-inputs">
                            <div class="form-control">
                                <label for="partyDate1"
                                    >Party Date 1st Choice</label
                                >
                            </div>
                            <div class="form-control">
                                <input
                                    name="partyDate1"
                                    id="partyDate1"
                                    type="date"
                                    v-model="chosenDate1"
                                />
                            </div>
                            <div class="form-control">
                                <label for="partyDate2"
                                    >Party Date 2nd Choice</label
                                >
                            </div>
                            <div class="form-control">
                                <input
                                    name="partyDate2"
                                    id="partyDate2"
                                    type="date"
                                    v-model="chosenDate2"
                                />
                            </div>
                            <div class="form-control">
                                <label for="partyStart">Party Start Time</label>
                            </div>
                            <div class="form-control">
                                <input type="time" v-model="chosenTime" />
                            </div>
                            <div class="form-control">
                                <label for="partyLength">Party Length</label>
                            </div>
                            <div class="form-control">
                                <input
                                    type="number"
                                    name="partyLength"
                                    id="partyLength"
                                />
                            </div>
                            <div class="form-control">
                                <label for="numChild"
                                    >Estimated Number of Children
                                    Attending</label
                                >
                            </div>
                            <div class="form-control">
                                <input
                                    type="number"
                                    v-model="numChild"
                                    name="numChild"
                                    id="numChild"
                                />
                            </div>
                            <div class="form-control">
                                <label for="postCode"
                                    >Post Code (if no venue booked please use
                                    house postcode</label
                                >
                            </div>
                            <div class="form-control">
                                <input
                                    type="text"
                                    v-model="enteredPostCode"
                                    name="postCode"
                                    id="postCode"
                                />
                            </div>
                        </div>
                        <div class="form-control">
                            <base-button class="primary"
                                >Send Me A Quote</base-button
                            >
                        </div>
                    </form>
                </div>
            </base-card>
        </div>
    </section>
</template>

<script>
import { ref } from '@vue/reactivity';
import getParties from '../../composables/getParties';
export default {
    name: 'PartyForm',

    setup() {
        const enteredFirstName = ref('');
        const enteredSurname = ref('');
        const enteredEmail = ref('');
        const enteredPhone = ref('');
        const enteredPostCode = ref('');
        const enteredInfo = ref('');
        const selectedParty = ref('select');
        const chosenDate1 = ref(null);
        const chosenDate2 = ref(null);
        const chosenTime = ref(null);
        const chosenPartyLength = ref(null);
        const enteredChildName = ref('');
        const enteredChildAge = ref(null);
        const enteredChildBDay = ref(null);
        const numChild = ref(null);

        const { partyList, error, load } = getParties();

        load();

        const handleSubmit = () => {
            console.log(
                enteredFirstName.value,
                enteredSurname.value,
                enteredEmail.value,
                enteredPhone.value,
                enteredPostCode.value,
                selectedParty.value,
                chosenDate1.value,
                chosenDate2.value,
                chosenTime.value,
                chosenPartyLength.value,
                enteredChildName.value,
                enteredChildAge.value,
                enteredChildBDay.value,
            );
        };
        return {
            enteredFirstName,
            enteredSurname,
            numChild,
            enteredEmail,
            enteredPhone,
            enteredPostCode,
            enteredInfo,
            partyList,
            error,
            load,
            selectedParty,
            chosenDate1,
            chosenDate2,
            chosenTime,
            chosenPartyLength,
            enteredChildName,
            enteredChildAge,
            enteredChildBDay,
        };
    },
};
</script>

<style scoped>
@media screen and (max-width: 568px) {
    .grid-inputs {
        display: grid;
        gap: 0.75rem;
        grid-template-columns: 1fr;
    }

    .form-control {
        display: flex;
        width: 100%;
        justify-content: flex-start;
        align-items: center;
    }
}
</style>
