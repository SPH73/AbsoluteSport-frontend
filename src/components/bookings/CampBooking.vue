<template>
  <main>
    <section class="section camp-booking">
      <div class="container">
        <base-card>
          <div class="button-container">
            <div class="btn-group">
              <base-button v-show="selectedTab === 'CampForm'"
                           @click="selectedTab = 'CampBookingDetails'">View
                Booking Details <span>&nbsp;⟼</span>
              </base-button>
              <base-button v-show="selectedTab === 'CampBookingDetails'"
                           @click="selectedTab = 'CampForm'">
                <span>⟻&nbsp;</span> Back To Booking Form
              </base-button>
            </div>
          </div>
          <keep-alive>
            <camp-form v-if="selectedTab === 'CampForm'"
                       @parent-submitted="handleSaveParent"
                       @camp-booking-added="handleAddCampBookingItem"
                       @show-steps="selectedTab = 'CampBookingDetails'"
                       :error="error" :camps-list="campsList"
                       :parent-added="parentAdded"></camp-form>
          </keep-alive>
          <keep-alive>
            <camp-booking-details v-if="selectedTab === 'CampBookingDetails'"
                                  :parent-added="parentAdded"
                                  :saved-parent="savedParent"
                                  :camp-booking="campBooking"
                                  :parent-name="enteredParentName"
                                  :main-contact="enteredMainContact"
                                  :email="enteredEmail"
                                  @handleRemoveBookingItem="removeItem"
                                  @handleCancelBooking="cancelBooking"
                                  @handleConfirmBooking="confirmBooking">
            </camp-booking-details>
          </keep-alive>
        </base-card>
      </div>
    </section>
  </main>
</template>

<script setup>
import CampBookingDetails from "./CampBookingDetails.vue";
import CampForm from "./CampForm.vue";
import { ref } from "@vue/reactivity";
import BaseButton from "../UI/BaseButton.vue";
import getCamps from "../../composables/getCamps";
import { computed, watch } from "@vue/runtime-core";
import BaseCard from "../UI/BaseCard.vue";

const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.VUE_APP_AT_API_KEY }).base(
  process.env.VUE_APP_BASE_ID
);
const selectedTab = ref("CampForm");
const setSelectedTab = (tab) => {
  selectedTab.value = tab;
};
const campBooking = ref([]);

const campPayment = ref(null);
const bookingRef = ref(null);
const paymentRef = ref(null);
const childList = ref([]);

const enteredChildName = ref("");
const enteredChildSurname = ref("");
const enteredChildAge = ref("select");
const pupilPrem = ref(false);
const confirmedPhoto = ref(true);
const selectedCampName = ref("select");
const checkedCampDays = ref(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
const numCampDays = ref(null);
const enteredParentName = ref("");
const enteredMainContact = ref("");
const enteredEmail = ref("");
const acceptedTerms = ref(false);
const savedParent = ref({});
const campBookingItem = ref({});
const price = ref(null);

const createBookingRef = () => {
  bookingRef.value = Date.now().toString(24);
};

const createPaymentRef = () => {
  paymentRef.value = Date.now().toString(36);
};
const childrenNames = computed(() => {
  return JSON.stringify(childList.value);
});
const handleSaveParent = (name, contact, email, terms) => {
  createPaymentRef();
  enteredParentName.value = name;
  enteredMainContact.value = contact;
  enteredEmail.value = email;
  acceptedTerms.value = terms;

  savedParent.value = {
    parentName: enteredParentName.value,
    mainPhone: enteredMainContact.value,
    email: enteredEmail.value,
    paymentRef: paymentRef.value,
    numChildren: numChildren,
    childrenNames: childrenNames,
    amountDue: totalCost,
    status: "awaiting payment",
  };
};

const parentAdded = ref(null);

watch(savedParent, () => {
  parentAdded.value = Object.keys(savedParent.value).length;
});

const handleAddCampBookingItem = (name, surname, age, pp, photo, camp, days) => {
  createBookingRef();

  if (!childList.value.includes(name)) {
    childList.value.push(name);
  }
  const calculatedDays = computed(() => {
    return (numCampDays.value = days.length);
  });

  const calculatedPrice = computed(() => {
    return (price.value = pupilPrem.value ? 0 : numCampDays.value * 25);
  });

  pupilPrem.value = pp;
  enteredChildName.value = name;
  enteredChildSurname.value = surname;
  enteredChildAge.value = age;
  confirmedPhoto.value = photo;
  selectedCampName.value = camp;
  checkedCampDays.value = days;

  campBookingItem.value = {
    childName: enteredChildName.value,
    childSurname: enteredChildSurname.value,
    parentName: enteredParentName.value,
    childAge: enteredChildAge.value,
    photos: confirmedPhoto.value,
    campName: selectedCampName.value,
    campDays: checkedCampDays.value,
    numCampDays: calculatedDays.value,
    bookingRef: bookingRef.value,
    pupilPrem: pupilPrem.value,
    price: calculatedPrice.value,
    paymentRef: paymentRef.value,
    status: "reserved",
  };

  campBooking.value.push(campBookingItem.value);
};

const totalCost = computed(() => {
  return campBooking.value.reduce((total, curr) => (total = total + curr.price), 0);
});

const { campsList, error, loadCamps } = getCamps();

loadCamps();

// ****No longer need computed value for form but possibly needed if getting all camps to list in view and then change in composable and send to form as current camps not camps-list.
// const currentCamps = computed(() => {
//     return campsList.value.filter(camp => camp.status === 'current');
// });
const removeItem = (item) => {
  campBooking.value = campBooking.value.filter((booking) => booking.bookingRef !== item);
};

const numChildren = computed(() => {
  return childList.value.length;
});

const confirmBooking = () => {
  const bookings = base("camp-bookings");
  const payments = base("camp-payments");
  let bookingsCreated = false;

  const createBookings = async (fields) => {
    try {
      const createdBooking = await bookings.create(fields);
      if (!createdBooking) {
        throw Error("unable to create records");
      }
      if (createdBooking) {
        alert(`Booking Id: ${createdBooking.id} Created Successfully'`);
        console.log("Booking ID: ______", createdBooking.id);
        bookingsCreated = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  for (let fields of campBooking.value) {
    createBookings(fields);
  }

  const createPayment = async (fields) => {
    try {
      const createdPaymentRecord = await payments.create(fields);
      if (!createdPaymentRecord) {
        throw Error("");
      }
      console.log("paymentID:______", createdPaymentRecord.id);
    } catch (error) {
      console.log(error);
    }
  };
  if (bookingsCreated) {
    alert("Attempting payment record");
  }
  createPayment(savedParent.value);
};

const cancelBooking = () => {
  savedParent.value = {};
  campBooking.value = [];
};
</script>

<style scoped>
p {
  color: var(--color-light);
}

.button-container {
  padding-inline: 1rem;
}

.btn-group {
  display: flex;
  justify-content: space-between;
}

.btn-group>* {
  flex: 1 1 auto;
}

/* .btn-group > * + * {
    margin-left: 0.8rem;
} */
span {
  font-size: larger;
}
</style>
