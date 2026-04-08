class MySidebar extends HTMLElement {

    icons = {
        link: '<i class="ri-link-m"></i>'
    }

    constructor() {
        super();
    }

    connectedCallback() {
        // Renderiza o HTML exatamente como o seu original
        this.innerHTML = `
        <aside>
            <div class="sidebar">
                <div class="sidebar-header" id="hidden-menu">
                    <a href="/">
                        <img src="/assets/logotipo.svg" alt="Logo do Site">
                    </a>
                    <button id="sidebar-toggle">
                        <i class="ri-layout-left-2-line"></i>
                    </button>
                </div>
                <div class="sidebar-body">
                    <div class="nav-group">
                        <h3>Seções</h3>
                        <a class="nav-link" href="/index.html">Atividades</a>
                        <a class="nav-link" href="/pages/noob-mouse.html">1ª Aula</a>
                        <a class="nav-link" href="/pages/auxiliares.html">Auxiliares</a>
                        <a class="nav-link" href="#" style="cursor: not-allowed;">Digitação</a>
                    </div>
                    <div class="nav-group links">
                        <h3>Outros</h3>
                        <a href="http://192.168.22.122:8080/" target="_blank">${this.icons.link} Escola Tsi - LOCAL</a>
                        <a href="https://eadon.com.br/sign-in" target="_blank">${this.icons.link} Escola Tsi - EAD</a>
                        <a href="https://laava.simpleacademy.tech/login" target="_blank">${this.icons.link} Plataforma EJA</a>
                        <a href="https://agilefingers.com/pt" target="_blank">${this.icons.link} Agile Fingers</a>
                        <a href="/pages/sobre.html" target="_blank">${this.icons.link} Sobre o Projeto</a>
                    </div>
                </div>
            </div>
        </aside>
        `;
        this.initSidebar();
    }

    initSidebar() {
        const btnToggle = this.querySelector('#sidebar-toggle');
        const sidebar = this.querySelector('.sidebar');
        let isOpen = true;

        // Função de Toggle
        const toggle = () => {
            sidebar.classList.toggle('sidebar-toggle');
            isOpen = !isOpen;
        };

        // Evento de Click
        if (btnToggle) {
            btnToggle.addEventListener('click', toggle);
        }

        // Lógica de Mobile (Responsividade)
        const mql = window.matchMedia('(max-width: 750px)');
        
        const handleMobile = (e) => {
            if (e.matches && isOpen) {
                toggle();
            }
        };

        mql.addEventListener('change', handleMobile);
        if (mql.matches && isOpen) toggle();

        // Lógica de Link Ativo
        this.highlightActive();
    }

    highlightActive() {
        const links = this.querySelectorAll('.nav-link');
        // Pega apenas o final da URL (ex: index.html)
        const currentPath = window.location.pathname.split("/").pop() || 'index.html';

        links.forEach(link => {
            link.classList.remove('active');
            
            // Pega apenas o final do href do link
            const linkHref = link.getAttribute('href').split("/").pop();

            // Se o final da URL for igual ao final do link, ou se ambos forem "index.html"
            if (currentPath === linkHref || (currentPath === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });

        // Caso especial: se não houver nada ativo após o loop, força no "Atividades"
        const activeExists = this.querySelector('.nav-link.active');
        if (!activeExists) {
            links[0].classList.add('active');
        }
    }
}

// Define o elemento customizado
customElements.define('main-sidebar', MySidebar);