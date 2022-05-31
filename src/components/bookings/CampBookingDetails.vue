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
                    :key="child.bookingRef"
                    @click="removeItem(child.bookingRef)"
                >
                    <p class="text-accent">
                        <label
                            >{{ index + 1 }}: Booking Reference:
                            {{ child.bookingRef }} {{ child.campName }}</label
                        >&nbsp;<span class="click"
                            ><strong class="text-accent"
                                >[X&nbsp;Remove]</strong
                            ></span
                        >
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
            <div class="btn-group">
                <base-button>Confirm &amp; Submit</base-button>
                <base-button>Cancel</base-button>
            </div>
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
    emits: ['removeBookingItem'],
    setup(props, ctx) {
        console.log('emit context', ctx);

        console.log('props.campBooking:____', props.campBooking);

        const removeItem = item => {
            ctx.emit('removeBookingItem', item);
        };
        return { removeItem };
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
.btn-group {
    display: flex;
    justify-content: space-between;
}
</style>
