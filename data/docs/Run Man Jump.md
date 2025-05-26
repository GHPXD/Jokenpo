Jump Man Run 🍄
Um jogo estilo endless runner inspirado no clássico Super Mario Bros, desenvolvido com HTML5, CSS3 e JavaScript vanilla. O jogador controla o João que deve pular sobre obstáculos (canos) para conseguir a maior pontuação possível.

🎮 Características do Jogo
Gameplay simples e viciante: Pule sobre os canos para evitar colisões

Sistema de pontuação: Ganhe pontos automaticamente conforme o tempo

High Score persistente: Seu melhor resultado é salvo no navegador

Efeitos sonoros: Sons de pulo, pontuação e game over

Responsivo: Adaptado para desktop e dispositivos móveis

Modo fullscreen: Experiência imersiva em tela cheia

Sistema de pausa: Pause o jogo a qualquer momento

🎯 Como Jogar
Desktop
Espaço, Seta para cima, W ou Enter: Fazer o João pular

ESC: Pausar/despausar o jogo

Mobile
Toque na tela: Fazer o João pular

Toque durante a pausa: Despausar o jogo

O jogo automaticamente entra em fullscreen em dispositivos móveis

📁 Estrutura do Projeto
text
mario-run/
├── index.html              # Arquivo principal HTML
└── data/
    ├── styles/
    │   └── style.css        # Estilos do jogo
    ├── scripts/
    │   └── script.js        # Lógica do jogo
    ├── images/              # Recursos visuais
    │   ├── mario.gif        # Sprite animado do Mario
    │   ├── game-over.png    # Sprite do Mario derrotado
    │   ├── pipe.png         # Obstáculo (cano)
    │   ├── clouds.png       # Nuvens decorativas
    │   ├── brick.png        # Textura do dialog
    │   ├── fullscreen.png   # Ícone fullscreen
    │   ├── retry.png        # Ícone de retry
    │   └── rotate.png       # Ícone de rotação
    └── sounds/              # Efeitos sonoros
        ├── jump.mp3         # Som de pulo
        ├── jump.ogg         # Som de pulo (formato alternativo)
        ├── game-over.mp3    # Som de game over
        ├── game-over.ogg    # Som de game over (formato alternativo)
        ├── score.mp3        # Som de pontuação
        └── score.ogg        # Som de pontuação (formato alternativo)
🚀 Como Executar
Clone ou baixe todos os arquivos mantendo a estrutura de pastas

Abra o arquivo index.html em qualquer navegador moderno

Clique em START para começar a jogar

Nota: Para melhor experiência, recomenda-se executar através de um servidor local devido às políticas de CORS dos navegadores modernos para arquivos de áudio.

🛠️ Tecnologias Utilizadas
HTML5: Estrutura semântica e elementos de áudio

CSS3: Animações, responsividade e design moderno

JavaScript ES6+: Lógica do jogo com performance otimizada

LocalStorage: Persistência do high score

Fullscreen API: Modo tela cheia

RequestAnimationFrame: Game loop otimizado

📱 Compatibilidade
Navegadores Suportados
Chrome 60+

Firefox 55+

Safari 12+

Edge 79+

Dispositivos
Desktop: Experiência completa com controles de teclado

Tablets: Controles por toque em modo landscape

Smartphones: Controles por toque, requer orientação landscape

⚡ Recursos Técnicos
Performance
Game loop otimizado com requestAnimationFrame

Controle de FPS para consistência

Preload de imagens para carregamento suave

Detecção de colisão precisa com tolerância

Acessibilidade
Suporte a prefers-reduced-motion

Elementos com ARIA labels

Navegação por teclado

Indicadores visuais de foco

Responsividade
Design mobile-first

Breakpoints para diferentes tamanhos de tela

Detecção automática de orientação

Adaptação de controles por dispositivo

🎨 Customização
O jogo utiliza variáveis CSS para facilitar customizações:

css
:root {
    --primary-red: #e52521;
    --text-white: #ffffff;
    --shadow-orange: orange;
    --background-blue: linear-gradient(blue, #87CEEB, #87CEEB, #87CEEB, #E0F6FF);
    --ground-green: green;
}
📈 Funcionalidades Avançadas
Sistema de pausa inteligente: Pausa automática quando a aba perde foco

Detecção de orientação: Aviso para girar dispositivo em portrait

Múltiplos formatos de áudio: Suporte a MP3 e OGG para compatibilidade

Animações suaves: Transições e efeitos visuais polidos

Feedback visual: Indicações claras de estado do jogo

🏆 Sistema de Pontuação
1 ponto a cada 300ms de jogo

Som especial a cada 100 pontos

High score salvo automaticamente

Indicação visual para novos recordes

Divirta-se jogando Jump Man Run! 🎮✨