const Signupbtn = document.querySelector('.Signupbtn');
const SignInBtn = document.querySelector('.SignInBtn');
const namefield = document.querySelector('.namefield');
const title = document.querySelector('.title');
const underline = document.querySelector('.underline');
const text = document.querySelector('.text');

if (!Signupbtn || !SignInBtn || !namefield || !title || !underline || !text) {
    throw new Error('Required authentication UI elements are missing.');
}

SignInBtn.addEventListener('click', () => {
    namefield.style.maxHeight = '0';
    title.textContent = 'Sign In';
    text.textContent = 'Lost Password';
    Signupbtn.classList.add('disable');
    SignInBtn.classList.remove('disable');
    underline.style.transform = 'translateX(35px)';
});

Signupbtn.addEventListener('click', () => {
    namefield.style.maxHeight = '60px';
    title.textContent = 'Sign Up';
    text.textContent = 'Password Suggestion';
    Signupbtn.classList.remove('disable');
    SignInBtn.classList.add('disable');
    underline.style.transform = 'translateX(0)';
});