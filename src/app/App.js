import Component from '@frame/Component';
import template from './App.handlebars';
import './App.scss';

class AppComponent extends Component {
	constructor({...props}) {
		super(props);
	}

	render() {
		this.html = template(this.data);
		this.attachToParent();

		return this.html;
	}
}

export default AppComponent;
