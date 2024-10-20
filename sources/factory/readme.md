# Контейнер с описаниями компонентов модуля

usage:

```js
factory(key).with(context = {})
    .create(tagname, attributes?, children?)
    .mount(document.body)

```

описания хранятся в объекте

```js
@def: {
    [as]: {
        t: 'div',
        a: {
            [name]: value
        },
        c:(@def || string)[],
        init: function
    }
}

```
