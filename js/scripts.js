let mensagens = [];

// entrar na sala
let nomeUsuario = '';

entrarSala();
function entrarSala(){

    nomeUsuario = prompt("Digite o seu nome");
    const dados = { name: nomeUsuario};
    const requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/participants', dados);
    requisicao.catch(tratarError);
}

function tratarError(erro){
    alert("Nome inválido ou já existente. Por favor, tente novamente.");
    entrarSala();
}

// manter conexão com o servidor
setInterval(manterConexao, 5000);

function manterConexao(){
    const dados = {name: nomeUsuario};
    const requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/status', dados);
    requisicao.catch(tratarErrorConexao);
}
function tratarErrorConexao(){
    alert("Você foi desconectado por inatividade! Atualize a página para entrar novamente!")
}

//altera o tamanho da barra de digitar texto quando o usuário clicar
function digitarMensagem(elemento){
    elemento.style.width = '75vw';
}

//pega as mensagens no servidor
setInterval(buscarMensagens, 3000);

function buscarMensagens(){
const promessa = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages');
promessa.then(processarMensagens);
}

function processarMensagens(resposta) {
	mensagens = resposta.data;
    renderizarMensagens();
}


//coloca as mensagens na tela
function renderizarMensagens(){
    const chat = document.querySelector("ul");
    chat.innerHTML = '';
    for(let i = 0; i < mensagens.length; i++){
        if(mensagens[i].type === "status"){
            chat.innerHTML += `
            <h1 class="mensagem entrada-saida">
            <span class="horario">${mensagens[i].time} </span> <strong>${mensagens[i].from}</strong> ${mensagens[i].text} 
            </h1>`;
        }else if(mensagens[i].type === "message"){
            chat.innerHTML += `
            <h1 class="mensagem padrao">
            <span class="horario">${mensagens[i].time} </span> <strong class="remetente">${mensagens[i].from}</strong> <span class="para">para</span>
            <strong class="destinatario">${mensagens[i].to} </strong> <span class="conteudo">${mensagens[i].text}</span>
            </h1>`;
        }else if(mensagens[i].type === "private_message" && mensagens[i].to === nomeUsuario){
            //colocar isso aqui, faz parte do bonus
        }
    } 
    chat.lastChild.scrollIntoView();
}

//enviar mensagens
let mensagemEnviada = [];
function enviarMensagem(elemento){
    mensagemEnviada = document.getElementById("mensagem").value;
    let dados = 
    {
        from: nomeUsuario,
	    to: "Todos",
	    text: mensagemEnviada,
	    type: "message"
    }
    if(mensagemEnviada === ''){

    }else{
        const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages", dados);

    }
    document.getElementById("mensagem").value = '';
    console.log(mensagemEnviada);
}

// buscar participantes ativos
let participantesAtivos = [];

setInterval(buscarParticipantes, 3000);

function buscarParticipantes(){
    const promessa = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/participants');
    promessa.then(processarParticipantes);
}

function processarParticipantes(resposta){
    participantesAtivos = resposta.data;
    adicionarParticipantesAtivos();
}
function adicionarParticipantesAtivos(){
    const div = document.querySelector(".menu-participantes");
    div.innerHTML = '';
    div.innerHTML += `<h2> Escolha um contato para enviar mensagem </h2>
    <div class="participantes"> 
        <div class="participante" onclick="selecionarParticipante(this)">
            <ion-icon class="participante-icone" name="people"></ion-icon>
            <div class="participante-nome">Todos</div>
        </div>
    </div>`;
    for(let i = 0; i < participantesAtivos.length; i++){
        div.innerHTML += `
        <div class="participante" onclick="selecionarParticipante(this)">
            <ion-icon class="participante-icone" name="person"></ion-icon>
            <div class="participante-nome">${participantesAtivos[i].name}</div>
        </div>`;
    }
    div.innerHTML += `
    <div class="visibilidade">
        <h2> Escolha a visibilidade: </h2>
        <div class="publico" onclick="selecionarVisibilidade(this)">
            <ion-icon class="publico-icone" name="lock-open"></ion-icon>
            <div class="publico-nome">Público</div>
        </div>
        <div class="reservadamente" onclick="selecionarVisibilidade(this)">
            <ion-icon class="reservadamente-icone" name="lock-closed"></ion-icon>
            <div class="reservadamente-nome">Reservadamente</div>
        </div>
    </div>`;
}

//menu participantes

function abrirMenuParticipantes(){
    const body = document.querySelector("body");
    
    body.innerHTML += `
    <div class="menu-participantes">
        <h2> Escolha um contato para enviar mensagem </h2>
        <div class="participantes"> 
            <div class="participante" onclick="selecionarParticipante(this)">
                <ion-icon class="participante-icone" name="people"></ion-icon>
                <div class="participante-nome">Todos</div>
            </div>
        </div>
        <div class="visibilidade">
            <h2> Escolha a visibilidade: </h2>
            <div class="publico" onclick="selecionarVisibilidade(this)">
                <ion-icon class="publico-icone" name="lock-open"></ion-icon>
                <div class="publico-nome">Público</div>
            </div>
            <div class="reservadamente" onclick="selecionarVisibilidade(this)">
                <ion-icon class="reservadamente-icone" name="lock-closed"></ion-icon>
                <div class="reservadamente-nome">Reservadamente</div>
            </div>
        </div>
    </div>
    <div class="esquerda-menu" onclick="voltarInicio()">
    </div>
    `;
    
}

function voltarInicio(){
    const body = document.querySelector("body");
    body.removeChild(body.children[7]);
    body.removeChild(body.children[7]);
}

// determinar para quem e de que modo a mensagem será enviada

function selecionarParticipante(elemento){

}

function selecionarVisibilidade(elemento){

}



