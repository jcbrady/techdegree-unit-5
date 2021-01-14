// Treehouse techdegree: Unit-5 "Working with API's"

// Main API call to randomuser.me
// futureproof updates to the API by adding a version number at the end
//fetchData("https://randomuser.me/api/1.3/")
fetchData("https://randomuser.me/api/?results=12")

function fetchData(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => generateHTML(data.results))
    .catch(error => console.log("Looks like there was a problem", error))
}

function generateHTML(data) {
  console.log(data)
  console.log(data[0].name)
  const gallery = document.getElementById("gallery")
  const employeeCard = document.createElement("div")
  let html = `<div class="card">
  <div class="card-img-container">
      <img class="card-img" src="${data[0].picture.thumbnail}" alt="profile picture">
  </div>
  <div class="card-info-container">
      <h3 id="name" class="card-name cap">${data[0].name.first} ${data[0].name.last}</h3>
      <p class="card-text">email</p>
      <p class="card-text cap">city, state</p>
  </div>
</div>`

  // employeeCard.innerHTML += html
  //gallery.appendChild(employeeCard)
  gallery.insertAdjacentHTML("beforeend", html)
}
/**
 * element.insertAdjacentHTML('beforeend', 'HTML string')
 * That technique will allow you to add strings of HTML to the DOM without disrupting
 * what already exists in the DOM.
 */

//generateHTML()
