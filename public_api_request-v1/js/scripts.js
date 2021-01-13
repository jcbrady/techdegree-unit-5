// Treehouse techdegree: Unit-5 "Working with API's"

function fetchData(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log("Looks like there was a problem", error))
}

fetchData("https://randomuser.me/api/")

// futureproof updates to the API by adding a version number at the end
//fetchData("https://randomuser.me/api/1.3/")

function generateHTML() {
  const gallery = document.getElementById("gallery")
  const employeeCard = document.createElement("div")
  let html = `<div class="card">
  <div class="card-img-container">
      <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
  </div>
  <div class="card-info-container">
      <h3 id="name" class="card-name cap">first last</h3>
      <p class="card-text">email</p>
      <p class="card-text cap">city, state</p>
  </div>
</div>`

  // employeeCard.innerHTML += html
  //gallery.appendChild(employeeCard)
  gallery.insertAdjacentHTML("beforeend", html)

  /**
   * element.insertAdjacentHTML('beforeend', 'HTML string')
   * That technique will allow you to add strings of HTML to the DOM without disrupting
   * what already exists in the DOM.
   */
}

generateHTML()
