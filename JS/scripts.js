// Treehouse techdegree: Unit-5 "Working with API's"

// Main API call to randomuser.me
// futureproof updates to the API by adding a version number at the end
//fetchData("https://randomuser.me/api/1.3/")
fetchData("https://randomuser.me/api/?results=12");

function fetchData(url) {
  return fetch(url)
    .then(response => response.json()) // returns a promise
    .then(data => {
      generateHTML(data.results);
      generateMODAL(data.results);
    }) // calls functions with the data results

    .catch(error => console.log("Looks like there was a problem", error));
}

// Generate HTML for 12 Cards
function generateHTML(data) {
  //console.log(data[0].name) //test data results

  const gallery = document.getElementById("gallery");
  //const employeeCard = document.createElement("div");

  // loop through the data set, 12 results
  for (let i = 0; i < data.length; i++) {
    let html = `<div class="card">
  <div class="card-img-container">
      <img class="card-img" src="${data[i].picture.thumbnail}" alt="profile picture">
  </div>
  <div class="card-info-container">
      <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
      <p class="card-text">${data[i].email}</p>
      <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
  </div>
</div>`;

    gallery.insertAdjacentHTML("beforeend", html);

    // Get the HTML elements for the Modal window and listen for clicks
    const card = document.querySelectorAll(".card")[i];
    card.addEventListener("click", toggleMODAL);
  } // end loop
}

function generateMODAL(data) {
  console.log(data);

  let html;
  return (html += `
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
  </div>
  `);
}

function toggleMODAL() {
  const modalSelector = document.querySelector("body");
  // console.log("clicked");
  const modalHTML = generateMODAL();
  modalSelector.insertAdjacentHTML("beforeend", modalHTML);
  const close = document.getElementById("modal-close-btn");
  // console.log(close);
  close.addEventListener("click", function () {
    console.log("clicked modal close");
  });
}

/**
 * element.insertAdjacentHTML('beforeend', 'HTML string')
 * That technique will allow you to add strings of HTML to the DOM without disrupting
 * what already exists in the DOM.
 */

//generateHTML()
