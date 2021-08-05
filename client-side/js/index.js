import apiActions from './api-actions/api-actions.js';
import ParentPage from './pages/ParentPage.js';
import AllergyComponent from './components/AllergyComponent.js';
import AddChildPage from "./pages/AddChildPage.js"


buildPage();

function buildPage() {
    renderProfileInfo();
    navAllergies();
}

const app = document.querySelector('#app');

function renderProfileInfo() {
    const profileButton = document.querySelector('#profile_button');
    profileButton.addEventListener('click', () => {
        apiActions.getRequest('http://localhost:8080/parents/89', (parents) => {
            app.innerHTML = ParentPage(parents);
            navToAddChildPage();
            createChild();
            // deleteChild();
        });
    });
}

function navToAddChildPage() {
        const navToAdd = document.querySelector('.add_child_plus');
        navToAdd.addEventListener('click', ()=>{
            app.innerHTML = AddChildPage();
        })   
}

function createChild() {
    app.addEventListener('click', (event) => {
        if(event.target.classList.contains('add_child_submit')){
            const firstName = event.target.parentElement.querySelector('#add_child_firstName').value;
            const lastName = event.target.parentElement.querySelector('#add_child_lastName').value;
            const age = event.target.parentElement.querySelector('#add_child_age').value;
            apiActions.postRequest('http://localhost:8080/parents/89/add-child', {
                "firstName": firstName,
                "lastName": lastName,
                "age": age
            }, (parents) => {
                console.log(parents);
                app.innerHTML = ParentPage(parents);
                navToAddChildPage();
            });
        }
    })
}

function navAllergies() {
    const allergyElem = document.querySelector('.allergy-list-btn');
    allergyElem.addEventListener('click', () => {
        apiActions.getRequest('http://localhost:8080/allergies', allergies => {
            app.innerHTML = AllergyComponent(allergies);
        });
    });
}