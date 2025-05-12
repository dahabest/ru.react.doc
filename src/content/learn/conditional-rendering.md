---
title: Условный рендеринг
---

<Intro>

Ваши компоненты часто должны отображать разные вещи в зависимости от различных условий. В React вы можете условно рендерить JSX, используя синтаксис JavaScript, например, операторы `if`, `&&` и `? :`.

<details>
<summary><small>(eng)</small></summary>

Your components will often need to display different things depending on different conditions. In React, you can conditionally render JSX using JavaScript syntax like `if` statements, `&&`, and `? :` operators.

</details>

</Intro>

<YouWillLearn>

* Как возвращать разные JSX в зависимости от условия
* Как условно включить или исключить фрагмент JSX
* Общие сокращения условного синтаксиса, которые вы можете встретить в коде React

<details>
<summary><small>(eng)</small></summary>

* How to return different JSX depending on a condition
* How to conditionally include or exclude a piece of JSX
* Common conditional syntax shortcuts you’ll encounter in React codebases

</details>

</YouWillLearn>

## Условное возвращение JSX {/*conditionally-returning-jsx*/}

Допустим, у вас есть компонент `PackingList`, отображающий несколько `Item`, которые могут быть помечены как упакованные или нет:

<details>
<summary><small>(eng)</small></summary>

Let’s say you have a `PackingList` component rendering several `Item`s, which can be marked as packed or not:

</details>

<Sandpack>

```js
function Item({ name, isPacked }) {
  return <li className="item">{name}</li>;
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

Обратите внимание, что для некоторых компонентов `Item` параметр `isPacked` установлен в значение `true`, а не `false`. Вы хотите добавить галочку (✅) к упакованным элементам, если `isPacked={true}`.

Это можно записать в виде оператора [`if`/`else`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else), например, так:

```js
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;
```

Если параметр `isPacked` равен `true`, этот код **возвращает другое JSX-дерево.** С этим изменением некоторые элементы получают галочку в конце:

<details>
<summary><small>(eng)</small></summary>

Notice that some of the `Item` components have their `isPacked` prop set to `true` instead of `false`. You want to add a checkmark (✅) to packed items if `isPacked={true}`.

You can write this as an [`if`/`else` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) like so:

If the `isPacked` prop is `true`, this code **returns a different JSX tree.** With this change, some of the items get a checkmark at the end:

</details>

<Sandpack>

```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✅</li>;
  }
  return <li className="item">{name}</li>;
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

Попробуйте изменить то, что возвращается в обоих случаях, и посмотрите, как изменится результат!

Обратите внимание, как вы создаете разветвленную логику с помощью операторов JavaScript `if` и `return`. В React поток управления (как и условия) обрабатывается JavaScript.

<details>
<summary><small>(eng)</small></summary>

Try editing what gets returned in either case, and see how the result changes!

Notice how you're creating branching logic with JavaScript's `if` and `return` statements. In React, control flow (like conditions) is handled by JavaScript.

</details>

### Условное возвращение ничего с помощью `null` {/*conditionally-returning-nothing-with-null*/}

В некоторых ситуациях вам вообще не захочется ничего рендерить. Например, предположим, что вы вообще не хотите показывать упакованные элементы. Компонент должен что-то возвращать. В этом случае вы можете вернуть значение `null`:

<details>
<summary><small>(eng)</small></summary>

In some situations, you won't want to render anything at all. For example, say you don't want to show packed items at all. A component must return something. In this case, you can return `null`:

</details>

```js
if (isPacked) {
  return null;
}
return <li className="item">{name}</li>;
```

Если значение `isPacked` равно true, компонент ничего не вернет, `null`. В противном случае он вернет JSX для рендеринга.

<details>
<summary><small>(eng)</small></summary>

If `isPacked` is true, the component will return nothing, `null`. Otherwise, it will return JSX to render.

</details>

<Sandpack>

```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
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

На практике возврат `null` из компонента встречается нечасто, поскольку это может удивить разработчика, пытающегося его отобразить. Чаще всего нужно условно включать или исключать компонент в JSX родительского компонента. Вот как это сделать!

<details>
<summary><small>(eng)</small></summary>

In practice, returning `null` from a component isn't common because it might surprise a developer trying to render it. More often, you would conditionally include or exclude the component in the parent component's JSX. Here's how to do that!

</details>


## Условное включение JSX {/*conditionally-including-jsx*/}

В предыдущем примере вы контролировали, какое дерево JSX будет возвращено компонентом (если вообще будет!). Возможно, вы уже заметили дублирование в результате рендера:

```js
<li className="item">{name} ✅</li>
```
практически то же самое, что и:

```js
<li className="item">{name}</li>
```

Обе условные ветви возвращают `<li className=«item»>...</li>`:

```js
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;
```

Хотя такое дублирование не вредно, оно может усложнить сопровождение вашего кода. Что, если вы захотите изменить `className`? Вам придется делать это в двух местах вашего кода! В такой ситуации вы можете условно включить небольшой JSX, чтобы сделать ваш код более [DRY.](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

<details>
<summary><small>(eng)</small></summary>

In the previous example, you controlled which (if any!) JSX tree would be returned by the component. You may already have noticed some duplication in the render output:

is very similar to

Both of the conditional branches return `<li className="item">...</li>`:

While this duplication isn't harmful, it could make your code harder to maintain. What if you want to change the `className`? You'd have to do it in two places in your code! In such a situation, you could conditionally include a little JSX to make your code more [DRY.](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

</details>


### Условный (тернарный) оператор (`? :`) {/*conditional-ternary-operator--*/}

В JavaScript есть компактный синтаксис для записи условного выражения - [условный оператор](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) или «тернарный оператор».

Вместо этого:

```js
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;
```
Вы можете писать так:

```js
return (
  <li className="item">
    {isPacked ? name + ' ✅' : name}
  </li>
);
```

Вы можете прочитать это как *«если `isPacked` истинно, то (`?`) вывести `name + „ ✅“`, иначе (`:`) вывести `name`»*.

<details>
<summary><small>(eng)</small></summary>

JavaScript has a compact syntax for writing a conditional expression -- the [conditional operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) or "ternary operator".

Instead of this:
You can write this:

You can read it as *"if `isPacked` is true, then (`?`) render `name + ' ✅'`, otherwise (`:`) render `name`"*.

</details>

<DeepDive>

#### Являются ли эти два примера полностью эквивалентными? {/*are-these-two-examples-fully-equivalent*/}

Если вы знакомы с объектно-ориентированным программированием, вы можете предположить, что два приведенных выше примера мало чем отличаются друг от друга, поскольку в одном из них могут быть созданы два разных «экземпляра» `<li>`. Но элементы JSX не являются «экземплярами», потому что они не хранят никакого внутреннего состояния и не являются реальными узлами DOM. Это легкие описания, как чертежи. Так что эти два примера, на самом деле, *совершенно эквивалентны*. В [Preserving and Resetting State](/learn/preserving-and-resetting-state) подробно рассказывается о том, как это работает.

<details>
<summary><small>(eng)</small></summary>

If you're coming from an object-oriented programming background, you might assume that the two examples above are subtly different because one of them may create two different "instances" of `<li>`. But JSX elements aren't "instances" because they don't hold any internal state and aren't real DOM nodes. They're lightweight descriptions, like blueprints. So these two examples, in fact, *are* completely equivalent. [Preserving and Resetting State](/learn/preserving-and-resetting-state) goes into detail about how this works.

</details>


</DeepDive>

Теперь предположим, что вы хотите обернуть текст завершенного элемента в другой HTML-тег, например `<del>`, чтобы вычеркнуть его. Вы можете добавить еще больше новых строк и круглых скобок, чтобы было проще вложить больше JSX в каждом из случаев:

<details>
<summary><small>(eng)</small></summary>

Now let's say you want to wrap the completed item's text into another HTML tag, like `<del>` to strike it out. You can add even more newlines and parentheses so that it's easier to nest more JSX in each of the cases:

</details>

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✅'}
        </del>
      ) : (
        name
      )}
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

Этот стиль хорошо работает для простых условий, но используйте его в меру. Если в ваших компонентах слишком много вложенной условной разметки, подумайте об извлечении дочерних компонентов, чтобы навести порядок. В React разметка является частью вашего кода, поэтому вы можете использовать такие инструменты, как переменные и функции, чтобы привести в порядок сложные выражения.

<details>
<summary><small>(eng)</small></summary>

This style works well for simple conditions, but use it in moderation. If your components get messy with too much nested conditional markup, consider extracting child components to clean things up. In React, markup is a part of your code, so you can use tools like variables and functions to tidy up complex expressions.

</details>

### Логический оператор AND (`&&`) {/*logical-and-operator-*/}

Еще одно часто встречающееся сокращение - это [JavaScript логический оператор AND (`&&`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#:~:text=The%20logical%20AND%20(%20%26%26%20)%20operator,it%20returns%20a%20Boolean%20value.). В компонентах React он часто встречается, когда нужно отобразить JSX, когда условие истинно, **или ничего не отображать в противном случае.** С помощью `&&` можно условно отобразить галочку, только если `isPacked` будет `истинным`:

<details>
<summary><small>(eng)</small></summary>

Another common shortcut you'll encounter is the [JavaScript logical AND (`&&`) operator.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#:~:text=The%20logical%20AND%20(%20%26%26%20)%20operator,it%20returns%20a%20Boolean%20value.) Inside React components, it often comes up when you want to render some JSX when the condition is true, **or render nothing otherwise.** With `&&`, you could conditionally render the checkmark only if `isPacked` is `true`:

You can read this as *"if `isPacked`, then (`&&`) render the checkmark, otherwise, render nothing"*.

Here it is in action:

</details>

```js
return (
  <li className="item">
    {name} {isPacked && '✅'}
  </li>
);

```
Вы можете прочитать это как *"если `isPacked`, то (`&&`) отрисовать галочку, иначе ничего не отрисовывать »*.

Вот это в действии:


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

[JavaScript && Выражение ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) возвращает значение правой части (в нашем случае - галочку), если левая часть (наше условие) равна `true`. Но если условие `false`, то все выражение становится `false`. React рассматривает `false` как «дыру» в дереве JSX, так же как `null` или `undefined`, и не выводит ничего на его место.

<details>
<summary><small>(eng)</small></summary>

A [JavaScript && expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) returns the value of its right side (in our case, the checkmark) if the left side (our condition) is `true`. But if the condition is `false`, the whole expression becomes `false`. React considers `false` as a "hole" in the JSX tree, just like `null` or `undefined`, and doesn't render anything in its place.

</details>

<Pitfall>

Не ставьте цифры в левой части `&&`.

Чтобы проверить условие, JavaScript автоматически преобразует левую часть в булеву величину. Однако если левая часть равна `0`, то все выражение получает это значение (`0`), и React с радостью отобразит `0`, а не ничего.

Например, распространенной ошибкой является написание кода типа `messageCount && <p>Новые сообщения</p>`. Легко предположить, что он ничего не отображает, когда `messageCount` равно `0`, но на самом деле он отображает сам `0`!

Чтобы исправить это, сделайте левую часть булевой: `messageCount > 0 && <p>Новые сообщения</p>`.

<details>
<summary><small>(eng)</small></summary>

**Don't put numbers on the left side of `&&`.**

To test the condition, JavaScript converts the left side to a boolean automatically. However, if the left side is `0`, then the whole expression gets that value (`0`), and React will happily render `0` rather than nothing.

For example, a common mistake is to write code like `messageCount && <p>New messages</p>`. It's easy to assume that it renders nothing when `messageCount` is `0`, but it really renders the `0` itself!

To fix it, make the left side a boolean: `messageCount > 0 && <p>New messages</p>`.

</details>


</Pitfall>

### Условное присвоение JSX переменной {/*conditionally-assigning-jsx-to-a-variable*/}

Когда сокращения мешают писать простой понятный код, попробуйте использовать оператор `if` и переменную. Вы можете переназначать переменные, определенные с помощью [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), поэтому начните с указания содержимого по умолчанию, которое вы хотите отобразить, - названия:

```js
let itemContent = name;
```

Используйте оператор `if`, чтобы переназначить выражение JSX для `itemContent`, если `isPacked` является `true`:

```js
if (isPacked) {
  itemContent = name + " ✅";
}
```

[Фигурные скобки открывают «окно в JavaScript»](/learn/javascript-in-jsx-with-curly-braces#using-curly-braces-a-window-into-the-javascript-world) Вставьте переменную с фигурными скобками в возвращаемое дерево JSX, вложив ранее вычисленное выражение внутрь JSX:

```js
<li className="item">
  {itemContent}
</li>
```

Этот стиль самый многословный, но и самый гибкий. Вот он в действии:

<details>
<summary><small>(eng)</small></summary>

When the shortcuts get in the way of writing plain code, try using an `if` statement and a variable. You can reassign variables defined with [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), so start by providing the default content you want to display, the name:

Use an `if` statement to reassign a JSX expression to `itemContent` if `isPacked` is `true`:

[Curly braces open the "window into JavaScript".](/learn/javascript-in-jsx-with-curly-braces#using-curly-braces-a-window-into-the-javascript-world) Embed the variable with curly braces in the returned JSX tree, nesting the previously calculated expression inside of JSX:

This style is the most verbose, but it's also the most flexible. Here it is in action:

Like before, this works not only for text, but for arbitrary JSX too:

</details>

<Sandpack>

```js
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✅";
  }
  return (
    <li className="item">
      {itemContent}
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

Как и раньше, это работает не только для текста, но и для произвольного JSX:

<Sandpack>

```js
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = (
      <del>
        {name + " ✅"}
      </del>
    );
  }
  return (
    <li className="item">
      {itemContent}
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

Если вы не знакомы с JavaScript, такое разнообразие стилей поначалу может показаться огромным. Однако их изучение поможет вам читать и писать любой код на JavaScript - и не только компоненты React! Для начала выберите тот, который вам больше нравится, а затем обратитесь к этому справочнику, если забудете, как работают другие.

<details>
<summary><small>(eng)</small></summary>

If you're not familiar with JavaScript, this variety of styles might seem overwhelming at first. However, learning them will help you read and write any JavaScript code -- and not just React components! Pick the one you prefer for a start, and then consult this reference again if you forget how the other ones work.

</details>

<Recap>

* В React вы управляете логикой ветвления с помощью JavaScript.
* Вы можете условно вернуть выражение JSX с помощью оператора `if`.
* Вы можете условно сохранить некоторые JSX в переменной и затем включить их в другие JSX с помощью фигурных скобок.
* В JSX выражение `{cond ? <A /> : <B />}` означает *«если `cond`, вывести `<A />`, иначе `<B />`»*.
* В JSX `{cond && <A />}` означает *"если `cond`, вывести `<A />`, иначе ничего »*.
* Эти сокращения являются общепринятыми, но вы не обязаны их использовать, если предпочитаете простое `if`.

<details>
<summary><small>(eng)</small></summary>

* In React, you control branching logic with JavaScript.
* You can return a JSX expression conditionally with an `if` statement.
* You can conditionally save some JSX to a variable and then include it inside other JSX by using the curly braces.
* In JSX, `{cond ? <A /> : <B />}` means *"if `cond`, render `<A />`, otherwise `<B />`"*.
* In JSX, `{cond && <A />}` means *"if `cond`, render `<A />`, otherwise nothing"*.
* The shortcuts are common, but you don't have to use them if you prefer plain `if`.

</details>

</Recap>

<Challenges>

#### Выведите иконку для незавершенных элементов с помощью `? :` {/*show-an-icon-for-incomplete-items-with--*/}

Используйте условный оператор (`cond ? a : b`) для отображения ❌, если `isPacked` не является `true`.

<details>
<summary><small>(eng)</small></summary>

Use the conditional operator (`cond ? a : b`) to render a ❌ if `isPacked` isn’t `true`.

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

<Solution>

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked ? '✅' : '❌'}
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

</Solution>

#### Выведите важность пункта с помощью `&&` {/*show-the-item-importance-with-*/}

В этом примере каждый `Item` получает числовой параметр `importance`. Используйте оператор `&&`, чтобы вывести «_(Важность: X)_» курсивом, но только для элементов, имеющих ненулевую важность. В итоге ваш список предметов должен выглядеть следующим образом:

* Космический скафандр _(Важность: 9)_
* Шлем с золотым листом
* Фотография Тама _(Важность: 6)_

Не забудьте добавить пробел между двумя метками!

<details>
<summary><small>(eng)</small></summary>

In this example, each `Item` receives a numerical `importance` prop. Use the `&&` operator to render "_(Importance: X)_" in italics, but only for items that have non-zero importance. Your item list should end up looking like this:

* Space suit _(Importance: 9)_
* Helmet with a golden leaf
* Photo of Tam _(Importance: 6)_

Don't forget to add a space between the two labels!

This should do the trick:

</details>

<Sandpack>

```js
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          importance={9} 
          name="Space suit" 
        />
        <Item 
          importance={0} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          importance={6} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<Solution>

Это должно сработать:

<Sandpack>

```js
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
      {importance > 0 && ' '}
      {importance > 0 &&
        <i>(Importance: {importance})</i>
      }
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          importance={9} 
          name="Space suit" 
        />
        <Item 
          importance={0} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          importance={6} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

Обратите внимание, что нужно писать `importance > 0 && ...`, а не `importance && ...`, чтобы, если `importance` равно `0`, `0` не отображалось в качестве результата!

В этом решении используются два отдельных условия, чтобы вставить пробел между именем и меткой важности. В качестве альтернативы можно использовать фрагмент с ведущим пробелом: `importance > 0 && <> <i>...</i></>` или добавить пробел непосредственно внутри `<i>`: `importance > 0 && <i> ...</i>`.

<details>
<summary><small>(eng)</small></summary>

Note that you must write `importance > 0 && ...` rather than `importance && ...` so that if the `importance` is `0`, `0` isn't rendered as the result!

In this solution, two separate conditions are used to insert a space between the name and the importance label. Alternatively, you could use a Fragment with a leading space: `importance > 0 && <> <i>...</i></>` or add a space immediately inside the `<i>`:  `importance > 0 && <i> ...</i>`.

</details>


</Solution>

#### Рефакторинг серии `? :` на `if` и переменные {/*refactor-a-series-of---to-if-and-variables*/}

Этот компонент `Drink` использует серию условий `? :` для отображения различной информации в зависимости от того, является ли параметр `name` `«чаем»` или `«кофе»`. Проблема в том, что информация о каждом напитке распределена по нескольким условиям. Переработайте этот код, чтобы использовать один оператор `if` вместо трех `? :` условий.

<details>
<summary><small>(eng)</small></summary>

This `Drink` component uses a series of `? :` conditions to show different information depending on whether the `name` prop is `"tea"` or `"coffee"`. The problem is that the information about each drink is spread across multiple conditions. Refactor this code to use a single `if` statement instead of three `? :` conditions.

Once you've refactored the code to use `if`, do you have further ideas on how to simplify it?

</details>


<Sandpack>

```js
function Drink({ name }) {
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{name === 'tea' ? 'leaf' : 'bean'}</dd>
        <dt>Caffeine content</dt>
        <dd>{name === 'tea' ? '15–70 mg/cup' : '80–185 mg/cup'}</dd>
        <dt>Age</dt>
        <dd>{name === 'tea' ? '4,000+ years' : '1,000+ years'}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```

</Sandpack>

После рефакторинга кода на использование `if` у вас есть дальнейшие идеи, как его упростить?

<Solution>

Вы можете использовать несколько способов, но вот один из них - отправная точка:

<details>
<summary><small>(eng)</small></summary>

There are multiple ways you could go about this, but here is one starting point:

</details>


<Sandpack>

```js
function Drink({ name }) {
  let part, caffeine, age;
  if (name === 'tea') {
    part = 'leaf';
    caffeine = '15–70 mg/cup';
    age = '4,000+ years';
  } else if (name === 'coffee') {
    part = 'bean';
    caffeine = '80–185 mg/cup';
    age = '1,000+ years';
  }
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{part}</dd>
        <dt>Caffeine content</dt>
        <dd>{caffeine}</dd>
        <dt>Age</dt>
        <dd>{age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```

</Sandpack>

Здесь информация о каждом напитке сгруппирована вместе, а не распределена по нескольким условиям. Это облегчает добавление новых напитков в будущем.
Другим решением может быть полное удаление условий путем перемещения информации в объекты:


<details>
<summary><small>(eng)</small></summary>

Here the information about each drink is grouped together instead of being spread across multiple conditions. This makes it easier to add more drinks in the future.

Another solution would be to remove the condition altogether by moving the information into objects:

</details>

<Sandpack>

```js
const drinks = {
  tea: {
    part: 'leaf',
    caffeine: '15–70 mg/cup',
    age: '4,000+ years'
  },
  coffee: {
    part: 'bean',
    caffeine: '80–185 mg/cup',
    age: '1,000+ years'
  }
};

function Drink({ name }) {
  const info = drinks[name];
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{info.part}</dd>
        <dt>Caffeine content</dt>
        <dd>{info.caffeine}</dd>
        <dt>Age</dt>
        <dd>{info.age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```

</Sandpack>

</Solution>

</Challenges>
