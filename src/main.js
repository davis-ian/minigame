import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// PrimeVue Config
import 'primevue/resources/themes/lara-dark-green/theme.css'
// import 'primevue/resources/themes/bootstrap4-dark-purple/theme.css'
import 'primeflex/primeflex.css'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import Dialog from 'primevue/dialog'
import Menubar from 'primevue/menubar'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'

app.use(PrimeVue)
app.use(ToastService)
app.component('Button', Button)
app.component('Toast', Toast)
app.component('Dialog', Dialog)
app.component('Menubar', Menubar)
app.component('Card', Card)
app.component('InputText', InputText)

//Font Awesome Config
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faHome, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faHome, faArrowLeft)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
