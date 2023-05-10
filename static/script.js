/* side bar menu
-------------------------------------------*/

closeButton = document.querySelector("#side-menu-close")
sideMenu = document.querySelector("#menu-expand")
menuIcon = document.querySelector(".menu-btn")

function openMenu() {
    sideMenu.style.width = "200px";
    sideMenu.classList.toggle("menu-display");
}

menuIcon.addEventListener("click", openMenu)

function closeMenu() {
    if (sideMenu.style.width !== "0") {
        sideMenu.style.width = "0";
    }
}

closeButton.addEventListener("click", closeMenu)


/* alert message */

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = 
    `<div class="alert alert-primary d-flex align-items-center" role="alert" data-bs-dismiss="alert" id="alert-box">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
  </svg>
  <div>
    Cannot make this transaction
  </div>
</div>`

  alertPlaceholder.append(wrapper)

  setTimeout(() => {
  
    // removes element from DOM
    wrapper.style.display = "none"
  
    // hides element (still takes up space on page)
    // box.style.visibility = 'hidden';
  }, 3000); // time in milliseconds
}


const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert("", 'success')
  })
}



/* categories page 
-------------------------------------------*/

const categoriesList = document.querySelectorAll(".category")
const budgetDropDown = document.querySelectorAll(".budget-dropdown")

let categoryIndex = 0;
let compareIndex = 0;

for(let category of categoriesList){
    category.addEventListener("click", (e) => {
        let categoryName = ""
        console.log(e.target)
        if (e.target.classList.contains("category")) {
            categoryName = e.target.querySelector("h4").textContent
        }

        else if (e.target.classList.contains("category-budget")){
            categoryName = e.target.parentElement.querySelector("h4").textContent
            console.log(categoryName)
        }

        else {
            categoryName = e.target.parentElement.parentElement.querySelector("h4").textContent
        }

        category.classList.toggle("category-clicked");
        if (category.classList.contains("category-clicked")){
            for(let budget of budgetDropDown) {
                if (categoryName === budget.id){
                    dropDownItems = document.querySelector("#" + budget.id).querySelectorAll(".budget-item")
                    dropDownHeight = 100 * dropDownItems.length
                    document.querySelector("#" + budget.id).style.height = `${dropDownHeight}px`;
                }
            }
        }

        else {
        for(let budget of budgetDropDown) {
            if (categoryName === budget.id){
                document.querySelector("#" + budget.id).style.height = "0";
            }
        }
        }
    });
}
