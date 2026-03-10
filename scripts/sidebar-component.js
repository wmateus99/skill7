// const btnToggle = document.getElementById('sidebar-toggle')
// const sidebar = document.querySelector('.sidebar')

// let isOpen = true

// function toggle() {
//     console.log(isOpen)
//     sidebar.classList.toggle('sidebar-toggle')
//     isOpen = !isOpen
// }

// function checkMobile() {
//     const mql = window.matchMedia('(max-width: 750px)');
    
//     const handler = (e) => {
//         if (e.matches && isOpen) {
//             toggle();
//         }
//     };
    
//     mql.addEventListener('change', handler);
    
//     if (mql.matches && isOpen) {
//         toggle();
//     }
// }

// checkMobile()

// btnToggle.addEventListener('click', toggle)
class MySidebar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Renderiza o HTML exatamente como o seu original
        this.innerHTML = `
        <aside>
            <div class="sidebar">
                <div class="sidebar-header">
                    <a href="/">
                        <img src="/assets/logotipo.svg" alt="Logo do Site">
                    </a>
                    <button id="sidebar-toggle">
                        <i class="ri-layout-left-2-line"></i>
                    </button>
                </div>
                <div class="sidebar-body">
                    <div class="nav-group">
                        <h3>Início</h3>
                        <a class="nav-link" href="/index.html">Atividades</a>
                    </div>
                    <div class="nav-group">
                        <h3>Seções</h3>
                        <a class="nav-link" href="/pages/noob-mouse.html">1ª Aula</a>
                        <a class="nav-link" href="/pages/auxiliares.html">Auxiliares</a>
                        <a class="nav-link" href="#">Digitação</a>
                    </div>
                    <div class="nav-group">
                        <h3>Outros</h3>
                        <a href="192.168.22.122:8080/index.php?pag=login" target="_blank">Escola Tsi - LOCAL</a>
                        <a href="https://eadon.com.br/sign-in" target="_blank">Escola Tsi - EAD</a>
                        <a href="https://laava.simpleacademy.tech/login" target="_blank">Plataforma EJA</a>
                    </div>
                </div>
                <div class="sidebar-footer">
                    <button onclick="window.location.href = '/pages/sobre.html'">
                        <span>Sobre o Projeto</span>
                    </button>
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