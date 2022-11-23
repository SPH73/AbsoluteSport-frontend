<template>
  <section class="section party">
    <div class="container">
      <base-card>
        <div class="container">
          <h1 class="text-accent">Party Booking Enquiry</h1>
          <p class="text-light">
            We cover West Sussex and Hampshire, however we may also be able to
            accomodate
            parties beyond with an additional travel charge.
          </p>
          <p class="text-light">
            We recommend at least 2 weeks advance booking to secure your
            preferred date
            and time. If you have an urgent request please get in touch and
            we&#39;ll do
            our best to grant your wish. You can also read our FAQ&#39;s for
            more info.
          </p>
        </div>
        <div class="container">
          <form @submit.prevent="handleSubmit">
            <h3 class="text-light">Parent/Guardian Details</h3>
            <div class="grid-inputs">
              <div class="form-control" :class="{
                invalid: !enteredParentFirstName.isValid,
              }">
                <label for="firstName">First Name*</label>
              </div>
              <div class="form-control" :class="{
                invalid: !enteredParentFirstName.isValid,
              }">
                <input name="firstName" id="firstName" type="text"
                       v-model.trim.lazy="enteredParentFirstName.val"
                       autocomplete="given-name" />
              </div>
              <div class="form-control" :class="{
                invalid: !enteredSurname.isValid,
              }">
                <label for="surname">Surname*</label>
              </div>
              <div class="form-control" :class="{
                invalid: !enteredSurname.isValid,
              }">
                <input name="surname" id="surname" type="text"
                       v-model.trim.lazy="enteredSurname.val"
                       autocomplete="family-name" />
              </div>
              <div class="form-control" :class="{
                invalid: !enteredEmail.isValid,
              }">
                <label for="email">Email Address*</label>
              </div>
              <div class="form-control" :class="{
                invalid: !enteredEmail.isValid,
              }">
                <input name="email" id="email" type="email"
                       v-model.trim.lazy="enteredEmail.val"
                       autocomplete="email" />
              </div>
              <div class="form-control" :class="{
                invalid: !enteredPhone.isValid,
              }">
                <label for="mainContact">Main Phone No.*</label>
              </div>
              <div class="form-control" :class="{
                invalid: !enteredPhone.isValid,
              }">
                <input name="mainContact" id="mainContact" type="tel"
                       v-model.trim.lazy="enteredPhone.val"
                       autocomplete="tel" />
              </div>
            </div>
            <h3 class="text-light">Child Details</h3>
            <div class="grid-inputs">
              <div class="form-control">
                <label for="childName">Name (Or School Name)</label>
              </div>
              <div class="form-control">
                <input name="childName" id="childName" type="text"
                       v-model.trim.lazy="enteredChildName"
                       autocomplete="off" />
              </div>
              <div class="form-control" :class="{
                invalid: !enteredChildAge.isValid,
              }">
                <label for="childAge">Age*</label>
              </div>
              <div class="form-control" :class="{
                invalid: !enteredChildAge.isValid,
              }">
                <input name="childAge" id="childAge" type="number"
                       v-model.number="enteredChildAge.val" min="5" max="14" />
              </div>
              <div class="form-control">
                <label for="childBDay">Actual Birthday</label>
              </div>
              <div class="form-control">
                <input name="childBDay" id="childBDay" type="date"
                       v-model="enteredChildBDay" />
              </div>
              <div class="form-control">
                <label for="info">Additional Info</label>
              </div>
              <div class="form-control">
                <textarea rows="5" v-model.trim="enteredInfo" name="info"
                          id="info"
                          placeholder="Is there anything else you would like us to know?"></textarea>
              </div>
            </div>
            <h3 class="text-light">Event Details</h3>
            <div v-if="error" class="error">
              <p>{{ error }}</p>
            </div>
            <div v-if="partyList.length">
              <div class="grid-inputs">
                <div class="form-control" :class="{
                  invalid: !selectedParty.isValid,
                }">
                  <label for="partyName">Select Your Party*</label>
                </div>
                <div class="form-control" :class="{
                  invalid: !selectedParty.isValid,
                }">
                  <select name="partyName" id="partyName"
                          v-model="selectedParty.val">
                    <option disabled value="select">Choose...</option>
                    <option v-for="option in partyList" :key="option.id"
                            :value="option.partyName">
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
              <div class="form-control" :class="{
                invalid: !chosenDate1.isValid,
              }">
                <label for="partyDate1">Party Date 1st Choice*</label>
              </div>
              <div class="form-control" :class="{
                invalid: !chosenDate1.isValid,
              }">
                <input name="partyDate1" id="partyDate1" type="date"
                       v-model="chosenDate1.val" />
              </div>
              <div class="form-control" :class="{
                invalid: !chosenDate2.isValid,
              }">
                <label for="partyDate2">Party Date 2nd Choice*</label>
              </div>
              <div class="form-control" :class="{
                invalid: !chosenDate2.isValid,
              }">
                <input name="partyDate2" id="partyDate2" type="date"
                       v-model="chosenDate2.val" />
              </div>
              <div class="form-control" :class="{
                invalid: !chosenTime.isValid,
              }">
                <label for="partyStart">Party Start Time*</label>
              </div>
              <div class="form-control" :class="{
                invalid: !chosenTime.isValid,
              }">
                <input type="time" v-model="chosenTime.val" />
              </div>
              <div class="form-control" :class="{
                invalid: !chosenPartyLength.isValid,
              }">
                <label for="partyLength">Party Length (hr)*</label>
              </div>
              <div class="form-control" :class="{
                invalid: !chosenPartyLength.isValid,
              }">
                <input type="number" step="0.5" min="1" max="3"
                       name="partyLength" id="partyLength"
                       v-model="chosenPartyLength.val" />
              </div>
              <div class="form-control" :class="{
                invalid: !numChild.isValid,
              }">
                <label for="numChild">Number of Children Attending*</label>
              </div>
              <div class="form-control" :class="{
                invalid: !numChild.isValid,
              }">
                <input type="number" min="1" step="1"
                       v-model.number="numChild.val" name="numChild"
                       id="numChild" />
              </div>
              <div class="form-control" :class="{
                invalid: !enteredPostCode.isValid,
              }">
                <label for="postCode">Post Code (venue or house)*</label>
              </div>
              <div class="form-control" :class="{
                invalid: !enteredPostCode.isValid,
              }">
                <input type="text" v-model="enteredPostCode.val" name="postCode"
                       id="postCode" autocomplete="postal-code" />
              </div>
            </div>

            <!-- <div class="form-control">
              <vue-friendly-captcha :sitekey="sitekey" />
            </div> -->

            <div class="form-control">
              <base-button class="primary">Please Send Me A Quote!</base-button>
            </div>

            <p class="error" v-if="!formIsValid">
              One or more fields are invalid. Please correct the errors and
              submit again.
            </p>
          </form>
        </div>
      </base-card>
    </div>
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import getParties from "../../composables/getParties";


const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.VUE_APP_AT_API_KEY }).base(
  process.env.VUE_APP_BASE_ID
);


const partyData = ref({});
const enteredParentFirstName = ref({ val: "", isValid: true });
const enteredSurname = ref({ val: "", isValid: true });
const enteredEmail = ref({ val: "", isValid: true });
const enteredPhone = ref({ val: "", isValid: true });
const enteredPostCode = ref({ val: "", isValid: true });
const enteredInfo = ref("");
const selectedParty = ref({ val: "select", isValid: true });
const chosenDate1 = ref({ val: null, isValid: true });
const chosenDate2 = ref({ val: null, isValid: true });
const chosenTime = ref({ val: null, isValid: true });
const chosenPartyLength = ref({ val: null, isValid: true });
const enteredChildName = ref("");
const enteredChildAge = ref({ val: null, isValid: true });
const enteredChildBDay = ref(null);
const numChild = ref({ val: null, isValid: true });
const quoteRef = ref("");
const formIsValid = ref(true);


const { partyList, error, load } = getParties();

load();

const validateForm = () => {
  formIsValid.value = true;
  if (enteredParentFirstName.value.val === "") {
    enteredParentFirstName.value.isValid = false;
    formIsValid.value = false;
  }
  if (enteredSurname.value.val === "") {
    enteredSurname.value.isValid = false;
    formIsValid.value = false;
  }
  if (enteredEmail.value.val === "" || !enteredEmail.value.val.includes("@")) {
    enteredEmail.value.isValid = false;
    formIsValid.value = false;
  }
  if (enteredPhone.value.val === "") {
    enteredPhone.value.isValid = false;
    formIsValid.value = false;
  }
  if (enteredPostCode.value.val === "") {
    enteredPostCode.value.isValid = false;
    formIsValid.value = false;
  }
  if (selectedParty.value.val === "select") {
    selectedParty.value.isValid = false;
    formIsValid.value = false;
  }
  if (chosenDate1.value.val === null) {
    chosenDate1.value.isValid = false;
    formIsValid.value = false;
  }
  if (chosenDate2.value.val === null) {
    chosenDate2.value.isValid = false;
    formIsValid.value = false;
  }
  if (chosenTime.value.val === null) {
    chosenTime.value.isValid = false;
    formIsValid.value = false;
  }
  if (chosenPartyLength.value.val === null) {
    chosenPartyLength.value.isValid = false;
    formIsValid.value = false;
  }
  if (enteredChildAge.value.val === null) {
    enteredChildAge.value.isValid = false;
    formIsValid.value = false;
  }
  if (numChild.value.val === null) {
    numChild.value.isValid = false;
    formIsValid.value = false;
  }
};
const handleSubmit = () => {
  validateForm();
  if (!formIsValid.value) {
    return;
  }
  partyData.value = {
    firstName: enteredParentFirstName.value.val,
    surname: enteredSurname.value.val,
    email: enteredEmail.value.val,
    info: enteredInfo.value,
    phone: enteredPhone.value.val,
    postCode: enteredPostCode.value.val,
    party: selectedParty.value.val,
    childName: enteredChildName.value,
    childAge: enteredChildAge.value.val,
    childsBirthday: enteredChildBDay.value,
    partyDate1: chosenDate1.value.val,
    partyDate2: chosenDate2.value.val,
    partyStart: chosenTime.value.val,
    partyLength: chosenPartyLength.value.val,
    numChildren: numChild.value.val,
    status: "new",
    enquiryType: "party",
  };
  const table = base("enquiries");
  const createEnquiryRecord = async (fields) => {
    try {
      const createdEnquiry = await table.create(fields);
      if (!createdEnquiry) {
        throw Error(
          "Sorry we were unable to send your enquiry, please try later or contact us if the problem persists."
        );
      }
      quoteRef.value = createdEnquiry.id;
      console.log("Party quote ref: ______", quoteRef.value);
    } catch (error) {
      console.log(error);
    }
  };

  createEnquiryRecord(partyData.value);
};
</script>

<style scoped>
.error {
  color: var(--color-light);
  font-size: small;
}

.invalid label {
  color: var(--color-primary);
}

.invalid input,
.invalid textarea,
.invalid select {
  border: 1px solid var(--color-primary);
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

.frc-captcha * {
  margin: 0;
  padding: 0;
  border: 0;
  text-align: initial;
  border-radius: 0.4rem;
  filter: none !important;
  transition: none !important;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2;
  text-decoration: none;
  background-color: initial;
  color: var(--color-secondary);
}
</style>
