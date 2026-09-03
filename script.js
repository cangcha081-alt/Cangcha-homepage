(function() {
    'use strict';

    const wechatBtn = document.getElementById('wechatBtn');
    const wechatModal = document.getElementById('wechatModal');
    const closeModalBtn = document.getElementById('closeModal');

    if (wechatBtn && wechatModal) {
        wechatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            wechatModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                wechatModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        wechatModal.addEventListener('click', function(e) {
            if (e.target === wechatModal) {
                wechatModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && wechatModal.classList.contains('active')) {
                wechatModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    const sectionBlocks = document.querySelectorAll('.section-block');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        sectionBlocks.forEach(block => {
            block.style.animationPlayState = 'paused';
            observer.observe(block);
        });
    } else {
        sectionBlocks.forEach(block => {
            block.style.animationPlayState = 'running';
        });
    }

    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.transition = 'transform 0.15s ease';
            this.style.transform = 'scale(0.95)';
        }, { passive: true });

        item.addEventListener('touchend', function() {
            this.style.transition = 'transform 0.3s ease';
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });

    const footer = document.querySelector('.footer p');
    if (footer) {
        const year = new Date().getFullYear();
        footer.innerHTML = footer.innerHTML.replace('2025', year);
    }

    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const skillName = this.textContent.replace('●', '').trim();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(skillName).then(() => {
                    const originalText = this.innerHTML;
                    this.innerHTML = '✓ 已复制';
                    this.style.background = '#E8F5E9';
                    this.style.borderColor = '#4CAF50';
                    this.style.color = '#4CAF50';

                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.background = '';
                        this.style.borderColor = '';
                        this.style.color = '';
                    }, 1200);
                }).catch(() => {});
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = skillName;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    const originalText = this.innerHTML;
                    this.innerHTML = '✓ 已复制';
                    this.style.background = '#E8F5E9';
                    this.style.borderColor = '#4CAF50';
                    this.style.color = '#4CAF50';
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.background = '';
                        this.style.borderColor = '';
                        this.style.color = '';
                    }, 1200);
                } catch (err) {}
                document.body.removeChild(textarea);
            }
        });
    });
})();