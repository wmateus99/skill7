class AdminAtividades {
    constructor() {
        this.API_BASE = 'http://localhost:3000';
        this.init();
    }

    init() {
        this.bindEvents();
        this.carregarAtividades();
    }

    bindEvents() {
        document
            .getElementById('formAtividade')
            .addEventListener('submit', (e) => this.cadastrarAtividade(e));
    }

    async carregarAtividades() {
        try {
            const response = await fetch(`${this.API_BASE}/atividades`);
            const atividades = await response.json();
            this.renderizarLista(atividades);
        } catch (error) {
            console.error('Erro ao carregar atividades:', error);
            document.getElementById('listaAtividades').innerHTML =
                '<div class="empty-state"> Erro ao carregar atividades</div>';
        }
    }

    async cadastrarAtividade(event) {
        event.preventDefault();

        const formData = new FormData();
        const titulo = document.getElementById('titulo').value;
        const modulo = document.getElementById('modulo').value;
        const arquivo = document.getElementById('arquivo').files[0];

        formData.append('titulo', titulo);
        formData.append('modulo', modulo);
        formData.append('arquivo', arquivo);

        try {
            const response = await fetch(`${this.API_BASE}/atividades`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Atividade cadastrada com sucesso!');
                this.resetForm();
                this.carregarAtividades();
            } else {
                const error = await response.json();
                alert(`Erro: ${error.error}`);
            }
        } catch (error) {
            alert('Erro na conexão com o servidor');
            console.error(error);
        }
    }

    async excluirAtividade(id) {
        if (!confirm('Tem certeza que deseja excluir esta atividade?')) {
            return;
        }

        try {
            const response = await fetch(`${this.API_BASE}/atividades/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Atividade excluída com sucesso!');
                this.carregarAtividades();
            } else {
                alert('Erro ao excluir atividade');
            }
        } catch (error) {
            alert('Erro ao excluir atividade');
            console.error(error);
        }
    }

    async editarTitulo(id, tituloAtual) {
        const novoTitulo = prompt('Editar título da atividade:', tituloAtual);

        if (novoTitulo === null) {
            return;
        }

        const tituloTrim = novoTitulo.trim();

        if (!tituloTrim) {
            alert('O título não pode ser vazio.');
            return;
        }

        try {
            const response = await fetch(`${this.API_BASE}/atividades/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ titulo: tituloTrim })
            });

            if (response.ok) {
                alert('Título atualizado com sucesso!');
                this.carregarAtividades();
            } else {
                alert('Erro ao atualizar título');
            }
        } catch (error) {
            alert('Erro ao atualizar título');
            console.error(error);
        }
    }

    resetForm() {
        document.getElementById('formAtividade').reset();
    }

    renderizarLista(atividades) {
        const container = document.getElementById('listaAtividades');

        if (!atividades || atividades.length === 0) {
            container.innerHTML =
                '<div class="empty-state"> Nenhuma atividade cadastrada</div>';
            return;
        }

        container.innerHTML = atividades
            .map(
                (atividade) => `
                <div class="atividade-item">
                    <div class="atividade-info">
                        <h3>${atividade.titulo}</h3>
                        <p><strong>Módulo:</strong> ${atividade.modulo}</p>
                        <p><strong>Arquivo:</strong> ${
                            atividade.arquivo_path.split('/').pop()
                        }</p>
                    </div>
                    <div class="atividade-actions">
                        <button class="btn btn-edit" 
                        onclick="admin.editarTitulo(${atividade.id}, '${atividade.titulo.replace(/'/g, "\\'")}')">
                        Editar
                        </button>
                        <a href="/${atividade.arquivo_path}" 
                            target="_blank" 
                            class="btn btn-download">
                            Download
                        </a>
                        <button class="btn btn-danger" 
                                onclick="admin.excluirAtividade(${atividade.id})">
                            Excluir
                        </button>
                    </div>
                </div>
            `
            )
            .join('');
    }
}

const admin = new AdminAtividades();
