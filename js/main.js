let MapaObjeto = {
	intervaloDeValores: [],
	numeroDeItensPorValor: [],
	mediaDosIntervalos: [],
	totalItens: 0,
	fi_percent: [],
	Fi: [],
	Fi_percent: [],
}

function init(){

	MapaObjeto.mediaDosIntervalos    = obterMediaDosValores();
	MapaObjeto.totalItens            = obterTotalDeItens();
	MapaObjeto.fi_percent            = fi_percent();
	MapaObjeto.Fi                    = Fi();
	MapaObjeto.Fi_percent            = Fi_percent();

	render(MapaObjeto);
	
}

function obterMediaDosValores( { intervaloDeValores } = MapaObjeto ){
	
	let mediaDosValores = intervaloDeValores.map( item => {
		let indexValor = item.split('-');
		return ( ( parseFloat(indexValor[0]) + parseFloat(indexValor[1]) )/2);
	})
	return mediaDosValores;
}

function obterTotalDeItens( { numeroDeItensPorValor } = MapaObjeto ){
	return numeroDeItensPorValor.reduce( (total,valor) => total+valor );
}

function fi_percent( { numeroDeItensPorValor,totalItens } = MapaObjeto ){

	let fi_percent = [];
	for(let index = 0; index < numeroDeItensPorValor.length; index++ ){
		fi_percent.push( (numeroDeItensPorValor[index]*100)/totalItens );	
	}
	return fi_percent;

}

function Fi( { numeroDeItensPorValor } = MapaObjeto ){

	let Fi = [];
	let sum = 0;
	for(let index = 0; index < numeroDeItensPorValor.length; index++ ){
		sum += numeroDeItensPorValor[index];
		Fi.push(sum);
	}
	return Fi;	

}

function Fi_percent( { Fi, totalItens } = MapaObjeto ){
	
	let Fi_percent = [];
	for(let index = 0; index < Fi.length; index++ ){
		Fi_percent.push( (Fi[index]*100)/totalItens );	
	}
	return Fi_percent;
}

function render(dataArr){

	let tbodyFrequencia = document.getElementById("tbodyFrequencia");
	let tr_td_html = '';
	for(let index = 0; index < dataArr.intervaloDeValores.length; index++){
		
		tr_td_html += `
		<tr>
			<td>${dataArr.intervaloDeValores[index]}</td>
			<td>${parseFloat(dataArr.mediaDosIntervalos[index]).toFixed(2)}</td>
			<td>${dataArr.numeroDeItensPorValor[index]}</td>
			<td>${parseFloat(dataArr.fi_percent[index]).toFixed(2)} %</td>
			<td>${dataArr.Fi[index]}</td>
			<td>${parseFloat(dataArr.Fi_percent[index]).toFixed(2)} %</td>
		</tr>
		`
	}	
	tbodyFrequencia.innerHTML = tr_td_html;
}

function validarIgualdade( intervaloDeValores, valor ){

	for(let index = 0; index < intervaloDeValores.length; index++){
		if(intervaloDeValores[index]==valor){
			return true;
		}
	}
	return false;

}

function resetarInputs(){
	document.querySelector("#primeiro_valor").value = "";
	document.querySelector("#segundo_valor").value = "";
	document.querySelector("#n_itens").value = "";
	document.querySelector("#primeiro_valor").focus();
}

function entradaDados(){

	let intervaloArr = [];
	let itensArr = [];
	
	el_primeiro_valor = document.querySelector("#primeiro_valor");
	el_segundo_valor  = document.querySelector("#segundo_valor");
	el_n_itens        = document.querySelector("#n_itens");
	
	primeiro_valor = el_primeiro_valor.value;
	segundo_valor  = el_segundo_valor.value;
	n_itens        = el_n_itens.value;
	
	if(primeiro_valor==""){
		alert("Você deve preencher o 1º valor.");
		el_primeiro_valor.focus();
		return false;

	}else if(segundo_valor==""){
		alert("Você deve preencher o 2º valor.");
		el_segundo_valor.focus();
		return false;

	}else if(n_itens==""){
		alert("Você deve preencher o nº de itens.");
		el_n_itens.focus();
		return false;

	}
	
	if(validarIgualdade( MapaObjeto.intervaloDeValores ,`${primeiro_valor} - ${segundo_valor}`)){
		resetarInputs();
		alert("O intervalo de valores informado já consta na tabela.\nTente outros valores.");
		return false;
	}
	
	MapaObjeto.intervaloDeValores.push( `${primeiro_valor} - ${segundo_valor}` );
	MapaObjeto.numeroDeItensPorValor.push( parseFloat(n_itens) );

	init();
	resetarInputs();

}
