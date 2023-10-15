import './JavaRocks.js';
import './JSRocks.js';
import './VenueApp.js';

import {Router} from "./libs/router.js"

const outlet = document.querySelector('main');
const router = new Router(outlet);
router.setRoutes([
	{path: '/index2.html', component: 'java-rocks'},
	{path: '/java', component: 'java-rocks'},
	{path: '/js', component: 'js-rocks'},
	{path: '/va', component: 'venue-app'}
]);
