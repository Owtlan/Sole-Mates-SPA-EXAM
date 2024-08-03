import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';




const detailsTemplate = (items, isOwner, onDelete) => html`
     <section id="details">
        <div id="details-wrapper">
          <p id="details-title">Shoe Details</p>
          <div id="img-wrapper">
            <img src="${items.imageUrl}" alt="example1" />
          </div>
          <div id="info-wrapper">
            <p>Brand: <span id="details-brand">${items.brand}</span></p>
            <p>
              Model: <span id="details-model">${items.model}</span>
            </p>
            <p>Release date: <span id="details-release">${items.release}</span></p>
            <p>Designer: <span id="details-designer">${items.designer}</span></p>
            <p>Value: <span id="details-value">${items.value}</span></p>
          </div>

          <!--Edit and Delete are only for creator-->
          ${isOwner ? html`
          <div id="action-buttons">
            <a href="/edit/${items._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
          </div>
             `: ''}
        </div>
      </section>
`;

const getDetails = (detailsId) => {
    return fetch(`http://localhost:3030/data/shoes/${detailsId}`)
        .then(res => res.json())
}

const deleteAlbum = (id) => {
    return fetch(`http://localhost:3030/data/shoes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        }
    })
        .then(res => res.json());
}

export const detailsView = (ctx) => {
    getDetails(ctx.params.detailsId)
        .then(items => {
            const isOwner = localStorage.ownerId === items._ownerId;

            const onDelete = () => {
                if (confirm('Are you sure you want to delete this album?')) {
                    deleteAlbum(ctx.params.detailsId)
                        .then(() => {
                            page.redirect('/dashboard');
                        })
                        .catch(err => {
                            alert('Failed to delete album: ' + err.message);
                        });
                }
            };
            render(detailsTemplate(items, isOwner, onDelete), document.querySelector('main'));
        })
}