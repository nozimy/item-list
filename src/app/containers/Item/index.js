import Component from '@frame/Component';
import template from './index.handlebars';
import './index.scss';
import ItemService from "../../services/ItemService";
import {defaultAvatarUrl} from "@modules/utils";
import ImageGalleryComponent from "@components/ImageGallery";

export default class ItemComponent extends Component {
	constructor({...props }) {
		super(props);
	}

	preRender() {
		this.data = {
			loaded: false
		};

		ItemService.GetItemById(this.props.params.itemId).then(this.onItemResponse)
	}

	render() {
		this.gallery = new ImageGalleryComponent({
			images: this.data.images,
		});

		this.data = {
			sellerAvatar: defaultAvatarUrl(this.data.sellerName),
			imageGallery: this.gallery.render()
		};

		this.html = template({
			...this.props,
			...this.data,
		});

		this.attachToParent();
		return this.html;
	}

	postRender() {
		this.gallery.postRender();
	}

	onItemResponse = item => {
		this.data = {
			...item[0],
			loaded: true
		};

		this.stateChanged();
	};
}
