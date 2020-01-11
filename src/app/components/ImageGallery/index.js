import Component from '@frame/Component';
import template from './index.handlebars';
import './index.scss';

export default class ImageGalleryComponent extends Component {
	constructor({images = null, ...props}) {
		super(props);

		this.data = {
			slideIndex: 0,
			images,
		};
	}

	render() {
		this.html = template({
			...this.props,
			...this.data,
		});

		return this.html;
	}

	postRender() {
		if (!this.data.images) {
			return;
		}
		this.showSlides(this.data.slideIndex);
		const nexts = this.el.querySelectorAll('.next');
		const prevs = this.el.querySelectorAll('.prev');
		const thumbs = this.el.querySelectorAll('.thumbnail');

		if (!nexts) {
			return;
		}
		for (let i = 0; i < nexts.length; ++i) {
			nexts[i].addEventListener('click', () => this.plusSlides(1));
			prevs[i].addEventListener('click', () => this.plusSlides(-1));
		}

		for (let i = 0; i < thumbs.length; ++i) {
			thumbs[i].addEventListener('mouseover', () => this.currentSlide(i));
		}
	}

	plusSlides = (n) => {
		this.showSlides(this.data.slideIndex += n);
	};

	currentSlide = (n) => {
		this.showSlides(this.data.slideIndex = n);
	};

	showSlides = (n) => {
		let i;
		const slides = document.getElementsByClassName("gallery-image");
		const dots = document.getElementsByClassName("thumbnail");
		if (n >= slides.length) {
			this.data.slideIndex = 0
		}
		if (n < 0) {
			this.data.slideIndex = slides.length - 1
		}
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		for (i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(" active", "");
		}
		slides[this.data.slideIndex].style.display = "flex";
		dots[this.data.slideIndex].className += " active";
	};
}
