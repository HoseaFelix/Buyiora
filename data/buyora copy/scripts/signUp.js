const name = document.querySelector('.name');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const signupButton = document.querySelector('.signUp');




signupButton.addEventListener('click', ()=>{
    const localName = localStorage.setItem('name', name.value)
    const localEmail = localStorage.setItem('email', email.value)
    const localPassword = localStorage.setItem('password', password.value)

    // nameValue = ''
    // emailValue = ''
    // passwordValue = ''
    alert("Registration successful!")
    // let namE = localStorage.getItem('name');



console.log(namE)


})


// console.log(localStorage.getItem('name'));




