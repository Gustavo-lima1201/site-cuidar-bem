// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona a classe 'carregado' ao body para mostrar o site
    setTimeout(() => {
        document.body.classList.add('carregado');
        console.log('Animação de carregamento concluída');
    }, 100);

    // Troca todas as imagens com data-src pelo src real (carregamento imediato)
    document.querySelectorAll('img[data-src]').forEach(function(img) {
        var realSrc = img.getAttribute('data-src');
        if (realSrc) {
            img.setAttribute('src', realSrc);
            img.classList.add('carregada');
            img.removeAttribute('data-src');
            console.log(`Imagem carregada: ${realSrc}`);
        }
    });

    // Ativa links de navegação suave
    document.querySelectorAll('.link-navegacao').forEach(link => {
        link.addEventListener('click', function(evento) {
            evento.preventDefault();
            const idDestino = this.getAttribute('href');
            const secaoDestino = document.querySelector(idDestino);
            if (secaoDestino) {
                const alturaCabecalho = document.querySelector('.cabecalho')?.offsetHeight || 0;
                const posicaoDestino = secaoDestino.offsetTop - alturaCabecalho;
                window.scrollTo({
                    top: posicaoDestino,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de cartões ao rolar
    function animarElementosVisiveis() {
        const cartoes = document.querySelectorAll('.cartao-servico, .cartao-equipe, .cartao-depoimento');
        cartoes.forEach(cartao => {
            const topoCartao = cartao.getBoundingClientRect().top;
            const fundoCartao = cartao.getBoundingClientRect().bottom;
            if (topoCartao < window.innerHeight && fundoCartao > 0) {
                cartao.classList.add('visivel');
            }
        });
    }
    animarElementosVisiveis();
    window.addEventListener('scroll', animarElementosVisiveis);

    // Efeito de header transparente ao rolar
    function aplicarEfeitoCabecalho() {
        const cabecalho = document.querySelector('.cabecalho');
        if (!cabecalho) return;
        if (window.scrollY > 50) {
            cabecalho.classList.add('transparente');
        } else {
            cabecalho.classList.remove('transparente');
        }
    }
    aplicarEfeitoCabecalho();
    window.addEventListener('scroll', aplicarEfeitoCabecalho);

    // Efeitos de hover para cartões (desktop)
    function adicionarEfeitoHoverCartao(cartoes) {
        cartoes.forEach(cartao => {
            cartao.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            cartao.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    if (window.innerWidth > 768) {
        adicionarEfeitoHoverCartao(document.querySelectorAll('.cartao-servico'));
        adicionarEfeitoHoverCartao(document.querySelectorAll('.cartao-equipe'));
        adicionarEfeitoHoverCartao(document.querySelectorAll('.cartao-depoimento'));
    }

    // Cartões de contato: clique para ação
    document.querySelectorAll('.cartao-contato').forEach(cartao => {
        cartao.addEventListener('click', function() {
            const tipo = this.getAttribute('data-tipo');
            switch (tipo) {
                case 'telefone':
                    window.open('tel:+5511999999999', '_self');
                    break;
                case 'email':
                    window.open('mailto:contato@cuidarbem.com?subject=Solicitação de Informações - CuidarBem', '_self');
                    break;
                case 'localizacao':
                    window.open('https://maps.google.com/?q=São Paulo, SP, Brasil', '_blank');
                    break;
            }
        });
    });

    // Navegação por teclado (Alt+1, Alt+2, ...)
    document.addEventListener('keydown', function(evento) {
        if (evento.altKey) {
            const secoes = ['#inicio', '#servicos', '#equipe', '#depoimentos', '#contato'];
            const numeroTecla = parseInt(evento.key);
            if (numeroTecla >= 1 && numeroTecla <= secoes.length) {
                evento.preventDefault();
                const secao = document.querySelector(secoes[numeroTecla - 1]);
                if (secao) {
                    const alturaCabecalho = document.querySelector('.cabecalho')?.offsetHeight || 0;
                    const posicaoDestino = secao.offsetTop - alturaCabecalho;
                    window.scrollTo({
                        top: posicaoDestino,
                        behavior: 'smooth'
                    });
                }
            }
        }
    });

    // Depuração básica
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('%c🏥 CuidarBem - Sistema de Informações', 'color: #2563eb; font-size: 16px; font-weight: bold;');
        console.log('📱 Dispositivo móvel:', window.innerWidth <= 768);
        console.log('📏 Dimensões da janela:', window.innerWidth + 'x' + window.innerHeight);
        console.log('🔄 User Agent:', navigator.userAgent);
        console.log('🌐 Idioma:', navigator.language);
        console.log('⏰ Carregado em:', new Date().toLocaleString('pt-BR'));
    }
});