// Função de inicialização que configura o comportamento inicial ao carregar a página
$(function () {
    loginSubmit();  // Configura o evento de envio do formulário de login.
    sendFormData(); // Configura o envio do formulário de transação.
});

// Executa o submit do formulário de login.
function loginSubmit() {
    $('#login-form').on('submit', function(event) {
        event.preventDefault();  // Previne o comportamento padrão de envio do formulário.

        // Cria o objeto com os dados do formulário de login.
        let formData = {
            'email': $("#username").val(),
            'password': $("#password").val(),
            'action': 'login'  // Ação especificada para o login.
        };

        // Realiza a requisição AJAX para o login.
        $.ajax({
            type: 'POST',
            url: './api/api.php',  // URL da API que processa o login.
            data: JSON.stringify(formData),  // Serializa os dados para JSON.
            contentType: "application/json",  // Define o tipo de conteúdo como JSON.
            beforeSend: function() {
                $(".welcome-message").html('<div class="loading">Autenticando...</div>');
            },
            success: responseSuccessSubmitForm,  // Chama a função de sucesso caso a resposta seja positiva.
            error: function(response) {
                responseErrorSubmitForm();  // Chama a função de erro caso ocorra algum problema.
            }
        });
    });
}

// Função que reseta as mensagens de erro e sucesso, mostrando a mensagem inicial.
function resetMessages() {
    $(".welcome-message").show();
    $(".error-message, #username-error, #password-error").hide();
}

// Função chamada quando o login é bem-sucedido.
function responseSuccessSubmitForm(response) {
    let jsonResponse = typeof response === "string" ? JSON.parse(response) : response;  // Verifica se a resposta é uma string e converte para JSON, se necessário.

    // Se houver sucesso no login
    if (jsonResponse.status == "200") {
        $(".welcome-message").show();  // Mostra a mensagem de boas-vindas.
        $(".error-message").hide();  // Oculta as mensagens de erro.

        localStorage.setItem("token", jsonResponse.token);  // Armazena o token de autenticação no localStorage.

        initializeMainView();  // Chama a função que inicializa a transição para a interface principal.
    }
    else {
        responseErrorSubmitForm();  // Chama a função de erro se falha.
    }
}

// Função chamada quando o login falha, exibe as mensagens de erro.
function responseErrorSubmitForm() {
    $(".welcome-message, #username-done, #password-done").hide();  // Oculta as mensagens de sucesso e ícones de validação.
    $(".error-message, #username-error, #password-error").show();  // Exibe as mensagens de erro.
}

// Verifica o conteúdo de um campo de entrada e exibe um ícone de sucesso se válido.
function checkInput(input, doneImage) {
    let element = $(input);  // Armazena o campo de entrada selecionado.

    resetMessages();  // Reseta as mensagens de estado antes de continuar.

    // Verifica se o campo possui um valor e ainda não foi validado.
    if (element.val() && !element.hasClass('validElement')) {
        $(doneImage).show();  // Exibe o ícone de sucesso.
        element.addClass('validElement');  // Adiciona a classe de validação ao campo de entrada.
    } else {
        // Se o campo estiver vazio, remove o ícone de sucesso e a classe de validação.
        if (!element.val()) {
            $(doneImage).hide();  // Oculta o ícone de sucesso.
            element.removeClass('validElement');  // Remove a classe de validação do campo.
        }
    }
}

// Executa o logout no sistema
function logout() {
    // Remove o token do localStorage
    localStorage.removeItem("token");

    // Opcional: Redirecionar o usuário para a página de login
    window.location.href = './';
}
