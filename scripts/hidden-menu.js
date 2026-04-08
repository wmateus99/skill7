const area = document.getElementById('hidden-menu');
const menu = document.getElementById('custom-menu');

// Abre o menu na posição do mouse
area.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    
    menu.style.display = 'block';
    menu.style.left = `${e.pageX}px`;
    menu.style.top = `${e.pageY}px`;
});

// Fecha o menu ao clicar fora (ou em um link)
document.addEventListener('click', () => {
    menu.style.display = 'none';
});

// Fecha o menu com a tecla Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') menu.style.display = 'none';
});

console.log('Hidden Menu Script Carregado!');