function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  if(window.localStorage.getItem("modalForm")){
    let modalForm = JSON.parse(window.localStorage.getItem("modalForm"));
    formData[0].children[2].value = modalForm.first;
    formData[1].children[2].value = modalForm.last;
    formData[2].children[2].value = modalForm.email;
    formData[3].children[2].value = modalForm.birthdate;
    formData[4].children[2].value = modalForm.quantity;

    Array.from(formData[5].children).forEach((e)=>{
      if(e.type === "radio" && e.value === modalForm.location)
        e.checked = true;
    });

    formData[6].children['checkbox1'].checked = modalForm.checkbox1;
    formData[6].children['checkbox2'].checked = modalForm.checkbox2;
  }
  modalbg.style.display = "block";
}

// close modal form
let closeModal=()=>{
  modalbg.style.display = "none";
}

// saving form in local storage
let data;

let saving=()=>{
  data = {
    first: formData[0].children[2].value,
    last: formData[1].children[2].value,
    email: formData[2].children[2].value,
    birthdate: formData[3].children[2].value,
    quantity: formData[4].children[2].value,
    location: '',
    checkbox1: formData[6].children['checkbox1'].checked,
    checkbox2: formData[6].children['checkbox2'].checked
  }
  Array.from(formData[5].children).forEach((e)=>{
    if(e.type === "radio" && e.checked)
      data.location = e.value;
  });
  window.localStorage.setItem("modalForm", JSON.stringify(data));
}

// validate modal form
let validate=()=>{
  
}