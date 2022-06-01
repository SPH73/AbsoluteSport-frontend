<template>
    <div class="container">
        <h2 class="text-accent">Activity Camp Booking Details</h2>
        <div v-if="!parentAdded">
            <ul>
                <li>
                    <p><strong class="text-accent">Step 1</strong></p>
                    <p>
                        To start your booking process, please add and save
                        parent/guardian's details.
                    </p>
                </li>
            </ul>
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
                    v-for="(booking, index) in campBooking"
                    :key="booking.bookingRef"
                    @click="removeItem(booking.bookingRef)"
                >
                    <p class="text-accent">
                        <label>{{ index + 1 }}: {{ booking.campName }}</label
                        >&nbsp;<span class="click"
                            ><strong class="text-accent"
                                >[X&nbsp;Remove]</strong
                            ></span
                        >
                    </p>
                    <p>
                        <label>Child's Details: </label>
                        {{ booking.childName }}
                        {{ booking.childSurname }} aged
                        {{ booking.childAge }} at camp
                    </p>
                    <p>
                        Days booked:
                        <span v-for="day in booking.campDays" :key="day">
                            {{ day }}&nbsp;
                        </span>
                    </p>
                    <p><label>Cost: </label>£ {{ booking.price }}</p>
                </li>
            </ul>
            <p><label>Total Booking Cost: </label>£ {{ amountDue }}</p>

            <div class="btn-group">
                <base-button @click="confirmBooking"
                    >Confirm &amp; Submit</base-button
                >
                <base-button @click="cancelBooking">Cancel</base-button>
            </div>
        </div>
        <div v-else>
            <ul>
                <li>
                    <p><strong class="text-accent">Step 2</strong></p>
                    <p>Please add your child's details then...</p>
                </li>
                <li>
                    <p><strong class="text-accent">Step 3</strong></p>
                    <p>
                        ... select a camp week and confirm the camp days they
                        will be attending. Save by clicking
                        <span class="text-accent">"Add To Booking"</span>.
                    </p>
                </li>
                <li>
                    <p><strong class="text-accent">Step 4</strong></p>
                    <p>
                        Continue repeating
                        <span class="text-accent">Steps 2 & 3 </span> for this
                        child and any siblings for each camp week you wish to
                        book.
                    </p>
                </li>
            </ul>
            <ul>
                <li>
                    <p><strong class="text-accent">Step 5</strong></p>
                    <p>
                        Once you have added all required camps for each child
                        and confirmed the details are correct, click
                        <span class="text-accent">"Confirm & Submit" </span> to
                        send us your booking. That's it, you are done!
                    </p>
                </li>
            </ul>
            <ul>
                <li>
                    <p><strong class="text-accent">TIP</strong></p>
                    <p>
                        You can remove individual bookings by clicking
                        <span class="text-accent">"[X Remove]"</span> next to
                        each camp booking or click
                        <span class="text-accent">"cancel" </span>to start over.
                    </p>
                    <p>
                        Kindly take note: Camp places are reserved on receipt of
                        booking but will only be confirmed on receipt of
                        payment.
                    </p>
                </li>
            </ul>
        </div>
        <p>
            If you experience any difficulties with booking, please contact us
            for help.
        </p>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core';

export default {
    name: 'CampBookingDetails',

    props: [
        'parentAdded',
        'savedParent',
        'campBooking',
        'parentName',
        'mainContact',
        'email',
    ],
    emits: [
        'handleRemoveBookingItem',
        'handleConfirmBooking',
        'handleCancelBooking',
    ],
    setup(props, ctx) {
        const removeItem = item => {
            ctx.emit('handleRemoveBookingItem', item);
        };

        const confirmBooking = () => {
            ctx.emit('handleConfirmBooking');
        };
        const cancelBooking = () => {
            ctx.emit('handleCancelBooking');
        };

        const amountDue = computed(() => {
            return props.campBooking.reduce(
                (total, curr) => (total = total + curr.price),
                0,
            );
        });
        return { removeItem, confirmBooking, cancelBooking, amountDue };
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
