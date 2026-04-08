// 		
// 		
// 		

// Variáveis globais
const tabelContainer = document.querySelector('.table-container');
const dados = [
    {
        conta: 'Google',
        usuario: 'escolatsialuno@gmail.com',
        senha: '@6421722004',
        pagina: 'https://accounts.google.com/signin'
    },
    {
        conta: 'Instagram',
        usuario: 'alunos.tsi',
        senha: '642172',
        pagina: 'https://www.instagram.com/accounts/login/'
    },
    {
        conta: 'Facebook',
        usuario: 'escolatsialuno@gmail.com',
        senha: '642172',
        pagina: 'https://www.facebook.com/login/'
    },
    {
        conta: 'Twitter / X',
        usuario: 'TsiAluno [ou] escolatsialuno@gmail.com',
        senha: '6421722004',
        pagina: 'https://twitter.com/login'
    },
    {
        conta: 'Agile Fingers',
        usuario: 'wandersonmateus2022k@gmail.com',
        senha: '0031982004',
        pagina: 'https://agilefingers.com/pt/entrar'
    }
];

function criarTabela() {
    tabelContainer.innerHTML = '';

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Criar cabeçalho
    const trHeader = document.createElement('tr');
    trHeader.innerHTML = `
        <th>Conta</th>
        <th>Email / Usuário</th>
        <th>Senha</th>
        <th>Página</th>
    `;
    thead.appendChild(trHeader);

    // Criar corpo da tabela
    dados.forEach(dado => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${dado.conta}</td>
            <td>${dado.usuario}</td>
            <td>${dado.senha}</td>
            <td><a href="${dado.pagina}" target="_blank" style="color: var(--color-primary); font-weight: 500;">Ver Página</a></td>
        `;
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tabelContainer.appendChild(table);

}

criarTabela()