---
title: "Состояние: Память Компонента"
---

<Intro>

Компоненты часто должны изменять то, что отображается на экране в результате взаимодействия. Ввод текста в форму должен обновить поле ввода, нажатие кнопки "next" в карусели изображений должно изменить отображаемое изображение, нажатие кнопки "buy" должно поместить товар в корзину. Компоненты должны "запоминать" вещи: текущее значение ввода, текущее изображение, корзину. В React такая специфическая для компонентов память называется _state_.

<details>
<summary><small>(eng)</small></summary>

Components often need to change what's on the screen as a result of an interaction. Typing into the form should update the input field, clicking "next" on an image carousel should change which image is displayed, clicking "buy" should put a product in the shopping cart. Components need to "remember" things: the current input value, the current image, the shopping cart. In React, this kind of component-specific memory is called _state_.

</details>

</Intro>

<YouWillLearn>

- Как добавить переменную состояния с помощью хука [`useState`](/reference/react/useState)
- Какую пару значений возвращает хук `useState`
- Как добавить более одной переменной состояния
- Почему состояние называется локальным

<details>
<summary><small>(eng)</small></summary>

- How to add a state variable with the [`useState`](/reference/react/useState) Hook
- What pair of values the `useState` Hook returns
- How to add more than one state variable
- Why state is called local

</details>

</YouWillLearn>

## Когда обычной переменной недостаточно {/*when-a-regular-variable-isnt-enough*/}

Перед вами компонент, который отображает изображение скульптуры. При нажатии на кнопку "Next" должна отображаться следующая скульптура, меняя `index` на `1`, затем `2` и так далее. Однако это **не работает** (вы можете попробовать!):

<details>
<summary><small>(eng)</small></summary>

<b>When a regular variable isn’t enough :</b>
Here's a component that renders a sculpture image. Clicking the "Next" button should show the next sculpture by changing the `index` to `1`, then `2`, and so on. However, this **won't work** (you can try it!):

</details>

<Sandpack>

```js
import { sculptureList } from "./data.js";

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <img src={sculpture.url} alt={sculpture.alt} />
      <p>{sculpture.description}</p>
    </>
  );
}
```

```js src/data.js
export const sculptureList = [
  {
    name: "Homenaje a la Neurocirugía",
    artist: "Marta Colvin Andrade",
    description:
      "Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.",
    url: "https://i.imgur.com/Mx7dA2Y.jpg",
    alt: "A bronze statue of two crossed hands delicately holding a human brain in their fingertips.",
  },
  {
    name: "Floralis Genérica",
    artist: "Eduardo Catalano",
    description:
      "This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.",
    url: "https://i.imgur.com/ZF6s192m.jpg",
    alt: "A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.",
  },
  {
    name: "Eternal Presence",
    artist: "John Woodrow Wilson",
    description:
      'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
    url: "https://i.imgur.com/aTtVpES.jpg",
    alt: "The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.",
  },
  {
    name: "Moai",
    artist: "Unknown Artist",
    description:
      "Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.",
    url: "https://i.imgur.com/RCwLEoQm.jpg",
    alt: "Three monumental stone busts with the heads that are disproportionately large with somber faces.",
  },
  {
    name: "Blue Nana",
    artist: "Niki de Saint Phalle",
    description:
      "The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.",
    url: "https://i.imgur.com/Sd1AgUOm.jpg",
    alt: "A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.",
  },
  {
    name: "Ultimate Form",
    artist: "Barbara Hepworth",
    description:
      "This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.",
    url: "https://i.imgur.com/2heNQDcm.jpg",
    alt: "A tall sculpture made of three elements stacked on each other reminding of a human figure.",
  },
  {
    name: "Cavaliere",
    artist: "Lamidi Olonade Fakeye",
    description:
      "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
    url: "https://i.imgur.com/wIdGuZwm.png",
    alt: "An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.",
  },
  {
    name: "Big Bellies",
    artist: "Alina Szapocznikow",
    description:
      "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
    url: "https://i.imgur.com/AlHTAdDm.jpg",
    alt: "The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.",
  },
  {
    name: "Terracotta Army",
    artist: "Unknown Artist",
    description:
      "The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.",
    url: "https://i.imgur.com/HMFmH6m.jpg",
    alt: "12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.",
  },
  {
    name: "Lunar Landscape",
    artist: "Louise Nevelson",
    description:
      "Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.",
    url: "https://i.imgur.com/rN7hY6om.jpg",
    alt: "A black matte sculpture where the individual elements are initially indistinguishable.",
  },
  {
    name: "Aureole",
    artist: "Ranjani Shettar",
    description:
      'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
    url: "https://i.imgur.com/okTpbHhm.jpg",
    alt: "A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.",
  },
  {
    name: "Hippos",
    artist: "Taipei Zoo",
    description:
      "The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.",
    url: "https://i.imgur.com/6o5Vuyu.jpg",
    alt: "A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.",
  },
];
```

```css
h2 {
  margin-top: 10px;
  margin-bottom: 0;
}
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img {
  width: 120px;
  height: 120px;
}
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

Обработчик события `handleClick` обновляет локальную переменную `index`. Но две вещи не позволяют увидеть это изменение:

1. \*\*Когда React рендерит этот компонент во второй раз, он рендерит его с нуля - он не учитывает никаких изменений в локальных переменных.
2. **Изменения локальных переменных не вызывают рендеринга.** React не понимает, что ему нужно снова рендерить компонент с новыми данными.

Чтобы обновить компонент новыми данными, должны произойти две вещи:

1. **Сохранить** данные между рендерами.
2. **Триггер** React для рендеринга компонента с новыми данными (повторный рендеринг).

Хук [`useState`](/reference/react/useState) обеспечивает эти две вещи:

1. Переменная **state** для сохранения данных между рендерами.
2. Функция **state setter** для обновления переменной и запуска React для повторного рендеринга компонента.

<details>
<summary><small>(eng)</small></summary>

The `handleClick` event handler is updating a local variable, `index`. But two things prevent that change from being visible:

1. **Local variables don't persist between renders.** When React renders this component a second time, it renders it from scratch—it doesn't consider any changes to the local variables.
2. **Changes to local variables won't trigger renders.** React doesn't realize it needs to render the component again with the new data.

To update a component with new data, two things need to happen:

1. **Retain** the data between renders.
2. **Trigger** React to render the component with new data (re-rendering).

The [`useState`](/reference/react/useState) Hook provides those two things:

1. A **state variable** to retain the data between renders.
2. A **state setter function** to update the variable and trigger React to render the component again.

</details>

## Добавление переменной состояния {/*adding-a-state-variable*/}

Чтобы добавить переменную состояния, импортируйте `useState` из React в верхней части файла:

```js
import { useState } from "react";
```

Затем замените эту строку:

```js
let index = 0;
```

с

```js
const [index, setIndex] = useState(0);
```

`index` - переменная состояния, а `setIndex` - функция-установщик.

> Синтаксис `[` и `]` здесь называется [деструктуризация массива](https://javascript.info/destructuring-assignment) и позволяет считывать значения из массива. Массив, возвращаемый функцией `useState`, всегда содержит ровно два элемента.

Вот как они работают вместе в `handleClick`:

```js
function handleClick() {
  setIndex(index + 1);
}
```

Теперь нажатием кнопки "Далее" переключите текущую скульптуру:

<details>
<summary><small>(eng)</small></summary>

<b>Adding a state variable :</b>
To add a state variable, import `useState` from React at the top of the file:

```js
import { useState } from "react";
```

Then, replace this line:

```js
let index = 0;
```

with

```js
const [index, setIndex] = useState(0);
```

`index` is a state variable and `setIndex` is the setter function.

> The `[` and `]` syntax here is called [array destructuring](https://javascript.info/destructuring-assignment) and it lets you read values from an array. The array returned by `useState` always has exactly two items.

This is how they work together in `handleClick`:

```js
function handleClick() {
  setIndex(index + 1);
}
```

Now clicking the "Next" button switches the current sculpture:

</details>

<Sandpack>

```js
import { useState } from "react";
import { sculptureList } from "./data.js";

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <img src={sculpture.url} alt={sculpture.alt} />
      <p>{sculpture.description}</p>
    </>
  );
}
```

```js src/data.js
export const sculptureList = [
  {
    name: "Homenaje a la Neurocirugía",
    artist: "Marta Colvin Andrade",
    description:
      "Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.",
    url: "https://i.imgur.com/Mx7dA2Y.jpg",
    alt: "A bronze statue of two crossed hands delicately holding a human brain in their fingertips.",
  },
  {
    name: "Floralis Genérica",
    artist: "Eduardo Catalano",
    description:
      "This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.",
    url: "https://i.imgur.com/ZF6s192m.jpg",
    alt: "A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.",
  },
  {
    name: "Eternal Presence",
    artist: "John Woodrow Wilson",
    description:
      'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
    url: "https://i.imgur.com/aTtVpES.jpg",
    alt: "The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.",
  },
  {
    name: "Moai",
    artist: "Unknown Artist",
    description:
      "Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.",
    url: "https://i.imgur.com/RCwLEoQm.jpg",
    alt: "Three monumental stone busts with the heads that are disproportionately large with somber faces.",
  },
  {
    name: "Blue Nana",
    artist: "Niki de Saint Phalle",
    description:
      "The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.",
    url: "https://i.imgur.com/Sd1AgUOm.jpg",
    alt: "A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.",
  },
  {
    name: "Ultimate Form",
    artist: "Barbara Hepworth",
    description:
      "This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.",
    url: "https://i.imgur.com/2heNQDcm.jpg",
    alt: "A tall sculpture made of three elements stacked on each other reminding of a human figure.",
  },
  {
    name: "Cavaliere",
    artist: "Lamidi Olonade Fakeye",
    description:
      "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
    url: "https://i.imgur.com/wIdGuZwm.png",
    alt: "An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.",
  },
  {
    name: "Big Bellies",
    artist: "Alina Szapocznikow",
    description:
      "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
    url: "https://i.imgur.com/AlHTAdDm.jpg",
    alt: "The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.",
  },
  {
    name: "Terracotta Army",
    artist: "Unknown Artist",
    description:
      "The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.",
    url: "https://i.imgur.com/HMFmH6m.jpg",
    alt: "12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.",
  },
  {
    name: "Lunar Landscape",
    artist: "Louise Nevelson",
    description:
      "Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.",
    url: "https://i.imgur.com/rN7hY6om.jpg",
    alt: "A black matte sculpture where the individual elements are initially indistinguishable.",
  },
  {
    name: "Aureole",
    artist: "Ranjani Shettar",
    description:
      'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
    url: "https://i.imgur.com/okTpbHhm.jpg",
    alt: "A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.",
  },
  {
    name: "Hippos",
    artist: "Taipei Zoo",
    description:
      "The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.",
    url: "https://i.imgur.com/6o5Vuyu.jpg",
    alt: "A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.",
  },
];
```

```css
h2 {
  margin-top: 10px;
  margin-bottom: 0;
}
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img {
  width: 120px;
  height: 120px;
}
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

### Знакомимся с вашим первым хуком {/*meet-your-first-hook*/}

В React функция `useState`, как и любая другая, начинающаяся с "`use`", называется хуком.

\*Хуки - это специальные функции, которые доступны только во время [рендеринга] React (/learn/render-and-commit#step-1-trigger-a-render) (о чем мы подробнее расскажем на следующей странице). Они позволяют вам "подключаться" к различным функциям React.

Состояние - лишь одна из этих функций, но с другими хуками вы познакомитесь позже.

<details>
<summary><small>(eng)</small></summary>

<b>Meet your first Hook :</b>
In React, `useState`, as well as any other function starting with "`use`", is called a Hook.

_Hooks_ are special functions that are only available while React is [rendering](/learn/render-and-commit#step-1-trigger-a-render) (which we'll get into in more detail on the next page). They let you "hook into" different React features.

State is just one of those features, but you will meet the other Hooks later.

</details>

<Pitfall>

**Крючки-функции, начинающиеся с `use`, могут вызываться только на верхнем уровне ваших компонентов или [вашими собственными крючками](/learn/reusing-logic-with-custom-hooks)** Вы не можете вызывать крючки внутри условий, циклов или других вложенных функций. Хуки - это функции, но полезно думать о них как о безусловных декларациях о потребностях вашего компонента. Вы "используете" функции React в верхней части вашего компонента, подобно тому, как вы "импортируете" модули в верхней части вашего файла.

<details>
<summary><small>(eng)</small></summary>

**Hooks—functions starting with `use`—can only be called at the top level of your components or [your own Hooks.](/learn/reusing-logic-with-custom-hooks)** You can't call Hooks inside conditions, loops, or other nested functions. Hooks are functions, but it's helpful to think of them as unconditional declarations about your component's needs. You "use" React features at the top of your component similar to how you "import" modules at the top of your file.

</details>

</Pitfall>

### Анатомия `useState` {/*anatomy-of-usestate*/}

Когда вы вызываете [`useState`](/reference/react/useState), вы говорите React, что хотите, чтобы этот компонент что-то запомнил:

```js
const [index, setIndex] = useState(0);
```

В данном случае вы хотите, чтобы React запомнил `index`.

<details>
<summary><small>(eng)</small></summary>

<b>Anatomy of `useState` :</b>
When you call [`useState`](/reference/react/useState), you are telling React that you want this component to remember something:

```js
const [index, setIndex] = useState(0);
```

In this case, you want React to remember `index`.

</details>

<Note>

Принято называть эту пару так: `const [something, setSomething]`. Вы можете назвать ее как угодно, но соглашения облегчают понимание в разных проектах.

<details>
<summary><small>(eng)</small></summary>

The convention is to name this pair like `const [something, setSomething]`. You could name it anything you like, but conventions make things easier to understand across projects.

</details>

</Note>

Единственным аргументом для `useState` является **начальное значение** вашей переменной состояния. В этом примере начальное значение `index` установлено в `0` с помощью `useState(0)`.

При каждом рендеринге компонента `useState` выдает массив, содержащий два значения:

1. Переменная **state** (`index`) со значением, которое вы сохранили.
2. Функция **установки состояния** (`setIndex`), которая может обновить переменную состояния и вызвать React для повторного рендеринга компонента.

Вот как это происходит в действии:

```js
const [index, setIndex] = useState(0);
```

1. \*\*Поскольку вы передали `0` в `useState` в качестве начального значения для `index`, он вернет `[0, setIndex]`. React помнит, что `0` - это последнее значение состояния.
2. \*\*Когда пользователь нажимает на кнопку, вызывается `setIndex(index + 1)`. `index` - это `0`, поэтому вызывается `setIndex(1)`. Это указывает React на то, что `index` теперь `1`, и запускает еще один рендер.
3. **Второй рендер вашего компонента.** React по-прежнему видит `useState(0)`, но поскольку React _помнит_, что вы установили `index` в `1`, он возвращает `[1, setIndex]` вместо этого.
4. И так далее!

<details>
<summary><small>(eng)</small></summary>

The only argument to `useState` is the **initial value** of your state variable. In this example, the `index`'s initial value is set to `0` with `useState(0)`.

Every time your component renders, `useState` gives you an array containing two values:

1. The **state variable** (`index`) with the value you stored.
2. The **state setter function** (`setIndex`) which can update the state variable and trigger React to render the component again.

Here's how that happens in action:

```js
const [index, setIndex] = useState(0);
```

1. **Your component renders the first time.** Because you passed `0` to `useState` as the initial value for `index`, it will return `[0, setIndex]`. React remembers `0` is the latest state value.
2. **You update the state.** When a user clicks the button, it calls `setIndex(index + 1)`. `index` is `0`, so it's `setIndex(1)`. This tells React to remember `index` is `1` now and triggers another render.
3. **Your component's second render.** React still sees `useState(0)`, but because React _remembers_ that you set `index` to `1`, it returns `[1, setIndex]` instead.
4. And so on!

</details>

## Предоставление компоненту нескольких переменных состояния {/*giving-a-component-multiple-state-variables*/}

В одном компоненте может быть сколько угодно переменных состояния разных типов. В этом компоненте есть две переменные состояния, число `index` и булево значение `showMore`, которое переключается при нажатии кнопки "Показать подробности":

<details>
<summary><small>(eng)</small></summary>

<b>Giving a component multiple state variables :</b>
You can have as many state variables of as many types as you like in one component. This component has two state variables, a number `index` and a boolean `showMore` that's toggled when you click "Show details":

</details>

<Sandpack>

```js
import { useState } from "react";
import { sculptureList } from "./data.js";

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? "Hide" : "Show"} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </>
  );
}
```

```js src/data.js
export const sculptureList = [
  {
    name: "Homenaje a la Neurocirugía",
    artist: "Marta Colvin Andrade",
    description:
      "Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.",
    url: "https://i.imgur.com/Mx7dA2Y.jpg",
    alt: "A bronze statue of two crossed hands delicately holding a human brain in their fingertips.",
  },
  {
    name: "Floralis Genérica",
    artist: "Eduardo Catalano",
    description:
      "This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.",
    url: "https://i.imgur.com/ZF6s192m.jpg",
    alt: "A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.",
  },
  {
    name: "Eternal Presence",
    artist: "John Woodrow Wilson",
    description:
      'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
    url: "https://i.imgur.com/aTtVpES.jpg",
    alt: "The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.",
  },
  {
    name: "Moai",
    artist: "Unknown Artist",
    description:
      "Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.",
    url: "https://i.imgur.com/RCwLEoQm.jpg",
    alt: "Three monumental stone busts with the heads that are disproportionately large with somber faces.",
  },
  {
    name: "Blue Nana",
    artist: "Niki de Saint Phalle",
    description:
      "The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.",
    url: "https://i.imgur.com/Sd1AgUOm.jpg",
    alt: "A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.",
  },
  {
    name: "Ultimate Form",
    artist: "Barbara Hepworth",
    description:
      "This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.",
    url: "https://i.imgur.com/2heNQDcm.jpg",
    alt: "A tall sculpture made of three elements stacked on each other reminding of a human figure.",
  },
  {
    name: "Cavaliere",
    artist: "Lamidi Olonade Fakeye",
    description:
      "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
    url: "https://i.imgur.com/wIdGuZwm.png",
    alt: "An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.",
  },
  {
    name: "Big Bellies",
    artist: "Alina Szapocznikow",
    description:
      "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
    url: "https://i.imgur.com/AlHTAdDm.jpg",
    alt: "The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.",
  },
  {
    name: "Terracotta Army",
    artist: "Unknown Artist",
    description:
      "The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.",
    url: "https://i.imgur.com/HMFmH6m.jpg",
    alt: "12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.",
  },
  {
    name: "Lunar Landscape",
    artist: "Louise Nevelson",
    description:
      "Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.",
    url: "https://i.imgur.com/rN7hY6om.jpg",
    alt: "A black matte sculpture where the individual elements are initially indistinguishable.",
  },
  {
    name: "Aureole",
    artist: "Ranjani Shettar",
    description:
      'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
    url: "https://i.imgur.com/okTpbHhm.jpg",
    alt: "A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.",
  },
  {
    name: "Hippos",
    artist: "Taipei Zoo",
    description:
      "The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.",
    url: "https://i.imgur.com/6o5Vuyu.jpg",
    alt: "A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.",
  },
];
```

```css
h2 {
  margin-top: 10px;
  margin-bottom: 0;
}
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img {
  width: 120px;
  height: 120px;
}
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

Хорошо иметь несколько переменных состояния, если их состояние не связано между собой, как `index` и `showMore` в этом примере. Но если вы обнаружите, что часто изменяете две переменные состояния вместе, возможно, будет проще объединить их в одну. Например, если у вас есть форма с большим количеством полей, удобнее иметь одну переменную состояния, которая содержит объект, чем переменную состояния для каждого поля. Прочитайте [Выбор структуры состояния](/learn/choosing-the-state-structure), чтобы получить больше советов.

<details>
<summary><small>(eng)</small></summary>

It is a good idea to have multiple state variables if their state is unrelated, like `index` and `showMore` in this example. But if you find that you often change two state variables together, it might be easier to combine them into one. For example, if you have a form with many fields, it's more convenient to have a single state variable that holds an object than state variable per field. Read [Choosing the State Structure](/learn/choosing-the-state-structure) for more tips.

</details>

<DeepDive>

#### Как React узнает, какое состояние нужно вернуть? {/*how-does-react-know-which-state-to-return*/}

Вы, наверное, заметили, что вызов `useState` не получает никакой информации о том, _к какой_ переменной состояния он обращается. Нет никакого "идентификатора", который передается `useState`, так как же он узнает, какую из переменных состояния нужно вернуть? Полагается ли он на какую-то магию вроде разбора ваших функций? Ответ - нет.

Вместо этого, чтобы обеспечить лаконичный синтаксис, хуки **опираются на стабильный порядок вызова при каждом рендере одного и того же компонента.** Это хорошо работает на практике, потому что если вы следуете правилу выше ("вызывать хуки только на верхнем уровне"), хуки всегда будут вызываться в одном и том же порядке. Кроме того, плагин [linter plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) отлавливает большинство ошибок.

Внутри React хранит массив пар состояний для каждого компонента. Он также хранит индекс текущей пары, который устанавливается в `0` перед рендерингом. Каждый раз, когда вы вызываете `useState`, React предоставляет вам следующую пару состояний и увеличивает индекс. Подробнее об этом механизме можно прочитать в [React Hooks: Not Magic, Just Arrays.](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

Этот пример **не использует React**, но дает вам представление о том, как `useState` работает внутри:

<details>
<summary><small>(eng)</small></summary>

<b>How does React know which state to return? :</b>
You might have noticed that the `useState` call does not receive any information about _which_ state variable it refers to. There is no "identifier" that is passed to `useState`, so how does it know which of the state variables to return? Does it rely on some magic like parsing your functions? The answer is no.

Instead, to enable their concise syntax, Hooks **rely on a stable call order on every render of the same component.** This works well in practice because if you follow the rule above ("only call Hooks at the top level"), Hooks will always be called in the same order. Additionally, a [linter plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) catches most mistakes.

Internally, React holds an array of state pairs for every component. It also maintains the current pair index, which is set to `0` before rendering. Each time you call `useState`, React gives you the next state pair and increments the index. You can read more about this mechanism in [React Hooks: Not Magic, Just Arrays.](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

This example **doesn't use React** but it gives you an idea of how `useState` works internally:

</details>

<Sandpack>

```js src/index.js active
let componentHooks = [];
let currentHookIndex = 0;

// How useState works inside React (simplified).
function useState(initialState) {
  let pair = componentHooks[currentHookIndex];
  if (pair) {
    // This is not the first render,
    // so the state pair already exists.
    // Return it and prepare for next Hook call.
    currentHookIndex++;
    return pair;
  }

  // This is the first time we're rendering,
  // so create a state pair and store it.
  pair = [initialState, setState];

  function setState(nextState) {
    // When the user requests a state change,
    // put the new value into the pair.
    pair[0] = nextState;
    updateDOM();
  }

  // Store the pair for future renders
  // and prepare for the next Hook call.
  componentHooks[currentHookIndex] = pair;
  currentHookIndex++;
  return pair;
}

function Gallery() {
  // Each useState() call will get the next pair.
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  // This example doesn't use React, so
  // return an output object instead of JSX.
  return {
    onNextClick: handleNextClick,
    onMoreClick: handleMoreClick,
    header: `${sculpture.name} by ${sculpture.artist}`,
    counter: `${index + 1} of ${sculptureList.length}`,
    more: `${showMore ? "Hide" : "Show"} details`,
    description: showMore ? sculpture.description : null,
    imageSrc: sculpture.url,
    imageAlt: sculpture.alt,
  };
}

function updateDOM() {
  // Reset the current Hook index
  // before rendering the component.
  currentHookIndex = 0;
  let output = Gallery();

  // Update the DOM to match the output.
  // This is the part React does for you.
  nextButton.onclick = output.onNextClick;
  header.textContent = output.header;
  moreButton.onclick = output.onMoreClick;
  moreButton.textContent = output.more;
  image.src = output.imageSrc;
  image.alt = output.imageAlt;
  if (output.description !== null) {
    description.textContent = output.description;
    description.style.display = "";
  } else {
    description.style.display = "none";
  }
}

let nextButton = document.getElementById("nextButton");
let header = document.getElementById("header");
let moreButton = document.getElementById("moreButton");
let description = document.getElementById("description");
let image = document.getElementById("image");
let sculptureList = [
  {
    name: "Homenaje a la Neurocirugía",
    artist: "Marta Colvin Andrade",
    description:
      "Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.",
    url: "https://i.imgur.com/Mx7dA2Y.jpg",
    alt: "A bronze statue of two crossed hands delicately holding a human brain in their fingertips.",
  },
  {
    name: "Floralis Genérica",
    artist: "Eduardo Catalano",
    description:
      "This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.",
    url: "https://i.imgur.com/ZF6s192m.jpg",
    alt: "A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.",
  },
  {
    name: "Eternal Presence",
    artist: "John Woodrow Wilson",
    description:
      'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
    url: "https://i.imgur.com/aTtVpES.jpg",
    alt: "The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.",
  },
  {
    name: "Moai",
    artist: "Unknown Artist",
    description:
      "Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.",
    url: "https://i.imgur.com/RCwLEoQm.jpg",
    alt: "Three monumental stone busts with the heads that are disproportionately large with somber faces.",
  },
  {
    name: "Blue Nana",
    artist: "Niki de Saint Phalle",
    description:
      "The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.",
    url: "https://i.imgur.com/Sd1AgUOm.jpg",
    alt: "A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.",
  },
  {
    name: "Ultimate Form",
    artist: "Barbara Hepworth",
    description:
      "This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.",
    url: "https://i.imgur.com/2heNQDcm.jpg",
    alt: "A tall sculpture made of three elements stacked on each other reminding of a human figure.",
  },
  {
    name: "Cavaliere",
    artist: "Lamidi Olonade Fakeye",
    description:
      "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
    url: "https://i.imgur.com/wIdGuZwm.png",
    alt: "An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.",
  },
  {
    name: "Big Bellies",
    artist: "Alina Szapocznikow",
    description:
      "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
    url: "https://i.imgur.com/AlHTAdDm.jpg",
    alt: "The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.",
  },
  {
    name: "Terracotta Army",
    artist: "Unknown Artist",
    description:
      "The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.",
    url: "https://i.imgur.com/HMFmH6m.jpg",
    alt: "12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.",
  },
  {
    name: "Lunar Landscape",
    artist: "Louise Nevelson",
    description:
      "Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.",
    url: "https://i.imgur.com/rN7hY6om.jpg",
    alt: "A black matte sculpture where the individual elements are initially indistinguishable.",
  },
  {
    name: "Aureole",
    artist: "Ranjani Shettar",
    description:
      'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
    url: "https://i.imgur.com/okTpbHhm.jpg",
    alt: "A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.",
  },
  {
    name: "Hippos",
    artist: "Taipei Zoo",
    description:
      "The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.",
    url: "https://i.imgur.com/6o5Vuyu.jpg",
    alt: "A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.",
  },
];

// Make UI match the initial state.
updateDOM();
```

```html public/index.html
<button id="nextButton">Next</button>
<h3 id="header"></h3>
<button id="moreButton"></button>
<p id="description"></p>
<img id="image" />

<style>
  * {
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
    margin: 20px;
    padding: 0;
  }
  button {
    display: block;
    margin-bottom: 10px;
  }
</style>
```

```css
button {
  display: block;
  margin-bottom: 10px;
}
```

</Sandpack>

Вам не обязательно понимать это, чтобы использовать React, но вы можете найти эту ментальную модель полезной.

<details>
<summary><small>(eng)</small></summary>

You don't have to understand it to use React, but you might find this a helpful mental model.

</details>

</DeepDive>

## Состояние изолированное и закрытое {/*state-is-isolated-and-private*/}

Состояние локально для экземпляра компонента на экране. Другими словами, **если вы отобразите один и тот же компонент дважды, каждая копия будет иметь полностью изолированное состояние!** Изменение одного из них не повлияет на другой.

В этом примере компонент `Gallery`, использованный ранее, отображается дважды без каких-либо изменений в его логике. Попробуйте нажать на кнопки внутри каждой из галерей. Обратите внимание, что их состояние независимо:

<details>
<summary><small>(eng)</small></summary>

<b>State is isolated and private :</b>
State is local to a component instance on the screen. In other words, **if you render the same component twice, each copy will have completely isolated state!** Changing one of them will not affect the other.

In this example, the `Gallery` component from earlier is rendered twice with no changes to its logic. Try clicking the buttons inside each of the galleries. Notice that their state is independent:

</details>

<Sandpack>

```js
import Gallery from "./Gallery.js";

export default function Page() {
  return (
    <div className="Page">
      <Gallery />
      <Gallery />
    </div>
  );
}
```

```js src/Gallery.js
import { useState } from "react";
import { sculptureList } from "./data.js";

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <section>
      <button onClick={handleNextClick}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? "Hide" : "Show"} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </section>
  );
}
```

```js src/data.js
export const sculptureList = [
  {
    name: "Homenaje a la Neurocirugía",
    artist: "Marta Colvin Andrade",
    description:
      "Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.",
    url: "https://i.imgur.com/Mx7dA2Y.jpg",
    alt: "A bronze statue of two crossed hands delicately holding a human brain in their fingertips.",
  },
  {
    name: "Floralis Genérica",
    artist: "Eduardo Catalano",
    description:
      "This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.",
    url: "https://i.imgur.com/ZF6s192m.jpg",
    alt: "A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.",
  },
  {
    name: "Eternal Presence",
    artist: "John Woodrow Wilson",
    description:
      'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
    url: "https://i.imgur.com/aTtVpES.jpg",
    alt: "The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.",
  },
  {
    name: "Moai",
    artist: "Unknown Artist",
    description:
      "Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.",
    url: "https://i.imgur.com/RCwLEoQm.jpg",
    alt: "Three monumental stone busts with the heads that are disproportionately large with somber faces.",
  },
  {
    name: "Blue Nana",
    artist: "Niki de Saint Phalle",
    description:
      "The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.",
    url: "https://i.imgur.com/Sd1AgUOm.jpg",
    alt: "A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.",
  },
  {
    name: "Ultimate Form",
    artist: "Barbara Hepworth",
    description:
      "This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.",
    url: "https://i.imgur.com/2heNQDcm.jpg",
    alt: "A tall sculpture made of three elements stacked on each other reminding of a human figure.",
  },
  {
    name: "Cavaliere",
    artist: "Lamidi Olonade Fakeye",
    description:
      "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
    url: "https://i.imgur.com/wIdGuZwm.png",
    alt: "An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.",
  },
  {
    name: "Big Bellies",
    artist: "Alina Szapocznikow",
    description:
      "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
    url: "https://i.imgur.com/AlHTAdDm.jpg",
    alt: "The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.",
  },
  {
    name: "Terracotta Army",
    artist: "Unknown Artist",
    description:
      "The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.",
    url: "https://i.imgur.com/HMFmH6m.jpg",
    alt: "12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.",
  },
  {
    name: "Lunar Landscape",
    artist: "Louise Nevelson",
    description:
      "Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.",
    url: "https://i.imgur.com/rN7hY6om.jpg",
    alt: "A black matte sculpture where the individual elements are initially indistinguishable.",
  },
  {
    name: "Aureole",
    artist: "Ranjani Shettar",
    description:
      'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
    url: "https://i.imgur.com/okTpbHhm.jpg",
    alt: "A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.",
  },
  {
    name: "Hippos",
    artist: "Taipei Zoo",
    description:
      "The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.",
    url: "https://i.imgur.com/6o5Vuyu.jpg",
    alt: "A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.",
  },
];
```

```css
button {
  display: block;
  margin-bottom: 10px;
}
.Page > * {
  float: left;
  width: 50%;
  padding: 10px;
}
h2 {
  margin-top: 10px;
  margin-bottom: 0;
}
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img {
  width: 120px;
  height: 120px;
}
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

Именно этим состояние отличается от обычных переменных, которые вы можете объявить в верхней части своего модуля. Состояние не привязано к определенному вызову функции или месту в коде, оно "локально" для конкретного места на экране. Вы отобразили два компонента `<Gallery />`, поэтому их состояние хранится отдельно.

Также обратите внимание, что компонент `Page` ничего не "знает" о состоянии `Gallery` и даже о том, есть ли оно у него. В отличие от props, **state полностью приватно для объявившего его компонента.** Родительский компонент не может его изменить. Это позволяет добавлять состояние в любой компонент или удалять его без влияния на остальные компоненты.

Что, если вы хотите, чтобы обе галереи синхронизировали свои состояния? Правильный способ сделать это в React - _удалить_ состояние из дочерних компонентов и добавить его в их ближайший общий родитель. Следующие несколько страниц будут посвящены организации состояния одного компонента, но мы вернемся к этой теме в разделе [Sharing State Between Components.](/learn/sharing-state-between-components)

<details>
<summary><small>(eng)</small></summary>

This is what makes state different from regular variables that you might declare at the top of your module. State is not tied to a particular function call or a place in the code, but it's "local" to the specific place on the screen. You rendered two `<Gallery />` components, so their state is stored separately.

Also notice how the `Page` component doesn't "know" anything about the `Gallery` state or even whether it has any. Unlike props, **state is fully private to the component declaring it.** The parent component can't change it. This lets you add state to any component or remove it without impacting the rest of the components.

What if you wanted both galleries to keep their states in sync? The right way to do it in React is to _remove_ state from child components and add it to their closest shared parent. The next few pages will focus on organizing state of a single component, but we will return to this topic in [Sharing State Between Components.](/learn/sharing-state-between-components)

</details>

<Recap>

- Используйте переменную состояния, когда компоненту нужно "запомнить" какую-то информацию между рендерами.
- Переменные состояния объявляются вызовом хука `useState`.
- Хуки - это специальные функции, начинающиеся с `use`. Они позволяют вам "подключаться" к таким функциям React, как состояние.
- Хуки могут напомнить вам об импорте: они должны вызываться безусловно. Вызов хуков, включая `useState`, возможен только на верхнем уровне компонента или другого хука.
- Хук `useState` возвращает пару значений: текущее состояние и функцию для его обновления.
- У вас может быть более одной переменной состояния. Внутренне React сопоставляет их по порядку.
- Состояние является приватным для компонента. Если вы рендерите его в двух местах, каждая копия получает свое собственное состояние.

<details>
<summary><small>(eng)</small></summary>

- Use a state variable when a component needs to "remember" some information between renders.
- State variables are declared by calling the `useState` Hook.
- Hooks are special functions that start with `use`. They let you "hook into" React features like state.
- Hooks might remind you of imports: they need to be called unconditionally. Calling Hooks, including `useState`, is only valid at the top level of a component or another Hook.
- The `useState` Hook returns a pair of values: the current state and the function to update it.
- You can have more than one state variable. Internally, React matches them up by their order.
- State is private to the component. If you render it in two places, each copy gets its own state.

</details>

</Recap>

<Challenges>

#### Завершение галереи {/*complete-the-gallery*/}

Когда вы нажимаете кнопку "Далее" на последней скульптуре, код дает сбой. Исправьте логику, чтобы предотвратить сбой. Это можно сделать, добавив дополнительную логику в обработчик события или отключив кнопку, когда действие невозможно.

После устранения сбоя добавьте кнопку "Предыдущая", которая показывает предыдущую скульптуру. На первой скульптуре сбоя быть не должно.

<details>
<summary><small>(eng)</small></summary>

<b>Complete the gallery :</b>
When you press "Next" on the last sculpture, the code crashes. Fix the logic to prevent the crash. You may do this by adding extra logic to event handler or by disabling the button when the action is not possible.

After fixing the crash, add a "Previous" button that shows the previous sculpture. It shouldn't crash on the first sculpture.

</details>

<Sandpack>

```js
import { useState } from "react";
import { sculptureList } from "./data.js";

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? "Hide" : "Show"} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </>
  );
}
```

```js src/data.js
export const sculptureList = [
  {
    name: "Homenaje a la Neurocirugía",
    artist: "Marta Colvin Andrade",
    description:
      "Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.",
    url: "https://i.imgur.com/Mx7dA2Y.jpg",
    alt: "A bronze statue of two crossed hands delicately holding a human brain in their fingertips.",
  },
  {
    name: "Floralis Genérica",
    artist: "Eduardo Catalano",
    description:
      "This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.",
    url: "https://i.imgur.com/ZF6s192m.jpg",
    alt: "A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.",
  },
  {
    name: "Eternal Presence",
    artist: "John Woodrow Wilson",
    description:
      'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
    url: "https://i.imgur.com/aTtVpES.jpg",
    alt: "The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.",
  },
  {
    name: "Moai",
    artist: "Unknown Artist",
    description:
      "Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.",
    url: "https://i.imgur.com/RCwLEoQm.jpg",
    alt: "Three monumental stone busts with the heads that are disproportionately large with somber faces.",
  },
  {
    name: "Blue Nana",
    artist: "Niki de Saint Phalle",
    description:
      "The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.",
    url: "https://i.imgur.com/Sd1AgUOm.jpg",
    alt: "A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.",
  },
  {
    name: "Ultimate Form",
    artist: "Barbara Hepworth",
    description:
      "This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.",
    url: "https://i.imgur.com/2heNQDcm.jpg",
    alt: "A tall sculpture made of three elements stacked on each other reminding of a human figure.",
  },
  {
    name: "Cavaliere",
    artist: "Lamidi Olonade Fakeye",
    description:
      "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
    url: "https://i.imgur.com/wIdGuZwm.png",
    alt: "An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.",
  },
  {
    name: "Big Bellies",
    artist: "Alina Szapocznikow",
    description:
      "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
    url: "https://i.imgur.com/AlHTAdDm.jpg",
    alt: "The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.",
  },
  {
    name: "Terracotta Army",
    artist: "Unknown Artist",
    description:
      "The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.",
    url: "https://i.imgur.com/HMFmH6m.jpg",
    alt: "12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.",
  },
  {
    name: "Lunar Landscape",
    artist: "Louise Nevelson",
    description:
      "Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.",
    url: "https://i.imgur.com/rN7hY6om.jpg",
    alt: "A black matte sculpture where the individual elements are initially indistinguishable.",
  },
  {
    name: "Aureole",
    artist: "Ranjani Shettar",
    description:
      'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
    url: "https://i.imgur.com/okTpbHhm.jpg",
    alt: "A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.",
  },
  {
    name: "Hippos",
    artist: "Taipei Zoo",
    description:
      "The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.",
    url: "https://i.imgur.com/6o5Vuyu.jpg",
    alt: "A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.",
  },
];
```

```css
button {
  display: block;
  margin-bottom: 10px;
}
.Page > * {
  float: left;
  width: 50%;
  padding: 10px;
}
h2 {
  margin-top: 10px;
  margin-bottom: 0;
}
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img {
  width: 120px;
  height: 120px;
}
```

</Sandpack>

<Solution>

Это добавляет защитное условие в оба обработчика событий и отключает кнопки, когда это необходимо:

<details>
<summary><small>(eng)</small></summary>

This adds a guarding condition inside both event handlers and disables the buttons when needed:

</details>

<Sandpack>

```js
import { useState } from "react";
import { sculptureList } from "./data.js";

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  let hasPrev = index > 0;
  let hasNext = index < sculptureList.length - 1;

  function handlePrevClick() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handlePrevClick} disabled={!hasPrev}>
        Previous
      </button>
      <button onClick={handleNextClick} disabled={!hasNext}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? "Hide" : "Show"} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </>
  );
}
```

```js src/data.js hidden
export const sculptureList = [
  {
    name: "Homenaje a la Neurocirugía",
    artist: "Marta Colvin Andrade",
    description:
      "Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.",
    url: "https://i.imgur.com/Mx7dA2Y.jpg",
    alt: "A bronze statue of two crossed hands delicately holding a human brain in their fingertips.",
  },
  {
    name: "Floralis Genérica",
    artist: "Eduardo Catalano",
    description:
      "This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.",
    url: "https://i.imgur.com/ZF6s192m.jpg",
    alt: "A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.",
  },
  {
    name: "Eternal Presence",
    artist: "John Woodrow Wilson",
    description:
      'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
    url: "https://i.imgur.com/aTtVpES.jpg",
    alt: "The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.",
  },
  {
    name: "Moai",
    artist: "Unknown Artist",
    description:
      "Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.",
    url: "https://i.imgur.com/RCwLEoQm.jpg",
    alt: "Three monumental stone busts with the heads that are disproportionately large with somber faces.",
  },
  {
    name: "Blue Nana",
    artist: "Niki de Saint Phalle",
    description:
      "The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.",
    url: "https://i.imgur.com/Sd1AgUOm.jpg",
    alt: "A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.",
  },
  {
    name: "Ultimate Form",
    artist: "Barbara Hepworth",
    description:
      "This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.",
    url: "https://i.imgur.com/2heNQDcm.jpg",
    alt: "A tall sculpture made of three elements stacked on each other reminding of a human figure.",
  },
  {
    name: "Cavaliere",
    artist: "Lamidi Olonade Fakeye",
    description:
      "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
    url: "https://i.imgur.com/wIdGuZwm.png",
    alt: "An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.",
  },
  {
    name: "Big Bellies",
    artist: "Alina Szapocznikow",
    description:
      "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
    url: "https://i.imgur.com/AlHTAdDm.jpg",
    alt: "The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.",
  },
  {
    name: "Terracotta Army",
    artist: "Unknown Artist",
    description:
      "The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.",
    url: "https://i.imgur.com/HMFmH6m.jpg",
    alt: "12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.",
  },
  {
    name: "Lunar Landscape",
    artist: "Louise Nevelson",
    description:
      "Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.",
    url: "https://i.imgur.com/rN7hY6om.jpg",
    alt: "A black matte sculpture where the individual elements are initially indistinguishable.",
  },
  {
    name: "Aureole",
    artist: "Ranjani Shettar",
    description:
      'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
    url: "https://i.imgur.com/okTpbHhm.jpg",
    alt: "A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.",
  },
  {
    name: "Hippos",
    artist: "Taipei Zoo",
    description:
      "The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.",
    url: "https://i.imgur.com/6o5Vuyu.jpg",
    alt: "A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.",
  },
];
```

```css
button {
  display: block;
  margin-bottom: 10px;
}
.Page > * {
  float: left;
  width: 50%;
  padding: 10px;
}
h2 {
  margin-top: 10px;
  margin-bottom: 0;
}
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img {
  width: 120px;
  height: 120px;
}
```

</Sandpack>

Обратите внимание, что `hasPrev` и `hasNext` используются _как_ для возвращаемого JSX, так и внутри обработчиков событий! Этот удобный паттерн работает потому, что функции обработчиков событий ["закрывают"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) любые переменные, объявленные во время рендеринга.

<details>
<summary><small>(eng)</small></summary>

Notice how `hasPrev` and `hasNext` are used _both_ for the returned JSX and inside the event handlers! This handy pattern works because event handler functions ["close over"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) any variables declared while rendering.

</details>

</Solution>

#### Исправьте входные данные формы {/*fix-stuck-form-inputs*/}

Когда вы вводите текст в поля ввода, ничего не появляется. Как будто значения ввода "застряли" в пустых строках. Значение `value` первого `<input>` установлено так, чтобы всегда соответствовать переменной `firstName`, а значение `value` второго `<input>` установлено так, чтобы всегда соответствовать переменной `lastName`. Это правильно. Оба входа имеют обработчики событий `onChange`, которые пытаются обновить переменные на основе последнего введенного пользователем значения (`e.target.value`). Однако переменные, похоже, не "запоминают" свои значения между повторными рендерами. Исправьте это, используя вместо них переменные состояния.

<details>
<summary><small>(eng)</small></summary>

<b>Fix stuck form inputs :</b>
When you type into the input fields, nothing appears. It's like the input values are "stuck" with empty strings. The `value` of the first `<input>` is set to always match the `firstName` variable, and the `value` for the second `<input>` is set to always match the `lastName` variable. This is correct. Both inputs have `onChange` event handlers, which try to update the variables based on the latest user input (`e.target.value`). However, the variables don't seem to "remember" their values between re-renders. Fix this by using state variables instead.

</details>

<Sandpack>

```js
export default function Form() {
  let firstName = "";
  let lastName = "";

  function handleFirstNameChange(e) {
    firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    lastName = e.target.value;
  }

  function handleReset() {
    firstName = "";
    lastName = "";
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>
        Hi, {firstName} {lastName}
      </h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
```

```css
h1 {
  margin-top: 10px;
}
```

</Sandpack>

<Solution>

Сначала импортируйте `useState` из React. Затем замените `firstName` и `lastName` на переменные состояния, объявленные вызовом `useState`. Наконец, замените каждое присваивание `firstName = ...` на `setFirstName(...)`, и сделайте то же самое для `lastName`. Не забудьте также обновить `handleReset`, чтобы кнопка сброса работала.

<details>
<summary><small>(eng)</small></summary>

First, import `useState` from React. Then replace `firstName` and `lastName` with state variables declared by calling `useState`. Finally, replace every `firstName = ...` assignment with `setFirstName(...)`, and do the same for `lastName`. Don't forget to update `handleReset` too so that the reset button works.

</details>

<Sandpack>

```js
import { useState } from "react";

export default function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  function handleReset() {
    setFirstName("");
    setLastName("");
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>
        Hi, {firstName} {lastName}
      </h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
```

```css
h1 {
  margin-top: 10px;
}
```

</Sandpack>

</Solution>

#### Устраните сбой {/*fix-a-crash*/}

Перед вами небольшая форма, которая должна позволить пользователю оставить отзыв. Когда отзыв отправлен, должно появиться сообщение с благодарностью. Однако она аварийно завершается с сообщением об ошибке "Rendered lesser hooks than expected". Можете ли вы заметить ошибку и исправить ее?

<Hint>

Существуют ли ограничения на то, где можно вызывать хуки? Нарушает ли этот компонент какие-либо правила? Проверьте, нет ли комментариев, отключающих проверки линтера - именно здесь часто скрываются ошибки!

</Hint>

<details>
<summary><small>(eng)</small></summary>

<b>Fix a crash :</b>
Here is a small form that is supposed to let the user leave some feedback. When the feedback is submitted, it's supposed to display a thank-you message. However, it crashes with an error message saying "Rendered fewer hooks than expected". Can you spot the mistake and fix it?

<Hint>

Are there any limitations on _where_ Hooks may be called? Does this component break any rules? Check if there are any comments disabling the linter checks--this is where the bugs often hide!

</Hint>

</details>

<Sandpack>

```js
import { useState } from "react";

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  if (isSent) {
    return <h1>Thank you!</h1>;
  } else {
    // eslint-disable-next-line
    const [message, setMessage] = useState("");
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Sending: "${message}"`);
          setIsSent(true);
        }}
      >
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }
}
```

</Sandpack>

<Solution>

Крючки можно вызывать только на верхнем уровне функции компонента. Здесь первое определение `isSent` следует этому правилу, но определение `message` вложено в условие.

Переместите его из условия, чтобы решить проблему:

<details>
<summary><small>(eng)</small></summary>

Hooks can only be called at the top level of the component function. Here, the first `isSent` definition follows this rule, but the `message` definition is nested in a condition.

Move it out of the condition to fix the issue:

</details>

<Sandpack>

```js
import { useState } from "react";

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState("");

  if (isSent) {
    return <h1>Thank you!</h1>;
  } else {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Sending: "${message}"`);
          setIsSent(true);
        }}
      >
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }
}
```

</Sandpack>

Помните, что крючки должны вызываться безоговорочно и всегда в одном и том же порядке!

Вы также можете удалить ненужную ветку `else`, чтобы уменьшить вложенность. Однако по-прежнему важно, чтобы все вызовы хуков происходили _до_ первого `возврата`.

<details>
<summary><small>(eng)</small></summary>

Remember, Hooks must be called unconditionally and always in the same order!

You could also remove the unnecessary `else` branch to reduce the nesting. However, it's still important that all calls to Hooks happen _before_ the first `return`.

</details>

<Sandpack>

```js
import { useState } from "react";

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState("");

  if (isSent) {
    return <h1>Thank you!</h1>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert(`Sending: "${message}"`);
        setIsSent(true);
      }}
    >
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button type="submit">Send</button>
    </form>
  );
}
```

</Sandpack>

Попробуйте перенести второй вызов `useState` после условия `if` и обратите внимание на то, как это снова сломает его.

Если ваш linter [настроен на React](/learn/editor-setup#linting), вы должны увидеть ошибку lint при совершении подобной ошибки. Если вы не видите ошибки, когда пробуете локально ошибочный код, вам нужно настроить линтинг для вашего проекта.

<details>
<summary><small>(eng)</small></summary>

Try moving the second `useState` call after the `if` condition and notice how this breaks it again.

If your linter is [configured for React](/learn/editor-setup#linting), you should see a lint error when you make a mistake like this. If you don't see an error when you try the faulty code locally, you need to set up linting for your project.

</details>

</Solution>

#### Удалите ненужное состояние {/*remove-unnecessary-state*/}

При нажатии на кнопку этот пример должен запросить имя пользователя, а затем вывести приветствие. Вы попытались использовать состояние для сохранения имени, но по какой-то причине в первый раз он выводит "Hello, !", а затем "Hello, [имя]!" с предыдущим вводом каждый раз после этого.

Чтобы исправить этот код, удалите ненужную переменную state. (О том, [почему это не сработало](/learn/state-as-a-snapshot), мы поговорим позже).

Можете ли вы объяснить, почему эта переменная состояния была лишней?

<details>
<summary><small>(eng)</small></summary>

<b>Remove unnecessary state :</b>
When the button is clicked, this example should ask for the user's name and then display an alert greeting them. You tried to use state to keep the name, but for some reason the first time it shows "Hello, !", and then "Hello, [name]!" with the previous input every time after.

To fix this code, remove the unnecessary state variable. (We will discuss about [why this didn't work](/learn/state-as-a-snapshot) later.)

Can you explain why this state variable was unnecessary?

</details>

<Sandpack>

```js
import { useState } from "react";

export default function FeedbackForm() {
  const [name, setName] = useState("");

  function handleClick() {
    setName(prompt("What is your name?"));
    alert(`Hello, ${name}!`);
  }

  return <button onClick={handleClick}>Greet</button>;
}
```

</Sandpack>

<Solution>

Вот исправленная версия, которая использует обычную переменную `name`, объявленную в функции, которой она нужна:

<details>
<summary><small>(eng)</small></summary>

Here is a fixed version that uses a regular `name` variable declared in the function that needs it:

</details>

<Sandpack>

```js
export default function FeedbackForm() {
  function handleClick() {
    const name = prompt("What is your name?");
    alert(`Hello, ${name}!`);
  }

  return <button onClick={handleClick}>Greet</button>;
}
```

</Sandpack>

Переменная состояния необходима только для хранения информации между повторными рендерингами компонента. В рамках одного обработчика событий обычная переменная будет работать отлично. Не вводите переменные состояния, если обычная переменная работает хорошо.

<details>
<summary><small>(eng)</small></summary>

A state variable is only necessary to keep information between re-renders of a component. Within a single event handler, a regular variable will do fine. Don't introduce state variables when a regular variable works well.

</details>

</Solution>

</Challenges>
