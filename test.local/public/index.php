<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>test</title>
	<link rel="stylesheet" href="./global.css">
</head>

<body>
	<div class="container">
		<form class="form-search" action="" method="get">
			<input class="form-search__input" name="search" id="search-input" placeholder="Искать здесь..."
				type="search" autocomplete="off">
			<button class="form-search__btn" type="submit"></button>
			<ul id="suggestions" class="form-search__suggestions-list"></ul> <!-- Список для подсказок -->
		</form>
	</div>

	<script src="./script.js"></script>
</body>

</html>