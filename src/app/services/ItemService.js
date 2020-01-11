import AjaxModule from '@modules/ajax';
import config from '../config';
import store from '@modules/store';

export default class ItemService {
	static GetItems() {
		return AjaxModule.get(config.urls.items).then((items) => {
			// store.setState({
			// 	items,
			// });

			return items;
		})
			.catch(e => {
				console.dir(e);
			});
	}

	static GetItemById(id) {
		return AjaxModule.get(`${config.urls.item}/${id}`);
	}
}
