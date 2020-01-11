
export const uniqueId = () =>
	`_${Math.random()
		.toString(36)
		.substr(2, 9)}`;

export const toSelectElement = (el, i) => ({
	label: el,
	value: i,
	selected: false,
});

export function hasClass(cls, el) {
	return new RegExp('(^|\\s+)' + cls + '(\\s+|$)').test(el.className);
}

export function addClass(cls, el) {
	if (!hasClass(cls, el))
		return (el.className += el.className === '' ? cls : ' ' + cls);
}

export function removeClass(cls, el) {
	el.className = el.className.replace(
		new RegExp('(^|\\s+)' + cls + '(\\s+|$)'),
		'',
	);
}

export function toggleClass(cls, el) {
	!hasClass(cls, el) ? addClass(cls, el) : removeClass(cls, el);
}

export function defaultAvatarUrl(firstName = '', lastName = '', size = 64) {
	// return `https://eu.ui-avatars.com/api/?name=${firstName}+${lastName}`

	const letters = firstName.charAt(0) + lastName.charAt(0);

	let canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	const color = randomHexColor();

	canvas.width = size;
	canvas.height = size;

	context.font = Math.round(canvas.width / 2) + 'px Arial';
	context.textAlign = 'center';

	// Setup background and front color
	context.fillStyle = color;
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = '#FFF';
	context.fillText(letters, size / 2, size / 1.5);

	const dataURI = canvas.toDataURL();

	canvas = null;

	return dataURI;
}

function randomHexColor() {
	return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

export function deepCopy(obj) {
	return JSON.parse(JSON.stringify(obj));
}

export function formatDate(dateString) {
	const d = new Date(dateString);
	let m = d.getMonth() + 1;
	m = formatDateNum(m);
	const day = formatDateNum(d.getDate());

	return `${day}.${m}.${d.getFullYear()}`;
}

export function formatDateNum(num) {
	if (num > 0 && num < 9) {
		return '0' + num;
	}

	return num;
}

export function formatMoney(amount) {
	if (!amount) {
		return;
	}

	const formatter = new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	return formatter.format(amount);
}


export function debounce(func, wait, immediate) {
	let timeout;

	return function executedFunction() {
		const context = this;
		const args = arguments;

		const later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};

		const callNow = immediate && !timeout;

		clearTimeout(timeout);

		timeout = setTimeout(later, wait);

		if (callNow) func.apply(context, args);
	};
}
