console.log('%c [v.up.0.0.1] tables.js', 'color:gray');

function fnAddLinhaTabela(idTabela){
	//var table 		= $('#' + AvaliacoesNotas.props.id.div.notas ).find('table')
	var table 		= $('#' + idTabela );
	var tableRow 	= table.find('tbody tr[data-order=0]');
	var n 			= (table.find('tbody').find('tr:not([data-order="0"])').length + 1)
	var newRow 		= tableRow.clone(false, false).attr('data-order', n);
	newRow.find('[id!=_]').each(function(){
		var id = $(this).attr('id');
		(id == 'contador') ? $(this).html( n ) : ''; 
		if(id !== undefined){
			$(this).attr('id', id + '___' + n);
		}
	});
	newRow.show();
	table.find('tbody').append( newRow );
	
	return n;	
}





function fnBuscaValorCampoPaiFilho(tableName, inputRetorno, inputCondicao, valCondicao, inputCondicaoNegativa, valCondicaoNegativa, retornaId){
console.log('fnBuscaValorCampoPaiFilho: ', tableName, inputRetorno, inputCondicao, valCondicao, inputCondicaoNegativa, valCondicaoNegativa, retornaId);

	var auxRetorno 	= '';
	var flagCondicao= false;
	var Ids 		= [];
	Ids = fnBuscaIdsPaiFilho(tableName, inputRetorno);
	if(inputCondicaoNegativa === undefined) { inputCondicaoNegativa = ''; }
	if(valCondicaoNegativa 	 === undefined) { valCondicaoNegativa   = ''; }

	if( Ids.length > 0 ){
		Ids.forEach(function(id) {
console.log($('#' + inputCondicao + '___' + id).val(), '==', valCondicao, ($('#' + inputCondicao + '___' + id).val() == valCondicao), $('#' + inputCondicaoNegativa + '___' + id).val(), '==', valCondicaoNegativa, ($('#' + inputCondicaoNegativa + '___' + id).val() != valCondicaoNegativa), ' -->', $('#' + inputRetorno + '___' + id).val());

			if((inputCondicao != '') && (inputCondicaoNegativa != '')){
				flagCondicao = (  ($('#' + inputCondicao + '___' + id).val() == valCondicao) && ($('#' + inputCondicaoNegativa + '___' + id).val() != valCondicaoNegativa)  );
				
			} else if(inputCondicao != ''){
				flagCondicao = ($('#' + inputCondicao + '___' + id).val() == valCondicao);
				
			} else if(inputCondicaoNegativa != ''){
				flagCondicao = ($('#' + inputCondicaoNegativa + '___' + id).val() != valCondicaoNegativa);
			}
			
			if(flagCondicao){
				if(auxRetorno == ''){
					if(retornaId){
						auxRetorno = id;
					} else {
						auxRetorno = $('#' + inputRetorno + '___' + id).val();
					}
					fnDebug('OK: [' + auxRetorno + ']', 'c');
				}			
			}
		});
	}
	
	return auxRetorno;
	
//	//mudar para :  https://lodash.com/docs/4.17.4#filter
//	async function loadScript(url) {
//		let response = await fetch(url);
//		let script = await response.text();
//		eval(script);
//	}
//	
//	let scriptUrl = 'https://raw.githubusercontent.com/lodash/lodash/4.17.4/dist/lodash.core.js'
//	loadScript(scriptUrl);
//	
//	_.filter(fluigRaAvaliacao, function(o) { if(o.value == '0000000027'){ return true; } });
}



/** Verifica se existe algum item do PaixFilho em branco .. usando o campo principal */
function fnVerificaCamposVaziosPaiFilho(tableName, Ids, arrInputs){
	var auxAlerta = '';
	Ids.forEach(function(id) {
		arrInputs.forEach(function(input) {
			auxAlerta += fnValidaCampos(input['id'] + '___' +	id,	input['desc'] + ' (' + id + ')');
		});
	});

	return auxAlerta;
}


function fnVerificaDatasPaiFilho(tableName, Ids, arrInputs){
	var auxAlerta = '';
	var dtIni = '';
	var dtFim = '';
	Ids.forEach(function(id) {
		arrInputs.forEach(function(input) {
			dtIni = $(input['id_dtIni'] + '___' + id).val();
			dtFim = $(input['id_dtFim'] + '___' + id).val();
			if(dtIni != ''){
				if(moment(dtIni, "DD/MM/YYYY").isValid() && (dtIni.length == 10)){
					if(dtFim != ''){
						if(moment(dtFim, "DD/MM/YYYY").isValid() && (dtFim.length == 10)){
							if((dtIni != '') && (dtFim != '')){
								auxAlerta += fnValidaDatas2(input['id_dtIni'] + '___' +	id,	'>', input['id_dtFim'] + '___' +	id, "A '" + input['desc_dtIni'] + " (" + id + ")' do evento nÃ£o pode ser MAIOR que a '" + input['desc_dtFim'] + " (" + id + ")' . <br>", 'return');
							}
						} else {
							auxAlerta += "O valor da '" + input['desc_dtFim'] + " (" + id + ")' nÃ£o Ã© vÃ¡lido. <br>";
							$(input['id_dtFim'] + '___' + id).parent( 'div' ).parent( 'div' ).addClass('has-error');
						}
					}
				} else {
					auxAlerta += "O valor da '" + input['desc_dtIni'] + " (" + id + ")' nÃ£o Ã© vÃ¡lido. <br>";
					$(input['id_dtIni'] + '___' + id).parent( 'div' ).parent( 'div' ).addClass('has-error');
				}
			}
		});
	});

	return auxAlerta;
}

/** Verifica se existe algum item duplicado no PaixFilho */
function fnVerificaItensDuplicadosPaiFilho(tableName, Ids, arrInputs){
	var auxAlerta 	= '';
	var indexAux 	= -1; 
	var valIds 		= [];
	$('[id^=' + arrInputs[0]['id'] + '___]').each(function(){ valIds.push($(this).val()); });
	var arrAux = valIds.filter(function(elem, pos, arr) {
		//return arr.indexOf(elem) == pos;  // Busca todos os elementos do array com valores DIFERENTES
		return arr.indexOf(elem) != pos;  // Busca todos os elementos do array com valores IGUAIS
	});

	Ids.forEach(function(id) {
		indexAux = arrAux.indexOf( $('#' +	arrInputs[0]['id'] + '___' + id).val() );
		if(indexAux != -1){
			auxAlerta += " 'EDUCADOR (" + id + ")',";
			arrInputs.forEach(function(input) {
				$('#' +	input['id'] + '___' +	id).parent( 'div' ).addClass('has-error');
			});
		}
	});

	return auxAlerta;
}



function fnOcultaLinhasPaiFilho(tableName, inputPrincipal, inputCondicao, valCondicao, inputCondicaoNegativa, valCondicaoNegativa){
console.log('fnOcultaLinhasPaiFilho: ', tableName, inputPrincipal, inputCondicao, valCondicao, inputCondicaoNegativa, valCondicaoNegativa);

	var auxRetorno 	= '';
	var flagCondicao= false;
	var Ids 		= [];
	Ids = fnBuscaIdsPaiFilho(tableName, inputPrincipal);
	if(inputCondicaoNegativa === undefined) { inputCondicaoNegativa = ''; }
	if(valCondicaoNegativa 	 === undefined) { valCondicaoNegativa   = ''; }

	if( Ids.length > 0 ){
		Ids.forEach(function(id) {
console.log($('#' + inputCondicao + '___' + id).val(), '==', valCondicao, ($('#' + inputCondicao + '___' + id).val() == valCondicao), $('#' + inputCondicaoNegativa + '___' + id).val(), '==', valCondicaoNegativa, ($('#' + inputCondicaoNegativa + '___' + id).val() != valCondicaoNegativa), ' -->', $('#' + inputPrincipal + '___' + id).val());

			if((inputCondicao != '') && (inputCondicaoNegativa != '')){
				flagCondicao = (  ($('#' + inputCondicao + '___' + id).val() == valCondicao) && ($('#' + inputCondicaoNegativa + '___' + id).val() != valCondicaoNegativa)  );
				
			} else if(inputCondicao != ''){
				flagCondicao = ($('#' + inputCondicao + '___' + id).val() == valCondicao);
				
			} else if(inputCondicaoNegativa != ''){
				flagCondicao = ($('#' + inputCondicaoNegativa + '___' + id).val() != valCondicaoNegativa);
			}
			
			if(flagCondicao){
				if(auxRetorno == ''){
					auxRetorno = id;
					fnDebug('OK: [' + auxRetorno + ']', 'c');
				}			
			} else {
				if(_globalDebugOk){
					$('#' + inputPrincipal + '___' + id).parent('div').parent('td').parent('tr').addClass('has-error');
				} else {
					$('#' + inputPrincipal + '___' + id).parent('div').parent('td').parent('tr').hide();
					$('#' + inputPrincipal + '___' + id).parent('div').parent('td').parent('tr').find('input').attr('readonly', 'readonly');
				}
			}
		});
	}
	
	return auxRetorno;
}




function fnBuscaIdsPaiFilho(tableName, input){
	var Ids = [];
	$('table#' + tableName + ' > tbody > tr > td').find('[id^=' + input + '___]').each(function(){
		var aux = $(this).attr('id').toString();
		Ids.push( aux.substr( aux.indexOf("___") + 3 ) );
	});
	//fnDebug(tableName + ' Ids[' + input + ']: ', 'c');
	//fnDebug(Ids, 'c');
	return Ids;
}



/** Adiciona linhas e colunas no PaixFilho do Curso Pretendido 
 * @param qtdRowAdd - Numero de Linha da table PaixFilho
 **/ 
fnTableAddRow = function(tableName, btnName, qtdRowAdd, qtdMaxRows, msgQtdMax, idInput, zoomInput, selectInput, filterName, readonlyInputs, hideThColuns, hideInputsColuns){
	$('button#' + btnName).on('click', function(event){
		var qtdRows = $('table#' + tableName + ' > tbody > tr').length - 1;  // Retorna a quantidade de registros inseridos na tabela e subtrai a linha padrÃ£o que fica escondida
		var newId = true;
		var spanDisplay = "";
		if(qtdMaxRows === undefined){
			qtdMaxRows 	= 3;
			msgQtdMax 	= "";
			idInput 	= "";
			zoomInput 	= "";
			selectInput = "";
			readonlyInputs 	 = "";
			hideThColuns 	 = "";
			hideInputsColuns = "";
		}
		
		if( ((qtdRows + 1) <= qtdMaxRows) || (qtdMaxRows == 0) ){
			wdkAddChild(tableName);
			
			if(newId){
				$('#' + idInput + '___' +  (qtdRows + 1)).val( "" );  // "-1" = Novo registro
				$('#' + selectInput + '___' + (qtdRows + 1)).val( "1" );
				spanDisplay = "show";
			} else {
				$('#' + idInput + '___' +  (qtdRows + 1)).val( "???" ); // Busca no banco
				$('#' + selectInput + '___' + (qtdRows + 1)).val( "???" );
				spanDisplay = "hide";
			}

			zoomSpanDisplay('#' + zoomInput + '___' +  (qtdRows + 1), spanDisplay);  // Somente para registros novos 
			zoomRemoveDiplay('#' + zoomInput + '___' +  (qtdRows + 1), '#' + idInput + '___' + (qtdRows + 1));
			
			fnSelectZoomRow(zoomInput, selectInput, filterName);
			//$('#c_periodo___' +  (qtdRows + 1)).val( fnProximoQuadrimestre() );

			$(readonlyInputs).attr('readonly', 'readonly');
			$(hideThColuns).hide();
			$(hideInputsColuns).parent('div').parent('td').hide();

		} else {
			FLUIGC.toast({
				title: 	 'Alerta: ',
				message: msgQtdMax + ' (' + qtdRows + ').',
				type: 	 'danger'
			});
		}
	});
}

fnSelectZoomRow = function(zoomInput, selectInput, filterName){
	$('[id^="' + selectInput + '___"]').change(function(){
		var id = $(this).attr('id').replace(selectInput + '___', '');
//alert(id + '-' + $('#' + selectInput + '___' + id).val() );

		removeZoomData(zoomInput, id)
		reloadZoomFilterValues(zoomInput + '___' + id, filterName + ',' + $('#' + selectInput + '___' + id).val() );
    });
}

fnTableRowTrash = function(tableName, type){
	if(type == 'hide'){
		$('table#' + tableName + ' > thead > tr > th').first().hide();
		$('table#' + tableName + ' > tbody > tr > td.bpm-mobile-trash-column').hide();
	} else {
		$('table#' + tableName + ' > thead > tr > th').first().show();
		$('table#' + tableName + ' > tbody > tr > td.bpm-mobile-trash-column').show();
	}
}
