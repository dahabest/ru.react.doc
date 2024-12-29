---
title: Описание пользовательского интерфейса
---

<Intro>

React - это библиотека JavaScript для визуализации пользовательских интерфейсов (UI). Пользовательский интерфейс строится из небольших блоков, таких как кнопки, текст и изображения. React позволяет объединять их в многократно используемые, вложенные *компоненты.* От веб-сайтов до приложений для телефонов - все на экране может быть разбито на компоненты. В этой главе вы научитесь создавать, настраивать и условно отображать компоненты React.

<details>
<summary><small>(eng)</small></summary>

<b>Describing the UI</b>
React is a JavaScript library for rendering user interfaces (UI). UI is built from small units like buttons, text, and images. React lets you combine them into reusable, nestable *components.* From web sites to phone apps, everything on the screen can be broken down into components. In this chapter, you'll learn to create, customize, and conditionally display React components.

* [How to write your first React component](/learn/your-first-component)
* [When and how to create multi-component files](/learn/importing-and-exporting-components)
* [How to add markup to JavaScript with JSX](/learn/writing-markup-with-jsx)
* [How to use curly braces with JSX to access JavaScript functionality from your components](/learn/javascript-in-jsx-with-curly-braces)
* [How to configure components with props](/learn/passing-props-to-a-component)
* [How to conditionally render components](/learn/conditional-rendering)
* [How to render multiple components at a time](/learn/rendering-lists)
* [How to avoid confusing bugs by keeping components pure](/learn/keeping-components-pure)
* [Why understanding your UI as trees is useful](/learn/understanding-your-ui-as-a-tree)

</details>


</Intro>

<YouWillLearn isChapter={true}>

* [Как написать свой первый компонент React](/learn/your-first-component)
* [Когда и как создавать многокомпонентные файлы](/learn/importing-and-exporting-components)
* [Как добавлять разметку в JavaScript с помощью JSX](/learn/writing-markup-with-jsx)
* [Как использовать фигурные скобки в JSX для доступа к функциональности JavaScript из ваших компонентов](/learn/javascript-in-jsx-with-curly-braces)
* [Как настраивать компоненты с помощью параметров](/learn/passing-props-to-a-component)
* [Как условно рендерить компоненты](/learn/conditional-rendering)
* [Как рендерить несколько компонентов одновременно](/learn/rendering-lists)
* [Как избежать непонятных ошибок, сохраняя компоненты чистыми](/learn/keeping-components-pure)
* [Почему полезно понимать ваш пользовательский интерфейс как дерево](/learn/understanding-your-ui-as-a-tree)

</YouWillLearn>

## Ваш первый компонент {/*your-first-component*/}

Приложения React строятся из изолированных частей пользовательского интерфейса, называемых *компонентами*. Компонент React - это функция JavaScript, которую вы можете посыпать разметкой. Компоненты могут быть маленькими, как кнопка, или большими, как целая страница. Вот компонент `Галерея`, который отображает три компонента `Профиль`:

<details>
<summary><small>(eng)</small></summary>

<b>Your first component</b>
React applications are built from isolated pieces of UI called *components*. A React component is a JavaScript function that you can sprinkle with markup. Components can be as small as a button, or as large as an entire page. Here is a `Gallery` component rendering three `Profile` components:

</details>

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

<LearnMore path="/learn/your-first-component">

Прочитайте **[Ваш первый компонент](/learn/your-first-component)**, чтобы узнать, как объявлять и использовать компоненты React.

<details>
<summary><small>(eng)</small></summary>

Read **[Your First Component](/learn/your-first-component)** to learn how to declare and use React components.

</details>


</LearnMore>

## Импорт и экспорт компонентов {/*importing-and-exporting-components*/}

Вы можете объявить много компонентов в одном файле, но в больших файлах может быть трудно ориентироваться. Чтобы решить эту проблему, вы можете *вынести* компонент в свой собственный файл, а затем *импортировать* этот компонент в другом файле:

<details>
<summary><small>(eng)</small></summary>

<b>Importing and exporting components</b>
You can declare many components in one file, but large files can get difficult to navigate. To solve this, you can *export* a component into its own file, and then *import* that component from another file:

</details>


<Sandpack>

```js src/App.js hidden
import Gallery from './Gallery.js';

export default function App() {
  return (
    <Gallery />
  );
}
```

```js src/Gallery.js active
import Profile from './Profile.js';

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```js src/Profile.js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
```

```css
img { margin: 0 10px 10px 0; }
```

</Sandpack>

<LearnMore path="/learn/importing-and-exporting-components">

Прочитайте **[Импорт и экспорт компонентов](/learn/importing-and-exporting-components)**, чтобы узнать, как разделить компоненты на собственные файлы.

</LearnMore>

## Написание разметки с помощью JSX {/*writing-markup-with-jsx*/}

Каждый компонент React - это функция JavaScript, которая может содержать некоторую разметку, которую React отображает в браузере. Для представления этой разметки компоненты React используют расширение синтаксиса, называемое JSX. JSX очень похож на HTML, но он немного строже и может отображать динамическую информацию.

Если мы вставим существующую HTML-разметку в компонент React, она не всегда будет работать:

<details>
<summary><small>(eng)</small></summary>

<b>Writing markup with JSX</b>

Each React component is a JavaScript function that may contain some markup that React renders into the browser. React components use a syntax extension called JSX to represent that markup. JSX looks a lot like HTML, but it is a bit stricter and can display dynamic information.

If we paste existing HTML markup into a React component, it won't always work:

If you have existing HTML like this, you can fix it using a [converter](https://transform.tools/html-to-jsx):

</details>


<Sandpack>

```js
export default function TodoList() {
  return (
    // This doesn't quite work!
    <h1>Hedy Lamarr's Todos</h1>
    <img
      src="https://i.imgur.com/yXOvdOSs.jpg"
      alt="Hedy Lamarr"
      class="photo"
    >
    <ul>
      <li>Invent new traffic lights
      <li>Rehearse a movie scene
      <li>Improve spectrum technology
    </ul>
  );
}
```

```css
img { height: 90px; }
```

</Sandpack>

Если у вас есть HTML, подобный этому, вы можете исправить его с помощью [конвертера](https://transform.tools/html-to-jsx):

<Sandpack>

```js
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve spectrum technology</li>
      </ul>
    </>
  );
}
```

```css
img { height: 90px; }
```

</Sandpack>

<LearnMore path="/learn/writing-markup-with-jsx">

Прочитайте **[Writing Markup with JSX](/learn/writing-markup-with-jsx)**, чтобы узнать, как писать правильный JSX.

<details>
<summary><small>(eng)</small></summary>

Read **[Написание разметки с помощью JSX](/learn/writing-markup-with-jsx)** to learn how to write valid JSX.

</details>


</LearnMore>

## JavaScript в JSX в фигурных скобках {/*javascript-in-jsx-with-curly-braces*/}

JSX позволяет писать HTML-подобную разметку внутри файла JavaScript, сохраняя логику рендеринга и содержимое в одном месте. Иногда вам захочется добавить немного логики JavaScript или сослаться на динамическое свойство внутри этой разметки. В такой ситуации вы можете использовать фигурные скобки в JSX, чтобы «открыть окно» в JavaScript

<details>
<summary><small>(eng)</small></summary>

<b>JavaScript in JSX with curly braces</b>
JSX lets you write HTML-like markup inside a JavaScript file, keeping rendering logic and content in the same place. Sometimes you will want to add a little JavaScript logic or reference a dynamic property inside that markup. In this situation, you can use curly braces in your JSX to "open a window" to JavaScript:

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

<LearnMore path="/learn/javascript-in-jsx-with-curly-braces">

Прочитайте **[JavaScript в JSX в фигурных скобках](/learn/javascript-in-jsx-with-curly-braces)**, чтобы узнать, как получить доступ к данным JavaScript из JSX.

<details>
<summary><small>(eng)</small></summary>

Read **[JavaScript in JSX with Curly Braces](/learn/javascript-in-jsx-with-curly-braces)** to learn how to access JavaScript data from JSX.

</details>


</LearnMore>

## Передача параметров компоненту {/*passing-props-to-a-component*/}

Компоненты React используют  параметры *props* для взаимодействия друг с другом. Каждый родительский компонент может передать некоторую информацию своим дочерним компонентам, переда им параметры. Параметры могут напомнить вам HTML-атрибуты, но через них можно передавать любые значения JavaScript, включая объекты, массивы, функции и даже JSX!

<details>
<summary><small>(eng)</small></summary>

<b>Passing props to a component</b>
React components use *props* to communicate with each other. Every parent component can pass some information to its child components by giving them props. Props might remind you of HTML attributes, but you can pass any JavaScript value through them, including objects, arrays, functions, and even JSX!

</details>


<Sandpack>

```js
import { getImageUrl } from './utils.js'

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

```

```js src/utils.js
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.card {
  width: fit-content;
  margin: 5px;
  padding: 5px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.avatar {
  margin: 20px;
  border-radius: 50%;
}
```

</Sandpack>

<LearnMore path="/learn/passing-props-to-a-component">

Прочитайте **[Передача пропсов компоненту](/learn/passing-props-to-a-component)**, чтобы узнать, как передавать и читать параметры.

<details>
<summary><small>(eng)</small></summary>

Read **[Passing Props to a Component](/learn/passing-props-to-a-component)** to learn how to pass and read props.

</details>

</LearnMore>

## Условный рендеринг {/*conditional-rendering*/}

Ваши компоненты часто должны отображать разное в зависимости от условий. В React вы можете условно отображать JSX, используя синтаксис JavaScript, такой как операторы `if`, `&&` и `? :`.

В этом примере оператор JavaScript `&&` используется для условного отображения галочки:

<details>
<summary><small>(eng)</small></summary>

<b>Conditional rendering</b>
Your components will often need to display different things depending on different conditions. In React, you can conditionally render JSX using JavaScript syntax like `if` statements, `&&`, and `? :` operators.

In this example, the JavaScript `&&` operator is used to conditionally render a checkmark:

</details>


<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✅'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<LearnMore path="/learn/conditional-rendering">

Прочитайте **[Условный рендеринг](/learn/conditional-rendering)**, чтобы узнать о различных способах условного рендеринга содержимого.

<details>
<summary><small>(eng)</small></summary>

Read **[Conditional Rendering](/learn/conditional-rendering)** to learn the different ways to render content conditionally.

</details>

</LearnMore>

## Рендеринг списков {/*rendering-lists*/}

Часто требуется отобразить несколько похожих компонентов из коллекции данных. Вы можете использовать `filter()` и `map()` из JavaScript в React, чтобы отфильтровать и преобразовать массив данных в массив компонентов.

Для каждого элемента массива необходимо указать `ключ`. Обычно в качестве `ключа` используется идентификатор из базы данных. Ключи позволяют React отслеживать место каждого элемента в списке, даже если список меняется

<details>
<summary><small>(eng)</small></summary>

<b>Rendering list:</b>

You will often want to display multiple similar components from a collection of data. You can use JavaScript's `filter()` and `map()` with React to filter and transform your array of data into an array of components.

For each array item, you will need to specify a `key`. Usually, you will want to use an ID from the database as a `key`. Keys let React keep track of each item's place in the list even if the list changes.

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
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
h1 { font-size: 22px; }
h2 { font-size: 20px; }
```

</Sandpack>

<LearnMore path="/learn/rendering-lists">

Прочитайте **[Рендеринг списков](/learn/rendering-lists)**, чтобы узнать, как вывести список компонентов и как выбрать ключ.

<details>
<summary><small>(eng)</small></summary>

Read **[Rendering Lists](/learn/rendering-lists)** to learn how to render a list of components, and how to choose a key.

</details>


</LearnMore>

## Соблюдать чистоту компонентов {/*keeping-components-pure*/}

Некоторые функции JavaScript являются *чистыми.* Чистая функция:

* **Занимается своими делами.** Она не изменяет никаких объектов или переменных, существовавших до ее вызова.
* **Одинаковые входы, одинаковый выход.** При одинаковых входах чистая функция всегда должна возвращать один и тот же результат.

Если вы будете писать свои компоненты только как чистые функции, вы сможете избежать целого класса непонятных ошибок и непредсказуемого поведения по мере роста вашей кодовой базы. Вот пример нечистого компонента:

<details>
<summary><small>(eng)</small></summary>

<b>Keeping components pure</b>
Some JavaScript functions are *pure.* A pure function:

* **Minds its own business.** It does not change any objects or variables that existed before it was called.
* **Same inputs, same output.** Given the same inputs, a pure function should always return the same result.

By strictly only writing your components as pure functions, you can avoid an entire class of baffling bugs and unpredictable behavior as your codebase grows. Here is an example of an impure component:

</details>


<Sandpack>

```js
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```

</Sandpack>

Вы можете сделать этот компонент чистым, передав ему prop, а не модифицируя уже существующую переменную:


<details>
<summary><small>(eng)</small></summary>

You can make this component pure by passing a prop instead of modifying a preexisting variable:

</details>

<Sandpack>

```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

</Sandpack>

<LearnMore path="/learn/keeping-components-pure">

Прочитайте **[Keeping Components Pure](/learn/keeping-components-pure)**, чтобы узнать, как писать компоненты как чистые, предсказуемые функции.


<details>
<summary><small>(eng)</small></summary>

Read **[Keeping Components Pure](/learn/keeping-components-pure)** to learn how to write components as pure, predictable functions.

</details>

</LearnMore>

## Ваш пользовательский интерфейс в виде дерева {/*your-ui-as-a-tree*/}

React использует деревья для моделирования отношений между компонентами и модулями.

Дерево рендеринга React - это представление родительских и дочерних отношений между компонентами.


<details>
<summary><small>(eng)</small></summary>

<b>Your UI as a tree :</b>
React uses trees to model the relationships between components and modules.

A React render tree is a representation of the parent and child relationship between components.

</details>

<Diagram name="generic_render_tree" height={250} width={500} alt="A tree graph with five nodes, with each node representing a component. The root node is located at the top the tree graph and is labelled 'Root Component'. It has two arrows extending down to two nodes labelled 'Component A' and 'Component C'. Each of the arrows is labelled with 'renders'. 'Component A' has a single 'renders' arrow to a node labelled 'Component B'. 'Component C' has a single 'renders' arrow to a node labelled 'Component D'.">

Пример дерева рендеринга React.


<details>
<summary><small>(eng)</small></summary>

An example React render tree.

</details>

</Diagram>

Компоненты, расположенные в верхней части дерева, рядом с корневым компонентом, считаются компонентами верхнего уровня. Компоненты, не имеющие дочерних компонентов, являются листовыми компонентами. Такая классификация компонентов полезна для понимания потока данных и производительности рендеринга.

Моделирование отношений между модулями JavaScript - еще один полезный способ понять работу приложения. Мы называем это деревом зависимостей модулей.


<details>
<summary><small>(eng)</small></summary>

Components near the top of the tree, near the root component, are considered top-level components. Components with no child components are leaf components. This categorization of components is useful for understanding data flow and rendering performance.

Modelling the relationship between JavaScript modules is another useful way to understand your app. We refer to it as a module dependency tree.

</details>

<Diagram name="generic_dependency_tree" height={250} width={500} alt="A tree graph with five nodes. Each node represents a JavaScript module. The top-most node is labelled 'RootModule.js'. It has three arrows extending to the nodes: 'ModuleA.js', 'ModuleB.js', and 'ModuleC.js'. Each arrow is labelled as 'imports'. 'ModuleC.js' node has a single 'imports' arrow that points to a node labelled 'ModuleD.js'.">

Пример дерева зависимостей модулей.


<details>
<summary><small>(eng)</small></summary>

An example module dependency tree.

</details>

</Diagram>

Дерево зависимостей часто используется инструментами сборки для компоновки всего необходимого JavaScript-кода для загрузки и рендеринга клиентом. Большой размер пакета ухудшает пользовательский опыт в React-приложениях. Понимание дерева зависимостей модулей помогает отлаживать такие проблемы.


<details>
<summary><small>(eng)</small></summary>

A dependency tree is often used by build tools to bundle all the relevant JavaScript code for the client to download and render. A large bundle size regresses user experience for React apps. Understanding the module dependency tree is helpful to debug such issues.

</details>

<LearnMore path="/learn/understanding-your-ui-as-a-tree">

Прочитайте **[Ваш пользовательский интерфейс в виде дерева](/learn/understanding-your-ui-as-a-tree)**, чтобы узнать, как создавать деревья зависимостей рендеринга и модулей для приложения React и как они являются полезными моделями для улучшения пользовательского опыта и производительности.


<details>
<summary><small>(eng)</small></summary>

Read **[Your UI as a Tree](/learn/understanding-your-ui-as-a-tree)** to learn how to create a render and module dependency trees for a React app and how they're useful mental models for improving user experience and performance.

</details>

</LearnMore>

## Что дальше? {/*whats-next*/}

Перейдите по ссылке [Ваш первый компонент](/learn/your-first-component), чтобы начать читать эту главу, страницу за страницей!

Или, если вы уже знакомы с этими темами, почему бы не прочитать о [Добавлении интерактивности](/learn/adding-interactivity)?

<details>
<summary><small>(eng)</small></summary>

<b>What's next? :</b>
Head over to [Your First Component](/learn/your-first-component) to start reading this chapter page by page!

Or, if you're already familiar with these topics, why not read about [Adding Interactivity](/learn/adding-interactivity)?
</details>


