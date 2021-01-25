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
      generateModalConstants(); // generate modal constants
    })
    .catch(error => console.log("Looks like there was a problem", error));
}
// --------------------------------------
// HELPER FUNCTIONS
// --------------------------------------

// Generate HTML for 12 Cards
// --------------------------------------
function generateCards(data) {
  console.log(data);
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

    // ADD "click" EVENTLISTENER
    // Callback function to toggleMODAL on and off
    //// const card = document.querySelectorAll(".card")[i];
    //// card.addEventListener("click", toggleMODAL);
  } // end loop
  const card = document.querySelectorAll(".card");
  //console.log(card);
  card.forEach(item => {
    // call generateModalConstants as a callback
    item.addEventListener("click", function () {
      generateModalConstants(data);
    });
  });
} // end generateCards() function

// Generate static HTML for Modal window - with the required number of data objects???
// --------------------------------------
function generateModalConstants(data) {
  // console.log(data); // Array of 12 objects
  // console.log(data[0]);
  // console.log(data[0].gender);
  // console.log(data.length);

  let html;
  const card = document.getElementsByClassName(".card");
  console.log(card); // nodelist if querySelector / htmlcollection if getElementsByclassName
  //card.addEventListener("click", function () {
  for (let i = 0; i < data.length; i++) {
    html = `
  <div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
  </div>
  `;
    //return html;
  }
  //});

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

function updateModal(employeeObj) {
  const modalInfo = document.querySelector(".modal-info-container");
  console.log(modalInfo);
  // dynamic data for modal here
} // end updateModal() function
updateModal();
/**
//// Modal markup for dynamic data areas - insert after <button>
`<div class="modal-info-container">
<img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
<h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
<p class="modal-text">${data[i].email}</p>
<p class="modal-text cap">city</p>
<hr>
<p class="modal-text">(555) 555-5555</p>
<p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
<p class="modal-text">Birthday: 10/21/2015</p>
</div>`;
 */
