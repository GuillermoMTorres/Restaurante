//Inicialización del contenido
resetContent();

$('#page1Content').show();
document.getElementById('pag1').childNodes[3].className = "current";

//Parametros: -
//Return: -
//Resumen: Inicializa los Indices borrando la clase current.
function resetPagination(){

	pagHeaders = document.getElementsByClassName('pagHeader')

	for(i=0;i<pagHeaders.length;i++){
		if(pagHeaders[i].childNodes[3].className == "current"){
			pagHeaders[i].childNodes[3].className = "";
		}
	}
}

//Parametros: -
//Return: -
//Resumen: Inicializa los contenidos, ocultándolos todos.
function resetContent(){

	pagContent = document.getElementsByClassName('pageContent')
	for(i=1;i<pagContent.length+1;i++){
		document.getElementById('page'+i+'Content').style.display = "none";
	}

}


//Parametros: page (Indice de la pagina)
//Return: El ID del contenido relacionado al indice
//Resumen: Coge el ID del indice y lo transforma de manera que obtiene el ID de su contenido.
function getPageIdContent(page){

	id = page.id

	res = id.substring(3);

	res = "page"+res+"Content";
	console.log(res)
	return res;
}

//Parametros: PageHeader(El pageHeader que activa la función - this)
//Return: -
//Resumen: Inicializa los Indices, Inicializa los contenidos. Selecciona el Indice elegido
//		   Busca el contenido del indice y lo muestra.
function pagination(pageIndex){

	//Inicialización
	resetPagination();
	resetContent();

	//Relaciona el Indice con su contenido
	content = getPageIdContent(pageIndex);

	//Marca el Inidice como activo y muestra el contenido.
	pageIndex.childNodes[3].className = "current";
	$('#' + content).show();

	if(pageIndex.id == "pag6"){
		printCheckOut();
	}

}
