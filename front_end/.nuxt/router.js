import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _56b7eab6 = () => interopDefault(import('..\\pages\\Users\\Create.vue' /* webpackChunkName: "pages/Users/Create" */))
const _590c2fee = () => interopDefault(import('..\\pages\\Posts\\Create\\_id.vue' /* webpackChunkName: "pages/Posts/Create/_id" */))
const _72a8c6dc = () => interopDefault(import('..\\pages\\Posts\\Update\\_id.vue' /* webpackChunkName: "pages/Posts/Update/_id" */))
const _010a7572 = () => interopDefault(import('..\\pages\\Users\\Update\\_id.vue' /* webpackChunkName: "pages/Users/Update/_id" */))
const _ca8417b6 = () => interopDefault(import('..\\pages\\Posts\\_id.vue' /* webpackChunkName: "pages/Posts/_id" */))
const _27cc4804 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/Users/Create",
    component: _56b7eab6,
    name: "Users-Create"
  }, {
    path: "/Posts/Create/:id?",
    component: _590c2fee,
    name: "Posts-Create-id"
  }, {
    path: "/Posts/Update/:id?",
    component: _72a8c6dc,
    name: "Posts-Update-id"
  }, {
    path: "/Users/Update/:id?",
    component: _010a7572,
    name: "Users-Update-id"
  }, {
    path: "/Posts/:id?",
    component: _ca8417b6,
    name: "Posts-id"
  }, {
    path: "/",
    component: _27cc4804,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
