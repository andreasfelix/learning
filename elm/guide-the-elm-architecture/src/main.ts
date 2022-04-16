import 'uno.css'
import '@unocss/reset/tailwind.css'

import { Elm } from './Main.elm'

Elm.Main.init({
  node: document.getElementById('app'),
  flags: 'Initial Message'
})
