class CardComponent extends HTMLElement{

    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });
        
        
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const imagem = document.createElement('img');
        imagem.setAttribute('src', this.getAttribute('img-src'));
        imagem.setAttribute('alt', 'Card Image');
        imagem.setAttribute('class', 'card-image');

        const titulo = document.createElement('h2');
        titulo.textContent = this.getAttribute('titulo');
        titulo.setAttribute('class', 'card-title');

        const description = document.createElement('p');
        description.textContent = this.getAttribute('description');
        description.setAttribute('class', 'card-description');

        this.shadow.appendChild(card);
        card.appendChild(imagem);
        card.appendChild(titulo);
        card.appendChild(description);
    }
}

customElements.define('card-component', CardComponent);

  