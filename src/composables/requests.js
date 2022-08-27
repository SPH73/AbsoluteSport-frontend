// Segment requests

const API_URL = 'http://localhost:8000'

// camps requests

// Load All camps for use camp booking form
async function httpGetCampsList(){
  const response = await fetch(`${API_URL}/camps`)
  return await response.json()
}

// Submit camp booking data to API
async function httpSubmitCampBooking(){
// TODO: Once API is populating booking form
}

// parties

// Get available parties
async function httpGetPartiesList(){
  // TODO:
}

// Submit party quote to API
async function httpSubmitPartyBooking(){
  // TODO:
}


// clubs/schools

// Get schoolList to populate the clubs booking form
async function httpGetSchoolList(){
  // TODO:
}

// Get available clubs to populate the clubs booking form
async function httpGetClubsList(){
  // TODO:
}

// Submit Club booking tp API
async function httpSubmitClubBooking(){
  // TODO:
}


// other requests

// faqs
// policies
// reviews

export {
  httpGetCampsList,
  httpGetClubsList,
  httpGetPartiesList,
  httpGetSchoolList,
  httpSubmitCampBooking,
  httpSubmitClubBooking,
  httpSubmitPartyBooking,
}