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
                            <div
                                class="form-control"
                                :class="{
                                    invalid: !enteredName.isValid,
                                }"
                            >
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    v-model="enteredName.val"
                                    autocomplete="name"
                                    required
                                />
                            </div>
                            <div
                                class="form-control"
                                :class="{
                                    invalid: !enteredEmail.isValid,
                                }"
                            >
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    v-model="enteredEmail.val"
                                    autocomplete="email"
                                    required
                                />
                            </div>
                            <div
                                class="form-control-textarea"
                                :class="{
                                    invalid: !enteredMessage.isValid,
                                }"
                            >
                                <textarea
                                    placeholder="How can we help?"
                                    v-model="enteredMessage.val"
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div class="form-control">
                            <input type="hidden" v-model="solution" />
                            <vue-friendly-captcha
                                :sitekey="sitekey"
                                @done="handleRecaptchaSolved(solution)"
                            />
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

const sitekey = process.env.VUE_APP_FRIENDLY_RECAPTCHA_SITEKEY;
const apikey = process.env.VUE_APP_FRIENDLY_RECAPTCHA_APIKEY;
import VueFriendlyCaptcha from '@somushq/vue3-friendly-captcha';

import { ref } from '@vue/reactivity';
export default {
    name: 'ContactForm',
    components: { VueFriendlyCaptcha },
    setup() {
        const enteredName = ref({ val: '', isValid: true });
        const enteredEmail = ref({ val: '', isValid: true });
        const enteredMessage = ref({ val: '', isValid: true });
        const enquiryId = ref(null);
        const table = base('enquiries');
        const formIsValid = ref(true);
        const solution = ref('');

        const verifyRecaptcha = async () => {
            const data = {
                solution: document.getElementsByClassName(
                    '.frc-captcha-solution',
                ).value,
                secret: apikey,
                sitekey: sitekey,
            };

            try {
                const response = await fetch(
                    'https://api.friendlycaptcha.com/api/v1/siteverify',
                    {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                    },
                );
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();
            } catch (error) {
                console.error('Error: ', error);
                formIsValid.value = false;
            }
        };
        const handleSubmit = () => {
            validateForm();
            if (!formIsValid.value) {
                return;
            }
            verifyRecaptcha();
            if (!formIsValid.value) {
                alert('recaptcha failed');
                return;
            }
            const createEnquiryRecord = async fields => {
                const createdRecord = await table.create(fields);
                enquiryId.value = createdRecord.id;
                console.log('enquiryId:----', enquiryId.value);
            };
            createEnquiryRecord({
                firstName: enteredName.value.val,
                enquiryType: 'contact',
                email: enteredEmail.value.val,
                info: enteredMessage.value.val,
                status: 'new',
            });

            enteredName.value = '';
            enteredEmail.value = '';
            enteredMessage.value = '';
        };
        return {
            enteredName,
            enteredEmail,
            enteredMessage,
            enquiryId,
            formIsValid,
            verifyRecaptcha,
            sitekey,
            apikey,
            handleSubmit,
            solution,
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

.form-control-textarea {
    grid-column: span 2 / auto;
}
</style>
