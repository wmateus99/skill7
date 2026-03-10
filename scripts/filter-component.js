class ModuleFilter extends HTMLElement {
    constructor() {
        super();
        // Centralize seus dados aqui: fácil de adicionar novos módulos
        this.modules = [
            { id: 'introducao-informatica', value: 'introducao-informatica', label: 'Introdução a Informática' },
            { id: 'windows10', value: 'windows10', label: 'Windows 10' },
            { id: 'windows11', value: 'windows11', label: 'Windows 11', checked: true },
            { id: 'internet', value: 'internet', label: 'Internet' },
            { id: 'ambientes-digitais', value: 'ambientes-digitais', label: 'Ambientes Digitais' },
            { id: 'word', value: 'word', label: 'Word' },
            { id: 'excel-fast', value: 'excel-fast', label: 'Excel Fast' },
            { id: 'excel-essencial', value: 'excel-essencial', label: 'Excel Essencial' },
            { id: 'excel-avancado', value: 'excel-avancado', label: 'Excel Avançado' },
            { id: 'vitrinismo', value: 'vitrinismo', label: 'Vitrinismo' },
            { id: 'powerpoint', value: 'powerpoint', label: 'PowerPoint' },
            { id: 'power-bi', value: 'power-bi', label: 'Power BI' },
            { id: 'photoshop', value: 'photoshop', label: 'Photoshop' },
            { id: 'coreldraw', value: 'coreldraw', label: 'CorelDraw' }
        ];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const optionsHTML = this.modules.map(mod => `
            <div class="box-option">
                <input type="radio" 
                        name="modulo" 
                        value="${mod.value}" 
                        id="${mod.id}" 
                        ${mod.checked ? 'checked' : ''}>
                <label for="${mod.id}" class="label-option">
                    ${mod.label} <span class="count">(0)</span>
                </label>
            </div>
        `).join('');

        this.innerHTML = `
            <div class="filter">
                <form id="form-filtro">
                    ${optionsHTML}
                </form>
            </div>
        `;
    }
}

customElements.define('module-filter', ModuleFilter);