---
title: Пишем разметку с помощью JSX
---

<Intro>

*JSX* - это расширение синтаксиса для JavaScript, позволяющее писать HTML-подобную разметку внутри JavaScript-файла. Хотя существуют и другие способы написания компонентов, большинство разработчиков React предпочитают лаконичность JSX, и большинство кодовых баз используют именно его.

<details>
<summary><small>(eng)</small></summary>

*JSX* is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. Although there are other ways to write components, most React developers prefer the conciseness of JSX, and most codebases use it.

</details>

</Intro>

<YouWillLearn>

* Почему React смешивает разметку с логикой рендеринга
* Чем JSX отличается от HTML
* Как отображать информацию с помощью JSX

<details>
<summary><small>(eng)</small></summary>

* Why React mixes markup with rendering logic
* How JSX is different from HTML
* How to display information with JSX

</details>

</YouWillLearn>

## JSX: Размещение разметки в JavaScript {/*jsx-putting-markup-into-javascript*/}

Веб был построен на HTML, CSS и JavaScript. В течение многих лет веб-разработчики хранили содержимое в HTML, дизайн в CSS, а логику в JavaScript - часто в отдельных файлах! Контент размечался внутри HTML, а логика страницы жила отдельно в JavaScript:

<details>
<summary><small>(eng)</small></summary>

The Web has been built on HTML, CSS, and JavaScript. For many years, web developers kept content in HTML, design in CSS, and logic in JavaScript—often in separate files! Content was marked up inside HTML while the page's logic lived separately in JavaScript:

</details>

<DiagramGroup>

<Diagram name="writing_jsx_html" height={237} width={325} alt="HTML markup with purple background and a div with two child tags: p and form. ">

HTML

</Diagram>

<Diagram name="writing_jsx_js" height={237} width={325} alt="Three JavaScript handlers with yellow background: onSubmit, onLogin, and onClick.">

JavaScript

</Diagram>

</DiagramGroup>

Но по мере того как Web становился все более интерактивным, логика все больше определяла содержание. JavaScript стал отвечать за HTML! Вот почему **в React логика рендеринга и разметка живут в одном месте - в компонентах*.

<details>
<summary><small>(eng)</small></summary>

But as the Web became more interactive, logic increasingly determined content. JavaScript was in charge of the HTML! This is why **in React, rendering logic and markup live together in the same place—components.**

</details>

<DiagramGroup>

<Diagram name="writing_jsx_sidebar" height={330} width={325} alt="React component with HTML and JavaScript from previous examples mixed. Function name is Sidebar which calls the function isLoggedIn, highlighted in yellow. Nested inside the function highlighted in purple is the p tag from before, and a Form tag referencing the component shown in the next diagram.">

<small>`Sidebar.js` React компонент</small>

</Diagram>

<Diagram name="writing_jsx_form" height={330} width={325} alt="React component with HTML and JavaScript from previous examples mixed. Function name is Form containing two handlers onClick and onSubmit highlighted in yellow. Following the handlers is HTML highlighted in purple. The HTML contains a form element with a nested input element, each with an onClick prop.">

<small>`Form.js` React компонент</small>

</Diagram>

</DiagramGroup>

Совместное хранение логики рендеринга и разметки кнопки гарантирует, что они будут синхронизироваться друг с другом при каждом редактировании. И наоборот, детали, не связанные между собой, такие как разметка кнопки и разметка боковой панели, изолированы друг от друга, что делает безопасным изменение каждой из них по отдельности.

Каждый компонент React - это функция JavaScript, которая может содержать некоторую разметку, которую React отображает в браузере. Компоненты React используют расширение синтаксиса, называемое JSX, для представления этой разметки. JSX очень похож на HTML, но он немного строже и может отображать динамическую информацию. Лучший способ понять это - преобразовать HTML-разметку в JSX-разметку.

<details>
<summary><small>(eng)</small></summary>

Keeping a button's rendering logic and markup together ensures that they stay in sync with each other on every edit. Conversely, details that are unrelated, such as the button's markup and a sidebar's markup, are isolated from each other, making it safer to change either of them on their own.

Each React component is a JavaScript function that may contain some markup that React renders into the browser. React components use a syntax extension called JSX to represent that markup. JSX looks a lot like HTML, but it is a bit stricter and can display dynamic information. The best way to understand this is to convert some HTML markup to JSX markup.

</details>

<Note>

JSX и React - это две разные вещи. Их часто используют вместе, но вы *можете* [использовать их независимо](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform) друг от друга. JSX - это расширение синтаксиса, а React - библиотека JavaScript.

<details>
<summary><small>(eng)</small></summary>

JSX and React are two separate things. They're often used together, but you *can* [use them independently](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform) of each other. JSX is a syntax extension, while React is a JavaScript library.

</details>

</Note>

## Конвертирование HTML в JSX {/*converting-html-to-jsx*/}

Предположим, что у вас есть некоторый (совершенно правильный) HTML:

<details>
<summary><small>(eng)</small></summary>

Suppose that you have some (perfectly valid) HTML:

</details>

```html
<h1>Hedy Lamarr's Todos</h1>
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  class="photo"
>
<ul>
    <li>Invent new traffic lights
    <li>Rehearse a movie scene
    <li>Improve the spectrum technology
</ul>
```

И вы хотите поместить его в свой компонент:

<details>
<summary><small>(eng)</small></summary>

And you want to put it into your component:

</details>

```js
export default function TodoList() {
  return (
    // ???
  )
}
```

Если вы скопируете и вставите его как есть, он не будет работать:

<details>
<summary><small>(eng)</small></summary>

If you copy and paste it as is, it will not work:

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
      <li>Improve the spectrum technology
    </ul>
  );
}
```

```css
img { height: 90px }
```

</Sandpack>

Это связано с тем, что JSX более строг и имеет несколько больше правил, чем HTML! Если вы прочитаете сообщения об ошибках выше, они подскажут вам, как исправить разметку, или вы можете следовать руководству ниже.

<details>
<summary><small>(eng)</small></summary>

This is because JSX is stricter and has a few more rules than HTML! If you read the error messages above, they'll guide you to fix the markup, or you can follow the guide below.

</details>

<Note>

В большинстве случаев экранные сообщения об ошибках React помогут вам найти причину проблемы. Прочитайте их, если застряли!

<details>
<summary><small>(eng)</small></summary>

Most of the time, React's on-screen error messages will help you find where the problem is. Give them a read if you get stuck!

</details>

</Note>

## Правила JSX {/*the-rules-of-jsx*/}

### 1. Возвращайте один корневой элемент {/*1-return-a-single-root-element*/}

Чтобы вернуть несколько элементов из компонента, **оберните их одним родительским тегом**.

Например, вы можете использовать `<div>`:

<details>
<summary><small>(eng)</small></summary>

To return multiple elements from a component, **wrap them with a single parent tag.**

For example, you can use a `<div>`:

</details>


```js {1,11}
<div>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>
```

Если вы не хотите добавлять в разметку лишние `<div>`, вместо них можно написать `<>` и `</>`:

<details>
<summary><small>(eng)</small></summary>

If you don't want to add an extra `<div>` to your markup, you can write `<>` and `</>` instead:

</details>

```js {1,11}
<>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
```

Этот пустой тег называется *[Фрагмент.](/reference/react/Fragment)* Фрагменты позволяют группировать объекты, не оставляя следов в HTML-дереве браузера.

<details>
<summary><small>(eng)</small></summary>

This empty tag is called a *[Fragment.](/reference/react/Fragment)* Fragments let you group things without leaving any trace in the browser HTML tree.

</details>

<DeepDive>

#### Почему несколько тегов JSX должны быть обернуты? {/*why-do-multiple-jsx-tags-need-to-be-wrapped*/}

JSX выглядит как HTML, но под капотом он преобразуется в обычные объекты JavaScript. Вы не можете вернуть два объекта из функции, не обернув их в массив. Это объясняет, почему вы также не можете вернуть два тега JSX, не обернув их в другой тег или фрагмент.

<details>
<summary><small>(eng)</small></summary>

JSX looks like HTML, but under the hood it is transformed into plain JavaScript objects. You can't return two objects from a function without wrapping them into an array. This explains why you also can't return two JSX tags without wrapping them into another tag or a Fragment.

</details>

</DeepDive>

### 2. Закройте все теги {/*2-close-all-the-tags*/}

JSX требует, чтобы теги были явно закрыты: самозакрывающиеся теги вроде `<img>` должны стать `<img />`, а парные(открывающий и закрывающий) теги вроде `<li>oranges` должны быть записаны как `<li>oranges</li>`.

Так выглядит закрытие тега изображения Хеди Ламарр и элементов списка:

<details>
<summary><small>(eng)</small></summary>

JSX requires tags to be explicitly closed: self-closing tags like `<img>` must become `<img />`, and wrapping tags like `<li>oranges` must be written as `<li>oranges</li>`.

This is how Hedy Lamarr's image and list items look closed:

</details>

```js {2-6,8-10}
<>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
   />
  <ul>
    <li>Invent new traffic lights</li>
    <li>Rehearse a movie scene</li>
    <li>Improve the spectrum technology</li>
  </ul>
</>
```

### 3. camelCase <s>все</s> большинство вещей! {/*3-camelcase-salls-most-of-the-things*/}

JSX превращается в JavaScript, а атрибуты, записанные в JSX, становятся ключами объектов JavaScript. В ваших собственных компонентах вы часто захотите считать эти атрибуты в переменные. Но JavaScript имеет ограничения на имена переменных. Например, их имена не могут содержать тире или быть зарезервированными словами вроде `class`.

Поэтому в React многие атрибуты HTML и SVG пишутся в camelCase. Например, вместо `stroke-width` вы используете `strokeWidth`. Поскольку `class` является зарезервированным словом, в React вместо него пишется `className`, названный в честь [соответствующего свойства DOM](https://developer.mozilla.org/en-US/docs/Web/API/Element/className):

<details>
<summary><small>(eng)</small></summary>

JSX turns into JavaScript and attributes written in JSX become keys of JavaScript objects. In your own components, you will often want to read those attributes into variables. But JavaScript has limitations on variable names. For example, their names can't contain dashes or be reserved words like `class`.

This is why, in React, many HTML and SVG attributes are written in camelCase. For example, instead of `stroke-width` you use `strokeWidth`. Since `class` is a reserved word, in React you write `className` instead, named after the [corresponding DOM property](https://developer.mozilla.org/en-US/docs/Web/API/Element/className):

</details>

```js {4}
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  className="photo"
/>
```

Вы можете [найти все эти атрибуты в списке реквизитов DOM-компонентов](/reference/react-dom/components/common). Если вы ошибетесь в одном из них, не волнуйтесь - React выведет сообщение с возможным исправлением в [консоль браузера](https://developer.mozilla.org/docs/Tools/Browser_Console).

<details>
<summary><small>(eng)</small></summary>

You can [find all these attributes in the list of DOM component props.](/reference/react-dom/components/common) If you get one wrong, don't worry—React will print a message with a possible correction to the [browser console.](https://developer.mozilla.org/docs/Tools/Browser_Console)

</details>

<Pitfall>

<details>
<summary><small>(eng)</small></summary>

По историческим причинам атрибуты [`aria-*`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA) и [`data-*`](https://developer.mozilla.org/docs/Learn/HTML/Howto/Use_data_attributes) записываются, как в HTML, через тире.

For historical reasons, [`aria-*`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA) and [`data-*`](https://developer.mozilla.org/docs/Learn/HTML/Howto/Use_data_attributes) attributes are written as in HTML with dashes.

</details>

</Pitfall>

### Совет: используйте конвертер JSX {/*pro-tip-use-a-jsx-converter*/}

Преобразование всех этих атрибутов в существующей разметке может быть утомительным! Мы рекомендуем использовать [конвертер](https://transform.tools/html-to-jsx), чтобы перевести существующие HTML и SVG в JSX. Конвертеры очень полезны на практике, но все же стоит понимать, что происходит, чтобы вы могли комфортно писать JSX самостоятельно.

Вот ваш конечный результат:

<details>
<summary><small>(eng)</small></summary>

Converting all these attributes in existing markup can be tedious! We recommend using a [converter](https://transform.tools/html-to-jsx) to translate your existing HTML and SVG to JSX. Converters are very useful in practice, but it's still worth understanding what is going on so that you can comfortably write JSX on your own.

Here is your final result:

</details>

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
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
}
```

```css
img { height: 90px }
```

</Sandpack>

<Recap>

Теперь вы знаете, зачем существует JSX и как использовать его в компонентах:

<details>
<summary><small>(eng)</small></summary>

Now you know why JSX exists and how to use it in components:

* React components group rendering logic together with markup because they are related.
* JSX is similar to HTML, with a few differences. You can use a [converter](https://transform.tools/html-to-jsx) if you need to.
* Error messages will often point you in the right direction to fixing your markup.

</details>

* Компоненты React группируют логику рендеринга вместе с разметкой, потому что они связаны между собой.
* JSX похож на HTML, с некоторыми отличиями. При необходимости вы можете использовать [конвертер](https://transform.tools/html-to-jsx).
* Сообщения об ошибках часто указывают вам правильное направление для исправления разметки.

</Recap>

<Challenges>

#### Преобразуйте HTML в JSX {/*convert-some-html-to-jsx*/}

Этот HTML был вставлен в компонент, но это не валидный JSX. Исправьте это:

<details>
<summary><small>(eng)</small></summary>

This HTML was pasted into a component, but it's not valid JSX. Fix it:

</details>

<Sandpack>

```js
export default function Bio() {
  return (
    <div class="intro">
      <h1>Welcome to my website!</h1>
    </div>
    <p class="summary">
      You can find my thoughts here.
      <br><br>
      <b>And <i>pictures</b></i> of scientists!
    </p>
  );
}
```

```css
.intro {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary {
  padding: 20px;
  border: 10px solid gold;
}
```

</Sandpack>

Делать ли это вручную или с помощью конвертера - решать вам!

<details>
<summary><small>(eng)</small></summary>

Whether to do it by hand or using the converter is up to you!

</details>

<Solution>

<Sandpack>

```js
export default function Bio() {
  return (
    <div>
      <div className="intro">
        <h1>Welcome to my website!</h1>
      </div>
      <p className="summary">
        You can find my thoughts here.
        <br /><br />
        <b>And <i>pictures</i></b> of scientists!
      </p>
    </div>
  );
}
```

```css
.intro {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary {
  padding: 20px;
  border: 10px solid gold;
}
```

</Sandpack>

</Solution>

</Challenges>
