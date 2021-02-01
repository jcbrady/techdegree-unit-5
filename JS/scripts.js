// Treehouse techdegree: Unit-5 "Working with API's"

// --------------------------------------
// FETCH and API
// --------------------------------------

// Get "12 data results" specified in the url from randomuser.me
fetchData("https://randomuser.me/api/?nat=us&results=12");

// using fetchData as a reusable function to fetch() results from the server
function fetchData(url) {
  return fetch(url)
    .then(response => response.json()) // returns a promise and parses it to JSON
    .then(data => {
      generateCards(data.results); // calls function with the data results
      searchBtn(data.results);
    })
    .catch(error => console.log("Looks like there was a problem", error));
}

// --------------------------------------
// MAIN FUNCTIONS
// --------------------------------------

// generateCards(data) function
// data paremeter is from the API fetch call
// Generates HTML with data for 12 cards
// --------------------------------------
function generateCards(data) {
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

  // Call functions to create the static modal window
  // Call function to update the modal window with dynamic data
  // --------------------------------------
  generateModalConstants();
  updateModal(data);
  cardClicks(data);
} // end generateCards() function

//
// generateModalConstants() funciton
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
      <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
  </div>
  </div>`;

  // Select and insert Modal Window
  const body = document.querySelector("body");
  body.insertAdjacentHTML("afterEnd", html);

  // Toggle Modal Window
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalContainer = document.querySelector(".modal-container");
  //modalContainer.style.display = "none";

  // if (modalContainer.style.display === "none") {
  modalCloseBtn.addEventListener("click", e => {
    modalContainer.style.display = "none";
  });
} // end generateModalConstants()

//
// updateModal() function
// employeeObject parameter is the dynamic data object from fetch
// cardItem parameter takes current index from the loop in cardClicks function
// update the modal window with clicked information
// --------------------------------------
function updateModal(employeeObject, cardItem = 0) {
  //
  // --------------------------------------
  // EXTRA CREDIT
  // previous / next button functionality
  // --------------------------------------
  // the prev and next event listeners increase and decrease the cardItem variable
  // then call the function InsertCardInfo with the main modal also calls
  const prevBtn = document.getElementById("modal-prev");
  const nextBtn = document.getElementById("modal-next");
  prevBtn.addEventListener("click", function () {
    if (cardItem < 1) {
      cardItem = employeeObject.length - 1;
    } else {
      cardItem -= 1;
      modalInfo.innerHTML = "";
      InsertCardInfo(cardItem);
    }
  });
  nextBtn.addEventListener("click", function () {
    if (cardItem < employeeObject.length - 1) {
      cardItem += 1;
      modalInfo.innerHTML = "";
      InsertCardInfo(cardItem);
    } else {
      cardItem = 0;
    }
  });
  //
  // Insert modal data
  // ------------
  const modalInfo = document.querySelector(".modal-info-container");
  // Reset the modal content after .modal-info-container
  modalInfo.innerHTML = "";
  // Update the content with current fetched data, using cardItem parameter
  // function to insert info - also used for prev next functionalty
  function InsertCardInfo() {
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
  }
  // call InsertCardInfo funciton with cardItem as parameter
  InsertCardInfo(cardItem);
} // end updateModal()

// cardClicks() function
// resultsArr is the dynamic data object
// Listen for clicks on each card, launch the modal window with current info.
// Pass the current in loop iteration to updateModal
// --------------------------------------
function cardClicks(resultsArr) {
  const modalContainer = document.querySelector(".modal-container");
  modalContainer.style.display = "none";
  const card = document.querySelectorAll(".card");
  for (let i = 0; i < resultsArr.length; i++) {
    card[i].addEventListener("click", function () {
      generateModalConstants();
      updateModal(resultsArr, i);
      //console.log(i + " card clicked");
    });
  }
} // end cardClicks()

//
//
// --------------------------------------
// EXTRA CREDIT
// Search functionality
// --------------------------------------

// Search filter - click button - from data results
function searchBtn(data) {
  // add the search bar html to the page
  const searchContainer = document.querySelector(".search-container");
  const searchHTML = `
 <form action="#" method="get">
 <input type="search" id="search-input" class="search-input" placeholder="Search by First Name...">
 <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
  searchContainer.insertAdjacentHTML("afterBegin", searchHTML);
  // Search bar functionality
  let searchVal = document.getElementById("search-input");
  searchVal.focus();
  // "click" EventListener on Search Submit Button
  const submit = document.getElementById("search-submit");
  submit.addEventListener("click", function () {
    const input = searchVal.value.toLowerCase();
    // Loop through data and compare search input
    let getName = document.querySelectorAll(".card-info-container #name");

    for (let i = 0; i < data.length; i++) {
      let name = data[i].name.first;
      name = name.toLowerCase();
      if (input === name) {
        getName[i].parentElement.parentElement.style.display = "";
      } else if (input === "") {
        getName[i].parentElement.parentElement.style.display = "";
      } else {
        getName[i].parentElement.parentElement.style.display = "none";
      }
    } // end loop
  }); // end "click" Eventlistener on submit button
} // end searchBtn Function
