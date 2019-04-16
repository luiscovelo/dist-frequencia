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

	MapaObjeto.intervaloDeValores    = obterValores();
	MapaObjeto.numeroDeItensPorValor = obterItens();
	MapaObjeto.mediaDosIntervalos    = obterMediaDosValores();
	MapaObjeto.totalItens            = obterTotalDeItens();
	MapaObjeto.fi_percent            = fi_percent();
	MapaObjeto.Fi                    = Fi();
	MapaObjeto.Fi_percent            = Fi_percent();

	render(MapaObjeto);
	
}

init();

function obterValores(){

	let valores = [
		'100 - 200',
		'200 - 300',
		'300 - 400',
		'400 - 500'
	];
	return valores;

}

function obterItens(){

	let itens = [10,4,3,3];
	return itens;

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
	for(let index = 0; index < dataArr.intervaloDeValores.length; index++){
		
		let tr_td_html = `
			<td>${dataArr.intervaloDeValores[index]}</td>
			<td>${dataArr.mediaDosIntervalos[index]}</td>
			<td>${dataArr.numeroDeItensPorValor[index]}</td>
			<td>${dataArr.fi_percent[index]} %</td>
			<td>${dataArr.Fi[index]}</td>
			<td>${dataArr.Fi_percent[index]} %</td>
		`
		tbodyFrequencia.innerHTML += tr_td_html;
	}	

}
