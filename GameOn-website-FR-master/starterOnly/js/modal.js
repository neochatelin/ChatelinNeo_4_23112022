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
let modalBodyForm = document.querySelector('.modal-body');
let modalBodyRegistered = document.querySelector('.modal-body-registered');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
let data;

function launchModal() {
  modalBodyForm.style.display = 'block';modalBodyRegistered.style.display = 'none'
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
  }else{
    formData[0].children[2].value = '';
    formData[1].children[2].value = '';
    formData[2].children[2].value = '';
    formData[3].children[2].value = '';
    formData[4].children[2].value = '';
  }
  modalbg.style.display = "block";
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

// checking the modal input
let checking = (e)=>{
  saveFormData();
  let btn = document.getElementsByClassName('btn-submit')[0];
  let isCorrect = true;
  switch (e) {
    case "first":
      ((data.first).length >= 2 && (data.first).match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) ?
        document.querySelector('.error-msg-first').style.display = "none"
        :
        document.querySelector('.error-msg-first').style.display = "block"
      break;
    case "last":
      ((data.last).length >= 2 && (data.last).match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) ?
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
      let birthdate = new Date(data.birthdate);
      (data.birthdate != "" && (Date.now() - birthdate.getTime()) > (31556952000 * 18)) ?
        (document.querySelector('.error-msg-birthdate').style.display = "none")
        :
        document.querySelector('.error-msg-birthdate').style.display = "block"
      break;
    case "quantity":
      parseInt(data.quantity) > -1 && parseInt(data.quantity) !== NaN ?
        document.querySelector('.error-msg-quantity').style.display = "none"
        :
        document.querySelector('.error-msg-quantity').style.display = "block"
      break;
    case "checkbox":
      data.checkbox1?
        document.querySelector('.error-msg-checkbox').style.display = "none"
        :
        document.querySelector('.error-msg-checkbox').style.display = "block"
      break;

    default:
      break;
  }
  isCorrect? btn.style.background = '#fe142f' : btn.style.background = 'grey';
}

// validate modal form

document.querySelector('form').addEventListener('submit', (e)=>{
  e.preventDefault();
  saveFormData();
  let isCorrect = true;
  (data.first).length >= 2 ?
    document.querySelector('.error-msg-first').style.display = "none"
    :
    (document.querySelector('.error-msg-first').style.display = "block",isCorrect = false)
  
  data.last.length >= 2 ?
    document.querySelector('.error-msg-last').style.display = "none"
    :
    (document.querySelector('.error-msg-last').style.display = "block",isCorrect = false)
  
  (data.email).match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)?
    document.querySelector('.error-msg-email').style.display = "none"
    :
    (document.querySelector('.error-msg-email').style.display = "block",isCorrect = false)
  
  data.birthdate != "" ?
    document.querySelector('.error-msg-birthdate').style.display = "none"
    :
    (document.querySelector('.error-msg-birthdate').style.display = "block",isCorrect = false)
        
  parseInt(data.quantity) > 0 && parseInt(data.quantity) !== NaN ?
    document.querySelector('.error-msg-quantity').style.display = "none"
    :
    (document.querySelector('.error-msg-quantity').style.display = "block",isCorrect = false)
  
  data.checkbox1 ?
    document.getElementsByClassName('btn-submit')[0].style.background = '#fe142f'
    :
    (document.getElementsByClassName('btn-submit')[0].style.background = 'grey',isCorrect = false)
  
  isCorrect ? (
    modalBodyForm.animate([
    {transform: "scale(1)"},
    {transform: "scale(0)"},
    {display: "none"}
  ], {duration: 300}),
  setTimeout(()=>{modalBodyForm.style.display = 'none';modalBodyRegistered.style.display = 'block'}, 300/2),
  modalBodyRegistered.animate([
    {transform: "scale(0)"},
    {transform: "scale(1)"}
  ], {duration: 200}),
  localStorage.clear())
  :
  document.getElementsByClassName('btn-submit')[0].animate([
    {boxShadow: "rgba(200, 0, 0, 0.9) 0 0 22px 6px"},
    {transform: "translateX(0px)"},
    {transform: "translateX(5px)"},
    {transform: "translateX(-5px)"},
    {transform: "translateX(0px)"}
  ], {duration: 300});
})