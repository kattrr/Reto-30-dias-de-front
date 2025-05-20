import { OPENNEWS_API_KEY } from "./config.js";

const key = OPENNEWS_API_KEY;
const pais = "pe";
const url = `https://gnews.io/api/v4/top-headlines?category=general&lang=es&country=${pais}&max=10&apikey=${key}`;
const container = document.getElementById("noticias");
fetch(url)
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    const noticias = data.articles;
    if (Array.isArray(noticias)) {
      noticias.forEach(function (articulo) {
        const article = document.createElement("article");
        article.innerHTML = `
          <article>
            <div class="img-container">
              <img src="${articulo.image}" alt="Imagen Articulo" />
            </div>
            <div class="container">
              <h2>${articulo.title}</h2>
              <span>${articulo.publishedAt}</span>
                <p>${articulo.content}</p>
                <a href="${articulo.url}">ver mas</a>
            </div>
          </article>
        `;
        container.appendChild(article);
      });
    } else {
      container.innerHTML = "<p>No se encontraron noticias.</p>";
    }
  });
