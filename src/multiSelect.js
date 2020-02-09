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


class MultiSelect{
	constructor({ pleaseSelectOptionValue = '' }){
		// get the multiSelect container
		this.multiSelectContainer = document.querySelector('[multiSelect]');
		// the tipical <option value=""> please select a option <option/>
		this.pleaseSelectOptionValue = pleaseSelectOptionValue; 
		// get all the posible inputs in a <form/> tag
	 	this.allInputs = [...this.multiSelectContainer.querySelectorAll('input')];
	 	this.allSelects = [...this.multiSelectContainer.querySelectorAll('select')];
	 	this.allTextArea = [...this.multiSelectContainer.querySelectorAll('textarea')];
		// add onchange listener to all <select/>
		this.addSelectListeners(this.allSelects);
	}

	// ========== add listener to <select/> ==========
	addSelectListeners(selectHTMLElements){
		// agregar eventListener a todos los <select />
		selectHTMLElements.map( select => select.addEventListener('change', (ev) => this.showHideIt(ev)) );
	}

	// ========== show/hide logic ==========
	showHideIt(ev){
		const { multiSelectContainer, pleaseSelectOptionValue } = this;
		const select = ev.target;
		const selectValue = select.value;
		// if the <option/> is not the "please select a option" with value=""
		if(
			// check if isn't invalid value
			selectValue!== pleaseSelectOptionValue
			&&
			// check if the parent has a 'visibleId' attribute
			select.parentElement.getAttribute('visibleId')
			&&
			// check if the option has the 'makeVisible' attribute 
			select.querySelector(`option[value=${selectValue}]`).getAttribute('makeVisible')
		){
			// get the makeVisible attribute of <option/>
			const makeVisible = select.querySelector(`option[value=${selectValue}]`).getAttribute('makeVisible');
			// get the visibleId of the <select/> container
			const parentVisibleId = select.parentElement.getAttribute("visibleId");
			// buscar la <section/> padre de los select y ocultar todos los hijos
			// para luego solo mostrar el deseado
			const parent = multiSelectContainer.querySelector(`[parent=${parentVisibleId}]`);
			// ocultar hijos
			[...parent.children].map( child => child.style.display = "none" );
			// hacer parent visible
			parent.style.display = "block";
			// mostrar solo el hijo deseado
			parent.querySelector(`div[visibleId=${makeVisible}]`).style.display = "flex";
		}
		// you select the default "please select a option" <option/>
		else{
			try{
				let dependChilds = select.parentElement.getAttribute('visibleId');
				// hide all the childs
				document.querySelector(`[parent=${dependChilds}]`).style.display = "none";
			}
			// the <select/> is a simple select
			catch(err){
				console.warn('warning: an "error" ocurred because the <select> is a simple normal <select> \n' +
					'don\'t worry, this warning is not important\n' +
					'The VALUE is ' + selectValue + '\n' +
					'The "ERROR" is: ' + err + '\n'
				);
			}
		}

	}

	// ========== get all the values in form, like inputs, selects and textareas ==========
	getJson( ofAll = true) {
		// save all the values here
		let jsonValues = {};
		// class variables and methods
		let { 
				getVisibleItems,
				iterateValues,
				allSelects,
				allInputs,
				allTextArea
			} = this;
	 	// variable for save only the visible items
	 	let visibleItems;
	 	
	 	if(allSelects.length > 0){
	 		visibleItems = getVisibleItems(allSelects);
	 		iterateValues(jsonValues, visibleItems);
	 	}
	 	// if you want all the inputs and textareas values or only the <select> values
	 	if(ofAll){
		 	// check if a input exist in form
		 	if(allInputs.length > 0){
		 		visibleItems = getVisibleItems(allInputs);
		 		iterateValues(jsonValues, visibleItems);
		 	}


		 	if(allTextArea.length > 0){
		 		visibleItems = getVisibleItems(allTextArea);
		 		iterateValues(jsonValues, visibleItems);
		 	}
	 	}

	 	return jsonValues;

	}

	// ========== get only the visible inputs, selects and texareas ==========
	getVisibleItems(elementsArray) {
	 	let items = [];
	 	for(let item of elementsArray){
	 		if(item.getBoundingClientRect().height > 0) items.push(item);
	 	}
	 	return items;
 	}

 	// ========== iterate in the visible items and get the value ==========
 	iterateValues(obj, elementsArray) {
	 	for( let elmt of elementsArray){
	 		let name = elmt.name;
	 		let value = elmt.value;
	 		// add value to object
	 		obj[name] = value;
	 	}
 	}

 	// ========== simple valiation of all the <select> values ========== 
	// check if it is not the typical value of 'select an option'
	// each selected item should have a valid value, not <<please select an option>>
	simpleValidate(){
		let isValid = true;
		let invalidValues = [];
		let visibleSelects = this.getVisibleItems(this.allSelects);
		// iterate and check if a select has the >>>pleaseSelectOptionValue<<<
		for( let select of visibleSelects ){
			if(select.value === this.pleaseSelectOptionValue){
				invalidValues.push(select);
			}
		}
		// 
		if(invalidValues.length > 0){
			console.warn('one or more <select> tag has a not valid value', 'there are: \n');
			invalidValues.forEach( (select, index) => {
				console.log(`===== ${index} =====`);
				console.warn('the select element: ', select, ' has not a valid value: ', select.value);
			})
			isValid = false;
		} 

		return isValid;
	}

}

// check if is nodejs and export
typeof module === 'undefined' ? null :
typeof module.exports === 'undefined' ? null :
module.exports = MultiSelect;  