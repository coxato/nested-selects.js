# multiSelect.js

En-> a library for manage multiple select tags in a form

Es-> una librería para controlar multiples etiquetas select en un formulario

![GitHub package.json version](https://img.shields.io/github/package-json/v/carlosEdua/multiSelect.js?color=green)
![GitHub](https://img.shields.io/github/license/carlosEdua/multiSelect.js)

### [ver demo](https://471684.playcode.io)

## Uso en el HTML
**multiSelect.js** trabaja con atributos en las etiquetas HTML, hay cuatro (4) atributos que se deben tener en cuenta para trabajar con **multiSelect.js** los cuales son:

1. **multiSelect**
2. **visibleId**
3. **makeVisible**
4. **parent**

Además de los típicos `name="randomName"` y `value="randomValue"` que siempre se usan en los formularios.

## Explicación de cada atributo
### multiSelect
Éste atributo se usa en el contenedor principal de los `<select>` y generalmente suele ser un `<form>`, se debe poner éste atributo para indicarle a multiSelect.js cual es el contenedor de todos los `<select>`.

```html
<form multiSelect onsubmit="return false">
	<!-- form content -->
</form>
```

### visibleId
Debe ser el contenedor de cada `<select>` o de cada elemento que se verá o no dependiendo de la `<option>` seleccionada. Sirve para identificar a dicho contenedor , sería como un `id` pero solo para elementos que se mostrarán/ocultarán. 
```html
<div visibleId="select1">
	<select name="mySelect1">
		<!-- options -->
	</select>
</div>
```
### makeVisible
Se coloca en los `<option>` para indicar qué elemento será visible cuando se seleccione esa opción.**NOTA:** el valor de `makeVisible` será utilizado como `visibleId` por los elementos que se mostrarán/ocultarán dependiendo de la `<option>` seleccionada.

```html
<div visibleId="select1">
	<select name="mySelect1">
		<option value="nothing">please select a option</option>
		<option value="v1" makeVisible="sub-select1">sub select 1</option>
		<option value="v2" makeVisible="sub-select2">sub select 2</option>
		<option value="v3" makeVisible="a-sub-div">sub div</option>
	</select>
</div>
``` 

### parent
Contenedor que tiene dentro todos los hijos a ser mostrados por un `<select>`. Su valor debe ser el `visibleId` del `<select>` del cual depende.

```html
<!-- el valor de parent debe ser el visibleId del select del cual depende -->
<div parent="select1">
	<!-- el valor de visibleId debe ser el valor del makeVisible correspondiente -->
	<div visibleId="sub-select1">
		<select name="subSelect1">
			<option value="nothing"></option>
			<option value="subSelect1-value-1">sub select 1 option</option>
			<option value="subSelect1-value-2">other sub select 1 option</option>
		</select>
	</div>

	<!-- el valor de visibleId debe ser el valor del makeVisible correspondiente -->
	<div visibleId="sub-select2">
		<select name="subSelect2">
			<option value="nothing"></option>
			<option value="subSelect2-value-1">sub select 2 option</option>
			<option value="subSelect2-value-2">other sub select 2 option</option>
		</select>
	</div>

	<!-- el valor de visibleId debe ser el valor del makeVisible correspondiente -->
	<div visibleId="a-sub-div">
		<!-- notese que no solo se pueden selects, también pueden haber -->
		<!-- divs u otros elementos que dependan del valor seleccionado en un select -->
		<h1>hola soy un h1 que se mostró porque seleccionaste la <option> con el makeVisible="a-sub-div"</h1>
	</div>

</div>
``` 

## Uso de JavaScript
Para empezar a usar **multiSelect.js** debes instanciar la clase `MultiSelect`, puedes importar el código mediante una etiqueta `<script>` o puedes hacer un
```js
// commonJS
const MultiSelect = require('./youDir/multiSelect.min.js');
// es2015
import MultiSelect from './youDir/multiSelect.min.js'; 
// in browser
'<script src="yourDir/multiSelect.min.js"></script>'
```
### Constructor con pleaseSelectOptionValue
Lo único que necesita el constructor (por ahora) es un objeto con la propiedad `pleaseSelectOptionValue` la cual representará el valor que tiene la típica opción por defecto de `seleccione una opción por favor`, por defecto es un string vacío `''` pero se puede poner un `0`, `void` o lo que quieras, en este ejemplo de la documentación estamos usando `nothing`, el cual si te fijaste está como valor en algunas `<option value="nothing"> please select a option </option>`, asi que la instaciación quedaría asi:
```js
// make a new multiSelect instance
		const multi = new MultiSelect({
			// default 'please select option value'
			// this value can be '' or '0' or whatever you want
			pleaseSelectOptionValue: 'nothing' 
		});
```
### Métodos getJson() y simpleValidate()
Toda instancia de **MultiSelect** tendrá estos 2 métodos
#### .getJson(boolean)
Si le pasas `true` te traerá un objeto literal con todos los valores de los `<input>`,`<textarea>` y `<select>` que haya en el formulario o bien en el contenedor con el atributo `multiSelect`.
Si le pasas `false` solo te retornará un objeto literal con solamente los valores de las etiquetas `<select>` que estén dentro del elemento con atributo `multiSelect`
```js
// all the form values
let allValuesJson = multi.getJson(true);
console.log(allValuesJson); // object with values of all elements like [element.name]: element.value

// only <select> values
let selectValuesJson = multi.getJson(false);
console.log(selectValuesJson); // object with only values of select elements like [select.name]: select.Value

```  
#### .simpleValidate()
Realiza una simple validación de todos los `<select>` verificando que no haya ninguno con el valor de `pleaseSelectOptionValue`, si todo esta bien retorna `true`, de lo contrario `false`;
```js
// if all the <select> has a valid value
multi.simpleValidate(); // true
// else
multi.simpleValidate(); // false
```

## Ejemplo con todo lo explicado
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>example</title>
</head>
<body>
	<!-- ======================== HTML ==================== -->
	<form multiSelect onsubmit="return false">

		<div visibleId="select1">
			<select name="mySelect1">
				<option value="nothing">please select a option</option>
				<option value="v1" makeVisible="sub-select1">sub select 1</option>
				<option value="v2" makeVisible="sub-select2">sub select 2</option>
				<option value="v3" makeVisible="a-sub-div">sub div</option>
			</select>
		</div>

		<!-- el valor de parent debe ser el visibleId del select del cual depende -->
		<div parent="select1">
			<!-- el valor de visibleId debe ser el valor del makeVisible correspondiente -->
			<div visibleId="sub-select1">
				<select name="subSelect1">
					<option value="nothing">select an option</option>
					<option value="subSelect1-value-1">sub select 1 option</option>
					<option value="subSelect1-value-2">other sub select 1 option</option>
				</select>
			</div>

			<!-- el valor de visibleId debe ser el valor del makeVisible correspondiente -->
			<div visibleId="sub-select2">
				<select name="subSelect2">
					<option value="nothing">select an option</option>
					<option value="subSelect2-value-1">sub select 2 option</option>
					<option value="subSelect2-value-2">other sub select 2 option</option>
				</select>
			</div>

			<!-- el valor de visibleId debe ser el valor del makeVisible correspondiente -->
			<div visibleId="a-sub-div">
				<!-- notese que no solo se pueden selects, también pueden haber -->
				<!-- divs u otros elementos que dependan del valor seleccionado en un select -->
				<h1>hola soy un h1 que se mostró porque seleccionaste la 'option' con el makeVisible="a-sub-div"</h1>
			</div>

		</div>

		<button onclick="sendData()">send data</button>

	</form>
	<!-- ==================================== JavaScript ================================= -->
	<!-- "import" of multiSelect.js -->
	<script src="yourDir/multiSelect.js"></script>
	<!-- your js code -->
	<script>
		// make a new multiSelect instance
		const multi = new MultiSelect({
			pleaseSelectOptionValue: 'nothingHere' 
		});

		function sendData() {
			// get the <select> values
			const values = multi.getJson(false);
			console.log(values);
			// validate
			if(multi.simpleValidate()){
				// make something
			}else{
				//make something
			}
		}

	</script>
</body>
</html>
```

### nota:
Habrás notado que al cargar la página se ven todas las etiquetas `<select>` incluso las que no deberían verse.
Ésto sucede porque primero se carga el HTML y luego el JavaScript, si quieres que eso no pase **debes agregar el siguiente código a tu hoja de estilos:**

```css
[multiSelect] [parent]{
	display: none;
}
```
de lo demás se encarga JavaScript.

Si quieres ver un ejemplo más extenso puedes ver la [demo](https://471684.playcode.io)

No olvides que puedes colaborar o dar ideas para mejorar la librería.