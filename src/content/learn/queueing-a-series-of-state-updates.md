---
title: Очередь серии обновлений состояния
---

<Intro>

Установка переменной состояния ставит в очередь очередной рендер. Но иногда вы можете захотеть выполнить несколько операций над значением, прежде чем поставить его в очередь на следующий рендер. Для этого нужно понять, как React сортирует обновления состояния.


<details>
<summary><small>(eng)</small></summary>

Setting a state variable will queue another render. But sometimes you might want to perform multiple operations on the value before queueing the next render. To do this, it helps to understand how React batches state updates.

</details>

</Intro>

<YouWillLearn>

* Что такое "пакетная обработка" и как React использует ее для обработки нескольких обновлений состояния
* Как применить несколько обновлений к одной и той же переменной состояния подряд


<details>
<summary><small>(eng)</small></summary>

* What "batching" is and how React uses it to process multiple state updates
* How to apply several updates to the same state variable in a row

</details>

</YouWillLearn>

## React группирует обновления состояния {/*react-batches-state-updates*/}

Вы можете ожидать, что нажатие кнопки "+3" увеличит счетчик в три раза, потому что она вызывает `setNumber(number + 1)` три раза:


<details>
<summary><small>(eng)</small></summary>

<b>React batches state updates :</b>
You might expect that clicking the "+3" button will increment the counter three times because it calls `setNumber(number + 1)` three times:

</details>

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

Однако, как вы помните из предыдущего раздела, [значения состояния каждого рендера фиксированы](/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time), поэтому значение `number` в обработчике события первого рендера всегда `0`, сколько бы раз вы ни вызывали `setNumber(1)`:

```js
setNumber(0 + 1);
setNumber(0 + 1);
setNumber(0 + 1);
```

Но здесь есть еще один фактор. **React ждет, пока не будет выполнен *весь* код в обработчиках событий, прежде чем обрабатывать ваши обновления состояния.** Вот почему повторный рендеринг происходит только *после* всех этих вызовов `setNumber()`.

Это может напомнить вам официанта, принимающего заказ в ресторане. Официант не бежит на кухню при упоминании вашего первого блюда! Вместо этого он дает вам закончить заказ, позволяет вносить в него изменения и даже принимает заказы от других людей за столом.

<Illustration src="/ru.react.doc/images/docs/illustrations/i_react-batching.png" alt="Элегантный курсор в ресторане делает заказ несколько раз с помощью React, играя роль официанта. После того как она несколько раз вызывает setState(), официант записывает последний заказ в качестве окончательного." />

Это позволяет вам обновлять несколько переменных состояния - даже из нескольких компонентов - не вызывая слишком много [повторных рендеров] (/learn/render-and-commit#re-renders-when-state-updates). Но это также означает, что пользовательский интерфейс не будет обновлен до тех пор, пока _после_ вашего обработчика событий и любого кода в нем не завершится. Такое поведение, также известное как **батчинг**, делает работу вашего React-приложения намного быстрее. Кроме того, оно позволяет не сталкиваться с запутанными "полуфабрикатами", в которых обновлены только некоторые переменные.

**React не выполняет пакетную обработку *многочисленных* преднамеренных событий, таких как щелчки** - каждый щелчок обрабатывается отдельно. Будьте уверены, что React выполняет пакетную обработку только тогда, когда это в целом безопасно. Это гарантирует, что, например, если первое нажатие кнопки отключит форму, второе нажатие не отправит ее снова.


<details>
<summary><small>(eng)</small></summary>

However, as you might recall from the previous section, [each render's state values are fixed](/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time), so the value of `number` inside the first render's event handler is always `0`, no matter how many times you call `setNumber(1)`:

```js
setNumber(0 + 1);
setNumber(0 + 1);
setNumber(0 + 1);
```

But there is one other factor at play here. **React waits until *all* code in the event handlers has run before processing your state updates.** This is why the re-render only happens *after* all these `setNumber()` calls.

This might remind you of a waiter taking an order at the restaurant. A waiter doesn't run to the kitchen at the mention of your first dish! Instead, they let you finish your order, let you make changes to it, and even take orders from other people at the table.

<Illustration src="/ru.react.doc/images/docs/illustrations/i_react-batching.png"  alt="An elegant cursor at a restaurant places and order multiple times with React, playing the part of the waiter. After she calls setState() multiple times, the waiter writes down the last one she requested as her final order." />

This lets you update multiple state variables--even from multiple components--without triggering too many [re-renders.](/learn/render-and-commit#re-renders-when-state-updates) But this also means that the UI won't be updated until _after_ your event handler, and any code in it, completes. This behavior, also known as **batching,** makes your React app run much faster. It also avoids dealing with confusing "half-finished" renders where only some of the variables have been updated.

**React does not batch across *multiple* intentional events like clicks**--each click is handled separately. Rest assured that React only does batching when it's generally safe to do. This ensures that, for example, if the first button click disables a form, the second click would not submit it again.

</details>

## Обновление одного и того же состояния несколько раз перед следующим рендерингом {/*updating-the-same-state-multiple-times-before-the-next-render*/}

Это редкий случай использования, но если вы хотите обновить одну и ту же переменную состояния несколько раз до следующего рендера, вместо передачи *значения следующего состояния*, как `setNumber(number + 1)`, вы можете передать *функцию*, которая вычисляет следующее состояние на основе предыдущего в очереди, как `setNumber(n => n + 1)`. Это способ сказать React "сделать что-то со значением состояния" вместо того, чтобы просто заменить его.

Попробуйте увеличить счетчик сейчас:


<details>
<summary><small>(eng)</small></summary>

<b>Updating the same state multiple times before the next render :</b>
It is an uncommon use case, but if you would like to update the same state variable multiple times before the next render, instead of passing the *next state value* like `setNumber(number + 1)`, you can pass a *function* that calculates the next state based on the previous one in the queue, like `setNumber(n => n + 1)`. It is a way to tell React to "do something with the state value" instead of just replacing it.

Try incrementing the counter now:

</details>

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

Здесь `n => n + 1` называется **функцией обновления**, когда вы передаете ее в установщик состояния:

1. React ставит эту функцию в очередь на обработку после выполнения всего остального кода в обработчике событий.
2. Во время следующего рендеринга React просматривает очередь и выдает вам окончательное обновленное состояние.

```js
setNumber(n => n + 1);
setNumber(n => n + 1);
setNumber(n => n + 1);
```

Вот как React работает с этими строками кода при выполнении обработчика события:

1. `setNumber(n => n + 1)`: `n => n + 1` - это функция. React добавляет ее в очередь.
1. `setNumber(n => n + 1)`: `n => n + 1` - это функция. React добавляет ее в очередь.
1. `setNumber(n => n + 1)`: `n => n + 1` - это функция. React добавляет ее в очередь.

Когда вы вызываете `useState` во время следующего рендера, React просматривает очередь. Предыдущее состояние `number` было `0`, поэтому именно его React передает первой функции обновления в качестве аргумента `n`. Затем React берет возвращаемое значение предыдущей функции обновления и передает его следующей функции обновления как `n`, и так далее:

| Обновление в очереди | `n` | возвращает |
|--------------|---------|-----|
| `n => n + 1` | `0` | `0 + 1 = 1` |
| `n => n + 1` | `1` | `1 + 1 = 2` |
| `n => n + 1` | `2` | `2 + 1 = 3` |

React сохраняет `3` как конечный результат и возвращает его из `useState`.

Вот почему нажатие на "+3" в примере выше правильно увеличивает значение на 3.

<details>
<summary><small>(eng)</small></summary>

Here, `n => n + 1` is called an **updater function.** When you pass it to a state setter:

1. React queues this function to be processed after all the other code in the event handler has run.
2. During the next render, React goes through the queue and gives you the final updated state.

```js
setNumber(n => n + 1);
setNumber(n => n + 1);
setNumber(n => n + 1);
```

Here's how React works through these lines of code while executing the event handler:

1. `setNumber(n => n + 1)`: `n => n + 1` is a function. React adds it to a queue.
1. `setNumber(n => n + 1)`: `n => n + 1` is a function. React adds it to a queue.
1. `setNumber(n => n + 1)`: `n => n + 1` is a function. React adds it to a queue.

When you call `useState` during the next render, React goes through the queue. The previous `number` state was `0`, so that's what React passes to the first updater function as the `n` argument. Then React takes the return value of your previous updater function and passes it to the next updater as `n`, and so on:

|  queued update | `n` | returns |
|--------------|---------|-----|
| `n => n + 1` | `0` | `0 + 1 = 1` |
| `n => n + 1` | `1` | `1 + 1 = 2` |
| `n => n + 1` | `2` | `2 + 1 = 3` |

React stores `3` as the final result and returns it from `useState`.

This is why clicking "+3" in the above example correctly increments the value by 3.
</details>

### Что произойдет, если обновить состояние после его замены {/*what-happens-if-you-update-state-after-replacing-it*/}

А как насчет этого обработчика событий? Как вы думаете, каким будет `число` в следующем рендере?

```js
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
}}>
```


<details>
<summary><small>(eng)</small></summary>

<b>What happens if you update state after replacing it :</b>
What about this event handler? What do you think `number` will be in the next render?

```js
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
}}>
```

</details>

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
      }}>Increase the number</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

Вот что этот обработчик события говорит React сделать:

1. `setNumber(number + 5)`: `number` - это `0`, поэтому `setNumber(0 + 5)`. React добавляет *"заменить на `5`"* в свою очередь.
2. `setNumber(n => n + 1)`: `n => n + 1` - это функция обновления. React добавляет *эту функцию* в свою очередь.

Во время следующего рендеринга React просматривает очередь состояний:

| Обновление в очереди | `n` | возвращается |
|--------------|---------|-----|
| "replace with `5`" | `0` (не используется)| `5` |
| `n => n + 1` | `5` | `5 + 1 = 6` |

React сохраняет `6` как конечный результат и возвращает его из `useState`.


<details>
<summary><small>(eng)</small></summary>

Here's what this event handler tells React to do:

1. `setNumber(number + 5)`: `number` is `0`, so `setNumber(0 + 5)`. React adds *"replace with `5`"* to its queue.
2. `setNumber(n => n + 1)`: `n => n + 1` is an updater function. React adds *that function* to its queue.

During the next render, React goes through the state queue:

|   queued update       | `n` | returns |
|--------------|---------|-----|
| "replace with `5`" | `0` (unused) | `5` |
| `n => n + 1` | `5` | `5 + 1 = 6` |

React stores `6` as the final result and returns it from `useState`. 

</details>

<Note>

Вы могли заметить, что `setState(5)` на самом деле работает как `setState(n => 5)`, но `n` не используется!


<details>
<summary><small>(eng)</small></summary>

You may have noticed that `setState(5)` actually works like `setState(n => 5)`, but `n` is unused!

</details>

</Note>

### What happens if you replace state after updating it {/*what-happens-if-you-replace-state-after-updating-it*/}

Давайте попробуем еще один пример. Как вы думаете, каким будет `number` в следующем рендере?

```js
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
  setNumber(42);
}}>
```


<details>
<summary><small>(eng)</small></summary>

<b>What happens if you replace state after updating it :</b>
Let's try one more example. What do you think `number` will be in the next render?

```js
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
  setNumber(42);
}}>
```

</details>

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
        setNumber(42);
      }}>Increase the number</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

Вот как React работает с этими строками кода при выполнении обработчика этого события:

1. `setNumber(number + 5)`: `number` - это `0`, поэтому `setNumber(0 + 5)`. React добавляет *"заменить на `5`"* в свою очередь.
2. `setNumber(n => n + 1)`: `n => n + 1` - это функция обновления. React добавляет *эту функцию* в свою очередь.
3. `setNumber(42)`: React добавляет *"заменить на `42`"* в свою очередь.

Во время следующего рендеринга React просматривает очередь состояний:

| queued update | `n` | returns |
|--------------|---------|-----|
| "replace with `5`" | `0` (не используется)| `5` |
| `n => n + 1` | `5` | `5 + 1 = 6` |
| "заменить на `42`" | `6` (не используется) | `42` |

Затем React сохраняет `42` в качестве конечного результата и возвращает его из `useState`.

Подводя итог, можно сказать, что вот как вы можете думать о том, что вы передаете сеттеру состояния `setNumber`:

* **Функция обновления** (например, `n => n + 1`) добавляется в очередь.
* **Любое другое значение** (например, число `5`) добавляет в очередь "заменить на `5`", игнорируя то, что уже поставлено в очередь.

После завершения обработчика события React запустит повторный рендеринг. Во время рендеринга React будет обрабатывать очередь. Функции обновления выполняются во время рендеринга, поэтому **функции обновления должны быть [чистыми](/learn/keeping-components-pure)** и только *возвращать* результат. Не пытайтесь установить состояние внутри них или запустить другие побочные эффекты. В строгом режиме React будет запускать каждую функцию обновления дважды (но отбрасывать второй результат), чтобы помочь вам найти ошибки.


<details>
<summary><small>(eng)</small></summary>

Here's how React works through these lines of code while executing this event handler:

1. `setNumber(number + 5)`: `number` is `0`, so `setNumber(0 + 5)`. React adds *"replace with `5`"* to its queue.
2. `setNumber(n => n + 1)`: `n => n + 1` is an updater function. React adds *that function* to its queue.
3. `setNumber(42)`: React adds *"replace with `42`"* to its queue.

During the next render, React goes through the state queue:

|   queued update       | `n` | returns |
|--------------|---------|-----|
| "replace with `5`" | `0` (unused) | `5` |
| `n => n + 1` | `5` | `5 + 1 = 6` |
| "replace with `42`" | `6` (unused) | `42` |

Then React stores `42` as the final result and returns it from `useState`.

To summarize, here's how you can think of what you're passing to the `setNumber` state setter:

* **An updater function** (e.g. `n => n + 1`) gets added to the queue.
* **Any other value** (e.g. number `5`) adds "replace with `5`" to the queue, ignoring what's already queued.

After the event handler completes, React will trigger a re-render. During the re-render, React will process the queue. Updater functions run during rendering, so **updater functions must be [pure](/learn/keeping-components-pure)** and only *return* the result. Don't try to set state from inside of them or run other side effects. In Strict Mode, React will run each updater function twice (but discard the second result) to help you find mistakes.

</details>

### Соглашения об именовании {/*naming-conventions*/}

Обычно аргумент функции обновления называют по первым буквам соответствующей переменной состояния:

```js
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);
```

Если вы предпочитаете более подробный код, то можно повторить полное имя переменной состояния, например `setEnabled(enabled => !enabled)`, или использовать префикс, например `setEnabled(prevEnabled => !prevEnabled)`.


<details>
<summary><small>(eng)</small></summary>

<b>Naming conventions :</b>
It's common to name the updater function argument by the first letters of the corresponding state variable:

```js
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);
```

If you prefer more verbose code, another common convention is to repeat the full state variable name, like `setEnabled(enabled => !enabled)`, or to use a prefix like `setEnabled(prevEnabled => !prevEnabled)`.

</details>

<Recap>

* Установка состояния не изменяет переменную в существующем рендере, но запрашивает новый рендер.
* React обрабатывает обновления состояния после завершения работы обработчиков событий. Это называется пакетной обработкой.
* Чтобы обновить некоторое состояние несколько раз в одном событии, можно использовать функцию обновления `setNumber(n => n + 1)`.


<details>
<summary><small>(eng)</small></summary>

* Setting state does not change the variable in the existing render, but it requests a new render.
* React processes state updates after event handlers have finished running. This is called batching.
* To update some state multiple times in one event, you can use `setNumber(n => n + 1)` updater function.

</details>

</Recap>



<Challenges>

#### Fix a request counter {/*fix-a-request-counter*/}

Вы работаете над приложением для арт-маркета, которое позволяет пользователю одновременно отправлять несколько заказов на предметы искусства. Каждый раз, когда пользователь нажимает кнопку "Купить", счетчик "Отложенные" должен увеличиваться на единицу. Через три секунды счетчик "Отложенные" должен уменьшиться, а счетчик "Завершенные" - увеличиться.

Однако счетчик "Отложенные" ведет себя не так, как задумано. При нажатии кнопки "Купить" он уменьшается до `-1` (чего не должно быть!). А если дважды нажать кнопку "Быстро", оба счетчика ведут себя непредсказуемо.

Почему так происходит? Исправьте оба счетчика.


<details>
<summary><small>(eng)</small></summary>

<b>Fix a request counter :</b>
You're working on an art marketplace app that lets the user submit multiple orders for an art item at the same time. Each time the user presses the "Buy" button, the "Pending" counter should increase by one. After three seconds, the "Pending" counter should decrease, and the "Completed" counter should increase.

However, the "Pending" counter does not behave as intended. When you press "Buy", it decreases to `-1` (which should not be possible!). And if you click fast twice, both counters seem to behave unpredictably.

Why does this happen? Fix both counters.

</details>

<Sandpack>

```js
import { useState } from 'react';

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending(pending + 1);
    await delay(3000);
    setPending(pending - 1);
    setCompleted(completed + 1);
  }

  return (
    <>
      <h3>
        Pending: {pending}
      </h3>
      <h3>
        Completed: {completed}
      </h3>
      <button onClick={handleClick}>
        Buy     
      </button>
    </>
  );
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
```

</Sandpack>

<Solution>

Внутри обработчика события `handleClick` значения `pending` и `completed` соответствуют тому, какими они были во время события клика. Для первого рендера `pending` было `0`, поэтому `setPending(pending - 1)` становится `setPending(-1)`, что неправильно. Поскольку вы хотите *увеличить* или *уменьшить* счетчики, а не установить их в конкретное значение, определенное во время щелчка, вы можете вместо этого передать функции обновления:


<details>
<summary><small>(eng)</small></summary>

Inside the `handleClick` event handler, the values of `pending` and `completed` correspond to what they were at the time of the click event. For the first render, `pending` was `0`, so `setPending(pending - 1)` becomes `setPending(-1)`, which is wrong. Since you want to *increment* or *decrement* the counters, rather than set them to a concrete value determined during the click, you can instead pass the updater functions:

</details>

<Sandpack>

```js
import { useState } from 'react';

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending(p => p + 1);
    await delay(3000);
    setPending(p => p - 1);
    setCompleted(c => c + 1);
  }

  return (
    <>
      <h3>
        Pending: {pending}
      </h3>
      <h3>
        Completed: {completed}
      </h3>
      <button onClick={handleClick}>
        Buy     
      </button>
    </>
  );
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
```

</Sandpack>

Это гарантирует, что когда вы увеличиваете или уменьшаете счетчик, вы делаете это относительно его *последнего* состояния, а не того состояния, которое было в момент щелчка.


<details>
<summary><small>(eng)</small></summary>

This ensures that when you increment or decrement a counter, you do it in relation to its *latest* state rather than what the state was at the time of the click.

</details>

</Solution>

#### Implement the state queue yourself {/*implement-the-state-queue-yourself*/}

В этом задании вам предстоит реализовать крошечную часть React с нуля! Это не так сложно, как кажется.

Прокрутите предварительный просмотр песочницы. Обратите внимание, что в ней показаны **четыре тестовых случая**. Они соответствуют примерам, которые вы видели ранее на этой странице. Ваша задача - реализовать функцию `getFinalState` так, чтобы она возвращала правильный результат для каждого из этих случаев. Если вы реализуете ее правильно, все четыре теста должны пройти.

Вы получите два аргумента: `baseState` - начальное состояние (например, `0`), и `queue` - массив, содержащий смесь чисел (например, `5`) и функций обновления (например, `n => n + 1`) в порядке их добавления.

Ваша задача - вернуть конечное состояние, как показано в таблицах на этой странице!

<Hint>

Если вы чувствуете, что застряли, начните с этой структуры кода:

```js
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  for (let update of queue) {
    if (typeof update === 'function') {
      // TODO: apply the updater function
    } else {
      // TODO: replace the state
    }
  }

  return finalState;
}
```

Заполните недостающие строки!

</Hint>


<details>
<summary><small>(eng)</small></summary>

<b>Implement the state queue yourself :</b>
In this challenge, you will reimplement a tiny part of React from scratch! It's not as hard as it sounds.

Scroll through the sandbox preview. Notice that it shows **four test cases.** They correspond to the examples you've seen earlier on this page. Your task is to implement the `getFinalState` function so that it returns the correct result for each of those cases. If you implement it correctly, all four tests should pass.

You will receive two arguments: `baseState` is the initial state (like `0`), and the `queue` is an array which contains a mix of numbers (like `5`) and updater functions (like `n => n + 1`) in the order they were added.

Your task is to return the final state, just like the tables on this page show!

<Hint>

If you're feeling stuck, start with this code structure:

```js
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  for (let update of queue) {
    if (typeof update === 'function') {
      // TODO: apply the updater function
    } else {
      // TODO: replace the state
    }
  }

  return finalState;
}
```

Fill out the missing lines!

</Hint>

</details>

<Sandpack>

```js src/processQueue.js active
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  // TODO: do something with the queue...

  return finalState;
}
```

```js src/App.js
import { getFinalState } from './processQueue.js';

function increment(n) {
  return n + 1;
}
increment.toString = () => 'n => n+1';

export default function App() {
  return (
    <>
      <TestCase
        baseState={0}
        queue={[1, 1, 1]}
        expected={1}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          increment,
          increment,
          increment
        ]}
        expected={3}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
        ]}
        expected={6}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
          42,
        ]}
        expected={42}
      />
    </>
  );
}

function TestCase({
  baseState,
  queue,
  expected
}) {
  const actual = getFinalState(baseState, queue);
  return (
    <>
      <p>Base state: <b>{baseState}</b></p>
      <p>Queue: <b>[{queue.join(', ')}]</b></p>
      <p>Expected result: <b>{expected}</b></p>
      <p style={{
        color: actual === expected ?
          'green' :
          'red'
      }}>
        Your result: <b>{actual}</b>
        {' '}
        ({actual === expected ?
          'correct' :
          'wrong'
        })
      </p>
    </>
  );
}
```

</Sandpack>

<Solution>

Именно этот алгоритм, описанный на этой странице, React использует для вычисления конечного состояния:


<details>
<summary><small>(eng)</small></summary>

This is the exact algorithm described on this page that React uses to calculate the final state:

</details>

<Sandpack>

```js src/processQueue.js active
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  for (let update of queue) {
    if (typeof update === 'function') {
      // Apply the updater function.
      finalState = update(finalState);
    } else {
      // Replace the next state.
      finalState = update;
    }
  }

  return finalState;
}
```

```js src/App.js
import { getFinalState } from './processQueue.js';

function increment(n) {
  return n + 1;
}
increment.toString = () => 'n => n+1';

export default function App() {
  return (
    <>
      <TestCase
        baseState={0}
        queue={[1, 1, 1]}
        expected={1}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          increment,
          increment,
          increment
        ]}
        expected={3}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
        ]}
        expected={6}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
          42,
        ]}
        expected={42}
      />
    </>
  );
}

function TestCase({
  baseState,
  queue,
  expected
}) {
  const actual = getFinalState(baseState, queue);
  return (
    <>
      <p>Base state: <b>{baseState}</b></p>
      <p>Queue: <b>[{queue.join(', ')}]</b></p>
      <p>Expected result: <b>{expected}</b></p>
      <p style={{
        color: actual === expected ?
          'green' :
          'red'
      }}>
        Your result: <b>{actual}</b>
        {' '}
        ({actual === expected ?
          'correct' :
          'wrong'
        })
      </p>
    </>
  );
}
```

</Sandpack>

Теперь вы знаете, как работает эта часть React!


<details>
<summary><small>(eng)</small></summary>

Now you know how this part of React works!

</details>

</Solution>

</Challenges>
