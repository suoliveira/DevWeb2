class TrocaTema extends HTMLElement{

    constructor(){
      super();

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          button{
            padding: 10px 20px;
            background-color: #C71385;
            color: #ffffff;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            font-size: 16px;
            float: right;
          }
          button:hover{
            background-color: #FF1493;
          }
        </style>
        
        <button id="trocar-tema">
        <span id="icon-light">☀️</span>
        <span id="icon-dark" style="display: none;">🌙</span>
        </button>
      `;
    }
  
    connectedCallback(){
      this.shadowRoot.getElementById('trocar-tema').addEventListener('click', () => {
        
        const isDarkMode = document.body.classList.contains('dark-mode');
        const iconLight = this.shadowRoot.getElementById('icon-light');
        const iconDark = this.shadowRoot.getElementById('icon-dark');
        if (isDarkMode){
            iconLight.style.display = 'inline';
            iconDark.style.display = 'none';
            document.body.classList.remove('dark-mode');
        } else {
            iconLight.style.display = 'none';
            iconDark.style.display = 'inline';
            document.body.classList.add('dark-mode');
        }
      });
    }
  }
  
  customElements.define('troca-tema', TrocaTema);
  