export const uniqueId = () =>
	`_${Math.random()
		.toString(36)
		.substr(2, 9)}`;

export function debounce(func, wait, immediate) {
	let timeout;

	return function executedFunction() {
		const context = this;
		const args = arguments;

		const later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};

		const callNow = immediate && !timeout;

		clearTimeout(timeout);

		timeout = setTimeout(later, wait);

		if (callNow) func.apply(context, args);
	};
}

export const isEqual = function (value, other) {
	const type = Object.prototype.toString.call(value);

	if (type !== Object.prototype.toString.call(other)) return false;

	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;

	const compare = function (item1, item2) {

		const itemType = Object.prototype.toString.call(item1);

		if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
			if (!isEqual(item1, item2)) return false;
		} else {
			if (itemType !== Object.prototype.toString.call(item2)) return false;

			if (itemType === '[object Function]') {
				if (item1.toString() !== item2.toString()) return false;
			} else {
				if (item1 !== item2) return false;
			}

		}
	};

	if (type === '[object Array]') {
		for (let i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) return false;
		}
	} else {
		for (let key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
			}
		}
	}

	return true;
};

export function compareDefault(a, b) {
	if (a.id < b.id) {
		return -1;
	}
	if (a.id > b.id) {
		return 1;
	}

	return 0;
}

export function comparePrice(itemA, itemB, desc) {
	const a = parseInt(itemA.price);
	const b = parseInt(itemB.price);

	if (desc) {
		if (a > b) {
			return -1;
		}
		if (a < b) {
			return 1;
		}
	}

	if (a < b) {
		return -1;
	}
	if (a > b) {
		return 1;
	}

	return 0;
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
