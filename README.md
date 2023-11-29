
# Документация Todo React приложения с использованием Ant Design и mongoDB

### Деплой вы можете посмотруть [тут](https://test-senama-soft-jdays2.vercel.app/)

## Оглавление

1. [Введение](#Введение)
2. [Структура проекта](#Структура)
3. [Стек технологий](#Стек-технологий) 
4. [Описание функционала](#Функционал)
	- [Календарь](#Календарь)
	- [Страница задач](#Board)
	- [Таблица](#Таблица) 
1. [Подключение к MongoDB](#MongoDB)
2. [Адаптивность](#Адаптивность) 
3. [Стили и препроцессор Sass](#Стили)

## Введение

Расширенное Todo приложение представляет собой полнофункциональное фулстек приложение для управления задачами, созданное с использованием библиотеки [Ant Design](https://ant.design/), с своей API на базе MobgoDB.  Это нечто большее. чем обычное Todo приложение. Проект включает в себя календарь, подробную страницу задач и таблицу для удобного просмотра и управления задачами. 

## Структура

Директория проекта содержит следующие ключевые элементы:

- **client**/ : Клиентская часть (React).
    - **src/ :** Код React приложения.
	    - **api/ :** Директория, содержащая модули-сервисы для организации запросов к серверу с помощью **axios**.
	    - **assets/ :**  Хранение асетов, в данном случае шрифтов.
	    - **components/ :** Директория, содержащая подпапки и все **React компоненты**.
		- **calendarRenders/ :** Компоненты для рендеринга ячеек календарей.
		- **tableRenders/ :** Компоненты для рендеринга контента в ячейках таблицы.
		- **ui/ :** Хранение общих ui компонентов (кнопки, иконки), которые требуют более точные настройки или не имеются внутри **Ant Design**.
	     - **hooks/ :** Директория предназначена для хранения пользовательских хуков, которые упрощают и улучшают работу с логикой компонентов.
	     - **pages/ :** Директория представляет собой набор компонентов, каждый из которых отвечает за отображение главных страниц приложения.
	     - **redux/ :** Хранение всех **slice** и store для работы с **reduxToolkit**.
	     - **styles/ :** Директория для работы со стилями с помощью **SASS**.
	     - **utils/ :** предназначена для хранения различных утилит, вспомогательных функций и модулей, которые могут быть использованы в различных частях проекта без вреда для читаемости.
	     - **main.js :** Корневой .js файл для подключения **React**, **Redux** и **react-router-dom**.
	     - **router.js :** отвечает за настройку роутинга приложения и управление переходами между различными страницами на базе **react-router-dom**.

- **server/ :** Серверная (API) часть.
    - **models**/ : Модели mongoose.
    - **index.js**: настройка подключения к **mongoDB** с помощью **Express** и **Node.js**. Подключение к базе данных. Добавление **cors**. Работа с **routs**.

## Стек

Todo приложение использует следующий стек технологий:

- **Frontend**:
	- **React**: JavaScript библиотека для построения пользовательских интерфейсов.
	- **Ant Design**: Библиотека компонентов для React, обеспечивающая стиль и функциональность.
	- **Sass**: Препроцессор для создания стилей.
	- **Redux Toolkit**: Библиотека для управления состоянием приложения в React.
	- **Axios**: Библиотека для выполнения HTTP-запросов.
- **Backend**: 
    - **Node.js**: Среда выполнения JavaScript на стороне сервера.
    - **Express**: Фреймворк для создания веб-приложений на Node.js.
    - **MongoDB**: Документо-ориентированная база данных.

## Функционал

### Календарь

Календарь предоставляет пользователю удобный обзор задач по дням. Каждая ячейка содержит дату и перечень задач для этого конкретного числа. При наведении мыши появляется кнопка, позволяющая добавить новую задачу за выбранный день — удобно, если вам нужно создать задачу с упущенной датой создания.

Переход между днями осуществляется кликом на соответствующей ячейке. При клике по ячейке, если задачи для данного дня существуют, пользователь перейдет на страницу с карточками задач. В противном случае, если задач нет, никаких дополнительных действий не произойдет.

В каждой ячейке календаря отображается только одна задача. Если в этот день есть дополнительные задачи, они отображаются ниже в виде счетчика, указывающего количество доступных задач для открытия при клике. Это обеспечивает компактный и информативный обзор задач в календаре, позволяя пользователям легко управлять своими планами и задачами.

### Board

После клика по дню календаря открывается страница, предоставляющая различные возможности для управления задачами. Здесь пользователи могут фильтровать, редактировать и удалять задачи, делая процесс максимально гибким.

Каждую задачу можно открыть полностью в модальном окне, что обеспечивает более подробный просмотр и возможность редактирования. Это дает пользователям полный контроль над содержимым и параметрами каждой задачи.

Для обеспечения удобства перемещения по датам добавлен небольшой календарь. При клике на этот календарь отображается уменьшенная версия предыдущей страницы, что позволяет быстро переключаться между датами и просматривать списки задач. Кнопка возврата на предыдущую страницу обеспечивает легкий способ вернуться обратно. 

### Таблица

Таблица предоставляет обзор списка задач с использованием пагинации, гибкой фильтрации и сортировки. Каждая задача представлена в виде строки, и пользователи могут легко открыть, редактировать или удалить задачу непосредственно из таблицы, обеспечивая удобное управление задачами.

Функционал таблицы также включает адаптивное отображение для различных размеров экрана. Таблица автоматически скрывает или показывает дополнительные колонки в зависимости от доступного места, обеспечивая удобный просмотр информации. Даже на устройствах с ограниченным экраном пользователи всегда могут полностью просмотреть карточку задачи, воспользовавшись горизонтальным скролом и активными кнопками просмотра и редактирования задачи. 

### Задачи

При создании и редактировании задачи в приложении предоставляется гибкий выбор необходимых параметров. Пользователи могут удобно установить дату дедлайна с помощью календаря, определить направленность задачи (личные или рабочие), а также выбрать срочность, которая влияет на ее приоритет относительно других задач. Возможность указания заголовка и содержания задачи делает процесс более интуитивно понятным.

Если задача просрочит дедлайн, пользователи получат визуальное уведомление в виде иконки, а также соответствующую надпись в разделе "deadline" при подробном просмотре. Для более подробной информации о сроках, пользователи могут навести мышь на иконку около дедлайна.

Дополнительно, приложение предоставляет возможность изменения даты дедлайна, чтобы пользователи могли легко адаптировать планы. Если задача с просроченным дедлайном была завершена, уведомление об этом исчезнет.

## MongoDB

Приложение подключается к базе данных MongoDB с использованием Node.js и Express. Для взаимодействия с базой данных используются сторонние библиотеки, обеспечивающие удобные запросы и обработку данных.

Запросы на сервер из клиентской части осуществляем с помощью axios.

## Адаптивность

Todo приложение полностью адаптивно и легко приспосабливается к различным устройствам и размерам экрана.

## Стили

Стили в приложении разработаны с использованием Ant Design, дополнены кастомными стилями и оформлены с применением препроцессора Sass для легкости сопровождения и модификации.