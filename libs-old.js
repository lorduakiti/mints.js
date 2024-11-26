

/** ---------------------- FUNÃ‡Ã•ES ANTIGAS ------------------------- */


/** Mascara do campo - CPF/CNPJ, altera dinamicamente
 * @param campo     - Campos do FormulÃ¡rio
 * @param teclapres - Tecla pressionada
 * @returns {Boolean}
 */
function fnMascaraCpfCnpj(field, keyPres) {
	var tecla = keyPres.keyCode;

	if ((tecla < 48 || tecla > 57) && (tecla < 96 || tecla > 105) && tecla != 46 && tecla != 8 && tecla != 9) {
		return false;
	}

	var val = field.value;
	val = val.replace( /\//g, "" );
	val = val.replace( /-/g, "" );
	val = val.replace( /\./g, "" );
	var tam = val.length;

	if ( tam <= 2 ) {
		field.value = val;
	}
	if ( (tam > 2) && (tam <= 5) ) {
		field.value = val.substr( 0, tam - 2 ) + '-' + val.substr( tam - 2, tam );
	}
	if ( (tam >= 6) && (tam <= 8) ) {
		field.value = val.substr( 0, tam - 5 ) + '.' + val.substr( tam - 5, 3 ) + '-' + val.substr( tam - 2, tam );
	}
	if ( (tam >= 9) && (tam <= 11) ) {
		field.value = val.substr( 0, tam - 8 ) + '.' + val.substr( tam - 8, 3 ) + '.' + val.substr( tam - 5, 3 ) + '-' + val.substr( tam - 2, tam );
	}
	if ( (tam == 12) ) {
		field.value = val.substr( tam - 12, 3 ) + '.' + val.substr( tam - 9, 3 ) + '/' + val.substr( tam - 6, 4 ) + '-' + val.substr( tam - 2, tam );
	}
	if ( (tam > 12) && (tam <= 14) ) {
		field.value = val.substr( 0, tam - 12 ) + '.' + val.substr( tam - 12, 3 ) + '.' + val.substr( tam - 9, 3 ) + '/' + val.substr( tam - 6, 4 ) + '-' + val.substr( tam - 2, tam );
	}
	if (tam > 13){ 	
		if (tecla != 8){
			return false;
		}
	}
}


/** FunÃ§Ã£o para validar o CPF
 * @returns {Boolean}
 */
function fnValidaCGC(val) {
	//var cpfCnpj = tipo == 'CPF' ? document.getElementById("f_cgc").value : document.getElementById("j_cgc").value
	
	//var strCPF = $("#cgc").val().replace(/\D/g, '');
	var strCPF = val.replace(/\D/g, '');
	var tipo = strCPF.length > 11 ? 'CNPJ' : 'CPF';
	
	var soma = 0;
	var resto;

	if (strCPF != "" && tipo == 'CPF')  {

		if (strCPF.length != 11 || strCPF == "00000000000"
			|| strCPF == "11111111111" || strCPF == "22222222222"
				|| strCPF == "33333333333" || strCPF == "44444444444"
					|| strCPF == "55555555555" || strCPF == "66666666666"
						|| strCPF == "77777777777" || strCPF == "88888888888"
							|| strCPF == "99999999999") {
			window[_global.objVars.functions].FLUIG.alert.toast('AtenÃ§Ã£o', "O CPF digitado Ã© invÃ¡lido!");
			//document.getElementById("cpfCnpj").focus();
			return false;
		}

		for(var i = 1; i <= 9; i++)
			soma = soma + parseInt(strCPF.substring(i - 1, i))
			* (11 - i);
		resto = (soma * 10) % 11;
		if ((resto == 10) || (resto == 11))
			resto = 0;
		if (resto != parseInt(strCPF.substring(9, 10))) {
			window[_global.objVars.functions].FLUIG.alert.toast('AtenÃ§Ã£o', "O CPF digitado Ã© invÃ¡lido!");
			//document.getElementById("cpfCnpj").focus();
			return false;
		}
		soma = 0;
		for(var i = 1; i <= 10; i++)
			soma = soma + parseInt(strCPF.substring(i - 1, i))
			* (12 - i);
		resto = (soma * 10) % 11;
		if ((resto == 10) || (resto == 11))
			resto = 0;
		if (resto != parseInt(strCPF.substring(10, 11))) {
			window[_global.objVars.functions].FLUIG.alert.toast('AtenÃ§Ã£o', "O CPF digitado Ã© invÃ¡lido!");
			//document.getElementById("cpfCnpj").focus();
			return false;
		}
	} else if (strCPF != "" && tipo == 'CNPJ'){
		var cnpj = strCPF.replace(/[^\d]+/g, '');

		if(cnpj == '') return false;

		if (cnpj.length != 14){
			window[_global.objVars.functions].FLUIG.alert.toast('AtenÃ§Ã£o', "O CNPJ digitado Ã© invÃ¡lido!");
			return false;
		}

		// LINHA 10 - Elimina CNPJs invalidos conhecidos
		if (cnpj == "00000000000000" || 
				cnpj == "11111111111111" || 
				cnpj == "22222222222222" || 
				cnpj == "33333333333333" || 
				cnpj == "44444444444444" || 
				cnpj == "55555555555555" || 
				cnpj == "66666666666666" || 
				cnpj == "77777777777777" || 
				cnpj == "88888888888888" || 
				cnpj == "99999999999999"){
			window[_global.objVars.functions].FLUIG.alert.toast('AtenÃ§Ã£o', "O CNPJ digitado Ã© invÃ¡lido!");
			return false;
		}

		tamanho = cnpj.length - 2
		numeros = cnpj.substring(0,tamanho);
		digitos = cnpj.substring(tamanho);
		soma = 0;
		pos = tamanho - 7;
		for(var i = tamanho; i >= 1; i--) {
			soma += numeros.charAt(tamanho - i) * pos--;
			if (pos < 2)
				pos = 9;
		}
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(0)){
			window[_global.objVars.functions].FLUIG.alert.toast('AtenÃ§Ã£o', "O CNPJ digitado Ã© invÃ¡lido!");
			return false;
		}

		tamanho = tamanho + 1;
		numeros = cnpj.substring(0,tamanho);
		soma = 0;
		pos = tamanho - 7;
		for(var i = tamanho; i >= 1; i--) {
			soma += numeros.charAt(tamanho - i) * pos--;
			if (pos < 2)
				pos = 9;
		}
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(1)){
			window[_global.objVars.functions].FLUIG.alert.toast('AtenÃ§Ã£o', "O CNPJ digitado Ã© invÃ¡lido!");
			return false;
		}
	} else {
		return false
	}
	
	return true;
}



/**
 * Mascara do campo - CPF/CNPJ, altera dinamicamente
 * @param campo     - Campos do FormulÃ¡rio
 * @param teclapres - Tecla pressionada
 * @returns {Boolean}
 */
function MascaraCpfCnpj(campo,teclapres) {
	var tecla = teclapres.keyCode;

	if ((tecla < 48 || tecla > 57) && (tecla < 96 || tecla > 105) && tecla != 46 && tecla != 8 && tecla != 9) {
		return false;
	}

	var vr = campo.value;
	vr = vr.replace( /\//g, "" );
	vr = vr.replace( /-/g, "" );
	vr = vr.replace( /\./g, "" );
	var tam = vr.length;

	if ( tam <= 2 ) {
		campo.value = vr;
	}
	if ( (tam > 2) && (tam <= 5) ) {
		campo.value = vr.substr( 0, tam - 2 ) + '-' + vr.substr( tam - 2, tam );
	}
	if ( (tam >= 6) && (tam <= 8) ) {
		campo.value = vr.substr( 0, tam - 5 ) + '.' + vr.substr( tam - 5, 3 ) + '-' + vr.substr( tam - 2, tam );
	}
	if ( (tam >= 9) && (tam <= 11) ) {
		campo.value = vr.substr( 0, tam - 8 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + '-' + vr.substr( tam - 2, tam );
	}
	if ( (tam == 12) ) {
		campo.value = vr.substr( tam - 12, 3 ) + '.' + vr.substr( tam - 9, 3 ) + '/' + vr.substr( tam - 6, 4 ) + '-' + vr.substr( tam - 2, tam );
	}
	if ( (tam > 12) && (tam <= 14) ) {
		campo.value = vr.substr( 0, tam - 12 ) + '.' + vr.substr( tam - 12, 3 ) + '.' + vr.substr( tam - 9, 3 ) + '/' + vr.substr( tam - 6, 4 ) + '-' + vr.substr( tam - 2, tam );
	}
	if (tam > 13){ 	
		if (tecla != 8){
			return false
		}
	}
}



function criaElementoXML(campo, valor){	
	if(campo == 'CEP'){
		var valor = valor.replace(/[^\d]+/g, '');
	} 

	if ((valor !== null) && (valor !== "")){
		var element = "<"+campo+">"+valor+"</"+ campo + "> ";
		//console.log("Elemento XML: " + element);
		return element;
	}else{
		return "";
	}
}

function NaoEncontrado(){
	
	$("#fsSolicitante").fadeOut();
	$("#divCollapseJuridica").fadeIn();
	$("#cgc").val($("#cpfCnpj").val());
	
	var valor = $("#cgc").val().replace(/\D/g, '');
	if(valor.length > 11){
		$("#cgc").mask("99.999.999/9999-99"); 
	}else{
		$("#cgc").mask("999.999.999-99");
	}
	
	//document.getElementById("tipoPessoa").value = "J";
	$("#tipoPessoa").prop("diabled", false);
	document.getElementById("pessoaFisOuJur").value = "F";
	document.getElementById("cadastrarCpf").value = "nao";
	document.getElementById("codCfo").value = "-1";
	document.getElementById("tipoProcesso").value = "incluir";
	$("#fsSolicitante").attr('disabled', 'true');
	$("#fsBancos").attr('disabled', 'true');

}

function fnValidaDt(dt, format){
	if(dt.length >= 10){
		format = (format === undefined) ? 'DD/MM/YYYY' : format ;
		return moment(dt, format).isValid();
	} else {
		return false;
	}
}

function fnAjustaData(dt, hr, tipoIn, tipoOut) {

	if(dt == ""){
		return "";
	}
	
	var dtAux = "";
	var dtArr = [];
	switch(tipoIn) {
		case "RM":
			//2016-12-31 00:00:00.000
			dtArr = dt.substring(0, 10).split("-");
			
			if(tipoOut == "RM"){
				dtAux = dt;
				
			} else if(tipoOut == "FLUIG"){
				dtAux = dtArr[2] + "/" + dtArr[1]  + "/" + dtArr[0];
				
			} else {
				dtAux = dt; 
			}
		    break;
		case "FLUIG":
			//31/12/2016 00:00:00
			var dtArr = dt.substring(0, 10).split("/");
	
			if(tipoOut == "FLUIG"){
				dtAux = dt;
				
			} else if(tipoOut == "RM"){
				dtAux = dtArr[2] + "-" + dtArr[1]  + "-" + dtArr[0];
				
			} else if(tipoOut == "JS"){
				dtAux = dtArr[2] + "-" + dtArr[1]  + "-" + dtArr[0];
				
			} else {
				dtAux = dt; 
			}
		    break;
		default:
		    dtAux = dt;
	}
	if((hr != '') || (hr !== undefined)){
		dtAux += hr;
	}
	
	return dtAux;
}

function fnValidaDatas(inputDtIni, tipoValidacao, inputDtFim, msg, retorno){
	console.log('fnValidaDatas: ', inputDtIni, $(inputDtIni).val(), tipoValidacao, inputDtFim, $(inputDtFim).val(), "[" + msg + "]", retorno);

	var flagDtErro 	= false;
	var dtIni		= $(inputDtIni).val();
	var dtFim		= $(inputDtFim).val();
//	if(tipoValidacao == '='){
//	} else {
//	}
	$(inputDtFim).parent( 'div' ).parent( 'div' ).removeClass('has-error');
	
	
	////if($('#dtEntrega').val() != "" && $('#dtEntrega').val() != null){
	//if(($(inputDtIni).val() != "" && $(inputDtIni).val() != null) && ($(inputDtFim).val() != "" && $(inputDtFim).val() != null)){
	if(((dtIni != "") && (dtIni != null)) && ((dtFim != "") && (dtFim != null))){
		/** Variaveis recebem os valore formatado pela funÃ§Ã£o Date() para comparaÃ§Ã£o **/
		//var arrDt_1 = $(inputDtIni).val().split("/");
		var arrDt_1 = dtIni.split("/");
		var dt_1 = new Date(arrDt_1[2], arrDt_1[1] - 1, arrDt_1[0]);
		
		//var arrDt_2 = $(inputDtFim).val().split("/");
		var arrDt_2 = dtFim.split("/");
		var dt_2 = new Date(arrDt_2[2], arrDt_2[1] - 1, arrDt_2[0]);
		
		/** ComparaÃ§Ã£o e validaÃ§Ã£o das datas dos campo de Data da Retirada e Data Prevista para Entrega **/
		switch( tipoValidacao ) {
			case '=':
				if(dt_1.getTime() == dt_2.getTime()) {
					msg = (msg === undefined) ? "A data informada deve ser IGUAL data atual ou a data inicial!" : msg ;
					flagDtErro = true;
				}
				break;
			case '<':
				if(dt_1.getTime() < dt_2.getTime()) {
					msg = (msg === undefined) ? "A data informada deve ser MENOR do que a data atual ou a data inicial!" : msg ;
					flagDtErro = true;
				}
				break;
			case '>':
			default:
				if(dt_1.getTime() > dt_2.getTime()) {
					msg = (msg === undefined) ? "A data informada deve ser MAIOR do que a data atual ou a data inicial!" : msg ;
					flagDtErro = true;
				}
		}
	} else {
		flagDtErro = true;
	}
	
	if(flagDtErro){
		console.log("Retorna ERRO");
		$(inputDtFim).val("");
		$(inputDtFim).parent( 'div' ).parent( 'div' ).addClass('has-error');
		
		if(retorno == 'return'){
			return msg;
		} else {
			fnMsgAlerta('Data Incorreta', msg);
		}
	} else {
		return "";
	}
}


function fnValidaCampos(inputName, desc, tipoValidacao, valCompare, inputRetorno){
	var flagErro = false;
	var inputVal = $('#' + inputName).val();

////console.log('fnValidaCampos: [' + inputVal + ']' + tipoValidacao + '[' + valCompare + ']');
//	if(tipoValidacao == "="){
//		if((inputName.search(/tel/i) >= 0) || (inputName.search(/cel/i) >= 0)){
//			inputVal = inputVal.trim().replace(/\D/g, '');
//			valCompare = valCompare.trim().replace(/\D/g, '');
//		}
////console.log('[' + inputVal + ']=[' + valCompare + ']');
//
//		if(inputVal == valCompare){
////			$('#' + inputName).parent( 'div' ).addClass('has-error');
//			flagErro = true;
//		} else {
//			flagErro = false;
//		}
//	} else if(tipoValidacao == "<>"){
//		if((inputName.search(/tel/i) >= 0) || (inputName.search(/cel/i) >= 0)){
//			inputVal = inputVal.trim().replace(/\D/g, '');
//			valCompare = valCompare.trim().replace(/\D/g, '');
//		}
////console.log('[' + inputVal + ']<>[' + valCompare + ']');
//
//		if(inputVal != valCompare){
////			$('#' + inputName).parent( 'div' ).addClass('has-error');
//			flagErro = true;
//		} else {
//			flagErro = false;
//		}
//	} else if(tipoValidacao == "<"){
////console.log('[' + inputVal + ']<[' + valCompare + ']');
//
//		if(parseInt(inputVal, 10) < parseInt(valCompare, 10)){
////			$('#' + inputName).parent( 'div' ).addClass('has-error');
//			flagErro = true;
//		} else {
//			flagErro = false;
//		}
//	} else if(tipoValidacao == ">"){
////console.log('[' + inputVal + ']>[' + valCompare + ']');
//
//		if(parseInt(inputVal, 10) > parseInt(valCompare, 10)){
////			$('#' + inputName).parent( 'div' ).addClass('has-error');
//			flagErro = true;
//		} else {
//			flagErro = false;
//		}
//	} else {
//		var zeroYes;
//		(tipoValidacao == "0") ?  zeroYes = true : zeroYes = false ; 
//		if ( isStringNullOrWhiteSpace( inputVal, zeroYes ) ){
////	//		throw 'Favor preencher o campo ' + descricao; 
////	//		return false;
////			$('#' + inputName).parent( 'div' ).addClass('has-error');
////			$('#' + inputRetorno).parent( 'div' ).addClass('has-error');
//			flagErro = true;
//		} else {
//			flagErro = false;
//		}
//	}
	
    if((tipoValidacao.search(/\*|\,/g) > -1)){
        if(tipoValidacao.indexOf('*') > -1){
            inputVal   = parseInt(inputVal, 10);
            valCompare = parseInt(valCompare, 10);

        } else if(tipoValidacao.indexOf(',') > -1){
            inputVal   = parseFloat( parseFloat( inputVal.toString().replace(',','.') ).toFixed(2) );
            valCompare = parseFloat( parseFloat( valCompare.toString().replace(',','.') ).toFixed(2) );
        }

        inputVal 	= (isNaN(inputVal)) ? 	0 : inputVal ;
        valCompare  = (isNaN(valCompare)) ? 0 : valCompare ;
    }
				

	flagErro = false;
	switch( tipoValidacao ){
		case '=':
		case '=*':
		case '=,':
		case '<>':
		case '<>*':
		case '<>,':
			if((inputName.search(/tel/i) >= 0) || (inputName.search(/cel/i) >= 0)){
				inputVal   = inputVal.trim().replace(/\D/g, '');
				valCompare = valCompare.trim().replace(/\D/g, '');
			}
			
			if(tipoValidacao.indexOf('=') > -1){
				flagErro = (inputVal == valCompare) ?  true  :  false ;
				
			} else if(tipoValidacao.indexOf('<>') > -1){
				flagErro = (inputVal != valCompare) ?  true  :  false ;
			}
			break;
		case '<':
		case '<*':
		case '<,':
			flagErro = (inputVal < valCompare) ?  true  :  false ;
			break;			
		case '>':
		case '>*':
		case '>,':
//console.log(tipoValidacao, inputVal, typeof(inputVal), valCompare, typeof(valCompare));
			flagErro = (inputVal > valCompare) ?  true  :  false ;
			break;
	    default:
	    	var zeroYes;
			zeroYes = (tipoValidacao == "0") ?  true : false ; 
			if ( isStringNullOrWhiteSpace( inputVal, zeroYes ) ){
				flagErro = true;
			}
	}

	if(flagErro){
		if((inputRetorno != '') && (inputRetorno !== undefined)){
			$('#' + inputRetorno).parent( 'div' ).addClass('has-error');
		} else {
			$('#' + inputName).parent( 'div' ).addClass('has-error');
		}
		if((tipoValidacao == '') || (tipoValidacao === undefined)){
			desc = " '" + desc + "',";
		} else {
			desc = " '" + desc + "'";
		}
		//return desc;
		
	} else {
		//return "";
		desc = '';
	}
//console.log('fnValidaCampos: [' + inputVal + ']' + tipoValidacao + '[' + valCompare + ']', flagErro, desc);
	return desc;
}




//Check is string null or empty
isStringNullOrEmpty = function (val, zeroYes) {
  switch (val) {
      case "":
      case null:
      case false:
      case undefined:
      case typeof this === 'undefined':
          return true;
      case 0:
      case "0":
      	if(zeroYes){
      		return false;
      	} else {
      		return true;
      	}
      default: 
      	return false;
  }
}

//Check is string null or whitespace
isStringNullOrWhiteSpace = function (val, zeroYes) {
  return this.isStringNullOrEmpty(val, zeroYes) || val.trim().replace(/\s/g, "") === '';
}

//If string is null or empty then return Null or else original value
nullIfStringNullOrEmpty = function (val) {
  if (this.isStringNullOrEmpty(val)) {
      return null;
  }
  return val;
}


//ValidaTecla = function(e, campoConfirmar){
fnValidaTecla = function(e, campoConfirmar){
	
	var vKey = 86;
	var cKey = 67;
	
	if(e.ctrlKey) {
		if(e.keyCode == vKey || e.keyCode == cKey){
			e.preventDefault();
		}
	}	
}


function fnArraySimilarItens(array) {
	//Array filtrado removendo os itens duplicados. Se sÃ³ sobrou um elemento, todos sÃ£o iguais. Se o tamanho do array for o mesmo, todos sÃ£o diferentes.	
	var filtrado = array.filter(function(elem, pos, arr) {
		return arr.indexOf(elem) == pos;
	});
	
	// Retorna TRUE caso todos os elementos do array sejam iguais, e FALSE caso tenham elementos diferentes
	return filtrado.length === 1 || filtrado.length === array.length;  
}


function fnRetornoErro(erro, tipoRetorno){
	var msgErro = "";
	if (erro == null)	{
		erro = "Erro desconhecido: verifique o log do FLUIG.";
		msgErro = erro;
	} else {
		if(typeof(erro) == 'object'){
			msgErro = "(" + erro.lineNumber + ") - Erro:" + erro.message;
		} else {
			msgErro = erro;
		}
	}	
	
	if((tipoRetorno == "alerta") || (tipoRetorno == "a")){
////		FLUIGC.modal({
////			title: "ERRO",
////			content: msgErro,
////			id: 'fluig-modal',
////			size: 'larger',
////			actions: [{
////				'label': 'Ok',
////				'bind': 'data-open-modal',
////				'autoClose': true
////					}]
////		}, function(err, data) {
////			if(err) {
////				//alert('SIM');
////			} else {
////				//alert('NÃƒO');
////			}
////		});
//		fnMsgAlerta("ERRO", msgErro);
		fnDebug(msgErro, 'a');
		
	} else if((tipoRetorno == "console") || (tipoRetorno == "c")){
		fnDebug(msgErro, 'c');
		
	} else {
		return msgErro;
	}
}


/** Colocar todos letras iniciais maiusculas, e pronone entre de junÃ§Ã£o minusculos
 * @param 
 **/ 
fnCapitalizaNome = function(nome){
	var valor = nome.toLowerCase();
	if(valor.length > 1){
		var capitalize = '';
		for(var i = 0; i < valor.length; i++){
			capitalize = (valor[i - 1] == ' ' || i == 0)? capitalize + valor[i].toUpperCase(): capitalize + valor[i];
		}
		capitalize = capitalize.replace(/( (Da|Das|E|De|Do|Dos|Para|Na|Nas|No|Nos) )/gi,function(m){
			return m.toLowerCase();
		});
		return capitalize;
	}
}


/** Calcula a idade conforme a Data de Nascimento
 */
function fnCalculaIdade(dtNascimento, idade){
//fnDebug("fnCalculaIdade: " dtNascimento, 'c');
	
	var auxIdade = idade;
	//console.log("idade: " + idade)
	if(dtNascimento != ''){
		var d = new Date;
		var anoAtual = d.getFullYear();
		//console.log("anoAtual: " + anoAtual)
		var mesAtual = d.getMonth() + 1;
		//console.log("mesAtual: " + mesAtual)
		var diaAtual = d.getDate();
		//console.log("diaAtual: " + diaAtual)
		var diaAniversario = dtNascimento.substring(0, 2);
		//console.log("diaAniversario: " + diaAtual)
		var mesAniversario = dtNascimento.substring(3, 5);
		//console.log("mesAniversario: " + mesAniversario)
		var anoAniversario = dtNascimento.substring(6, 10);
		//console.log("anoAniversario: " + anoAniversario)
	
		auxIdade = anoAtual - anoAniversario;
		//console.log("idade: " + idade)
	
		if (mesAtual < mesAniversario || (mesAtual == mesAniversario && diaAtual < diaAniversario)) {
			auxIdade--;
		}
	
		if(idade.value < 0){
			auxIdade = 0;
		}
	} else {
		auxIdade = "";
	}
	return auxIdade;
}



function fnDebug(obj, tipo){
	//if(_global.debug == false){
//	if(!_global.debug){
//		return;
//	};
	
	switch(tipo){
		case 'a':
		case 'alert':
			alert( obj );
			break;
		case 'h':
		case 'html':
			$('#divDebugId').append( "<hr>" );
			$('#divDebugId').append( obj );
			break;
		case 'j':
		case 'json':
			$('#divDebugId').append( "<hr>" );
			$('#divDebugId').append( JSON.stringify( obj ) );
			break;
		case 'c':
		case 'console':
			//console.debug( obj );
			console.log( obj );
			break;
		case 'm':
		case 'msg':
			fnMsgAlertaTopo('danger', obj)
			break;
		case 't':
		case 'toast':
		Â Â Â Â var toast = FLUIGC.toast({
				title: 	 'Debug: ',
				message: obj,
				type: 	 'danger'
			});
			break;
		case 'n':
		case 'notify':
			var notification = FLUIGC.notification({
			    title: 'Debug Notification',
			    body: obj,
			    tag: new Date().getTime(),
			    icon: 'images/user_picture.png'
			});
			notification.show();
			break;
		default:
			alert(obj);
	}
	
}



/** -------------------------------------------------------------------------------------------------------------- **
 * FunÃ§Ã£o Mensagem de alerta cusomizado fluig
 * @param titulo
 * @param mensagem
 ** -------------------------------------------------------------------------------------------------------------- **
 */
function fnMsgAlertaFlutuante(titulo, msg, tipo){
	//fnDebug(titulo + ": " + msg, 'c');

	if(tipo === undefined){ tipo = 'danger'; }
	
	var myModal = FLUIGC.toast({
		title: 	 titulo,
		message: msg,
		type: 	 tipo
	});
	
	return myModal;
}

function fnMsgAlerta(titulo, msg){
	//fnDebug(titulo + ": " + msg, 'c');
	var myModal = fnMsgAlertaNao(titulo, msg, 'fluig-modal', 'larger');
	return myModal;
}


function fnMsgAlertaNao(titulo, msg, id, size, labelYes, labelNo, actionsYes, actionsNo, autoClose){
	// Chamada de popup de aviso.
	id 			= (id  		 == ''  ||  id  	  === undefined) ?  'fluig-modal' 	: id ;
	size 		= (size  	 == ''  ||  size  	  === undefined) ?  'larger' 	  	: size ;
	labelYes 	= (labelYes  == ''  ||  labelYes  === undefined) ?  'Sim' 			: labelYes ;
	labelNo  	= (labelNo   == ''  ||  labelNo   === undefined) ?  '?' 			: labelNo ;
	autoClose  	= (autoClose == ''  ||  autoClose === undefined) ?  true  			: autoClose ;
	
	var funs = null;
	if((typeof(window[actionsYes]) == 'function')  ||  (typeof(window[actionsNo]) == 'function')){
		funs = function(result, el, ev) {
			if(result){
				(typeof(window[actionsYes]) == 'function') ?  window[actionsYes]() : '' ;
			} else {
				(typeof(window[actionsNo])  == 'function') ?  window[actionsNo]()  : '' ;
			}
		}
	}

	var myModal = new Object();
	var configs = new Object();
	if(labelNo == '?'){
		configs = {
			title:    titulo,
			content:  msg,
			id: 	  id,
			size: 	  size,
			actions: [{
				'label': 	 labelYes,
				'bind': 	 'data-open-modal',
				'autoClose': autoClose
			}]
		}
		
		myModal = FLUIGC.modal(configs, funs);

	} else {
		configs = {
			title:    titulo,
			message:  msg,
			id: 	  id,
			size: 	  size,
			labelYes: labelYes,
			labelNo:  labelNo
		}
		
		myModal = FLUIGC.message.confirm(configs, funs);
	}
	
	return myModal;
}



function fnMsgAlertaTopo(tipo, msg, divId, colSize){

	if((colSize == '') || (colSize === undefined)){
		colSize = '4';
	}
	var msgAux = "" +
	"<div class='col-md-" + colSize + " col-xs-8 col-md-offset-" + ((12 - colSize)/2) + " col-xs-offset-2'>" +
	"	<div class='paragraph-is-required system-message-information alert alert-" + tipo + " text-center' role='alert'>" +
	"	<button type='button' class='close' data-dismiss='alert'>" +
	"		<span aria-hidden='true'>Ã—</span>" +
	"		<span class='sr-only'>Fechar</span>" +
	"	</button>" + 
	"   " + msg + 
	"	</div>" +
	"</div>";
	
	if((divId == '') || (divId === undefined)){
		divId = '#divCabecalhoForm';
	}
	$(divId).append( msgAux );
}



function MensagemAlerta(titulo, msg, autoClose){

	var myModal = fnMsgAlertaNao(titulo, msg, 'fluig-modal', 'larger');
	
	$(".modal-title").text(titulo);
	$(".modal-body").text(msg);
	
	return myModal;
}
