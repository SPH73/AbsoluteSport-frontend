<template>
  <base-dialog @close="confirmPP" :open="ppIsChecked" :title="title">
    <template #content>
      <p class="text-dark">
        We are obliged to confrm your child&#39;s entitlement to a pupil premium place
        with the council. If there are any issues we will contact you directly.
      </p>
    </template>
    <template #actions>
      <base-button @click="confirmPP">Got It!</base-button>
    </template>
  </base-dialog>
  <div class="container">
    <h2 class="text-accent">Activity Camp Booking Form</h2>
    <p>
      Our Holiday Activity Camps run at Sidlesham Primary School. Places often fill up
      quickly so please reserve a place for your child as soon as possible.
    </p>
    <p>
      Kindly use your unique booking reference when making payment so that we can allocate
      your payment and confirm your child's place.
    </p>
    <p>
      As a service provider to the West Sussex Council we have a certain amount of places
      available for pupil premium. Please tick the box below if your child recieves a
      pupil premium benefit.
    </p>
    <p v-if="!parentAdded" class="click">
      <strong class="text-accent" @click="onShowSteps"
        >Show me the steps to complete this form</strong
      >
    </p>
  </div>
  <!-- parent details form -->
  <div class="container">
    <h3 class="text-light">1: Parent/Guradian Details</h3>
    <div v-if="!parentAdded">
      <form @submit.prevent="onSubmitParent">
        <div class="grid-inputs">
          <div class="form-control" :class="{ invalid: !parentName.isValid }">
            <label for="parentName">Name</label>
          </div>
          <div class="form-control">
            <input
              type="text"
              name="parentName"
              id="parentName"
              autocomplete="on"
              v-model.trim.lazy="parentName.val"
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
              autocomplete="tel"
              v-model.trim.lazy="mainContact.val"
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
              autocomplete="email"
              v-model.trim.lazy="email.val"
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
            value="true"
            v-model="acceptedTerms.val"
            class="checkbox-input"
          />
        </div>
        <p v-if="!parentformIsValid" class="errors">
          Please correct the above errors and submit again.
        </p>
        <div class="form-control">
          <base-button v-if="acceptedTerms">Save Details</base-button>
        </div>
      </form>
      <!-- /end parent form -->
    </div>
    <div v-else>
      <p class="text-accent">Details saved successfully.</p>
    </div>
    <!-- camp booking form -->
    <!-- child details -->
    <div v-if="parentAdded">
      <h3>2: Child Details</h3>
      <form @submit.prevent="onAddBookingItem">
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
              v-model.trim.lazy="childName.val"
            />
          </div>
          <div class="form-control">
            <label for="surname">Surname</label>
          </div>
          <div class="form-control">
            <input
              type="text"
              name="childSurname"
              id="childSurname"
              required
              v-model.trim.lazy="childSurname.val"
              autocomplete="family-name"
            />
          </div>
          <div class="form-control">
            <label for="childAge">Age At Camp</label>
          </div>
          <div class="form-control">
            <select
              name="childAge"
              id="childAge"
              v-model.number="childAge.val"
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
          <label for="pupilPremium" class="checkbox-label-control">Pupil Premium?</label>
          <input
            type="checkbox"
            name="pupilPremium"
            id="pupilPremium"
            v-model="pupilPrem"
            class="checkbox-input"
          />
        </div>
        <div class="inline-checkbox-control">
          <label for="photo" class="checkbox-label-control">Photo Permission?</label>
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
        <h3>3: Camp Details</h3>
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
                v-model="campName.val"
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
              v-model="campDays.val"
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
              v-model="campDays.val"
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
              v-model="campDays.val"
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
              v-model="campDays.val"
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
              v-model="campDays.val"
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
          Please add each camp week and the specific days for each week you wish to book
          for your child(ren) individually.
        </p>
        <p>
          Please review your booking after all children and camp weeks have been added to
          your booking before you submit. A booking reference and payment details will be
          emailed to you on submission.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

// import ParentDetails from '../bookings/ParentDetails.vue';
// import CampDetails from '../bookings/CampDetails.vue';

const props = defineProps(["parentAdded", "error", "campsList"]);
const emit = defineEmits(["parent-submitted", "camp-booking-added", "show-steps"]);

const title = "Pupil Premium Booking";
const parentName = ref({ val: "", isValid: true });
const mainContact = ref({ val: "", isValid: true });
const email = ref({ val: "", isValid: true });
const acceptedTerms = ref({ val: false, isValid: true });
const childName = ref({ val: "", isValid: true });
const childSurname = ref({ val: "", isValid: true });
const childAge = ref({ val: "select", isValid: true });
const pupilPrem = ref(false);
const ppIsChecked = ref(false);
const confirmedPhoto = ref(true);
const campName = ref({ val: "select", isValid: true });
const campDays = ref({ val: [], isValid: true });
const parentformIsValid = ref(true);
const campformIsValid = ref(true);

watch(pupilPrem, () => {
  ppIsChecked.value = pupilPrem.value ? true : false;
});

const validateParentForm = () => {
  parentformIsValid.value = true;
  if (parentName.value.val === "") {
    parentName.value.isValid = false;
    parentformIsValid.value = false;
  }
  if (mainContact.value.val === "") {
    mainContact.value.isValid = false;
    parentformIsValid.value = false;
  }
  if (mainContact.value.val === "") {
    mainContact.value.isValid = false;
    parentformIsValid.value = false;
  }
  if (acceptedTerms.value.val === false) {
    acceptedTerms.value.isValid = false;
    parentformIsValid.value = false;
  }
};

const onSubmitParent = () => {
  validateParentForm();
  if (!parentformIsValid) {
    return;
  }
  emit(
    "parent-submitted",
    parentName.value.val,
    mainContact.value.val,
    email.value.val,
    acceptedTerms.value.val
  );
};

const validateCampForm = () => {
  campformIsValid.value = true;
  if (childName.value.val === "") {
    childName.value.isValid = false;
    campformIsValid.value = false;
  }
  if (childSurname.value.val === "") {
    childSurname.value.isValid = false;
    campformIsValid.value = false;
  }
  if (childAge.value.val === "select") {
    childAge.value.isValid = false;
    campformIsValid.value = false;
  }
  if (campName.value.val === "select") {
    campName.value.isValid = false;
    campformIsValid.value = false;
  }
  if (campDays.value.val.length === 0) {
    campDays.value.isValid = false;
    campformIsValid.value = false;
  }
};

const onAddBookingItem = () => {
  validateCampForm();
  if (!campformIsValid) {
    return;
  }
  emit(
    "camp-booking-added",
    childName.value.val,
    childSurname.value.val,
    childAge.value.val,
    pupilPrem.value.val,
    confirmedPhoto.value.val,
    campName.value.val,
    campDays.value.val
  );

  campName.value.val = "select";
  campDays.value.val = [];
};

const onShowSteps = () => {
  emit("show-steps");
};
const confirmPP = () => {
  ppIsChecked.value = false;
};
</script>

<style scoped>
p {
  color: var(--color-light);
}

.text-dark {
  color: var(--color-dark);
}

.invalid label {
  color: #ff0000;
}

.invalid input,
.invalid textarea,
.invalid select {
  border: 1px solid #ff0000;
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
