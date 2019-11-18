'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
*  	MultiSelect.js 
*  	A small library to manage multiple select tags in forms
*	
*	Carlos Martínez 2019
*	my github: https://github.com/carlosEdua
*
*	repo code: https://github.com/carlosEdua/multiSelect.js
*	License: ( MIT ) https://github.com/carlosEdua/multiSelect.js/blob/master/LICENSE
*
*	You can modify the code and make it better, send me a pull request
*/

var MultiSelect = function () {
	function MultiSelect(_ref) {
		var _ref$pleaseSelectOpti = _ref.pleaseSelectOptionValue,
		    pleaseSelectOptionValue = _ref$pleaseSelectOpti === undefined ? '' : _ref$pleaseSelectOpti;

		_classCallCheck(this, MultiSelect);

		// get the multiSelect container
		this.multiSelectContainer = document.querySelector('[multiSelect]');
		// the tipical <option value=""> please select a option <option/>
		this.pleaseSelectOptionValue = pleaseSelectOptionValue;
		// get all the posible inputs in a <form/> tag
		this.allInputs = [].concat(_toConsumableArray(this.multiSelectContainer.querySelectorAll('input')));
		this.allSelects = [].concat(_toConsumableArray(this.multiSelectContainer.querySelectorAll('select')));
		this.allTextArea = [].concat(_toConsumableArray(this.multiSelectContainer.querySelectorAll('textarea')));
		// add onchange listener to all <select/>
		this.addSelectListeners(this.allSelects);
	}

	// ========== add listener to <select/> ==========


	_createClass(MultiSelect, [{
		key: 'addSelectListeners',
		value: function addSelectListeners(selectHTMLElements) {
			var _this = this;

			// agregar eventListener a todos los <select />
			selectHTMLElements.map(function (select) {
				return select.addEventListener('change', function (ev) {
					return _this.showHideIt(ev, _this);
				});
			});
		}

		// ========== show/hide logic ==========

	}, {
		key: 'showHideIt',
		value: function showHideIt(ev, that) {
			var THIS = that;
			var multiSelectContainer = THIS.multiSelectContainer,
			    pleaseSelectOptionValue = THIS.pleaseSelectOptionValue;

			var select = ev.target;
			var selectValue = select.value;
			// if the <option/> is not the "please select a option" with value=""
			if (
			// check if isn't invalid value
			selectValue !== pleaseSelectOptionValue &&
			// check if the parent has a 'visibleId' attribute
			select.parentElement.getAttribute('visibleId') &&
			// check if the option has the 'makeVisible' attribute 
			select.querySelector('option[value=' + selectValue + ']').getAttribute('makeVisible')) {
				// get the makeVisible attribute of <option/>
				var makeVisible = select.querySelector('option[value=' + selectValue + ']').getAttribute('makeVisible');
				// get the visibleId of the <select/> container
				var parentVisibleId = select.parentElement.getAttribute("visibleId");
				// buscar la <section/> padre de los select y ocultar todos los hijos
				// para luego solo mostrar el deseado
				var parent = multiSelectContainer.querySelector('[parent=' + parentVisibleId + ']');
				// ocultar hijos
				[].concat(_toConsumableArray(parent.children)).map(function (child) {
					return child.style.display = "none";
				});
				// hacer parent visible
				parent.style.display = "block";
				// mostrar solo el hijo deseado
				parent.querySelector('div[visibleId=' + makeVisible + ']').style.display = "flex";
			}
			// you select the default "please select a option" <option/>
			else {
					try {
						var dependChilds = select.parentElement.getAttribute('visibleId');
						// hide all the childs
						document.querySelector('[parent=' + dependChilds + ']').style.display = "none";
					}
					// the <select/> is a simple select
					catch (err) {
						console.warn('warning: an "error" ocurred because the <select> is a simple normal <select> \n' + 'don\'t worry, this is a warning \n' + 'The VALUE is ' + selectValue + '\n' + 'The ERROR is: ' + err + '\n');
					}
				}
		}

		// ========== get all the values in form, like inputs, selects and textareas ==========

	}, {
		key: 'getJson',
		value: function getJson() {
			var ofAll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			// save all the values here
			var jsonValues = {};
			// class variables and methods
			var getVisibleItems = this.getVisibleItems,
			    iterateValues = this.iterateValues,
			    allSelects = this.allSelects,
			    allInputs = this.allInputs,
			    allTextArea = this.allTextArea;
			// variable for save only the visible items

			var visibleItems = void 0;

			if (allSelects.length > 0) {
				visibleItems = getVisibleItems(allSelects);
				iterateValues(jsonValues, visibleItems);
			}
			// if you want all the inputs and textareas values or only the <select> values
			if (ofAll) {
				// check if a input exist in form
				if (allInputs.length > 0) {
					visibleItems = getVisibleItems(allInputs);
					iterateValues(jsonValues, visibleItems);
				}

				if (allTextArea.length > 0) {
					visibleItems = getVisibleItems(allTextArea);
					iterateValues(jsonValues, visibleItems);
				}
			}

			return jsonValues;
		}

		// ========== get only the visible inputs, selects and texareas ==========

	}, {
		key: 'getVisibleItems',
		value: function getVisibleItems(elementsArray) {
			var items = [];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = elementsArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var item = _step.value;

					if (item.getBoundingClientRect().height > 0) items.push(item);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return items;
		}

		// ========== iterate in the visible items and get the value ==========

	}, {
		key: 'iterateValues',
		value: function iterateValues(obj, elementsArray) {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = elementsArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var elmt = _step2.value;

					var name = elmt.name;
					var value = elmt.value;
					// add value to object
					obj[name] = value;
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}

		// ========== simple valiation of all the <select> values ========== 
		// check if it is not the typical value of 'select an option'

	}, {
		key: 'simpleValidate',
		value: function simpleValidate() {
			var isValid = true;
			var invalidValues = [];
			var visibleSelects = this.getVisibleItems(this.allSelects);
			// iterate and check if a select has the >>>pleaseSelectOptionValue<<<
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = visibleSelects[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var select = _step3.value;

					if (select.value === this.pleaseSelectOptionValue) {
						invalidValues.push(select);
					}
				}
				// 
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			if (invalidValues.length > 0) {
				console.warn('one or more <select> tag has a not valid value', 'there are: \n');
				invalidValues.forEach(function (select, index) {
					console.log('===== ' + index + ' =====');
					console.warn('the select element: ', select, ' has not a valid value: ', select.value);
				});
				isValid = false;
			}

			return isValid;
		}
	}]);

	return MultiSelect;
}();

// check if is nodejs and export


typeof module === 'undefined' ? null : typeof module.exports === 'undefined' ? null : module.exports = MultiSelect;

