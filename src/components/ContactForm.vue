<template>
    <section class="home section contact">
        <div class="container">
            <base-card>
                <div class="container">
                    <h2 class="text-accent">Let's Chat!</h2>
                    <p class="text-light">
                        Please feel free to contact us if you have any questions
                        and we will respond within one business day. We would
                        love to hear from you!
                    </p>
                </div>
                <div class="container">
                    <form @submit.prevent="handleSubmit">
                        <div class="grid-inputs">
                            <div class="form-control">
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    v-model="enteredName"
                                    autocomplete="name"
                                    required
                                />
                            </div>
                            <div class="form-control">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    v-model="enteredEmail"
                                    autocomplete="email"
                                    required
                                />
                            </div>
                            <div class="form-control-textarea">
                                <textarea
                                    placeholder="How can we help?"
                                    v-model="enteredMessage"
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div class="form-control">
                            <base-button class="primary">Submit</base-button>
                        </div>
                    </form>
                </div>
            </base-card>
        </div>
    </section>
</template>

<script>
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.VUE_APP_AT_API_KEY }).base(
    process.env.VUE_APP_BASE_ID,
);
import { ref } from '@vue/reactivity';
export default {
    name: 'ContactForm',
    setup() {
        const enteredName = ref('');
        const enteredEmail = ref('');
        const enteredMessage = ref('');
        const table = base('enquiries');
        const handleSubmit = () => {
            const createEnquiryRecord = async fields => {
                const createdRecord = await table.create(fields);
                console.log(createdRecord.id);
            };
            createEnquiryRecord({
                firstName: enteredName.value,
                enquiryType: 'contact',
                email: enteredEmail.value,
                info: enteredMessage.value,
            });
        };
        return {
            enteredName,
            enteredEmail,
            enteredMessage,
            handleSubmit,
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
        grid-column: span 2 / auto;
    }
}
/* textarea {
    grid-column: span 2 / auto;
} */
.form-control-textarea {
    grid-column: span 2 / auto;
}
</style>
