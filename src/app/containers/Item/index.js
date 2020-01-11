import Component from '@frame/Component';
import template from './index.handlebars';
import './index.scss';
import ItemService from "../../services/ItemService";

export default class ItemComponent extends Component {
	constructor({children = [], ...props }) {
		super(props);

		this.data = {
			children,
		};
	}

	preRender() {
		ItemService.GetItemById(this.props.params.itemId).then(this.onItemResponse)
	}

	render() {
		this.html = template({
			...this.props,
			...this.data,
		});

		this.attachToParent();
		return this.html;
	}

	onItemResponse = item => {
		this.data = {
			...item[0],
		};

		this.stateChanged();
	}
}
