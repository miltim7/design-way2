// components/contact/contact.js

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formInputs = contactForm ? contactForm.querySelectorAll('.form-input, .form-textarea') : [];
    const submitButton = contactForm ? contactForm.querySelector('.form-submit') : null;
    const submitText = submitButton ? submitButton.querySelector('.submit-text') : null;

    if (!contactForm || !submitButton) return;

    // Валидация email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Показать ошибку
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        
        input.style.borderColor = '#dc2626';
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    // Убрать ошибку
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        
        input.style.borderColor = '';
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    // Валидация формы
    function validateForm() {
        let isValid = true;
        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');

        // Валидация имени
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Введите ваше имя');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Имя должно содержать минимум 2 символа');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // Валидация email
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Введите email');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Введите корректный email');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Валидация сообщения
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Введите сообщение');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        return isValid;
    }

    // Обработка отправки формы
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Анимация отправки
        submitButton.disabled = true;
        if (submitText) {
            submitText.textContent = 'Отправка...';
        }
        submitButton.style.opacity = '0.7';

        // Сбор данных формы
        const formData = {
            name: contactForm.querySelector('#name').value.trim(),
            email: contactForm.querySelector('#email').value.trim(),
            message: contactForm.querySelector('#message').value.trim(),
            timestamp: new Date().toISOString()
        };

        try {
            // Здесь будет реальная отправка на сервер
            // Для демонстрации используем setTimeout
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Успешная отправка
            submitButton.style.background = '#10b981';
            submitButton.style.borderColor = '#10b981';
            if (submitText) {
                submitText.textContent = 'Отправлено!';
            }

            // Показать сообщение об успехе
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <div style="
                    background: #10b981;
                    color: white;
                    padding: 16px;
                    border-radius: 8px;
                    margin-top: 20px;
                    text-align: center;
                    animation: fadeIn 0.3s ease;
                ">
                    <strong>Спасибо!</strong> Ваше сообщение отправлено. Мы свяжемся с вами в течение 2-х часов.
                </div>
            `;
            
            contactForm.appendChild(successMessage);

            // Очистка формы через 3 секунды
            setTimeout(() => {
                contactForm.reset();
                submitButton.style.background = '';
                submitButton.style.borderColor = '';
                if (submitText) {
                    submitText.textContent = 'Отправить заявку';
                }
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                successMessage.remove();
            }, 3000);

        } catch (error) {
            // Ошибка отправки
            console.error('Ошибка отправки формы:', error);
            
            submitButton.style.background = '#dc2626';
            submitButton.style.borderColor = '#dc2626';
            if (submitText) {
                submitText.textContent = 'Ошибка!';
            }

            setTimeout(() => {
                submitButton.style.background = '';
                submitButton.style.borderColor = '';
                if (submitText) {
                    submitText.textContent = 'Отправить заявку';
                }
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }, 2000);
        }
    });

    // Реальная валидация при вводе
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            clearError(this);
        });

        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                clearError(this);
            }
        });
    });

    // Анимация при фокусе
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = '';
        });
    });

    // Анимация иконок при наведении
    const contactIcons = document.querySelectorAll('.contact__icon');
    
    contactIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const paths = this.querySelectorAll('path');
            paths.forEach((path, index) => {
                path.style.transition = `stroke-dashoffset 0.3s ease ${index * 0.1}s`;
            });
        });
    });

    // Плавное появление формы
    const formWrapper = document.querySelector('.contact__form-wrapper');
    
    if (formWrapper && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        formWrapper.style.opacity = '0';
        formWrapper.style.transform = 'translateY(30px)';
        formWrapper.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(formWrapper);
    }
});