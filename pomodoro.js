var segundos = 60;
var minutos;
var minutosRelogio = document.getElementById("minutos");

var velocidadeSegundos = 1000;

var pararSetInterval;

var valorParaResetar;

var notificacaoSom = new Audio("pristine-609.mp3");


/*===FAZER BOTOES PAUSAR/RESETAR/CONTINUAR  APARECER SUMIR E SER ATIVAVEL=========== */
let botaoAlterarPause = document.getElementById("button_pausar");
let esconderBotaoResetar = document.getElementById("button_resetar");
let esconderBotaoContinuar = document.getElementById("continuar_tempo");
let funcionarBotaoPausarLongo = document.getElementById("tempo_longo");
let funcionarBotaoPausarMedio = document.getElementById("tempo_medio");
let funcionarBotaoPausarCurto = document.getElementById("tempo_curto");

botaoAlterarPause.disabled = true

function alterarExibicoesBotoes() {
    button_pausar.classList.add("show");
    button_resetar.classList.remove("show");
    continuar_tempo.classList.remove("show");
    botaoAlterarPause.disabled = false
}

/*=============FUNÇAO PARA DESCER CONTADOR=================== */
function descerContador() {
    if (segundos > 0) {
        segundos--;
    }
    else if (segundos == 0 && minutos > 0) {
        minutos--;
        segundos = 59;
        if (minutos < 10) {
            minutos = "0" + minutos;
        }
    }
    else if (minutos == 0 && segundos == 0) {
        notificacaoSom.play();
        botaoAlterarPause.disabled = true
        button_pausar.classList.remove("show");
        clearInterval(pararSetInterval);
        if (!window.Notification) return; {
            Notification
                .requestPermission()
                .then(showNotification)
        }

    }
    if (segundos < 10) {
        segundos = "0" + segundos
    }
    if (segundos == 0) {
        segundos = "0" + "0"
    }
    
    document.getElementById('segundos').innerHTML = segundos;
    document.getElementById('minutos').innerHTML = minutos;
}

/*============25 MINUTOS ==============*/
function tempoLongo() {
    alterarExibicoesBotoes();
    valorParaResetar = 25;
    minutos = 24
    reset()
    pararSetInterval = setInterval(descerContador, velocidadeSegundos)
}

/*============15 MINUTOS ==============*/
function tempoMedio() {
    alterarExibicoesBotoes();
    valorParaResetar = 15;
    minutos = 14
    reset()
    pararSetInterval = setInterval(descerContador, velocidadeSegundos)
}

/*============5 MINUTOS ==============*/
function tempoCurto() {
    alterarExibicoesBotoes();
    valorParaResetar = 5;
    minutos = 4
    reset()
    pararSetInterval = setInterval(descerContador, velocidadeSegundos)
    minutos = minutos < 10 ? "0" + minutos : minutos;
}

/*===============================PAUSAR============================= */
function pausar() {
    clearInterval(pararSetInterval)
    button_resetar.classList.add("show");
    continuar_tempo.classList.add("show");
    button_pausar.classList.remove("show");
    botaoAlterarPause.disabled = true
}

/*============RESETAR MINUTOS ==============*/
function resetar() {
    voltarInicio()
    reset()
    button_resetar.classList.remove("show");
    continuar_tempo.classList.remove("show")
}

function voltarInicio() {
    if (valorParaResetar == 25) {
        minutosRelogio.innerHTML = 25;
    } else if (valorParaResetar == 15) {
        minutosRelogio.innerHTML = 15;
    } else {
        minutosRelogio.innerHTML = "0" + 5;
    }
    document.getElementById('segundos').innerHTML = "0" + 0;

}

function reset() {
    segundos = 60;
    clearInterval(pararSetInterval)
}

function segundosAlterarTempo() {
    segundos = 00;
    clearInterval(pararSetInterval)
}
/*============================CONTINUAR======================== */
function botaoContinuar() {
    pararSetInterval = setInterval(descerContador, velocidadeSegundos)
    button_resetar.classList.remove("show");
    continuar_tempo.classList.remove("show")
    button_pausar.classList.add("show");
    botaoAlterarPause.disabled = false
}

/*=====================BOTAO INPUT ALTERAR TEMPO=============== */
let inputTempo = document.getElementById("input_tempo");

function verificarValorInput(){
    minutos = inputTempo.value
    if(minutos == 0){
        alert("coloque um outro numero");
        clearInterval(pararSetInterval)
        voltarInicio()
    }else{    
        segundosAlterarTempo();
        minutos = inputTempo.value;
        if(minutos < 10) minutos = "0" + inputTempo.value
        document.getElementById('segundos').innerHTML = "0" + 0;
        minutosRelogio.innerHTML = minutos;
        pararSetInterval = setInterval(descerContador, velocidadeSegundos)
        botaoAlterarPause.disabled = false;
        button_pausar.classList.add("show");
        continuar_tempo.classList.remove("show")
        button_resetar.classList.remove("show");    
    }
}

/*================ NOTIFICACAO ACABOU O TEMPO ============== */

function showNotification(permission) {
    if (permission !== 'granted') return;
    let notification = new Notification('acabou o tempo', {
        body: "Volte para a pagina e resete seu cronometro Sz",
        icon: "https://i.pinimg.com/originals/2b/5b/d0/2b5bd0751bff12b15544375643c64324.jpg"
    })
}