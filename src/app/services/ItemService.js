import AjaxModule from '@modules/ajax';
import config from '../config';


export default class ItemService {
	static GetItems() {
		return AjaxModule.get(config.urls.items).then((items) => {
			return items;
		});
	}

	static GetItemById(id) {
		return AjaxModule.get(`${config.urls.item}/${id}`);
	}
}
