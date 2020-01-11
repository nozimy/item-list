import Component from '@frame/Component';
import template from './index.handlebars';
import './index.scss';
import ItemService from "../../services/ItemService";
import {compareDefault, comparePrice, isEqual} from "@modules/utils";
import {sortRadioItems} from "@app/constants";
import RadioGroup from "@components/RadioGroup/RadioGroup";


export default class ItemListComponent extends Component {
	constructor({...props}) {
		super(props);
	}

	preRender() {
		this.data = {
			sortValue: "default",
			viewMode: 'list'
		};

		ItemService.GetItems().then(this.onItemsResponse);
	}

	render() {
		this._sortRadioGroup = new RadioGroup({
			items: sortRadioItems,
			column: true,
			name: 'experienceLevel',
			value: this.data.viewMode,
			onClick: this.onViewModeChange
		});

		this.data = {
			_sortRadioGroup: this._sortRadioGroup.render()
		};

		this.html = template({
			...this.props,
			...this.data,
		});

		this.attachToParent();
		return this.html;
	}

	postRender() {
		this.sortSelect = this.el.querySelector("#sort-select");
		this.sortSelect.addEventListener("change", this.onSortChanged);
		this._sortRadioGroup.postRender();
	}

	onItemsResponse = items => {
		items = items.sort(compareDefault);

		if (isEqual(this.data.items, items)) {
			return;
		}

		this.data = {
			items,
		};

		this.stateChanged();
	};

	onSortChanged = e => {
		const {target} = e;

		this.data = {
			sortValue: target.value
		};

		this.sortItems();

		this.stateChanged();
	};

	sortItems = () => {
		let {items} = this.data;
		switch (this.data.sortValue) {
		case "price-asc":
			items = items.sort(comparePrice);
			break;
		case "price-desc":
			items = items.sort((a, b) => comparePrice(a, b, true));
			break;
		case "default":
			items = items.sort(compareDefault);
			break;
		}

		this.data = {
			items: items
		};
	};

	onViewModeChange = (value) => {
		this.data = {
			viewMode: value
		};

		this.stateChanged();
	};
}
