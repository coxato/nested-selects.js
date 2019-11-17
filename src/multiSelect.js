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
		selectHTMLElements.map( select => select.addEventListener('change', (ev) => this.showHideIt(ev,this)) );
	}

	// ========== show/hide logic ==========
	showHideIt(ev, that){
		const THIS = that;
		const { multiSelectContainer, pleaseSelectOptionValue } = THIS;
		const select = ev.target;
		const selectValue = select.value;
		// if the <option/> is not the "please select a option" with value=""
		if(selectValue!= pleaseSelectOptionValue && select.parentElement.getAttribute('visibleId')){
			// get the makeVisible attribute of <option/>
			const makeVisible = select.querySelector(`option[value=${selectValue}]`).getAttribute('makeVisible');
			// get the visibleId of the <select/> container
			const parentVisibleId = select.parentElement.getAttribute("visibleId");
			// buscar la <section/> padre de los select y ocultar todos los hijos
			// para luego solo mostrar el deseado
			const parent = multiSelectContainer.querySelector(`section[parent=${parentVisibleId}]`);
			// ocultar hijos
			[...parent.children].map( child => child.style.display = "none" );
			// hacer parent visible
			parent.style.display = "block";
			// mostrar solo el hijo deseado
			parent.querySelector(`div[visibleId=${makeVisible}]`).style.display = "block";
		}
		// you select the default "please select a option" <option/>
		else{
			try{
				let dependChilds = select.parentElement.getAttribute('visibleId');
				// hide all the childs
				document.querySelector(`section[parent=${dependChilds}]`).style.display = "none";
			}
			// the <select/> is a simple select
			catch(err){
				console.warn(`
					warning: an "error" ocurred because the <select> is a simple normal <select>
					don't worry, this is a warning
					The VALUE is ${selectValue}
					The ERROR is ${err}
				`);
			}
		}

	}

	// ========== get all the values in form, like inputs, selects and textareas ==========
	getJson() {
		// save all the values here
		let jsonValues = {};
		// class variables and methods
		let { 
				multiSelectContainer,
				getVisibleItems,
				iterateValues,
				allSelects,
				allInputs,
				allTextArea
			} = this;
	 	// variable for save only the visible items
	 	let visibleItems;
	 	// check if a input exist in form
	 	if(allInputs.length > 0){
	 		visibleItems = getVisibleItems(allInputs);
	 		iterateValues(jsonValues, visibleItems);
	 	}

	 	if(allSelects.length > 0){
	 		visibleItems = getVisibleItems(allSelects);
	 		iterateValues(jsonValues, visibleItems);
	 	}

	 	if(allTextArea.length > 0){
	 		visibleItems = getVisibleItems(allTextArea);
	 		iterateValues(jsonValues, visibleItems);
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