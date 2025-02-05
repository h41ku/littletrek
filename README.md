# littletrek

Lightweight zero-dependencies library for routing.

Installation
------------

NPM:

```sh
npm install littletrek
```

PNPM:

```sh
pnpm add littletrek
```

Usage on frontend-side
----------------------

```js
import { createRouter, connectHistoryAPI } from 'littletrek'

// create router
const router = createRouter()

// setup routes

router
  .add('/users/:id', showUserProfile) // bind handler to route
  .add('/users/:id/sessions', showUserSessions) // bind handler to route
  // etc...

// handlers

function showUserProfile(request) {
  const { id } = req.params // request provides parameters
  // now switch page...
  // for example using redux-like approach
  // with thunks and action creators:
  store.dispatch(thunks.loadUserProfileAndShowIt(id))
}

function showUserSessions(req) {
  // omit code ...
}

// connect history API
const { disconnect, navigate, back } = connectHistoryAPI(router)

// navigation
navigate('/user/123/sessions') // internal navigation
back() // step back

// disconnect history API
disconnect() // as needed 
```

Route syntax
------------

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

License
-------

MIT
