<template>
    <section class="section club">
        <div class="container">
            <base-card>
                <div class="container">
                    <div id="club-form">
                        <h2 class="text-accent">School Clubs Booking Form</h2>
                        <p>
                            We currently run school clubs at Sidlesham Primary
                            and West Witterings Primary schools in West Sussex.
                        </p>
                        <p>
                            Morning School Clubs have a max capacity of 12
                            children and cost £3.00 per session. Clubs will need
                            to be paid in a block booking for all weeks. There
                            are 6 weeks for this booking.
                        </p>
                        <p>
                            After School Clubs have a max capacity of 24 and
                            cost £4.00 per session. Clubs will need to be paid
                            in a block booking for all weeks. There are 6 weeks
                            per booking.
                        </p>
                        <p>
                            Please complete the booking form to reserve a place
                            for your child. On receipt of payment a booking
                            confirmation email will be sent to confirm your
                            child&#39;s place for the club. Please use the
                            booking reference provided when you submit the form.
                        </p>
                        <p>
                            Please refer to our FAQ&#39;s for more info or
                            contact us if you have additional questions.
                        </p>
                    </div>
                    <div class="container">
                        <form @submit.prevent="handleSmubit">
                            <div class="grid-inputs">
                                <div class="form-control">
                                    <label class="pName">Parent Name</label>
                                </div>
                                <div class="form-control">
                                    <input
                                        name="pName"
                                        id="pName"
                                        type="text"
                                        v-model="enteredParentName"
                                    />
                                </div>
                                <div class="form-control">
                                    <label for="mainContact"
                                        >Mobile Number</label
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
                                    <label for="altPName"
                                        >Alternate Parent Name</label
                                    >
                                </div>
                                <div class="form-control">
                                    <input
                                        name="altPName"
                                        id="altPName"
                                        type="text"
                                        v-model="enteredAltParentName"
                                    />
                                </div>
                                <div class="form-control">
                                    <label for="altContact"
                                        >Alternate Contact Number</label
                                    >
                                </div>
                                <div class="form-control">
                                    <input
                                        name="altContact"
                                        id="altContact"
                                        type="tel"
                                        v-model="enteredAltContact"
                                    />
                                </div>
                                <div class="form-control">
                                    <label for="childFName"
                                        >Child&#39;s First Name</label
                                    >
                                </div>
                                <div class="form-control">
                                    <input
                                        name="childFName"
                                        id="childFName"
                                        type="text"
                                        v-model="enteredChildFirstName"
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
                                    <label for="medical"
                                        >Medical Conditions</label
                                    >
                                </div>
                                <div class="form-control">
                                    <textarea
                                        rows="4"
                                        v-model="enteredMedical"
                                        name="medical"
                                        id="medical"
                                        placeholder="Please tell us about any medical conditions we need to be aware of. (N/A if none)"
                                    ></textarea>
                                </div>
                                <div class="form-control">
                                    <label for="yearG">Year Group</label>
                                </div>
                                <div class="form-control">
                                    <select
                                        name="yearG"
                                        id="yearG"
                                        v-model="enteredYearGroup"
                                    >
                                        <option disabled value="select">
                                            Select year...
                                        </option>
                                        <option
                                            v-for="(n, i) in 6"
                                            :key="i"
                                            :value="n"
                                        >
                                            {{ n }}
                                        </option>
                                    </select>
                                </div>
                                <div
                                    v-if="schoolError"
                                    class="error form-control"
                                >
                                    <p>
                                        {{ schoolError }} for schools. Please
                                        contact us to book.
                                    </p>
                                </div>
                                <div class="form-control">
                                    <label for="school">School</label>
                                </div>
                                <div
                                    v-if="schoolList.length"
                                    class="form-control"
                                >
                                    <select
                                        name="school"
                                        id="school"
                                        v-model="selectedSchool"
                                    >
                                        <option disabled value="select">
                                            Select School...
                                        </option>
                                        <option
                                            v-for="school in schoolList"
                                            :key="school.id"
                                            :value="school.schoolRef"
                                        >
                                            {{ school.schoolName }}
                                        </option>
                                    </select>
                                </div>
                                <div v-else class="form-control">
                                    <p>Loading schools...</p>
                                </div>
                            </div>
                            <div v-if="clubError" class="form-control error">
                                <p>
                                    {{ clubError }} for clubs. Please contact us
                                    to book.
                                </p>
                            </div>
                            <div v-if="schoolClubs.length">
                                <div
                                    class="inline-checkbox-control"
                                    v-for="club in schoolClubs"
                                    :key="club.id"
                                >
                                    <label class="checkbox-label-control">{{
                                        club.clubName
                                    }}</label>
                                    <input
                                        type="checkbox"
                                        :value="club.clubRef"
                                        v-model="checkedClubs"
                                        class="checkbox-input"
                                    />
                                </div>
                            </div>
                            <div v-else>
                                <p>Select a school to load clubs...</p>
                            </div>

                            <div class="inline-checkbox-control">
                                <label
                                    class="checkbox-label-control"
                                    for="terms-agreed"
                                    >Accept T's &amp; C's</label
                                >
                                <input
                                    type="checkbox"
                                    name="terms-agreed"
                                    id="terms-agreed"
                                    required
                                    value="true"
                                    v-model="acceptedTerms"
                                    class="checkbox-input"
                                />
                            </div>
                            <div class="form-control">
                                <base-button type="submit" class="primary"
                                    >Submit Booking</base-button
                                >
                            </div>
                        </form>
                    </div>
                </div>
            </base-card>
        </div>
    </section>
</template>

<script>
import { ref } from '@vue/reactivity';
import { computed, watchEffect } from '@vue/runtime-core';
import getClubs from '../../composables/getClubList';
import getSchoolList from '../../composables/getSchoolList';

export default {
    name: 'ClubBooking',

    setup() {
        const enteredChildFirstName = ref('');
        const enteredSurname = ref('');
        const enteredMedical = ref('');
        const enteredYearGroup = ref('select');
        const selectedSchool = ref('select');
        const checkedClubs = ref([]);
        const enteredParentName = ref('');
        const enteredEmail = ref('');
        const enteredPhone = ref('');
        const enteredAltParentName = ref('');
        const enteredAltContact = ref('');
        const acceptedTerms = ref(false);

        const { clubList, clubError, loadClubs } = getClubs();
        const { schoolList, schoolError, loadSchools } = getSchoolList();

        loadClubs();
        console.log('ClubList', clubList.value);
        loadSchools();
        console.log('SchoolList', schoolList.value);

        const schoolClubs = computed(() => {
            return clubList.value.filter(school =>
                school.schoolRef.includes(selectedSchool.value),
            );
        });

        watchEffect(() => {
            console.log('Selected school', selectedSchool.value);
            console.log('schools clubs: ', schoolClubs.value);
        });

        const handleSmubit = () => {
            if (acceptedTerms) {
                console.log(
                    enteredParentName.value,
                    enteredPhone.value,
                    enteredEmail.value,
                    enteredAltParentName.value,
                    enteredAltContact.value,
                    enteredChildFirstName.value,
                    enteredSurname.value,
                    enteredMedical.value,
                    enteredYearGroup.value,
                    selectedSchool.value,
                    checkedClubs.value,
                );
            }
        };

        return {
            enteredChildFirstName,
            enteredSurname,
            enteredMedical,
            enteredYearGroup,
            selectedSchool,
            checkedClubs,
            enteredParentName,
            enteredPhone,
            enteredEmail,
            enteredAltParentName,
            enteredAltContact,
            acceptedTerms,
            schoolList,
            schoolClubs,
            clubList,
            clubError,
            schoolError,
            loadClubs,
            loadSchools,
            handleSmubit,
        };
    },
};
</script>

<style scoped>
p {
    color: var(--color-light);
}
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
