import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';


const editTemplate = (album, onSubmit) => html`
          <section id="edit">
        <div class="form">
          <h2>Edit item</h2>
          <form class="edit-form" @submit=${onSubmit}>
            <input
              type="text"
              name="brand"
              id="shoe-brand"
              placeholder="Brand"
                .value=${album.brand}
            />
            <input
              type="text"
              name="model"
              id="shoe-model"
              placeholder="Model"
                .value=${album.model}
            />
            <input
              type="text"
              name="imageUrl"
              id="shoe-img"
              placeholder="Image url"
                .value=${album.imageUrl}
            />
            <input
              type="text"
              name="release"
              id="shoe-release"
              placeholder="Release date"
                .value=${album.release}
            />
            <input
              type="text"
              name="designer"
              id="shoe-designer"
              placeholder="Designer"
                .value=${album.designer}
            />
            <input
              type="text"
              name="value"
              id="shoe-value"
              placeholder="Value"
                .value=${album.value}
            />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`

const getAlbumDetails = (id) => {

    return fetch(`http://localhost:3030/data/shoes/${id}`)
        .then(res => res.json())
};

const editAlbum = (id, album) => {
    return fetch(`http://localhost:3030/data/shoes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(album)
    })
        .then(res => res.json())
};


export const editView = (ctx) => {
    const albumId = ctx.params.albumId
    console.log(albumId);
    getAlbumDetails(albumId)
        .then(album => {
            const onSubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);



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

                const editedAlbum = {
                    brand,
                    model,
                    imageUrl,
                    release,
                    designer,
                    value
                };
                if (Object.values(editedAlbum).some(field => field.trim() === '')) {
                    return alert('All fields are required!');
                }

                editAlbum(albumId, editedAlbum)
                    .then(() => {
                        page.redirect(`/details/${albumId}`);
                    });
            }
            render(editTemplate(album, onSubmit), document.querySelector('main'))
        })
}