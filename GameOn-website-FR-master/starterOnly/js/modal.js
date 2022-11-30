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
let data;

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
  checking();
}

// close modal form
let closeModal=()=>{
  modalbg.style.display = "none";
}

// saving form data in local storage
let saveFormData=()=>{
  data = {
    first: formData[0].children[2].value,
    last: formData[1].children[2].value,
    email: formData[2].children[2].value,
    birthdate: formData[3].children[2].value,
    quantity: formData[4].children[2].value,
    location: Array.from(formData[5].children).forEach((e)=>{
                if(e.type === "radio" && e.checked)
                  return e.value;
              }),
    checkbox1: formData[6].children['checkbox1'].checked,
    checkbox2: formData[6].children['checkbox2'].checked
  }
  
  window.localStorage.setItem("modalForm", JSON.stringify(data));
}

// checking
let checking = (e)=>{
  saveFormData();
  let btn = document.getElementsByClassName('btn-submit')[0];
  let isCorrect = true;
  switch (e) {
    case "first":
      (data.first).length >= 2 ?
        document.querySelector('.error-msg-first').style.display = "none"
        :
        document.querySelector('.error-msg-first').style.display = "block"
      break;
    case "last":
      data.last.length >= 2 ?
        document.querySelector('.error-msg-last').style.display = "none"
        :
        document.querySelector('.error-msg-last').style.display = "block"
      break;
    case "email":
      (data.email).match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)?
        document.querySelector('.error-msg-email').style.display = "none"
        :
        document.querySelector('.error-msg-email').style.display = "block"
      break;
    case "birthdate":
      data.value != "" ?
        document.querySelector('.error-msg-first').style.display = "none"
        :
        document.querySelector('.error-msg-first').style.display = "block"
      break;
    case "quantity":
      data.quantity < 0 && typeof parseInt(data.quantity) !== "number" ?isCorrect=false:'';
      break;
    case "checkbox":
      data.checkbox1?'':isCorrect=false;
      break;

    default:
      break;
  }
  isCorrect? btn.style.background = '#fe142f' : btn.style.background = 'grey';
}

// validate modal form
let validate=()=>{
  
}