<?php
header('Content-Type: application/json');

$data = [
	['name' => 'Даниил', 'lastname' => 'Рыжков'],
	['name' => 'Алексей', 'lastname' => 'Смирнов'],
	['name' => 'Анна', 'lastname' => 'Иванова'],
	['name' => 'Сергей', 'lastname' => 'Петров'],
	['name' => 'Мария', 'lastname' => 'Сидорова'],
	['name' => 'Иван', 'lastname' => 'Кузнецов'],
	['name' => 'Ольга', 'lastname' => 'Попова'],
	['name' => 'Михаил', 'lastname' => 'Васильев'],
	['name' => 'Екатерина', 'lastname' => 'Федорова'],
	['name' => 'Андрей', 'lastname' => 'Николаев'],
	['name' => 'Наталья', 'lastname' => 'Морозова'],
	['name' => 'Владимир', 'lastname' => 'Соловьев'],
	['name' => 'Светлана', 'lastname' => 'Лебедева'],
	['name' => 'Артем', 'lastname' => 'Егоров'],
	['name' => 'Татьяна', 'lastname' => 'Романова'],
	['name' => 'Денис', 'lastname' => 'Орлов'],
	['name' => 'Анастасия', 'lastname' => 'Коваленко'],
	['name' => 'Роман', 'lastname' => 'Григорьев'],
	['name' => 'Елена', 'lastname' => 'Семенова'],
	['name' => 'Максим', 'lastname' => 'Степанов'],
	['name' => 'Юлия', 'lastname' => 'Дмитриева'],
	['name' => 'Игорь', 'lastname' => 'Михайлов'],
	['name' => 'Ксения', 'lastname' => 'Зайцева'],
	['name' => 'Дмитрий', 'lastname' => 'Фролов'],
	['name' => 'Алина', 'lastname' => 'Савельева'],
	['name' => 'Виктор', 'lastname' => 'Сергеев'],
	['name' => 'Полина', 'lastname' => 'Тихонова'],
	['name' => 'Станислав', 'lastname' => 'Савин'],
	['name' => 'Людмила', 'lastname' => 'Солдатова'],
	['name' => 'Александр', 'lastname' => 'Ларин'],
	['name' => 'Вероника', 'lastname' => 'Кузьмина'],
	['name' => 'Никита', 'lastname' => 'Ковалев'],
	['name' => 'Маргарита', 'lastname' => 'Громова'],
	['name' => 'Станислав', 'lastname' => 'Соловьев'],
	['name' => 'Евгений', 'lastname' => 'Лебедев'],
	['name' => 'Тимур', 'lastname' => 'Баранов'],
	['name' => 'Зинаида', 'lastname' => 'Морозова'],
	['name' => 'Артемий', 'lastname' => 'Панфилов'],
	['name' => 'Кирилл', 'lastname' => 'Тарасов'],
	['name' => 'Надежда', 'lastname' => 'Долгова'],
	['name' => 'Ярослав', 'lastname' => 'Гаврилов'],
	['name' => 'София', 'lastname' => 'Шевченко'],
	['name' => 'Анастасия', 'lastname' => 'Лукина'],
];

echo json_encode($data);