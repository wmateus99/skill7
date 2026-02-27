(function() {
    'use strict';

    let overlay = null;
    let resolvePromise;

    function createModal() {
        overlay = document.createElement('div');
        overlay.className = 'my-alert-overlay';
        overlay.style.display = 'none';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-labelledby', 'alert-title');
        overlay.innerHTML = `
            <div class="my-alert-modal" role="document" tabindex="-1">
                <div class="my-alert-header" id="alert-title"></div>
                <div class="my-alert-body"></div>
                <div class="my-alert-footer"></div>
            </div>
        `;
        document.body.appendChild(overlay);
        
        // Foco automático no modal
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close(null);
        });
    }

    function show(type, title, message, defaultValue = '') {
        if (!overlay) {
            createModal();
        }

        return new Promise((resolve) => {
            resolvePromise = resolve;

            const modal = overlay.querySelector('.my-alert-modal');
            const header = overlay.querySelector('.my-alert-header');
            const body = overlay.querySelector('.my-alert-body');
            const footer = overlay.querySelector('.my-alert-footer');

            // Limpa tudo
            header.textContent = title || 'Aviso';
            body.innerHTML = '';
            footer.innerHTML = '';

            // Mensagem
            const msgElement = document.createElement('p');
            msgElement.textContent = message || 'Mensagem vazia.';
            body.appendChild(msgElement);

            let input = null;
            if (type === 'prompt') {
                input = document.createElement('input');
                input.type = 'text';
                input.className = 'my-alert-input';
                input.placeholder = message ? 'Digite aqui...' : message;
                input.value = defaultValue;
                input.setAttribute('aria-label', 'Campo de entrada');
                body.appendChild(input);
            }

            // Botões
            const btnOK = document.createElement('button');
            btnOK.className = 'my-alert-btn my-alert-btn--ok';
            btnOK.textContent = 'OK';

            if (type === 'alert') {
                btnOK.addEventListener('click', () => close(true));
                footer.appendChild(btnOK);
            } else {
                const btnCancel = document.createElement('button');
                btnCancel.className = 'my-alert-btn my-alert-btn--cancel';
                btnCancel.textContent = 'Cancelar';
                btnCancel.addEventListener('click', () => close(null));

                footer.appendChild(btnCancel);
                footer.appendChild(btnOK);

                btnOK.addEventListener('click', () => {
                    close(type === 'prompt' ? (input?.value || '') : true);
                });
            }

            // Mostra e foca
            overlay.style.display = 'flex';
            modal.focus();

            function close(value) {
                if (overlay) {
                    overlay.style.display = 'none';
                }
                resolve(value);
            }
        });
    }

    // API pública simples
    window.myAlert = {
        alert(message, title) {
            return show('alert', title, message);
        },
        confirm(message, title) {
            return show('confirm', title, message).then(result => result === true);
        },
        prompt(message, title, defaultValue) {
            return show('prompt', title, message, defaultValue || '');
        }
    };

    // ESC funciona só com modal aberto
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay && overlay.style.display === 'flex') {
            if (resolvePromise) {
                resolvePromise(null);
            }
            overlay.style.display = 'none';
        }
    });

    console.log('✅ myAlert carregado - invisível até usar!');
})();


// // Tipo 1: OK + Cancelar (retorna true/false)
// if (myAlert.confirm('Deseja excluir?')) {
//     console.log('Excluído');
// }

// // Tipo 2: Apenas OK
// myAlert.alert('Operação concluída!');

// // Tipo 3: Input + OK/Cancelar (retorna valor ou null)
// const nome = myAlert.prompt('Digite seu nome:');
// if (nome) console.log('Nome:', nome);