🎮 Jokenpô - Pedra, Papel e Tesoura
Um jogo clássico de Pedra, Papel e Tesoura desenvolvido com HTML, CSS e JavaScript vanilla, com design moderno e funcionalidades avançadas.

🚀 Demonstração
![Jokenpô Game](https://ghpxd.github.io/Jokenpo/)

🎯 Gameplay
Sistema de pontuação: Primeiro a chegar em 5 pontos vence

Jogabilidade intuitiva: Clique nas opções ou use as teclas 1, 2, 3

Feedback visual: Animações e efeitos para cada jogada

Mensagens dinâmicas: Acompanhe o progresso do jogo em tempo real

📊 Estatísticas e Histórico
Histórico completo: Registro das últimas 20 jogadas

Estatísticas detalhadas: Vitórias, derrotas e empates

Timestamps: Horário de cada jogada

Persistência: Dados salvos automaticamente no navegador

🎨 Design e UX
Interface moderna: Design glassmorphism com gradientes

Totalmente responsivo: Funciona em desktop, tablet e mobile

Animações suaves: Transições e efeitos visuais

Acessibilidade: Suporte a leitores de tela e navegação por teclado

⌨️ Controles
Mouse: Clique nas opções de pedra, papel ou tesoura

Teclado:

1 - Pedra

2 - Papel

3 - Tesoura

R - Reiniciar jogo

H - Mostrar/ocultar histórico

🛠️ Tecnologias Utilizadas
HTML5: Estrutura semântica e acessível

CSS3:

Flexbox para layout responsivo

Gradientes e animações CSS

Media queries para responsividade

Variáveis CSS para consistência

JavaScript ES6+:

Manipulação do DOM

LocalStorage para persistência

Event listeners e controles de teclado

Algoritmo de jogo otimizado

📁 Estrutura do Projeto
text
jokenpo/
├── index.html          # Estrutura principal
├── styles.css          # Estilos e animações
├── script.js           # Lógica do jogo
├── img/                # Imagens do jogo
│   ├── pedra.png
│   ├── papel.png
│   └── tesoura.png
└── README.md           # Documentação
🚀 Como Executar
Clone ou baixe o projeto

bash
git clone https://github.com/GHPXD/Jokenpo
Navegue até a pasta do projeto

bash
cd jokenpo
Abra o arquivo index.html no navegador

Duplo clique no arquivo, ou

Arraste para o navegador, ou

Use um servidor local (Live Server, etc.)

🎮 Como Jogar
Digite seu nome quando solicitado

Escolha sua jogada: Clique em Pedra, Papel ou Tesoura

Acompanhe o resultado: O computador fará sua escolha automaticamente

Primeiro a 5 pontos vence o jogo

Use o histórico para acompanhar suas estatísticas

📋 Regras
Pedra vence Tesoura

Papel vence Pedra

Tesoura vence Papel

Escolhas iguais resultam em empate

🌟 Funcionalidades Avançadas
💾 Persistência de Dados
Histórico de jogadas salvo automaticamente

Estatísticas preservadas entre sessões

Dados armazenados no localStorage do navegador

📱 Responsividade
Layout adaptável para todas as telas

Otimizado para dispositivos móveis

Interface touch-friendly

♿ Acessibilidade
Suporte completo a leitores de tela

Navegação por teclado

Alto contraste de cores

Textos alternativos em imagens

🎨 Customização
Alterar Pontuação Máxima
javascript
// No arquivo script.js, linha 8
var maxPontos = 5; // Altere para o valor desejado
Personalizar Cores
css
/* No arquivo styles.css, altere as variáveis de cor */
#jogador {
  background: linear-gradient(135deg, #e17055, #f39c12);
}
🔧 Possíveis Melhorias
 Modo multiplayer online

 Diferentes níveis de dificuldade da IA

 Sistema de ranking global

 Efeitos sonoros

 Temas personalizáveis

 Torneios e campeonatos

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.