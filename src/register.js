import { html, render } from '../node_modules/lit-html/lit-html.js';
import { updateInfo } from '../app.js'
import { catalogView } from '../src/dashboard.js';


let registerTemplate = () => html`
      <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form class="login-form" @submit=${onSubmitForm}>
            <input
              type="text"
              name="email"
              id="register-email"
              placeholder="email"
            />
            <input
              type="password"
              name="password"
              id="register-password"
              placeholder="password"
            />
            <input
              type="password"
              name="re-password"
              id="repeat-password"
              placeholder="repeat password"
            />
            <button type="submit">login</button>
            <p class="message">Already registered? <a href="#">Login</a></p>
          </form>
        </div>
      </section>
`


function onSubmitForm(e) {
    e.preventDefault()
    let formData = new FormData(e.currentTarget)
    console.log(formData.get('email'));

    let email = formData.get('email')
    let password = formData.get('password')
    let repeatPassword = formData.get('re-password')

    if (password === '' || repeatPassword === '' || email === '') {
        window.alert('fields are empty')
        return
    }

    if (password !== repeatPassword) {
        window.alert('passwords missmatch !')
        return
    }

    fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => {
            console.log(res);

            if (!res.ok) {
                return res.json().then(error => { throw new Error(error.message) });
            }
            return res.json();
        })
        .then(data => {
            localStorage.setItem('token', data.accessToken)
            localStorage.setItem('ownerId', data._id)
            updateInfo()
            catalogView()
        })
        .catch(error => window.alert(error.message))
}

export const registerView = (ctx) => render(registerTemplate(), document.querySelector('main'))