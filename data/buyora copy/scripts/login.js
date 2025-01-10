const name = document.querySelector('.name');
const password = document.querySelector('.password');
const signInButton = document.querySelector('.signIn')


const checkName = localStorage.getItem('name')
const checkPassword = localStorage.getItem('password')


signInButton.addEventListener('click', ()=>{
     if(name.value != checkName){
        alert('Incorrect Nickname')
    } else if(password.value!= checkPassword){
        alert('incorrect password')
    }else{
        window.location.href = 'buyora.html'
    }

})
