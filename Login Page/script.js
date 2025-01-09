let Signupbtn = document.querySelector('.Signupbtn');
let SignInBtn = document.querySelector('.SignInBtn');
let namefield = document.querySelector('.namefield');
let title = document.querySelector('.title');
let underline = document.querySelector('.underline');
let text = document.querySelector('.text');


SignInBtn.addEventListener('click',()=>{
    namefield.style.maxHeight='0'
    title.innerHTML = 'Sign In';
    text.innerHTML = 'Lost Password';
    Signupbtn.classList.add('disable');
    SignInBtn.classList.remove('disable');
    underline.style.transform ='translateX(35px)';
})
Signupbtn.addEventListener('click',()=>{
    namefield.style.maxHeight='60px'
    title.innerHTML = 'Sign Up';
    text.innerHTML = 'Password Suggestion';
    Signupbtn.classList.remove('disable');
    SignInBtn.classList.add('disable');
    underline.style.transform ='translateX(0)';
})