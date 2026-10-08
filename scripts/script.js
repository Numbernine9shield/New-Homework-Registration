window.addEventListener('load', () => {
    const input = document.getElementById('fullName');

    input.addEventListener("keydown", (event) => {
        if (/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    })

    input.addEventListener('input', () => {
        input.value = input.value.replace(/[0-9]/g,'');
    })

    const username = document.getElementById('username');

    username.addEventListener('keydown', (event)=> {
        if (event.key === '.' || event.key === ',') {
            event.preventDefault();
        }
    })

    username.addEventListener('input', ()=>{
        username.value = username.value.replace(/[,\.]/g,'');
    })

    const checkbox = document.getElementById('checkbox');

    checkbox.addEventListener('change', (event) => {
        event.target.checked ?  console.log('Согласен'): console.log('Не согласен');

    })

    const main = document.getElementsByClassName('main')[0];
    const overlay = document.getElementById('overlay');
    const button = document.getElementById('button');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordRepeat = document.getElementById('passwordRepeat');

    function signUp (event) {
        event.preventDefault();
        if (!input.value){
            alert('Заполните поле Full Name')
            return
        }
        if (!username.value){
            alert('Заполните поле Username')
            return
        }
        if (!email.value){
            alert('Заполните поле E-mail')
            return
        }
        if (!password.value) {
            alert('Заполните поле Password')
            return
        }
        if (!passwordRepeat.value) {
            alert('Заполните поле Repeat Password')
            return
        }
        if (password.value.length < 8){
            alert('Пароль должен содержать не менее 8 символов.')
            return
        }

        if (password.value !== passwordRepeat.value){
            alert('Пароли должны совпадать')
            return
        }

        if (!checkbox.checked){
            alert('Согласитесь с условиями')
            return;
        }
        document.querySelector('form').reset();
        overlay.style.display='flex';
    }

    button.addEventListener('click', signUp);

    const link = document.getElementById('link');
    const login = document.getElementById('login');

    [link,login].forEach(item => {
        item.addEventListener('click', ()=>{
            overlay.style.display='none';
            document.getElementsByClassName('form-reg__headline')[0].innerText='Log in to the system';
            document.getElementById('label-fullName').remove();
            document.getElementById('label-email').remove();
            document.getElementById('label-passwordRepeat').remove();
            document.getElementsByClassName('label-privacy')[0].remove();
            button.innerText = 'Sign In';
            link.remove()

            button.removeEventListener('click', signUp);
            button.addEventListener('click', signIn);
        })
    })

    function signIn () {
        if (!username.value){
            alert('Заполните поле Username')
            return;
        }

        if (!password.value) {
            alert('Заполните поле Password');
            return;
        }
        alert(`Добро пожаловать ${username.value}!`)
    }

    console.log('Hello world!');
});
