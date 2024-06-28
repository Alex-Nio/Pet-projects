// modified: root/path/folder/file.js
// modified: root/path/folder/file.svg
// modified: root/path/folder/file.htm
// js, htm, html, svg, jpg, gif, css

document.addEventListener('DOMContentLoaded', function () {
	//!-----------------Переменные-----------------//
	let generateBtn = document.querySelector('.generate-btn'),
		mainTxtArea = document.querySelector('.main'),
		mainTxtAreaParent = document.querySelector('.entry-point'),
		//Destinations
		fullResultDestination = document.querySelector('.field-full__result'),
		uatResultDestination = document.querySelector('.field-uat__result'),
		localServerResultDestination = document.querySelector('.field-local__result'),
		productionResultDestination = document.querySelector('.field-prod__result'),
		//Field actions(btns and other)
		uatFieldActions = document.querySelector('.field-uat .field-actions'),
		prodFieldActions = document.querySelector('.field-prod .field-actions'),
		localFieldActions = document.querySelector('.field-local .field-actions'),
		//Letters main actions
		lettersMainActions = document.querySelector('.letters-field .field-actions'),
		// Letter links
		uatLetterLinksDestination = document.querySelector('.uat-letter__links'),
		prodLetterLinksDestination = document.querySelector('.prod-letter__links'),
		letterLinksArr = document.querySelectorAll('.links'),
		//Letters other
		inputsArr = lettersMainActions.querySelectorAll('input'),
		textName = document.querySelectorAll('.reporters-name'),
		jobNumber = document.querySelectorAll('.job-number'),

		// Roots (whole root is disabled)
		uatRootPath = 'https://UAT';
	prodRootPath = 'https://PROD';
	localServerRootPath = 'https://Local';



	//!-----------------Модификаторы-----------------//
	// Перебираем массив, заносим ключи в переменную, удаляем пустышки, склеиваем значения
	function jointValues(pathValues, extValues, resultFieldSelector, rootPathValue) {
		let i = pathValues.length;

		for (let i = 0; i < pathValues.length; i++) {
			let finalValue = { Path: `${pathValues[i]}${extValues[i]}` };

			Object.keys(finalValue).forEach(key => {
				if (finalValue[key] === undefined || finalValue[key] === "undefined") {
					delete finalValue[key];
					delete finalValue;
				} else {
					// console.log(finalValue);
					// Приводим к строке и закидываем результат в поле
					finalValue = String(finalValue[key]);

					resultFieldSelector.innerHTML += `                   
                            <div class="result-item">
                                <input id="done" type="text" value="${rootPathValue}${finalValue}" id="myInput">
                                <button class="btn copy-btn">Copy</button>
                            </div>
                        `;
				}
			});
		}
	}

	//? Добавляем точку ко всем расширениям файлов в новый массив
	function addDot(extentions) {
		extentions.forEach(function (item, i, arr) {
			let dot = ".";
			return arr[i] = dot + arr[i];
		});

		return extentions;
	}

	//? Фильтр для путей к файлам
	function pathToRootFilter(array) {
		return array = array.filter(function (element) {
			return element !== undefined && element !== "js" && element !== "html" && element !== "htm" &&
				element !== "svg" && element !== "jpg" && element !== "gif" && element !== "css";
		});
	}

	//? Генерация html, htm ссылок 
	function htmExtfilter(destinationSelector, itemSelector, pathToJoint) {
		let allLinks = fullResultDestination.querySelectorAll('.result-item'),
			fieldText = document.querySelectorAll('.field p');

		// Dafault text remove
		removeTextItem(fieldText);

		// Поиск ссылок
		function linksFinder(links) {
			for (let i = 0; i < allLinks.length; i++) {
				let linkField = allLinks[i],
					input = linkField.querySelector('input');

				// ССЫЛКА, Индекс + 1, Назначение
				htmlFilter(input, i, destinationSelector);
			}
		}

		// Фильтруем по имени файла
		function htmlFilter(input, i, destinationSelector) {
			let htmReg = /\.htm/gmi, // проверка на .htm
				htmlReg = /\.html/gmi; // проверка на .html

			// Если РАСШИРЕНИЕ ССЫЛКИ совпадает с .htm или .html
			if (input.value.match(htmReg) || input.value.match(htmlReg)) {
				// Приводим значение к строке
				let pathString = input.value.toString();
				// сажаем в тюрьму путь из общего поля
				pathPrison = pathString.split('/')[0];
				// Приводим к виду: /папка.../файл.хтмл
				pathString = pathString.replace(pathPrison, '');

				// кладём куда надо
				destinationSelector.innerHTML += `
                        <div class="result-item">
                            <input type="text" value="${pathToJoint}${pathString}">
                            <a class="link" href="${pathToJoint}${pathString}" target="_blank">Open</a>
                            <button class="btn copy-btn">Copy</button>
                        </div>
                    `;

			} else { }
		}

		linksFinder(allLinks);
	}

	//? Default Text remove
	function removeTextItem(items) {
		items.forEach(item => {
			if (!item.parentNode.classList.contains('uat-letter__result') && !item.parentNode.classList.contains('prod-letter__result')) {
				item.remove();
			} else {
			}
		});
	}

	//? Конструктор строки
	function stringConstructor(item) {
		// Убираем приписку modified, подставляем / в начало строки
		item = item.replace(/modified:/g, '/');
		// Убираем пробелы
		item = item.replace(/\s/g, '');
		// Убираем переносы строки
		item = item.replace(/\\n/g, '');
		// Убираем кавычки
		item = item.replace(/"/g, '');

		return item;
	}

	//? Конструктор пути файла
	function pathConstructor(string, regularExpression) {
		return string.split(regularExpression).filter(function (element) {
			return element !== undefined;
		});
	}

	//? Конструктор расширений файлов
	function fileExtConstructor(array) {
		array.forEach((item, i) => {
			// удаляем пустышки
			if (item == undefined || item === null || item === '') {
				delete item;
			}
		});

		// удаляем последний элемент т.к. он всегда пустой
		let i = array.length - 1;
		array.pop(i);

		return array.filter((item, index) => index % 2);
	}

	//? Выбираем значение из поля и копируем
	function copyFunc(resultToCopy) {
		let resultItem = resultToCopy;

		if (resultItem.nodeName === 'INPUT') {
			resultItem.innerHTML += resultItem.value;
		} else {

		}

		resultItem.select();
		document.execCommand("copy");
	}

	//? Убираем фейковые поля с текстом
	function clearTextField(inner) {
		inner.remove();
	}

	//? Clear All Inputs
	function clearAll(items) {
		items.forEach(item => {
			item.innerHTML = "";
		});
	}

	//!-----------------Кнопки-----------------//
	//? Кнопка-генератор. Главная кнопка
	generateBtn.addEventListener('click', function () {
		// Проверка на статус кнопки
		if (this.disabled == false) {
			// Генерируем ссылки
			genarateLinks(mainTxtArea);
			transferToLetter(uatResultDestination, '.result-item', uatLetterLinksDestination);
			transferToLetter(productionResultDestination, '.result-item', prodLetterLinksDestination);
			// Отключаем кнопку
			this.disabled = true;
		}
	});

	//? "Включатель кнопки + очистка полей"
	mainTxtArea.addEventListener('input', function () {
		generateBtn.disabled = false;

		// Массив расположений
		let destinations = [
			fullResultDestination,
			uatResultDestination,
			localServerResultDestination,
			productionResultDestination
		]

		clearAll(destinations);
		clearAll(letterLinksArr);
	});

	//? Кнопка COPY
	//* Функционал кнопки скопировать
	// вешаем обработчик на весь блок, ловим клик, выбираем значение и копируем
	function copy(blockClass) {
		blockClass.addEventListener('click', function (e) {
			let copyBtn = e.target;

			// Вычисляем нужную кнопку скопировать и её поле видимости
			if (copyBtn.parentNode.classList.contains('result-item') && copyBtn.classList.contains('copy-btn')) {
				let resutField = copyBtn.parentNode.querySelector('input');
				copyFunc(resutField);
			}
		});
	}

	//? Кнопка COPY ALL
	function copyAll(actionsSelector) {
		actionsSelector.addEventListener('click', function (e) {
			let resultFieldParent = actionsSelector.parentNode.parentNode,
				resultFields = resultFieldParent.querySelectorAll('.result-item'),
				textInner = document.createElement('textarea'),
				arr = [];

			for (let i = 0; i < resultFields.length; i++) {
				let elem = resultFields[i];
				elem = elem.firstElementChild.value.toString();
				arr.push(elem);
			}

			for (let i = 0; i < arr.length; i++) {
				const element = arr[i];
				textInner.innerHTML += element.toString() + '\n';
				uatResultDestination.appendChild(textInner);
			}

			copyFunc(textInner); // Копируем все поля из переменной
			clearTextField(textInner); // Удаляем поле
		});
	}

	//? ПИСЬМА СКОПИРОВАТЬ
	let copyLetterBtn = document.querySelectorAll('.copy-letter');
	copyLetterBtn.forEach(btn => {
		let btnParent = btn.parentNode.parentNode;

		btn.addEventListener('click', function () {
			let letter = btnParent.querySelector('.letter');
			var range = document.createRange();
			range.selectNode(letter);
			window.getSelection().removeAllRanges();
			window.getSelection().addRange(range);
			document.execCommand("copy");
		});
	});

	//!-----------------Письма-----------------//

	//? Letters
	// Перебираем все инпуты и фильтруем по дата-атрибуту
	for (let i = 0; i < inputsArr.length; i++) {
		let input = inputsArr[i];
		let inputData = input.getAttribute('data-type');

		if (inputData == 'name') {
			input.addEventListener('input', function () {
				textName.forEach(str => {
					let regExp = /^[a-zA-Z]+$/g;

					if (input.value.match(regExp)) {
						input.style.cssText = 'border: 1px solid transparent';
						str.innerHTML = str.innerHTML.replace("Name", "");
						str.innerHTML = "Dear " + input.value.charAt(0).toUpperCase() + input.value.slice(1);
					} else {
						input.style.cssText = 'border: 1px solid red';
					}
				});
			});
		} else if (inputData == 'job') {
			input.addEventListener('input', function () {
				jobNumber.forEach(str => {
					let regExp = /^\d+$/g;

					if (!input.value.match(regExp)) {
						input.style.cssText = 'border: 1px solid red';
					} else {
						input.style.cssText = 'border: 1px solid transparent';
						str.innerHTML = "Job " + input.value;
					}
				});
			});
		}
	}

	//? Links transfer
	function transferToLetter(parent, items, destination) {
		let links = parent.querySelectorAll(items);

		links.forEach(link => {
			let linkVal = link.querySelector('input').value;
			linkVal = linkVal + "<br>";
			destination.innerHTML += linkVal;
		});
	}

	//!-----------------Главное-----------------//
	//? Главная-функция: Модификатор входящего значения
	function modifyEnterValue(mainValue) {
		// Приводим вхождение к строке
		let str = JSON.stringify(mainValue),
			regExp = /\.([0-9a-z]+)|(\.js)|(\.html)|(\.htm)|(\.svg)|(\.jpg)|(\.gif)|(\.css)$/gmi,
			path = [],
			extentions = [];

		// *----------------Функции---------------------!
		str = stringConstructor(str); // Конструктор строки
		path = pathConstructor(str, regExp); // Формируем массив путей к файлам
		extentions = fileExtConstructor(path); // Фильтруем каждый второй ключ[расширение файла] в массив расширений
		path = pathToRootFilter(path); // Очищаем массив путей от расширений
		addDot(extentions); // Добавляем точку к каждому типу файла

		jointValues(path, extentions, fullResultDestination, 'fileFolder'); //? ALL-Поле

		//? Фильтрация html,htm ССЫЛОК 
		htmExtfilter(uatResultDestination, '.result-item', uatRootPath); // UAT Links Maker
		htmExtfilter(productionResultDestination, '.result-item', prodRootPath); // Prod Links
		htmExtfilter(localServerResultDestination, '.result-item', localServerRootPath); // Local Server Links

		copy(fullResultDestination);
		copy(uatResultDestination);
		copy(productionResultDestination);
		copy(localServerResultDestination);

		copyAll(uatFieldActions);
		copyAll(prodFieldActions);
		copyAll(localFieldActions);
	}
	//?  Главная-функция: Функция-мост для полей. 
	//?  Передаёт из главного поля отфильтрованный результат
	function genarateLinks(mainItem, resultItem) {
		let mainValue = mainItem.value;
		// Модифицируем вхождение
		mainValue = modifyEnterValue(mainValue);
	};
});

// Удалить конечный файл
// console.log("root/folder/img.jpg".split( '/' ).slice( 0, -1 ).join( '/' ));
