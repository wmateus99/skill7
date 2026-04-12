// Atalhos que você quer bloquear
const atalhosBloqueados = [
    // Combinações com Ctrl
    { ctrl: true, shift: false, key: "s" },  // Ctrl+S
    { ctrl: true, shift: false, key: "p" },  // Ctrl+P
    { ctrl: true, shift: false, key: "u" },  // Ctrl+U
    { ctrl: true, shift: false, key: "c" },  // Ctrl+C
    { ctrl: true, shift: false, key: "v" },  // Ctrl+V
    { ctrl: true, shift: false, key: "x" },  // Ctrl+X
    { ctrl: true, shift: false, key: "a" },  // Ctrl+A

    // Combinações com Ctrl+Shift
    { ctrl: true, shift: true, key: "i" },   // Ctrl+Shift+I (DevTools)
    { ctrl: true, shift: true, key: "j" },   // Ctrl+Shift+J (Console)
    { ctrl: true, shift: true, key: "c" },   // Ctrl+Shift+C (Inspector)
    { ctrl: true, shift: true, key: "k" },   // Ctrl+Shift+K (alguns browsers)

    // F12 (DevTools)
    { ctrl: false, shift: false, key: "F12" }
];

// Bloquear menu de contexto (clique direito)
document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
}, false);

// Bloquear atalhos definidos acima
document.addEventListener("keydown", function (event) {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

    const bloqueado = atalhosBloqueados.some(function (atalho) {
        return atalho.ctrl === event.ctrlKey &&
                atalho.shift === event.shiftKey &&
                atalho.key === key;
    });

    if (bloqueado) {
        event.preventDefault();
        event.stopPropagation();
        // opcional: alert("Atalho desativado.");
    }
}, false);