/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

document.addEventListener('DOMContentLoaded', () => {
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const menuPrincipal = document.querySelector('#menu-principal');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !expanded);
            menuPrincipal.classList.toggle('active');
        });
    }

    // Header scroll effect
    const header = document.querySelector('#header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scrolled')) {
            header.classList.add('scrolled');
        } else if (currentScroll < lastScroll && header.classList.contains('scrolled')) {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Sistema de tema
    const switchMode = document.getElementById('switch-mode-checkbox');
    const themeText = document.querySelector('.theme-text');
    
    // Função para atualizar o tema
    function updateTheme(isDark) {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeText.textContent = 'Modo Claro';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeText.textContent = 'Modo Escuro';
        }
    }
    
    if (switchMode) {
        // Verifica tema salvo, com dark como padrão
        const savedTheme = localStorage.getItem('theme') || 'dark';
        const isDark = savedTheme === 'dark';
        
        // Aplica o tema salvo
        switchMode.checked = isDark;
        updateTheme(isDark);

        // Adiciona evento de mudança
        switchMode.addEventListener('change', function() {
            const isDark = this.checked;
            updateTheme(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa elementos para animação
    document.querySelectorAll('.skill, .project, .contact-content').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Efeito de glitch no título
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        setInterval(() => {
            glitchText.classList.add('active');
            setTimeout(() => {
                glitchText.classList.remove('active');
            }, 200);
        }, 3000);
    }

    // Melhorar feedback do formulário
    const form = document.getElementById('contato-form');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Feedback visual ao digitar
            input.addEventListener('input', () => {
                if (input.value.length > 0) {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });

            // Feedback ao perder foco
            input.addEventListener('blur', () => {
                if (input.value.length > 0) {
                    input.classList.add('touched');
                }
            });
        });

        // Feedback de envio
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            try {
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
                submitButton.setAttribute('aria-busy', 'true');
                
                // Simular envio
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Feedback de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.setAttribute('role', 'alert');
                successMessage.textContent = 'Mensagem enviada com sucesso!';
                form.appendChild(successMessage);
                
                // Limpar formulário
                form.reset();
                inputs.forEach(input => {
                    input.classList.remove('has-value', 'touched');
                });
                
                // Remover mensagem após 5 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            } catch (error) {
                // Feedback de erro
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.setAttribute('role', 'alert');
                errorMessage.textContent = 'Erro ao enviar mensagem. Tente novamente.';
                form.appendChild(errorMessage);
                
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                submitButton.removeAttribute('aria-busy');
            }
        });
    }

    // Botão Voltar ao Topo
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Melhorar navegação por teclado
    document.addEventListener('keydown', (e) => {
        // Fechar menu ao pressionar Escape
        if (e.key === 'Escape') {
            const menu = document.querySelector('#menu-principal');
            const menuToggle = document.querySelector('.menu-toggle');
            if (menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
        
        // Navegação por Tab
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('user-is-tabbing');
    });

    // Melhorar feedback de scroll
    const scrollElements = document.querySelectorAll('.scroll-fade');
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Inicializar animações
    handleScrollAnimation();

    // Melhorar acessibilidade do tema
    const themeToggle = document.querySelector('.theme-toggle');
    const themeCheckbox = document.querySelector('#switch-mode-checkbox');

    themeToggle.addEventListener('click', () => {
        const checked = themeCheckbox.checked;
        themeToggle.setAttribute('aria-checked', !checked);
    });
});