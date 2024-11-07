/**
 * Inicializa a transição de tela, ocultando a area de login e exibindo o conteúdo principal.
 */
function initializeMainView() {
    // Adiciona a classe para iniciar a transição do container de login
    $(".login-container").addClass('initialize-main');
    // Adiciona uma classe para a transição do body e ajusta o display
    $("body").addClass('body-transition');
    $("body").css('display', 'flex');
    // Oculta o logotipo e a caixa de login
    $(".logo > p, .login-box").hide();
    // Mostra os ícones do layout principal
    $(".icons").addClass('show-icons');

    $(".layout").show();

    //carrega os dados do usuário e a lista de transações.
    loadUserData();
    getDataList();
}


// Faz uma requisição à API para obter os dados do perfil do usuário e exibi-los no layout.
function loadUserData() {
    // Recupera o token de autenticação do localStorage
    let token = localStorage.getItem("token");

    $.ajax({
        type: 'GET',
        url: './api/api.php?action=profile',
        contentType: "application/json",
        headers: {
            "X-Authorization": token
        },
        success: function(response) {
            // Verifica se a resposta é uma string JSON, caso contrário, converte em JSON
            let jsonResponse = typeof response === "string" ? JSON.parse(response) : response;

            // Atualiza o nome do usuário no layout
            $(".layout-name-user").text(jsonResponse.name);
        },
        error: function(response) {
            console.log(response);
        }
    });
}

/**
 * Envia os dados do formulário de transações via requisição AJAX POST para a API.
 */
function sendFormData() {
    // Escuta a submit do formulário
    $('#layout-submit-form').on('submit', function(event) {
        event.preventDefault(); // Previne o comportamento padrão de recarregar a página

        // Recupera o token de autenticação do localStorage
        let token = localStorage.getItem("token");

        // Cria um objeto com os dados do formulário
        let formData = {
            'value': $("#value").val(),
            'description': $("#description").val(),
            'action': 'create_transaction'
        };

        $.ajax({
            type: 'POST',
            url: './api/api.php',
            data: JSON.stringify(formData), // Serializa os dados para JSON
            contentType: "application/json",
            headers: {
                "X-Authorization": token
            },
            success: function(response) {
                // Verifica se a resposta é uma string JSON, caso contrário, converte em JSON
                let jsonResponse = typeof response === "string" ? JSON.parse(response) : response;

                // Exibe a mensagem de sucesso
                $("#success").css('display', 'block');

                // Verifica se foi criado com sucesso
                if (jsonResponse.status == '201') {
                    // Recarrega a lista de transações após o sucesso
                    getDataList();

                    // Limpa os campos do formulário
                    $("#value, #description").val('');
                    $("#success").text("Transação cadastrada com sucesso.");
                } else {
                    $("#success").text("Erro ao cadastrar transação.");
                }
            },
            error: function(response) {
                console.log(response);
            }
        });
    });
}

/**
 * Faz uma requisição à API para listar as transações e exibi-las no layout.
 */
function getDataList() {
    // Recupera o token de autenticação do localStorage
    let token = localStorage.getItem("token");

    $.ajax({
        type: 'GET',
        url: './api/api.php?action=list_transactions',
        contentType: "application/json",
        headers: {
            "X-Authorization": token
        },
        beforeSend: function() {
            // Mostra a mensagem de carregamento enquanto os dados são buscados
            $("#transactions").html('<div class="loading">Carregando...</div>');
        },
        success: function(response) {
            // Verifica se a resposta é uma string JSON, caso contrário, converte em JSON
            let jsonResponse = typeof response === "string" ? JSON.parse(response) : response;

            // Inverte a ordem dos dados recebidos com transações mais recentes no topo
            jsonResponse.reverse();

            // Monta o HTML das transações dinamicamente
            let html = '';
            jsonResponse.forEach(item => {
                html += `
                    <div class='resume-detail'>
                        <svg class='resume-circle' height="10" width="10">
                            <circle r="3" fill="gray" cx="3" cy="3"></circle>
                        </svg>
                        ${item.value > 0 
                            ? `<div class='positive-transaction'>
                                + R$${item.value.replace('.',',')} 
                                <p class='transaction-text'>${item.description}</p>
                               </div>`
                            : `<div class='negative-transaction'>
                                - R$${item.value.replace('.',',')} 
                                <p class='transaction-text'>${item.description}</p>
                               </div>`
                        }
                    </div>`;
            });

            // Insere o HTML construído na página
            $("#transactions").html(html);
        },
        error: function(response) {
            // Exibe mensagem de erro caso a requisição falhe
            $("#transactions").html('<div class="loading">Erro ao carregar os dados</div>');
        }
    });
}
