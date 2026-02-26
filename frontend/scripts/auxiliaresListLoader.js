// frontend/scripts/activitiesListLoader.js

// Variáveis globais
const listContainer = document.querySelector('.list');
const dados = [
    {
        title: 'Windows',
        link: 'https://drive.google.com/drive/folders/1auX1teIMz-w93ukfBx3dThOHE0qYT3Jt?usp=sharing'
    },
    {
        title: 'Internet',
        link: 'https://drive.google.com/drive/folders/1V0aVr3A0khKmwG5fzHGb4Vb-qUIKHpPr?usp=sharing'
    },
    {
        title: 'Word',
        link: 'https://drive.google.com/drive/folders/1orTIIsklzm4lXEiI6DgZE0_YEYfMr6G6?usp=sharing'
    },
    {
        title: 'Excel',
        link: 'https://drive.google.com/drive/folders/1VhTV9ai9oc5mEQjhWFdhlYwVIKAHRy2a?usp=sharing'
    },
    {
        title: 'PowerPoint',
        link: 'https://drive.google.com/drive/folders/13BEqqxiIfrCkJzNqWf70MDSqyICh3Fet?usp=sharing'
    },
    {
        title: 'PowerBI',
        link: 'https://drive.google.com/drive/folders/1Jf9s7o3x7InDfYEcsx9Z68_bAgLvsZuO?usp=sharing'
    },
    {
        title: 'CorelDraw',
        link: 'https://drive.google.com/drive/folders/1z3SzmQMh_NKoEThs5vq0BOF8JFNOTps0?usp=sharing'
    },
    {
        title: 'Photoshop',
        link: 'https://drive.google.com/drive/folders/1ddBeXGczle9tA4RXC1eiJL5YNioYmWhu?usp=sharing'
    },
    {
        title: 'Illustrator',
        link: 'https://drive.google.com/drive/folders/1e7UIPQHMSHAphKXGGtgFTZlM4xwzuEn3?usp=sharing'
    }
];

function listarAuxiliares() {
    listContainer.innerHTML = '';

    const fragment = document.createDocumentFragment();

    dados.forEach(dado => {
        const divItem = document.createElement('div');
        divItem.className = 'item';

        divItem.innerHTML = `
            <a href="${dado.link}">
                <span>${dado.title}</span>
                <i class="ri-link"></i>
            </a>
        `;

        fragment.appendChild(divItem);
    });

    listContainer.appendChild(fragment);
}

listarAuxiliares()