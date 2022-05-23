<template>
    <div class="container">
        <h2 class="text-accent">Activity Camp Booking Details</h2>
        <div v-if="parentAdded !== 5">
            <p>
                To start your booking process, please add and save
                parent/guardian details.
            </p>
        </div>
        <div v-else>
            <h3>Parent/Guardian</h3>
            <p><label>Name: </label>{{ parentName }}</p>
            <p><label>Contact Number: </label>{{ mainContact }}</p>
            <p><label>Email: </label>{{ email }}</p>
        </div>
        <div v-if="campBooking.length">
            <h3>Camps Booked</h3>
            <ul>
                <li
                    v-for="(child, index) in campBooking"
                    :key="index"
                    @click="removeItem"
                >
                    <!-- <camp-booking-item
                    :index="index"
                    :camp="child.campName"
                    :name="child.childName"
                    :surname="child.childSurname"
                    :age="child.childAge"
                    :days="child.campDays"
                    :price="child.price"
                >
                </camp-booking-item> -->
                    <p class="text-accent">
                        <label>{{ index + 1 }}: {{ child.campName }}</label>
                    </p>
                    <p>
                        <label>Child's Details: </label>
                        {{ child.childName }}
                        {{ child.childSurname }} aged {{ child.childAge }} at
                        camp
                    </p>
                    <p>
                        Days booked:
                        <span v-for="day in child.campDays" :key="day">
                            {{ day }}&nbsp;
                        </span>
                    </p>
                    <p><label>Cost: </label>£ {{ child.price }}</p>
                </li>
            </ul>
            <p><label>Total Booking Cost: </label>£ {{ totalCampsCost }}</p>
            <base-button>Submit</base-button>
        </div>
        <div v-else>
            <p>
                Please add your child's details then select a camp week and
                confirm the camp days they will be attending. Kindly repeat to
                add additional camp weeks per child per booking.
            </p>
        </div>
        <p>
            If you experience any difficulties with booking, please contact us
            for help.
        </p>
    </div>
</template>

<script>
// import CampBookingItem from './CampBookingItem.vue';
export default {
    name: 'CampBookingDetails',
    // components: { CampBookingItem },
    props: [
        'parentAdded',
        'savedParent',
        'campBooking',
        'parentName',
        'mainContact',
        'email',
    ],
    // setup(props) {
    //     const removeItem = item => {
    //         return (props.campBooking = props.campBooking.filter(
    //             child => child === item,
    //         ));
    //     };
    //     return { removeItem };
    // },
    methods: {
        removeItem(item) {
            return (props.campBooking = props.campBooking.filter(
                child => child === item,
            ));
        },
    },
    computed: {
        totalCampsCost() {
            return this.campBooking.reduce(
                (total, curr) => (total = total + curr.price),
                0,
            );
        },
    },
};
</script>

<style scoped>
p {
    color: var(--color-light);
}
</style>
