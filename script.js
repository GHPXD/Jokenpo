// Função para filtrar projetos
function filterProjects(tech) {
    const projects = document.querySelectorAll('#project-grid .project-card');
    projects.forEach(project => {
        if (tech === 'all' || project.dataset.tech === tech) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Função para filtrar certificados
function filterCertificates(tech) {
    const certificates = document.querySelectorAll('#certificates-grid .certificate-card');
    certificates.forEach(certificate => {
        if (tech === 'all' || certificate.dataset.tech === tech) {
            certificate.style.display = 'block';
        } else {
            certificate.style.display = 'none';
        }
    });
}
 
// Função de rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação de entrada de seções
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('fade-out');
    fadeInObserver.observe(section);
});

// Adicionar efeitos hover em ícones
const techIcons = document.querySelectorAll('.tech-icon');
techIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
    });

    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Sessão Mouse

window.requestAnimFrame = function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback);
      }
    );
  };
  
  function init(elemid) {
    let canvas = document.getElementById(elemid),
      c = canvas.getContext("2d"),
      w = (canvas.width = window.innerWidth),
      h = (canvas.height = window.innerHeight);
    c.fillStyle = "rgba(30,30,30,1)";
    c.fillRect(0, 0, w, h);
    return { c: c, canvas: canvas };
  }
  
  window.onload = function () {
    let c = init("canvas").c,
      canvas = init("canvas").canvas,
      w = (canvas.width = window.innerWidth),
      h = (canvas.height = window.innerHeight),
      mouse = { x: false, y: false },
      last_mouse = {};
  
    function dist(p1x, p1y, p2x, p2y) {
      return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
    }
  
    class segment {
      constructor(parent, l, a, first) {
        this.first = first;
        if (first) {
          this.pos = {
            x: parent.x,
            y: parent.y
          };
        } else {
          this.pos = {
            x: parent.nextPos.x,
            y: parent.nextPos.y
          };
        }
        this.l = l;
        this.ang = a;
        this.nextPos = {
          x: this.pos.x + this.l * Math.cos(this.ang),
          y: this.pos.y + this.l * Math.sin(this.ang)
        };
      }
      update(t) {
        this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
        this.pos.x = t.x + this.l * Math.cos(this.ang - Math.PI);
        this.pos.y = t.y + this.l * Math.sin(this.ang - Math.PI);
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
      }
      fallback(t) {
        this.pos.x = t.x;
        this.pos.y = t.y;
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
      }
      show() {
        c.lineTo(this.nextPos.x, this.nextPos.y);
      }
    }
  
    class tentacle {
      constructor(x, y, l, n, a) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.n = n;
        this.t = {};
        this.rand = Math.random();
        this.segments = [new segment(this, this.l / this.n, 0, true)];
        for (let i = 1; i < this.n; i++) {
          this.segments.push(
            new segment(this.segments[i - 1], this.l / this.n, 0, false)
          );
        }
      }
      move(last_target, target) {
        this.angle = Math.atan2(target.y - this.y, target.x - this.x);
        this.dt = dist(last_target.x, last_target.y, target.x, target.y) + 5;
        this.t = {
          x: target.x - 0.8 * this.dt * Math.cos(this.angle),
          y: target.y - 0.8 * this.dt * Math.sin(this.angle)
        };
        if (this.t.x) {
          this.segments[this.n - 1].update(this.t);
        } else {
          this.segments[this.n - 1].update(target);
        }
        for (let i = this.n - 2; i >= 0; i--) {
          this.segments[i].update(this.segments[i + 1].pos);
        }
        if (
          dist(this.x, this.y, target.x, target.y) <=
          this.l + dist(last_target.x, last_target.y, target.x, target.y)
        ) {
          this.segments[0].fallback({ x: this.x, y: this.y });
          for (let i = 1; i < this.n; i++) {
            this.segments[i].fallback(this.segments[i - 1].nextPos);
          }
        }
      }
      // Corpo
      show(target) {
        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
          c.globalCompositeOperation = "lighter";
          c.beginPath();
          c.lineTo(this.x, this.y);
          for (let i = 0; i < this.n; i++) {
            this.segments[i].show();
          }
          c.strokeStyle =
            "hsl(" +
            (this.rand * 90 + 80) +
            ",100%," +
            (this.rand * 60 + 25) +
            "%)";
          c.lineWidth = this.rand * 2;
          c.lineCap = "round";
          c.lineJoin = "round";
          c.stroke();
          c.globalCompositeOperation = "source-over";
        }
      }
      // star
      show2(target) {
        c.beginPath();
        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
          c.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI);
          c.fillStyle = "#7890FB";
        } else {
          c.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI);
          c.fillStyle = "darkcyan";
        }
        c.fill();
      }
    }
  
    let maxl = 200,
      minl = 50,
      n = 30,
      numt = 500,
      tent = [],
      clicked = false,
      target = { x: 0, y: 0 },
      last_target = {},
      t = 0,
      q = 10;
  
    for (let i = 0; i < numt; i++) {
      tent.push(
        new tentacle(
          Math.random() * w,
          Math.random() * h,
          Math.random() * (maxl - minl) + minl,
          n,
          Math.random() * 2 * Math.PI
        )
      );
    }
    function draw() {
      if (mouse.x) {
        target.errx = mouse.x - target.x;
        target.erry = mouse.y - target.y;
      } else {
        target.errx =
          w / 2 +
          ((h / 2 - q) * Math.sqrt(2) * Math.cos(t)) /
            (Math.pow(Math.sin(t), 2) + 1) -
          target.x;
        target.erry =
          h / 2 +
          ((h / 2 - q) * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) /
            (Math.pow(Math.sin(t), 2) + 1) -
          target.y;
      }
  
      target.x += target.errx / 10;
      target.y += target.erry / 10;
  
      t += 0.01;
  
      c.beginPath();
      c.arc(
        target.x,
        target.y,
        dist(last_target.x, last_target.y, target.x, target.y) + 5,
        0,
        2 * Math.PI
      );
      c.fillStyle = "#7890FB";
      c.fill();
  
      for (i = 0; i < numt; i++) {
        tent[i].move(last_target, target);
        tent[i].show2(target);
      }
      for (i = 0; i < numt; i++) {
        tent[i].show(target);
      }
      last_target.x = target.x;
      last_target.y = target.y;
    }
  
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
  
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );
  
    canvas.addEventListener("mouseleave", function (e) {
      mouse.x = false;
      mouse.y = false;
    });
  
    canvas.addEventListener(
      "mousedown",
      function (e) {
        clicked = true;
      },
      false
    );
  
    canvas.addEventListener(
      "mouseup",
      function (e) {
        clicked = false;
      },
      false
    );
  
    function loop() {
      window.requestAnimFrame(loop);
      c.clearRect(0, 0, w, h);
      draw();
    }
  
    window.addEventListener("resize", function () {
      (w = canvas.width = window.innerWidth),
        (h = canvas.height = window.innerHeight);
      loop();
    });
  
    loop();
    setInterval(loop, 1000 / 60);
  };

// Add Certificate Image Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get the modal
  const modal = document.getElementById('certificateModal');
  const modalImg = document.getElementById('modalImage');
  const captionText = document.getElementById('caption');
  const closeBtn = document.getElementsByClassName('close')[0];

  // Get all certificate images
  const certImages = document.querySelectorAll('.certificate-card img');

  // Add click event to each certificate image
  certImages.forEach(img => {
      img.addEventListener('click', function() {
          modal.style.display = "block";
          modalImg.src = this.src;
          captionText.innerHTML = this.parentElement.querySelector('h3').textContent;
      });
  });

  // Close the modal when the close button is clicked
  closeBtn.onclick = function() {
      modal.style.display = "none";
  }

  // Close the modal when clicking outside the image
  modal.onclick = function(event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  }
});

// Navegação Mobile
// Toggle de Navegação Mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle do menu mobile
    hamburgerMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        if (!hamburgerMenu.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        }
    });
    
    // Fechar menu ao redimensionar tela
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            navLinks.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        }
    });
});

// Tratamento de erro para imagens dos projetos
document.addEventListener('DOMContentLoaded', function() {
    const projectImages = document.querySelectorAll('.project-card img');
    
    projectImages.forEach(img => {
        img.addEventListener('error', function() {
            // Criar imagem placeholder personalizada
            this.style.backgroundColor = '#f3f4f6';
            this.style.border = '2px dashed #d1d5db';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#6b7280';
            this.style.fontSize = '14px';
            this.style.fontWeight = '500';
            
            // Substituir por um placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDE5VjVjMC0xLjEtLjktMi0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnpNOC41IDEzLjVsMi41IDMuMDFMMTQuNSAxMmw0LjUgNkg1bDMuNS00LjV6IiBmaWxsPSIjOTk5Ii8+Cjwvc3ZnPgo=';
            this.alt = 'Imagem não encontrada';
        });
        
        // Adicionar loading lazy se não existir
        if (!this.hasAttribute('loading')) {
            this.setAttribute('loading', 'lazy');
        }
    });
});

// Dados dos projetos
const projectsData = {
    'Análise de Reviews Negativos com PySpark': {
        repo: 'https://github.com/GHPXD/Comparison-of-Negative-Movie-Reviews',
        readme: './data/docs/Comparison of Negative Movie Reviews.md',
        tech: ['python', 'pandas', 'pyplot'],
        image: './data/media/projects/Analise_Reviews_PySpark.png',
        category: 'Python'
    },
    'Insight de Casos de Covid-19': {
        repo: 'https://github.com/GHPXD/PJBL-01',
        readme: './data/docs/Run Man Jump.md',
        tech: ['python', 'pandas', 'pyplot'],
        image: './data/media/projects/PyCovid.png',
        category: 'Python'
    },
    'Jump Man Game': {
        repo: 'https://ghpxd.github.io/run-man/',
        readme: './data/docs/Run Man Jump.md',
        tech: ['html', 'css', 'javascript'],
        image: './data/media/projects/jump-man-run.png',
        category: 'JavaScript'
    },
    'Jokenpo Game': {
        repo: 'https://ghpxd.github.io/Jokenpo/',
        readme: './data/docs/Jokenpo.md',
        tech: ['html', 'css', 'javascript'],
        image: './data/media/projects/Jokenpo.png',
        category: 'JavaScript'
    },
    'Sistema Pet Shop': {
        repo: 'https://github.com/GHPXD/PJBL_POO_01',
        readme: './data/docs/projeto5.md',
        tech: ['java'],
        image: './data/media/projects/petshop.jpg',
        category: 'Java'
    }
};

// Variáveis do carrossel
let currentIndex = 0;
let currentFilter = 'all';
let filteredProjects = [];
let carouselInterval;
let isTransitioning = false;

// Função para criar card do projeto
function createProjectCard(projectName, projectData) {
    const techIcons = projectData.tech.map(tech => 
        `<span class="tech-icon ${tech}" title="${tech.charAt(0).toUpperCase() + tech.slice(1)}">
            <i class="${getTechIcon(tech)}"></i>
        </span>`
    ).join('');

    return `
        <div class="carousel-project-card" data-project="${projectName}">
            <div class="carousel-project-image-container">
                <img src="${projectData.image}" alt="${projectName}" loading="lazy">
                <div class="carousel-project-overlay">
                    <h3 class="carousel-project-title">${projectName}</h3>
                </div>
            </div>
            <div class="carousel-project-tech-legend">
                ${techIcons}
            </div>
        </div>
    `;
}

// Função para obter ícone da tecnologia
function getTechIcon(tech) {
    const icons = {
        python: 'fab fa-python',
        java: 'fab fa-java',
        javascript: 'fab fa-js',
        html: 'fab fa-html5',
        css: 'fab fa-css3-alt',
        pandas: 'fas fa-table',
        pyplot: 'fas fa-chart-line'
    };
    return icons[tech] || 'fas fa-code';
}

// Função para filtrar projetos
function filterProjects(tech) {
    currentFilter = tech;
    
    // Atualizar botões ativos
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filtrar projetos
    if (tech === 'all') {
        filteredProjects = Object.keys(projectsData);
    } else {
        filteredProjects = Object.keys(projectsData).filter(
            projectName => projectsData[projectName].category === tech
        );
    }
    
    // Resetar índice
    currentIndex = 0;
    
    // Renderizar carrossel
    renderCarousel();
    
    // Reiniciar autoplay
    startAutoplay();
}

// Função para renderizar o carrossel
function renderCarousel() {
    const carousel = document.getElementById('project-carousel');
    
    if (filteredProjects.length === 0) {
        carousel.innerHTML = '<p>Nenhum projeto encontrado.</p>';
        return;
    }
    
    // Criar projetos duplicados para efeito infinito
    const projectsToRender = [...filteredProjects, ...filteredProjects, ...filteredProjects];
    
    const carouselHTML = projectsToRender.map(projectName => 
        createProjectCard(projectName, projectsData[projectName])
    ).join('');
    
    carousel.innerHTML = carouselHTML;
    
    // Posicionar no meio (segundo conjunto)
    const cardWidth = 350 + 25; // largura do card + gap
    carousel.style.transform = `translateX(-${filteredProjects.length * cardWidth}px)`;
    
    // Adicionar event listeners aos cards
    addCardEventListeners();
}

// Função para mover o carrossel
function moveCarousel(direction) {
    if (isTransitioning || filteredProjects.length === 0) return;
    
    isTransitioning = true;
    const carousel = document.getElementById('project-carousel');
    const cardWidth = 350 + 25; // largura do card + gap
    
    currentIndex += direction;
    
    // Calcular nova posição
    const newPosition = -((filteredProjects.length + currentIndex) * cardWidth);
    carousel.style.transform = `translateX(${newPosition}px)`;
    
    // Após a transição, verificar se precisa resetar
    setTimeout(() => {
        if (currentIndex >= filteredProjects.length) {
            currentIndex = 0;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${filteredProjects.length * cardWidth}px)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 50);
        } else if (currentIndex < 0) {
            currentIndex = filteredProjects.length - 1;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${filteredProjects.length * cardWidth}px)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 50);
        }
        isTransitioning = false;
    }, 800);
}

// Função para autoplay
function startAutoplay() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        moveCarousel(1);
    }, 4000); // Muda a cada 4 segundos
}

// Função para parar autoplay
function stopAutoplay() {
    clearInterval(carouselInterval);
}

// Função para adicionar event listeners aos cards
function addCardEventListeners() {
    const projectCards = document.querySelectorAll('.carousel-project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectName = this.dataset.project;
            const projectData = projectsData[projectName];
            openProjectModal(projectName, projectData);
        });
        
        // Pausar autoplay no hover
        card.addEventListener('mouseenter', stopAutoplay);
        card.addEventListener('mouseleave', startAutoplay);
    });
}

// Função para abrir modal do projeto
function openProjectModal(projectName, projectData) {
    const modal = document.getElementById('projectModal');
    const modalImage = document.getElementById('projectModalImage');
    const modalTitle = document.getElementById('projectModalTitle');
    const modalTech = document.getElementById('projectModalTech');
    const repoButton = document.getElementById('projectRepoButton');
    const readmeButton = document.getElementById('projectReadmeButton');
    
    // Configurar modal
    modalImage.src = projectData.image;
    modalImage.alt = projectName;
    modalTitle.textContent = projectName;
    
    // Configurar tecnologias
    const techIcons = projectData.tech.map(tech => 
        `<span class="tech-icon ${tech}" title="${tech.charAt(0).toUpperCase() + tech.slice(1)}">
            <i class="${getTechIcon(tech)}"></i>
        </span>`
    ).join('');
    modalTech.innerHTML = techIcons;
    
    // Configurar botões
    repoButton.href = projectData.repo;
    readmeButton.onclick = () => loadReadme(projectData.readme);
    
    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Pausar autoplay
    stopAutoplay();
}

// Inicializar carrossel quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar com todos os projetos
    filteredProjects = Object.keys(projectsData);
    renderCarousel();
    startAutoplay();
    
    // Pausar autoplay quando sair da seção
    const projectsSection = document.getElementById('projetos');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoplay();
            } else {
                stopAutoplay();
            }
        });
    });
    observer.observe(projectsSection);
    
    // Event listeners para controles do modal (mantém o código existente)
    setupModalEventListeners();
});

// Função para configurar event listeners do modal (código existente)
function setupModalEventListeners() {
    const projectModal = document.getElementById('projectModal');
    const projectClose = document.querySelector('.project-close');
    const closeReadmeButton = document.getElementById('closeReadmeButton');
    const projectReadmeContent = document.getElementById('projectReadmeContent');
    
    // Fechar modal
    projectClose.addEventListener('click', function() {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        projectReadmeContent.style.display = 'none';
        startAutoplay();
    });
    
    // Fechar modal clicando fora
    projectModal.addEventListener('click', function(event) {
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            projectReadmeContent.style.display = 'none';
            startAutoplay();
        }
    });
    
    // Fechar README
    closeReadmeButton.addEventListener('click', function() {
        projectReadmeContent.style.display = 'none';
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && projectModal.style.display === 'block') {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            projectReadmeContent.style.display = 'none';
            startAutoplay();
        }
    });
}

// Função para carregar README (mantém o código existente)
async function loadReadme(readmePath) {
    const readmeText = document.getElementById('readmeText');
    const projectReadmeContent = document.getElementById('projectReadmeContent');
    
    try {
        const response = await fetch(readmePath);
        if (response.ok) {
            const markdownText = await response.text();
            const htmlContent = parseMarkdown(markdownText);
            readmeText.innerHTML = htmlContent;
            projectReadmeContent.style.display = 'block';
        } else {
            readmeText.innerHTML = '<p>Documentação não encontrada.</p>';
            projectReadmeContent.style.display = 'block';
        }
    } catch (error) {
        readmeText.innerHTML = '<p>Erro ao carregar a documentação.</p>';
        projectReadmeContent.style.display = 'block';
    }
}

// Parser simples de Markdown (mantém o código existente)
function parseMarkdown(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
    
    // Code blocks
    html = html.replace(/``````/gims, '<pre><code>$1</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]*)`/gim, '<code>$1</code>');
    
    // Links
    html = html.replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2" target="_blank">$1</a>');
    
    // Line breaks
    html = html.replace(/\n\n/gim, '</p><p>');
    html = '<p>' + html + '</p>';
    
    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');
    
    return html;
}

// Adicione este código no final do seu script.js

// Variáveis do carrossel de experiência
let currentExperienceIndex = 0;
const totalExperienceCards = 3;

// Função para mover o carrossel de experiência
function moveExperienceCarousel(direction) {
    const carousel = document.getElementById('experience-carousel');
    const cardWidth = window.innerWidth <= 992 ? 100 : 50; // 100% para mobile, 50% para desktop
    
    currentExperienceIndex += direction;
    
    // Loop infinito
    if (currentExperienceIndex >= totalExperienceCards) {
        currentExperienceIndex = 0;
    } else if (currentExperienceIndex < 0) {
        currentExperienceIndex = totalExperienceCards - 1;
    }
    
    // Mover carrossel
    const translateX = -(currentExperienceIndex * cardWidth);
    carousel.style.transform = `translateX(${translateX}%)`;
}

// Adicione este código no final do seu script.js

// Dados dos certificados
const certificatesData = {
    'Certificado Yellow Belt': {
        image: 'Yellow Belt.jpg',
        category: 'diversos'
    },
    'Santander Bootcamp 2023 - Fullstack Java + Angular': {
        image: 'JAVA-ANGULAR.jpg',
        category: 'full'
    },
    'GIT - Básico ao avançado': {
        image: 'Git.jpg',
        category: 'diversos'
    }
};

// Variáveis do carrossel de certificados
let currentCertificateIndex = 0;
let currentCertificateFilter = 'all';
let filteredCertificates = [];
let certificateCarouselInterval;
let isCertificateTransitioning = false;

// Função para criar card de certificado
function createCertificateCard(certificateName, certificateData) {
    return `
        <div class="carousel-certificate-card" data-certificate="${certificateName}">
            <div class="carousel-certificate-image-container">
                <img src="${certificateData.image}" alt="${certificateName}" loading="lazy">
                <div class="carousel-certificate-overlay">
                    <h3 class="carousel-certificate-title">${certificateName}</h3>
                </div>
            </div>
            <div class="carousel-certificate-tag-legend">
                <span class="carousel-certificate-tag ${certificateData.category}">
                    ${getCategoryName(certificateData.category)}
                </span>
            </div>
        </div>
    `;
}

// Função para obter nome da categoria
function getCategoryName(category) {
    const categories = {
        full: 'Fullstack',
        back: 'Back-end',
        front: 'Front-end',
        dados: 'Dados',
        diversos: 'Diversos'
    };
    return categories[category] || category;
}

// Função para filtrar certificados
function filterCertificates(tech) {
    currentCertificateFilter = tech;
    
    // Atualizar botões ativos
    const buttons = document.querySelectorAll('.certificates-filter .filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filtrar certificados
    if (tech === 'all') {
        filteredCertificates = Object.keys(certificatesData);
    } else {
        filteredCertificates = Object.keys(certificatesData).filter(
            certificateName => certificatesData[certificateName].category === tech
        );
    }
    
    // Resetar índice
    currentCertificateIndex = 0;
    
    // Renderizar carrossel
    renderCertificatesCarousel();
    
    // Reiniciar autoplay
    startCertificateAutoplay();
}

// Função para renderizar o carrossel de certificados
function renderCertificatesCarousel() {
    const carousel = document.getElementById('certificates-carousel');
    
    if (filteredCertificates.length === 0) {
        carousel.innerHTML = '<p>Nenhum certificado encontrado.</p>';
        return;
    }
    
    // Criar certificados duplicados para efeito infinito
    const certificatesToRender = [...filteredCertificates, ...filteredCertificates, ...filteredCertificates];
    
    const carouselHTML = certificatesToRender.map(certificateName => 
        createCertificateCard(certificateName, certificatesData[certificateName])
    ).join('');
    
    carousel.innerHTML = carouselHTML;
    
    // Posicionar no meio (segundo conjunto)
    const cardWidth = 350 + 25; // largura do card + gap
    carousel.style.transform = `translateX(-${filteredCertificates.length * cardWidth}px)`;
    
    // Adicionar event listeners aos cards
    addCertificateCardEventListeners();
}

// Função para mover o carrossel de certificados
function moveCertificatesCarousel(direction) {
    if (isCertificateTransitioning || filteredCertificates.length === 0) return;
    
    isCertificateTransitioning = true;
    const carousel = document.getElementById('certificates-carousel');
    const cardWidth = 350 + 25; // largura do card + gap
    
    currentCertificateIndex += direction;
    
    // Calcular nova posição
    const newPosition = -((filteredCertificates.length + currentCertificateIndex) * cardWidth);
    carousel.style.transform = `translateX(${newPosition}px)`;
    
    // Após a transição, verificar se precisa resetar
    setTimeout(() => {
        if (currentCertificateIndex >= filteredCertificates.length) {
            currentCertificateIndex = 0;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${filteredCertificates.length * cardWidth}px)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 50);
        } else if (currentCertificateIndex < 0) {
            currentCertificateIndex = filteredCertificates.length - 1;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${filteredCertificates.length * cardWidth}px)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 50);
        }
        isCertificateTransitioning = false;
    }, 800);
}

// Função para autoplay dos certificados
function startCertificateAutoplay() {
    clearInterval(certificateCarouselInterval);
    certificateCarouselInterval = setInterval(() => {
        moveCertificatesCarousel(1);
    }, 4000); // Muda a cada 4 segundos
}

// Função para parar autoplay dos certificados
function stopCertificateAutoplay() {
    clearInterval(certificateCarouselInterval);
}

// Função para adicionar event listeners aos cards de certificados
function addCertificateCardEventListeners() {
    const certificateCards = document.querySelectorAll('.carousel-certificate-card');
    certificateCards.forEach(card => {
        card.addEventListener('click', function() {
            const certificateName = this.dataset.certificate;
            const certificateData = certificatesData[certificateName];
            openCertificateModal(certificateName, certificateData);
        });
        
        // Pausar autoplay no hover
        card.addEventListener('mouseenter', stopCertificateAutoplay);
        card.addEventListener('mouseleave', startCertificateAutoplay);
    });
}

// Função para abrir modal do certificado (mantendo o zoom atual)
function openCertificateModal(certificateName, certificateData) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    
    modal.style.display = "block";
    modalImg.src = certificateData.image;
    captionText.innerHTML = certificateName;
    
    // Pausar autoplay
    stopCertificateAutoplay();
}

// Inicializar carrossel de certificados quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que o DOM esteja completamente carregado
    setTimeout(() => {
        // Inicializar com todos os certificados
        filteredCertificates = Object.keys(certificatesData);
        renderCertificatesCarousel();
        startCertificateAutoplay();
        
        // Pausar autoplay quando sair da seção
        const certificatesSection = document.getElementById('certificados');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCertificateAutoplay();
                } else {
                    stopCertificateAutoplay();
                }
            });
        });
        observer.observe(certificatesSection);
        
        // Event listeners para o modal (mantendo funcionalidade existente)
        const modal = document.getElementById('certificateModal');
        const closeBtn = document.getElementsByClassName('close')[0];
        
        // Fechar modal
        closeBtn.onclick = function() {
            modal.style.display = "none";
            startCertificateAutoplay();
        }
        
        // Fechar modal clicando fora
        modal.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
                startCertificateAutoplay();
            }
        }
        
        // Fechar modal com ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = "none";
                startCertificateAutoplay();
            }
        });
    }, 200);
});
