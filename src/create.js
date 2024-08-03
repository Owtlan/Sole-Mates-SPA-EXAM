import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';


const createTemplate = () => html`
       <section id="create">
        <div class="form">
          <h2>Add item</h2>
          <form class="create-form" @submit=${addItem}>
            <input
              type="text"
              name="brand"
              id="shoe-brand"
              placeholder="Brand"
            />
            <input
              type="text"
              name="model"
              id="shoe-model"
              placeholder="Model"
            />
            <input
              type="text"
              name="imageUrl"
              id="shoe-img"
              placeholder="Image url"
            />
            <input
              type="text"
              name="release"
              id="shoe-release"
              placeholder="Release date"
            />
            <input
              type="text"
              name="designer"
              id="shoe-designer"
              placeholder="Designer"
            />
            <input
              type="text"
              name="value"
              id="shoe-value"
              placeholder="Value"
            />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`

function addItem(e) {
    e.preventDefault()

    let brand = document.getElementById('shoe-brand').value
    let model = document.getElementById('shoe-model').value
    let imageUrl = document.getElementById('shoe-img').value
    let release = document.getElementById('shoe-release').value
    let designer = document.getElementById('shoe-designer').value
    let value = document.getElementById('shoe-value').value

    if (brand === '' || model === '' || imageUrl === '' || release === '' || designer === '' || value === '') {
        window.alert('you need to fill all fields')
        return
    }


    fetch('http://localhost:3030/data/shoes', {
        method: 'POST',
        headers: {
            'X-Authorization': localStorage.token
        },
        body: JSON.stringify({
            brand,
            model,
            imageUrl,
            release,
            designer,
            value
        })
    })
        .then(res => res.json())
        .then(data => {
            page.redirect('/dashboard')
        })
        .catch(error => alert(error.message))
}

export const createView = (ctx) =>
    render(createTemplate(), document.querySelector('main'))