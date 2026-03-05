// frontend/scripts/activitiesListLoader.js

// Variáveis globais
const listContainer = document.querySelector('.list');
const radiosModulo = document.querySelectorAll('input[name="modulo"]');
let dados = [];

// Inicialização
init();

async function init() {
    dados = await carregarAtividades();
    atualizarContadores(); // Nova função chamada após carregar os dados
    listarAtividades();
}

// Buscar atividades do Supabase
async function carregarAtividades() {
    try {
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');

        const SUPABASE_URL = 'https://guybjcnaidgnicimkkgv.supabase.co';
        const SUPABASE_ANON_KEY = 'sb_publishable_lTBjKmv9zUDaM-dSZitXfw_7qjqGA0o';

        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        const { data, error } = await supabase
            .from('documents')
            .select('*');

        if (error) {
            throw new Error(`Erro Supabase: ${error.message}`);
        }

        return data.map(doc => {
            const { data: publicData } = supabase.storage
                .from('pdfs')
                .getPublicUrl(doc.file_path);

            return {
                titulo: doc.title,
                modulo: doc.modulo,
                url: publicData.publicUrl
            };
        });

    } catch (erro) {
        console.error('Erro ao carregar atividades:', erro);
        return [];
    }
}

// --- NOVIDADE: Função para atualizar os números (0) no HTML ---
function atualizarContadores() {
    radiosModulo.forEach(radio => {
        const moduloValor = radio.value;
        // Filtra os dados para contar quantos pertencem a este módulo
        const quantidade = dados.filter(atv => atv.modulo === moduloValor).length;
        
        // Encontra o span .count que está dentro da mesma box-option
        const label = radio.parentElement.querySelector('.count');
        if (label) {
            label.textContent = `(${quantidade})`;
        }
    });
}

// Listar atividades filtradas pelo módulo
function listarAtividades() {
    listContainer.innerHTML = '';

    const fragment = document.createDocumentFragment();
    const moduloSelecionado = document.querySelector('input[name="modulo"]:checked')?.value || '';

    const filtradas = dados.filter(atividade => atividade.modulo === moduloSelecionado);

    filtradas.forEach(atividade => {
        const divItem = document.createElement('div');
        divItem.className = 'item';
        divItem.setAttribute('data-modulo', atividade.modulo);

        divItem.innerHTML = `
            <a href="${atividade.url}" target="_blank">
                <span>${atividade.titulo}</span>
                <i class="ri-link"></i>
            </a>
        `;

        fragment.appendChild(divItem);
    });

    listContainer.appendChild(fragment);
}

// Listener dos rádios
radiosModulo.forEach(radio => {
    radio.addEventListener('change', listarAtividades);
});