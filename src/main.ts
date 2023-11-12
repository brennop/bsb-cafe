import './app.css'
import 'maplibre-gl/dist/maplibre-gl.css'
import '@fontsource-variable/nunito'

import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
})

export default app
