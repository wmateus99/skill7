let score = 0;
let timer = 60;
let loop;
let moveLoop;

const levelHints = {
    1: 'Clique na bola o mais rápido possível.',
    2: 'Arraste os números para a ordem correta.',
    3: 'Dê dois cliques rápidos na bola.',
    4: 'Clique na bola enquanto ela se move.'
};

function manualJump(lvl) {
    stopAll();

    document
        .querySelectorAll('.section')
        .forEach((s) => s.classList.remove('active'));

    document
        .getElementById('s' + lvl)
        .classList.add('active');

    document
        .querySelectorAll('.nav-btn')
        .forEach((b, i) => b.classList.toggle('active-nav', i + 1 === lvl));

    const hint = levelHints[lvl] || '';
    document.getElementById('level-name').innerText = 'Nível ' + lvl + (hint ? ' - ' + hint : '');

    document.getElementById('score').innerText = '0';
    document.getElementById('time').innerText = '--';

    score = 0;

    document
        .querySelectorAll('.btn-start')
        .forEach((b) => b.style.display = 'block');
}

function stopAll() {
    clearInterval(loop);
    clearInterval(moveLoop);

    document
        .querySelectorAll('.target-ball')
        .forEach((b) => {
            b.style.display = 'none';
            b.onclick = null;
            b.ondblclick = null;
        });

    document.getElementById('drag-zone').style.display = 'none';
}

function move(ball) {
    const area = document.getElementById('play-area');
    const rect = area.getBoundingClientRect();

    const pad = 10;
    const maxX = rect.width - ball.offsetWidth - pad;
    const maxY = rect.height - ball.offsetHeight - pad;

    const randomX = Math.floor(Math.random() * (maxX - pad)) + pad;
    const randomY = Math.floor(Math.random() * (maxY - pad)) + pad;

    ball.style.left = randomX + 'px';
    ball.style.top = randomY + 'px';
}

function startS1() {
    document.querySelector('#s1 .btn-start').style.display = 'none';

    const b = document.getElementById('ball1');

    b.style.display = 'flex';
    b.onclick = null;
    b.ondblclick = null;

    score = 0;
    timer = 50;

    document.getElementById('score').innerText = '0';
    document.getElementById('time').innerText = timer + 's';
    b.innerText = 0;

    move(b);

    loop = setInterval(() => {
        timer--;
        document.getElementById('time').innerText = timer + 's';

        if (timer <= 0) {
            stopAll();
            Swal.fire({
                icon: 'error',
                title: 'Tempo Esgotado!',
                text: 'Tente novamente.',
                confirmButtonText: 'Repetir'
            }).then(() => {
                manualJump(1);
            });
        }
    }, 1000);

    b.onclick = () => {
        score++;
        document.getElementById('score').innerText = score;
        b.innerText = score;
        move(b);

        if (score >= 25) {
            stopAll();
            Swal.fire({
                icon: 'success',
                title: 'Nível Completo!',
                text: 'Você completou a primeira etapa! Deseja avançar para a próxima?',
                showCancelButton: true,
                confirmButtonText: 'Sim, avançar',
                cancelButtonText: 'Não, repetir',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    manualJump(2);
                } else {
                    manualJump(1);
                }
            });
        }
    };
}

function startS2() {
    document.querySelector('#s2 .btn-start').style.display = 'none';
    document.getElementById('drag-zone').style.display = 'flex';

    const src = document.getElementById('src');
    const tgt = document.getElementById('tgt');

    src.innerHTML = '';
    tgt.innerHTML = '';

    score = 0;
    document.getElementById('score').innerText = '0';

    let nums = [1,2,3,4,5,6,7,8,9,10].sort(() => Math.random() - 0.5);

    nums.forEach((n) => {
        let d = document.createElement('div');

        d.className = 'draggable';
        d.draggable = true;
        d.innerText = n;

        d.ondragstart = (e) => e.dataTransfer.setData('n', n);

        src.appendChild(d);
    });

    for (let i = 1; i <= 10; i++) {
        let s = document.createElement('div');

        s.className = 'slot';
        s.innerText = i;

        s.ondragover = (e) => e.preventDefault();

        s.ondrop = (e) => {
            let n = e.dataTransfer.getData('n');

            if (n == i) {
                s.classList.add('filled');
                s.innerText = n;

                document
                    .querySelectorAll('.draggable')
                    .forEach((el) => {
                        if (el.innerText == n) {
                            el.style.visibility = 'hidden';
                        }
                    });

                score++;
                document.getElementById('score').innerText = score;

                if (score >= 10) {
                    stopAll();
                    Swal.fire({
                        icon: 'success',
                        title: 'Nível Completo!',
                        text: 'Você completou a segunda etapa! Deseja avançar para a próxima?',
                        showCancelButton: true,
                        confirmButtonText: 'Sim, avançar',
                        cancelButtonText: 'Não, repetir',
                        reverseButtons: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            manualJump(3);
                        } else {
                            manualJump(2);
                        }
                    });
                }
            }
        };

        tgt.appendChild(s);
    }
}

function startS3() {
    document.querySelector('#s3 .btn-start').style.display = 'none';

    const b = document.getElementById('ball3');

    b.style.display = 'flex';

    b.onclick = null;
    b.ondblclick = null;

    score = 0;
    document.getElementById('score').innerText = '0';
    b.innerText = 0;

    move(b);

    b.ondblclick = () => {
        score++;
        document.getElementById('score').innerText = score;
        b.innerText = score;
        move(b);

        if (score >= 25) {
            stopAll();
            notie.alert({ type: 1, text: 'Próxima Etapa!', time: 3 })
            manualJump(4);
        }
    };
}

function startS4() {
    document.querySelector('#s4 .btn-start').style.display = 'none';

    const b = document.getElementById('ball4');

    b.style.display = 'flex';

    b.onclick = null;
    b.ondblclick = null;

    score = 0;
    document.getElementById('score').innerText = '0';
    b.innerText = 0;

    move(b);

    moveLoop = setInterval(() => move(b), 2000);

    b.onclick = () => {
        score++;
        document.getElementById('score').innerText = score;
        b.innerText = score;

        clearInterval(moveLoop);
        move(b);
        moveLoop = setInterval(() => move(b), 2000);

        if (score >= 25) {
            stopAll();
            Swal.fire({
                icon: 'success',
                title: 'Treinamento Finalizado!',
                text: 'Parabéns! Você completou todas as etapas. Quer partir para o próximo desafio?',
                showCancelButton: true,
                confirmButtonText: 'Sim, avançar',
                cancelButtonText: 'Não, repetir',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    redirecionarDigitacao('/pages/noob-digitacao.html')
                } else {
                    manualJump(4);
                }
            });
        }
    };
}

function redirecionarDigitacao(url) {
    setTimeout(function() {
        window.location.href = url;
    }, 1000);
}
function redirecionarMouse(url) {
    setTimeout(function() {
        window.location.href = url;
    }, 1000);
}