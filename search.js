console.log('%c [v.up.0.0.2] search.js', 'color:gray');


function ConsultaVinculoFCFO(CODCFO){
	
	var c1 = DatasetFactory.createConstraint('CODCFO', CODCFO, CODCFO,ConstraintType.MUST);
	var constraints = new Array(c1);
	var dsVinculo = DatasetFactory.getDataset("rmSql_FLUIG004", null,constraints, null);
	var aVinculo = new Array();
	
	if(dsVinculo.values.length > 0 ){
		for(var i = 0; i < dsVinculo.values.length; i++){
			aVinculo.push(new Array(
				dsVinculo.values[i].CODPESSOA,
				dsVinculo.values[i].IDVINCULO,
				dsVinculo.values[i].NOME_PESSOA,
				dsVinculo.values[i].FCFO_ATIVO == "1" ? "Ativo" : "Inativo",
 				dsVinculo.values[i].CARGO,
				dsVinculo.values[i].DTVINCULOINI.substring(0,10).split('-').reverse().join('/'),
				dsVinculo.values[i].DTVINCULOFIM.substring(0,10).split('-').reverse().join('/'),
				dsVinculo.values[i].RESPONSAVEL
			));
		}
	}
	
	return aVinculo;
}





function fnPopulaDadosEscola(idForm){
	
//	var formLoading = FLUIGC.loading('#' + idForm);
//	formLoading.show();

	
	var msgErro		= ''
	var auxCidade	= ''
	var codCfo 		= $('#codCfo').val();
	var c0 			= DatasetPublic.createConstraint('CODCFO', codCfo, null, ConstraintTypePublic.MUST);
	var dp_escola 	= myMints.custom.dataset.get('rmSql_finEscolas', null, [c0], null);
	if(DatasetPublic.validateReturn(dp_escola)){
		if(dp_escola.rowsCount > 0){
			var form = $('#' + idForm);
			for (var idModel in dp_escola.values[0]) {
				var value = dp_escola.values[0][idModel]; 
				var item  = form.find('[data-rel-value=' + idModel + ']');
				

				if(item !== undefined){
					if((idModel == 'CIDADE')  && (value.toString() != '')){
//						var itemAux  = form.find('[data-rel-value=CODMUNICIPIO]');
//						var valueAux = itemAux.val();
//						if((itemAux !== undefined) && (valueAux == '')){
//					        itemAux.find('option:contains(' + value + ')').each(function(){
//					            if($(this).text() == value){
//					                valueAux = $(this).val();
//					            }
//					        });
//					        itemAux.val( valueAux );
//					    }
						auxCidade = value;
						
					} else if((idModel == 'CODMUNICIPIO')  && (value.toString() == '')){
						// Pesquisando código da cidade na lista de cidades
						item.find('option:contains(' + auxCidade + ')').each(function(){
				            if($(this).text() == auxCidade){
				                value = $(this).val();
				            }
				        });
						var itemAux = form.find('[data-rel-value=CODMUNICIPIO]');
				        itemAux.val( value );
					}
					item.val( '' );
					item.val( value  );
				}
			}
			
			var itemAux = form.find('[data-rel-value=CODMUNICIPIO]');
			if(itemAux.val() === ''){
				var id 		= Escola.props.id.select.city;
				var value 	= form.find('[data-rel-value=ESTADO]').val();
				var clearIds= '';//('#' + Escola.props.id.input.codCity + ', #' + Escola.props.id.input.city); 
				myMints.custom.document.setLinkSelectUf(id, value, clearIds);
				
				itemAux.find('option:contains(' + auxCidade + ')').each(function(){
		            if($(this).text() == auxCidade){
		                value = $(this).val();
		            }
		        });
				var itemAux = form.find('[data-rel-value=CODMUNICIPIO]');
		        itemAux.val( value );
			}
			
			var msgErroResp = '';
			var cargo = 'Responsável';			
			var db_vinculo = fnConsultaParceiros(codCfo, '', cargo);
			if(DatasetPublic.validateReturn(db_vinculo)){
				if(db_vinculo.rowsCount > 0){
					for (var idModel in db_vinculo.values[0]) {
						var value = db_vinculo.values[0][idModel]; 
						idModel = ((idModel.indexOf('VINCULO_') == -1) ? 'VINCULO_' : '' ) + idModel
						var item  = form.find('[data-rel-value=' + idModel + ']');
						
						item.val( '' );
						item.val( value  );
					}
				} else {
					msgErroResp = 'Não foi encontrado o responsável da escola!';
				}
			} else {
				msgErroResp = 'Não foi possível encontrar  o responsável da escola selecionada!';
			}

//			var itens = new Object();
//			for (idModel in dp_escola.values[0]) {
//				itens[  form.find('[data-rel-value=' + idModel + ']').attr('id') ] = dp_escola.values[0][idModel];
//			}
//			myMints.custom.setDirectInputs(itens);
		} else {
			msgErro = 'Não foi possível encontrar os dados da escola!';
		}
	} else {
		msgErro = 'Não foi possível encontrar o registro da escola selecionada!';
	}
	
	if(msgErro != ''){
		$('#' + idForm).find('input, select, textarea').val('');
		Escola.alert(msgErro);
	} else {
		if(msgErroResp != ''){
			Escola.alert(msgErroResp);
		}
//		formLoading.hide();
	}
	
}



function fnPopulaDadosProfessor(idForm, novoVinculo){
	
	novoVinculo = (novoVinculo === undefined  ||  novoVinculo === '') ? false : novoVinculo;
	
//	var formLoading = FLUIGC.loading('#' + idForm);
//	formLoading.show();

	
	var msgErro		 = '';
	var auxCidade	 = '';
	var codCfo	 	 = $('#codCfo').val();
	var codPessoa	 = $('#codPessoaProfessor').val();
	var dp_professor = buscaPessoaCompleto(codPessoa);
	if(DatasetPublic.validateReturn(dp_professor)){
		if(dp_professor.rowsCount > 0){
			var form = $('#' + idForm);
			for (var idModel in dp_professor.values[0]) {
				var value = dp_professor.values[0][idModel]; 
				var item  = form.find('[data-rel-value=' + idModel + ']');
				
				if(item !== undefined){
					if((idModel == 'DTNASCIMENTO')  && (value.toString() != '')){					
						//value = fnAjustaData(value, '', 'RM', 'FLUIG');
						value = moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY');
						
					} else if((idModel == 'CIDADE')  && (value.toString() != '')){
//						var itemAux  = form.find('[data-rel-value=CODMUNICIPIO]');
//						var valueAux = itemAux.val();
//						if((itemAux !== undefined) && (valueAux == '')){
//					        itemAux.find('option:contains(' + value + ')').each(function(){
//					            if($(this).text() == value){
//					                valueAux = $(this).val();
//					            }
//					        });
//					        itemAux.val( valueAux );
//					    }
						auxCidade = value;
						
					} else if((idModel == 'CODMUNICIPIO')  && (value.toString() == '')){
						// Pesquisando código da cidade na lista de cidades
						item.find('option:contains(' + auxCidade + ')').each(function(){
				            if($(this).text() == auxCidade){
				                value = $(this).val();
				            }
				        });
						var itemAux = form.find('[data-rel-value=CODMUNICIPIO]');
				        itemAux.val( value );
					}
					
					item.val( '' );
					item.val( value  );
				}
			}
			
			// Reconstroe select de cidades a partir do valor do estado selecionado
			var itemAux = form.find('[data-rel-value=CODMUNICIPIO]');
			if(itemAux.val() === ''){
				var id 		= Professor.props.id.select.city;
				var value 	= form.find('[data-rel-value=ESTADO]').val();
				var clearIds= '';//('#' + Professor.props.id.input.codCity + ', #' + Professor.props.id.input.city); 
				myMints.custom.document.setLinkSelectUf(id, value, clearIds);
				
				itemAux.find('option:contains(' + auxCidade + ')').each(function(){
		            if($(this).text() == auxCidade){
		                value = $(this).val();
		            }
		        });
				var itemAux = form.find('[data-rel-value=CODMUNICIPIO]');
		        itemAux.val( value );
			}
			
			
			var cargo = 'Professor(a)';
			var db_vinculo = fnConsultaParceiros(codCfo, codPessoa, cargo);
			if(DatasetPublic.validateReturn(db_vinculo)){
				if(db_vinculo.rowsCount > 0){
					for (var idModel in db_vinculo.values[0]) {
						var value = db_vinculo.values[0][idModel]; 
						idModel = ((idModel.indexOf('VINCULO_') == -1) ? 'VINCULO_' : '' ) + idModel
						var item  = form.find('[data-rel-value=' + idModel + ']');
						
						item.val( '' );
						item.val( value  );
					}
				} else {
					if(!novoVinculo){
						msgErro = 'Não foi encontrado o vínculo do professor!';
					}
				}
			} else {
				if(novoVinculo){
					form.find('[data-rel-value=VINCULO_IDVINCULO]').val( '-1' );
					form.find('[data-rel-value=VINCULO_CODCFO]').val( 	 codCfo );
					form.find('[data-rel-value=VINCULO_CODPESSOA]').val( codPessoa );
					
				} else {
					msgErro = 'Não foi possível encontrar o vínculo do professor selecionado!';
				}
			}
			
		} else {
			msgErro = 'Não foi possível encontrar os dados do professor!';
		}
	} else {
		msgErro = 'Não foi possível encontrar o registro da professor selecionado!';
	}
	
	if(msgErro != ''){
		$('#' + idForm).find('input, select, textarea').val('');
		Professor.alert(msgErro);
	} else {
		if(novoVinculo){
			$('#' + idForm).find('input, select, textarea').attr('readonly', false);
			$('#' + Professor.props.id.select.join.role + ', #' + Professor.props.id.input.cpf + ', #' + Professor.props.id.input.dtBorn ).attr('readonly', true);
			$('#' + Professor.props.id.button.submit.top + ', #' + Professor.props.id.button.submit.bottom).attr('disabled', false);
			$('#' + Professor.props.id.select.join.role ).val( 'Professor(a)' );
			$('#' + Professor.props.id.select.join.active ).val( '1' );
		}
//		formLoading.hide();
	}
}



buscaPessoa = function(codPessoa) {
	if (codPessoa != ''){
		var c1 = DatasetPublic.createConstraint('codigo', codPessoa, codPessoa, ConstraintTypePublic.MUST);
		var pPessoa = DatasetPublic.getDataset("rm_ppessoa_senar", null, [c1], null);
		if (pPessoa.values.length > 0) {
			return pPessoa;
		} else {
			return null;
		}
	} else {
		return null;
	}
};

buscaPessoaCompleto = function(codPessoa) {
	if (codPessoa != ''){
		var c1 = DatasetPublic.createConstraint('CODIGO', codPessoa, codPessoa, ConstraintTypePublic.MUST);
		var pPessoa = DatasetPublic.getDataset("rm_ppessoa_readrecordauth", null, [c1], null);
		if (pPessoa.values.length > 0) {
			return pPessoa;
		} else {
			return null;
		}
	} else {
		return null;
	}
}



function fnConsultaParceiros(codCfo, codPessoa, cargo){
	
	if((codCfo != '') && (codCfo !== undefined)){
		var v1 = DatasetPublic.createConstraint('CODCFO', 			codCfo, 	"", ConstraintTypePublic.MUST);
		var v2 = DatasetPublic.createConstraint('CODPESSOA', 		codPessoa, 	"", ConstraintTypePublic.MUST);
		var v3 = DatasetPublic.createConstraint('EMAIL', 			"", 		"", ConstraintTypePublic.MUST);
		var v4 = DatasetPublic.createConstraint('PESSOAFISOUJUR', 	"J", 		"", ConstraintTypePublic.MUST); 
		var v5 = DatasetPublic.createConstraint('CARGO', 			cargo, 		"", ConstraintTypePublic.MUST); 
		var v6 = DatasetPublic.createConstraint('FCFO_ATIVO', 		1, 			"", ConstraintTypePublic.MUST);
		var v7 = DatasetPublic.createConstraint('VINCULO_ATIVO',	1, 			"", ConstraintTypePublic.MUST);
		var filtros = new Array(v1, v2, v3, v4, v5, v6, v7);
		var db_pj2pf = DatasetPublic.getDataset("ds_grListaVinculoFcfoPpessoa_2_SENAR", null, filtros, null);  // Verificar campos do Dataserver do Dataset
		if(db_pj2pf.values.length > 0){
			if(db_pj2pf.values[0].DS_RETORNO == ""){
				return db_pj2pf;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
}


function fnBuscaVinculo(codCfo, codPessoa, cargo){
	
	if((codCfo != '') && (codCfo !== undefined)){
		var c0 = DatasetPublic.createConstraint('CODCFO', 		codCfo, 	null, 	ConstraintTypePublic.MUST);
		var c1 = DatasetPublic.createConstraint('CODPESSOA', 	codPessoa, 	null, 	ConstraintTypePublic.MUST);
		var c2 = DatasetPublic.createConstraint('CARGO', 	   	cargo, 		null, 	ConstraintTypePublic.MUST);
		//var constraints = new Array(c1,c2);
		var dp_vinculo = DatasetPublic.getDataset("rm_RMSPRJ4555776Server_consulta_vinculo", null, [c0, c1, c2], null);
		//console.log(dsVinculo)
		if(dp_vinculo.values.length > 0){
			if(dp_vinculo.values[0].DS_RETORNO == ""){
				return dp_vinculo;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
}


function fnValidaPessoa(cpf, dt, retorno){
	if (cpf != '' &&  cpf !== null  &&  cpf !== undefined){
		cpf = cpf.replace(/\D/g, '');
		var c0 = DatasetPublic.createConstraint('CPF', cpf, cpf, ConstraintTypePublic.MUST);
		
		if(retorno != 'DATANASCIMENTO'  &&  retorno != 'DTNASCIMENTO'){
//			if(dt == '' ||  dt === null  ||  dt === undefined){
//				return '-2';				
//			} else {
				var c1 = DatasetPublic.createConstraint('DTNASCIMENTO', dt,  dt,  ConstraintTypePublic.MUST);
				var filtros = new Array(c0, c1);
//			}
		} else {
			var filtros = new Array(c0);
		}
		var pPessoa = DatasetPublic.getDataset("rm_ppessoa_senar", null, filtros, null);
	
		if (pPessoa.values.length > 0){
			if(retorno == 'DATANASCIMENTO'){
				return pPessoa.values[0].DATANASCIMENTO;
				
			} else if(retorno == 'DTNASCIMENTO'){
				return pPessoa.values[0].DTNASCIMENTO;
				
			} else {
				return pPessoa.values[0].CODIGO;
			}
		} else {
			return '-1';
		}
	} else {
		return '-1';
	}
}

function buscaTrabalho(idTrabalho, fields){
	if (idTrabalho != ''){
		fields = (fields === undefined)? null : fields ;
		var c0 = DatasetFactory.createConstraint('WEBSERVICE', 'LISTA_TRABALHOS_AGRINHO', null, ConstraintType.MUST);
		var c1 = DatasetFactory.createConstraint('IDTRABALHO', idTrabalho, null, ConstraintType.MUST);
		var DS_TRABALHO = DatasetFactory.getDataset('rmSqlDefaultDataset', fields, [c0, c1], null);
		if (DS_TRABALHO.values.length > 0) {
			return DS_TRABALHO;
		} else {
			return null;
		}
	} else {
		return null;
	}
}

function fnPopulaDadosTrabalhos(idForm, fields){
	
//	var formLoading = FLUIGC.loading('#' + idForm);
//	formLoading.show();

	
	var msgErro		 = '';
	var auxCidade	 = '';
	var codEscola 	 = '';
	var cnpjEscola	 = '';
	var auxEscola	 = '';
	var codProfessor = '';
	var cpfProfessor = '';
	var auxProfessor = '';
	var dtNascimento = '';
	var idTrabalho 	 = $('#idTrabalho').val();

	console.log('fnPopulaDadosTrabalhos:', idForm, idTrabalho)
	
	if(idTrabalho == ''){
		msgErro = 'Não foi encontrado o "idTrabalho" !';
	} else {
		var DS_TRABALHO  = buscaTrabalho(idTrabalho, fields);
		if(DatasetPublic.validateReturn(DS_TRABALHO)){
			//if(DS_TRABALHO.rowsCount > 0){
			if(DS_TRABALHO.values.length > 0){
				var form = $('#' + idForm);
				for (var idModel in DS_TRABALHO.values[0]) {
					var value = DS_TRABALHO.values[0][idModel]; 
					var item  = form.find('[data-rel-value=' + idModel + ']');
					
					if(item !== undefined){
						/*
						if(((idModel == 'PROSPECT_DATANASCIMENTO')  ||  (idModel == 'PROSPECT_DTEMISSAOIDENT'))  && (value.toString() != '')){
							if(value.indexOf('-') > -1){
								value = moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY');
							}
							
						} else 
						*/
						if((idModel == 'PROSPECT_CIDADE') 	 && (value.toString() != '')){
							auxCidade = value;
							
						} else if((idModel == 'CODESCOLA')  		&& (value != '')){
							codEscola = value;							
						} else if((idModel == 'ESCOLA_NOME')  		&& (value != '')){
							auxEscola = value;
						} else if((idModel == 'ESCOLA_CNPJ')  		&& (value != '')){
							cnpjEscola = value;
							
						} else if((idModel == 'CODPROFESSOR')  		&& (value != '')){
							codProfessor = value;							
						} else if((idModel == 'PROFESSOR_NOME')  	&& (value != '')){
							auxProfessor = value;
						} else if((idModel == 'PROFESSOR_CPF')  	&& (value != '')){
							cpfProfessor = value;
							
						} else if((idModel == 'PROSPECT_CODMUNICIPIO')  && (value.toString() == '')){
							// Pesquisando código da cidade na lista de cidades
							item.find('option:contains(' + auxCidade + ')').each(function(){
					            if($(this).text() == auxCidade){
					                value = $(this).val();
					            }
					        });
							var itemAux = form.find('[data-rel-value=PROSPECT_CODMUNICIPIO]');
					        itemAux.val( value );
						} else if((idModel == 'PROSPECT_DATANASCIMENTO')  && (value == '')){
							dtNascimento = value;
						}
						
						item.val( '' );
						item.val( value  );
					}
				}
				
				if(dtNascimento != ''){
					$('#dtNascimento').val( dtNascimento );
				}

				
				if(codEscola != ''){
					var options = new Object();
					options[codEscola] = auxEscola;
					var htmlOp = myMints.custom.document.createSelectOptions(options);
					form.find('#selEscolas').html( htmlOp ).val( codEscola );
					
					if($('#numCgcEscola').val() == ''){
						$('#numCgcEscola').val( cnpjEscola );
					}
				}
				if(codProfessor != ''){
					if(codEscola != ''){
						//var codEscola = $('#' + Trabalho.props.id.select.school).val();
						var options = fnAtualizaSelect('escola_professor', codEscola);					
						Object.keys( myModelData.modelItens.PROFESSORES(codEscola, '', 'Professor(a)', '1') ).length;
					} else {
						var options = new Object();
						options[codProfessor] = auxProfessor;
						var htmlOp = myMints.custom.document.createSelectOptions(options);
						//form.find('#selProfessores').html( htmlOp ).val( codProfessor );
						form.find('#selProfessores').html( htmlOp );
					}
					form.find('#selProfessores').val( codProfessor );
					form.find('#codProfessor').val( codProfessor );
					
					if($('#numCpfProfessor').val() == ''){
						$('#numCpfProfessor').val( cpfProfessor );
					}
				}
				
				// Reconstroe select de cidades a partir do valor do estado selecionado
				var itemAux = form.find('[data-rel-value=PROSPECT_CODMUNICIPIO]');
				if(itemAux.val() === ''){
					var id 		= Trabalho.props.id.select.city;
					var value 	= form.find('[data-rel-value=PROSPECT_CODETD]').val();
					var clearIds= ''; 
					myMints.custom.document.setLinkSelectUf(id, value, clearIds);
					
					itemAux.find('option:contains(' + auxCidade + ')').each(function(){
			            if($(this).text() == auxCidade){
			                value = $(this).val();
			            }
			        });
					var itemAux = form.find('[data-rel-value=PROSPECT_CODMUNICIPIO]');
			        itemAux.val( value );
				}
			} else {
				msgErro = 'Não foi possível encontrar os dados do trabalho!';
			}
		} else {
			msgErro = 'Não foi possível encontrar o registro do trabalho selecionado!';
		}
	}
	
	if(msgErro != ''){
		$('#' + idForm).find('input, select, textarea').val('');
		Trabalho.alert(msgErro);
	} else {
//		formLoading.hide();
	}
//	_global.autoClose = true;
}



function fnBuscaAvaliacoes(idTrabalho, ativo, notaAtiva, codTipoNota){
	//(idTrabalho 	=== undefined) ? idTrabalho  = ''  : '' ;
	(ativo 			=== undefined) ? ativo 		 = '1' : '' ;
	(notaAtiva 		=== undefined) ? notaAtiva 	 = '1' : '' ;
	(codTipoNota 	=== undefined) ? codTipoNota = ''  : '' ;
	if (idTrabalho != ''){
		var c0 = DatasetFactory.createConstraint('WEBSERVICE', 	'LISTA_AVALIACOES_NOTAS_AGRINHO', null, ConstraintType.MUST);
		var c1 = DatasetFactory.createConstraint('IDTRABALHO', 	idTrabalho, 	null, 	ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint('ATIVO', 		ativo, 			null, 	ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint('NOTAATIVA', 	notaAtiva, 		null, 	ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint('CODTIPONOTA', codTipoNota,	null, 	ConstraintType.MUST);
		var DS_AVALIACOES = DatasetFactory.getDataset('rmSqlDefaultDataset', null, [c0, c1, c2, c3, c4], null);
		if (DS_AVALIACOES.values.length > 0) {
			return DS_AVALIACOES;
		} else {
			return null;
		}
	} else {
		return null;
	}
}


function fnPopulaAvaliacoes(idTabela){
	
//	var formLoading = FLUIGC.loading('#' + idTabela);
//	formLoading.show();

	var ids = AvaliacoesNotas.props.id;
	var msgErro		   	= '';
	var tipoMsg 		= 'danger';
	var idAvaliacao	   	= '';
	var auxIdAvaliacao 	= '-1';
	var n = 1;
	var auxIdAvaliador 	= '';
	var auxCodBanca	   	= '';
	var auxCodTipoNota	= '';
	var auxNota			= '';
	var auxMnemonico	= '';
	var idTrabalho 	 	= $('#idTrabalho').val();
	var codTrabalho 	= $('#codTrabalho').val();

	console.log('fnPopulaAvaliacoes:', idTabela, idTrabalho);
	
	if(idTrabalho == ''){
		msgErro = 'Não foi encontrado o "idTrabalho" !';
	} else {
		$('#' + idTabela).find('tbody > tr:not([data-order="0"])').remove();
		var DS_AVALIACOES = fnBuscaAvaliacoes(idTrabalho, '1');
		if(DatasetPublic.validateReturn(DS_AVALIACOES)){
			//if(DS_AVALIACOES.rowsCount > 0){
			if(DS_AVALIACOES.values.length > 0){
				for(var i=0; i < DS_AVALIACOES.values.length; i++){
					idAvaliacao = DS_AVALIACOES.values[i]['IDAVALIACAO'];
					var auxN = '';
					var auxJaExiste  = false;
					var auxMedia 	 = false;
					var auxNovaLinha = false;
					var auxId 		 = auxIdAvaliacao;
					if(idAvaliacao != auxIdAvaliacao){
						if(idAvaliacao != '-1'){
							$('#' + idTabela).find('tbody > tr:not([data-order="0"])').each(function(el){
								if(!auxJaExiste){
							    	var auxN = $(this).attr('data-order');
							    	//console.log('auxN: ', auxN);
							    	$(this).find('[id^=idAvaliacao]').each(function(el){
							    		//console.log('idAvaliacao: ', $(this).val(), idAvaliacao, (idAvaliacao == $(this).val()));
							        	if(idAvaliacao == $(this).val()){
							            	auxJaExiste = true;			
							        	}
							    	});
							    }
							});
						}
						if(DS_AVALIACOES.values[i]['CODTIPOAVALIACAO'] == '0'){
							auxMedia = true;
						}
						if(auxMedia){
							n = 'MEDIA';
						} else if(auxJaExiste){
						    n = auxN;
						} else {
						    n = fnAddLinhaTabela(idTabela);
						    auxNovaLinha = true;
						}
						//console.log('--> ', n, auxN, auxJaExiste);
						auxIdAvaliacao = idAvaliacao;
					}
//console.log('%c -> (' + DS_AVALIACOES.values[i].IDAVALIACAO + ')(' + idAvaliacao + ')(' + auxId + ']  : ' + auxJaExiste, 'color:red');
					
					var form = $('#' + idTabela).find('tbody > tr[data-order="' + n + '"]');
					if(auxNovaLinha){
						fnAjustaNotaAvaliacao(form, n);
					}
					// Limbando variáveis auxiliares
					auxCodTipoNota 	= '';
					auxNota 		= '';
					auxMnemonico 	= '';
					auxIdAvaliador 	= '';
					auxCodBanca 	= '';
					
					for(var idModel in DS_AVALIACOES.values[i]) {
						var value = DS_AVALIACOES.values[i][idModel]; 
						var auxModel = idModel;
						if(((idModel == 'IDNOTA')  ||  (idModel == 'NOTA')  ||  (idModel == 'MNEMONICO'))  &&  (value.toString() != '')){					
							if(idModel == 'IDNOTA'){
								var auxModel = 'IDNOTA_';
							} else {
								var auxModel = 'NOTA_';
							}
							auxModel += DS_AVALIACOES.values[i]['CODTIPONOTA'];
						}
						var item  = form.find('[data-rel-value=' + auxModel + ']');
//if(item.attr('id') !== undefined){
//	console.log('%c ===>> ' + idModel + ' - ' + auxModel + ' [' + value + '] ' + item.attr('id'), 'color:orange');
//} else {
//	console.log('%c --->> ' + idModel + ' - ' + auxModel + ' [' + value + '] ' + item.attr('id'), 'color:black');
//}
////						if((idModel == 'IDAVALIACAO')  &&  (value != '')){
////							idAvaliacao = DS_AVALIACOES.values[i]['IDAVALIACAO'];
////						}
						
						if((idModel == 'CODTIPONOTA')  &&  (value.toString() != '')){
							auxCodTipoNota = DS_AVALIACOES.values[i]['CODTIPONOTA'];
							
						} else if((idModel == 'NOTA')  &&  (value.toString() != '')){
							auxNota = DS_AVALIACOES.values[i]['NOTA'].toString().replace('.',',');
							
						} else if((idModel == 'MNEMONICO')  &&  (value.toString() != '')){
							auxMnemonico = DS_AVALIACOES.values[i]['MNEMONICO'];
							
						}
						
						if(item !== undefined){
							if((idModel == 'IDAVALIADOR')  && (value.toString() != '')){
								auxIdAvaliador = value;
								
							} else if((idModel == 'CODBANCA')  && (value.toString() != '')){
								auxCodBanca = value;
							}	
							
							item.val( '' );
							item.val( value  );
						}
					}
					
					// Ajusta Notas de Conceito (Mnemônicos)
					if(auxNota.toString() == '-1'  &&  auxMnemonico.toString() != ''){
						var auxModel = 'NOTA_' + auxCodTipoNota;
						var item  	 = form.find('[data-rel-value=' + auxModel + ']');
						item.val( auxMnemonico  );
					}
					
					// Ajustando tipo de lançamento
				    var id 		= (ids.select.typeNota + '___' + n)
				    var valId 	= $('#' + id).val();
				    fnAjustaBanca(valId, n, auxIdAvaliador, auxCodBanca);
				}

				
				// Recalcula totais
				$('#' + idTabela).find('tbody > tr:not([data-order="0"])').each(function(el){
					var ids = AvaliacoesNotas.props.id;
					var row = $(this);					
					fnCalculaTotal(row);					
				});
			} else {
				msgErro = 'Não foi possível encontrar as <b>avaliações</b> do trabalho!';
			}
		} else {
			msgErro = 'Não foi possível encontrar as <b>avaliações</b> do trabalho selecionado!';
			tipoMsg = 'warning';
		}
		
		if(msgErro == ''){
			var arrNotasFinais = fnBuscaNotasFinais(idTrabalho, codTrabalho, idAvaliacao, key);
			var idAvaliacao = arrNotasFinais[0];
			var idNota 		= arrNotasFinais[1];
			
			$('#' + ids.input.idValuationMf).val( idAvaliacao );
			
			if(codTrabalho != ''  &&  ((key === undefined)  ||  (key == ''))){
				var key = codTrabalho;
				if(_avaliacoesMedias[key] !== undefined){
					
					$('#' + ids.input.notas.idmf	).val( idNota['MF'] );
					$('#' + ids.input.notas.mf		).val( _avaliacoesMedias[key]['_NOTA_MF'] );
			         
					$('#' + ids.input.notas.idbmf	).val( idNota['BMF'] );
					$('#' + ids.input.notas.bmf		).val( _avaliacoesMedias[key]['_NOTA_BMF'] );

					$('#' + ids.input.notas.idmff	).val( idNota['MFF'] );
					$('#' + ids.input.notas.mff		).val( _avaliacoesMedias[key]['_NOTA_MFF'] );
				}
			}
		}
	}
	
	if(msgErro != ''){
		//$('#' + idTabela).find('input, select, textarea').val('');
		AvaliacoesNotas.alert(msgErro, tipoMsg);
//		if(tipoMsg == 'warning'){
////			formLoading.hide();
//		}
	} else {
//		formLoading.hide();
	}
//	_global.autoClose = true;
}


function fnBuscaNotasFinais(idTrabalho, codTrabalho, idAvaliacao, key){
	console.log('fnBuscaNotasFinais: ', idTrabalho, codTrabalho, idAvaliacao, key)
	
	var msgErro		   	= '';
	var tipoMsg 		= 'danger';

	if((idTrabalho  === undefined  ||  idTrabalho == '')
	&& (codTrabalho === undefined  ||  codTrabalho == '')){
		idTrabalho 	 	= $('#idTrabalho').val();
		codTrabalho 	= $('#codTrabalho').val();
	}
	
	if(codTrabalho != ''  &&  ((key === undefined)  ||  (key == ''))){
		key = codTrabalho;
	}
	if(_avaliacoesMedias[key] === undefined){
		_avaliacoesMedias[key] = {
			'IDAVALIACAO':	0,
			'IDMF': 		0,
			'NOTA_MF': 		'',
			'_NOTA_MF': 	0,
			'DIFF_MF':		'',
			'IDBMF': 		0,
			'NOTA_BMF': 	'',
			'_NOTA_BMF': 	0,
			'IDMFF': 		0,
			'NOTA_MFF': 	'',
			'_NOTA_MFF': 	0,
			'IDTRABALHO': 	idTrabalho,
			'CODTRABALHO': 	codTrabalho,
	    }
	}
	
	var idNota = {
		MF:  '-1', 	 
		BMF: '-1',
		MFF: '-1'
	};
	
	var auxIdAvaliacao = 0;
	var DS_NOTAS_FINAIS = fnBuscaIdsNotasFinais(idTrabalho, codTrabalho);
	if(DatasetPublic.validateReturn(DS_NOTAS_FINAIS)){
		if(DS_NOTAS_FINAIS.values.length > 0){
			for(var i=0; i < DS_NOTAS_FINAIS.values.length; i++){
				if(DS_NOTAS_FINAIS.values[i].IDAVALIACAO != ''){
					
					auxIdAvaliacao = DS_NOTAS_FINAIS.values[i].IDAVALIACAO;
					
					if( DS_NOTAS_FINAIS.values[i].MF  != ''
					&&  DS_NOTAS_FINAIS.values[i].BMF != ''
					&&  DS_NOTAS_FINAIS.values[i].MFF != ''){
						
						idAvaliacao = auxIdAvaliacao;
						
						for(var tipoNota in idNota){
	
							var arrNotaFinal = DS_NOTAS_FINAIS.values[i][tipoNota].split('|');
							if(arrNotaFinal.length > 1){
								
								var auxIdNota = arrNotaFinal[0];
								idNota[tipoNota] = auxIdNota;
								
								var auxNota = parseFloat( parseFloat( arrNotaFinal[1] ).toFixed(2) );
								auxNota 	= (isNaN(auxNota)) ? 0.0 : auxNota ;
								
								if((key !== undefined)  &&  (key != '')){
									_avaliacoesMedias[key]['_NOTA_' + tipoNota]  = auxNota;
								//} else {
								}
								console.log('-- DS_NOTAS_FINAIS: ',  idAvaliacao, ' -> ', tipoNota, auxIdNota, auxNota, arrNotaFinal);
							}
						}
					}
				}
			}
		} else {
			msgErro = 'Não foi possível encontrar as <b>médias finais</b> do trabalho!';
			console.log('%c-> Sem registros DS_NOTAS_FINAIS : ' + idTrabalho + ' - ' + codTrabalho, 'color:red');
		}
	} else {
		msgErro = 'Não foi possível encontrar as <b>médias finais</b> do trabalho selecionado!';
		tipoMsg = 'warning';
	}
	
	if(idAvaliacao == 0  &&  auxIdAvaliacao != ''){
		idAvaliacao = auxIdAvaliacao;
	}

	if( idNota['MF']  == '-1'  
	||  idNota['BMF'] == '-1'  
	||  idNota['MFF'] == '-1'){
		for(var tipoNota in idNota){
			var DS_NOTA = fnBuscaNotas(idTrabalho, codTrabalho, '', '0', '', tipoNota);
			if(DatasetPublic.validateReturn(DS_NOTA)){
				if(DS_NOTA.values.length > 0){
					idAvaliacao 	 = (idAvaliacao == 0  ||  idAvaliacao == '') ?  DS_NOTA.values[0].IDAVALIACAO  :  idAvaliacao ;							
					var auxIdNota 	 = DS_NOTA.values[0].IDNOTA;
					idNota[tipoNota] = auxIdNota;
					
					var auxNota = parseFloat( parseFloat( DS_NOTA.values[0].NOTA ).toFixed(2) );
					auxNota 	= (isNaN(auxNota)) ? 0.0 : auxNota ;
					
					if((key !== undefined)  &&  (key != '')){
						_avaliacoesMedias[key]['_NOTA_' + tipoNota]  = auxNota;
					//} else {						
					}
					console.log('-- DS_NOTA: ',  idAvaliacao, ' -> ',   tipoNota, auxIdNota, auxNota);
				} else {
					console.log('%c-> Sem registros DS_NOTA (' + tipoNota + ') : ' + idTrabalho + ' - ' + codTrabalho, 'color:red');
				}
			}
		}
	}
	
	//console.log('idNota: ', idNota);

	idAvaliacao = (idAvaliacao == 0  ||  idAvaliacao == '') ? '-1' : idAvaliacao ;
	
	_avaliacoesMedias[key].IDAVALIACAO = idAvaliacao;
	_avaliacoesMedias[key].IDMF  = idNota['MF'];
	_avaliacoesMedias[key].IDBMF = idNota['BMF'];
	_avaliacoesMedias[key].IDMFF = idNota['MFF'];

	
	if((key === undefined)  ||  (key == '')){
	} else {
		if(msgErro != ''){
			AvaliacoesNotas.alert(msgErro, tipoMsg, true);
		}
	}
	
	return  [idAvaliacao, idNota];
}


function fnListaTrabalhos(parans){
	
	var fields = []; //'IDTRABALHO','CODTRABALHO','ESCOLA_NOME','ESCOLA_CIDADE','PROFESSOR_NOME','PROSPECT_NOME'];
	
	
	var _parans = new Object();
	_parans = {
		idTrabalho: 		'',
		codTrabalho: 		'',
		ano: 				'',
		codGrupo: 			'',
		idCategoria: 		'',
		codCategoria: 		'',
		codStatus: 			'',
		erroDigitacao: 		'',
		possuiDeficiencia: 	'',
		idRegional: 		'',
		codRegional: 		'',
		codMunicipio: 		'',
		cidade: 			'',
		codEscola:			'',
		ativo: 				'',
		idAvaliacao: 		'',
		codTipoAvalicao: 	'',
		codStatusAva: 		'',
		avaliacaoAtiva: 	'',
		idBanca: 			'',
		codBanca: 			'',
		idAvaliador: 		'',
		codPessoa: 			'',
		codTipoNota: 		'',
		notaAtia: 			'',
		qtdDesclassificado: ''
	}
	
	

	for(p in _parans){
		_parans[p] = (parans[p] === undefined) ?  '' : parans[p] ;
	}
	
	
	var cst = new Array();
	cst.push( DatasetFactory.createConstraint('WEBSERVICE', 		'LISTA_TRABALHOS_NOTAS_AGRINHO', 	null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('IDTRABALHO', 		_parans.idTrabalho, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODTRABALHO', 		_parans.codTrabalho, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('ANO', 				_parans.ano, 				null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODGRUPO', 			_parans.codGrupo, 			null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('IDCATEGORIA', 		_parans.idCategoria, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODCATEGORIA', 		_parans.codCategoria, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODSTATUS', 			_parans.codStatus, 			null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('ERRODIGITACAO', 		_parans.erroDigitacao, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('POSSUIDEFICIENCIA', 	_parans.possuiDeficiencia, 	null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('IDREGIONAL', 		_parans.idRegional, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODREGIONAL', 		_parans.codRegional, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODMUNICIPIO', 		_parans.codMunicipio, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CIDADE', 			_parans.cidade, 			null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODESCOLA', 			_parans.codEscola, 			null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('ATIVO', 				_parans.ativo, 				null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('IDAVALIACAO', 		_parans.idAvaliacao, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODTIPOAVALIACAO', 	_parans.codTipoAvalicao, 	null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('AVALIACAOCODSTATUS', _parans.codStatusAva, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('AVALIACAOATIVA', 	_parans.avaliacaoAtiva, 	null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('IDBANCA', 			_parans.idBanca, 			null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODBANCA', 			_parans.codBanca, 			null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('IDAVALIADOR', 		_parans.idAvaliador, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODPESSOA', 			_parans.codPessoa, 			null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODTIPONOTA', 		_parans.codTipoNota, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('NOTAATIVA', 			_parans.notaAtia, 			null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('QTD_AVA_DESCLASSIFICOES', _parans.qtdDesclassificado, null, 	ConstraintType.MUST) );

	var k = 0;
	var constraints = new Array();	
	for(var i=0; i < cst.length; i++){
		//if((cst[i]['_finalValue']  !=  '___NULL___VALUE___')  ||  (cst[i]['_initialValue']  !=  '___NULL___VALUE___')){
		if((cst[i]['_initialValue'].toString()  !=  '___NULL___VALUE___')  &&  (cst[i]['_initialValue'].toString()  !=  '')){			
			constraints[k] = cst[i];
			k++;
		}
	}
	
	var DS_LISTA_TRABALHOS = DatasetFactory.getDataset('rmSqlDefaultDataset', fields, constraints, null);
	if (DS_LISTA_TRABALHOS.values.length > 0) {
		return DS_LISTA_TRABALHOS;
	} else {
		return null;
	}
}



function fnListaTrabalhosEmpatados(parans){
	
	var fields = []; //'IDTRABALHO','CODTRABALHO','ESCOLA_NOME','ESCOLA_CIDADE','PROFESSOR_NOME','PROSPECT_NOME'];
	
	
	var _parans = new Object();
	_parans = {
		idTrabalho: 		'',
		codTrabalho: 		'',
		ano: 				'',
		codGrupo: 			'',
		idCategoria: 		'',
		codCategoria: 		'',
		idRegional: 		'',
		codRegional: 		'',
		codMunicipio: 		'',
		cidade: 			'',
	}
	
	

	for(p in _parans){
		_parans[p] = (parans[p] === undefined) ?  '' : parans[p] ;
	}
	
	
	var cst = new Array();
	cst.push( DatasetFactory.createConstraint('WEBSERVICE', 		'LISTA_TRABALHOS_EMPATADOS', 	null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('IDTRABALHO', 		_parans.idTrabalho, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODTRABALHO', 		_parans.codTrabalho, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('ANO', 				_parans.ano, 				null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODGRUPO', 			_parans.codGrupo, 			null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('IDCATEGORIA', 		_parans.idCategoria, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODCATEGORIA', 		_parans.codCategoria, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('IDREGIONAL', 		_parans.idRegional, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODREGIONAL', 		_parans.codRegional, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODMUNICIPIO', 		_parans.codMunicipio, 		null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CIDADE', 			_parans.cidade, 			null, 	ConstraintType.MUST) );

	var k = 0;
	var constraints = new Array();	
	for(var i=0; i < cst.length; i++){
		//if((cst[i]['_finalValue']  !=  '___NULL___VALUE___')  ||  (cst[i]['_initialValue']  !=  '___NULL___VALUE___')){
		if((cst[i]['_initialValue'].toString()  !=  '___NULL___VALUE___')  &&  (cst[i]['_initialValue'].toString()  !=  '')){			
			constraints[k] = cst[i];
			k++;
		}
	}
	
	var DS_LISTA_TRABALHOS = DatasetFactory.getDataset('rmSqlDefaultDataset', fields, constraints, null);
	if (DS_LISTA_TRABALHOS.values.length > 0) {
		return DS_LISTA_TRABALHOS;
	} else {
		return null;
	}
}



function fnListaTrabalhosDesclassificados(parans){
	
	var fields = []; //'IDTRABALHO','CODTRABALHO','ESCOLA_NOME','ESCOLA_CIDADE','PROFESSOR_NOME','PROSPECT_NOME'];
	
	
	var _parans = new Object();
	_parans = {
		idTrabalho: 		'',
		codTrabalho: 		'',
		ano: 				'',
		codGrupo: 			'',
		idCategoria: 		'',
		codCategoria: 		'',
		codStatus: 			'',
		erroDigitacao: 		'',
		possuiDeficiencia: 	'',
		idRegional: 		'',
		codRegional: 		'',
		codMunicipio: 		'',
		cidade: 			'',
		codEscola:			'',
		ativo: 				'',
		qtdDesclassificado: '',
		qtdAvaC1: 			'',
		qtdAvaliacoes: 		'',
		qtdNotas: 			'',
		qtdBancas: 			'',
		qtdTrabalhosEscola: '',
	}
	
	

	for(p in _parans){
		_parans[p] = (parans[p] === undefined) ?  '' : parans[p] ;
	}
	
	
	var cst = new Array();
	cst.push( DatasetFactory.createConstraint('WEBSERVICE', 		'LISTA_TRABALHOS_DESCLASSIFICADOS', 	null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('IDTRABALHO', 			 _parans.idTrabalho, 		 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODTRABALHO', 			 _parans.codTrabalho, 		 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('ANO', 					 _parans.ano, 				 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODGRUPO', 				 _parans.codGrupo, 			 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('IDCATEGORIA', 			 _parans.idCategoria, 		 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODCATEGORIA', 			 _parans.codCategoria, 		 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODSTATUS', 				 _parans.codStatus,  		 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('ERRODIGITACAO', 			 _parans.erroDigitacao,  	 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('POSSUIDEFICIENCIA', 		 _parans.possuiDeficiencia,  null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('IDREGIONAL', 			 _parans.idRegional, 		 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODREGIONAL', 			 _parans.codRegional, 		 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODMUNICIPIO', 			 _parans.codMunicipio, 		 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CIDADE', 				 _parans.cidade, 			 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('CODESCOLA', 				 _parans.codEscola, 		 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('ATIVO', 					 _parans.ativo, 			 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('QTD_AVA_DESCLASSIFICOES', _parans.qtdDesclassificado, null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('QTD_AVA_C1', 			 _parans.qtdAvaC1,			 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('QTD_AVALIACOES', 		 _parans.qtdAvaliacoes, 	 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('QTD_NOTAS', 				 _parans.qtdNotas, 			 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('QTD_BANCAS', 			 _parans.qtdBancas, 		 null, 	ConstraintType.MUST) );
	cst.push( DatasetFactory.createConstraint('QTD_TRABALHOS_ESCOLA', 	 _parans.qtdTrabalhosEscola, null, 	ConstraintType.MUST) );

	var k = 0;
	var constraints = new Array();	
	for(var i=0; i < cst.length; i++){
		//if((cst[i]['_finalValue']  !=  '___NULL___VALUE___')  ||  (cst[i]['_initialValue']  !=  '___NULL___VALUE___')){
		if((cst[i]['_initialValue'].toString()  !=  '___NULL___VALUE___')  &&  (cst[i]['_initialValue'].toString()  !=  '')){			
			constraints[k] = cst[i];
			k++;
		}
	}
	
	var DS_LISTA_TRABALHOS = DatasetFactory.getDataset('rmSqlDefaultDataset', fields, constraints, null);
	if (DS_LISTA_TRABALHOS.values.length > 0) {
		return DS_LISTA_TRABALHOS;
	} else {
		return null;
	}
}


function fnBuscaNotas(idTrabalho, codTrabalho, idAvaliacao, codTipoAvaliacao, idNota, codTipoNota){
	(idTrabalho 		=== undefined) ? idTrabalho  		= '' : '' ;
	(codTrabalho 		=== undefined) ? codTrabalho  		= '' : '' ;
	(idAvaliacao 		=== undefined) ? idAvaliacao 		= '' : '' ;
	(codTipoAvaliacao 	=== undefined) ? codTipoAvaliacao 	= '' : '' ;
	(idNota 			=== undefined) ? idNota 	 		= '' : '' ;
	(codTipoNota 		=== undefined) ? codTipoNota 		= '' : '' ;
	if((idTrabalho != '')  ||  (idAvaliacao != '')){
		var c0 = DatasetFactory.createConstraint('WEBSERVICE', 	'BUSCA_NOTAS_AGRINHO', 	null, 	ConstraintType.MUST);
		var c1 = DatasetFactory.createConstraint('IDTRABALHO', 		idTrabalho, 		null, 	ConstraintType.MUST);
		var c1 = DatasetFactory.createConstraint('CODTRABALHO', 	codTrabalho, 		null, 	ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint('IDAVALIACAO', 	idAvaliacao, 		null, 	ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint('CODTIPOAVALIACAO',codTipoAvaliacao, 	null, 	ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint('IDNOTA', 			idNota, 			null, 	ConstraintType.MUST);
		var c5 = DatasetFactory.createConstraint('CODTIPONOTA', 	codTipoNota,		null, 	ConstraintType.MUST);
		var DS_AVALIACOES = DatasetFactory.getDataset('rmSqlDefaultDataset', null, [c0, c1, c2, c3, c4, c5], null);
		if (DS_AVALIACOES.values.length > 0) {
			return DS_AVALIACOES;
		} else {
			return null;
		}
	} else {
		return null;
	}
}


function fnListaResultadoFinal(ano, codGrupo, idCategoria, codCategoria, idRegional, codReginal, codMunicipio, cidade){
	(ano 			=== undefined) ? ano  			= ''  : '' ;
	(codGrupo 		=== undefined) ? codGrupo 	 	= ''  : '' ;
	(idCategoria 	=== undefined) ? idCategoria 	= ''  : '' ;
	(codCategoria 	=== undefined) ? codCategoria 	= ''  : '' ;
	(idRegional 	=== undefined) ? idRegional 	= ''  : '' ;
	(codReginal 	=== undefined) ? codReginal 	= ''  : '' ;
	(codMunicipio 	=== undefined) ? codMunicipio 	= ''  : '' ;
	(cidade 		=== undefined) ? cidade 		= ''  : '' ;
	if (ano != ''){
		var c0 = DatasetFactory.createConstraint('WEBSERVICE', 	'RESULTADO_FINAL_AGRINHO', null, ConstraintType.MUST);
		var c1 = DatasetFactory.createConstraint('ANO', 			ano, 			null, 	ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint('CODGRUPO', 		codGrupo, 		null, 	ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint('IDCATEGORIA', 	idCategoria, 	null, 	ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint('CODCATEGORIA', 	codCategoria,	null, 	ConstraintType.MUST);
		var c5 = DatasetFactory.createConstraint('IDREGIONAL', 		idRegional,		null, 	ConstraintType.MUST);
		var c6 = DatasetFactory.createConstraint('CODREGIONAL', 	codReginal,		null, 	ConstraintType.MUST);
		var c7 = DatasetFactory.createConstraint('CODMUNICIPIO', 	codMunicipio,	null, 	ConstraintType.MUST);
		var c8 = DatasetFactory.createConstraint('CIDADE', 			cidade,			null, 	ConstraintType.MUST);
		var DS_AVALIACOES = DatasetFactory.getDataset('rmSqlDefaultDataset', null, [c0, c1, c2, c3, c4, c5, c6, c7, c8], null);
		if (DS_AVALIACOES.values.length > 0) {
			return DS_AVALIACOES;
		} else {
			return null;
		}
	} else {
		return null;
	}
}


function fnBuscaIdsNotasFinais(idTrabalho, codTrabalho){
	(idTrabalho 		=== undefined) ? idTrabalho  = '' : '' ;
	(codTrabalho 		=== undefined) ? codTrabalho = '' : '' ;
	if((idTrabalho != '')  ||  (codTrabalho != '')){
		var c0 = DatasetFactory.createConstraint('WEBSERVICE', 	'BUSCA_ID_NOTAS_FINAIS_AGRINHO', 	null, 	ConstraintType.MUST);
		var c1 = DatasetFactory.createConstraint('IDTRABALHO', 		idTrabalho, 		null, 	ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint('CODTRABALHO', 	codTrabalho, 		null, 	ConstraintType.MUST);
		var DS_AVALIACOES = DatasetFactory.getDataset('rmSqlDefaultDataset', null, [c0, c1, c2], null);
		if (DS_AVALIACOES.values.length > 0) {
			return DS_AVALIACOES;
		} else {
			return null;
		}
	} else {
		return null;
	}
}


function fnSituacaoGeralAgrinho(codGrupo, idCategoria, codCategoria, codReg, descRegional){
	(codGrupo 		=== undefined) ? codGrupo  		= '' : '' ;
	(idCategoria 	=== undefined) ? idCategoria 	= '' : '' ;
	(codCategoria 	=== undefined) ? codCategoria  	= '' : '' ;
	(codReg 		=== undefined) ? codReg		 	= '' : '' ;
	(descRegional 	=== undefined) ? descRegional 	= '' : '' ;
	
	var c0 = DatasetFactory.createConstraint('WEBSERVICE', 	'STATUS_GERAL_AGRINHO', 	null, 	ConstraintType.MUST);
	var c1 = DatasetFactory.createConstraint('CODGRUPO', 		codGrupo, 		null, 	ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('IDCATEGORIA', 	idCategoria, 	null, 	ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('CODCATEGORIA', 	codCategoria, 	null, 	ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint('CODREG', 			codReg, 		null, 	ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint('DESCREGIONAL', 	descRegional, 	null, 	ConstraintType.MUST);
	var c6 = DatasetFactory.createConstraint('ALLRECORDS', 		'true', 	'true', 	ConstraintType.MUST);
	var DS_AVALIACOES = DatasetFactory.getDataset('rmSqlDefaultDataset', null, [c0, c1, c2, c3, c4, c5, c6], null);
	if (DS_AVALIACOES.values.length > 0) {
		return DS_AVALIACOES;
	} else {
		return null;
	}	
}
