// Treehouse techdegree: Unit-5 "Working with API's"

// Main API call to randomuser.me
// futureproof updates to the API by adding a version number at the end
//fetchData("https://randomuser.me/api/1.3/")

// --------------------------------------
// FETCH FUNCTIONS
// --------------------------------------

// Get "12 data results" specified in the url
fetchData("https://randomuser.me/api/?results=12");

// using fetchData as a reusable function to fetch() results from the server
function fetchData(url) {
  return fetch(url)
    .then(response => response.json()) // returns a promise and parses it to JSON
    .then(data => {
      generateCards(data.results); // calls function with the data results
      // generateModalConstants(); // (calling this instead in generateCards() eventlistener)
    })
    .catch(error => console.log("Looks like there was a problem", error));
}

// function test() {
//   fetch("https://randomuser.me/api/?results=12").then(data => {
//     console.log(data);
//     updateModal(data);
//   });
// }

// --------------------------------------
// HELPER FUNCTIONS
// --------------------------------------

// Generate HTML for 12 Cards
// --------------------------------------
function generateCards(data) {
  //console.log(data);
  //console.log(data[0].name); //test data results
  const gallery = document.getElementById("gallery");

  // loop through the data set, 12 results
  for (let i = 0; i < data.length; i++) {
    let html = `<div class="card">
  <div class="card-img-container">
      <img class="card-img" src="${data[i].picture.medium}" alt="profile picture">
  </div>
  <div class="card-info-container">
      <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
      <p class="card-text">${data[i].email}</p>
      <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
  </div>
</div>`;

    gallery.insertAdjacentHTML("beforeend", html);
  } // end loop

  const card = document.querySelectorAll(".card");

  // Listen for clicks on each card
  // Create the static modal window

  generateModalConstants();
  updateModal(data);
} // end generateCards() function

// Generate static HTML and insert for Modal window
// Close modal window
// --------------------------------------
function generateModalConstants() {
  const html = `
  <div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
          <h3 id="name" class="modal-name cap">name</h3>
          <p class="modal-text">email</p>
          <p class="modal-text cap">city</p>
          <hr>
          <p class="modal-text">(555) 555-5555</p>
          <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
          <p class="modal-text">Birthday: 10/21/2015</p>
      </div>
  </div>`;

  // Select and insert Modal Window
  const body = document.querySelector("body");
  body.insertAdjacentHTML("afterEnd", html);

  // Close Modal Window
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalContainer = document.querySelector(".modal-container");

  modalCloseBtn.addEventListener("click", e => {
    modalContainer.style.display = "none";
  });
} // end generateModalConstants() function

//
function updateModal(employeeObject) {
  let cardItem = 0;
  console.log(employeeObject);
  const modalInfo = document.querySelector(".modal-info-container");
  //console.log(modalInfo);
  modalInfo.innerHTML = "";
  //
  let updateHTML = `
    <img class="modal-img" src="${employeeObject[cardItem].picture.large}" alt="profile picture">
    <h3 id="name" class="modal-name cap">${employeeObject[cardItem].name.title} ${employeeObject[cardItem].name.first} ${employeeObject[cardItem].name.last}</h3>
    <p class="modal-text">${employeeObject[cardItem].email}</p>
    <p class="modal-text cap">${employeeObject[cardItem].location.country}</p>
    <hr>
    <p class="modal-text">Phone: ${employeeObject[cardItem].phone}</p>
    <p class="modal-text"> ${employeeObject[cardItem].location.city}, 
    ${employeeObject[cardItem].location.state} ${employeeObject[cardItem].location.postcode}</p>
    <p class="modal-text">Birthday: ${employeeObject[cardItem].dob.date}</p>`;

  modalInfo.insertAdjacentHTML("afterBegin", updateHTML);
} // end updateModal() function

function cardClicks(resultsArr) {
  console.log(resultsArr);
}
