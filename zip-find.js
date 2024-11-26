console.log('%c [v.up.0.0.1] zip-find.js', 'color:gray');


var inputsCEP = [];
//inputsCEP['cep'] = $('#estado, #rua, #bairro, #complemento, #codigoMunicipio, #municipio');
inputsCEP['numCep'] = $('#selUF, #txtRua, #txtBairro, #txtComplemento, #codMunicipio, #selMunicipio, #txtMunicipio');

//var inputsRUA = $('#cep, #bairro, #rua');


function limpa_formulÃ¡rio_cep(campoCEP, alerta) {
//	if (alerta !== undefined) {
//		alert(alerta);
//	}
//	inputsCEP.val('');
	
	if (alerta === undefined) {
		alerta = "ValidaÃ§Ã£o de CEP";
	}
	$('#' + campoCEP).parent('div').removeClass('has-success');
	$('#' + campoCEP).parent('div').addClass('has-error');
	
	FLUIGC.message.confirm({
		title:   alerta,
		message: 'Deseja limpar os campos relativos ao CEP automaticamente (RUA, BAIRRO, COMPLEMENTO, MUNICÃPIO) ?',
		labelYes: 'SIM',
		labelNo:  'NÃƒO'
	}, function(result, el, ev) {
		if(result){
			inputsCEP[campoCEP].val('');
			//fnCEPPopulaMunicipio( campoCEP );
		} else {
//alert('NÃƒO');
		}
	});
	
}

function get(url, campoCEP) {

	$.get(url, function(data) {

		if (!("erro" in data)) {

			if (Object.prototype.toString.call(data) === '[object Array]') {
				var data = data[0];
			}
			
			var e = new Object();
			e = {
				id: 	'numCep',
				cep: 	'numCep',
				rua: 	'txtRua',
				complemento: 	'txtComplemento',
				bairro: 		'txtBairro',
				estado: 		'selUF',
				municipio: 		'txtMunicipio',
				codMunicipio: 	'codMunicipio',
				selMunicipio: 	'selMunicipio',
				zoomMunicipio: 	'zoomMunicipio',
			}
			
			$.each(data, function(nome, info) {

				if(campoCEP == e['cep']){
					if(nome == 'cep'){
						$('#' + e.cep).val(info);
					}else if(nome == 'logradouro'){
						$('#' + e.rua).val(info);
					}else if(nome == 'complemento'){
						$('#' + e.complemento).val(info);
					}else if(nome == 'bairro'){
						$('#' + e.bairro).val(info);
					}else if(nome == 'uf'){
						$('#' + e.estado).val(info);
					}else if(nome == 'localidade'){
						$('#' + e.municipio).val(info);
					}else if(nome == 'ibge'){    // Retorna o CODMUNICIPIO da tabela GMUNICIPIO
						$('#' + e.codMunicipio).val(info.substring(2,7)); 
						$('#' + e.selMunicipio).val(info.substring(2,7)); 
					}
//					//fnCEPPopulaMunicipio( campoCEP );
//					fnCEPPopulaMunicipio( e['cep'] );
					//$('#' + campoCEP).parent('div').removeClass('has-error');
					//$('#' + campoCEP).parent('div').addClass('has-success');	
				//} else if(campoCEP == 'cep'){
				}
			});
		} else {
			limpa_formulÃ¡rio_cep(campoCEP, "CEP nÃ£o encontrado.");
		}

	});
}

//Digitando CEP
/*
$('#cep').on('blur', function(e) {
	var cep = $('#cep').val().replace(/\D/g, '');

	if (cep !== "" && validacep.test(cep)) {
		inputsCEP.val('...');
		get('https://viacep.com.br/ws/' + cep + '/json/');

	} else {
		limpa_formulÃ¡rio_cep(cep == "" ? undefined : "Formato de CEP invÃ¡lido.");
	}
})
*/

function ConsultaCep(campoCEP){
	var cep = $('#' + campoCEP).val().replace(/\D/g, '');
	var validacep = /^[0-9]{8}$/;
	
console.log('ConsultaCep: ', campoCEP, cep);
	if (cep !== "" && validacep.test(cep)) {
		//inputsCEP.val('...');
		get('https://viacep.com.br/ws/' + cep + '/json/', campoCEP);
	} else {	
		limpa_formulÃ¡rio_cep(campoCEP, (cep == "" ? undefined : "Formato de CEP invÃ¡lido."));
	}	
}



fnCEPPopulaMunicipio = function(inputId){
	var inputZoom = '';
	var itemSelected = {};
	var descMunicipio = "";
	if(inputId == 'cep'){
		inputZoom = 'codMunicipio';
		descMunicipio = $("#municipio").val();
		itemSelected = {
				'cdEstado':	$("#estado").val(),
				'cdMunicipio': $("#codigoMunicipio").val(),
				'nmMunicipio': $("#municipio").val()
		};
	} 
	removeZoomData(inputZoom);
	if(descMunicipio != ""){
		setZoomData(inputZoom, itemSelected);
		zoomSpanDisplay('#' + inputZoom, 'hide');
	} else {
		zoomSpanDisplay('#' + inputZoom, 'show');
	}
}
