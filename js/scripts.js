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

// 

//altera o tamanho da barra de digitar texto quando o usuário clicar
function digitarMensagem(elemento){
    elemento.style.width = '80vw';
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




