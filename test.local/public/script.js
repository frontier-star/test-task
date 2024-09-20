const input = document.getElementById('search-input'); // обратился по id к input
const suggestionsContainer = document.getElementById('suggestions'); // обратился по id к подсказке(блоку)

input.addEventListener('input', function () { // Слушаем поле ввода
	const query = input.value; // Сразу сохраняем в переменную
	if (query === '') {
		suggestionsContainer.innerHTML = '';
		suggestionsContainer.style.display = 'none';
		return; // Если строка пустая, в DOM ничего не добавляю, а контейнер подсказки не отображаю
	}

	fetch('./array.php') // Работал через локальный Open Server. Сейчас файл data.php не используется
		.then(response => response.json())
		.then(data => {
			const queryLower = query.toLowerCase();

			// Сначала ищем совпадения по началу строки
			const startsWithSuggestions = data.filter(item =>
				item.name.toLowerCase().startsWith(queryLower) ||
				item.lastname.toLowerCase().startsWith(queryLower)
			);
			//  ищем по вхождению
			const containsSuggestions = data.filter(item =>
				(item.name.toLowerCase().includes(queryLower) ||
					item.lastname.toLowerCase().includes(queryLower)) &&
				!startsWithSuggestions.includes(item) //  Если по началу строки уже было, отбрасываем
			);

			// Объединяем результаты
			const suggestions = [...startsWithSuggestions, ...containsSuggestions].slice(0, 8);

			suggestionsContainer.innerHTML = suggestions.map(item =>
				`<li class="form-search__suggestions-item">${item.name} ${item.lastname}</li>`
			).join('');

			suggestionsContainer.style.display = suggestions.length ? 'block' : 'none';

			document.querySelectorAll('.form-search__suggestions-item').forEach(item => {
				item.addEventListener('click', function () {
					input.value = this.textContent;
					suggestionsContainer.innerHTML = '';
					suggestionsContainer.style.display = 'none';
				});
			});
		});
});