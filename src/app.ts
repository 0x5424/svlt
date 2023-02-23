import './app.css'
import App from './App.svelte'

let foo: string | number = 'vite up'
console.log(foo)

foo = 69

console.log(foo)

new App({ target: document.body, props: { name: 'world' } })
