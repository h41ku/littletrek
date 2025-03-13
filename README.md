# littletrek

Lightweight zero-dependencies library for routing.

## Install

NPM:

```sh
npm install littletrek
```

PNPM:

```sh
pnpm add littletrek
```

## Usage

### Create an instance of router

```js
import { createRouter } from 'littletrek'

// create router
const router = createRouter()

// setup routes and bind handlers
router
  .get('/users/:id', showUser) 
  .patch('/users/:id', updateUser)
  .delete('/users/:id', deleteUser)
  .get('/users', listUsers) 
  // etc...
  // optionally possible to setup a fallback handler
  .fallback(pageNotFound)
```

### Using inside a ServiceWorker

```js
import { createRouter, bindHistoryAPI } from 'littletrek'

const router = createRouter()

// setup custom route
router.get('/hello/:name', ({ params: { name } }) => {
  const body = `Hello, ${name}!`
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  })
})

// fallback handler
router.fallback(({ request }) => fetch(request)) // get from network

// add event listener
addEventListener('fetch', evt => evt.respondWith(
  router.resolve(evt.request)
))

// ...
```

### Using History API and frontend-side navigation

History API bindings:

```js
import { createRouter, bindHistoryAPI } from 'littletrek'

const router = createRouter()
// omit setup...

// bind history API
const { connect, disconnect, navigate, back } = bindHistoryAPI(router)

// start routing
connect()

// navigation
navigate('/user/123') // internal navigation
back() // step back

// disconnect history API
disconnect() // as needed 
```

## Route syntax

Route is a string which describes a pattern with a simple syntax.

Pieces of the pattern split by a special character - `/`,
just like a path in a filesystem (e.g. `/var/log/messages`).

Each piece of the pattern can describe a constant, a name of parameter
or can be a special form `*` for matching with anything.

Constants are consist of characters from limited subset
`a..z`, `A..Z`, `0..9`, `.`, `_`, `-`.

The name of parameters starts with special character `:` and consist
of characters from same limited subset like constants, but must begins
with `a..z`, `A..Z` or `_`.

Root route defines as `/`.

Examples:

* `/user/:id` will match `/user/18263`, `/user/nobody`, but will NOT match `/user/18263/messages`, `/user/`;
* `/messages/*/:messageId` will match `/messages/alma/0a2c7d1b-09ef-11af-dd07-4b4ca6aebbc7`, `/messages/302362/7123332`,
  but will NOT match `/messages/302362`, `/messages/302362/7123332/23132`;
* `/articles/:slug` will match `/articles/123`, `/articles/how-to-write-a-router`;

## License

MIT
