<?php
function integra($method, $url, $data = null) {

    $ch = curl_init();

    // Verifique se o token foi enviado no cabeçalho
    $headers = [
        'Content-Type: application/json',
    ];

	// Usei um cabeçalho personalizado (X-Authorization) para autorizar possiveis negacao de permisoes do servidor para envio de cabeçalhos
    // Verifica se o cabeçalho X-Authorization foi enviado e adicione ao array
	if (isset($_SERVER['HTTP_X_AUTHORIZATION'])) {
		$headers[] = 'Authorization: ' . $_SERVER['HTTP_X_AUTHORIZATION'];
	} else {
        // Caso contrário, usa um valor padrão de Authorization
		$headers[] = 'Authorization: 8A9B362F-E744-4BEE-8031-39A23FA67E63';
	}

    // Configuração do CURL
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    // Se for uma requisição POST, envia os dados
    if ($method == 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    }

    // Se for uma requisição GET
    if ($method == 'GET') {
        curl_setopt($ch, CURLOPT_HTTPGET, true);
    }

    // Executa a requisição e obtém a resposta
    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
}

// Roteamento das requisições (define qual endpoint vai ser chamado)
// Captura o corpo da requisição JSON
$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($input['action'])) {

        if ($input['action'] === 'login') {

            $url = 'https://southti.com.br/desafio-front-end/user/auth';
            // Autenticar usuario
            echo integra('POST', $url, json_encode($input));

        } elseif ($input['action'] === 'create_transaction') {

            $url = 'https://southti.com.br/desafio-front-end/transaction/create';
            // Cria um novo registro
            echo integra('POST', $url, json_encode($input));

        }

    } else {
        echo json_encode(['error' => 'Action not defined']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {

        if ($_GET['action'] === 'profile') {

            $url = 'https://southti.com.br/desafio-front-end/user/profile';
            // Obtenha dados de usuario
            echo integra('GET', $url);

        } elseif ($_GET['action'] === 'list_transactions') {

            $url = 'https://southti.com.br/desafio-front-end/transaction/list';
            // Obtenha a lista de transações
            echo integra('GET', $url);
        }

    } else {
        echo json_encode(['error' => 'Action not defined']);
    }
}
