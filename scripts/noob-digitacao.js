// Estado
let etapaAtual = 1;
let fraseIndex = 0;
let frasesFeitas = 0;
let fraseAtual = "";

// Elementos
const scoreEl = document.getElementById("score");
const levelName = document.getElementById("level-name");

// Frases
const etapas = {
    1: [
        "treino basico sem acento",
        "digitar rapido melhora",
        "pratica diaria ajuda muito",
        "anotar melhora memoria",
        "foco ritmo e repeticao"
    ],
    2: [
        "O café está ótimo",
        "Você já terminou o exercício?",
        "A água está fria",
        "Ele saiu às pressas",
        "Á, é, í, ó, ú"
    ],
    3: [
        "Você tem o caderno correto?",
        "Eles têm ótimas anotações",
        "Você pôde revisar o conteúdo?",
        "O avô lê com atenção e paciência",
        "A lâmpada acesa ajuda na precisão"
    ],
    4: [
        "Alt Gr + 3 = ³",
        "@ # $ % & * ( )",
        "2² 3³ 1¹",
        "[8 + 9] / (25 - 2)",
        "contato@dominio.com"
    ]
};

// Criar área de jogo
function setup() {
    document.querySelectorAll(".section").forEach(sec => {
        sec.innerHTML = `
            <div class="game-box">
                <div class="texto"></div>
                <input class="input" type="text" autocomplete="off" placeholder="Digite aqui..." />
            </div>
        `;
    });

    iniciar(1);
}

// Iniciar etapa
function iniciar(n) {
    etapaAtual = n;
    fraseIndex = 0;
    frasesFeitas = 0;

    atualizarUI();
    carregarFrase();

    const input = getInput();
    input.value = "";
    input.focus();
}

// UI
function atualizarUI() {
    levelName.textContent = `Nível ${etapaAtual}`;
    scoreEl.textContent = frasesFeitas;

    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active-nav"));
    document.querySelectorAll(".nav-btn")[etapaAtual - 1].classList.add("active-nav");

    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(`s${etapaAtual}`).classList.add("active");
}

// Helpers
function getSection() {
    return document.getElementById(`s${etapaAtual}`);
}

function getInput() {
    return getSection().querySelector(".input");
}

function getTexto() {
    return getSection().querySelector(".texto");
}

// Frase
function carregarFrase() {
    fraseAtual = etapas[etapaAtual][fraseIndex];
    render("");
}

// Render
function render(input) {
    const el = getTexto();
    el.innerHTML = "";

    fraseAtual.split("").forEach((char, i) => {
        const span = document.createElement("span");

        if (input[i] == null) {
            span.textContent = char;
        } else if (input[i] === char) {
            span.textContent = char;
            span.style.color = "green";
        } else {
            span.textContent = char;
            span.style.color = "red";
        }

        el.appendChild(span);
    });
}

// Input global
document.addEventListener("input", (e) => {
    if (!e.target.classList.contains("input")) return;

    const valor = e.target.value;

    render(valor);

    if (valor === fraseAtual) {
        frasesFeitas++;
        fraseIndex++;

        scoreEl.textContent = frasesFeitas;

        if (frasesFeitas >= 5) {
            avancar();
            return;
        }

        carregarFrase();
        e.target.value = "";
    }
});

// Avançar
function avancar() {
    if (etapaAtual < 4) {
        notie.alert({ type: 1, text: "Etapa concluída" });
        setTimeout(() => iniciar(etapaAtual + 1), 700);
    } else {
        notie.alert({ type: 1, text: "Finalizado" });
    }
}

// Navegação manual (HTML usa isso)
function manualJump(n) {
    iniciar(n);
}

// Init
window.addEventListener("DOMContentLoaded", setup);