console.log('%c [v.up.0.0.2] functions.js', 'color:gray');



function setSelectedItem(selectedItem){
	window[_global.objVars.utils].byFluig.setSelectedZoomItem(selectedItem);	
}

function setSelectedZoomItem(selectedItem){
	
	var inputsAux 	 = '';
	var evalAux 	 = '';
	var itemSelected = {};
	
//	console.log('setSelectedZoomItem:', selectedItem);

	if (selectedItem.inputId.substr(0, 4) == 'zoom'){
		var idZoom 	 = selectedItem.inputId.substring(selectedItem.inputId.lastIndexOf('_') + 1, selectedItem.inputId.length);
		var tipoZoom = selectedItem.inputId.replace('___' + idZoom, '');
	} else {
		var idZoom   = '0';
		var tipoZoom = selectedItem.inputId;
	}

//fnDebug(selectedItem.inputId + '|' + tipoZoom + '|' + idZoom, 'a');


	if(tipoZoom == 'zoomMunicipio'){		
	} 
	
	zoomFitSize('#' +  		selectedItem.inputId);
	zoomSpanDisplay('#' +  	selectedItem.inputId, 'hide');
	zoomRemoveDiplay('#' + 	selectedItem.inputId, inputsAux, evalAux);
}




var MyFunctions = function(){};
MyFunctions.prototype.initLoading = {
		loadCustom: function() {
			//console.log('--loadCustom');
			
			window[_global.objVars.utils].byLoading.loadDefault();
			
			components.modal = new Object({
				'modalProgressBar': $('div#modalProgressBar').html(),
				'modalInfo': 		$('div#modalInfo').html(),
				'modalEdit': 		$('div#modalEdit').html(),
				'modalNotas': 		$('div#modalNotas').html(),
			});
			
			$('div#modalProgressBar').remove();
			$('div#modalInfo').remove();
			$('div#modalEdit').remove();
			$('div#modalNotas').remove();
		},
		loadButtonActions: function() {
			//console.log('--loadButtonActions');
			
			$(document).on('click', 'button[datatable-action]', function(){
				myInstance.editRow( $(this) )
			});
		},
		loadNavAction: function() {
			//console.log('--loadNavAction');
			
			$('a[data-parant]').each(function() {
				var parant = $(this).attr('data-parant');
				$(this).on('click', function() {
					switch (parant) {
						case 'tablesWorks':
							window[_global.objVars.functions].loadingModal.initWorks(null);
							break;
						case 'tablesNotas':
							window[_global.objVars.functions].loadingModal.openNotas(null);
							break;
						default:
							break;
					}
				});
			});
		},
		loadValidate: function() {
			//console.log('--loadValidate');
			
			$('#txnome, #nrcpf_cnpj, #nrtelefone').keyup(function(evt) {
				this.id = $(this).attr('id');
				this.val = $(this).val();
				this.field = this.val.replace(/[^\d]+/g, '');
				if(this.val.length > 0){
					switch (this.id) {
						case 'nrcpf_cnpj':
							window[_global.objVars.utils].validMaskField.cpfCnpj(this.id, evt.which); //NOTE: Mascara
							break;
						case 'nrtelefone':
							window[_global.objVars.utils].validMaskField.telefone(this.id, evt.which); //NOTE: Mascara
							break;
						default:
							break;
					}
				}
			}).blur(function(evt) {
				this.id = $(this).attr('id');
				this.val = $(this).val();
				this.field = this.val.replace(/[^\d]+/g, '');
				if(this.val.length > 0){
					switch (this.id) {
						case 'nrcpf_cnpj':
							window[_global.objVars.utils].validMaskField.cpfCnpj(this.id, null); //NOTE: Mascara
							if(this.field.length == 11 && evt.which != 8){
								this.valida = window[_global.objVars.utils].validMaskField.cpf(this.id);
								if(this.valida){
									console.log('valida', this.valida, this.id);
								}
							}else if(this.field.length == 14 && evt.which != 8){
								this.valida = window[_global.objVars.utils].validMaskField.cnpj(this.id);
								if(this.valida){
									console.log('valida', this.valida, this.id);
								}
							}else{
								var strType = ((this.field.length > 11)? 'CNPJ': 'CPF');
								window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O "+strType+" digitado Ã© invÃ¡lido!");
								$(this).val('');
							}
							break;
						case 'nrtelefone':
							window[_global.objVars.utils].validMaskField.telefone(this.id, null); //NOTE: Mascara
							if(this.field.length == 10){
								this.valida = window[_global.objVars.utils].validMaskField.phone(this.id);
								if(this.valida){
									console.log('valida', this.valida, this.id);
								}
							}else{
								window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O Telefone digitado Ã© invÃ¡lido!");
								$(this).val('');
							}
							break;
						default:
							break;
					}
					window[_global.objVars.functions].initLoading.loadValidate();
				}
			});
		},
		loadConsult: function() {
			//console.log('--loadConsult');
			
			var myObject = new Object();
			myObject['mdmbirthdayperson'] = 'mdmbirthdayperson';
			window[_global.objVars.functions].custom.loadRegister(myObject);
			$('button#btnConsultar').on('click', function() {
				$('#nmpessoa, #nrcpf, #nrtelefone, #nrcelular, #datanasc, #email').each(function(){
					this.id = $(this).attr('id');
					this.val = $(this).val();
					if(this.val.length > 0){
						switch (this.id) {
						case 'nrcpf':
							this.field = this.val.replace(/[^\d]+/g, '');
							myObject['mdmpersonid'] = this.field;
							break;
						case 'nrcelular':
							this.field = this.val.replace(/[^\d]+/g, '');
							myObject['mdmcellphone'] = this.field;
							break;
						case 'nrtelefone':
							this.field = this.val.replace(/[^\d]+/g, '');
							myObject['mdmphone'] = this.field;
							break;
						case 'datanasc':
							this.field = this.val.split('/').reverse().join('-');
							myObject['mdmbirthday'] = this.field;
							break;
						case 'nmpessoa':
							this.field = this.val;
							myObject['mdmname'] = this.field;
							break;
						case 'email':
							this.field = this.val;
							myObject['mdmemail'] = this.field;
							break;
						default:
							break;
						}
					}
				});
				window[_global.objVars.functions].custom.loadRegister(myObject);
			});
		},
		loadSelect: function() {
			//console.log('--loadSelect');
			
			window[_global.objVars.functions].custom.loadCountry(null);
			window[_global.objVars.functions].custom.loadState(null);
			window[_global.objVars.functions].custom.loadCity(null);
			window[_global.objVars.functions].custom.loadOrign(null);
			FLUIGC.calendar('#datanascimento');
			window[_global.objVars.utils].appComponents.setElementSelect('pais',   '1');
			window[_global.objVars.utils].appComponents.setElementSelect('estado', 'GO');
			$('select#pais').change(function(){
				this.obj = new Object({
					codpais: $(this).val()
				});
				window[_global.objVars.functions].custom.loadState(this.obj);
			});
			$('select#estado').change(function(){
				this.obj = new Object({
					estado: $(this).val()
				});
				window[_global.objVars.functions].custom.loadCity(this.obj);
			});
			$('button#btnFone, button#btnMail, button#btnEndereco').on('click', function(){
				if($(this).attr('id') == 'btnFone'){
					window[_global.objVars.utils].appComponents.addRowTable('tableTelefone');
				}else if($(this).attr('id') == 'btnMail'){
					window[_global.objVars.utils].appComponents.addRowTable('tableEmail');
				}else if($(this).attr('id') == 'btnEndereco'){
					window[_global.objVars.utils].appComponents.addRowTable('tableEndereco');
				}
			});
			$('input[name=tipopessoa]').on('click', function(){
				if($(this).val() == 'F'){
					$('div#fisica').show();
					$('div#juridica').hide();					
					$('div#nmfantasia').hide();					
				}else{
					$('div#fisica').hide();
					$('div#juridica').show();	
					$('div#nmfantasia').show();	
				}
			});
		}
};

MyFunctions.prototype.custom = {
		loadRegister: function(mydata) {
			window[_global.objVars.functions].searchs.searchRegister(mydata);
		},
		loadOrign: function(mydata) {
			var dsorigen = window[_global.objVars.functions].searchs.searchOrigin(mydata);
			window[_global.objVars.utils].appComponents.loadingOption('origem');
			window[_global.objVars.utils].appComponents.removeOption('origem', '');
			if (dsorigen != null && dsorigen.values != null && dsorigen.values.length > 0){
				var records = window[_global.objVars.utils].appComponents.orderByArray('DESCRICAO', dsorigen.values);				
				for(var i = 0; i < records.length; i++){
					var c = records[i];
					var option = window[_global.objVars.utils].appComponents.appendOption(c.CODORIGEM, c.DESCRICAO);
					$('select#origem').append(option);
				}
			}
		},
		loadCity: function(mydata) {
			var dsmunicipio = window[_global.objVars.functions].searchs.searchCity(mydata);
			window[_global.objVars.utils].appComponents.loadingOption('cidade');
			window[_global.objVars.utils].appComponents.removeOption('cidade', '');
			if (dsmunicipio != null && dsmunicipio.values != null && dsmunicipio.values.length > 0){
				var records = window[_global.objVars.utils].appComponents.orderByArray('NOMEMUNICIPIO', dsmunicipio.values);				
				for(var i = 0; i < records.length; i++){
					var c = records[i];
					var option = window[_global.objVars.utils].appComponents.appendOption(c.CODMUNICIPIO, c.NOMEMUNICIPIO);
					$('select#cidade').append(option);
				}
			}
		},
		loadState: function(mydata) {
			var dsestado = window[_global.objVars.functions].searchs.searchState(mydata);
			window[_global.objVars.utils].appComponents.loadingOption('estado');
			window[_global.objVars.utils].appComponents.removeOption('estado', '');
			if (dsestado != null && dsestado.values != null && dsestado.values.length > 0){
				var records = window[_global.objVars.utils].appComponents.orderByArray('NOME', dsestado.values);
				for(var i = 0; i < records.length; i++){
					var c = records[i];
					var option = window[_global.objVars.utils].appComponents.appendOption(c.CODETD, c.NOME);
					$('select#estado').append(option);
				}
			}
		},
		loadCountry: function(mydata) {
			var dspais = window[_global.objVars.functions].searchs.searchCountry(mydata);
			window[_global.objVars.utils].appComponents.loadingOption('pais');
			window[_global.objVars.utils].appComponents.removeOption('pais', '');
			if (dspais != null && dspais.values != null && dspais.values.length > 0){
				var records = window[_global.objVars.utils].appComponents.orderByArray('DESCRICAO', dspais.values);
				for(var i = 0; i < records.length; i++){
					var c = records[i];
					var option = window[_global.objVars.utils].appComponents.appendOption(c.IDPAIS, c.DESCRICAO);
					$('select#pais').append(option);
				}
			}
		},
}

MyFunctions.prototype.loadingModal = {
		initWorks: function(mydata) {
			// Limpando dados da dataTable
			eventos.mydata = new Array();
			
			if(mydata === undefined){
				var mydata = new Object({
					codstatus: 		1,
					ano: 			moment().format('YYYY'),
					errodigitacao: 	0,
					ativo: 			1
				});
			}
			// Buscando novos dados a partir do filtro selecionado
			var DS_TRABALHOS = window[_global.objVars.functions].searchs.searchWorks(mydata);
			if (window[_global.objVars.utils].appComponents.validVarObj(DS_TRABALHOS, 'values')){
				var records = window[_global.objVars.utils].appComponents.orderByArray('CODTRABALHO', DS_TRABALHOS.values);
				var item = 1;
				for(var i = 0; i < records.length; i++){
					var c = records[i];
					works = new Object({
						order: 			item,
						idtrabalho:		c.IDTRABALHO,
						codtrabalho: 	c.CODTRABALHO,
						escola: 		c.ESCOLA_NOME,
						cidade: 		c.ESCOLA_CIDADE,
						professor: 		c.PROFESSOR_NOME,
						aluno: 			c.PROSPECT_NOME,
					});
					eventos.mydata.push(works);
					item++;
				};
				elementTable 	= null;
				elementHeader 	= null;
				elementButtons 	= null;
				elementSearch 	= null;
				elementTemplate = null;
				$('div#panelTableTrabalhos').show();
				elementTable 	= "#dataTableTrabalhos";
				elementButtons 	= "#buttons-trabalho";
				elementSearch 	= "#selFiltro";
				elementTemplate = "#template-trabalho";
				elementTemplateEdit = "#template-trabalho-edit";
				elementHeader 	= new Array({
					'title': 'NÂ°'
				}, {
					'title': 'Trabalho',
					'size': 'col-lg-1 col-md-1 col-sm-1 col-xs-12'
				}, {
					'title': 'Escola/InstituiÃ§Ã£o',
					'size': 'col-lg-3 col-md-3 col-sm-3 col-xs-12'
				}, {
					'title': 'MunicÃ­pio',
					'size': 'col-lg-2 col-md-2 col-sm-2 col-xs-12'
				}, {
					'title': 'Professor/Mentor',
					'size': 'col-lg-2 col-md-2 col-sm-2 col-xs-12'
				}, {
					'title': 'Aluno',
					'size': 'col-lg-2 col-md-2 col-sm-2 col-xs-12'
				}, {
					'title': '',
					'size': 'col-lg-2 col-md-2 col-sm-2 col-xs-12'
				});
				window[_global.objVars.functions].byDataTable.headerTable();
				window[_global.objVars.functions].byDataTable.initTable();
				
				$( elementSearch ).on('change', function(){
					$('div#datatable-area-search').find('input#fluig-data-table-input').val( '' )
					dataTable.myTable.reload(dataTable.tableData);
				});
			} else {
				if(dataTable.myTable !== null){
					dataTable.myTable.destroy();
				}
				window[_global.objVars.utils].byMessage.alertWarning('Nenhuma Registro Retornado!', 'RefaÃ§a o filtro da listagem de trabalhos.');
			}
		},
		openNotas: function(mydata, type){
		},
		openWorks: function(mydata, type){
			//console.log('openWorks:', mydata, type);
			console.log('openWorks:', type);
			
			if(type == 'new'){
				if(dataTable.myTable !== null){
					dataTable.myTable.destroy();
				}
				$('#navNovoTrabalho').click();
				
			} else if(type == 'save'){
				Trabalho.alert();
				var aux = validateForm( Trabalho.props.id.div.work, 'cadastro_trabalho', Trabalho.props.models, 'alert' )
				if(aux){
					myFuns.byDataTable.updateRow(mydata);
				}
				
			} else if(type == 'cancel'){
				myFuns.byDataTable.updateRow(mydata, 'cancel');
				
			} else if(type == 'save-valuation'){
				AvaliacoesNotas.alert();
				var aux = validateForm( AvaliacoesNotas.props.id.div.geral, 'cadastro_avaliacoes_notas', AvaliacoesNotas.props.models, 'alert' )
				if(aux){
					myFuns.byDataTable.updateRow(mydata);
				}
				
			} else {

				if(type == 'info'){
					var buttons = new Array({
						label: 		'Ok',
						type: 		'default',
						autoClose: 	true
					});
					var idModal = 'modalInfo';
					var appModal= components.modal.modalInfo;
					var title 	= 'InformaÃ§Ãµes do Trabalho';
					
				} else if( (type == 'edit') 
						|| (type == 'notas')
						){
					myFuns.byDataTable.editRow();
					
					var buttons = new Array({
						label: 		'Salvar',
						type: 		'success',
						autoClose: 	false
					}, {
						label: 		'Cancelar',
						type: 		'default',
						autoClose: 	true
					});
					if(type == 'edit'){
						var idModal = 'modalEdit';
						var appModal= components.modal.modalEdit;
						var title 	= 'EdiÃ§Ã£o de Trabalho';					
					
					} else if(type == 'notas'){
						var idModal = 'modalNotas';
						var appModal= components.modal.modalNotas;
						var title 	= 'AvaliaÃ§Ãµes e Notas';
					}
				}
				
				window[_global.objVars.utils].byFluig.openModal(idModal, title, appModal, 'full', buttons);
				
				var idTrabalho = mydata.idtrabalho;
				if(type == 'info'){
					//console.log('----aqui-info ', idTrabalho);					
					$('#idTrabalho').val(  idTrabalho  );
					var fields = ["IDTRABALHO", "ANO", "CODTRABALHO", "DESCSTATUS", "CODCATEGORIA", "ESCOLA_CIDADE", "ESCOLA_NOME", "ESCOLA_CNPJ", "PROFESSOR_NOME", "PROFESSOR_CPF", "PROSPECT_NOME", "PROSPECT_NOMEMAE", "PROSPECT_DATANASCIMENTO", "PROSPECT_DATANASCIMENTO"];
					window[_global.objVars.mints].FLUIG.loading('load', 'divInfoTrabalho', 'Aguarde ...', '[Trabalho]', '', true, 'fnPopulaDadosTrabalhos', 'divInfoTrabalho', fields);
					_global.autoClose = true;

				} else if( (type == 'edit') 
						|| (type == 'notas')
						){
					
					if(type == 'edit'){
						callBackTrabalho( Trabalho.props.id.div.work, idTrabalho );
						var btnSubmits = $('#' + Trabalho.props.id.button.submit.top + ', #' + Trabalho.props.id.button.submit.bottom);
						
					} else if(type == 'notas'){
						callBackAvaliacoesNotas( AvaliacoesNotas.props.id.div.notas, idTrabalho );						
						var btnSubmits = $('#' + AvaliacoesNotas.props.id.button.submit.top + ', #' + AvaliacoesNotas.props.id.button.submit.bottom);
					}
					
					btnSubmits.hide();
					if(type == 'notas'){
						$('[data-open-salvar]').attr('datatable-action',   'salva-avaliacoes');
						$('[data-open-cancelar]').attr('datatable-action', 'cancela-avaliacoes');
					} else {
						$('[data-open-salvar]').attr('datatable-action',   'salva-trabalho');
						$('[data-open-cancelar]').attr('datatable-action', 'cancela-trabalho');
					}
				}
			}
		},
		openProgessBar: function(title){
			this.modalProgressBar = components.modal.modalProgressBar;
			window[_global.objVars.utils].byFluig.openModal('modalProgressBar', title+' Aguarde...', this.modalProgressBar, 'large', null);
		},
};

MyFunctions.prototype.searchs = {
		searchCountry: function(mydata) {
			this.parant = mydata;			
			this.constraint = new Array();
			if (window[_global.objVars.utils].appComponents.validVarObj(this.parant, "")){
				if(this.parant.sigla != null && this.parant.sigla != ""){
					this.cst = DatasetFactory.createConstraint('SIGLA', this.parant.sigla, this.parant.sigla, ConstraintType.MUST);
					this.constraint.push(this.cst);
				}
				if(this.parant.idpais != null && this.parant.idpais != ""){
					this.cst2 = DatasetFactory.createConstraint('IDPAIS', this.parant.idpais, this.parant.idpais, ConstraintType.MUST);
					this.constraint.push(this.cst2);
				}
				if(this.parant.nome != null && this.parant.nome != ""){
					this.cst3 = DatasetFactory.createConstraint('NOME', this.parant.nome, this.parant.nome, ConstraintType.MUST);
					this.constraint.push(this.cst3);
				}
			}
			if(this.constraint.length <= 0){
				this.constraint = null;
			}
			this.dsPais = DatasetFactory.getDataset('rm_faeg_paises_readview', null, this.constraint, null);
			if (window[_global.objVars.utils].appComponents.validVarObj(this.dsPais, "values")){
				return this.dsPais;
			}else{
				return "";
			}
		},
		searchState: function(mydata) {
			this.parant = mydata;			
			this.constraint = new Array();
			if (window[_global.objVars.utils].appComponents.validVarObj(this.parant, "")){
				if(this.parant.sigla != null && this.parant.sigla != ""){
					this.cst = DatasetFactory.createConstraint('CODPAIS', this.parant.codpais, this.parant.codpais, ConstraintType.MUST);
					this.constraint.push(this.cst);
				}
				if(this.parant.idpais != null && this.parant.idpais != ""){
					this.cst2 = DatasetFactory.createConstraint('UF', this.parant.uf, this.parant.uf, ConstraintType.MUST);
					this.constraint.push(this.cst2);
				}
				if(this.parant.nome != null && this.parant.nome != ""){
					this.cst3 = DatasetFactory.createConstraint('NOME', this.parant.ufnome, this.parant.ufnome, ConstraintType.MUST);
					this.constraint.push(this.cst3);
				}
			}
			if(this.constraint.length <= 0){
				this.constraint = null;
			}
			this.dsEstado = DatasetFactory.getDataset('rm_faeg_estado_readview', null, this.constraint, null);
			if (window[_global.objVars.utils].appComponents.validVarObj(this.dsEstado, "values")){
				return this.dsEstado;
			}else{
				return "";
			}
		},
		searchCity: function(mydata) {
			this.parant = mydata;			
			this.constraint = new Array();
			if (window[_global.objVars.utils].appComponents.validVarObj(this.parant, "")){
				if(this.parant.estado != null && this.parant.estado != ""){
					this.cst = DatasetFactory.createConstraint('UF', this.parant.estado, this.parant.estado, ConstraintType.MUST);
					this.constraint.push(this.cst);
				}
			}
			if(this.constraint.length <= 0){
				this.constraint = null;
			}
			this.dsMunicipio = DatasetFactory.getDataset('rm_faeg_municipio_estado_readview', null, this.constraint, null);
			if (window[_global.objVars.utils].appComponents.validVarObj(this.dsMunicipio, "values")){
				return this.dsMunicipio;
			}else{
				return "";
			}
		},
		searchWorks: function(mydata) {
			this.parant = mydata;			
			this.constraint = new Array();
			if (window[_global.objVars.utils].appComponents.validVarObj(this.parant, "")){
				
				this.fields = new Array();
				this.fields = ['IDTRABALHO','CODTRABALHO','ESCOLA_NOME','ESCOLA_CIDADE','PROFESSOR_NOME','PROSPECT_NOME'];
				
				//this.cst = DatasetFactory.createConstraint('WEBSERVICE', 'LISTA_TRABALHOS_AGRINHO', null, ConstraintType.MUST);
				this.cst = DatasetFactory.createConstraint('WEBSERVICE', 'LISTA_TRABALHOS_AGRINHO_RAPIDO', null, ConstraintType.MUST);
				this.constraint.push(this.cst);
				
				if(this.parant.idtrabalho != null && this.parant.idtrabalho != ""){
					this.cst = DatasetFactory.createConstraint('IDTRABALHO', this.parant.idtrabalho, null, ConstraintType.MUST);
					this.constraint.push(this.cst);
				}
				if(this.parant.codtrabalho != null && this.parant.codtrabalho != ""){
					this.cst2 = DatasetFactory.createConstraint('CODTRABALHO', this.parant.codtrabalho, null, ConstraintType.MUST);
					this.constraint.push(this.cst2);
				}
				if(this.parant.ano != null && this.parant.ano != ""){
					this.cst3 = DatasetFactory.createConstraint('ANO', this.parant.ano, null, ConstraintType.MUST);
					this.constraint.push(this.cst3);
				}
				if(this.parant.codgrupo != null && this.parant.codgrupo != ""){
					this.cst4 = DatasetFactory.createConstraint('CODGRUPO', this.parant.codgrupo, null, ConstraintType.MUST);
					this.constraint.push(this.cst4);
				}
				if(this.parant.codcategoria != null && this.parant.codcategoria != ""){
					this.cst5 = DatasetFactory.createConstraint('CODCATEGORIA', this.parant.codcategoria, null, ConstraintType.MUST);
					this.constraint.push(this.cst5);
				}
				if(this.parant.codstatus != null && this.parant.codstatus != ""){
					this.cst6 = DatasetFactory.createConstraint('CODSTATUS', this.parant.codstatus, null, ConstraintType.MUST);
					this.constraint.push(this.cst6);
				}
				if(this.parant.errodigitacao != null && this.parant.errodigitacao != ""){
					this.cst7 = DatasetFactory.createConstraint('ERRODIGITACAO', this.parant.errodigitacao, null, ConstraintType.MUST);
					this.constraint.push(this.cst7);
				}
				if(this.parant.possuideficiencia != null && this.parant.possuideficiencia != ""){
					this.cst8 = DatasetFactory.createConstraint('POSSUIDEFICIENCIA', this.parant.possuideficiencia, null, ConstraintType.MUST);
					this.constraint.push(this.cst8);
				}
				if(this.parant.codmunicipio != null && this.parant.codmunicipio != ""){
					this.cst9 = DatasetFactory.createConstraint('CODMUNICIPIO', this.parant.codmunicipio, null, ConstraintType.MUST);
					this.constraint.push(this.cst9);
				}
				if(this.parant.cidade != null && this.parant.cidade != ""){
					this.cst10 = DatasetFactory.createConstraint('CIDADE', this.parant.cidade, null, ConstraintType.MUST);
					this.constraint.push(this.cst10);
				}
				if(this.parant.codescola != null && this.parant.codescola != ""){
					this.cst11 = DatasetFactory.createConstraint('CODESCOLA', this.parant.codescola, null, ConstraintType.MUST);
					this.constraint.push(this.cst11);
				}
				if(this.parant.nomeescola != null && this.parant.nomeescola != ""){
					this.cst12 = DatasetFactory.createConstraint('ESCOLA_NOME', this.parant.nomeescola, null, ConstraintType.MUST);
					this.constraint.push(this.cst12);
				}
				if(this.parant.ativo != null && this.parant.ativo != ""){
					this.cst13 = DatasetFactory.createConstraint('ATIVO', this.parant.ativo, null, ConstraintType.MUST);
					this.constraint.push(this.cst13);
				}
				if(this.parant.idregional != null && this.parant.idregional != ""){
					this.cst14 = DatasetFactory.createConstraint('IDREGIONAL', this.parant.idregional, null, ConstraintType.MUST);
					this.constraint.push(this.cst14);
				}
				if(this.parant.codregional != null && this.parant.codregional != ""){
					this.cst15 = DatasetFactory.createConstraint('CODREGIONAL', this.parant.codregional, null, ConstraintType.MUST);
					this.constraint.push(this.cst15);
				}
			}
			if(this.constraint.length <= 0){
				this.constraint = null;
			}
			this.dsTrabalhos = DatasetFactory.getDataset('rmSqlDefaultDataset', this.fields, this.constraint, null);
			if (window[_global.objVars.utils].appComponents.validVarObj(this.dsTrabalhos, "values")){
				return this.dsTrabalhos;
			}else{
				return "";
			}
		},
};

MyFunctions.prototype.byDataTable = {
		headerTable: function() {
			//console.log('_headerTable');
			
			this.header = elementHeader;
			return this.header;
		},
		initTable: function() {
			//console.log('_initTable');
			
			if (window[_global.objVars.utils].appComponents.validVarObj(dataTable, "mydata")){
				dataTable.myTable.destroy();
				dataTable = new Object({
					myTable: 		null,
					tableData: 		null,
					mydata: 		new Array(),
					dataActionRow: 	new Array(),
					myparant: 		new Array(),
					mypages: 		new Array(),
					mypage: 		0
				});
			}
			dataTable.mydata = eventos.mydata;
			window[_global.objVars.functions].byDataTable.pagination();
			window[_global.objVars.functions].byDataTable.loadTable();
			$('i#pages').html((dataTable.mypage + 1) +" / "+ (countPages));
			$('i#register').html(countRegister);
		},
		loadTable: function() {
			//console.log('_loadTable');
			
			var pageData =  dataTable.mypages[dataTable.mypage];
			dataTable.myTable = FLUIGC.datatable(elementTable, {
				dataRequest: 	pageData.data,
				renderContent: 	elementTemplate,
				header: 		window[_global.objVars.functions].byDataTable.headerTable(),
				multiSelect: 	true,
				classSelected: 	'info',
				search: {
					enabled: 	true, //fasle,
					onSearch: 	function(response) {
						console.log('--onSearch:', response);						
						
						dataTable.myTable.reload(dataTable.tableData);
						
						if (response) {
							var data = dataTable.mydata;
							var search = data.filter(function(el){
								var filter = $( elementSearch ).val();
								if( filter != '' ){
									return el[ filter ].toUpperCase().indexOf(response.toUpperCase()) >= 0;
									return true;
								} else {
									for (var key in el) {
										var busca = (key.search(/id|order/g) > -1) ? el[key]: null;
										if (busca != null){
											if ((busca.toString()).toUpperCase().indexOf(response.toUpperCase()) >= 0){
												return true;
											}
										}
									}
								}
								return false;
							});
							dataTable.myTable.reload(search);
						}
					},
					onlyEnterkey: 		false,
					searchAreaStyle: 	'col-lg-3 col-md-3 col-sm-12 col-xs-12'
				},
				scroll: {
					target: 	".target",
					enabled: 	false,
			        onScroll: 	function() {
			            console.log('--scroll:')
			        }
				},
				actions: {
					enabled: 	true,
					template: 	elementButtons,
					actionAreaStyle: 'col-lg-9 col-md-9 col-sm-12 col-xs-12'
				},
				navButtons: {
					enabled: 		true,
					forwardstyle: 	'btn-sm btn-info',
					backwardstyle: 	'btn-sm btn-info',
				},				
				draggable: {
					enabled: false,
			        onDrag: function(dragInfo) {
			        	console.log('--dragInfo:', dragInfo.data);
    	
			        	dataTable.myTable.reload(dataTable.tableData);
    					return false; 
    		        }
				},
				tableStyle: 	'table-condensed table-hover',
				emptyMessage: 	'<div class="text-center">NÃ£o foi possÃ­vel encontrar informaÃ§Ãµes.</div>'
			}, function(err, data) {
				if (err) {
					window[_global.objVars.utils].byMessage.alertSuccess('Erro', err);
				}
			});
			dataTable.myTable.on('fluig.datatable.loadcomplete', function() {
				if (!dataTable.tableData) {
					dataTable.tableData = dataTable.myTable.getData();
				}
			});
			window[_global.objVars.functions].byDataTable.btnPagination();
			window[_global.objVars.functions].byDataTable.customButton();
			return true;
		},
		addRow: function(el, ev) {
			//console.log('_addRow', el, ev);
			
			var row = {
				order: 			'',
				idtrabalho:		el.idtrabalho,
				codtrabalho: 	el.codtrabalho,
				escola: 		el.escola,
				cidade: 		el.cidade,
				professor: 		el.professor,
				aluno: 			el.aluno
			};
			dataTable.myTable.addRow(0, row);
		},
		editRow: function(el, ev) {
			//console.log('_editRow', el, ev);
			
			if (window[_global.objVars.utils].appComponents.validVarObj(dataTable.myTable.selectedRows(), "")){
				var row = dataTable.myTable.getRow(dataTable.myTable.selectedRows()[0]);
				dataTable.myTable.updateRow(dataTable.myTable.selectedRows()[0], row, elementTemplateEdit);
				$.each(row, function(index, value) {
					if (window[_global.objVars.utils].appComponents.existElement(index)) { 
						window[_global.objVars.utils].appComponents.setElement('datatable-input-'+index, value);
					}
				});
				$('[data-datatable-edit-row]').prop("disabled", true);
			}else{
				window[_global.objVars.utils].byMessage.alertWarning('Nenhuma Linha Selecionada!', 'Selecione a Linha para prosseguir com a EdiÃ§Ã£o!');
			}
		},
		updateRow: function(el, ev) {
			//console.log('_updateRow', el, ev);
			
			var editedRow = new Object();
			if(ev == 'cancel'){
				window[_global.objVars.functions].byDataTable.reload();
			} else {
				if(el !== null  &&  el !== undefined){
					if(typeof(el) == 'object'){
						editedRow = el;
					}
				}
			
				this.index = dataTable.myTable.selectedRows()[0];
				if(Object.keys(editedRow).length == 0){
					editedRow = dataTable.myTable.getData()[this.index];
				}
				dataTable.myTable.updateRow(this.index, editedRow);
				dataTable.mydata[this.index] = editedRow;
	
				$('[data-datatable-edit-row]').prop("disabled", false);
			
				window[_global.objVars.utils].byMessage.alertSuccess('Elemento Editado!', 'Item Editado com Sucesso!');
			}
		},
		delRow: function(el, ev) {
			//console.log('_delRow', el, ev);
			
			if (window[_global.objVars.utils].appComponents.validVarObj(dataTable.myTable.selectedRows()[0], "")){
				this.elementRemove = dataTable.myTable.selectedRows();
				if (this.elementRemove.length > 0) {
					for (var i = 0; i <= this.elementRemove.length; i++) {
						dataTable.myTable.removeRow(dataTable.myTable.selectedRows()[0]);
					}
				}
				window[_global.objVars.utils].byMessage.alertSuccess('Elemento Removido!', 			'Item Removido com Sucesso!');
			}else{
				window[_global.objVars.utils].byMessage.alertWarning('Nenhuma Linha Selecionada!', 	'Selecione a Linha para prosseguir!');
			}
		},
		reload: function(el, ev) {
			//console.log('_reload', el, ev);
			
			dataTable.myTable.reload();
		},
		showColumn: function(el, ev) {
			//console.log('_showColumn', el, ev);
			
			this.index = 1;
			dataTable.myTable.showColumn(this.index);
		},
		hideColumn: function(el, ev) {
			//console.log('_hideColumn', el, ev);
			
			this.index = 1;
			dataTable.myTable.hideColumn(this.index);
		},
		selected: function(el, ev) {
			//console.log('_selected', el, ev);
			
			this.index = dataTable.myTable.selectedRows()[0];
			this.selected = dataTable.myTable.getRow(this.index);
			window[_global.objVars.utils].byMessage.alertSuccess('', "{\"id\" :" + this.selected.id + ", \"name\" :" + this.selected.name + " , \"uf\" :" + this.selected.uf + "}");
		},
		pagination: function(el, ev) {
			//console.log('_pagination', el, ev);
			
			this.itens = dataTable.mydata.length;
			countRegister = this.itens
			this.rows = 50;
			countPages = 0;
			countPages = Math.ceil(this.itens / this.rows);
			this.pageData = dataTable.mydata;
			dataTable.mypages = new Array();
			this.row = 0;
			var page = new Array();
			if(countPages > 1){
				for (var i = 0; i <= this.pageData.length; i++){
					if(this.row == this.rows){
						dataTable.mypages.push({'data': page});
						page = new Array();
						page.push(this.pageData[i]);
						this.inpage = ((parseInt(dataTable.mypages.length)) == 0) ? 1 : (parseInt(dataTable.mypages.length));
						if((this.pageData.length - (this.inpage * this.rows)) < this.rows){
							this.rows = (this.pageData.length - (this.inpage * this.rows));
						}

						this.row = 1;
					}else{
						page.push(this.pageData[i]);
						this.row++;
					}
				}
			}else{
				dataTable.mypages.push({'data': this.pageData});
			}
			return true;
		},
		customButton: function() {
			//console.log('_customButton');
//			if(dataTable.mypages.length > 1 && (dataTable.mypage + 1) != dataTable.mypages.length){
//				$("button[data-next]").removeClass("disabled");
//			}else{
//				$("button[data-next]").addClass("disabled");				
//			}
//			if(dataTable.mypage > 0){
//				$("button[data-prev]").removeClass("disabled");
//			}else{
//				$("button[data-prev]").addClass("disabled");
//			}
			var idDivDataTable = 'dataTableTrabalhos';
			var $divDataTable = $("div#" + idDivDataTable).find("div#area-nav-button");
			if (countPages > 1 && (dataTable.mypage + 1) != countPages) {
				$divDataTable.find("button[data-next]").removeClass("disabled").prop('disabled', false);
			} else {
				$divDataTable.find("button[data-next]").addClass("disabled").prop('disabled', true);
			}
			if (dataTable.mypage > 0) {
				$divDataTable.find("button[data-prev]").removeClass("disabled").prop('disabled', false);
			} else {
				$divDataTable.find("button[data-prev]").addClass("disabled").prop('disabled', true);
			}
		},
		btnPagination: function() {
			//console.log('_btnPagination');			
//			$("button[data-nav-prev]").attr('data-prev', "");
//			$("button[data-nav-next]").attr('data-next', "");
//			$("button[data-nav-prev]").removeAttr("data-nav-prev");
//			$("button[data-nav-next]").removeAttr("data-nav-next");
//			$("button[data-next]").on('click', function(ev){
//				ev.preventDefault();
//				dataTable.mypage++;
//				window[_global.objVars.functions].byDataTable.pagination();
//				window[_global.objVars.functions].byDataTable.customButton();
//				window[_global.objVars.functions].byDataTable.loadTable();
//				$('i#pages').html((dataTable.mypage + 1) +" / "+ (countPages));
//			});
//			$("button[data-prev]").on('click', function(ev){
//				ev.preventDefault();
//				dataTable.mypage--;
//				window[_global.objVars.functions].byDataTable.pagination();
//				window[_global.objVars.functions].byDataTable.customButton();
//				window[_global.objVars.functions].byDataTable.loadTable();
//				$('i#pages').html((dataTable.mypage + 1) +" / "+ (countPages));
//			});
			var idDivDataTable = 'dataTableTrabalhos';
			var $divDataTable = $("div#" + idDivDataTable).find("div#area-nav-button");
			$divDataTable.find("button[data-nav-prev]").attr('data-prev', "");
			$divDataTable.find("button[data-nav-next]").attr('data-next', "");
			$divDataTable.find("button[data-nav-prev]").removeAttr("data-nav-prev");
			$divDataTable.find("button[data-nav-next]").removeAttr("data-nav-next");
			//NOTE: AÃ§Ã£o dos Buttons Next e Prev
			$divDataTable.find("button[data-next]").on('click', function(ev) {
				ev.preventDefault();
				dataTable.mypage++;
				window[_global.objVars.functions].byDataTable.pagination();
				window[_global.objVars.functions].byDataTable.customButton();
				window[_global.objVars.functions].byDataTable.loadTable();
				$('i#pages').html((dataTable.mypage + 1) + " / " + (countPages));
				$('i#register').html(countRegister);
			});
			$divDataTable.find("button[data-prev]").on('click', function(ev) {
				ev.preventDefault();
				dataTable.mypage--;
				window[_global.objVars.functions].byDataTable.pagination();
				window[_global.objVars.functions].byDataTable.customButton();
				window[_global.objVars.functions].byDataTable.loadTable();
				$('i#pages').html((dataTable.mypage + 1) + " / " + (countPages));
				$('i#register').html(countRegister);
			});
		}
};
