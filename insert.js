console.log('%c [v.up.0.0.1] insert.js', 'color:gray');



function MontaXMLJuridica(){

	var fieldsXml = ""
	
	fieldsXml += "<FinCFOBR>";
		fieldsXml += "<FCFO>";
		
			fieldsXml += criaElementoXML("CODCOLIGADA",				document.getElementById('codColigada').value);
			fieldsXml += criaElementoXML("CODCFO",                  document.getElementById("codCfo").value);
		
			fieldsXml += criaElementoXML("CGCCFO",                  document.getElementById("numCnpj").value);                   
			fieldsXml += criaElementoXML("NOME",                    document.getElementById("txtNome").value);                  
			fieldsXml += criaElementoXML("TIPOBAIRRO",              document.getElementById("selZona").value);                
//			fieldsXml += criaElementoXML("CAMPOLIVRE",              document.getElementById("txtObs").value);                
			fieldsXml += criaElementoXML("CEP",                     document.getElementById("numCep").value);	
			fieldsXml += criaElementoXML("RUA",                     document.getElementById("txtRua").value);                  
			fieldsXml += criaElementoXML("NUMERO",                  document.getElementById("numRua").value);                
			fieldsXml += criaElementoXML("COMPLEMENTO",             document.getElementById("txtComplemento").value);           
			fieldsXml += criaElementoXML("BAIRRO",                  document.getElementById("txtBairro").value);                
			fieldsXml += criaElementoXML("CODETD",                  document.getElementById("selUF").value);                
			fieldsXml += criaElementoXML("CODMUNICIPIO",            document.getElementById("selMunicipio").value);		
			fieldsXml += criaElementoXML("CIDADE",                  document.getElementById("txtMunicipio").value);             
			fieldsXml += criaElementoXML("TELEFONE",                document.getElementById("numTel").value);
			fieldsXml += criaElementoXML("TELEX",                   document.getElementById("numCel").value);
			fieldsXml += criaElementoXML("EMAIL",                   document.getElementById("txtEmail").value);                
			fieldsXml += criaElementoXML("CONTATO",          		document.getElementById("txtContato").value);             
		
		fieldsXml += "</FCFO>";
		fieldsXml += "<FCFOCOMPL>";
		
			fieldsXml += criaElementoXML("CODCOLIGADA",				document.getElementById('codColigada').value);
			fieldsXml += criaElementoXML("CODCFO",                  document.getElementById("codCfo").value);
	
			fieldsXml += criaElementoXML("CODINEP",               	document.getElementById("numInep").value);
			fieldsXml += criaElementoXML("REDEESCOLA",     		  	document.getElementById("selRedeEscola").value);     
			fieldsXml += criaElementoXML("QTDEFUNC",             	document.getElementById("numFuncionarios").value);         
			fieldsXml += criaElementoXML("QTDEPROF",              	document.getElementById("numProfessores").value);         
			fieldsXml += criaElementoXML("QTDEALUNOS",            	document.getElementById("numAlunos").value);         
			
		fieldsXml += "</FCFOCOMPL>";
	fieldsXml += "</FinCFOBR>";
	//console.log("fieldsXml: " + fieldsXml);

	if (GravarRMPessoaJuridica(fieldsXml)){
		return true;
	}else{
		return false;
	}
}


function GravarRMPessoaJuridica(fieldsXml){

//	var c1 = DatasetFactory.createConstraint('fieldsXml', fieldsXml, fieldsXml, ConstraintType.MUST);
//	var constraints = new Array(c1);
//	var gravaRM = DatasetFactory.getDataset("rm_fincfodatabr_saverecordauth", null,constraints, null);
	var c1 = DatasetPublic.createConstraint('fieldsXml', fieldsXml, null, ConstraintTypePublic.MUST);
	var gravaRM = DatasetPublic.getDataset("rm_fincfodatabr_saverecordauth", null, [c1], null);
	//console.log(gravaRM)
	if (gravaRM.values.toString()){
		//console.log("gravaRM.values[0].ERROR: " + gravaRM.values[0].ERROR)
		if(gravaRM.values[0].ERROR != '' && gravaRM.values[0].ERROR  != null){
			MensagemAlerta("AtenÃ§Ã£o",'<h3>Erro para gravar o registro, contate o Administrador</h3></h3><p>'+gravaRM.values[0].ERROR+'</p>');
			return false
		}
	}
	
	//DesabilitaFieldSet();
	return true;

}




//function MontaXMLDadosBancario(){	
//
//	var indexes = document.getElementsByTagName("hr");
//	//console.log(indexes);
//	MensagemAlerta("AtenÃ§Ã£o","indexes: " +indexes);
//	var fieldsXml = "";
//	for (var i = 0; i < indexes.length; i++) {
//		fieldsXml = "<FDadosPgto>";
//		fieldsXml += criaElementoXML("CODCOLIGADA",		   "0");
//		fieldsXml += criaElementoXML("CODCFO",             document.getElementById("codCfo").value);
//		fieldsXml += criaElementoXML("CODCOLCFO",          document.getElementById("codcolcfo").value);  
//		fieldsXml += criaElementoXML("IDPGTO",             document.getElementById("idpgto").value) ;         
//		fieldsXml += criaElementoXML("NUMEROBANCO",        document.getElementById("numeroBanco").value);      
//		fieldsXml += criaElementoXML("CODIGOAGENCIA",      document.getElementById("codigoAgencia").value);   
//		fieldsXml += criaElementoXML("DIGITOAGENCIA",      document.getElementById("digitoAgencia").value);    
//		fieldsXml += criaElementoXML("DESCRICAO",          document.getElementById("nomeAgencia").value);     
//		fieldsXml += criaElementoXML("CONTACORRENTE",      document.getElementById("contaCorrente").value);    
//		fieldsXml += criaElementoXML("DIGITOCONTA",        document.getElementById("digitoConta").value);      
//		fieldsXml += criaElementoXML("TIPOCONTA",          document.getElementById("tipoConta").value);        
//		fieldsXml += criaElementoXML("CAMARACOMPENSACAO",  document.getElementById("camaraCompensacao").value);
//		fieldsXml += criaElementoXML("FAVORECIDO",         document.getElementById("favorecido").value);       
//		fieldsXml += criaElementoXML("CGCFAVORECIDO",      document.getElementById("cgcFavorecido").value);    
//		fieldsXml += criaElementoXML("TIPODOC",            document.getElementById("tipoDoc").value);          
//		fieldsXml += criaElementoXML("CODFINALIDADE",      document.getElementById("codFinalidade").value);    
//		fieldsXml += criaElementoXML("FORMAPAGAMENTO",     document.getElementById("formapagamento").value);
//		fieldsXml += "</FDadosPgto>";	
//		if(!GravarRMDadosBancario(fieldsXml)){
//			return false;
//		}
//	}
//
//	return true;
//
//}
//
//function GravarRMDadosBancario(fieldsXml){
//
//	var c1 = DatasetFactory.createConstraint('fieldsXml', fieldsXml, fieldsXml, ConstraintType.MUST);
//	var constraints = new Array(c1);
//	var gravaRM = DatasetFactory.getDataset("rm_findadospgtodatabr_saverecordauth", null,constraints, null);
//
//
//	if (gravaRM.values.toString()){
//		MensagemAlerta("AtenÃ§Ã£o",'<h3>Erro para gravar <strong>Dados BancÃ¡rio</strong>, contate o Administrador</h3>');
//		return false
//	}
//
//	return true;
//
//}


function MontaXMLPPessoa(codigo){
console.log('MontaXMLPPessoa: ', codigo);
//	var cpf = document.getElementById("???").value;
//	cpf = cpf.replace(".","");
//	cpf = cpf.replace(".","");
//	cpf = cpf.replace("-","");
//	var codigo = document.getElementById("???").value;
//	var idImagem  = document.getElementById("???").value;
//	var imagem 	  = document.getElementById("???").src.substring(0,4) 
	codigo = (codigo == ''  ||  codigo == null  ||  codigo === undefined) ? document.getElementById("codPessoa").value : codigo ;
	var cpf = document.getElementById('numCpf').value.toString().replace(/[^\d]+/g, '');

	var fieldsXml = "<PPESSOA>";
	fieldsXml += criaElementoXML("CODCOLIGADA",			"1");
	fieldsXml += criaElementoXML("CODIGO",				codigo);
	fieldsXml += criaElementoXML("NOME", 				document.getElementById("txtNome").value);
//	fieldsXml += criaElementoXML("NOMESOCIAL", 			document.getElementById("???").value);
//	fieldsXml += criaElementoXML("APELIDO", 			document.getElementById("???").value);
	fieldsXml += criaElementoXML("CPF", 				cpf);
//	fieldsXml += criaElementoXML("CARTIDENTIDADE", 		document.getElementById("???").value);
//	fieldsXml += criaElementoXML("ORGEMISSORIDENT", 	document.getElementById("???").value);
//	fieldsXml += criaElementoXML("UFCARTIDENT", 		document.getElementById("???").value);
	fieldsXml += criaElementoXML("DTNASCIMENTO", 		document.getElementById("dtNascimento").value);
	fieldsXml += criaElementoXML("SEXO", 				document.getElementById("selSexo").value);
//	fieldsXml += criaElementoXML("ESTADOCIVIL", 		document.getElementById("???").value);
//	fieldsXml += criaElementoXML("NACIONALIDADE", 		document.getElementById("???").value);
//	fieldsXml += criaElementoXML("ESTADONATAL", 		document.getElementById("???").value);
	//fieldsXml += criaElementoXML("NATURALIDADE", 		document.getElementById("???").value);	
	fieldsXml += criaElementoXML("CEP", 				document.getElementById("numCep").value);
	fieldsXml += criaElementoXML("RUA", 				document.getElementById("txtRua").value);
	fieldsXml += criaElementoXML("NUMERO", 				document.getElementById("numRua").value);
	fieldsXml += criaElementoXML("COMPLEMENTO", 		document.getElementById("txtComplemento").value);
	fieldsXml += criaElementoXML("BAIRRO", 				document.getElementById("txtBairro").value);
	fieldsXml += criaElementoXML("ESTADO", 				document.getElementById("selUF").value);
	fieldsXml += criaElementoXML("CIDADE", 				document.getElementById("txtMunicipio").value);
	fieldsXml += criaElementoXML("TELEFONE1", 			document.getElementById("numTel").value);
	fieldsXml += criaElementoXML("TELEFONE2", 			document.getElementById("numCel").value);
	fieldsXml += criaElementoXML("EMAIL", 				document.getElementById("txtEmail").value);
//	fieldsXml += criaElementoXML("GRAUINSTRUCAO", 		document.getElementById("???").value);
//	fieldsXml += criaElementoXML("CODPROFISSAO", document.getElementById("???").value);
//	if (imagem != '' && imagem != null && imagem != 'http'){
//		fieldsXml += criaElementoXML("IDIMAGEM", idImagem);
//		fieldsXml += criaElementoXML("IMAGEM",   ConverteBase64ParaHexadecimal());
//	}
	fieldsXml += "</PPESSOA>";

	if (GravarRMPPessoa(fieldsXml)){
		return true
	}else{
		return false
	}
}



function GravarRMPPessoa(fieldsXml){

	var c1 = DatasetPublic.createConstraint('fieldsXml', fieldsXml, fieldsXml, ConstraintTypePublic.MUST);
//	var constraints = new Array(c1);
	var gravaRM = DatasetPublic.getDataset("rm_ppessoa_saverecordauth", null, [c1], null);
	console.log('... gravando PPessoa [' + gravaRM.values.length + ']');

	if (gravaRM.values.length > 0 ){
		if(gravaRM.values.length == 1){
			console.log('PPESSOA: ', gravaRM.values[0].RETORNO);
			var codPessoa = gravaRM.values[0].RETORNO;
			$('#codPessoaProfessor').val( codPessoa );
			$('#' + Professor.props.id.input.codPerson).val( codPessoa );
			$('#' + Professor.props.id.input.join.codPerson).val( codPessoa );
			return true;
		}else{
			MensagemAlerta('PPessoa','<h3>Erro para gravar o registro:</h3><br/>' + gravaRM.values[0].RETORNO, false);
			return false;
		}
	}else{
		MensagemAlerta('PPessoa','<h3>Erro para gravar o registro, contate o Administrador</h3>', false);
		return false;
	}
}



//function MontaXMLZMDVINCULOFCFOPPESSOA(){
//	
//	var tabelaCorpo = $("#tabelaVinculo tbody tr");
//	
//	for(var i = 0; i < tabelaCorpo.length; i++){
//		//if(tabelaCorpo[i].childNodes["1"].textContent == "-1"){
//			fieldsXml = "<ZMDVINCULOFCFOPPESSOA>";
//			fieldsXml += criaElementoXML("ID", 			tabelaCorpo[i].childNodes["1"].textContent);
//			fieldsXml += criaElementoXML("codPessoa", 	tabelaCorpo[i].childNodes["0"].textContent);
//			fieldsXml += criaElementoXML("CODCFO", 		document.getElementById("codCfo").value);
//			fieldsXml += criaElementoXML("CARGO", 		tabelaCorpo[i].childNodes["4"].textContent);
//			fieldsXml += criaElementoXML("DTVINCULOINI", tabelaCorpo[i].childNodes["5"].textContent.split('/').reverse().join('-'));
//			fieldsXml += criaElementoXML("DTVINCULOFIM", tabelaCorpo[i].childNodes["6"].textContent.split('/').reverse().join('-'));
//			fieldsXml += criaElementoXML("ATIVO", 		(tabelaCorpo[i].childNodes["3"].textContent == "Ativo" ? "1" : "0"));
//			fieldsXml += criaElementoXML("RESPONSAVEL", tabelaCorpo[i].childNodes["7"].childNodes[1].checked ? "1" : "0");	
//			fieldsXml += "</ZMDVINCULOFCFOPPESSOA>";			
//			if (!(GravarRMZMDVINCULOFCFOPPESSOA(fieldsXml))){
//				return false
//			}
//		//}
//	}	
//	return true;
//}
//
//
//function GravarRMZMDVINCULOFCFOPPESSOA(fieldsXml){
//	
//	var c1 = DatasetFactory.createConstraint('fieldsXml', fieldsXml, fieldsXml, ConstraintType.MUST);
//	var constraints = new Array(c1);
//	var gravaRM = DatasetFactory.getDataset("rm_RMSPRJ4555776Server_gravar_vinculo", null,constraints, null);
//
//	if (gravaRM.values.length > 0 ){	
//		if(gravaRM.values.length == 1){
//			return true;
//		}else{
//			MensagemAlerta('FCO','<h3>Erro para gravar o registro, contate o Administrador</h3><br/>'+gravaRM.values[0].RETORNO);
//			return false;
//		}
//	}else{
//		MensagemAlerta('FCO','<h3>Erro para gravar o registro, contate o Administrador</h3>');
//		return false;
//	}
//}



function MontaXMLVinculo(id, cargo, ativo){
console.log('MontaXMLVinculo: ', id, cargo, ativo);
	var fieldsXml 	= "";
	var idTabela 	= '-1';
	var codCfo	 	= document.getElementById('codCfo').value;
	var codPessoa 	= document.getElementById('codPessoaProfessor').value;
//	var cargo 		= 'Professor(a)';
	cargo = (cargo == undefined) ? 'Professor(a)' : cargo ;
	ativo = (ativo == undefined) ? '1' : ativo ;
	
	
	if((id !== undefined)  &&  (id != '')  &&  (id != '-1')){
		idTabela = id;
	} else {
//		//Consulta se existe vinculo
//		var c0 = DatasetPublic.createConstraint('CODCFO', 		codCfo, 	null, 	ConstraintTypePublic.MUST);
//		var c1 = DatasetPublic.createConstraint('CODPESSOA', 	codPessoa, 	null, 	ConstraintTypePublic.MUST);
//		var c2 = DatasetPublic.createConstraint('CARGO', 	   	cargo, 		null, 	ConstraintTypePublic.MUST);
//		//var constraints = new Array(c1,c2);
//		var dsVinculo = DatasetPublic.getDataset("rm_RMSPRJ4555776Server_consulta_vinculo", null, [c0, c1, c2], null);
//		console.log("dsVinculo.values.length: " + dsVinculo.values.length)
		var dsVinculo = fnBuscaVinculo(codCfo, codPessoa, cargo);
		if(DatasetPublic.validateReturn(dsVinculo)){
			if(dsVinculo.values.length > 0){
				idTabela = dsVinculo.values[0].ID;
			} else {
				idTabela = '-1';
			}
		} else {
			idTabela = '-1';
		}
	}
	
	fieldsXml = "<ZMDVINCULOFCFOPPESSOA>";
	fieldsXml += criaElementoXML("ID",				idTabela);
	fieldsXml += criaElementoXML("CODCFO", 			codCfo);
	fieldsXml += criaElementoXML("CODPESSOA", 		codPessoa);
	fieldsXml += criaElementoXML("CARGO",			cargo);
	//fieldsXml += criaElementoXML("DTVINCULOINI", 	document.getElementById('periodoDe___'+id).value);
	//fieldsXml += criaElementoXML("DTVINCULOFIM", 	document.getElementById('periodoAte___'+id).value);
	fieldsXml += criaElementoXML("ATIVO",			ativo);	
	//fieldsXml += criaElementoXML("RESPONSAVEL",$("#responsavelSocio___"+id).prop("checked") ? 1 : 0);	
	fieldsXml += "</ZMDVINCULOFCFOPPESSOA>";

	if (!(GravarRMVinculo(fieldsXml))){
		return false
	}

	//console.log("fieldsXml: " + fieldsXml)
	idTabela = '-1';

	return true;
}

/**
 * @param fieldsXml - XML 
 * @param pessoaFisOuJur
 */
function GravarRMVinculo(fieldsXml){
//	console.log("GravarRMVinculo(fieldsXml)")
	var c1 = DatasetPublic.createConstraint('fieldsXml', fieldsXml, fieldsXml, ConstraintTypePublic.MUST);
//	console.log("c1: " +c1)
//	var constraints = new Array(c1);
//	console.log("constraints: " +constraints)
	var gravaRM = DatasetPublic.getDataset("rm_RMSPRJ4555776Server_gravar_vinculo", null, [c1], null);
	console.log("gravaRM: " , gravaRM)

	if (gravaRM.values.length > 0 ){	
//		console.log("if (gravaRM.values.length > 0 ){")
		if(gravaRM.values.length == 1){
			var aux = gravaRM.values[0].RETORNO.split(';');
			var idVinculo = aux[0];
			var codPessoa = aux[1];
			$('#' + Professor.props.id.input.join.idJoin).val( idVinculo );
			$('#' + Professor.props.id.input.join.codPerson).val( codPessoa );
			return true;
		}else{
			MensagemAlerta('Vinculo','<h3>Erro para gravar o registro, contate o Administrador</h3><br/>'+gravaRM.values[0].RETORNO);
			return false;
		}
	}else{
		MensagemAlerta('Vinculo','<h3>Erro para gravar o registro, contate o Administrador</h3>');
		return false;
	}
}



function fnMontaGravaXMLAvaliacao(valId, codAvaliacao, idTrabalho, codTipoAvaliacao, idAvaliador, codBanca, ordemAvaliacao, codStatus, ativo){
	
	valId = (valId == '') ? '-1' : valId ;
	var msgAlerta 	= '';
	var obj 		= new Object();
//	var fieldsXml 	= ''+
//	'<ZMDAGRAVALIACOES>' +
//	'   <ID>' + 				valId 			 	+ '</ID>' +
//	'   <CODAVALIACAO>' + 		codAvaliacao 	 	+ '</CODAVALIACAO>' +
//	'   <IDTRABALHO>' + 		idTrabalho 		 	+ '</IDTRABALHO>' +
//	'   <CODTIPOAVALIACAO>' + 	codTipoAvaliacao 	+ '</CODTIPOAVALIACAO>' +
//	'   <IDAVALIADOR>' + 		idAvaliador 	 	+ '</IDAVALIADOR>' + 
//	'   <CODBANCA>' + 			codBanca 	 	 	+ '</CODBANCA>' +
//	'   <ORDEMAVA>' + 			ordemAvaliacao 		+ '</ORDEMAVA>' +
//	'   <CODSTATUS>' + 			codStatus  			+ '</CODSTATUS>' +
//	'   <ATIVO>' + 				ativo 				+ '</ATIVO>' +
//	'</ZMDAGRAVALIACOES>';
	var fieldsXml =  '';
	fieldsXml += '<ZMDAGRAVALIACOES>';
	fieldsXml += criaElementoXML('ID',					valId);
	fieldsXml += criaElementoXML('CODAVALIACAO',		codAvaliacao);
	fieldsXml += criaElementoXML('IDTRABALHO',			idTrabalho);
	fieldsXml += criaElementoXML('CODTIPOAVALIACAO',	codTipoAvaliacao);
	fieldsXml += criaElementoXML('IDAVALIADOR',			idAvaliador); 
	fieldsXml += criaElementoXML('CODBANCA',			codBanca);
	fieldsXml += criaElementoXML('ORDEMAVA',			ordemAvaliacao);
	fieldsXml += criaElementoXML('CODSTATUS',			codStatus);
	fieldsXml += criaElementoXML('ATIVO',			 	ativo);
	fieldsXml += '</ZMDAGRAVALIACOES>';


	var c1 = DatasetFactory.createConstraint('WEBSERVICE', 'ZMDAGRAVALIACOES',   null, 1);
	var c2 = DatasetFactory.createConstraint('TYPE', 		'SaveRecord', 		 null, 1);
	var c3 = DatasetFactory.createConstraint('fieldsXml', 	fieldsXml, 			 null, 1);
	var dataset = DatasetFactory.getDataset('rmSaveDefaultDataset', null, new Array(c1, c2, c3), null);
	console.log('ZMDAGRAVALIACOES (' + idTrabalho + ')', [fieldsXml, dataset]);
	if(dataset !== null){
		if(dataset.values.length > 0){
			if(!dataset.values[0].ERROR){
				// Pega ID da AvaliaÃ§Ã£o
				valId = dataset.values[0].DS_RETORNO;
			} else {
				msgAlerta += "ERRO: " + dataset.values[0].DS_RETORNO + " (ZMDAGRAVALIACOES).";
			}
		} else {
			msgAlerta += "ERRO: NÃ£o foram retornados registros (ZMDAGRAVALIACOES).";
		}
	} else {
		msgAlerta += "ERRO: Consulta inexistente (ZMDAGRAVALIACOES).";
	}
	
	obj = {
		'valId':	 valId,
		'msgAlerta': msgAlerta
	};
	return obj;
}

function fnMontaGravaXMLNota(valId, idAvaliacao, tipoNota, valNota, mnemonico, ordem, ativo, flagMedia){
	
	valId = (valId == '') ? '-1' : valId ;
	var msgAlerta 	= '';
	var obj 		= new Object();
	
	flagMedia = (flagMedia === undefined) ? false : flagMedia ;
	if(flagMedia){
		var auxNota 	 = valNota;
		var auxMnemonico = mnemonico;
	} else {
		var auxNota 	 = ((mnemonico) ? '-1' 		: valNota );
		var auxMnemonico = ((mnemonico) ? valNota  	: '' );
	}
	
	/** -------------------------------------------------- */	
	var fieldsXml = ''+
	'<ZMDAGRNOTAS>'+
	'	<ID>' + 			valId   		+ '</ID>' +
	'	<IDAVALIACAO>' + 	idAvaliacao  	+ '</IDAVALIACAO>' +
	'	<CODTIPONOTA>' + 	tipoNota  		+ '</CODTIPONOTA>'+		
	'	<NOTA>' + 			auxNota  		+ '</NOTA>' +
	'	<MNEMONICO>' + 		auxMnemonico 	+ '</MNEMONICO>' +
	'	<ORDEMNOTA>' + 		ordem			+ '</ORDEMNOTA>' +  // 1: Aluno, 2: Professor, 3: Escola, 4: Outros
	'	<ATIVO>' + 			ativo 			+ '</ATIVO>' +
	'</ZMDAGRNOTAS>';
	var c1 = DatasetFactory.createConstraint('WEBSERVICE',  'ZMDAGRNOTAS', 	null, 1);
	var c2 = DatasetFactory.createConstraint('TYPE', 		'SaveRecord', 	null, 1);
	var c3 = DatasetFactory.createConstraint('fieldsXml', 	fieldsXml,		null, 1);
	var dataset = DatasetFactory.getDataset('rmSaveDefaultDataset', null, new Array(c1, c2, c3), null);
	console.log('-> ZMDAGRNOTAS (' + tipoNota + ')', [fieldsXml, dataset]);
	if(dataset !== null){
		if(dataset.values.length > 0){
			if(!dataset.values[0].ERROR){
				// Pega ID da Nota
				valId = dataset.values[0].DS_RETORNO;
			} else {
				msgAlerta += "ERRO: " + dataset.values[0].DS_RETORNO + " (ZMDAGRNOTAS).";
			}
		} else {
			msgAlerta += "ERRO: NÃ£o foram retornados registros (ZMDAGRNOTAS).";
		}
	} else {
		msgAlerta += "ERRO: Consulta inexistente (ZMDAGRNOTAS).";
	}	
	
	obj = {
		'valId':	 valId,
		'msgAlerta': msgAlerta
	};
	return obj;
}
