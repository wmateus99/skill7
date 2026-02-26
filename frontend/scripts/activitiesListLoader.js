// frontend/scripts/activitiesListLoader.js

// Variáveis globais
const listContainer = document.querySelector('.list');
const radiosModulo = document.querySelectorAll('input[name="modulo"]');  // Novo: radios
let dados = [];

// Inicialização
init();

async function init() {
    dados = await carregarAtividades();
    listarAtividades();  // Lista inicial com primeiro módulo
}

// Buscar atividades do backend (SQLite via API)
async function carregarAtividades() {
    try {
        const resposta = await fetch('http://localhost:3000/atividades');

        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
        }

        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error('Erro ao carregar atividades:', erro);
        return [];
    }
}

// Listar atividades FILTRADAS pelo módulo selecionado no radio
function listarAtividades() {
    listContainer.innerHTML = '';

    const fragment = document.createDocumentFragment();
    
    // Pega módulo selecionado no radio
    const moduloSelecionado = document.querySelector('input[name="modulo"]:checked')?.value || '';
    
    // Filtra dados pelo campo "modulo" (ignora categoria/tags antigas)
    const filtradas = dados.filter(atividade => atividade.modulo === moduloSelecionado);

    filtradas.forEach(atividade => {
        const divItem = document.createElement('div');
        divItem.className = 'item';
        divItem.setAttribute('data-modulo', atividade.modulo);  // Mudança: só "modulo"

        // Seu HTML original mantido
        divItem.innerHTML = `
            <a href="/pages/frame.html?file=/${atividade.arquivo_path}">
                <span>${atividade.titulo}</span>
                <i class="ri-link"></i>
            </a>
        `;

        fragment.appendChild(divItem);
    });

    listContainer.appendChild(fragment);
}

// Listener para radios: atualiza lista ao mudar módulo
radiosModulo.forEach(radio => {
    radio.addEventListener('change', listarAtividades);
});

// Removeu: funções getSelectValue e submit formFiltro (não usa mais selects)
// Se ainda precisar do formFiltro para outra coisa, mantenha mas ignore para filtro