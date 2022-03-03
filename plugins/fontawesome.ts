import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/** import specific icons you plan to use */
import { faTree, faUserSecret } from '@fortawesome/free-solid-svg-icons'
// import '@fortawesome/fontawesome-svg-core/styles.css'
export default defineNuxtPlugin((nuxtApp) => {
  // add icons to library
  library.add(faUserSecret, faTree)
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})