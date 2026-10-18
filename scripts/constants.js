const regFullName = /^[А-Яа-яЁёa-zA-Z ]+$/;
const regUsername =/^[А-Яа-яЁёa-zA-Z\d_-]+$/;
const regEmail = /^[a-zA-Z0-9_%+-]+(?:\.[a-zA-Z0-9_%+-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
const regPassword = /^(?=.*[A-ZА-ЯЁ])(?=.*\d)(?=.*[^\p{L}\p{N}\s]).{8,}$/u;

export {regFullName, regUsername, regEmail, regPassword};