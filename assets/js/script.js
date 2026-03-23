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
let Doispontos = 2;
let menosUMponto = 1;
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

    const letra = input2.value.toLowerCase();
    input2.value = ""

    if (!letra || letra.length > 1) return;

    const spans = APalavra.querySelectorAll('span');
    let acertos = false;



    for (let contador2 = 0; contador2 < palavraSecreta.length; contador2++) {
        if (palavraSecreta[contador2] === letra) {
            spans[contador2].textContent = letra.toUpperCase();
            acertos = true;
        }
    }
    if (!acertos) {
        erros++;
        total = total - menosUMponto;


        if (!todasASletras.includes(letra)) {
            todasASletras.push(letra);
        }
    }
    else {
        total = total + Doispontos;
    }
    if (total < 0) total = 0;
    pontos.textContent = total;
    chanses.textContent = limite - erros;
    ErroLetras.textContent = todasASletras.join(", ").toUpperCase();



    if (erros >= limite) {
        VaBase.style.display = 'none';
        perdedor.style.display = 'block';
        setTimeout(() => location.reload(),900000);
        return;
    }

    const aindaTemTraco = Array.from(spans).some(span => span.textContent.includes("_"));

    if (!aindaTemTraco) {
        VaBase.style.display = 'none';
        vensedor.style.display = 'block';
        setTimeout(() =>
            location.reload(),900000);
    }
});

