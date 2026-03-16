const botaoIniciar = document.getElementById('umBotao');
const VaBase = document.querySelector('.base');
const umSegredo = document.getElementById('plavra-secreta');
const imputShhh = document.getElementById('segredos');
const APalavra = document.querySelector('.palavra-oculta');
const Umpalavras = document.getElementById('Umpalavras');
const input2 = document.getElementById('palavras');
const chanses = document.getElementById('tentativas');
const pontos = document.getElementById('pontos');
const ErroLetras = document.getElementById('letras');
const perdedor = document.getElementById('perdedor');
const vensedor = document.getElementById('vensedor');

let todasASletras = [];
let total = 0;
let erros = 0;
let limite = 6;
let palavraSecreta = "";

botaoIniciar.addEventListener('click', function (event) {
    event.preventDefault();
    palavraSecreta = imputShhh.value.toLowerCase().trim();

    if (palavraSecreta === "") {
        alert("Digite algo antes!");
        return;
    }

    APalavra.innerHTML = "";

    for (let contador = 0; contador < palavraSecreta.length; contador++) {
        const span = document.createElement('span');
        span.textContent = " _";
        APalavra.appendChild(span);
    }
    VaBase.style.display = 'block';
    umSegredo.style.display = 'none';
});

Umpalavras.addEventListener('submit', function (event) {
    event.preventDefault();

    const letra = input2.value.toLowerCase().trim();
    input2.value = ""

    if (!letra || todasASletras.includes(letra)) return;

    const spans = APalavra.querySelectorAll('span');
    let acertos = false;



    for (let contador = 0; contador < palavraSecreta.length; contador++) {
        if (palavraSecreta[contador] === letra) {

            spans[contador].textContent = " " + letra.toUpperCase();
            acertos = true;



        }
    }


    if (!acertos) {
        erros++;
        total =  Math.max(0, total - 1);
    }else {
        total += 2;
    }    

    ErroLetras.textContent = todasASletras.join(", ").toUpperCase(); {
        chanses.textContent = limite - erros;
        pontos.textContent = total;
    }

    if (erros >= limite) {
    VaBase.style.display = 'none';
    perdedor.style.display = 'flex';
    setTimeout(() =>
        location.reload(),
         4000);
        return;
    }


    const ganhou = Array.from(spans).some(virificar => virificar.textContent.includes("_"));

    if (ganhou && palavraSecreta !== "") {
        VaBase.style.display = 'none';
        vensedor.style.display = 'flex';
        setTimeout(() => {
            location.reload();
        }, 4000);
    }
});

