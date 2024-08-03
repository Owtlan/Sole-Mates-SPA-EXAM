import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';



let dashboardTemplate = (catalog) => html`

       <section id="dashboard">
        <h2>Collectibles</h2>
        <ul class="card-wrapper">
          <!-- Display a li with information about every post (if any)-->
            ${catalog.length > 0 ? catalog.map(c => html`
          <li class="card">
            <img src="${c.imageUrl}" alt="travis" />
            <p>
              <strong>Brand: </strong><span class="brand">${c.brand}</span>
            </p>
            <p>
              <strong>Model: </strong
              ><span class="model">${c.model}</span>
            </p>
            <p><strong>Value:</strong><span class="value">${c.value}</span>$</p>
            <a class="details-btn" href="/details/${c._id}">Details</a>
          </li>
               `) : html`
            <h2>There are no items added yet.</h2>
              `}
        </ul>
       `

const getCatalog = () => {
    return fetch('http://localhost:3030/data/shoes?sortBy=_createdOn%20desc')
        .then(res => res.json())
        .then(data => Object.values(data))
}

export const catalogView = (ctx) =>
    getCatalog()
        .then(catalog => render(dashboardTemplate(catalog), document.querySelector('main')))