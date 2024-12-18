---
title: Импорт и экспорт компонентов
---

<Intro>

Магия компонентов заключается в возможности их повторного использования: вы можете создавать компоненты, которые состоят из других компонентов. Но по мере того, как вы вкладываете все больше и больше компонентов, часто имеет смысл начать разбивать их на отдельные файлы. Что облегчит поиск файлов и переиспользование компонентов во многих местах.

<details>
<summary><small>(eng)</small></summary>

The magic of components lies in their reusability: you can create components that are composed of other components. But as you nest more and more components, it often makes sense to start splitting them into different files. This lets you keep your files easy to scan and reuse components in more places.

</details>

</Intro>

<YouWillLearn>

* Что такое файл с корневым компонентом
* Как импортировать и экспортировать компонент
* Когда использовать импорт и экспорт по умолчанию, а когда именованный 
* Как импортировать и экспортировать несколько компонентов из одного файла
* Как разделить компоненты на несколько файлов

<details>
<summary><small>(eng)</small></summary>

* What a root component file is
* How to import and export a component
* When to use default and named imports and exports
* How to import and export multiple components from one file
* How to split components into multiple files

</details>


</YouWillLearn>

## Корневой файл компонента {/*the-root-component-file*/}

В [вашем первом компоненте](/learn/your-first-component), вы создали компонент `Profile` и компонент `Gallery`, который рендерит его:

<details>
<summary><small>(eng)</small></summary>

In [Your First Component](/learn/your-first-component), you made a `Profile` component and a `Gallery` component that renders it:

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

Сейчас они размещены в **корневом файле компонента,** названном в этом примере `App.js`. Однако в зависимости от вашей конфигурации корневой компонент может находиться в другом файле. Если вы используете фреймворк с файловой маршрутизацией, например Next.js, ваш корневой компонент будет отличаться для каждой страницы.

<details>
<summary><small>(eng)</small></summary>

These currently live in a **root component file,** named `App.js` in this example. Depending on your setup, your root component could be in another file, though. If you use a framework with file-based routing, such as Next.js, your root component will be different for every page.

</details>


## Экспорт и импорт компонента {/*exporting-and-importing-a-component*/}

Что, если в будущем вы захотите изменить целевой экран и поместить туда список научных книг? Или разместить все профили в другом месте? Имеет смысл вынести `Gallery` и `Profile` из корневого файла компонента. Это сделает их более модульными и пригодными для повторного использования в других файлах. Переместить компонент можно в три этапа:

<details>
<summary><small>(eng)</small></summary>

What if you want to change the landing screen in the future and put a list of science books there? Or place all the profiles somewhere else? It makes sense to move `Gallery` and `Profile` out of the root component file. This will make them more modular and reusable in other files. You can move a component in three steps:

</details>


1. **Создайте** новый JS-файл, в который поместите компоненты.
2. **Экспортируйте** свою функцию компонента из этого файла (используя либо [экспорт по умолчанию](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_the_default_export) или [именованный](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_named_exports) экспорты).
3. **Импортируйте** его в файл, в котором вы будете использовать компонент (используя соответствующую технику для импорта [default-экспорт](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#importing_defaults) или [именованный](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#import_a_single_export_from_a_module) экспорты).

Здесь `Profile` и `Gallery` были перенесены из файла `App.js` в новый файл `Gallery.js`. Теперь вы можете изменить `App.js`, чтобы импортировать `Gallery` из `Gallery.js`:

<details>
<summary><small>(eng)</small></summary>

1. **Make** a new JS file to put the components in.
2. **Export** your function component from that file (using either [default](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_the_default_export) or [named](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_named_exports) exports).
3. **Import** it in the file where you’ll use the component (using the corresponding technique for importing [default](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#importing_defaults) or [named](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#import_a_single_export_from_a_module) exports).

Here both `Profile` and `Gallery` have been moved out of `App.js` into a new file called `Gallery.js`. Now you can change `App.js` to import `Gallery` from `Gallery.js`:

</details>


<Sandpack>

```js src/App.js
import Gallery from './Gallery.js';

export default function App() {
  return (
    <Gallery />
  );
}
```

```js src/Gallery.js
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
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

Обратите внимание, что теперь этот пример разбит на два файла-компонента:

<details>
<summary><small>(eng)</small></summary>

Notice how this example is broken down into two component files now:

1. `Gallery.js`:
     - Defines the `Profile` component which is only used within the same file and is not exported.
     - Exports the `Gallery` component as a **default export.**
2. `App.js`:
     - Imports `Gallery` as a **default import** from `Gallery.js`.
     - Exports the root `App` component as a **default export.**

</details>

1. `Gallery.js`:
     - Определяет компонент `Profile`, который используется только внутри одного файла и не экспортируется.
     - Экспортирует компонент `Gallery` как **экспорт по умолчанию.**.
2. `App.js`:
     - Импортирует `Gallery` как **импорт по умолчанию** из `Gallery.js`.
     - Экспортирует корневой компонент `App` как **экспорт по умолчанию.**.


<Note>

Вы можете встретить файлы, в которых расширение `.js` отсутствует, например:

<details>
<summary><small>(eng)</small></summary>

You may encounter files that leave off the `.js` file extension like so:

</details>


```js 
import Gallery from './Gallery';
```

Либо `'./Gallery.js'`, либо `'./Gallery'` будут работать с React, хотя первый вариант ближе к тому, как работают [native ES Modules](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules).

<details>
<summary><small>(eng)</small></summary>

Either `'./Gallery.js'` or `'./Gallery'` will work with React, though the former is closer to how [native ES Modules](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules) work.

</details>

</Note>

<DeepDive>

#### Экспорт по умолчанию или именованный экспорт {/*default-vs-named-exports*/}

Существует два основных способа экспорта значений в JavaScript: экспорт по умолчанию и именованный экспорт. До сих пор в наших примерах использовался только экспорт по умолчанию. Но в одном файле можно использовать как один из них, так и оба. **В файле может быть не более одного экспорта _по умолчанию_, но может быть сколько угодно _именованных_ экспортов.**

<details>
<summary><small>(eng)</small></summary>

There are two primary ways to export values with JavaScript: default exports and named exports. So far, our examples have only used default exports. But you can use one or both of them in the same file. **A file can have no more than one _default_ export, but it can have as many _named_ exports as you like.**

</details>


![Default and named exports](/images/docs/illustrations/i_import-export.svg)

То, как вы экспортируете компонент, определяет, как вы должны его импортировать. При попытке импортировать стандартный экспорт тем же способом, что и именованный экспорт, вы получите ошибку! Эта диаграмма поможет вам следить за этим:

| Синтаксис           | Инструкция export                           | Инструкция import                         |
| -----------      | -----------                                | -----------                               |
| По умолчанию  | `export default function Button() {}` | `import Button from './Button.js';`     |
| Именованный    | `export function Button() {}`         | `import { Button } from './Button.js';` |

Когда вы пишете _дефолтный_ импорт, вы можете указать любое имя после `import`. Например, вы можете написать `import Banana from './Button.js'`, и это все равно предоставит вам тот же экспорт по умолчанию. В отличие от этого, при именованном импорте имя должно совпадать с обеих сторон. Вот почему они называются _именованными_ импортами!

**Многие часто используют экспорт по умолчанию, если файл экспортирует только один компонент, и используют именованный экспорт, если он экспортирует несколько компонентов и значений.** Независимо от того, какой стиль кодирования вы предпочитаете, всегда давайте осмысленные имена функциям компонентов и файлам, которые их содержат. Компоненты без имен, например `export default () => {}`, не рекомендуется использовать, поскольку они затрудняют отладку.

<details>
<summary><small>(eng)</small></summary>

How you export your component dictates how you must import it. You will get an error if you try to import a default export the same way you would a named export! This chart can help you keep track:

| Syntax           | Export statement                           | Import statement                          |
| -----------      | -----------                                | -----------                               |
| Default  | `export default function Button() {}` | `import Button from './Button.js';`     |
| Named    | `export function Button() {}`         | `import { Button } from './Button.js';` |

When you write a _default_ import, you can put any name you want after `import`. For example, you could write `import Banana from './Button.js'` instead and it would still provide you with the same default export. In contrast, with named imports, the name has to match on both sides. That's why they are called _named_ imports!

**People often use default exports if the file exports only one component, and use named exports if it exports multiple components and values.** Regardless of which coding style you prefer, always give meaningful names to your component functions and the files that contain them. Components without names, like `export default () => {}`, are discouraged because they make debugging harder.

</details>


</DeepDive>

## Экспорт и импорт нескольких компонентов из одного файла {/*exporting-and-importing-multiple-components-from-the-same-file*/}

Что если вы хотите показать только один `Profile` вместо галереи? Вы можете экспортировать и компонент `Profile`. Но у `Gallery.js` уже есть экспорт *по умолчанию*, а вы не можете иметь _два_ экспорта по умолчанию. Вы можете создать новый файл с экспортом по умолчанию или добавить *именованный* экспорт для `Profile`. **Файл может иметь только один экспорт по умолчанию, но у него может быть множество именованных экспортов!**

<details>
<summary><small>(eng)</small></summary>

What if you want to show just one `Profile` instead of a gallery? You can export the `Profile` component, too. But `Gallery.js` already has a *default* export, and you can't have _two_ default exports. You could create a new file with a default export, or you could add a *named* export for `Profile`. **A file can only have one default export, but it can have numerous named exports!**

</details>

<Note>

Чтобы уменьшить возможную путаницу между `default` и именованным экспортом, некоторые команды предпочитают придерживаться только одного стиля (`default` или именованного) или не смешивать их в одном файле. Делайте то, что подходит именно вам!

<details>
<summary><small>(eng)</small></summary>

To reduce the potential confusion between default and named exports, some teams choose to only stick to one style (default or named), or avoid mixing them in a single file. Do what works best for you!

</details>

</Note>

Сначала **экспортируйте** `Profile` из `Gallery.js`, используя именованный экспорт (без ключевого слова `default`):

<details>
<summary><small>(eng)</small></summary>

First, **export** `Profile` from `Gallery.js` using a named export (no `default` keyword):

</details>


```js
export function Profile() {
  // ...
}
```

Затем **импортируйте** `Profile` из `Gallery.js` в `App.js`, используя именованный импорт (с фигурными скобками):

<details>
<summary><small>(eng)</small></summary>

Then, **import** `Profile` from `Gallery.js` to `App.js` using a named import (with the curly braces):

</details>

```js
import { Profile } from './Gallery.js';
```
Наконец, **выведите** `<Profile />` из компонента `App`:

<details>
<summary><small>(eng)</small></summary>

Finally, **render** `<Profile />` from the `App` component:

</details>

```js
export default function App() {
  return <Profile />;
}
```

Теперь `Gallery.js` содержит два экспорта: `default`-ый экспорт `Gallery` и именованный экспорт `Profile`. `App.js` импортирует их оба. Попробуйте изменить `<Profile />` на `<Gallery />` и обратно в этом примере:

<details>
<summary><small>(eng)</small></summary>

Now `Gallery.js` contains two exports: a default `Gallery` export, and a named `Profile` export. `App.js` imports both of them. Try editing `<Profile />` to `<Gallery />` and back in this example:

</details>

<Sandpack>

```js src/App.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <Profile />
  );
}
```

```js src/Gallery.js
export function Profile() {
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
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

Теперь вы используете сочетание стандартных и именованных экспортов:

<details>
<summary><small>(eng)</small></summary>

Now you're using a mix of default and named exports:

* `Gallery.js`:
  - Exports the `Profile` component as a **named export called `Profile`.**
  - Exports the `Gallery` component as a **default export.**
* `App.js`:
  - Imports `Profile` as a **named import called `Profile`** from `Gallery.js`.
  - Imports `Gallery` as a **default import** from `Gallery.js`.
  - Exports the root `App` component as a **default export.**

</details>

* `Gallery.js`:
  - Экспортирует компонент `Profile` как **именованный экспорт под названием `Profile`.**.
  - Экспортирует компонент `Gallery` как **экспорт по умолчанию.**.
* `App.js`:
  - Импортирует `Profile` как **именованный импорт под названием `Profile`** из `Gallery.js`.
  - Импортирует `Gallery` как **импорт по умолчанию** из `Gallery.js`.
  - Экспортирует корневой компонент `App` как **экспорт по умолчанию.**.


<Recap>

На этой странице вы узнали:

* Что такое файл корневого компонента
* Как импортировать и экспортировать компонент
* Когда и как использовать импорт и экспорт по умолчанию и по имени
* Как экспортировать несколько компонентов из одного файла

<details>
<summary><small>(eng)</small></summary>

On this page you learned:

* What a root component file is
* How to import and export a component
* When and how to use default and named imports and exports
* How to export multiple components from the same file

</details>


</Recap>


<Challenges>

#### Разделите компоненты еще больше {/*split-the-components-further*/}

В настоящее время `Gallery.js` экспортирует и `Profile`, и `Gallery`, что немного запутывает.

Переместите компонент `Profile` в собственный `Profile.js`, а затем измените компонент `App`, чтобы он последовательно отображал и `<Profile />`, и `<Gallery />`.

Вы можете использовать либо экспорт по умолчанию, либо именованный экспорт для `Profile`, но убедитесь, что вы используете соответствующий синтаксис импорта как в `App.js`, так и в `Gallery.js`! Вы можете обратиться к таблице из дополнительной информации приведенной выше:

<details>
<summary><small>(eng)</small></summary>

Currently, `Gallery.js` exports both `Profile` and `Gallery`, which is a bit confusing.

Move the `Profile` component to its own `Profile.js`, and then change the `App` component to render both `<Profile />` and `<Gallery />` one after another.

You may use either a default or a named export for `Profile`, but make sure that you use the corresponding import syntax in both `App.js` and `Gallery.js`! You can refer to the table from the deep dive above:

| Syntax           | Export statement                           | Import statement                          |
| -----------      | -----------                                | -----------                               |
| Default  | `export default function Button() {}` | `import Button from './Button.js';`     |
| Named    | `export function Button() {}`         | `import { Button } from './Button.js';` 
|
</details>

| Syntax           | Export statement                           | Import statement                          |
| -----------      | -----------                                | -----------                               |
| По умолчанию  | `export default function Button() {}` | `import Button from './Button.js';`     |
| Именованный    | `export function Button() {}`         | `import { Button } from './Button.js';` 
|


<Hint>

Не забывайте импортировать свои компоненты туда, где они вызываются. Разве `Gallery` не использует `Profile`?

<details>
<summary><small>(eng)</small></summary>

Don't forget to import your components where they are called. Doesn't `Gallery` use `Profile`, too?

</details>

</Hint>

<Sandpack>

```js src/App.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <div>
      <Profile />
    </div>
  );
}
```

```js src/Gallery.js active
// Move me to Profile.js!
export function Profile() {
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

```js src/Profile.js
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

После того как вы заставили его работать с одним видом экспорта, заставьте его работать с другим видом.

<details>
<summary><small>(eng)</small></summary>

After you get it working with one kind of exports, make it work with the other kind.

</details>

<Solution>

Это решение с именованным экспортом:

<details>
<summary><small>(eng)</small></summary>

This is the solution with named exports:

</details>

<Sandpack>

```js src/App.js
import Gallery from './Gallery.js';
import { Profile } from './Profile.js';

export default function App() {
  return (
    <div>
      <Profile />
      <Gallery />
    </div>
  );
}
```

```js src/Gallery.js
import { Profile } from './Profile.js';

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
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

Это решение с экспортом по умолчанию:

<details>
<summary><small>(eng)</small></summary>

This is the solution with default exports:

</details>

<Sandpack>

```js src/App.js
import Gallery from './Gallery.js';
import Profile from './Profile.js';

export default function App() {
  return (
    <div>
      <Profile />
      <Gallery />
    </div>
  );
}
```

```js src/Gallery.js
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
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

</Solution>

</Challenges>
