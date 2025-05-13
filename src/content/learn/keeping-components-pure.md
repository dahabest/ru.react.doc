---
title: Поддержание чистоты компонентов
---

<Intro>

Некоторые функции JavaScript являются *чистыми*. Чистые функции выполняют только вычисления и ничего больше. Если вы будете писать свои компоненты только как чистые функции, вы сможете избежать целого класса непонятных ошибок и непредсказуемого поведения по мере роста вашей кодовой базы. Однако, чтобы получить эти преимущества, необходимо соблюдать несколько правил.

<details>
<summary><small>(eng)</small></summary>

Some JavaScript functions are *pure.* Pure functions only perform a calculation and nothing more. By strictly only writing your components as pure functions, you can avoid an entire class of baffling bugs and unpredictable behavior as your codebase grows. To get these benefits, though, there are a few rules you must follow.
<b>You will know:</b>
* What purity is and how it helps you avoid bugs
* How to keep components pure by keeping changes out of the render phase
* How to use Strict Mode to find mistakes in your components

</details>

</Intro>

<YouWillLearn>
* Что такое чистота и как она помогает избежать ошибок
* Как сохранить чистоту компонентов, не допуская изменений на этапе рендеринга
* Как использовать строгий режим для поиска ошибок в компонентах
</YouWillLearn>

## Чистота: Компоненты как формулы {/*purity-components-as-formulas*/}

В компьютерной науке (и особенно в мире функционального программирования) [чистая функция](https://wikipedia.org/wiki/Pure_function) - это функция со следующими характеристиками:

* **Занимается своими делами.** Она не изменяет никаких объектов или переменных, существовавших до ее вызова.
* **Одни и те же входные данные, один и тот же результат.** При одинаковых входных данных чистая функция всегда должна возвращать один и тот же результат.

Возможно, вы уже знакомы с одним из примеров чистых функций: формулами в математике.
Рассмотрим эту математическую формулу: <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math>.
Если <Math><MathI>x</MathI> = 2</Math>, то <Math><MathI>y</MathI> = 4</Math>. Всегда. 
Если <Math><MathI>x</MathI> = 3</Math>, то <Math><MathI>y</MathI> = 6</Math>. Всегда. 
Если <Math><MathI>x</MathI> = 3</Math>, то <MathI>y</MathI> не будет иногда <Math>9</Math> или <Math>-1</Math> или <Math>2,5</Math> в зависимости от времени суток или состояния фондового рынка. 
Если <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> и <Math><MathI>x</MathI> = 3</Math>, то <MathI>y</MathI> _всегда_ будет <Math>6</Math>. 

Если бы мы сделали из этого функцию на JavaScript, то она выглядела бы следующим образом:

<details>
<summary><small>(eng)</small></summary>

<b>Purity: Components as formulas</b>

In computer science (and especially the world of functional programming), [a pure function](https://wikipedia.org/wiki/Pure_function) is a function with the following characteristics:

* **It minds its own business.** It does not change any objects or variables that existed before it was called.
* **Same inputs, same output.** Given the same inputs, a pure function should always return the same result.

You might already be familiar with one example of pure functions: formulas in math.

Consider this math formula: <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math>.

If <Math><MathI>x</MathI> = 2</Math> then <Math><MathI>y</MathI> = 4</Math>. Always. 

If <Math><MathI>x</MathI> = 3</Math> then <Math><MathI>y</MathI> = 6</Math>. Always. 

If <Math><MathI>x</MathI> = 3</Math>, <MathI>y</MathI> won't sometimes be <Math>9</Math> or <Math>–1</Math> or <Math>2.5</Math> depending on the time of day or the state of the stock market. 

If <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> and <Math><MathI>x</MathI> = 3</Math>, <MathI>y</MathI> will _always_ be <Math>6</Math>. 

If we made this into a JavaScript function, it would look like this:

In the above example, `double` is a **pure function.** If you pass it `3`, it will return `6`. Always.

React is designed around this concept. **React assumes that every component you write is a pure function.** This means that React components you write must always return the same JSX given the same inputs:

</details>


```js
function double(number) {
  return 2 * number;
}
```
В приведенном выше примере `double` - это **чистая функция.** Если вы передадите ей `3`, она вернет `6`. Всегда.

React разработан на основе этой концепции. **React предполагает, что каждый написанный вами компонент является чистой функцией.** Это означает, что написанные вами компоненты React должны всегда возвращать один и тот же JSX при одинаковых входных данных:

<Sandpack>

```js src/App.js
function Recipe({ drinkers }) {
  return (
    <ol>    
      <li>Boil {drinkers} cups of water.</li>
      <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  );
}

export default function App() {
  return (
    <section>
      <h1>Spiced Chai Recipe</h1>
      <h2>For two</h2>
      <Recipe drinkers={2} />
      <h2>For a gathering</h2>
      <Recipe drinkers={4} />
    </section>
  );
}
```

</Sandpack>

<details>
<summary><small>(eng)</small></summary>

When you pass `drinkers={2}` to `Recipe`, it will return JSX containing `2 cups of water`. Always. 
If you pass `drinkers={4}`, it will return JSX containing `4 cups of water`. Always.
Just like a math formula. 
You could think of your components as recipes: if you follow them and don't introduce new ingredients during the cooking process, you will get the same dish every time. That "dish" is the JSX that the component serves to React to [render.](/learn/render-and-commit)

</details>

Когда вы передадите `drinkers={2}` в `Recipe`, он вернет JSX, содержащий `2 чашки воды`. Всегда. 

Если передать `drinkers={4}`, то будет возвращен JSX, содержащий `4 чашки воды`. Всегда.
Прямо как математическая формула. 

Можно представить себе компоненты как рецепты: если следовать им и не вводить новые ингредиенты в процессе приготовления, то каждый раз будет получаться одно и то же блюдо. 

Это «блюдо» - JSX, который компонент передает React для [рендеринга](/learn/render-and-commit).

<Illustration src="/ru.react.doc/images/docs/illustrations/i_puritea-recipe.png" alt="A tea recipe for x people: take x cups of water, add x spoons of tea and 0.5x spoons of spices, and 0.5x cups of milk" />

## Побочные эффекты: (не)запланированные последствия {/*side-effects-unintended-consequences*/}

Процесс рендеринга в React всегда должен быть чистым. Компоненты должны только *возвращать* свой JSX, но не *изменять* какие-либо объекты или переменные, существовавшие до рендеринга - это сделает их нечистыми!

Вот компонент, который нарушает это правило:

<details>
<summary><small>(eng)</small></summary>

<b>Side Effects: (un)intended consequences</b>
React's rendering process must always be pure. Components should only *return* their JSX, and not *change* any objects or variables that existed before rendering—that would make them impure!
Here is a component that breaks this rule:

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

Этот компонент читает и записывает переменную `guest`, объявленную вне его. Это означает, что **вызов этого компонента несколько раз приведет к созданию разных JSX!** И более того, если _другие_ компоненты читают `guest`, они тоже будут создавать разные JSX, в зависимости от того, когда они были отрендерены! Это не предсказуемо.

Возвращаясь к нашей формуле <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math>, теперь, даже если <Math><MathI>x</MathI> = 2</Math>, мы не можем верить, что <Math><MathI>y</MathI> = 4</Math>. Наши тесты могут провалиться, наши пользователи будут озадачены, самолеты будут падать с неба - вы можете видеть, как это может привести к запутанным ошибкам!

Вы можете исправить этот компонент, [вместо этого передав `guest` в качестве параметра](/learn/passing-props-to-a-component):

<details>
<summary><small>(eng)</small></summary>

This component is reading and writing a `guest` variable declared outside of it. This means that **calling this component multiple times will produce different JSX!** And what's more, if _other_ components read `guest`, they will produce different JSX, too, depending on when they were rendered! That's not predictable.
Going back to our formula <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math>, now even if <Math><MathI>x</MathI> = 2</Math>, we cannot trust that <Math><MathI>y</MathI> = 4</Math>. Our tests could fail, our users would be baffled, planes would fall out of the sky—you can see how this would lead to confusing bugs!
You can fix this component by [passing `guest` as a prop instead](/learn/passing-props-to-a-component):

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

Теперь ваш компонент чист, поскольку JSX, который он возвращает, зависит только от параметра `guest`.

В целом, не стоит ожидать, что ваши компоненты будут отображаться в каком-то определенном порядке. Не имеет значения, вызываете ли вы <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> до или после <Math><MathI>y</MathI> = 5<MathI>x</MathI></Math>: обе формулы разрешатся независимо друг от друга. Точно так же каждый компонент должен «думать только за себя» и не пытаться координировать свою работу с другими компонентами или зависеть от них во время рендеринга. Рендеринг - это как школьный экзамен: каждый компонент должен вычислять JSX самостоятельно!

<details>
<summary><small>(eng)</small></summary>

Now your component is pure, as the JSX it returns only depends on the `guest` prop.
In general, you should not expect your components to be rendered in any particular order. It doesn't matter if you call <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> before or after <Math><MathI>y</MathI> = 5<MathI>x</MathI></Math>: both formulas will resolve independently of each other. In the same way, each component should only "think for itself", and not attempt to coordinate with or depend upon others during rendering.
Rendering is like a school exam: each component should calculate JSX on their own!

</details>


<DeepDive>

#### Обнаружение не чистых вычислений с помощью StrictMode {/*detecting-impure-calculations-with-strict-mode*/}

Хотя вы, возможно, еще не использовали их все, в React есть три вида входных данных, которые вы можете читать во время рендеринга: [параметры](/learn/passing-props-to-a-component), [state](/learn/state-a-components-memory), и [context.](/learn/passing-data-deeply-with-context) Вы всегда должны рассматривать эти входы как доступные только для чтения.

Если вы хотите *изменить* что-то в ответ на ввод пользователя, вам следует [set state](/learn/state-a-components-memory) вместо записи в переменную. Вы никогда не должны изменять уже существующие переменные или объекты во время рендеринга вашего компонента.

React предлагает «строгий режим», в котором он дважды вызывает функцию каждого компонента во время разработки. **Дважды вызывая функции компонента, «Строгий режим» помогает найти компоненты, которые нарушают эти правила*.

Обратите внимание, что в исходном примере вместо «Гость №1», «Гость №2» и «Гость №3» отображались «Гость №2», «Гость №4» и «Гость №6». Исходная функция была нечистой, поэтому вызов ее дважды сломал ее. Но исправленная чистая версия работает, даже если функция вызывается каждый раз дважды. **Чистые функции только вычисляют, поэтому их вызов дважды ничего не изменит**- точно так же, как вызов `double(2)` дважды не меняет того, что возвращается, а решение <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> дважды не меняет того, что есть <MathI>y</MathI>. Одинаковые входы, одинаковые выходы. Всегда.

Строгий режим не влияет на работу приложения, поэтому он не замедлит работу приложения для ваших пользователей. Чтобы перейти в строгий режим, вы можете обернуть корневой компонент в `<React.StrictMode>`. Некоторые фреймворки делают это по умолчанию.

<details>
<summary><small>(eng)</small></summary>

<b>Detecting impure calculations with StrictMode</b>
Although you might not have used them all yet, in React there are three kinds of inputs that you can read while rendering: [props](/learn/passing-props-to-a-component), [state](/learn/state-a-components-memory), and [context.](/learn/passing-data-deeply-with-context) You should always treat these inputs as read-only.
When you want to *change* something in response to user input, you should [установить состояние](/learn/state-a-components-memory) instead of writing to a variable. You should never change preexisting variables or objects while your component is rendering.
React offers a "Strict Mode" in which it calls each component's function twice during development. **By calling the component functions twice, Strict Mode helps find components that break these rules.**
Notice how the original example displayed "Guest #2", "Guest #4", and "Guest #6" instead of "Guest #1", "Guest #2", and "Guest #3". The original function was impure, so calling it twice broke it. But the fixed pure version works even if the function is called twice every time. **Pure functions only calculate, so calling them twice won't change anything**--just like calling `double(2)` twice doesn't change what's returned, and solving <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> twice doesn't change what <MathI>y</MathI> is. Same inputs, same outputs. Always.
Strict Mode has no effect in production, so it won't slow down the app for your users. To opt into Strict Mode, you can wrap your root component into `<React.StrictMode>`. Some frameworks do this by default.

</details>


</DeepDive>

### Локальная мутация: Маленький секрет вашего компонента {/*local-mutation-your-components-little-secret*/}

В приведенном выше примере проблема заключалась в том, что компонент изменял *предшествующую* переменную во время рендеринга. Это часто называют **"мутацией »**, чтобы звучало немного страшнее. Чистые функции не мутируют переменные за пределами области видимости функции или объекты, созданные до вызова - это делает их нечистыми!

Однако **совершенно нормально изменять переменные и объекты, которые вы *только что* создали во время рендеринга.** В этом примере вы создаете массив `[]`, присваиваете его переменной `cups`, а затем `толкаете` в него дюжину чашек:

<details>
<summary><small>(eng)</small></summary>

<b>Local mutation: Your component's little secret</b>
In the above example, the problem was that the component changed a *preexisting* variable while rendering. This is often called a **"mutation"** to make it sound a bit scarier. Pure functions don't mutate variables outside of the function's scope or objects that were created before the call—that makes them impure!
However, **it's completely fine to change variables and objects that you've *just* created while rendering.** In this example, you create an `[]` array, assign it to a `cups` variable, and then `push` a dozen cups into it:

</details>


<Sandpack>

```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```

</Sandpack>

Если бы переменная `cups` или массив `[]` были созданы вне функции `TeaGathering`, это стало бы огромной проблемой! Вы бы изменяли *предшествующий* объект, заталкивая элементы в этот массив.

Однако все в порядке, потому что вы создали их *во время того же рендера*, внутри `TeaGathering`. Никакой код вне `TeaGathering` никогда не узнает, что это произошло. Это называется **"локальная мутация »**- это как маленький секрет вашего компонента.

<details>
<summary><small>(eng)</small></summary>

If the `cups` variable or the `[]` array were created outside the `TeaGathering` function, this would be a huge problem! You would be changing a *preexisting* object by pushing items into that array.
However, it's fine because you've created them *during the same render*, inside `TeaGathering`. No code outside of `TeaGathering` will ever know that this happened. This is called **"local mutation"**—it's like your component's little secret.

</details>


## Где вы _можете_ вызывать побочные эффекты {/*where-you-_can_-cause-side-effects*/}

Хотя функциональное программирование в значительной степени опирается на чистоту, в какой-то момент, где-то, _что-то_ должно измениться. В этом и заключается смысл программирования! Эти изменения - обновление экрана, запуск анимации, изменение данных - называются **сайд эффектами или побочными эффектами**. Это то, что происходит _«на стороне»_, а не во время рендеринга.

В React **сторонние эффекты обычно находятся внутри [обработчиков событий](/learn/responding-to-events)** Обработчики событий - это функции, которые React запускает при выполнении какого-либо действия - например, при нажатии на кнопку. Несмотря на то, что обработчики событий определяются *внутри* вашего компонента, они не выполняются *во время* рендеринга! **Поэтому обработчики событий не обязательно должны быть чистыми.**

Если вы исчерпали все другие варианты и не можете найти подходящий обработчик событий для вашего побочного эффекта, вы все равно можете прикрепить его к возвращаемому JSX с помощью вызова [`useEffect`](/reference/react/useEffect) в вашем компоненте. Это позволит React выполнить его позже, после рендеринга, когда побочные эффекты разрешены. **Однако к такому подходу следует прибегать в последнюю очередь.

По возможности старайтесь выражать свою логику только с помощью рендеринга. Вы будете удивлены, как далеко это может завести!

<details>
<summary><small>(eng)</small></summary>

<b>Where you _can_ cause side effects</b>
While functional programming relies heavily on purity, at some point, somewhere, _something_ has to change. That's kind of the point of programming! These changes—updating the screen, starting an animation, changing the data—are called **side effects.** They're things that happen _"on the side"_, not during rendering.

In React, **side effects usually belong inside [event handlers.](/learn/responding-to-events)** Event handlers are functions that React runs when you perform some action—for example, when you click a button. Even though event handlers are defined *inside* your component, they don't run *during* rendering! **So event handlers don't need to be pure.**

If you've exhausted all other options and can't find the right event handler for your side effect, you can still attach it to your returned JSX with a [`useEffect`](/reference/react/useEffect) call in your component. This tells React to execute it later, after rendering, when side effects are allowed. **However, this approach should be your last resort.**

When possible, try to express your logic with rendering alone. You'll be surprised how far this can take you!

</details>


<DeepDive>

#### Почему React заботится о чистоте? {/*why-does-react-care-about-purity*/}

Написание чистых функций требует определенной привычки и дисциплины. Но это открывает чудесные возможности:

* Ваши компоненты могут работать в другой среде - например, на сервере! Поскольку они возвращают один и тот же результат при одних и тех же входных данных, один компонент может обслуживать множество пользовательских запросов.
* Вы можете повысить производительность, [пропуская рендеринг](/reference/react/memo) компонентов, входные данные которых не изменились. Это безопасно, потому что чистые функции всегда возвращают одинаковые результаты, поэтому их безопасно кэшировать.
* Если какие-то данные меняются в середине рендеринга глубокого дерева компонентов, React может перезапустить рендеринг, не тратя время на завершение устаревшего рендеринга. Чистота делает безопасным прекращение вычислений в любой момент.

Каждая новая функция React, которую мы создаем, использует преимущества чистоты. От получения данных до анимации и производительности - чистота компонентов раскрывает всю мощь парадигмы React.

<details>
<summary><small>(eng)</small></summary>

<b>Why does React care about purity</b>

Writing pure functions takes some habit and discipline. But it also unlocks marvelous opportunities:

* Your components could run in a different environment—for example, on the server! Since they return the same result for the same inputs, one component can serve many user requests.
* You can improve performance by [skipping rendering](/reference/react/memo) components whose inputs have not changed. This is safe because pure functions always return the same results, so they are safe to cache.
* If some data changes in the middle of rendering a deep component tree, React can restart rendering without wasting time to finish the outdated render. Purity makes it safe to stop calculating at any time.

Every new React feature we're building takes advantage of purity. From data fetching to animations to performance, keeping components pure unlocks the power of the React paradigm.

</details>


</DeepDive>

<Recap>

* Компонент должен быть чистым, то есть:
  * **Он занимается своими делами.** Он не должен изменять никакие объекты или переменные, которые существовали до рендеринга.
  * **Одинаковые входы, одинаковый выход.** При одинаковых входных данных компонент должен всегда возвращать один и тот же JSX. 
* Рендеринг может происходить в любое время, поэтому компоненты не должны зависеть от последовательности рендеринга друг друга.
* Вы не должны изменять никакие входные данные, которые ваши компоненты используют для рендеринга. Это касается параметров, состояния и контекста. Чтобы обновить экран, [«установите» состояние](/learn/state-a-components-memory) вместо того, чтобы мутировать заранее существующие объекты.
* Стремитесь выразить логику компонента в возвращаемом JSX. Когда вам нужно «что-то изменить», вы обычно хотите сделать это в обработчике события. В крайнем случае, вы можете использовать `Effect`.
* Написание чистых функций требует некоторой практики, но оно раскрывает всю мощь парадигмы React.

<details>
<summary><small>(eng)</small></summary>

* A component must be pure, meaning:
  * **It minds its own business.** It should not change any objects or variables that existed before rendering.
  * **Same inputs, same output.** Given the same inputs, a component should always return the same JSX. 
* Rendering can happen at any time, so components should not depend on each others' rendering sequence.
* You should not mutate any of the inputs that your components use for rendering. That includes props, state, and context. To update the screen, ["set" state](/learn/state-a-components-memory) instead of mutating preexisting objects.
* Strive to express your component's logic in the JSX you return. When you need to "change things", you'll usually want to do it in an event handler. As a last resort, you can `useEffect`.
* Writing pure functions takes a bit of practice, but it unlocks the power of React's paradigm.

</details>


</Recap>


  
<Challenges>

#### Почините сломанные часы {/*fix-a-broken-clock*/}

Этот компонент пытается установить CSS-класс `<h1>` на `«ночь»` в период с полуночи до шести часов утра, и на `«день»` во все остальное время. Однако это не срабатывает. Можете ли вы исправить этот компонент?

Вы можете проверить, работает ли ваше решение, временно изменив часовой пояс компьютера. Когда текущее время находится между полуночью и шестью часами утра, часы должны иметь инвертированные цвета!

<details>
<summary><small>(eng)</small></summary>

<b>Fix a broken clock</b>
This component tries to set the `<h1>`'s CSS class to `"night"` during the time from midnight to six hours in the morning, and `"day"` at all other times. However, it doesn't work. Can you fix this component?
You can verify whether your solution works by temporarily changing the computer's timezone. When the current time is between midnight and six in the morning, the clock should have inverted colors!

Hint: Rendering is a *calculation*, it shouldn't try to "do" things. Can you express the same idea differently?

</details>

<Hint>
Рендеринг - это *расчет*, он не должен пытаться «делать» что-то. Можете ли вы выразить ту же идею по-другому?
</Hint>

<Sandpack>

```js src/Clock.js active
export default function Clock({ time }) {
  let hours = time.getHours();
  if (hours >= 0 && hours <= 6) {
    document.getElementById('time').className = 'night';
  } else {
    document.getElementById('time').className = 'day';
  }
  return (
    <h1 id="time">
      {time.toLocaleTimeString()}
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
  return (
    <Clock time={time} />
  );
}
```

```css
body > * {
  width: 100%;
  height: 100%;
}
.day {
  background: #fff;
  color: #222;
}
.night {
  background: #222;
  color: #fff;
}
```

</Sandpack>

<Solution>

Вы можете исправить этот компонент, вычислив `className` и включив его в вывод рендера:

<details>
<summary><small>(eng)</small></summary>

You can fix this component by calculating the `className` and including it in the render output:

In this example, the side effect (modifying the DOM) was not necessary at all. You only needed to return JSX.

</details>


<Sandpack>

```js src/Clock.js active
export default function Clock({ time }) {
  let hours = time.getHours();
  let className;
  if (hours >= 0 && hours <= 6) {
    className = 'night';
  } else {
    className = 'day';
  }
  return (
    <h1 className={className}>
      {time.toLocaleTimeString()}
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
  return (
    <Clock time={time} />
  );
}
```

```css
body > * {
  width: 100%;
  height: 100%;
}
.day {
  background: #fff;
  color: #222;
}
.night {
  background: #222;
  color: #fff;
}
```

</Sandpack>

В этом примере побочный эффект (модификация DOM) был совсем не нужен. Нужно было только вернуть JSX.

</Solution>

#### Исправьте сломанный профиль {/*fix-a-broken-profile*/}

Два компонента `Profile` отображаются рядом с разными данными. Нажмите кнопку «Свернуть» на первом профиле, а затем «Развернуть». Вы заметите, что в обоих профилях теперь отображается один и тот же человек. Это ошибка.

Найдите причину ошибки и исправьте ее.

<details>
<summary><small>(eng)</small></summary>

<b>Fix a broken profile:</b>
Two `Profile` components are rendered side by side with different data. Press "Collapse" on the first profile, and then "Expand" it. You'll notice that both profiles now show the same person. This is a bug.
Find the cause of the bug and fix it.
Hint: The buggy code is in `Profile.js`. Make sure you read it all from top to bottom!

</details>

<Hint>Ошибочный код находится в файле `Profile.js`. Обязательно прочитайте его сверху донизу!</Hint>

<Sandpack>

```js src/Profile.js
import Panel from './Panel.js';
import { getImageUrl } from './utils.js';

let currentPerson;

export default function Profile({ person }) {
  currentPerson = person;
  return (
    <Panel>
      <Header />
      <Avatar />
    </Panel>
  )
}

function Header() {
  return <h1>{currentPerson.name}</h1>;
}

function Avatar() {
  return (
    <img
      className="avatar"
      src={getImageUrl(currentPerson)}
      alt={currentPerson.name}
      width={50}
      height={50}
    />
  );
}
```

```js src/Panel.js hidden
import { useState } from 'react';

export default function Panel({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="panel">
      <button onClick={() => setOpen(!open)}>
        {open ? 'Collapse' : 'Expand'}
      </button>
      {open && children}
    </section>
  );
}
```

```js src/App.js
import Profile from './Profile.js';

export default function App() {
  return (
    <>
      <Profile person={{
        imageId: 'lrWQx8l',
        name: 'Subrahmanyan Chandrasekhar',
      }} />
      <Profile person={{
        imageId: 'MK3eW3A',
        name: 'Creola Katherine Johnson',
      }} />
    </>
  )
}
```

```js src/utils.js hidden
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
.avatar { margin: 5px; border-radius: 50%; }
.panel {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
  width: 200px;
}
h1 { margin: 5px; font-size: 18px; }
```

</Sandpack>

<Solution>

Проблема в том, что компонент `Profile` записывает данные в заранее существующую переменную `currentPerson`, а компоненты `Header` и `Avatar` читают из нее. Это делает *все три компонента* нечистыми и трудно предсказуемыми.

Чтобы исправить ошибку, удалите переменную `currentPerson`. Вместо этого передавайте всю информацию из `Profile` в `Header` и `Avatar` через параметры. Вам нужно будет добавить параметр `person` в оба компонента и передавать его по всему пути вниз.

<details>
<summary><small>(eng)</small></summary>

The problem is that the `Profile` component writes to a preexisting variable called `currentPerson`, and the `Header` and `Avatar` components read from it. This makes *all three of them* impure and difficult to predict.

To fix the bug, remove the `currentPerson` variable. Instead, pass all information from `Profile` to `Header` and `Avatar` via props. You'll need to add a `person` prop to both components and pass it all the way down.

</details>

<Sandpack>

```js src/Profile.js active
import Panel from './Panel.js';
import { getImageUrl } from './utils.js';

export default function Profile({ person }) {
  return (
    <Panel>
      <Header person={person} />
      <Avatar person={person} />
    </Panel>
  )
}

function Header({ person }) {
  return <h1>{person.name}</h1>;
}

function Avatar({ person }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={50}
      height={50}
    />
  );
}
```

```js src/Panel.js hidden
import { useState } from 'react';

export default function Panel({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="panel">
      <button onClick={() => setOpen(!open)}>
        {open ? 'Collapse' : 'Expand'}
      </button>
      {open && children}
    </section>
  );
}
```

```js src/App.js
import Profile from './Profile.js';

export default function App() {
  return (
    <>
      <Profile person={{
        imageId: 'lrWQx8l',
        name: 'Subrahmanyan Chandrasekhar',
      }} />
      <Profile person={{
        imageId: 'MK3eW3A',
        name: 'Creola Katherine Johnson',
      }} />
    </>
  );
}
```

```js src/utils.js hidden
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
.avatar { margin: 5px; border-radius: 50%; }
.panel {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
  width: 200px;
}
h1 { margin: 5px; font-size: 18px; }
```

</Sandpack>

Помните, что React не гарантирует, что функции компонентов будут выполняться в каком-то определенном порядке, поэтому вы не можете взаимодействовать между ними, задавая переменные. Все взаимодействие должно происходить через параметры.

<details>
<summary><small>(eng)</small></summary>

Remember that React does not guarantee that component functions will execute in any particular order, so you can't communicate between them by setting variables. All communication must happen through props.

</details>

</Solution>

#### Почините сломанный лоток для историй {/*fix-a-broken-story-tray*/}

Генеральный директор вашей компании просит вас добавить «истории» в ваше приложение онлайн-часов, и вы не можете отказать. Вы написали компонент `StoryTray`, который принимает список `историй`, за которым следует заполнитель «Create Story».

Вы реализовали заполнитель «Create Story», поместив в конец массива `stories` еще одну фальшивую историю, которую вы получили в качестве параметра. Но по какой-то причине «Create Story» появляется более одного раза. Исправьте эту проблему.

<details>
<summary><small>(eng)</small></summary>

<b>Fix a broken story tray</b>
The CEO of your company is asking you to add "stories" to your online clock app, and you can't say no. You've written a `StoryTray` component that accepts a list of `stories`, followed by a "Create Story" placeholder.

You implemented the "Create Story" placeholder by pushing one more fake story at the end of the `stories` array that you receive as a prop. But for some reason, "Create Story" appears more than once. Fix the issue.

</details>


<Sandpack>

```js src/StoryTray.js active
export default function StoryTray({ stories }) {
  stories.push({
    id: 'create',
    label: 'Create Story'
  });

  return (
    <ul>
      {stories.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```

```js src/App.js hidden
import { useState, useEffect } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState([...initialStories])
  let time = useTime();

  // HACK: Prevent the memory from growing forever while you read docs.
  // We're breaking our own rules here.
  if (stories.length > 100) {
    stories.length = 100;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <h2>It is {time.toLocaleTimeString()} now.</h2>
      <StoryTray stories={stories} />
    </div>
  );
}

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
```

```css
ul {
  margin: 0;
  list-style-type: none;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  margin-bottom: 20px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

```js sandbox.config.json hidden
{
  "hardReloadOnChange": true
}
```

</Sandpack>

<Solution>

Обратите внимание, что при каждом обновлении часов «Create Story» добавляется *дважды*. Это служит подсказкой, что у нас есть мутация во время рендеринга - строгий режим вызывает компоненты дважды, чтобы сделать эти проблемы более заметными.

Функция `StoryTray` не является чистой. Вызывая `push` на полученном массиве `stories` (параметр!), она мутирует объект, который был создан *до* того, как `StoryTray` начал рендеринг. Это делает его глючным и очень трудно предсказуемым.

Самое простое исправление - вообще не трогать массив и рендерить «Create Story» отдельно:

<details>
<summary><small>(eng)</small></summary>

Notice how whenever the clock updates, "Create Story" is added *twice*. This serves as a hint that we have a mutation during rendering--Strict Mode calls components twice to make these issues more noticeable.

`StoryTray` function is not pure. By calling `push` on the received `stories` array (a prop!), it is mutating an object that was created *before* `StoryTray` started rendering. This makes it buggy and very difficult to predict.

The simplest fix is to not touch the array at all, and render "Create Story" separately:

</details>


<Sandpack>

```js src/StoryTray.js active
export default function StoryTray({ stories }) {
  return (
    <ul>
      {stories.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
      <li>Create Story</li>
    </ul>
  );
}
```

```js src/App.js hidden
import { useState, useEffect } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState([...initialStories])
  let time = useTime();

  // HACK: Prevent the memory from growing forever while you read docs.
  // We're breaking our own rules here.
  if (stories.length > 100) {
    stories.length = 100;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <h2>It is {time.toLocaleTimeString()} now.</h2>
      <StoryTray stories={stories} />
    </div>
  );
}

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
```

```css
ul {
  margin: 0;
  list-style-type: none;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  margin-bottom: 20px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

</Sandpack>

В качестве альтернативы можно создать _новый_ массив (скопировав существующий), прежде чем поместить в него элемент:

<details>
<summary><small>(eng)</small></summary>

Alternatively, you could create a _new_ array (by copying the existing one) before you push an item into it:

</details>


<Sandpack>

```js src/StoryTray.js active
export default function StoryTray({ stories }) {
  // Copy the array!
  let storiesToDisplay = stories.slice();

  // Does not affect the original array:
  storiesToDisplay.push({
    id: 'create',
    label: 'Create Story'
  });

  return (
    <ul>
      {storiesToDisplay.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```

```js src/App.js hidden
import { useState, useEffect } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState([...initialStories])
  let time = useTime();

  // HACK: Prevent the memory from growing forever while you read docs.
  // We're breaking our own rules here.
  if (stories.length > 100) {
    stories.length = 100;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <h2>It is {time.toLocaleTimeString()} now.</h2>
      <StoryTray stories={stories} />
    </div>
  );
}

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
```

```css
ul {
  margin: 0;
  list-style-type: none;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  margin-bottom: 20px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

</Sandpack>

Это позволяет сохранить локальность мутации и чистоту функции рендеринга. Однако все равно нужно быть осторожным: например, если вы попытаетесь изменить любой из существующих элементов массива, вам придется клонировать и эти элементы.

Полезно помнить, какие операции над массивами мутируют, а какие нет. Например, `push`, `pop`, `reverse` и `sort` мутируют исходный массив, а `lice`, `filter` и `map` создают новый.

<details>
<summary><small>(eng)</small></summary>

This keeps your mutation local and your rendering function pure. However, you still need to be careful: for example, if you tried to change any of the array's existing items, you'd have to clone those items too.

It is useful to remember which operations on arrays mutate them, and which don't. For example, `push`, `pop`, `reverse`, and `sort` will mutate the original array, but `slice`, `filter`, and `map` will create a new one.

</details>


</Solution>

</Challenges>
