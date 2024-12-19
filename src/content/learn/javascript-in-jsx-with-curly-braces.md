---
title: JavaScript в JSX в фигурных скобках
---

<Intro>

JSX позволяет писать HTML-подобную разметку внутри файла JavaScript, сохраняя логику рендеринга и содержимое в одном месте. Иногда вам захочется добавить немного логики JavaScript или сослаться на динамическое свойство внутри этой разметки. В такой ситуации вы можете использовать фигурные скобки в JSX, чтобы открыть окно для JavaScript.

<details>
<summary><small>(eng)</small></summary>

JSX lets you write HTML-like markup inside a JavaScript file, keeping rendering logic and content in the same place. Sometimes you will want to add a little JavaScript logic or reference a dynamic property inside that markup. In this situation, you can use curly braces in your JSX to open a window to JavaScript.

</details>

</Intro>

<YouWillLearn>

* Как передавать строки с кавычками
* Как ссылаться на переменную JavaScript внутри JSX с помощью фигурных скобок
* Как вызвать функцию JavaScript в JSX используя фигурные скобки
* Как использовать объект JavaScript внутри JSX с помощью фигурных скобок

<details>
<summary><small>(eng)</small></summary>

* How to pass strings with quotes
* How to reference a JavaScript variable inside JSX with curly braces
* How to call a JavaScript function inside JSX with curly braces
* How to use a JavaScript object inside JSX with curly braces

</details>

</YouWillLearn>

## Передача строк в кавычках {/*passing-strings-with-quotes*/}

Когда вы хотите передать строковый атрибут в JSX, вы заключаете его в одинарные или двойные кавычки:

<details>
<summary><small>(eng)</small></summary>

When you want to pass a string attribute to JSX, you put it in single or double quotes:

</details>

<Sandpack>

```js
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}
```

```css
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

Здесь `«https://i.imgur.com/7vQD0fPs.jpg»` и `«Gregorio Y. Zara»` передаются как строки.

Но что, если вы хотите динамически указать текст `src` или `alt`? Вы можете **использовать значение из JavaScript, заменив `"` и `"` на `{` и `}`**:

<details>
<summary><small>(eng)</small></summary>

Here, `"https://i.imgur.com/7vQD0fPs.jpg"` and `"Gregorio Y. Zara"` are being passed as strings.

But what if you want to dynamically specify the `src` or `alt` text? You could **use a value from JavaScript by replacing `"` and `"` with `{` and `}`**:

</details>

<Sandpack>

```js
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```

```css
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

Обратите внимание на разницу между `className=«avatar»`, который указывает имя класса CSS `«avatar»`, делающего изображение круглым, и `src={avatar}`, который считывает значение переменной JavaScript `avatar`. Это потому, что фигурные скобки позволяют работать с JavaScript прямо в разметке!

<details>
<summary><small>(eng)</small></summary>

Notice the difference between `className="avatar"`, which specifies an `"avatar"` CSS class name that makes the image round, and `src={avatar}` that reads the value of the JavaScript variable called `avatar`. That's because curly braces let you work with JavaScript right there in your markup!

</details>

## Использование фигурных скобок: Окно в мир JavaScript {/*using-curly-braces-a-window-into-the-javascript-world*/}

JSX - это особый способ написания JavaScript. Это означает, что можно использовать JavaScript внутри него - с фигурными скобками `{ }`. В приведенном ниже примере сначала объявляется имя ученого, `name`, а затем оно помещается с помощью фигурных скобок внутрь `<h1>`:

<details>
<summary><small>(eng)</small></summary>

JSX is a special way of writing JavaScript. That means it’s possible to use JavaScript inside it—with curly braces `{ }`. The example below first declares a name for the scientist, `name`, then embeds it with curly braces inside the `<h1>`:

</details>

<Sandpack>

```js
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>{name}'s To Do List</h1>
  );
}
```

</Sandpack>

Попробуйте изменить значение `name` с ``Грегорио Й. Зара`` на ``Хеди Ламарр``. Видите, как изменился заголовок списка?

Любое выражение JavaScript будет работать между фигурными скобками, включая вызовы функций вроде `formatDate()`:

<details>
<summary><small>(eng)</small></summary>

Try changing the `name`'s value from `'Gregorio Y. Zara'` to `'Hedy Lamarr'`. See how the list title changes?

Any JavaScript expression will work between curly braces, including function calls like `formatDate()`:

</details>


<Sandpack>

```js
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}
```

</Sandpack>

### Где использовать фигурные скобки {/*where-to-use-curly-braces*/}

В JSX фигурные скобки можно использовать только двумя способами:

1. **Как текст** непосредственно внутри тега JSX: `<h1>{name}'s To Do List</h1>` работает, а `<{tag}>Gregorio Y. Zara's To Do List</{tag}>` - нет.

2. **Как атрибуты** сразу после знака `=`: `src={avatar}` прочитает переменную `avatar`, а `src="{avatar}"` передаст строку `"{avatar}"`.

<details>
<summary><small>(eng)</small></summary>

You can only use curly braces in two ways inside JSX:

1. **As text** directly inside a JSX tag: `<h1>{name}'s To Do List</h1>` works, but `<{tag}>Gregorio Y. Zara's To Do List</{tag}>` will not.

2. **As attributes** immediately following the `=` sign: `src={avatar}` will read the `avatar` variable, but `src="{avatar}"` will pass the string `"{avatar}"`.

</details>

## Использование «двойных фигурных скобок»: CSS и другие объекты в JSX {/*using-double-curlies-css-and-other-objects-in-jsx*/}

Помимо строк, чисел и других выражений JavaScript, в JSX можно передавать даже объекты. Объекты также обозначаются фигурными скобками, например `{ имя: «Хеди Ламарр», изобретения: 5 }`. Поэтому, чтобы передать объект JS в JSX, нужно обернуть его в другую пару фигурных скобок: `person={{ name: «Hedy Lamarr», inventions: 5 }}`.

Подобное можно наблюдать при использовании встроенных стилей CSS в JSX. React не требует использования встроенных стилей (классы CSS отлично подходят для большинства случаев). Но когда вам нужен встроенный стиль, вы передаете объект в атрибут `style`:

<details>
<summary><small>(eng)</small></summary>

In addition to strings, numbers, and other JavaScript expressions, you can even pass objects in JSX. Objects are also denoted with curly braces, like `{ name: "Hedy Lamarr", inventions: 5 }`. Therefore, to pass a JS object in JSX, you must wrap the object in another pair of curly braces: `person={{ name: "Hedy Lamarr", inventions: 5 }}`.

You may see this with inline CSS styles in JSX. React does not require you to use inline styles (CSS classes work great for most cases). But when you need an inline style, you pass an object to the `style` attribute:

</details>

<Sandpack>

```js
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

```css
body { padding: 0; margin: 0 }
ul { padding: 20px 20px 20px 40px; margin: 0; }
```

</Sandpack>

Попробуйте изменить значения `backgroundColor` и `color`.

Вы действительно можете увидеть объект JavaScript внутри фигурных скобок, если напишете его так:

<details>
<summary><small>(eng)</small></summary>

Try changing the values of `backgroundColor` and `color`.

You can really see the JavaScript object inside the curly braces when you write it like this:

</details>

```js {2-5}
<ul style={
  {
    backgroundColor: 'black',
    color: 'pink'
  }
}>
```

В следующий раз, когда вы увидите `{{` и `}}` в JSX, знайте, что это не что иное, как объект внутри JSX-завитушек!

<details>
<summary><small>(eng)</small></summary>

The next time you see `{{` and `}}` in JSX, know that it's nothing more than an object inside the JSX curlies!

</details>

<Pitfall>

Встроенные свойства `style` записываются в camelCase. Например, HTML `<ul style=«background-color: black»>` будет записан как `<ul style={{ backgroundColor: 'black' }}>` в вашем компоненте.

<details>
<summary><small>(eng)</small></summary>

Inline `style` properties are written in camelCase. For example, HTML `<ul style="background-color: black">` would be written as `<ul style={{ backgroundColor: 'black' }}>`  in your component.

</details>

</Pitfall>

## Больше веселья с объектами JavaScript и фигурными скобками {/*more-fun-with-javascript-objects-and-curly-braces*/}

Вы можете объединить несколько выражений в один объект и ссылаться на них в JSX внутри фигурных скобок:

<details>
<summary><small>(eng)</small></summary>

You can move several expressions into one object, and reference them in your JSX inside curly braces:

</details>

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

В этом примере объект JavaScript `person` содержит строку `name` и объект `theme`:

<details>
<summary><small>(eng)</small></summary>

In this example, the `person` JavaScript object contains a `name` string and a `theme` object:

</details>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};
```
Компонент может использовать эти значения из `person` следующим образом:

<details>
<summary><small>(eng)</small></summary>

The component can use these values from `person` like so:

</details>

```js
<div style={person.theme}>
  <h1>{person.name}'s Todos</h1>
```

JSX очень минимален в качестве языка шаблонов, поскольку позволяет организовать данные и логику с помощью JavaScript.

<details>
<summary><small>(eng)</small></summary>

JSX is very minimal as a templating language because it lets you organize data and logic using JavaScript.

</details>

<Recap>

Теперь вы знаете о JSX почти все:

<details>
<summary><small>(eng)</small></summary>

Now you know almost everything about JSX:

* JSX attributes inside quotes are passed as strings.
* Curly braces let you bring JavaScript logic and variables into your markup.
* They work inside the JSX tag content or immediately after `=` in attributes.
* `{{` and `}}` is not special syntax: it's a JavaScript object tucked inside JSX curly braces.

</details>

* Атрибуты JSX, заключенные в кавычки, передаются как строки.
* Фигурные скобки позволяют внедрить логику и переменные JavaScript в разметку.
* Они работают внутри содержимого тега JSX или сразу после `=` в атрибутах.
* `{{` и `}}` - это не специальный синтаксис: это объект JavaScript, помещенный внутрь фигурных скобок JSX.

</Recap>

<Challenges>

#### Исправьте ошибку {/*fix-the-mistake*/}

Этот код завершается с ошибкой `Objects are not valid as a React child`:

<details>
<summary><small>(eng)</small></summary>

This code crashes with an error saying `Objects are not valid as a React child`:

</details>

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

Можете ли вы найти проблему?

<Hint>Посмотрите, что находится внутри фигурных скобок. Мы помещаем туда то, что нужно?</Hint>

<details>
<summary><small>(eng)</small></summary>

Can you find the problem?

<Hint>Look for what's inside the curly braces. Are we putting the right thing there?</Hint>

</details>

<Solution>

Это происходит потому, что в данном примере в разметке отображается *сам объект*, а не строка: `<h1>{person}'s Todos</h1>` пытается отобразить весь объект `person`! Включение необработанных объектов в качестве текстового содержимого приводит к ошибке, потому что React не знает, как их отображать.

Чтобы исправить это, замените `<h1>{person}'s Todos</h1>` на `<h1>{person.name}'s Todos</h1>`:

<details>
<summary><small>(eng)</small></summary>

This is happening because this example renders *an object itself* into the markup rather than a string: `<h1>{person}'s Todos</h1>` is trying to render the entire `person` object! Including raw objects as text content throws an error because React doesn't know how you want to display them.
To fix it, replace `<h1>{person}'s Todos</h1>` with `<h1>{person.name}'s Todos</h1>`:

</details>

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

</Solution>

#### Извлечение информации в объект {/*extract-information-into-an-object*/}

Выделите URL-адрес изображения в объект `person`.

<details>
<summary><small>(eng)</small></summary>

Extract the image URL into the `person` object.

</details>

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

<Solution>

Переместите URL-адрес изображения в свойство `person.imageUrl` и прочитайте его из тега `<img>` с помощью фигурных символов:

<details>
<summary><small>(eng)</small></summary>

Move the image URL into a property called `person.imageUrl` and read it from the `<img>` tag using the curlies:

</details>

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  imageUrl: "https://i.imgur.com/7vQD0fPs.jpg",
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src={person.imageUrl}
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

</Solution>

#### Запишите выражение внутри фигурных скобок JSX {/*write-an-expression-inside-jsx-curly-braces*/}

В приведенном ниже объекте полный URL-адрес изображения разбит на четыре части: базовый URL, `imageId`, `imageSize` и расширение файла.

Мы хотим, чтобы URL-адрес изображения объединял эти атрибуты: базовый URL (всегда `'https://i.imgur.com/'`), `imageId` (`'7vQD0fP'`), `imageSize` (`'s'`) и расширение файла (всегда `'.jpg'`). Однако что-то не так с тем, как тег `<img>` указывает свой `src`.

Можете ли вы это исправить?

<details>
<summary><small>(eng)</small></summary>

In the object below, the full image URL is split into four parts: base URL, `imageId`, `imageSize`, and file extension.
We want the image URL to combine these attributes together: base URL (always `'https://i.imgur.com/'`), `imageId` (`'7vQD0fP'`), `imageSize` (`'s'`), and file extension (always `'.jpg'`). However, something is wrong with how the `<img>` tag specifies its `src`.
Can you fix it?

</details>

<Sandpack>

```js

const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="{baseUrl}{person.imageId}{person.imageSize}.jpg"
        alt={person.name}
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; }
```

</Sandpack>

Чтобы проверить, что ваше исправление сработало, попробуйте изменить значение `imageSize` на `'b'`. Размер изображения должен измениться после вашей правки.

<details>
<summary><small>(eng)</small></summary>

To check that your fix worked, try changing the value of `imageSize` to `'b'`. The image should resize after your edit.

</details>

<Solution>

Вы можете записать это как `src={baseUrl + person.imageId + person.imageSize + '.jpg'}`.

<details>
<summary><small>(eng)</small></summary>

You can write it as `src={baseUrl + person.imageId + person.imageSize + '.jpg'}`.

1. `{` opens the JavaScript expression
2. `baseUrl + person.imageId + person.imageSize + '.jpg'` produces the correct URL string
3. `}` closes the JavaScript expression

</details>

1. `{` открывает выражение JavaScript
2. `baseUrl + person.imageId + person.imageSize + '.jpg'` выдает правильную строку URL
3. `}` закрывает выражение JavaScript

<Sandpack>

```js
const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src={baseUrl + person.imageId + person.imageSize + '.jpg'}
        alt={person.name}
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; }
```

</Sandpack>

Вы также можете вынести это выражение в отдельную функцию, как `getImageUrl` ниже:

<details>
<summary><small>(eng)</small></summary>

You can also move this expression into a separate function like `getImageUrl` below:

</details>

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js'

const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src={getImageUrl(person)}
        alt={person.name}
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    person.imageSize +
    '.jpg'
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; }
```

</Sandpack>

Переменные и функции помогут вам сохранить простоту разметки!

<details>
<summary><small>(eng)</small></summary>

Variables and functions can help you keep the markup simple!

</details>

</Solution>

</Challenges>
