 // Alternar entre login e registro com efeito deslizante
        const loginBtn = document.getElementById('login-btn');
        const registerBtn = document.getElementById('register-btn');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const slider = document.querySelector('.slider');
        
        loginBtn.addEventListener('click', function() {
            this.classList.add('active');
            registerBtn.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
            slider.classList.remove('register');
            slider.classList.add('login');
            
            // Atualizar título do formulário
            document.querySelector('.form-title').textContent = 'Bem-vindo de volta!';
            document.querySelector('.form-subtitle').textContent = 'Entre na sua conta para continuar';
        });
        
        registerBtn.addEventListener('click', function() {
            this.classList.add('active');
            loginBtn.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
            slider.classList.remove('login');
            slider.classList.add('register');
            
            // Atualizar título do formulário
            document.querySelector('.form-title').textContent = 'Crie sua conta!';
            document.querySelector('.form-subtitle').textContent = 'Junte-se à nossa comunidade de aprendizado';
        });
        
        // Mostrar/ocultar senha
        function setupPasswordToggle(toggleId, inputSelector) {
            const toggle = document.getElementById(toggleId);
            const input = document.querySelector(inputSelector);
            
            if (toggle && input) {
                toggle.addEventListener('click', function() {
                    if (input.type === 'password') {
                        input.type = 'text';
                        this.innerHTML = '<i class="far fa-eye-slash"></i>';
                    } else {
                        input.type = 'password';
                        this.innerHTML = '<i class="far fa-eye"></i>';
                    }
                });
            }
        }
        
        setupPasswordToggle('password-toggle', '#login-form input[type="password"]');
        setupPasswordToggle('register-password-toggle', '#register-form input[type="password"]:nth-of-type(1)');
        setupPasswordToggle('register-confirm-toggle', '#register-form input[type="password"]:nth-of-type(2)');