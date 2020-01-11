import '@assets/scss/main.scss';
import AppComponent from './app/App';
import Frame from '@frame/frame';
import { Router } from '@modules/router';
import routes from '@app/routes';
import '@app/busHandlers';
import initLogTrack from '@modules/log';


initLogTrack();

export const router = new Router(document.getElementById('root'), {
	outletName: 'router-outlet',
});
router.register(routes);

Frame.bootstrap(AppComponent, document.getElementById('root'), router);

