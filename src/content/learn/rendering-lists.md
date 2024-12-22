---
title: Рендеринг списков
---

<Intro>

Часто требуется отобразить несколько одинаковых компонентов из коллекции данных. Для работы с массивом данных можно использовать методы [JavaScript методы массивов](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array#). На этой странице вы будете использовать [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) и [`map()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) в React для фильтрации и преобразования массива данных в массив компонентов.

<details>
<summary><small>(eng)</small></summary>

You will often want to display multiple similar components from a collection of data. You can use the [JavaScript array methods](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array#) to manipulate an array of data. On this page, you'll use [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) and [`map()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) with React to filter and transform your array of data into an array of components.

You will know:

* How to render components from an array using JavaScript's `map()`
* How to render only specific components using JavaScript's `filter()`
* When and why to use React keys

</details>

</Intro>

<YouWillLearn>

* Как вывести компоненты из массива с помощью функции JavaScript `map()`
* Как отобразить только определенные компоненты с помощью `фильтра()` в JavaScript
* Когда и зачем использовать ключи React

</YouWillLearn>

## Рендеринг данных из массивов {/*rendering-data-from-arrays*/}

Допустим, у вас есть список материала.

```js
<ul>
  <li>Creola Katherine Johnson: mathematician</li>
  <li>Mario José Molina-Pasquel Henríquez: chemist</li>
  <li>Mohammad Abdus Salam: physicist</li>
  <li>Percy Lavon Julian: chemist</li>
  <li>Subrahmanyan Chandrasekhar: astrophysicist</li>
</ul>
```

Единственное различие между этими элементами списка - это их содержимое, их данные. При построении интерфейсов часто возникает необходимость отображать несколько экземпляров одного и того же компонента с использованием разных данных: от списков комментариев до галерей изображений профиля. В таких ситуациях вы можете сохранить эти данные в объектах и массивах JavaScript и использовать такие методы, как [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) и [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), для рендеринга списков компонентов на их основе.

Вот краткий пример того, как создать список элементов из массива:

1. **Вынесите** данные в массив:

```js
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];
```

2. **Преобразуйте** элементы `people` в новый массив JSX-узлов, `listItems`:

```js
const listItems = people.map(person => <li>{person}</li>);
```

3. **Возвращаем** `listItems` из вашего компонента, обернутого в `<ul>`:

```js
return <ul>{listItems}</ul>;
```
Вот результат:

<details>
<summary><small>(eng)</small></summary>

Say that you have a list of content.

The only difference among those list items is their contents, their data. You will often need to show several instances of the same component using different data when building interfaces: from lists of comments to galleries of profile images. In these situations, you can store that data in JavaScript objects and arrays and use methods like [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) to render lists of components from them.

Here’s a short example of how to generate a list of items from an array:

1. **Move** the data into an array:

2. **Map** the `people` members into a new array of JSX nodes, `listItems`:

3. **Return** `listItems` from your component wrapped in a `<ul>`:

Here is the result:

</details>

<Sandpack>

```js
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
```

```css
li { margin-bottom: 10px; }
```

</Sandpack>

Обратите внимание, что в песочнице выше отображается консольная ошибка:

<details>
<summary><small>(eng)</small></summary>

Notice the sandbox above displays a console error:

You'll learn how to fix this error later on this page. Before we get to that, let's add some structure to your data.

</details>

<ConsoleBlock level="error">

Warning: Each child in a list should have a unique "key" prop.

</ConsoleBlock>

Как исправить эту ошибку, вы узнаете далее на этой странице. Прежде чем приступить к этому, давайте добавим немного структуры в ваши данные.

## Фильтрация массивов элементов {/*filtering-arrays-of-items*/}

Эти данные можно еще больше структурировать.

```js
const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',  
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
}];
```

Допустим, вам нужно показать только людей, чья профессия - `химик`. Вы можете использовать метод JavaScript `filter()`, чтобы вернуть только таких людей. Этот метод берет массив элементов, пропускает их через «тест» (функцию, которая возвращает `true` или `false`) и возвращает новый массив, состоящий только из тех элементов, которые прошли тест (вернули `true`).

Вам нужны только те элементы, где `профессия` - `химик`. Функция «тест» для этого выглядит как `(person) => person.profession === 'chemist'`. Вот как это можно сделать:

<details>
<summary><small>(eng)</small></summary>

This data can be structured even more.

Let's say you want a way to only show people whose profession is `'chemist'`. You can use JavaScript's `filter()` method to return just those people. This method takes an array of items, passes them through a “test” (a function that returns `true` or `false`), and returns a new array of only those items that passed the test (returned `true`).

You only want the items where `profession` is `'chemist'`. The "test" function for this looks like `(person) => person.profession === 'chemist'`. Here's how to put it together:

1. **Create** a new array of just “chemist” people, `chemists`, by calling `filter()` on the `people` filtering by `person.profession === 'chemist'`:

2. Now **map** over `chemists`:

3. Lastly, **return** the `listItems` from your component:

</details>

1. **Создайте** новый массив только людей-«химиков», `chemists`, вызвав `filter()` на `people`, фильтруя по `person.profession === 'chemist'`:

```js
const chemists = people.filter(person =>
  person.profession === 'chemist'
);
```

2. Теперь **отобразите** из `chemists`:

```js {1,13}
const listItems = chemists.map(person =>
  <li>
     <img
       src={getImageUrl(person)}
       alt={person.name}
     />
     <p>
       <b>{person.name}:</b>
       {' ' + person.profession + ' '}
       known for {person.accomplishment}
     </p>
  </li>
);
```

3. И наконец, **возвращаем** `listItems` из вашего компонента:

```js
return <ul>{listItems}</ul>;
```

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const listItems = chemists.map(person =>
    <li>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li { 
  margin-bottom: 10px; 
  display: grid; 
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

<Pitfall>

Стрелочные функции неявно возвращают выражение сразу после `=>`, поэтому оператор `возврата` не нужен:

<details>
<summary><small>(eng)</small></summary>

Arrow functions implicitly return the expression right after `=>`, so you didn't need a `return` statement:

However, **you must write `return` explicitly if your `=>` is followed by a `{` curly brace!**

Arrow functions containing `=> {` are said to have a ["block body".](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#function_body) They let you write more than a single line of code, but you *have to* write a `return` statement yourself. If you forget it, nothing gets returned!

</details>


```js
const listItems = chemists.map(person =>
  <li>...</li> // Implicit return!
);
```
Однако **вы должны явно написать `return`, если за `=>` следует фигурная скобка `{`!**

```js
const listItems = chemists.map(person => { // Curly brace
  return <li>...</li>;
});
```
О стрелочных функциях, содержащих `=> {`, говорят, что они имеют [«тело блока»](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#function_body) Они позволяют вам написать больше, чем одну строку кода, но вы *должны* сами написать оператор `возврата`. Если вы его забудете, то ничего не вернется!

</Pitfall>

## Упорядочивание элементов списка с помощью `key` {/*keeping-list-items-in-order-with-key*/}

Обратите внимание, что все вышеперечисленные песочницы выдают ошибку в консоли:

<details>
<summary><small>(eng)</small></summary>
<b>Keeping list items in order with key</b>

Notice that all the sandboxes above show an error in the console:

You need to give each array item a `key` -- a string or a number that uniquely identifies it among other items in that array:

</details>

<ConsoleBlock level="error">

Warning: Each child in a list should have a unique "key" prop.

</ConsoleBlock>

Каждому элементу массива нужно присвоить `ключ` - строку или число, которое однозначно идентифицирует его среди других элементов этого массива:

```js
<li key={person.id}>...</li>
```

<Note>

JSX-элементы, находящиеся непосредственно внутри вызова `map()`, всегда нуждаются в ключах!

<details>
<summary><small>(eng)</small></summary>

JSX elements directly inside a `map()` call always need keys!

</details>

</Note>

Ключи указывают React, какому элементу массива соответствует каждый компонент, чтобы впоследствии их можно было сопоставить. Это становится важным, если элементы массива могут перемещаться (например, из-за сортировки), вставляться или удаляться. Хорошо подобранный `ключ` помогает React понять, что именно произошло, и произвести правильные обновления в дереве DOM.

Вместо того чтобы генерировать ключи на лету, их следует включать в данные:

<details>
<summary><small>(eng)</small></summary>

Keys tell React which array item each component corresponds to, so that it can match them up later. This becomes important if your array items can move (e.g. due to sorting), get inserted, or get deleted. A well-chosen `key` helps React infer what exactly has happened, and make the correct updates to the DOM tree.

Rather than generating keys on the fly, you should include them in your data:

</details>

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}</b>
          {' ' + person.profession + ' '}
          known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
```

```js src/data.js active
export const people = [{
  id: 0, // Used in JSX as a key
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1, // Used in JSX as a key
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2, // Used in JSX as a key
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3, // Used in JSX as a key
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4, // Used in JSX as a key
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li { 
  margin-bottom: 10px; 
  display: grid; 
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

<DeepDive>

#### Отображение нескольких узлов DOM для каждого элемента списка {/*displaying-several-dom-nodes-for-each-list-item*/}

Короткий синтаксис [`<>...</>` фрагмента](/reference/react/Fragment) не позволяет передать ключ, поэтому вам нужно либо сгруппировать их в один `<div>`, либо использовать чуть более длинный и [более явный синтаксис `<фрагмента>`:](/reference/react/Fragment#rendering-a-list-of-fragments)

<details>
<summary><small>(eng)</small></summary>
<b>Displaying several DOM nodes for each list item</b>

What do you do when each item needs to render not one, but several DOM nodes?

The short [`<>...</>` Fragment](/reference/react/Fragment) syntax won't let you pass a key, so you need to either group them into a single `<div>`, or use the slightly longer and [more explicit `<Fragment>` syntax:](/reference/react/Fragment#rendering-a-list-of-fragments)

Fragments disappear from the DOM, so this will produce a flat list of `<h1>`, `<p>`, `<h1>`, `<p>`, and so on.

</details>


```js
import { Fragment } from 'react';

// ...

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```

Фрагменты исчезают из DOM, поэтому в результате получится плоский список `<h1>`, `<p>`, `<h1>`, `<p>` и так далее.

</DeepDive>

### Где взять `key` {/*where-to-get-your-key*/}

Различные источники данных обеспечивают различные источники ключей:

<details>
<summary><small>(eng)</small></summary>

<b>Where to get your `key`:</b>
Different sources of data provide different sources of keys:

* **Data from a database:** If your data is coming from a database, you can use the database keys/IDs, which are unique by nature.
* **Locally generated data:** If your data is generated and persisted locally (e.g. notes in a note-taking app), use an incrementing counter, [`crypto.randomUUID()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) or a package like [`uuid`](https://www.npmjs.com/package/uuid) when creating items.

</details>

* **Данные из базы данных:** Если данные поступают из базы данных, вы можете использовать ключи/идентификаторы базы данных, которые уникальны по своей природе.
* **Локально генерируемые данные:** Если данные генерируются и сохраняются локально (например, заметки в приложении для ведения записей), при создании элементов используйте инкрементный счетчик, [`crypto.randomUUID()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) или пакет типа [`uuid`](https://www.npmjs.com/package/uuid).


### Правила пользования ключами {/*rules-of-keys*/}

* **Ключи должны быть уникальными среди одноуровневых элементов.** Однако можно использовать одинаковые ключи для JSX-узлов в _разных_ массивах.
* **Ключи не должны меняться**, иначе это лишает их смысла! Не генерируйте их во время рендеринга.

<details>
<summary><small>(eng)</small></summary>

<b>Rules of keys:</b>

* **Keys must be unique among siblings.** However, it’s okay to use the same keys for JSX nodes in _different_ arrays.
* **Keys must not change** or that defeats their purpose! Don't generate them while rendering.

</details>

### Зачем React нужны ключи? {/*why-does-react-need-keys*/}

Представьте, что у файлов на вашем рабочем столе нет имен. Вместо этого вы называете их по порядку - первый файл, второй файл и так далее. К этому можно привыкнуть, но когда вы удалите файл, все запутается. Второй файл станет первым, третий - вторым и так далее.

Имена файлов в папке и ключи JSX в массиве служат аналогичной цели. Они позволяют нам однозначно идентифицировать элемент между одноуровневыми элементами. Хорошо подобранный ключ дает больше информации, чем позиция в массиве. Даже если _позиция_ меняется из-за переупорядочивания, `ключ` позволяет React идентифицировать элемент на протяжении всего его существования.

<details>
<summary><small>(eng)</small></summary>

<b>Why does React need keys?:</b>

Imagine that files on your desktop didn't have names. Instead, you'd refer to them by their order -- the first file, the second file, and so on. You could get used to it, but once you delete a file, it would get confusing. The second file would become the first file, the third file would be the second file, and so on.

File names in a folder and JSX keys in an array serve a similar purpose. They let us uniquely identify an item between its siblings. A well-chosen key provides more information than the position within the array. Even if the _position_ changes due to reordering, the `key` lets React identify the item throughout its lifetime.

</details>

<Pitfall>

У вас может возникнуть соблазн использовать индекс элемента в массиве в качестве ключа. На самом деле, именно это будет использовать React, если вы вообще не укажете `ключ`. Но порядок отображения элементов будет меняться со временем, если элемент будет вставлен, удален или если массив будет переупорядочен. Индекс в качестве ключа часто приводит к тонким и запутанным ошибкам.

Аналогично, не генерируйте ключи на лету, например, с помощью `key={Math.random()}`. Это приведет к тому, что ключи никогда не будут совпадать между рендерами, что приведет к тому, что все ваши компоненты и DOM будут каждый раз создаваться заново. Это не только медленно, но и приведет к потере пользовательского ввода внутри элементов списка. Вместо этого используйте стабильный идентификатор, основанный на данных.

Обратите внимание, что ваши компоненты не будут получать `key` в качестве параметра. Он используется только в качестве подсказки самим React. Если вашему компоненту нужен идентификатор, вы должны передать его в виде отдельного реквизита: `<Profile key={id} userId={id} />`.

<details>
<summary><small>(eng)</small></summary>

You might be tempted to use an item's index in the array as its key. In fact, that's what React will use if you don't specify a `key` at all. But the order in which you render items will change over time if an item is inserted, deleted, or if the array gets reordered. Index as a key often leads to subtle and confusing bugs.

Similarly, do not generate keys on the fly, e.g. with `key={Math.random()}`. This will cause keys to never match up between renders, leading to all your components and DOM being recreated every time. Not only is this slow, but it will also lose any user input inside the list items. Instead, use a stable ID based on the data.

Note that your components won't receive `key` as a prop. It's only used as a hint by React itself. If your component needs an ID, you have to pass it as a separate prop: `<Profile key={id} userId={id} />`.

</details>


</Pitfall>

<Recap>

На этой странице вы узнали:

<details>
<summary><small>(eng)</small></summary>

On this page you learned:

* How to move data out of components and into data structures like arrays and objects.
* How to generate sets of similar components with JavaScript's `map()`.
* How to create arrays of filtered items with JavaScript's `filter()`.
* Why and how to set `key` on each component in a collection so React can keep track of each of them even if their position or data changes.

</details>

* Как перемещать данные из компонентов в структуры данных, такие как массивы и объекты.
* Как генерировать наборы похожих компонентов с помощью функции JavaScript `map()`.
* Как создавать массивы отфильтрованных элементов с помощью функции JavaScript `filter()`.
* Зачем и как устанавливать `key` для каждого компонента в коллекции, чтобы React мог отслеживать каждый из них, даже если их положение или данные меняются.

</Recap>



<Challenges>

#### Разделение списка на две части {/*splitting-a-list-in-two*/}

В этом примере показан список всех людей.

Измените его, чтобы последовательно отобразить два отдельных списка: **Химики** и **Все остальные**. Как и раньше, вы можете определить, является ли человек химиком, проверив, что `person.profession === 'chemist'`.

<details>
<summary><small>(eng)</small></summary>

<b>Splitting a list in two:</b>
This example shows a list of all people.
Change it to show two separate lists one after another: **Chemists** and **Everyone Else.** Like previously, you can determine whether a person is a chemist by checking if `person.profession === 'chemist'`.

</details>


<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

<Solution>

Вы можете использовать `filter()` дважды, создав два отдельных массива, а затем `map` над обоими массивами:

<details>
<summary><small>(eng)</small></summary>

You could use `filter()` twice, creating two separate arrays, and then `map` over both of them:

In this solution, the `map` calls are placed directly inline into the parent `<ul>` elements, but you could introduce variables for them if you find that more readable.

There is still a bit duplication between the rendered lists. You can go further and extract the repetitive parts into a `<ListSection>` component:

</details>


<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const everyoneElse = people.filter(person =>
    person.profession !== 'chemist'
  );
  return (
    <article>
      <h1>Scientists</h1>
      <h2>Chemists</h2>
      <ul>
        {chemists.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
      <h2>Everyone Else</h2>
      <ul>
        {everyoneElse.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

В этом решении вызовы `map` размещены непосредственно в родительских элементах `<ul>`, но вы можете ввести для них переменные, если считаете это более удобным.

Между отрисованными списками все еще есть некоторое дублирование. Вы можете пойти дальше и выделить повторяющиеся части в компонент `<ListSection>`:

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

function ListSection({ title, people }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {people.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </>
  );
}

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const everyoneElse = people.filter(person =>
    person.profession !== 'chemist'
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ListSection
        title="Chemists"
        people={chemists}
      />
      <ListSection
        title="Everyone Else"
        people={everyoneElse}
      />
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

Очень внимательный читатель может заметить, что при двух вызовах `фильтра` мы проверяем профессию каждого человека дважды. Проверка свойства происходит очень быстро, поэтому в данном примере это нормально. Если бы ваша логика была более дорогой, вы могли бы заменить вызовы `фильтра` циклом, который вручную строит массивы и проверяет каждого человека один раз.

На самом деле, если `people` никогда не меняются, вы можете вынести этот код за пределы компонента. С точки зрения React, все, что имеет значение, - это то, что в итоге вы передаете ему массив JSX-узлов. Ему неважно, как вы создадите этот массив:

<details>
<summary><small>(eng)</small></summary>

A very attentive reader might notice that with two `filter` calls, we check each person's profession twice. Checking a property is very fast, so in this example it's fine. If your logic was more expensive than that, you could replace the `filter` calls with a loop that manually constructs the arrays and checks each person once.

In fact, if `people` never change, you could move this code out of your component. From React's perspective, all that matters is that you give it an array of JSX nodes in the end. It doesn't care how you produce that array:

</details>


<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

let chemists = [];
let everyoneElse = [];
people.forEach(person => {
  if (person.profession === 'chemist') {
    chemists.push(person);
  } else {
    everyoneElse.push(person);
  }
});

function ListSection({ title, people }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {people.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </>
  );
}

export default function List() {
  return (
    <article>
      <h1>Scientists</h1>
      <ListSection
        title="Chemists"
        people={chemists}
      />
      <ListSection
        title="Everyone Else"
        people={everyoneElse}
      />
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

</Solution>

#### Вложенные списки в одном компоненте {/*nested-lists-in-one-component*/}

Составьте список рецептов из этого массива! Для каждого рецепта в массиве выведите его название в виде `<h2>` и список ингредиентов в виде `<ul>`.

<details>
<summary><small>(eng)</small></summary>

<b>Nested lists in one component</b>
Make a list of recipes from this array! For each recipe in the array, display its name as an `<h2>` and list its ingredients in a `<ul>`.
This will require nesting two different `map` calls.

</details>

<Hint>Для этого потребуется вложить два разных вызова `map`.</Hint>

<Sandpack>

```js src/App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

<Solution>

Вот один из способов, которым вы можете воспользоваться:

<details>
<summary><small>(eng)</small></summary>

Here is one way you could go about it:

Each of the `recipes` already includes an `id` field, so that's what the outer loop uses for its `key`. There is no ID you could use to loop over ingredients. However, it's reasonable to assume that the same ingredient won't be listed twice within the same recipe, so its name can serve as a `key`. Alternatively, you could change the data structure to add IDs, or use index as a `key` (with the caveat that you can't safely reorder ingredients).

</details>

<Sandpack>

```js src/App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <ul>
            {recipe.ingredients.map(ingredient =>
              <li key={ingredient}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

Каждый из `рецептов` уже содержит поле `id`, поэтому именно его использует внешний цикл для своего `ключа`. Нет никакого идентификатора, который можно было бы использовать для перебора ингредиентов. Однако разумно предположить, что один и тот же ингредиент не будет дважды указан в одном рецепте, поэтому его название может служить в качестве `ключа`. В качестве альтернативы можно изменить структуру данных, добавив идентификаторы, или использовать индекс в качестве `ключа` (с оговоркой, что вы не сможете безопасно переупорядочить ингредиенты).

</Solution>

#### Извлечение компонента как элемента списка {/*extracting-a-list-item-component*/}

Этот компонент `RecipeList` содержит два вложенных вызова `map`. Чтобы упростить его, извлеките из него компонент `Recipe`, который будет принимать параметры `id`, `name` и `ingredients`. Где вы разместите внешний `key` и почему?

<details>
<summary><small>(eng)</small></summary>

<b>Extracting a list item component</b>
This `RecipeList` component contains two nested `map` calls. To simplify it, extract a `Recipe` component from it which will accept `id`, `name`, and `ingredients` props. Where do you place the outer `key` and why?

</details>

<Sandpack>

```js src/App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <ul>
            {recipe.ingredients.map(ingredient =>
              <li key={ingredient}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

<Solution>

Вы можете скопировать-вставить JSX из внешней `map` в новый компонент `Recipe` и вернуть этот JSX. Затем вы можете изменить `recipe.name` на `name`, `recipe.id` на `id` и так далее, и передать их в качестве параметров в `Recipe`:

<details>
<summary><small>(eng)</small></summary>

You can copy-paste the JSX from the outer `map` into a new `Recipe` component and return that JSX. Then you can change `recipe.name` to `name`, `recipe.id` to `id`, and so on, and pass them as props to the `Recipe`:

</details>

<Sandpack>

```js
import { recipes } from './data.js';

function Recipe({ id, name, ingredients }) {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {ingredients.map(ingredient =>
          <li key={ingredient}>
            {ingredient}
          </li>
        )}
      </ul>
    </div>
  );
}

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <Recipe {...recipe} key={recipe.id} />
      )}
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

Здесь `<Recipe {...recipe} key={recipe.id} />` - это синтаксическое сокращение, означающее «передать все свойства объекта `recipe` в качестве параметров компоненту `Recipe`». Вы также можете написать каждый параметр явно: `<Recipe id={recipe.id} name={recipe.name} ingredients={recipe.ingredients} key={recipe.id} />`.

** Обратите внимание, что `key` указывается в самом `<Recipe>`, а не в корневом `<div>`, возвращаемом из `Recipe`.** Это происходит потому, что этот `key` нужен непосредственно в контексте окружающего массива. Раньше у вас был массив `<div>`, и для каждого из них требовался `ключ`, а теперь у вас есть массив `<Recipe>`. Другими словами, когда вы извлекаете компонент, не забудьте оставить `ключ` вне JSX, который вы копируете и вставляете.

<details>
<summary><small>(eng)</small></summary>

Here, `<Recipe {...recipe} key={recipe.id} />` is a syntax shortcut saying "pass all properties of the `recipe` object as props to the `Recipe` component". You could also write each prop explicitly: `<Recipe id={recipe.id} name={recipe.name} ingredients={recipe.ingredients} key={recipe.id} />`.

**Note that the `key` is specified on the `<Recipe>` itself rather than on the root `<div>` returned from `Recipe`.** This is because this `key` is needed directly within the context of the surrounding array. Previously, you had an array of `<div>`s so each of them needed a `key`, but now you have an array of `<Recipe>`s. In other words, when you extract a component, don't forget to leave the `key` outside the JSX you copy and paste.

</details>


</Solution>

#### Список с разделителем {/*list-with-a-separator*/}

Этот пример отображает знаменитое хайку Тачибаны Хокуши, в котором каждая строка завернута в тег `<p>`. Ваша задача - вставить разделитель `<hr />` между каждым абзацем. Полученная структура должна выглядеть следующим образом:

<details>
<summary><small>(eng)</small></summary>

<b>List with a separator:</b>
This example renders a famous haiku by Tachibana Hokushi, with each line wrapped in a `<p>` tag. Your job is to insert an `<hr />` separator between each paragraph. Your resulting structure should look like this:
A haiku only contains three lines, but your solution should work with any number of lines. Note that `<hr />` elements only appear *between* the `<p>` elements, not in the beginning or the end!
(This is a rare case where index as a key is acceptable because a poem's lines will never reorder.)
Hint: You'll either need to convert `map` to a manual loop, or use a Fragment.
</details>

```js
<article>
  <p>I write, erase, rewrite</p>
  <hr />
  <p>Erase again, and then</p>
  <hr />
  <p>A poppy blooms.</p>
</article>
```
В хайку всего три строки, но ваше решение должно работать с любым количеством строк. Обратите внимание, что элементы `<hr />` появляются только *между* элементами `<p>`, а не в начале или в конце!

<Sandpack>

```js
const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, index) =>
        <p key={index}>
          {line}
        </p>
      )}
    </article>
  );
}
```

```css
body {
  text-align: center;
}
p {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}
hr {
  margin: 0 120px 0 120px;
  border: 1px dashed #45c3d8;
}
```

</Sandpack>

(Это редкий случай, когда индекс в качестве ключа допустим, потому что строки стихотворения никогда не перестраиваются).

<Hint>

Вам придется либо преобразовать `map` в ручной цикл, либо использовать Fragment.

</Hint>

<Solution>

Вы можете написать ручной цикл, вставляя `<hr />` и `<p>...</p>` в выходной массив по мере выполнения:

<details>
<summary><small>(eng)</small></summary>

You can write a manual loop, inserting `<hr />` and `<p>...</p>` into the output array as you go:

</details>


<Sandpack>

```js
const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  let output = [];

  // Fill the output array
  poem.lines.forEach((line, i) => {
    output.push(
      <hr key={i + '-separator'} />
    );
    output.push(
      <p key={i + '-text'}>
        {line}
      </p>
    );
  });
  // Remove the first <hr />
  output.shift();

  return (
    <article>
      {output}
    </article>
  );
}
```

```css
body {
  text-align: center;
}
p {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}
hr {
  margin: 0 120px 0 120px;
  border: 1px dashed #45c3d8;
}
```

</Sandpack>

Использование исходного индекса строки в качестве `ключа` больше не работает, поскольку каждый разделитель и абзац теперь находятся в одном массиве. Однако вы можете задать каждому из них отдельный ключ с помощью суффикса, например `key={i + '-text'}`.

В качестве альтернативы можно создать коллекцию фрагментов, содержащих `<hr />` и `<p>...</p>`. Однако сокращенный синтаксис `<>...</>` не поддерживает передачу ключей, поэтому вам придется писать `<Фрагмент>` явно:

<details>
<summary><small>(eng)</small></summary>

Using the original line index as a `key` doesn't work anymore because each separator and paragraph are now in the same array. However, you can give each of them a distinct key using a suffix, e.g. `key={i + '-text'}`.
Alternatively, you could render a collection of Fragments which contain `<hr />` and `<p>...</p>`. However, the `<>...</>` shorthand syntax doesn't support passing keys, so you'd have to write `<Fragment>` explicitly:
Remember, Fragments (often written as `<> </>`) let you group JSX nodes without adding extra `<div>`s!

</details>

<Sandpack>

```js
import { Fragment } from 'react';

const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, i) =>
        <Fragment key={i}>
          {i > 0 && <hr />}
          <p>{line}</p>
        </Fragment>
      )}
    </article>
  );
}
```

```css
body {
  text-align: center;
}
p {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}
hr {
  margin: 0 120px 0 120px;
  border: 1px dashed #45c3d8;
}
```

</Sandpack>

Помните, что фрагменты (часто записываемые как `<> </>`) позволяют группировать узлы JSX без добавления лишних `<div>`!

</Solution>

</Challenges>
