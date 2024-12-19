---
title: Передача пропсов компоненту
---

<Intro>

Компоненты React используют *пропсы* для взаимодействия друг с другом. Каждый родительский компонент может передать некоторую информацию своим дочерним компонентам, передавая им параметры. Параметры могут напомнить вам об атрибутах HTML, но через них можно передавать любые значения JavaScript, включая объекты, массивы и функции.

<details>
<summary><small>(eng)</small></summary>

React components use *props* to communicate with each other. Every parent component can pass some information to its child components by giving them props. Props might remind you of HTML attributes, but you can pass any JavaScript value through them, including objects, arrays, and functions.

</details>

</Intro>

<YouWillLearn>

* Как передать параметры компоненту
* Как читать параметры из компонента
* Как указать значения по умолчанию для параметров
* Как передать JSX компоненту
* Как параметры изменяются со временем

<details>
<summary><small>(eng)</small></summary>

* How to pass props to a component
* How to read props from a component
* How to specify default values for props
* How to pass some JSX to a component
* How props change over time

</details>

</YouWillLearn>

## Знакомые параметры {/*familiar-props*/}

Параметры - это информация, которую вы передаете в JSX-тег. Например, `className`, `src`, `alt`, `width` и `height` - это некоторые параметры, которые вы можете передать тегу `<img>`:

<details>
<summary><small>(eng)</small></summary>

Props are the information that you pass to a JSX tag. For example, `className`, `src`, `alt`, `width`, and `height` are some of the props you can pass to an `<img>`:

</details>

<Sandpack>

```js
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return (
    <Avatar />
  );
}
```

```css
body { min-height: 120px; }
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

Параметры, которые вы можете передать тегу `<img>`, предопределены (ReactDOM соответствует [стандарту HTML](https://www.w3.org/TR/html52/semantics-embedded-content.html#the-img-element)). Но вы можете передавать любые параметры *своим* компонентам, например `<Avatar>`, чтобы настроить их. Вот как!

<details>
<summary><small>(eng)</small></summary>

The props you can pass to an `<img>` tag are predefined (ReactDOM conforms to [the HTML standard](https://www.w3.org/TR/html52/semantics-embedded-content.html#the-img-element)). But you can pass any props to *your own* components, such as `<Avatar>`, to customize them. Here's how!

</details>

## Передача параметров компоненту {/*passing-props-to-a-component*/}

В этом коде компонент `Profile` не передает никаких параметров своему дочернему компоненту `Avatar`:

<details>
<summary><small>(eng)</small></summary>

In this code, the `Profile` component isn't passing any props to its child component, `Avatar`:

</details>

```js
export default function Profile() {
  return (
    <Avatar />
  );
}
```

Вы можете придать `Аватару` некоторые параметры в два этапа.

<details>
<summary><small>(eng)</small></summary>

You can give `Avatar` some props in two steps.

</details>

### Step 1: Передача параметров дочернему компоненту {/*step-1-pass-props-to-the-child-component*/}

Сначала передайте `Avatar` некоторые параметры. Например, передадим два параметра: `person` (объект) и `Size` (число):

<details>
<summary><small>(eng)</small></summary>

First, pass some props to `Avatar`. For example, let's pass two props: `person` (an object), and `size` (a number):

</details>

```js
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```

Если двойные фигурные скобки после `person=` вас смущают, вспомните [они просто объект](/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx) внутри JSX-скобок.

<Note> Теперь вы можете прочитать эти параметры внутри компонента `Avatar`.</Note>

<details>
<summary><small>(eng)</small></summary>

If double curly braces after `person=` confuse you, recall [they're merely an object](/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx) inside the JSX curlies.

<Note>Now you can read these props inside the `Avatar` component.</Note>

</details>

### Шаг 2: Чтение параметров внутри дочернего компонента {/*step-2-read-props-inside-the-child-component*/}

Вы можете прочитать эти параметры, перечислив их имена `person, size` через запятую внутри `({` и `})` непосредственно после `функции Avatar`. Это позволит вам использовать их внутри кода `Avatar`, как вы бы сделали это с переменной.

<details>
<summary><small>(eng)</small></summary>

You can read these props by listing their names `person, size` separated by the commas inside `({` and `})` directly after `function Avatar`. This lets you use them inside the `Avatar` code, like you would with a variable.

</details>

```js
function Avatar({ person, size }) {
  // person and size are available here
}
```

Добавьте в `Avatar` логику, которая использует параметры `person` и ``size` для рендеринга, и все готово.

Теперь вы можете настроить `Avatar` на рендеринг различными способами с разными параметрами. Попробуйте изменить значения!

<details>
<summary><small>(eng)</small></summary>

Add some logic to `Avatar` that uses the `person` and `size` props for rendering, and you're done.
Now you can configure `Avatar` to render in many different ways with different props. Try tweaking the values!

</details>

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

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

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma', 
          imageId: 'OKS67lh'
        }}
      />
      <Avatar
        size={50}
        person={{ 
          name: 'Lin Lanying',
          imageId: '1bX5QH6'
        }}
      />
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
body { min-height: 120px; }
.avatar { margin: 10px; border-radius: 50%; }
```

</Sandpack>

Параметры позволяют вам думать о родительских и дочерних компонентах независимо друг от друга. Например, вы можете изменить параметры `person` или `size` внутри `Profile`, не задумываясь о том, как их использует `Avatar`. Аналогично, вы можете изменить то, как `Avatar` использует эти параметры, не заглядывая в `Profile`.

Вы можете думать о параметрах как о «ручках», которые можно регулировать. Они выполняют ту же роль, что и аргументы в функциях - фактически, параметры _являются_ единственным аргументом вашего компонента! Функции компонентов React принимают единственный аргумент - объект `props`:

<details>
<summary><small>(eng)</small></summary>

Props let you think about parent and child components independently. For example, you can change the `person` or the `size` props inside `Profile` without having to think about how `Avatar` uses them. Similarly, you can change how the `Avatar` uses these props, without looking at the `Profile`.

You can think of props like "knobs" that you can adjust. They serve the same role as arguments serve for functions—in fact, props _are_ the only argument to your component! React component functions accept a single argument, a `props` object:

</details>

```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

Обычно вам не нужен весь объект `props`, поэтому вы деструктурируете его на отдельные параметры.

<details>
<summary><small>(eng)</small></summary>

Usually you don't need the whole `props` object itself, so you destructure it into individual props.

</details>

<Pitfall>

**Не пропустите пару символов `{` и `}`** внутри ``(`` и ``)`` при объявлении параметров:


```js
function Avatar({ person, size }) {
  // ...
}
```

Этот синтаксис называется [«деструктуризацией»](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_a_function_parameter) и эквивалентен чтению свойств из параметра функции:

<details>
<summary><small>(eng)</small></summary>

**Don't miss the pair of `{` and `}` curlies** inside of `(` and `)` when declaring props:

This syntax is called ["destructuring"](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_a_function_parameter) and is equivalent to reading properties from a function parameter:

</details>

```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

</Pitfall>

## Указание значения по умолчанию для параметра {/*specifying-a-default-value-for-a-prop*/}

Если вы хотите дать параметру значение по умолчанию, чтобы он мог вернуться к нему, когда значение не указано, вы можете сделать это с помощью деструктуризации, поместив `=` и значение по умолчанию сразу после параметра:

<details>
<summary><small>(eng)</small></summary>

If you want to give a prop a default value to fall back on when no value is specified, you can do it with the destructuring by putting `=` and the default value right after the parameter:

</details>

```js
function Avatar({ person, size = 100 }) {
  // ...
}
```

Теперь, если `<Avatar person={...} />` рендерится без параметра `size`, то `size` будет установлен на `100`.

Значение по умолчанию используется только в том случае, если параметр `size` отсутствует или если вы передали `size={undefined}`. Если же вы передадите `size={null}` или `size={0}`, значение по умолчанию **не** будет использоваться.

<details>
<summary><small>(eng)</small></summary>

Now, if `<Avatar person={...} />` is rendered with no `size` prop, the `size` will be set to `100`.

The default value is only used if the `size` prop is missing or if you pass `size={undefined}`. But if you pass `size={null}` or `size={0}`, the default value will **not** be used.

</details>

## Пересылка параметров с помощью синтаксиса расширения JSX {/*forwarding-props-with-the-jsx-spread-syntax*/}

Иногда передача параметров становится слишком повторяющейся:

<details>
<summary><small>(eng)</small></summary>

Sometimes, passing props gets very repetitive:

</details>

```js
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```

Нет ничего плохого в повторяющемся коде - он может быть более разборчивым. Но иногда вам может быть важна краткость. Некоторые компоненты передают все свои параметры своим дочерним компонентам, например, как этот `Profile` делает это с `Avatar`. Поскольку они не используют параметры напрямую, имеет смысл использовать более лаконичный синтаксис «распространения»:

<details>
<summary><small>(eng)</small></summary>

There's nothing wrong with repetitive code—it can be more legible. But at times you may value conciseness. Some components forward all of their props to their children, like how this `Profile` does with `Avatar`. Because they don't use any of their props directly, it can make sense to use a more concise "spread" syntax:

</details>

```js
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

Это пересылает все параметры `Profile` в `Avatar` без перечисления их имен.

**Используйте синтаксис spread сдержанно.** Если вы используете этот синтаксис в каждом компоненте, значит, что-то не так. Часто это указывает на то, что вам следует разделить компоненты и передавать дочерние компоненты в виде JSX. Подробнее об этом в следующем выпуске!

<details>
<summary><small>(eng)</small></summary>

This forwards all of `Profile`'s props to the `Avatar` without listing each of their names.

**Use spread syntax with restraint.** If you're using it in every other component, something is wrong. Often, it indicates that you should split your components and pass children as JSX. More on that next!

</details>

## Передача JSX в качестве дочерних элементов {/*passing-jsx-as-children*/}

Часто встречается вложение встроенных тегов браузера:

```js
<div>
  <img />
</div>
```

Иногда вам потребуется вложить свои собственные компоненты таким же образом:

```js
<Card>
  <Avatar />
</Card>
```

Когда вы вкладываете содержимое в JSX-тег, родительский компонент получит его в параметре `children`. Например, компонент `Card` ниже получит параметр `children`, установленный на `<Avatar />`, и отобразит его в div-обертке:

<details>
<summary><small>(eng)</small></summary>

It is common to nest built-in browser tags:

Sometimes you'll want to nest your own components the same way:

When you nest content inside a JSX tag, the parent component will receive that content in a prop called `children`. For example, the `Card` component below will receive a `children` prop set to `<Avatar />` and render it in a wrapper div:

</details>

<Sandpack>

```js src/App.js
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

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
```

```js src/Avatar.js
import { getImageUrl } from './utils.js';

export default function Avatar({ person, size }) {
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

Попробуйте заменить `<Avatar>` внутри `<Card>` на текст, чтобы увидеть, как компонент `Card` может обернуть любое вложенное содержимое. Ему не нужно «знать», что отображается внутри него. Вы увидите этот гибкий паттерн во многих местах.

Компонент с параметром `children` можно представить как имеющий «дыру», которая может быть «заполнена» его родительскими компонентами с помощью произвольного JSX. Вы часто будете использовать параметр `children` для визуальных оберток: панелей, сеток и т. д.

<details>
<summary><small>(eng)</small></summary>

Try replacing the `<Avatar>` inside `<Card>` with some text to see how the `Card` component can wrap any nested content. It doesn't need to "know" what's being rendered inside of it. You will see this flexible pattern in many places.

You can think of a component with a `children` prop as having a "hole" that can be "filled in" by its parent components with arbitrary JSX. You will often use the `children` prop for visual wrappers: panels, grids, etc.

</details>

<Illustration src="/images/docs/illustrations/i_children-prop.png" alt='A puzzle-like Card tile with a slot for "children" pieces like text and Avatar' />

## Как изменяются параметры с течением времени {/*how-props-change-over-time*/}

Компонент `Clock`, представленный ниже, получает два параметра от своего родительского компонента: `color` и `time`. (Код родительского компонента опущен, поскольку он использует [state](/learn/state-a-components-memory), в который мы пока не будем углубляться).

Попробуйте изменить цвет в поле выбора ниже:

<details>
<summary><small>(eng)</small></summary>

The `Clock` component below receives two props from its parent component: `color` and `time`. (The parent component's code is omitted because it uses [state](/learn/state-a-components-memory), which we won't dive into just yet.)

Try changing the color in the select box below:

</details>

<Sandpack>

```js src/Clock.js active
export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}
```

```js src/App.js hidden
import { useState, useEffect } from 'react';
import Clock from './Clock.js';

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const time = useTime();
  const [color, setColor] = useState('lightcoral');
  return (
    <div>
      <p>
        Pick a color:{' '}
        <select value={color} onChange={e => setColor(e.target.value)}>
          <option value="lightcoral">lightcoral</option>
          <option value="midnightblue">midnightblue</option>
          <option value="rebeccapurple">rebeccapurple</option>
        </select>
      </p>
      <Clock color={color} time={time.toLocaleTimeString()} />
    </div>
  );
}
```

</Sandpack>

Этот пример иллюстрирует, что **компонент может получать различные параметры с течением времени.** Параметры не всегда статичны! Здесь реквизит `time` меняется каждую секунду, а реквизит `color` меняется, когда вы выбираете другой цвет. Параметры отражают данные компонента в любой момент времени, а не только в начале.

Однако параметры являются [неизменяемыми](https://en.wikipedia.org/wiki/Immutable_object)- термин из информатики, означающий «неизменный». Когда компоненту нужно изменить свои параметры (например, в ответ на взаимодействие с пользователем или новые данные), он должен «попросить» свой родительский компонент передать ему _другие параметры_ - новый объект! Старые параметры будут отброшены, и в конечном итоге движок JavaScript вернет себе память, которую они занимали.

**Не пытайтесь «менять параметры».** Когда вам нужно будет реагировать на ввод пользователя (например, менять выбранный цвет), вам нужно будет «установить состояние», о чем вы можете узнать в [Состояние: Память компонента.](/learn/state-a-components-memory).


<details>
<summary><small>(eng)</small></summary>

This example illustrates that **a component may receive different props over time.** Props are not always static! Here, the `time` prop changes every second, and the `color` prop changes when you select another color. Props reflect a component's data at any point in time, rather than only in the beginning.

However, props are [immutable](https://en.wikipedia.org/wiki/Immutable_object)—a term from computer science meaning "unchangeable". When a component needs to change its props (for example, in response to a user interaction or new data), it will have to "ask" its parent component to pass it _different props_—a new object! Its old props will then be cast aside, and eventually the JavaScript engine will reclaim the memory taken by them.

**Don't try to "change props".** When you need to respond to the user input (like changing the selected color), you will need to "set state", which you can learn about in [State: A Component's Memory.](/learn/state-a-components-memory)

</details>

<Recap>

* Чтобы передать параметры, добавьте их в JSX, как в случае с HTML-атрибутами.
* Чтобы прочитать параметры, используйте синтаксис деструктуризации `function Avatar({ person, size })`.
* Вы можете указать значение по умолчанию, например ``размер = 100``, которое используется для отсутствующих и ``undefined`` параметров.
* Вы можете переслать все параметры с помощью `<Avatar {...props} />` Синтаксис расширения JSX, но не злоупотребляйте им!
* Вложенный JSX типа `<Card><Avatar /></Card>` будет отображаться как `children` параметр компонента `Card`.
* Параметры - это снимки(фиксация положения) на определенный момент времени, доступные только для чтения: каждый рендер получает новую версию параметров.
* Вы не можете изменять параметры. Когда вам понадобится интерактивность, вам нужно будет установить состояние.

<details>
<summary><small>(eng)</small></summary>

* To pass props, add them to the JSX, just like you would with HTML attributes.
* To read props, use the `function Avatar({ person, size })` destructuring syntax.
* You can specify a default value like `size = 100`, which is used for missing and `undefined` props.
* You can forward all props with `<Avatar {...props} />` JSX spread syntax, but don't overuse it!
* Nested JSX like `<Card><Avatar /></Card>` will appear as `Card` component's `children` prop.
* Props are read-only snapshots in time: every render receives a new version of props.
* You can't change props. When you need interactivity, you'll need to set state.

</details>

</Recap>

<Challenges>

#### Извлеките компонент {/*extract-a-component*/}

Этот компонент `Gallery` содержит очень похожую разметку для двух профилей. Извлеките из него компонент `Profile`, чтобы уменьшить дублирование. Вам нужно будет выбрать, какие параметры ему передавать.

<details>
<summary><small>(eng)</small></summary>

This `Gallery` component contains some very similar markup for two profiles. Extract a `Profile` component out of it to reduce the duplication. You'll need to choose what props to pass to it.

</details>

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <section className="profile">
        <h2>Maria Skłodowska-Curie</h2>
        <img
          className="avatar"
          src={getImageUrl('szV5sdG')}
          alt="Maria Skłodowska-Curie"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            physicist and chemist
          </li>
          <li>
            <b>Awards: 4 </b> 
            (Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)
          </li>
          <li>
            <b>Discovered: </b>
            polonium (chemical element)
          </li>
        </ul>
      </section>
      <section className="profile">
        <h2>Katsuko Saruhashi</h2>
        <img
          className="avatar"
          src={getImageUrl('YfeOqp2')}
          alt="Katsuko Saruhashi"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            geochemist
          </li>
          <li>
            <b>Awards: 2 </b> 
            (Miyake Prize for geochemistry, Tanaka Prize)
          </li>
          <li>
            <b>Discovered: </b>
            a method for measuring carbon dioxide in seawater
          </li>
        </ul>
      </section>
    </div>
  );
}
```

```js src/utils.js
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

<Hint>

Начните с извлечения разметки для одного из ученых. Затем найдите части, которые не соответствуют ему во втором примере, и сделайте их настраиваемыми с помощью параметров.

<details>
<summary><small>(eng)</small></summary>

Start by extracting the markup for one of the scientists. Then find the pieces that don't match it in the second example, and make them configurable by props.

</details>

</Hint>

<Solution>

В этом решении компонент `Profile` принимает несколько параметров: `imageId` (строка), `name` (строка), `profession` (строка), `awards` (массив строк), `discovery` (строка) и `imageSize` (число).

Обратите внимание, что параметр `imageSize` имеет значение по умолчанию, поэтому мы не передаем его компоненту.

<details>
<summary><small>(eng)</small></summary>

In this solution, the `Profile` component accepts multiple props: `imageId` (a string), `name` (a string), `profession` (a string), `awards` (an array of strings), `discovery` (a string), and `imageSize` (a number).

Note that the `imageSize` prop has a default value, which is why we don't pass it to the component.

</details>

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

function Profile({
  imageId,
  name,
  profession,
  awards,
  discovery,
  imageSize = 70
}) {
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img
        className="avatar"
        src={getImageUrl(imageId)}
        alt={name}
        width={imageSize}
        height={imageSize}
      />
      <ul>
        <li><b>Profession:</b> {profession}</li>
        <li>
          <b>Awards: {awards.length} </b>
          ({awards.join(', ')})
        </li>
        <li>
          <b>Discovered: </b>
          {discovery}
        </li>
      </ul>
    </section>
  );
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile
        imageId="szV5sdG"
        name="Maria Skłodowska-Curie"
        profession="physicist and chemist"
        discovery="polonium (chemical element)"
        awards={[
          'Nobel Prize in Physics',
          'Nobel Prize in Chemistry',
          'Davy Medal',
          'Matteucci Medal'
        ]}
      />
      <Profile
        imageId='YfeOqp2'
        name='Katsuko Saruhashi'
        profession='geochemist'
        discovery="a method for measuring carbon dioxide in seawater"
        awards={[
          'Miyake Prize for geochemistry',
          'Tanaka Prize'
        ]}
      />
    </div>
  );
}
```

```js src/utils.js
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

Обратите внимание, что вам не нужен отдельный параметр `awardCount`, если `awards` - это массив. Тогда вы можете использовать `awards.length` для подсчета количества наград. Помните, что параметры могут принимать любые значения, в том числе и массивы!

Другое решение, более похожее на предыдущие примеры на этой странице, заключается в том, чтобы сгруппировать всю информацию о человеке в одном объекте и передать этот объект как один параметр:

<details>
<summary><small>(eng)</small></summary>

Note how you don't need a separate `awardCount` prop if `awards` is an array. Then you can use `awards.length` to count the number of awards. Remember that props can take any values, and that includes arrays too!

Another solution, which is more similar to the earlier examples on this page, is to group all information about a person in a single object, and pass that object as one prop:

</details>

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

function Profile({ person, imageSize = 70 }) {
  const imageSrc = getImageUrl(person)

  return (
    <section className="profile">
      <h2>{person.name}</h2>
      <img
        className="avatar"
        src={imageSrc}
        alt={person.name}
        width={imageSize}
        height={imageSize}
      />
      <ul>
        <li>
          <b>Profession:</b> {person.profession}
        </li>
        <li>
          <b>Awards: {person.awards.length} </b>
          ({person.awards.join(', ')})
        </li>
        <li>
          <b>Discovered: </b>
          {person.discovery}
        </li>
      </ul>
    </section>
  )
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile person={{
        imageId: 'szV5sdG',
        name: 'Maria Skłodowska-Curie',
        profession: 'physicist and chemist',
        discovery: 'polonium (chemical element)',
        awards: [
          'Nobel Prize in Physics',
          'Nobel Prize in Chemistry',
          'Davy Medal',
          'Matteucci Medal'
        ],
      }} />
      <Profile person={{
        imageId: 'YfeOqp2',
        name: 'Katsuko Saruhashi',
        profession: 'geochemist',
        discovery: 'a method for measuring carbon dioxide in seawater',
        awards: [
          'Miyake Prize for geochemistry',
          'Tanaka Prize'
        ],
      }} />
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
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

Хотя синтаксис выглядит несколько иначе, поскольку вы описываете свойства объекта JavaScript, а не коллекцию атрибутов JSX, эти примеры в основном эквивалентны, и вы можете выбрать любой подход.

<details>
<summary><small>(eng)</small></summary>

Although the syntax looks slightly different because you're describing properties of a JavaScript object rather than a collection of JSX attributes, these examples are mostly equivalent, and you can pick either approach.

</details>

</Solution>

#### Настройка размера изображения в зависимости от параметров {/*adjust-the-image-size-based-on-a-prop*/}

В этом примере `Avatar` получает числовой параметр `size`, который определяет ширину и высоту `<img>`. В данном примере параметр `size` установлен в значение `40`. Однако, если вы откроете изображение в новой вкладке, то заметите, что само изображение больше (`160` пикселей). Реальный размер изображения определяется тем, какой размер миниатюры вы запрашиваете.

Измените компонент `Avatar`, чтобы он запрашивал наиболее близкий размер изображения на основе параметра `size`. В частности, если `size` меньше `90`, передавайте в функцию `getImageUrl` значение `'s'` («small»), а не `'b'` («big»). Убедитесь, что изменения работают, отобразив аватары с разными значениями параметра ``размер`` и открыв изображения в новой вкладке.

<details>
<summary><small>(eng)</small></summary>

In this example, `Avatar` receives a numeric `size` prop which determines the `<img>` width and height. The `size` prop is set to `40` in this example. However, if you open the image in a new tab, you'll notice that the image itself is larger (`160` pixels). The real image size is determined by which thumbnail size you're requesting.

Change the `Avatar` component to request the closest image size based on the `size` prop. Specifically, if the `size` is less than `90`, pass `'s'` ("small") rather than `'b'` ("big") to the `getImageUrl` function. Verify that your changes work by rendering avatars with different values of the `size` prop and opening images in a new tab.

</details>

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person, 'b')}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <Avatar
      size={40}
      person={{ 
        name: 'Gregorio Y. Zara', 
        imageId: '7vQD0fP'
      }}
    />
  );
}
```

```js src/utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

<Solution>

Here is how you could go about it:

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  let thumbnailSize = 's';
  if (size > 90) {
    thumbnailSize = 'b';
  }
  return (
    <img
      className="avatar"
      src={getImageUrl(person, thumbnailSize)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <>
      <Avatar
        size={40}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={120}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
    </>
  );
}
```

```js src/utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

Вы также можете показать более четкое изображение для экранов с высоким DPI, принимая во внимание [`window.devicePixelRatio`](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio):

<details>
<summary><small>(eng)</small></summary>

You could also show a sharper image for high DPI screens by taking [`window.devicePixelRatio`](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) into account:

</details>

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

const ratio = window.devicePixelRatio;

function Avatar({ person, size }) {
  let thumbnailSize = 's';
  if (size * ratio > 90) {
    thumbnailSize = 'b';
  }
  return (
    <img
      className="avatar"
      src={getImageUrl(person, thumbnailSize)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <>
      <Avatar
        size={40}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={70}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={120}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
    </>
  );
}
```

```js src/utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

Параметры позволяют инкапсулировать подобную логику внутри компонента `Avatar` (и изменить ее позже, если потребуется), чтобы каждый мог использовать компонент `<Avatar>`, не задумываясь о том, как запрашиваются и изменяются размеры изображений.

<details>
<summary><small>(eng)</small></summary>

Props let you encapsulate logic like this inside the `Avatar` component (and change it later if needed) so that everyone can use the `<Avatar>` component without thinking about how the images are requested and resized.

</details>

</Solution>

#### Передача JSX в параметры `children` {/*passing-jsx-in-a-children-prop*/}

Извлеките компонент `Card` из приведенной ниже разметки и используйте параметр `children` для передачи ему различных JSX:

<details>
<summary><small>(eng)</small></summary>

Extract a `Card` component from the markup below, and use the `children` prop to pass different JSX to it:

</details>

<Sandpack>

```js
export default function Profile() {
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <h1>Photo</h1>
          <img
            className="avatar"
            src="https://i.imgur.com/OKS67lhm.jpg"
            alt="Aklilu Lemma"
            width={70}
            height={70}
          />
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h1>About</h1>
          <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
        </div>
      </div>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

<Hint>

Любой JSX, который вы поместите внутрь тега компонента, будет передан в качестве параметра `children` этому компоненту.

<details>
<summary><small>(eng)</small></summary>

Any JSX you put inside of a component's tag will be passed as the `children` prop to that component.

</details>

</Hint>

<Solution>

Таким образом, вы можете использовать компонент `Card` в обоих местах:

<details>
<summary><small>(eng)</small></summary>

This is how you can use the `Card` component in both places:

</details>

<Sandpack>

```js
function Card({ children }) {
  return (
    <div className="card">
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <Card>
        <h1>Photo</h1>
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={100}
          height={100}
        />
      </Card>
      <Card>
        <h1>About</h1>
        <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
      </Card>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

Вы также можете сделать `title` отдельным параметром, если хотите, чтобы каждая `Card` всегда имела заголовок:

<details>
<summary><small>(eng)</small></summary>

You can also make `title` a separate prop if you want every `Card` to always have a title:

</details>

<Sandpack>

```js
function Card({ children, title }) {
  return (
    <div className="card">
      <div className="card-content">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <Card title="Photo">
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={100}
          height={100}
        />
      </Card>
      <Card title="About">
        <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
      </Card>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

</Solution>

</Challenges>
