---
title: Ваш первый компонент
---


<Intro>

*Компоненты* - одна из основных концепций React. Они являются фундаментом, на котором вы строите пользовательские интерфейсы (UI), что делает их идеальным местом для начала вашего путешествия по React!

<details>
<summary><small>(eng)</small></summary>

*Components* are one of the core concepts of React. They are the foundation upon which you build user interfaces (UI), which makes them the perfect place to start your React journey!

</details>

</Intro>


<YouWillLearn>

* Что такое компонент
* Какую роль играют компоненты в React-приложении
* Как написать свой первый компонент React

</YouWillLearn>

## Компоненты: Строительные блоки UI {/*components-ui-building-blocks*/}

В Интернете HTML позволяет создавать богатые структурированные документы с помощью встроенного набора тегов, таких как `<h1>` и `<li>`:

<details class="hi">
<summary><small>(eng)</small></summary>

On the Web, HTML lets us create rich structured documents with its built-in set of tags like `<h1>` and `<li>`:

</details>


```html
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>
```
Эта разметка представляет статью `<article>`, ее заголовок `<h1>` и (сокращенное) оглавление в виде упорядоченного списка `<ol>`. Подобная разметка в сочетании с CSS для стиля и JavaScript для интерактивности, лежит в основе каждой боковой панели, аватара, модального окна, выпадающего списка — всех элементов пользовательского интерфейса, которые вы видите в Интернете.

React позволяет объединять разметку, CSS и JavaScript в пользовательские "компоненты", **повторно используемые элементы пользовательского интерфейса для вашего приложения.** Код оглавления, который вы видели выше, можно превратить в компонент `<TableOfContents />`, который можно отображать на каждой странице. Под капотом он по-прежнему использует те же HTML-теги, такие как `<article>`, `<h1>` и т. д.

Как и в случае с HTML-тегами, вы можете компоновать, упорядочивать и вкладывать компоненты для создания целых страниц. Например, страница документации, которую вы читаете, состоит из компонентов React:

<details>
<summary><small>(eng)</small></summary>

This markup represents this article `<article>`, its heading `<h1>`, and an (abbreviated) table of contents as an ordered list `<ol>`. Markup like this, combined with CSS for style, and JavaScript for interactivity, lies behind every sidebar, avatar, modal, dropdown—every piece of UI you see on the Web.

React lets you combine your markup, CSS, and JavaScript into custom "components", **reusable UI elements for your app.** The table of contents code you saw above could be turned into a `<TableOfContents />` component you could render on every page. Under the hood, it still uses the same HTML tags like `<article>`, `<h1>`, etc.

Just like with HTML tags, you can compose, order and nest components to design whole pages. For example, the documentation page you're reading is made out of React components:

</details>

```js
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```

По мере роста вашего проекта вы заметите, что многие из ваших конструкций могут быть составлены путем повторного использования уже написанных компонентов, что ускорит вашу разработку. Наше оглавление выше может быть добавлено на любой экран с помощью `<TableOfContents />`! Вы даже можете начать свой проект с помощью тысяч компонентов, которыми поделилось сообщество разработчиков React, например,  [Chakra UI](https://chakra-ui.com/) и [Material UI.](https://material-ui.com/)

<details>
<summary><small>(eng)</small></summary>

As your project grows, you will notice that many of your designs can be composed by reusing components you already wrote, speeding up your development. Our table of contents above could be added to any screen with `<TableOfContents />`! You can even jumpstart your project with the thousands of components shared by the React open source community like [Chakra UI](https://chakra-ui.com/) and [Material UI.](https://material-ui.com/)

</details>

## Определение компонента {/*defining-a-component*/}

Традиционно при создании веб-страниц веб-разработчики размечали содержимое, а затем добавляли интерактивность, c помощью JavaScript. Это отлично работало, когда интерактивность в Интернете была просто дополнением. Теперь же оно является обязательным для многих сайтов и всех приложений. React ставит интерактивность на первое место, используя при этом ту же технологию: **компонент React — это функция JavaScript, которую вы можете __дополнить разметкой__.** Вот как это выглядит:

<details>
<summary><small>(eng)</small></summary>

Traditionally when creating web pages, web developers marked up their content and then added interaction by sprinkling on some JavaScript. This worked great when interaction was a nice-to-have on the web. Now it is expected for many sites and all apps. React puts interactivity first while still using the same technology: **a React component is a JavaScript function that you can _sprinkle with markup_.** Here's what that looks like (you can edit the example below):

</details>

<Sandpack>

```js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}
```

```css
img { height: 200px; }
```

</Sandpack>

А вот как создать компонент:

### Шаг 1: Экспортируйте компонент {/*step-1-export-the-component*/}

Префикс `export default` — это [стандартный синтаксис JavaScript](https://developer.mozilla.org/docs/web/javascript/reference/statements/export) (не специфичный для React). Он позволяет отметить главную функцию в файле, чтобы впоследствии ее можно было импортировать из других файлов. (Подробнее об импорте в[ Импорт и Экспорт Компонентов](/learn/importing-and-exporting-components)!)

<details>
<summary><small>(eng)</small></summary>

The `export default` prefix is a [standard JavaScript syntax](https://developer.mozilla.org/docs/web/javascript/reference/statements/export) (not specific to React). It lets you mark the main function in a file so that you can later import it from other files. (More on importing in [Importing and Exporting Components](/learn/importing-and-exporting-components)!)

</details>


### Шаг 2: Определите функцию {/*step-2-define-the-function*/}

С помощью `function Profile() { }` вы определяете функцию JavaScript с именем `Profile`.

<details>
<summary><small>(eng)</small></summary>

With `function Profile() { }` you define a JavaScript function with the name `Profile`.

React components are regular JavaScript functions, but **their names must start with a capital letter** or they won't work!


</details>


<Pitfall>

Компоненты React являются обычными функциями JavaScript, но **их имена должны начинаться с заглавной буквы**, иначе они не будут работать!

</Pitfall>

### Шаг 3: Добавьте разметку {/*step-3-add-markup*/}

Компонент возвращает тег `<img />`  с атрибутами `src` и `alt`. `<img />`  написан как HTML, но на самом деле это JavaScript под капотом!  Этот синтаксис называется [JSX](/learn/writing-markup-with-jsx), и он позволяет встраивать разметку внутрь JavaScript.

Операторы `return` могут быть записаны в одну строку, как в следующем компоненте:

```js
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

Но если ваша разметка находится не на одной строке с ключевым словом `return`, вы должны заключить ее в круглые скобки:

```js
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

<Pitfall>

Без круглых скобок любой код в строках после `return` [будет проигнорирован](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)!

</Pitfall>

<details>
<summary><small>(eng)</small></summary>

The component returns an `<img />` tag with `src` and `alt` attributes. `<img />` is written like HTML, but it is actually JavaScript under the hood! This syntax is called [JSX](/learn/writing-markup-with-jsx), and it lets you embed markup inside JavaScript.
Return statements can be written all on one line, as in this component:
But if your markup isn't all on the same line as the `return` keyword, you must wrap it in a pair of parentheses:

</details>


## Использование компонента {/*using-a-component*/}

Теперь, когда вы определили свой компонент `Profile`, вы можете вложить его в другие компоненты. Например, вы можете экспортировать компонент `Gallery`, который использует несколько компонентов `Profile`:

<details>
<summary><small>(eng)</small></summary>

Now that you've defined your `Profile` component, you can nest it inside other components. For example, you can export a `Gallery` component that uses multiple `Profile` components:

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

### Что видит браузер {/*what-the-browser-sees*/}

Обратите внимание на разницу регистра:

* `<section>` начинается со строчной буквы, поэтому React знает, что мы ссылаемся на HTML-тег.
* `<Profile />` начинается с заглавной буквы `P`, поэтому React знает, что мы хотим использовать наш компонент под названием `Profile`.

А `Profile` содержит еще больше HTML: `<img />`. В итоге, вот что видит браузер:

<details>
<summary><small>(eng)</small></summary>

Notice the difference in casing:

* `<section>` is lowercase, so React knows we refer to an HTML tag.
* `<Profile />` starts with a capital `P`, so React knows that we want to use our component called `Profile`.

And `Profile` contains even more HTML: `<img />`. In the end, this is what the browser sees:

</details>

```html
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

### Вложение и упорядочивание компонентов {/*nesting-and-organizing-components*/}

Компоненты — это обычные функции JavaScript, поэтому вы можете хранить несколько компонентов в одном файле.  Это удобно, когда компоненты относительно небольшие или тесно связаны друг с другом. Если этот файл разрастется, вы всегда можете переместить `Profile` в отдельный файл. Скоро вы узнаете как это сделать на [странице об импорте.](/learn/importing-and-exporting-components)

Поскольку компоненты `Profile` отображаются внутри `Gallery` — даже несколько раз! — мы можем сказать, что `Gallery` является **родительским компонентом**, отображающим каждый `Profile` в качестве "дочернего". Это часть магии React: вы можете определить компонент один раз, а затем использовать его во многих местах и столько раз, сколько захотите.

<details>
<summary><small>(eng)</small></summary>

Components are regular JavaScript functions, so you can keep multiple components in the same file. This is convenient when components are relatively small or tightly related to each other. If this file gets crowded, you can always move `Profile` to a separate file. You will learn how to do this shortly on the [page about imports.](/learn/importing-and-exporting-components)

Because the `Profile` components are rendered inside `Gallery`—even several times!—we can say that `Gallery` is a **parent component,** rendering each `Profile` as a "child". This is part of the magic of React: you can define a component once, and then use it in as many places and as many times as you like.
</details>

<Pitfall>

Компоненты могут рендерить другие компоненты, но **вы никогда не должны вкладывать их определения друг в друга:**

```js {2-5}
export default function Gallery() {
  // 🔴 Never define a component inside another component!
  function Profile() {
    // ...
  }
  // ...
}
```

Приведенный выше фрагмент [очень медленный и вызывает ошибки.](/learn/preserving-and-resetting-state#different-components-at-the-same-position-reset-state) Вместо этого определяйте каждый компонент на верхнем уровне:

```js {5-8}
export default function Gallery() {
  // ...
}
// ✅ Declare components at the top level
function Profile() {
  // ...
}
```

Когда дочернему компоненту нужны данные от родительского, [передайте их параметрами](/learn/passing-props-to-a-component) вместо вложенных определений.

<details>
<summary><small>(eng)</small></summary>

Components can render other components, but **you must never nest their definitions**

The snippet above is [very slow and causes bugs.](/learn/preserving-and-resetting-state#different-components-at-the-same-position-reset-state) Instead, define every component at the top level:

When a child component needs some data from a parent, [pass it by props](/learn/passing-props-to-a-component) instead of nesting definitions.

</details>

</Pitfall>

<DeepDive>

#### Компоненты вниз по порядку {/*components-all-the-way-down*/}

Ваше приложение React начинается с "корневого" компонента. Обычно он создается автоматически, когда вы начинаете новый проект. Например, если вы использует [CodeSandbox](https://codesandbox.io/) или фреймворк [Next.js](https://nextjs.org/), корневой компонент определяется в `pages/index.js`. В приведенных примерах вы экспортировали корневые компоненты. 

Most React apps use components all the way down. This means that you won't only use components for reusable pieces like buttons, but also for larger pieces like sidebars, lists, and ultimately, complete pages! Components are a handy way to organize UI code and markup, even if some of them are only used once.

Большинство приложений React используют компоненты по всему пути вниз - all the way down. Это означает, что вы будете использовать компоненты не только для переиспользуемых частей, таких как кнопки, но и для более крупных частей, таких как боковые панели, списки и, в конечном итоге, целые страницы! Компоненты — это удобный способ организации кода и разметки пользовательского интерфейса, даже если некоторые из них используются только один раз.

[Фреймворки на основе React](/learn/start-a-new-react-project) делают еще один шаг вперед. Вместо того чтобы использовать пустой HTML-файл и позволить React "взять на себя" управление страницей с помощью JavaScript, они *также* генерируют HTML автоматически из ваших компонентов React. Это позволяет вашему приложению показать некоторое содержимое до загрузки кода JavaScript.

Тем не менее, многие веб-сайты используют React только для [ добавления интерактивности на существующие HTML-страницы.](/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page)  У них много корневых компонентов вместо одного для всей страницы. Вы можете использовать так много или так мало React, как вам нужно.

<details>
<summary><small>(eng)</small></summary>

Your React application begins at a "root" component. Usually, it is created automatically when you start a new project. For example, if you use [CodeSandbox](https://codesandbox.io/) or if you use the framework [Next.js](https://nextjs.org/), the root component is defined in `pages/index.js`. In these examples, you've been exporting root components.

Most React apps use components all the way down. This means that you won't only use components for reusable pieces like buttons, but also for larger pieces like sidebars, lists, and ultimately, complete pages! Components are a handy way to organize UI code and markup, even if some of them are only used once.

[React-based frameworks](/learn/start-a-new-react-project) take this a step further. Instead of using an empty HTML file and letting React "take over" managing the page with JavaScript, they *also* generate the HTML automatically from your React components. This allows your app to show some content before the JavaScript code loads.

Still, many websites only use React to [add interactivity to existing HTML pages.](/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page) They have many root components instead of a single one for the entire page. You can use as much—or as little—React as you need.

</details>

</DeepDive>

<Recap>

Вы только что впервые попробовали React! Давайте вспомним некоторые ключевые моменты.

* React позволяет создавать компоненты, **повторно используемые элементы пользовательского интерфейса для вашего приложения.**
* В приложении React каждый элемент пользовательского интерфейса является компонентом.
* Компоненты React — это обычные функции JavaScript, за исключением:

  1. Их имена всегда начинаются с заглавной буквы.
  2. Они возвращают JSX-разметку.

<details>
<summary><small>(eng)</small></summary>

You've just gotten your first taste of React! Let's recap some key points.

* React lets you create components, **reusable UI elements for your app.**
* In a React app, every piece of UI is a component.
* React components are regular JavaScript functions except:

  1. Their names always begin with a capital letter.
  2. They return JSX markup.

</details>

</Recap>

<Challenges>

#### Экспорт компонента {/*export-the-component*/}

Этот код не работает, потому что корневой компонент не экспортируется:

<details>
<summary><small>(eng)</small></summary>

This sandbox doesn't work because the root component is not exported:

</details>

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Aklilu Lemma"
    />
  );
}
```

```css
img { height: 181px; }
```

</Sandpack>

Попробуйте исправить это сами, прежде чем смотреть решение!

<details>
<summary><small>(eng)</small></summary>

Try to fix it yourself before looking at the solution!

</details>

<Solution>

Добавьте `export default` перед определением функции следующим образом:

<details>
<summary><small>(eng)</small></summary>

Add `export default` before the function definition like so:

</details>

<Sandpack>

```js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Aklilu Lemma"
    />
  );
}
```

```css
img { height: 181px; }
```

</Sandpack>

Вам может быть интересно, почему одного написания `export` недостаточно для исправления этого примера. Вы можете узнать разницу между `export` и `export default` в [Импорт и экспорт компонентов.](/learn/importing-and-exporting-components)

<details>
<summary><small>(eng)</small></summary>

You might be wondering why writing `export` alone is not enough to fix this example. You can learn the difference between `export` and `export default` in [Importing and Exporting Components.](/learn/importing-and-exporting-components)

</details>

</Solution>

#### Исправьте оператор возвращения {/*fix-the-return-statement*/}

Что-то не так в этом выражении `return`. Можете ли вы исправить это?

<details>
<summary><small>(eng)</small></summary>

Something isn't right about this `return` statement. Can you fix it?

</details>

<Hint>

Вы можете получить ошибку "Unexpected token" при попытке исправить это. В этом случае проверьте, что точка с запятой стоит *после* закрывающей скобки. Если оставить точку с запятой внутри `return ( )`, это приведет к ошибке.

<details>
<summary><small>(eng)</small></summary>

You may get an "Unexpected token" error while trying to fix this. In that case, check that the semicolon appears *after* the closing parenthesis. Leaving a semicolon inside `return ( )` will cause an error.

</details>

</Hint>

<Sandpack>

```js
export default function Profile() {
  return
    <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img { height: 180px; }
```

</Sandpack>

<Solution>

Вы можете исправить этот компонент, переместив возвращаемое выражение на одну строку:

<details>
<summary><small>(eng)</small></summary>

You can fix this component by moving the return statement to one line like so:

</details>

<Sandpack>

```js
export default function Profile() {
  return <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img { height: 180px; }
```

</Sandpack>


Или обернуть возвращаемую JSX-разметку в круглые скобки, которые открываются сразу после `return`:

<details>
<summary><small>(eng)</small></summary>

Or by wrapping the returned JSX markup in parentheses that open right after `return`:

</details>

<Sandpack>

```js
export default function Profile() {
  return (
    <img 
      src="https://i.imgur.com/jA8hHMpm.jpg" 
      alt="Katsuko Saruhashi" 
    />
  );
}
```

```css
img { height: 180px; }
```

</Sandpack>

</Solution>

#### Найдите ошибку {/*spot-the-mistake*/}

Что-то не так в том, как объявлен и используется компонент `Profile`. Можете ли вы найти ошибку? Постарайтесь вспомнить, как React отличает компоненты от обычных HTML-тегов!

<details>
<summary><small>(eng)</small></summary>

Something's wrong with how the `Profile` component is declared and used. Can you spot the mistake? (Try to remember how React distinguishes components from the regular HTML tags!)

</details>

<Sandpack>

```js
function profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <profile />
      <profile />
      <profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

<Solution>

Имена компонентов React должны начинаться с заглавной буквы.

Измените `function profile()` на `function Profile()`, а затем измените каждый `<profile />` на `<Profile />`:

<details>
<summary><small>(eng)</small></summary>

React component names must start with a capital letter.

Change `function profile()` to `function Profile()`, and then change every `<profile />` to `<Profile />`:

</details>


<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
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
img { margin: 0 10px 10px 0; }
```

</Sandpack>

</Solution>

#### Ваш собственный компонент {/*your-own-component*/}

Напишите компонент с нуля. Вы можете дать ему любое допустимое имя и вернуть любую разметку. Если у вас нет идей, вы можете написать компонент `Congratulations`, который показывает `<h1>Хорошая работа!</h1>`. Не забудьте экспортировать его!

<details>
<summary><small>(eng)</small></summary>

Write a component from scratch. You can give it any valid name and return any markup. If you're out of ideas, you can write a `Congratulations` component that shows `<h1>Good job!</h1>`. Don't forget to export it!

</details>

<Sandpack>

```js
// Write your component below!

```

</Sandpack>

<Solution>

<Sandpack>

```js
export default function Congratulations() {
  return (
    <h1>Good job!</h1>
  );
}
```

</Sandpack>

</Solution>

</Challenges>
