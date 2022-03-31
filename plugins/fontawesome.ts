import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/** import specific icons you plan to use */
import { faArrowLeftLong, faAtom, faBasketShopping, faBedPulse, faBook, faBuilding, faBuildingColumns, faCar, faChalkboardUser, faChild, faChurch, faComment, faDesktop, faGear, faMasksTheater, faPhotoFilm, faRocket, faSatelliteDish, faShield, faShip, faShirt, faTractor, faTree, faUmbrellaBeach, faUserSecret, faUserShield, faVial, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
// import '@fortawesome/fontawesome-svg-core/styles.css'
export default defineNuxtPlugin((nuxtApp) => {
  // add icons to library
  library.add(faArrowLeftLong, faTree, faUserSecret, faTractor, faVial, faShirt, faPhotoFilm, faShip, faDesktop, faBuilding, faBasketShopping, faUmbrellaBeach, faBedPulse, faMasksTheater, faAtom, faGear, faRocket, faChild, faChalkboardUser, faChurch, faBuildingColumns, faUserShield, faComment, faSatelliteDish, faCar, faShield, faBook, faArrowRightArrowLeft)
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
