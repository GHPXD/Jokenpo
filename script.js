// Variáveis do jogo
var jogadorNome;
var jogadorPontos = 0;
var jogadorEscolha = 0;
var computadorEscolha = 0;
var computadorPontos = 0;
var maxPontos = 5;
var jogoAtivo = true;

// Variáveis do histórico
var historicoJogadas = [];
var vitoriasJogador = 0;
var vitoriasComputador = 0;
var empates = 0;

// Função para gerar número aleatório
function sortear(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para traduzir escolha numérica em texto
function traduzirEscolha(numero) {
  const escolhas = {
    1: 'Pedra',
    2: 'Papel',
    3: 'Tesoura'
  };
  return escolhas[numero] || 'Inválido';
}

// Função para selecionar elemento visualmente
function selecionar(tipo, escolha) {
  const elemento = document.getElementById(tipo + '-escolha-' + escolha);
  if (elemento) {
    elemento.classList.add('selecionado');
  }
}

// Função para deselecionar elemento
function deselecionar(tipo, escolha) {
  const elemento = document.getElementById(tipo + '-escolha-' + escolha);
  if (elemento) {
    elemento.classList.remove('selecionado');
  }
}

// Função para exibir mensagem
function mensagem(texto) {
  const elementoMensagem = document.getElementById('mensagem');
  if (elementoMensagem) {
    elementoMensagem.innerHTML = texto;
  }
}

// Função para definir nome do jogador
function definirJogadorNome(nome) {
  const elementoNome = document.getElementById('jogador-nome');
  if (elementoNome) {
    elementoNome.innerHTML = nome;
  }
}

// Função para obter nome válido do jogador
function obterNomeJogador() {
  let nome = prompt("Qual é o seu nome?");
  while (!nome || nome.trim() === "" || nome.length < 2) {
    nome = prompt("Por favor, digite um nome válido (mínimo 2 caracteres):");
  }
  return nome.trim();
}

// Função para calcular o vencedor da rodada
function calcularEscolha(jogador, computador) {
  if (jogador === computador) return 0; // Empate
  
  const vitorias = {
    1: 3, // Pedra vence Tesoura
    2: 1, // Papel vence Pedra
    3: 2  // Tesoura vence Papel
  };
  
  return vitorias[jogador] === computador ? 1 : 2;
}

// Função para somar ponto do jogador
function somarPontoJogador() {
  jogadorPontos++;
  document.getElementById('jogador-pontos').innerHTML = jogadorPontos;
  vitoriasJogador++;
  atualizarEstatisticas();
}

// Função para somar ponto do computador
function somarPontoComputador() {
  computadorPontos++;
  document.getElementById('computador-pontos').innerHTML = computadorPontos;
  vitoriasComputador++;
  atualizarEstatisticas();
}

// Função para adicionar empate
function adicionarEmpate() {
  empates++;
  atualizarEstatisticas();
}

// Função para atualizar estatísticas
function atualizarEstatisticas() {
  document.getElementById('vitorias-jogador').innerHTML = vitoriasJogador;
  document.getElementById('vitorias-computador').innerHTML = vitoriasComputador;
  document.getElementById('empates').innerHTML = empates;
}

// Função para adicionar jogada ao histórico
function adicionarAoHistorico(jogador, computador, resultado) {
  const jogada = {
    jogador: traduzirEscolha(jogador),
    computador: traduzirEscolha(computador),
    resultado: resultado,
    timestamp: new Date().toLocaleTimeString()
  };
  
  historicoJogadas.unshift(jogada); // Adiciona no início
  
  // Limita o histórico a 20 jogadas
  if (historicoJogadas.length > 20) {
    historicoJogadas.pop();
  }
  
  atualizarListaHistorico();
}

// Função para atualizar a lista do histórico
function atualizarListaHistorico() {
  const lista = document.getElementById('lista-historico');
  if (!lista) return;
  
  lista.innerHTML = '';
  
  historicoJogadas.forEach((jogada, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${jogada.timestamp}</strong> - 
      ${jogadorNome}: ${jogada.jogador} vs CPU: ${jogada.computador} 
      <span style="color: ${getCorResultado(jogada.resultado)}; font-weight: bold;">
        ${jogada.resultado}
      </span>
    `;
    lista.appendChild(li);
  });
}

// Função para obter cor do resultado
function getCorResultado(resultado) {
  if (resultado.includes('Empate')) return '#f39c12';
  if (resultado.includes(jogadorNome)) return '#27ae60';
  return '#e74c3c';
}

// Função para verificar vitória
function verificarVitoria() {
  if (jogadorPontos >= maxPontos) {
    mensagem(`🎉 ${jogadorNome} venceu o jogo! Parabéns!`);
    jogoAtivo = false;
    mostrarBotaoReiniciar();
    document.getElementById('jogador').classList.add('vitoria');
    setTimeout(() => {
      document.getElementById('jogador').classList.remove('vitoria');
    }, 2000);
  } else if (computadorPontos >= maxPontos) {
    mensagem('💻 Computador venceu o jogo! Tente novamente!');
    jogoAtivo = false;
    mostrarBotaoReiniciar();
    document.getElementById('computador').classList.add('vitoria');
    setTimeout(() => {
      document.getElementById('computador').classList.remove('vitoria');
    }, 2000);
  }
}

// Função para mostrar botão de reiniciar
function mostrarBotaoReiniciar() {
  document.getElementById('reiniciar').style.display = 'inline-block';
  document.getElementById('toggle-historico').style.display = 'inline-block';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  jogadorPontos = 0;
  computadorPontos = 0;
  jogoAtivo = true;
  
  document.getElementById('jogador-pontos').innerHTML = '0';
  document.getElementById('computador-pontos').innerHTML = '0';
  document.getElementById('reiniciar').style.display = 'none';
  
  mensagem(`${jogadorNome}, escolha uma opção para começar!`);
}

// Função principal do jogo
function jogar(escolha) {
  if (!jogoAtivo) {
    mensagem('Jogo finalizado! Clique em "Jogar Novamente" para reiniciar.');
    return;
  }
  
  jogadorEscolha = escolha;
  selecionar('jogador', jogadorEscolha);
  
  // Pequeno delay para criar suspense
  setTimeout(() => {
    computadorEscolha = sortear(1, 3);
    selecionar('computador', computadorEscolha);
    
    const ganhador = calcularEscolha(jogadorEscolha, computadorEscolha);
    let resultadoTexto = '';
    
    if (ganhador === 0) {
      resultadoTexto = 'Empate! 🤝';
      mensagem(resultadoTexto);
      adicionarEmpate();
    } else if (ganhador === 1) {
      resultadoTexto = `Ponto para ${jogadorNome}! 🎉`;
      mensagem(resultadoTexto);
      somarPontoJogador();
    } else {
      resultadoTexto = 'Ponto para o Computador! 🤖';
      mensagem(resultadoTexto);
      somarPontoComputador();
    }
    
    // Adicionar ao histórico
    adicionarAoHistorico(jogadorEscolha, computadorEscolha, 
      ganhador === 0 ? 'Empate' : 
      ganhador === 1 ? `Vitória de ${jogadorNome}` : 'Vitória do Computador'
    );
    
    // Verificar se alguém ganhou
    verificarVitoria();
    
    // Limpar seleções após um tempo
    setTimeout(() => {
      deselecionar('jogador', jogadorEscolha);
      deselecionar('computador', computadorEscolha);
      
      if (jogoAtivo) {
        mensagem(`${jogadorNome}, faça sua próxima jogada! 
                   Placar: Você ${jogadorPontos} x ${computadorPontos} CPU`);
      }
    }, 2500);
    
  }, 500);
}

// Função para alternar histórico
function toggleHistorico() {
  const historico = document.getElementById('historico');
  const botao = document.getElementById('toggle-historico');
  
  if (historico.style.display === 'none' || historico.style.display === '') {
    historico.style.display = 'block';
    botao.innerHTML = '📊 Ocultar Histórico';
  } else {
    historico.style.display = 'none';
    botao.innerHTML = '📊 Ver Histórico';
  }
}

// Função para limpar histórico
function limparHistorico() {
  if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
    historicoJogadas = [];
    vitoriasJogador = 0;
    vitoriasComputador = 0;
    empates = 0;
    atualizarEstatisticas();
    atualizarListaHistorico();
    mensagem('Histórico limpo! Comece uma nova partida.');
  }
}

// Função para controles de teclado
function configurarTeclado() {
  document.addEventListener('keydown', function(event) {
    if (!jogoAtivo) return;
    
    switch(event.key) {
      case '1':
        jogar(1);
        break;
      case '2':
        jogar(2);
        break;
      case '3':
        jogar(3);
        break;
      case 'r':
      case 'R':
        if (!jogoAtivo) reiniciarJogo();
        break;
      case 'h':
      case 'H':
        toggleHistorico();
        break;
    }
  });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Configurar cliques nos botões
  document.getElementById('jogador-escolha-1').onclick = function() { jogar(1); };
  document.getElementById('jogador-escolha-2').onclick = function() { jogar(2); };
  document.getElementById('jogador-escolha-3').onclick = function() { jogar(3); };
  
  // Configurar botões de controle
  document.getElementById('reiniciar').onclick = reiniciarJogo;
  document.getElementById('toggle-historico').onclick = toggleHistorico;
  document.getElementById('limpar-historico').onclick = limparHistorico;
  
  // Configurar controles de teclado
  configurarTeclado();
  
  // Inicializar jogo
  jogadorNome = obterNomeJogador();
  definirJogadorNome(jogadorNome);
  
  // Atualizar pontuação máxima na tela
  document.getElementById('max-pontos').innerHTML = maxPontos;
  
  // Mensagem inicial
  mensagem(`Bem-vindo ${jogadorNome}! Primeiro a ${maxPontos} pontos vence. Boa sorte! 🍀`);
  
  // Inicializar estatísticas
  atualizarEstatisticas();
});

// Função para salvar dados no localStorage (opcional)
function salvarDados() {
  const dados = {
    jogadorNome,
    vitoriasJogador,
    vitoriasComputador,
    empates,
    historicoJogadas
  };
  localStorage.setItem('jokenpoData', JSON.stringify(dados));
}

// Função para carregar dados do localStorage (opcional)
function carregarDados() {
  const dados = localStorage.getItem('jokenpoData');
  if (dados) {
    const dadosObj = JSON.parse(dados);
    vitoriasJogador = dadosObj.vitoriasJogador || 0;
    vitoriasComputador = dadosObj.vitoriasComputador || 0;
    empates = dadosObj.empates || 0;
    historicoJogadas = dadosObj.historicoJogadas || [];
    atualizarEstatisticas();
    atualizarListaHistorico();
  }
}

// Salvar dados automaticamente
window.addEventListener('beforeunload', salvarDados);
