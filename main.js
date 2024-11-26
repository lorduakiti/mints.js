console.log('%c [v.up.0.0.2] main.js', 'color:gray');

const _config = {};


//requireUrl('./components/Teste.js', 'text/javascript', fnAlerta);

//importScript('./components/login/Login.js', 'text/javascript', reloadCustomHTML);
$(document).ready(function(){
	//importScript('./components/login/LoginEscola.js', 'text/javascript');
	//reloadCustomIdHTML('divLogin', LoginEscola, false, LoginEscola.callBack());
	reloadCustomIdHTML('divMenu', Menu, false, Menu.callBack());
});



var validateForm = function(idForm, action, arrModels, alertType) {
	console.log('validateForm', idForm, action, arrModels, alertType);
	
	var msgAlert 	= "";
	var fieldsAlert = "";
	
	var formLoading = FLUIGC.loading('#' + idForm);
	formLoading.show();
	
	$('.has-error').removeClass('has-error');
	$('.panel-danger').removeClass('panel-danger');
	$('.btn-danger').removeClass('btn-danger');

	try {
		// Validando campos obrigatÃ³rios
		$('#' + idForm).find('[required=true]').each(function(){
			//console.log($(this).attr('id'), $(this).prop('tagName'), $(this).prop('type'), $(this).css('display'), $(this).val())
			var id 		= $(this).attr('id');
			var tagName = $(this).prop('tagName');
			var type 	= $(this).prop('type');
			var value 	= $(this).val();
			var rel		= $(this).attr('data-rel-value');
			var returnId= id;
			var text 	= '';
			
			var idOff  = ',selOrdemAvaliacao,codAvaliacao,selTipoNota,selAvaliador,selBanca,' +
				'selNotaC1,numNotaC1,numNotaC2,numNotaC3,numNotaC4,numNotaC5,numNotaC6,numNotaC7,numNotaC8,numNotaC9,numNotaFinal,';
			//if(idForm == 'divTrabalho'  &&  action == 'cadastro_trabalho'){
			if(action == 'cadastro_trabalho'){
				if($('#selAtivo').val() == '0'  &&  $('#codProspect').val() == ''){
					idOff  += ',codProspect,valParticipante,valProspect,valCadastro,codOrigem,txtNome,txtNomeMae,dtNascimento,';
				}
				if($('#codCategoria').val() == "AJ"){
					idOff  += ',codProfessor,selProfessores,';
				}
			}
			if(idOff.search(',' + id + ',') == -1){
				if(type == 'hidden'){
					text 	 = '';
					returnId = '';
				} else {
					text 	= $(this).parent('div').find('label').html()
					text 	= (text === undefined) ? '' : text.toString().toUpperCase() ;
					var n	= (text.indexOf('<SPAN') != -1) ? text.indexOf('<SPAN') : text.length ;
					text 	= text.substring(0, n);
				}
				text = (text == '') ? rel.toString().toUpperCase() : text ;
				
				(id == 'codMunicipio'  ||  id == 'txtMunicipio') ? returnId = 'selMunicipio' : '';
				
				 
				if(	id == 'numRua'  
				||  id == 'selCargoAtivo'  
				||  id == 'selDesclassificacao'
				||  id == 'selErro'
				||  id == 'selAtivo'
				||  (id.indexOf('selAvaliador___') 	> -1)
				||  (id.indexOf('selBanca___') 		> -1)
				||  (id.indexOf('numNotaFinal___') 	> -1)
				||  (id.indexOf('numNota') 			> -1)
				||  (id.indexOf('numMediaFinalAvaliadores') > -1)
				||  (id.indexOf('numMediaFinalBancas') > -1)
				||  (id.indexOf('numMediaFinal') > -1)
				){
					var diff = '=' ;
				} else {
					var diff = '' ;
				}
				
				//console.log(id, tagName, type, value, rel, returnId, text, diff);
				var msg = fnValidaCampos(id, text, diff, '', returnId);
				fieldsAlert += msg;
			}
			if(msg != ''){
				console.log('%c --> [' + id + '][' + diff + '][' + text + '] = ' + msg, 'color:orange');
			}
		});
	
		if(fieldsAlert != ""){
			fieldsAlert = (fieldsAlert + "?").replace(",?", "").replace("?", ".");
			msgAlert 	= "Favor preencher o(s) campo(s) obrigatÃ³rios (*):  " + fieldsAlert;
		
			formLoading.hide();
			if(alertType == 'alert'  ||  alertType == 'a'){
				fnMsgAlertaFlutuante('ERRO', msgAlert);
			} else {
				//fnMsgAlerta('ERRO', msgAlert);
				fnDebug(msgAlert, 'a');
			}
			return false;
		}	
	} catch(erro) {
		fnRetornoErro(erro, 'a');	
		return false;
	}
	//window[_global.objVars.mints].FLUIG.loading('load', idForm, '', '', '', true, 'beforeSendValidate', 0, action);
	//_global.autoClose = true;
	if(beforeSendValidate(0, action)){
		formLoading.hide();
		return true;
	} else {
		formLoading.hide();
		return false;
	}	
	
}



var beforeSendValidate = function(numState, nextState) {
	console.log('beforeSendValidate', numState, nextState);
	
	var msgAlerta = "";
	var msgErro   = "";

	try {
	
		if(nextState == 'cadastro_escola'){
			if(MontaXMLJuridica()){
				Escola.alert('Dados salvos com sucesso.', 'success');
				//return true;
			} else {
				Escola.alert('NÃ£o foi possÃ­vel salvar os dados!');
				return false;
			}
			return true;
		
		} else if(nextState == 'cadastro_professor'){
			
			var codPessoa = document.getElementById('codPessoaProfessor').value;
			if(MontaXMLPPessoa(codPessoa)){
				Professor.alert('Dados salvos com sucesso.', 'success');
				//return true;
			} else {
				Professor.alert('NÃ£o foi possÃ­vel salvar os dados!');
				return false;
			}
			
			var id 		= document.getElementById('idVinculo').value;
			var cargo 	= document.getElementById('selCargo').value; //'Professor(a)'
			var ativo 	= document.getElementById('selCargoAtivo').value;
			
			if(MontaXMLVinculo(id, cargo, ativo)){
				Professor.alert('VÃ­nculo salvo com sucesso.', 'success', true);
				//return true;
			} else {
				Professor.alert('NÃ£o foi possÃ­vel salvar os dados!', 'danger', true);
				return false;
			}
			return true;
			
		} else if(nextState == 'cadastro_trabalho'){
			//Trabalho.alert('aqui 1');
			
			// Definindo valores padrÃµes
			var codInc		 = '0';
			var idCategoria  = '0';
			var codCategoria = 'XX';
			var idTrabalho   = '-1';
			var codTrabalho  = '';
			var codProspect  = '-1';
			var idVinculo    = '-1';
			var codProfessor = '';
			
			// Buscando valores
			idCategoria  = document.getElementById('idCategoria').value;
			codCategoria = document.getElementById('codCategoria').value;
			idTrabalho   = document.getElementById('idTrabalho').value;
			codTrabalho  = document.getElementById('codTrabalho').value;
			codProspect  = document.getElementById('codProspect').value;
			idVinculo    = document.getElementById('idVinculo').value;
			codProfessor = document.getElementById('codProfessor').value;

			if(idTrabalho == ''){
				msgAlerta += "NÃ£o foi identificado o ID do trabalho. ";
				
			} else if(idTrabalho != '-1'){
				if(codTrabalho == ''  ||  codTrabalho == 'NOVO'){
					msgAlerta += "NÃ£o foi identificado o CÃ“DIGO do trabalho. ";
				}
			}
			if(idCategoria == ''  ||  codCategoria == ''){
				msgAlerta += "NÃ£o foi identificada a CATEGORIA do trabalho.";
			}
			
			/** -------------------------------------------------- */
			if(msgAlerta == ''){
				if(idTrabalho == '-1'){
					console.log('%c Buscando Sequencial..', 'color:blue');
					// Buscar numerador por categoria
					var c0 = DatasetFactory.createConstraint('CODCATEGORIA', codCategoria, 	null, 1);
					var dataset = DatasetFactory.getDataset('rm_buscaSequencialAgrinho_SQL', null, new Array(c0), null);
					console.log('rm_buscaSequencialAgrinho_SQL', dataset);
					if(dataset !== null){
						if(dataset.values.length > 0){
							if(!dataset.values[0].ERROR){
								// Pega Ãºltimo nÃºmero de trabalho por categoria
								codInc = dataset.values[0].VALAUTOINC;
							} else {
								msgAlerta += "ERRO: " + dataset.values[0].DS_RETORNO + " (rm_buscaSequencialAgrinho_SQL).";
							}
						} else {
							msgAlerta += "ERRO: NÃ£o foram retornados registros (rm_buscaSequencialAgrinho_SQL).";
						}
					} else {
						msgAlerta += "ERRO: Consulta inexistente (rm_buscaSequencialAgrinho_SQL).";
					}
					
					// Definindo cÃ³digo do trabalho
					codTrabalho  = codCategoria + '-' + codInc;
				}
			}
			
			// Finaliza validaÃ§Ãµes de campos
			if(msgAlerta != ''){
				Trabalho.alert( msgAlerta, 'danger', true);
				return false;
			}
			

			/** -------------------------------------------------- */
			// Salvar trabalho
			if($('#codCategoria').val() == "AJ"){
				if(codProfessor == ''  ||  codProfessor === null  ||  codProfessor === undefined){
					codProfessor = '0';
				}
			}
			console.log('%c Gravando Trabalhos..', 'color:blue');
			var fieldsXml = ''+
			'<ZMDAGRTRABALHOS_ID>' +
			'        <ID>' + 				idTrabalho + '</ID>' +
			'        <CODTRABALHO>' + 		codTrabalho + '</CODTRABALHO>' +
			'        <IDCATEGORIA>' + 		idCategoria + '</IDCATEGORIA>' +
			'        <CODESCOLA>' + 		document.getElementById('codEscola').value 		 + '</CODESCOLA>' + 
			'        <CODPROFESSOR>' + 		document.getElementById('codProfessor').value 	 + '</CODPROFESSOR>' +
			'        <CODSTATUS>' + 		document.getElementById('selStatusTrabalho').value + '</CODSTATUS>' +
			//'        <ERRODIGITACAO>' + 	document.getElementById('chkErro').value 		 + '</ERRODIGITACAO>' +
			'        <ERRODIGITACAO>' + 	document.getElementById('selErro').value 		 + '</ERRODIGITACAO>' +
			'        <POSSUIDEFICIENCIA>' + document.getElementById('chkDeficiencia').value  + '</POSSUIDEFICIENCIA>' +
			'        <ANO>' + 				document.getElementById('numAno').value 		 + '</ANO>' +
			'        <DATACADASTRO>' + 		document.getElementById('dtCadastro').value 	 + '</DATACADASTRO>' +
			//'        <OBSERVACAO>' + 		document.getElementById('txtObs').value 		 + '</OBSERVACAO>' +
			'        <OBS>' + 				document.getElementById('txtObs').value 		 + '</OBS>' +
			'        <ATIVO>' + 			document.getElementById('selAtivo').value 		 + '</ATIVO>' +
			'        <CAMPOLIVRE>' + 		document.getElementById('emailResponsaveis').value + '</CAMPOLIVRE>' +
			'</ZMDAGRTRABALHOS_ID>';


			var c1 = DatasetFactory.createConstraint('WEBSERVICE', 'ZMDAGRTRABALHOS_ID', null, 1);
			var c2 = DatasetFactory.createConstraint('TYPE', 		'SaveRecord', 		 null, 1);
			var c3 = DatasetFactory.createConstraint('fieldsXml', 	fieldsXml, 			 null, 1);
			var dataset = DatasetFactory.getDataset('rmSaveDefaultDataset', null, new Array(c1, c2, c3), null);
			console.log('ZMDAGRTRABALHOS_ID', dataset);
			if(dataset !== null){
				if(dataset.values.length > 0){
					if(!dataset.values[0].ERROR){
						// Pega ID do trabalho
						idTrabalho = dataset.values[0].DS_RETORNO;
					} else {
						msgAlerta += "ERRO: " + dataset.values[0].DS_RETORNO + " (ZMDAGRTRABALHOS_ID).";
					}
				} else {
					msgAlerta += "ERRO: NÃ£o foram retornados registros (ZMDAGRTRABALHOS_ID).";
				}
			} else {
				msgAlerta += "ERRO: Consulta inexistente (ZMDAGRTRABALHOS_ID).";
			}
			if(idTrabalho == ''  ||  idTrabalho == '-1'){
				msgAlerta += "NÃ£o foi retornado o ID do trabalho. ";
			}
			if(msgAlerta != ''){
				Trabalho.alert( msgAlerta, 'danger', true);
				return false;
			} else {
				document.getElementById('idCategoria').value 	= idCategoria;
				document.getElementById('codCategoria').value 	= codCategoria;
				document.getElementById('idTrabalho').value 	= idTrabalho;
				document.getElementById('codTrabalho').value 	= codTrabalho;
			}


			/** -------------------------------------------------- */
			// Salvar aluno (prospect)
			if(document.getElementById('selAtivo').value == '0'  &&  document.getElementById('codProspect').value == ''  &&  document.getElementById('txtNome').value == ''){
				console.log('%c NÃ£o foi gravado o registro do Aluno (prospect)..', 'color:red');

			} else {
				console.log('%c Gravando Aluno (prospect)..', 'color:blue');
			
				var fieldsXml = '' +
				'<CRMProspect >' +
				'  <HPROSPECT>' +
				'    <CODPROSPECT>' + 		codProspect  + '</CODPROSPECT>' +
				'    <CODCOLIGADA>' + 		document.getElementById('codColigada').value  	+ '</CODCOLIGADA>' +
				'    <NOME>' + 				document.getElementById('txtNome').value  		+ '</NOME>' +
				'    <NOMEFANTASIA>' + 		document.getElementById('txtNome').value  		+ '</NOMEFANTASIA>' +
				'    <CGCCFO>' + 			document.getElementById('numCpf').value  		+ '</CGCCFO>' +
				'    <DATACRIACAO>' + 		document.getElementById('dtCadastro').value  	+ '</DATACRIACAO>' +
				'    <DATAULTALTERACAO>' + 	moment().format('DD/MM/YYYY hh:mm')				+ '</DATAULTALTERACAO>' +
				'    <PESSOAFISOUJUR>' + 	document.getElementById('valCadastro').value  	+ '</PESSOAFISOUJUR>' +
				'    <CODORIGEM>' + 		document.getElementById('codOrigem').value  	+ '</CODORIGEM>' +
				'    <TIPOCLIENTE>' + 		document.getElementById('valProspect').value  	+ '</TIPOCLIENTE>' +  // 0: Inativo, 1: Suspect, 2: Prospect
				'    <CEP>' + 				document.getElementById('numCep').value  		+ '</CEP>' +
				'    <IDPAIS>' + 			'1'  											+ '</IDPAIS>' +  // Brasil
				'    <CODETD>' + 			document.getElementById('selUF').value  		+ '</CODETD>' +
				'    <CODMUNICIPIO>' + 		document.getElementById('codMunicipio').value  	+ '</CODMUNICIPIO>' +
				'    <RUA>' + 				document.getElementById('txtRua').value  		+ '</RUA>' +
				'    <NUMERO>' + 			document.getElementById('numRua').value  		+ '</NUMERO>' +
				'    <BAIRRO>' + 			document.getElementById('txtBairro').value  	+ '</BAIRRO>' +
				'    <COMPLEMENTO>' + 		document.getElementById('txtComplemento').value + '</COMPLEMENTO>' +
				'    <TELEFONE>' + 			document.getElementById('numTel').value  		+ '</TELEFONE>' +
				'    <TELEX>' + 			document.getElementById('numCel').value  		+ '</TELEX>' +
	//			'    <FAX>' + 				document.getElementById('?').value  			+ '</FAX>' +
				'    <EMAIL>' + 			document.getElementById('txtEmail').value  		+ '</EMAIL>' +
				'    <ATIVO>' + 			'1'  											+ '</ATIVO>' +
				'    <CODCOLIGINDICACAO>' + document.getElementById('codColigada').value  	+ '</CODCOLIGINDICACAO>' +
				'    <CODCFOINDICACAO>' + 	document.getElementById('codEscola').value  	+ '</CODCFOINDICACAO>' +
				'  </HPROSPECT>' +
				'  <HPROSPECTCOMPL>' +
				'    <CODPROSPECT>' + 		codProspect  + '</CODPROSPECT>' +
				'    <CODCOLIGADA>' + 		document.getElementById('codColigada').value  	+ '</CODCOLIGADA>' +
				'    <DATANASCIMENTO>' + 	document.getElementById('dtNascimento').value  	+ '</DATANASCIMENTO>' +
				'    <NOMEMAE>' + 			document.getElementById('txtNomeMae').value  	+ '</NOMEMAE>' +
				'    <SEXO>' + 				document.getElementById('selSexo').value  		+ '</SEXO>' +
				'    <CARTIDENTIDADE>' + 	document.getElementById('numRg').value  		+ '</CARTIDENTIDADE>' +
				'    <DTEMISSAOIDENT>' + 	document.getElementById('dtRg').value  			+ '</DTEMISSAOIDENT>' +
	//			'    <ORGEMISSORIDENT>' + 	document.getElementById('?').value  			+ '</ORGEMISSORIDENT>' +
	//			'    <UFCARTIDENT>' + 		document.getElementById('?').value  			+ '</UFCARTIDENT>' +
				'    <CODTIPODEFICIENCIA>' + document.getElementById('selDeficiencia').value  + '</CODTIPODEFICIENCIA>' +
				'    <CERTNASCIMENTO>' + 	document.getElementById('numCn').value  		+ '</CERTNASCIMENTO>' +
				'  </HPROSPECTCOMPL>' +
				'</CRMProspect>';
	
	
				var c1 = DatasetFactory.createConstraint('WEBSERVICE', 'HPROSPECT', 	null, 1);
				var c2 = DatasetFactory.createConstraint('TYPE', 		'SaveRecord', 	null, 1);
				var c3 = DatasetFactory.createConstraint('fieldsXml', 	fieldsXml,		null, 1);
				var dataset = DatasetFactory.getDataset('rmSaveDefaultDataset', null, new Array(c1, c2, c3), null);
				console.log('HPROSPECT', dataset);
				if(dataset !== null){
					if(dataset.values.length > 0){
						if(!dataset.values[0].ERROR){
							// Pega CODPROSPECT
							var aux = dataset.values[0].DS_RETORNO.split(';');
							//var codColigada = aux[0];
							var codProspect = aux[1];
						} else {
							msgAlerta += "ERRO: " + dataset.values[0].DS_RETORNO + " (HPROSPECT).";
						}
					} else {
						msgAlerta += "ERRO: NÃ£o foram retornados registros (HPROSPECT).";
					}
				} else {
					msgAlerta += "ERRO: Consulta inexistente (HPROSPECT).";
				}
				if(codProspect == ''  ||  codProspect == '-1'){
					msgAlerta += "NÃ£o foi retornado o CODIGO do cadastro do aluno. ";
				}
				if(msgAlerta != ''){
					Trabalho.alert( msgAlerta, 'danger', true);
					return false;
				} else {
					document.getElementById('codProspect').value = codProspect;
				}
	
	
				/** -------------------------------------------------- */
				// Salvar vÃ­nculo participante
				console.log('%c Gravando Vinculo do Aluno..', 'color:blue');
				var fieldsXml = ''+
				'<ZMDAGRPARTICIPANTES>'+
				'	<ID>' + 					idVinculo   + '</ID>' +
				'	<IDTRABALHO>' + 			idTrabalho  + '</IDTRABALHO>' +
				'	<CODCFO>' + 				document.getElementById('codCfo').value  + '</CODCFO>'+
				'	<CODPESSOA>' + 				document.getElementById('codPessoa').value  + '</CODPESSOA>' +
				'	<CODPROSPECT>' + 			codProspect + '</CODPROSPECT>' +
				'	<CODTIPOPARTICIPANTE>' + 	document.getElementById('valParticipante').value  + '</CODTIPOPARTICIPANTE>' +  // 1: Aluno, 2: Professor, 3: Escola, 4: Outros
				'	<ATIVO>' + 				 	'1'  		+ '</ATIVO>' +
				'	<CAMPOLIVRE>' + 			document.getElementById('txtEmail').value  + '</CAMPOLIVRE>' +
				'</ZMDAGRPARTICIPANTES>';
				var c1 = DatasetFactory.createConstraint('WEBSERVICE', 'ZMDAGRPARTICIPANTES', 	null, 1);
				var c2 = DatasetFactory.createConstraint('TYPE', 		'SaveRecord', 			null, 1);
				var c3 = DatasetFactory.createConstraint('fieldsXml', 	fieldsXml,				null, 1);
				var dataset = DatasetFactory.getDataset('rmSaveDefaultDataset', null, new Array(c1, c2, c3), null);
				console.log('ZMDAGRPARTICIPANTES', dataset);
				if(dataset !== null){
					if(dataset.values.length > 0){
						if(!dataset.values[0].ERROR){
							// Pega ID do Vinculo
							idVinculo = dataset.values[0].DS_RETORNO;
						} else {
							msgAlerta += "ERRO: " + dataset.values[0].DS_RETORNO + " (ZMDAGRPARTICIPANTES).";
						}
					} else {
						msgAlerta += "ERRO: NÃ£o foram retornados registros (ZMDAGRPARTICIPANTES).";
					}
				} else {
					msgAlerta += "ERRO: Consulta inexistente (ZMDAGRPARTICIPANTES).";
				}
				if(idVinculo == ''  ||  idVinculo == '-1'){
					msgAlerta += "NÃ£o foi retornado o ID do vÃ­nculo do aluno com o trabalho. ";
				}
			}
			if(msgAlerta != ''){
				Trabalho.alert( msgAlerta, 'danger', true);
				return false;
			} else {
				document.getElementById('idVinculo').value = idVinculo;
			}

			console.log('---> Dados Salvos: ', idCategoria, codCategoria, idTrabalho, codTrabalho, codProspect, idVinculo);
			Trabalho.alert('Dados salvos com sucesso.', 'success', true);
			return true
		
		} else if(nextState == 'salva_avaliacao'){
		} else if(nextState == 'cadastro_avaliacoes_notas'){
			
			// Salvando notas
			var ids = AvaliacoesNotas.props.id;
			idTrabalho = $('#' + ids.input.idWork ).val();
			
			var idTabela 	= ids.table.notas;
			var table 		= $('#' + idTabela );
			var rows		= table.find('tbody').find('tr:not([data-order="0"])');
			rows.each(function(ev){
				var row = $(this);
				fnSalvaAvaliacao(idTrabalho, row);
			});
		}

	} catch(erro) {
		fnRetornoErro(erro, 'a');	
		return false;
	}

	return true;
}

