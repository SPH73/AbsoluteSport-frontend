<script setup>
import { ref } from "@vue/reactivity";
import { computed, watchEffect, watch } from "@vue/runtime-core";
import getClubs from "../../composables/getClubList";
import getSchoolList from "../../composables/getSchoolList";
const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.VUE_APP_AT_API_KEY }).base(
  process.env.VUE_APP_BASE_ID
);

const enteredChildFirstName = ref({ val: "", isValid: true });
const enteredSurname = ref({ val: "", isValid: true });
const enteredMedical = ref({ val: "", isValid: true });
const enteredYearGroup = ref({ val: "select", isValid: true });
const selectedSchool = ref({ val: "select", isValid: true });
const filteredClubs = ref([]);
const schoolClubs = ref([]);
const checkedClubs = ref({ val: [], isValid: true });
const enteredParentName = ref({ val: "", isValid: true });
const enteredEmail = ref({ val: "", isValid: true });
const enteredPhone = ref({ val: "", isValid: true });
const enteredAltParentName = ref("");
const enteredAltContact = ref("");
const acceptedTerms = ref({ val: false, isValid: true });
const bookingRef = ref("");
const paymentRef = ref("");
const clubBooking = ref({});
const formIsValid = ref(true);

const { clubList, clubError, loadClubs } = getClubs();
const { schoolList, schoolError, loadSchools } = getSchoolList();
loadClubs();
loadSchools();

console.log("ClubList", clubList.value);
console.log("SchoolList", schoolList.value);

watch(selectedSchool, () => {
  return (schoolClubs.value = clubList.value.filter(
    (club) => club.schoolRef === selectedSchool.value.val
  ));
});

const filteredSchoolClubs = computed(() => {
  let yearGroup = enteredYearGroup.value.val.toString();
  let school = selectedSchool.value.val;
  filteredClubs.value = clubList.value.filter((el) => {
    return el.yearRange.includes(yearGroup) && el.schoolRef === school;
  });
});

watchEffect(() => {
  console.log("selected year", enteredYearGroup.value.val.toString());
  console.log("Selected school", selectedSchool.value.val);
  console.log("Filtered school clubs", filteredSchoolClubs.value);
  console.log("Filtered clubs", filteredClubs.value);
});

const createBookingRef = () => {
  bookingRef.value = Date.now().toString(24);
};

const createPaymentRef = () => {
  paymentRef.value = Date.now().toString(36);
};

const validateForm = () => {
  if (enteredParentName.value.val === "") {
    enteredParentName.value.isValid = false;
    formIsValid.value = false;
  }
  if (enteredSurname.value.val === "") {
    enteredSurname.value.isValid = false;
    formIsValid.value = false;
  }
  if (enteredPhone.value.val === "") {
    enteredPhone.value.isValid = false;
    formIsValid.value = false;
  }
  if (enteredMedical.value.val === "") {
    enteredMedical.value.isValid = false;
    formIsValid.value = false;
  }
  if (enteredYearGroup.value.val === "select") {
    enteredYearGroup.value.isValid = false;
    formIsValid.value = false;
  }
  if (selectedSchool.value.val === "select") {
    selectedSchool.value.isValid = false;
    formIsValid.value = false;
  }
  if (checkedClubs.value.val.length === 0) {
    checkedClubs.value.isValid = false;
    formIsValid.value = false;
  }
  if (!acceptedTerms) {
    checkedClubs.value.isValid = false;
    formIsValid.value = false;
  }
};
const handleSubmitClubBooking = () => {
  validateForm();
  if (!formIsValid.value) {
    return;
  }
  createPaymentRef();

  for (let club in checkedClubs.value) {
    createBookingRef();
    clubBooking.value = {
      club: club,
      paymentRef: paymentRef.value,
      bookingRef: bookingRef.value,
      Surname: enteredSurname.value.val,
      childName: enteredChildFirstName.value.val,
      parentName: enteredParentName.value.val,
      contactNumber: enteredPhone.value.val,
      email: enteredEmail.value.val,
      altParentName: enteredAltParentName.value.val,
      altParentContact: enteredAltContact.value.val,
      medicalConds: enteredMedical.value.val,
      yearGroup: enteredYearGroup.value.val,
      school: selectedSchool.value.val,
    };
    console.log("club booked", clubBooking.value);
  }
};
</script>
<template>
  <section class="section club">
    <div class="container">
      <base-card>
        <div class="container">
          <div id="text">
            <h2 class="text-accent">School Clubs Booking Form</h2>
            <p>
              We currently run school clubs at Sidlesham Primary and West Witterings
              Primary schools in West Sussex.
            </p>
            <p>
              Morning School Clubs have a max capacity of 12 children and cost £3.00 per
              session. Clubs will need to be paid in a block booking for all weeks. There
              are 6 weeks for this booking.
            </p>
            <p>
              After School Clubs have a max capacity of 24 and cost £4.00 per session.
              Clubs will need to be paid in a block booking for all weeks. There are 6
              weeks per booking.
            </p>
            <p>
              Please complete the booking form to reserve a place for your child. On
              receipt of payment a booking confirmation email will be sent to confirm your
              child&#39;s place for the club. Please use the booking reference provided
              when you submit the form.
            </p>
            <p>
              Please refer to our FAQ&#39;s for more info or contact us if you have
              additional questions.
            </p>
          </div>
          <div class="container">
            <form @submit.prevent="handleSubmitClubBooking">
              <div class="grid-inputs">
                <div class="form-control">
                  <label class="pName">Parent Name</label>
                </div>
                <div class="form-control">
                  <input
                    name="pName"
                    id="pName"
                    type="text"
                    v-model.trim.lazy="enteredParentName.val"
                    autocomplete="on"
                  />
                </div>
                <div class="form-control">
                  <label for="mainContact">Mobile Number</label>
                </div>
                <div class="form-control">
                  <input
                    name="mainContact"
                    id="mainContact"
                    type="tel"
                    v-model.trim.lazy="enteredPhone.val"
                    autocomplete="tel"
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
                    v-model.trim.lazy="enteredEmail.val"
                    autocomplete="email"
                  />
                </div>
                <div class="form-control">
                  <label for="altPName">Alternate Parent Name</label>
                </div>
                <div class="form-control">
                  <input
                    name="altPName"
                    id="altPName"
                    type="text"
                    v-model.trim.lazy="enteredAltParentName"
                  />
                </div>
                <div class="form-control">
                  <label for="altContact">Alternate Contact Number</label>
                </div>
                <div class="form-control">
                  <input
                    name="altContact"
                    id="altContact"
                    type="tel"
                    v-model.trim.lazy="enteredAltContact"
                  />
                </div>
                <div class="form-control">
                  <label for="childFName">Child&#39;s First Name</label>
                </div>
                <div class="form-control">
                  <input
                    name="childFName"
                    id="childFName"
                    type="text"
                    v-model.trim.lazy="enteredChildFirstName.val"
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
                    v-model.trim.lazy="enteredSurname.val"
                    autocomplete="family-name"
                  />
                </div>
                <div class="form-control">
                  <label for="medical">Medical Conditions</label>
                </div>
                <div class="form-control">
                  <textarea
                    rows="4"
                    v-model="enteredMedical.val"
                    name="medical"
                    id="medical"
                    placeholder="Please tell us about any medical conditions we need to be aware of. (N/A if none)"
                  ></textarea>
                </div>
                <div class="form-control">
                  <label for="yearG">Year Group</label>
                </div>
                <div class="form-control">
                  <select name="yearG" id="yearG" v-model="enteredYearGroup.val">
                    <option disabled value="select">Select year...</option>
                    <option v-for="(n, i) in 6" :key="i" :value="n">
                      {{ n }}
                    </option>
                  </select>
                </div>
                <div v-if="schoolError" class="error form-control">
                  <p>{{ schoolError }} for schools. Please contact us to book.</p>
                </div>
                <div class="form-control">
                  <label for="school">School</label>
                </div>
                <div v-if="schoolList.length" class="form-control">
                  <select name="school" id="school" v-model="selectedSchool.val">
                    <option disabled value="select">Select School...</option>
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
                <p>{{ clubError }} for clubs. Please contact us to book.</p>
              </div>
              <div v-if="filteredClubs.length">
                <div
                  class="inline-checkbox-control"
                  v-for="club in filteredClubs"
                  :key="club.id"
                >
                  <div>
                    <!-- <label>
                      Year's:
                      <span v-for="year in club.yearRange" :key="year">{{ year }}, </span>
                    </label> -->
                  </div>
                  <label class="checkbox-label-control">{{ club.clubName }}</label>
                  <input
                    type="checkbox"
                    :value="club.clubRef"
                    v-model="checkedClubs.val"
                    class="checkbox-input"
                  />
                </div>
              </div>
              <div v-else>
                <p>Select a school to load clubs...</p>
              </div>

              <div class="inline-checkbox-control">
                <label class="checkbox-label-control" for="terms-agreed"
                  >Accept T's &amp; C's</label
                >
                <input
                  type="checkbox"
                  name="terms-agreed"
                  id="terms-agreed"
                  required
                  value="true"
                  v-model="acceptedTerms.val"
                  class="checkbox-input"
                />
              </div>
              <div class="form-control">
                <base-button type="submit" class="primary">Submit Booking</base-button>
              </div>
            </form>
          </div>
        </div>
      </base-card>
    </div>
  </section>
</template>

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
