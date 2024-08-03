import { html, render } from '../node_modules/lit-html/lit-html.js';

const searchTemplate = (shoes = [], isLoggedIn) => html`
   <section id="search">
        <h2>Search by Brand</h2>

        <form class="search-wrapper cf" @submit=${onSearch}>
          <input
            id="#search-input"
            type="text"
            name="search"
            placeholder="Search here..."
            required
          />
          <button type="submit">Search</button>
        </form>

        <h3>Results:</h3>
        ${shoes.length === 0 ? html`<h2>There are no results found.</h2>`
        : shoes.map(shoe => shoesTemplate(shoe, isLoggedIn))
    }
        </section>
       `;

const shoesTemplate = (shoes, isLoggedIn) => html`
       <ul class="card-wrapper">
            <!-- Display a li with information about every post (if any)-->
            <li class="card">
              <img src="${shoes.imageUrl}" alt="travis" />
              <p>
                <strong>Brand: </strong><span class="brand">${shoes.brand}</span>
              </p>
              <p>
                <strong>Model: </strong
                ><span class="model">${shoes.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${shoes.value}</span>$</p>
             ${isLoggedIn ? html`<a class="details-btn" href="/details/${shoes.id}">Details</a>` : ''}
              
            </li>
          </ul>
       `

const root = document.querySelector('main')

const isLoggedIn = () => {
    return !!localStorage.getItem('token')
}

// start
async function onSearch(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get('search').trim();

    if (query === '') {
        return alert('Please enter a search query');
    }

    try {
        const response = await fetch(`http://localhost:3030/data/shoes?where=brand%20LIKE%20%22${query}%22`);
        const shoes = await response.json();
        render(searchTemplate(shoes, isLoggedIn()), root);
    } catch (error) {
        console.error('Error fetching shoes:', error);
    }
}

// Function to render the search page
export const createSearch = () => {
    render(searchTemplate([], isLoggedIn()), root);
}

// Initial render with an empty list
createSearch();



