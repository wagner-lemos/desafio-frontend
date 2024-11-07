<div class='layout'>
    <div class='layout-header'>
        <p class='layout-title'>Titulo</p>

        <div class='layout-exit'>
            <p onclick="logout()" class='layout-name-user'>...</p>
            <img src='./assets/layout-test-assets/arrow_right_in.png'>
        </div>
    </div>

    <div class='layout-boxes'>
        <div class='layout-transactions'>
            <div class='layout-transactions-header'>
                <p>Cadastrar Transações</p>
            </div>

            <div class='layout-transactions-body'>

                <form id='layout-submit-form' action='.' method='POST'>
                    <div id="success"></div>

                    <input id='value' name='value' placeholder='Valor' required type="number" step="0.01">

                    <textarea id='description' rows="4" cols="50" name='description' placeholder='Descrição' required></textarea>

                    <button id='register' type='submit'>Registrar</button>
                </form>
            </div>
        </div>

        <div class='layout-resume'>
            <div class='layout-resume-header'>
                <p>Resumo</p>
            </div>

            <div id='transactions'></div>
        </div>
    </div>
</div>