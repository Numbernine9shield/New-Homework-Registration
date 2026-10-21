import {regFullName, regUsername, regEmail, regPassword} from './constants.js';
import {resetFieldError, showError, findUser, keyDownFuncReg} from './validation.js';
import {mainButton, fullName, username, email, password, passwordRepeat, checkbox, popupMain, popupMainClose, mainHeadline, mainLink, mainText
, eyePass, eyePassRepeat} from './elements.js';


const formInputs = [fullName, username, email, password, passwordRepeat, checkbox];

export const clients = JSON.parse(localStorage.getItem('clients')) ?? [];

fullName.addEventListener('input',  () =>{
    keyDownFuncReg(fullName, regFullName);
});
username.addEventListener('input',  () =>{
    keyDownFuncReg(username, regUsername);
});
email.addEventListener('input',  () =>{
    keyDownFuncReg(email, regEmail);
});
password.addEventListener('input',  () =>{
    keyDownFuncReg(password, regPassword);
});
passwordRepeat.addEventListener('input',  () =>{
    keyDownFuncReg(passwordRepeat, regPassword);
})

eyePass.addEventListener('click', () =>{
    if (password.type === 'password'){
        password.type = 'text';
        eyePass.children[0].src = './assets/images/openEye.png';
    } else {
        password.type = 'password';
        eyePass.children[0].src = './assets/images/closeEye.png';
    }
});

eyePassRepeat.addEventListener('click', () =>{
    if (passwordRepeat.type === 'password'){
        passwordRepeat.type = 'text';
        eyePassRepeat.children[0].src = './assets/images/openEye.png';
    } else {
        passwordRepeat.type = 'password';
        eyePassRepeat.children[0].src = './assets/images/closeEye.png';
    }
});



function regFormFunc(event){
    event.preventDefault();
    let isValid = true;

    const foundUser = findUser();

    formInputs.forEach(resetFieldError);
    //Проверка Full Name
    if (fullName.value.trim() === "") {
        showError(fullName, "Заполните поле Full Name");
        isValid = false;
    } else if (!regFullName.test(fullName.value.trim())) {
        showError(fullName, "Full Name может содержать только буквы и пробелы");
        isValid = false;
    }

    //Проверка Username
    if (username.value.trim() === "") {
        showError(username, "Заполните поле Username");
        isValid = false;
    } else if (clients.some(user => user.username === username.value)){
        showError(username, "Данный Username уже зарегистрирован");
        isValid = false;
    } else if (!regUsername.test(username.value)) {
        showError(username, "Username может содержать только буквы, цифры, символ подчеркивания и тире");
        isValid = false;
    }
    //Проверка Email
    if (email.value.trim() === "") {
        showError(email, "Заполните поле Email");
        isValid = false;
    } else if (clients.some(user => user.email === email.value)){
        showError(email, "Данный Email уже зарегистрирован");
        isValid = false;
    } else if (!regEmail.test(email.value)) {
        showError(email, "Email введён некоректно");
        isValid = false;
    }
    //Проверка Password
    if (password.value.trim() === "") {
        showError(password, "Заполните поле Password");
        isValid = false;
    } else if (!regPassword.test(password.value)) {
        showError(password, "Пароль должен содержать минимум 8 символов и иметь хотя бы одну букву в верхнем регистре, одну цифру, один спецсимвол")
        isValid = false;
    }
    //Проверка Repeat Password
    if (passwordRepeat.value.trim() === "") {
        showError(passwordRepeat, "Заполните поле Repeat Password");
        isValid = false;
    } else if (password.value !== passwordRepeat.value) {
        showError(passwordRepeat, "Пароли должны совпадать")
        isValid = false;
    }
    //Проверка Checkbox
    if (!checkbox.checked) {
        showError(checkbox, "Поставьте галочку")
        isValid = false;
    }

    if (isValid){
        popupMain.style.display = 'grid';
        const user = {
            fullName: fullName.value,
            username: username.value,
            email: email.value,
            password: password.value,
        };
        clients.push(user);
        localStorage.setItem('clients', JSON.stringify(clients));
    }
}

const loginFormFunc = function (event) {
    event.preventDefault();

    let isValid = true;

    resetFieldError(username);
    resetFieldError(password);


    if (username.value.trim() === "") {
        showError(username, "Заполните поле Username");
        isValid = false;
    } else if (!regUsername.test(username.value)) {
        showError(username, "Username может содержать только буквы, цифры, символ подчеркивания и тире");
        isValid = false;
    }
    if (password.value.trim() === "") {
        showError(password, "Заполните поле Password");
        isValid = false;
    }

    if (isValid) {
        const foundUser = findUser();

        if (foundUser === undefined) {
            showError(username, "Пользователь не зарегистрирован");
        } else if (foundUser.password !== password.value) {
            showError(password, "Неверный пароль")
        } else {
            mainHeadline.textContent = `Welcome, ${foundUser.fullName}!`;
            mainButton.textContent = "Exit";
            username.parentElement.classList.add('hide');
            password.parentElement.classList.add('hide');
            mainText.classList.add('hide');
            mainLink.classList.add('hide');
            mainButton.removeEventListener('click', loginFormFunc);

            const reloadedPage = (event) => {
                event.preventDefault();
                window.location.reload();
            }

            mainButton.addEventListener("click", reloadedPage);
        }
    }
}

//Проверка формы
mainButton.addEventListener('click', regFormFunc);

function showLoginForm(event){
    event.preventDefault();
    resetFieldError(username);
    resetFieldError(password);
    mainButton.removeEventListener('click', regFormFunc);
    mainLink.removeEventListener('click', showLoginForm);
    popupMain.style.display = 'none';
    mainHeadline.textContent = 'Log in to the system';
    checkbox.parentElement.classList.add('hide');
    fullName.parentElement.classList.add('hide');
    email.parentElement.classList.add('hide');
    passwordRepeat.parentElement.classList.add('hide');
    mainButton.textContent = "Sign in";
    mainLink.textContent = "Registration";
    mainLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.reload();
    })
    password.value = '';
    username.value = '';

    username.classList.remove('trueKey', 'falseKey');
    password.classList.remove('trueKey', 'falseKey');
    eyePass.children[0].src = './assets/images/closeEye.png';

    mainButton.addEventListener('click', loginFormFunc);
}

popupMainClose.addEventListener('click', showLoginForm)
mainLink.addEventListener('click', showLoginForm)

