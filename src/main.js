import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// ClickOutsideDirective
import ClickOutside from '@/utilities/clickOutsideDirective.js'
app.directive('click-outside', ClickOutside)

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
import OrderList from 'primevue/orderlist'
import Listbox from 'primevue/listbox'
import Divider from 'primevue/divider'
import Tooltip from 'primevue/tooltip'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' // optional
import Row from 'primevue/row' // optional

app.use(PrimeVue)
app.use(ToastService)
app.component('Button', Button)
app.component('Toast', Toast)
app.component('Dialog', Dialog)
app.component('Menubar', Menubar)
app.component('Card', Card)
app.component('InputText', InputText)
app.component('OrderList', OrderList)
app.component('ListBox', Listbox)
app.component('Divider', Divider)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)

app.directive('tooltip', Tooltip)

//Font Awesome Config
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faHome, faArrowLeft, faGamepad, faBrain } from '@fortawesome/free-solid-svg-icons'

library.add(faHome, faArrowLeft, faGamepad, faBrain)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
