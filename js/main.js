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
	MapaObjeto.mediaDosIntervalos    = obterMediaDosValores(MapaObjeto.intervaloDeValores);
	MapaObjeto.totalItens            = obterTotalDeItens(MapaObjeto.numeroDeItensPorValor);
	MapaObjeto.fi_percent            = fi_percent(MapaObjeto.numeroDeItensPorValor, MapaObjeto.totalItens);
	MapaObjeto.Fi                    = Fi(MapaObjeto.numeroDeItensPorValor);
	MapaObjeto.Fi_percent            = Fi_percent(MapaObjeto.Fi,MapaObjeto.totalItens);

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

function obterMediaDosValores(dataArr){
	
	let mediaDosValores = dataArr.map( item => {
		let indexValor = item.split('-');
		return ( ( parseFloat(indexValor[0]) + parseFloat(indexValor[1]) )/2);
	})
	return mediaDosValores;
}

function obterTotalDeItens(dataArr){
	return dataArr.reduce( (total,valor) => total+valor );
}

function fi_percent(dataArr,totalItens){
	
	let fi_percent = [];
	for(let index = 0; index < dataArr.length; index++ ){
		fi_percent.push( (dataArr[index]*100)/totalItens );	
	}
	return fi_percent;

}

function Fi(dataArr){

	let Fi = [];
	for(let index = 0; index < dataArr.length; index++ ){
		
		if(index==0){
			Fi.push(dataArr[index]);
		}else{
			let sum = dataArr[index];
			for(let indexFor = 0; indexFor < index; indexFor++) {
				sum += dataArr[indexFor];
			}
			Fi.push(sum);
		}

	}
	return Fi;	

}

function Fi_percent(dataArr, totalItens){
	
	let Fi_percent = [];
	for(let index = 0; index < dataArr.length; index++ ){
		Fi_percent.push( (dataArr[index]*100)/totalItens );	
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
