<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="author" content="Wagner Lemos">
		<meta name="reply-to" content="wagnerlemosce@gmail.com">
		<meta name="description" content="Teste FullStack">

		<title>Desafio Front-End</title>

		<script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>

		<script src="js/login.js"></script>
		<script src="js/main.js"></script>

		<link rel="stylesheet" href="css/fonts.css">
		<link rel="stylesheet" href="css/style.css">
	</head>

	<body>
		<div class='login-container'>
			<div class='logo'>
				<img src='assets/layout-test-assets/ball.png' alt='logo'>
				<p>BOOOL</p>

				<div class='icons'>
					<img src='assets/layout-assets/profile_round.png'>
					<img src='assets/layout-assets/script.png'>
					<img src='assets/layout-assets/notification_bell.png'>
					<img src='assets/layout-assets/message_three_points.png'>
					<img src='assets/layout-assets/money.png'>
					<img src='assets/layout-assets/umbrella_round.png'>
				</div>
			</div>

			<?php require_once('pages/login.php'); ?>
		</div>	

		<?php require_once('pages/home.php'); ?>

	</body>
	
</html>