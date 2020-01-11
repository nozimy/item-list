import Component from '@frame/Component';
import template from './index.handlebars';
import './index.scss';
import ItemService from "../../services/ItemService";

export default class ItemListComponent extends Component {
	constructor({ someProp = '', children = [], ...props }) {
		super(props);

		this.data = {
			someProp,
			children,
		};
	}

	preRender() {
		ItemService.GetItems().then(this.onItemsResponse)
	}

	render() {
		this.html = template({
			...this.props,
			...this.data,
		});

		this.attachToParent();
		return this.html;
	}

	onItemsResponse = items => {
		this.data = {
			items,
		};

		this.stateChanged();
	}
}
