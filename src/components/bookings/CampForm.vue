<template>
    <base-dialog @close="confirmPP" :open="ppIsChecked" :title="title">
        <template #content>
            <p class="text-dark">
                We are obliged to confrm your child&#39;s entitlement to a pupil
                premium place with the council. If there are any issues we will
                contact you directly.
            </p>
        </template>
        <template #actions>
            <base-button @click="confirmPP">Got It!</base-button>
        </template>
    </base-dialog>
    <div class="container">
        <h2 class="text-accent">Activity Camp Booking Form</h2>
        <p>
            Our Holiday Activity Camps run at Sidlesham Primary School. Places
            often fill up quickly so please reserve a place for your child as
            soon as possible.
        </p>
        <p>
            Kindly use your unique booking reference when making payment so that
            we can allocate your payment and confirm your child's place.
        </p>
        <p>
            As a service provider to the West Sussex Council we have a certain
            amount of places available for pupil premium. Please tick the box
            below if your child recieves a pupil premium benefit.
        </p>
    </div>
    <!-- parent details form -->
    <div class="container">
        <h3 class="text-light">Parent/Guradian Details</h3>
        <div v-if="!parentAdded">
            <form @submit.prevent="onSubmitParent">
                <div class="grid-inputs">
                    <div class="form-control">
                        <label for="parentName">Name</label>
                    </div>
                    <div class="form-control">
                        <input
                            type="text"
                            name="parentName"
                            id="parentName"
                            required
                            v-model.trim.lazy="parentName"
                        />
                    </div>
                    <div class="form-control">
                        <label for="mainContact">Mobile Number</label>
                    </div>
                    <div class="form-control">
                        <input
                            type="tel"
                            name="mainContact"
                            id="mainContact"
                            required
                            v-model.trim.lazy="mainContact"
                        />
                    </div>
                    <div class="form-control">
                        <label for="email">Email Address</label>
                    </div>
                    <div class="form-control">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            v-model.trim.lazy="email"
                        />
                    </div>
                </div>
                <div class="inline-checkbox-control">
                    <label for="terms-agreed" class="checkbox-label-control"
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
                    <base-button>Save Details</base-button>
                </div>
            </form>
            <!-- /end parent form -->
        </div>
        <div v-else>
            <p class="text-accent">Parent saved successfully.</p>
        </div>
        <!-- camp booking form -->
        <!-- child details -->
        <h3>Child Details</h3>
        <form @submit.prevent="onSubmitBookingItem">
            <div class="grid-inputs">
                <div class="form-control">
                    <label for="childName">Name</label>
                </div>
                <div class="form-control">
                    <input
                        type="text"
                        name="childName"
                        id="childName"
                        required
                        v-model.trim.lazy="childName"
                    />
                </div>
                <div class="form-control">
                    <label for="surname">Surname</label>
                </div>
                <div class="form-control">
                    <input
                        type="text"
                        name="childName"
                        id="childName"
                        required
                        v-model.trim.lazy="childSurname"
                    />
                </div>
                <div class="form-control">
                    <label for="childAge">Age At Camp</label>
                </div>
                <div class="form-control">
                    <select
                        name="childAge"
                        id="childAge"
                        v-model.number="childAge"
                        required
                        class="form-control-select"
                    >
                        <option disabled value="select">Select age...</option>
                        <option v-for="(n, i) in 12" :key="i" :value="n">
                            {{ n }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="inline-checkbox-control">
                <label for="pupilPremium" class="checkbox-label-control"
                    >Pupil Premium?</label
                >
                <input
                    type="checkbox"
                    name="pupilPremium"
                    id="pupilPremium"
                    v-model="pupilPrem"
                    class="checkbox-input"
                />
            </div>
            <div class="inline-checkbox-control">
                <label for="photo" class="checkbox-label-control"
                    >Photo Permission?</label
                >
                <input
                    type="checkbox"
                    name="photo"
                    id="photo"
                    v-model="confirmedPhoto"
                    class="checkbox-input"
                />
            </div>

            <!-- /child details -->
            <!-- camp details -->
            <h3>Camp Details</h3>
            <div v-if="error" class="error">
                <p>{{ error }}</p>
            </div>
            <div v-if="campsList.length">
                <div class="grid-inputs">
                    <div class="form-control">
                        <label for="campName">Select Camp</label>
                    </div>
                    <div class="form-control">
                        <select
                            required
                            name="campName"
                            id="campName"
                            v-model="campName"
                            class="form-control-select"
                        >
                            <option disabled value="select">Choose...</option>
                            <option
                                v-for="option in campsList"
                                :value="option.campRef"
                                :key="option.id"
                            >
                                {{ option.campName }} £{{ option.pricePerDay }}
                                per day
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div v-else class="form-control">
                <p>Loading camps...</p>
            </div>
            <div class="block-checkbox-control">
                <div class="day">
                    <label for="mon">Mo</label>
                    <input
                        type="checkbox"
                        name="mon"
                        id="mon"
                        value="Monday"
                        v-model="campDays"
                        class="checkbox-input"
                    />
                </div>
                <div class="day">
                    <label for="tue">Tu</label>
                    <input
                        type="checkbox"
                        name="tue"
                        id="tue"
                        value="Tuesday"
                        v-model="campDays"
                        class="checkbox-input"
                    />
                </div>
                <div class="day">
                    <label for="wed">We</label>
                    <input
                        type="checkbox"
                        name="wed"
                        id="wed"
                        value="Wednesday"
                        v-model="campDays"
                        class="checkbox-input"
                    />
                </div>
                <div class="day">
                    <label for="thu">Th</label>
                    <input
                        type="checkbox"
                        name="thu"
                        id="thu"
                        value="Thursday"
                        v-model="campDays"
                        class="checkbox-input"
                    />
                </div>
                <div class="day">
                    <label for="fri">Fr</label>
                    <input
                        type="checkbox"
                        name="fri"
                        id="fri"
                        value="Friday"
                        v-model="campDays"
                        class="checkbox-input"
                    />
                </div>
            </div>
            <!-- /end camp details -->
            <div class="form-control">
                <base-button>Add To Booking</base-button>
            </div>
        </form>
        <!-- /end camp form -->
        <div>
            <p>
                Please add each camp week and the specific days for each week
                you wish to book for your child(ren) individually.
            </p>
            <p>
                Please review your booking after all children and camp weeks
                have been added to your booking before you submit. A booking
                reference and payment details will be emailed to you on
                submission.
            </p>
        </div>
    </div>
</template>

<script>
// import ParentDetails from '../bookings/ParentDetails.vue';
// import CampDetails from '../bookings/CampDetails.vue';
export default {
    name: 'CampForm',
    // components: { ParentDetails, CampDetails },
    props: ['parentAdded', 'error', 'campsList', 'ppChecked'],
    emits: ['parent-submitted', 'booking-item-added'],
    methods: {
        onSubmitParent() {
            this.$emit(
                'parent-submitted',
                this.parentName,
                this.mainContact,
                this.email,
                this.acceptedTerms,
            );
        },
        onSubmitBookingItem() {
            this.$emit(
                'booking-item-added',
                this.childName,
                this.childSurname,
                this.childAge,
                this.pupilPrem,
                this.confirmedPhoto,
                this.campName,
                this.campDays,
                this.id,
            );
            (this.childName = ''),
                (this.childAge = ''),
                (this.campName = 'select'),
                (this.campDays = []),
                (this.ppIsChecked = false);
        },

        confirmPP() {
            this.ppIsChecked = false;
        },
    },

    watch: {
        pupilPrem() {
            return (this.ppIsChecked = this.pupilPrem ? true : false);
        },
    },

    data() {
        return {
            title: 'Pupil Premium Booking',
            parentName: '',
            mainContact: '',
            email: '',
            acceptedTerms: false,
            childName: '',
            childSurname: '',
            childAge: 'select',
            pupilPrem: false,
            confirmedPhoto: true,
            campName: 'select',
            campDays: [],
            ppIsChecked: false,
            id: Math.random(),
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
