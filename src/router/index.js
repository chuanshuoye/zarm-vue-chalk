import Vue from 'vue'
import VueRouter from 'vue-router'
import Simulator from '../components/Simulator'
import Button from '../components/Button'
import Icon from '../components/Icon'
import Form from '../components/Form'
import KeyBoard from '../components/KeyBoard'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home'
  },
  {
    path: '/simulator',
    component: Simulator,
    children: [
      {
        path: 'button',
        component: Button
      },
      {
        path: 'icon',
        component: Icon
      },
      {
        path: 'form',
        component: Form
      },
      {
        path: 'keyboard',
        component: KeyBoard
      }
    ]
  },
  { path: '*', redirect: '/' }
]
const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
})

export default router
