import {fullName, mainButton, username} from "./elements.js";
import {clients} from "./script.js";
import {regFullName} from "./constants.js";

const resetFieldError = function (item) {
    item.classList.remove("inputErrorBorder");
    item.nextElementSibling.classList.remove("show");
    item.parentElement.classList.remove("margins");
}

const showError = function (item, message) {
    item.classList.add("inputErrorBorder");
    item.nextElementSibling.classList.add("show");
    item.parentElement.classList.add("margins");
    item.nextElementSibling.textContent = message;
}
const findUser = function () {
    const user = clients.find(user => user.username === username.value);
    return user;
}

const keyDownFuncReg = function (nameInput, reg) {
    resetFieldError(nameInput);
    if (reg.test(nameInput.value)){
        nameInput.classList.add('trueKey');
        nameInput.classList.remove('falseKey');
    } else {
        nameInput.classList.remove('trueKey');
        nameInput.classList.add('falseKey');
    }
}


export {resetFieldError, showError, findUser, keyDownFuncReg};