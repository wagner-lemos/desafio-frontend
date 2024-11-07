<div class='login-box'>
    <p class='welcome-message'>Olá!<br>Entre com seu login e senha para começar.</p>
    <p class='error-message'>Ops!<br> Invalid username or password</p>

    <!-- submit para a mesma página e não outra página -->
    <form id='login-form' action='.' method='POST'>

        <div class='login-input'>

            <input id='username' type='text' name='username' required onChange='checkInput(this, "#username-done")'>
            <label for='username'>Username</label>
            <img id='username-done' class='login-image' src='./assets/layout-test-assets/done_mini.png'>
            <img id='username-error' class='login-image' src='./assets/layout-test-assets/close_mini.png'>

        </div>

        <div class='login-input'>

            <input id='password' type='password' name='password' required onChange='checkInput(this, "#password-done")'>
            <label for='password'>Password</label>
            <img id='password-done' class='login-image' src='./assets/layout-test-assets/done_mini.png'>
            <img id='password-error' class='login-image' src='./assets/layout-test-assets/close_mini.png'>

        </div>

        <button id='submit-form' type='submit'>Entrar</button>
    </form>
</div>