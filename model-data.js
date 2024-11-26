console.log('%c [v.up.0.0.1] model-data.js', 'color:gray');



var MyModelData = function(){};
MyModelData.prototype.modelDataset = {
	ESCOLA: {
		_DS_ID: 		'rmSql_finEscolas',
		_DS_SAVE_ID: 	'rmSql_finEscolas',
		_DS_COMPL: 		'ESCOLA_COMPL',
		CODCFO: 		'',
		CNPJ: 			'',
		CGCCFO: 		'',
		NOME: 			'',
		TIPOBAIRRO: 	'',
		CAMPOLIVRE: 	'',
		CEP: 			'',
		RUA: 			'',
		NUMERO: 		'',
		COMPLEMENTO: 	'',
		BAIRRO: 		'',
		CODETD: 		'',
		CODMUNICIPIO: 	'',
		CIDADE: 		'',
		TELEFONE: 		'',
		TELEX: 			'',
		EMAIL: 			'',
		CONTATO: 		''
	},
	ESCOLA_COMPL: {
		_DS_ID: 		'rmSql_finEscolas',
		_DS_SAVE_ID: 	'rmSql_finEscolas',
		_DS_COMPL: 		'*',
		CODINEP: 		'',
		REDEESCOLA: 	'',
		QTDEFUNC: 		'',
		QTDEPROF: 		'',
		QTDEALUNOS: 	''
	},
	RESPONSAVEL: {
		_DS_ID: 		'',
		ID: 			'',
		CODPESSOA: 		'',
		NOME:			'',
		CARGO: 			'',
		TELEFONE: 		'',
		TELEX: 			''
	}
}

MyModelData.prototype.cacheDataset = {
	_UF: 			null,
	_CIDADES: 		null,
	_CIDADESREGIAO: null,
	_BANCAS:		null,
	_AVALIADORES: 	null,
//	_MOTIVOSDESCLASSIFICACAO: 	null,
	_LISTA_ESCOLAS: null,
	_LISTA_PROFESSORES:	null,
	_LISTA_CARGOS: null
}

MyModelData.prototype.modelItens = {
	DEFAULT:	{'01': 'Item 1',	'02':'Item 2', 	 '03':'Item 3'},
	YESNO:		{'sim':'Sim', 	  	'nao':'Não'},
	ATIVO:		{'1':'Sim', 	  	'0':'Não'},
	SEXO:		{'M': 'Masculino', 	'F':'Feminino'},
	//ANOS:		{'2015':'2015', '2016':'2016', '2017':'2017', '2018':'2018', '2019':'2019', '2020':'2020' },
	ANOS:		{'2017':'2017', '2018':'2018', '2019':'2019', '2020':'2020' },
	REDEESCOLA:	{'1': 'Municipal', 	'2': 'Estadual', '3': 'Convênio', '4': 'Privada', '5': 'Secretaria Municipal', '6': 'Secretaria Regional', '7': 'Não Informado',	'8': 'Validar'},
	TIPOBAIRRO:	{'4': 'Rural', 	  	'13': 'Urbana',  '1': 'Outras'},
	UF:			{'AC':'AC - Acre',  'AL':'AL - Alagoas', 'AM':'AM - Amazonas',   'AP':'AP - Amapá',   'BA':'BA - Bahia',   'CE':'CE - Ceará',   'DF':'DF - Distrito Federal', 'ES':'ES - Espírito Santo',   'GO':'GO - Goiás',   'MA':'MA - Maranhão',   'MG':'MG - Minas Gerais',  'MS':'MS - Mato Grosso do Sul',  'MT':'MT - Mato Grosso',   'PA':'PA - Pará', 'PB':'PB - Paraíba', 'PE':'PE - Pernambuco', 'PI':'PI - Piauí',   'PR':'PR - Paraná',  'RJ':'RJ - Rio de Janeiro',   'RN':'RN - Rio Grande do Norte', 'RO':'RO - Rondônia',   'RR':'RR - Roraima', 'RS':'RS - Rio Grande do Sul',   'SC':'SC - Santa Catarina',   'SE':'SE - Sergipe','SP':'SP - São Paulo',   'TO':'TO - Tocantins'},
	MUNICIPIOS:	function(uf, codMunicipio, descMunicipio){
		(uf 			=== undefined) ? uf = 'GO' : '' ;
		(codMunicipio 	=== undefined) ? codMunicipio  = '' : '' ;
		(descMunicipio 	=== undefined) ? descMunicipio = '' : '' ;
		
		var filtro	 	= (uf + codMunicipio + descMunicipio);
		var DS_CIDADES 		= new Object();
		var CASCH_CIDADES 	= window[_global.objVars.data].cacheDataset['_CIDADES'];
		if(CASCH_CIDADES !== undefined  &&  CASCH_CIDADES !== null  &&  filtro == 'GO'){
			DS_CIDADES = CASCH_CIDADES;
		} else {
			var constraints = '';
			constraints += (uf 	 			!= '') ? ',cdEstado,' +  	uf 				+ '' : '' ;
			constraints += (codMunicipio 	!= '') ? ',cdMunicipio,' + 	codMunicipio 	+ '' : '' ;
			constraints += (descMunicipio 	!= '') ? ',nmMunicipio,' +	descMunicipio 	+ '' : '' ;

			DS_CIDADES = window[_global.objVars.mints].custom.dataset.getSelect('rm_municipio_estado', constraints,  'cdMunicipio,nmMunicipio', 	'nmMunicipio');
			if(filtro == 'GO'){
				window[_global.objVars.data].cacheDataset['_CIDADES'] = DS_CIDADES;
			}
		}
		return DS_CIDADES;
	},
	REGIOES: function(){
		var DS_REGIOES = new Object();
		DS_REGIOES = {
			19:	{0: 'CENTRO LESTE', 	1: {'data-codreg': 'CENTRO_LESTE'}},
			20:	{0: 'CENTRO NORTE', 	1: {'data-codreg': 'CENTRO_NORTE'}},
			21:	{0: 'EXTREMO SUDOESTE', 1: {'data-codreg': 'EXTREMO_SUDOESTE'}},
			22:	{0: 'LESTE', 			1: {'data-codreg': 'LESTE'}},
			23:	{0: 'MÉDIO NORTE', 		1: {'data-codreg': 'MEDIO_NORTE'}},
			24:	{0: 'METROPOLITANA', 	1: {'data-codreg': 'METROPOLITANA'}},
			25:	{0: 'NORDESTE', 		1: {'data-codreg': 'NORDESTE'}},
			26:	{0: 'NORTE', 			1: {'data-codreg': 'NORTE'}},
			27:	{0: 'OESTE', 			1: {'data-codreg': 'OESTE'}},
			28:	{0: 'SUDOESTE', 		1: {'data-codreg': 'SUDOESTE'}},
			29:	{0: 'SUL', 				1: {'data-codreg': 'SUL'}},
			30:	{0: 'VALE DO ARAGUAIA', 1: {'data-codreg': 'VALE_DO_ARAGUAIA'}},
		};
		
		return DS_REGIOES;
	},
	MUNICIPIOSREGIAO:	function(uf, idRegional, codRegional, descRegional, codMunicipio, descMunicipio){
		(uf 		 	=== undefined) ? uf = 'GO' : '' ;
		(idRegional  	=== undefined) ? idRegional  = '' : '' ;
		(codRegional 	=== undefined) ? codRegional = '' : '' ;
		(descRegional  	=== undefined) ? descRegional  = '' : '' ;
		(codMunicipio 	=== undefined) ? codMunicipio  = '' : '' ;
		(descMunicipio 	=== undefined) ? descMunicipio = '' : '' ;
		
		var filtro	 	= (uf + idRegional + codRegional + descRegional + codMunicipio + descMunicipio);
		var DS_CIDADESREGIAO 	= new Object();
		var CASCH_CIDADESREGIAO = window[_global.objVars.data].cacheDataset['_CIDADESREGIAO'];
		if(CASCH_CIDADESREGIAO !== undefined  &&  CASCH_CIDADESREGIAO !== null  &&  filtro == 'GO'){
			DS_CIDADESREGIAO = CASCH_CIDADESREGIAO;
		} else {
			var constraints = 'WEBSERVICE,LISTA_MUNICIPIOS_REGIONAL';
			constraints += (uf 	 			!= '') ? ',UF,' +  			 uf 			+ '' : '' ;
			constraints += (idRegional 		!= '') ? ',IDREGIONAL,' + 	 idRegional 	+ '' : '' ;
			constraints += (codRegional 	!= '') ? ',CODREGIONAL,' +	 codRegional 	+ '' : '' ;
			constraints += (descRegional 	!= '') ? ',DESCREGIONAL,' +	 descRegional 	+ '' : '' ;
			constraints += (codMunicipio 	!= '') ? ',CODMUNICIPIO,' +  codMunicipio 	+ '' : '' ;
			constraints += (descMunicipio 	!= '') ? ',DESCMUNICIPIO,' + descMunicipio 	+ '' : '' ;

			DS_CIDADESREGIAO = window[_global.objVars.mints].custom.dataset.getSelect('rmSqlDefaultDataset',   constraints, 	'CODMUNICIPIO,DESCMUNICIPIO,UF,IDREGIONAL,CODREGIONAL,DESCREGIONAL',  'DESCMUNICIPIO',  'data-uf,UF,data-idregional,IDREGIONAL,data-codregional,CODREGIONAL,data-descregional,DESCREGIONAL');
			if(filtro == 'GO'){
				window[_global.objVars.data].cacheDataset['_CIDADESREGIAO'] = DS_CIDADESREGIAO;
			}
		}
		return DS_CIDADESREGIAO;
	},
	CARGOS:		function(){
		//return window[_global.objVars.mints].custom.dataset.getSelect('rm_RMSPRJ4264448Server_readviewauth', '', 'DESCRICAO,DESCRICAO', 		'DESCRICAO');
		var DS_LISTA_CARGOS	 = new Object();
		var CASCH_LISTA_CARGOS = window[_global.objVars.data].cacheDataset['_LISTA_CARGOS'];
		if(CASCH_LISTA_CARGOS !== undefined  &&  CASCH_LISTA_CARGOS !== null){
			DS_LISTA_CARGOS = CASCH_LISTA_CARGOS;
		} else {
			DS_LISTA_CARGOS = window[_global.objVars.mints].custom.dataset.getSelect('rm_RMSPRJ4264448Server_readviewauth', '', 'DESCRICAO,DESCRICAO', 		'DESCRICAO');
			window[_global.objVars.data].cacheDataset['_LISTA_CARGOS'] = DS_LISTA_CARGOS;
		}
		return DS_LISTA_CARGOS;
	},
	TIPODEFICIENCIA: 	{'1':  'Altas Habilidades',  '2': 'Condutas Típicas',  '3': 'Deficiência Auditiva',  '4': 'Deficiência Física',  '5': 'Deficiência Mental',  '6': 'Deficiência Múltipla',  '7': 'Deficiência Visual',  '8': 'Não Informado',  '9': 'Síndrome de Down',  '10': 'Outras'},
	STATUSTRABALHO:		{'1':  'Completo',  '2': 'Desclassificado'},
	TIPOINSTITUICAO: 	{'TO': 'Todas', 'ES': 'Escola',  'PA': 'Parceiro',  'SI': 'Sindicato', 'OU':'Outros'},
	GRUPOTRABALHO:		{
		'AJ': 'Agrinho Jovem', 
		'DE': 'Desenho', 
		//'EA': 'Escola Agrinho', 
		//'EP': 'Experiência Pedagógiga', 
		'RE': 'Redação', 
		'MA': 'Município Agrinho'
	},
	CATEGORIASTRABALHO: {
		'AJ':   'AJ   - AGRINHO JOVEM',
		'AJEM': 'AJEM - AGRINHO JOVEM ENSINO MÉDIO',
		'AJU': 	'AJU  - AGRINHO JOVEM UNIVERSITÁRIO',
		'DE1': 	'DE1  - DESENHO 1º ANO DO ENSINO FUNDAMENTAL',
		'DE2': 	'DE2  - DESENHO 2º ANO DO ENSINO FUNDAMENTAL',
		'DEE': 	'DEE  - DESENHO EDUCAÇÃO ESPECIAL',
		'DEI': 	'DEI  - DESENHO EDUCAÇÃO INFANTIL',
		'RE3': 	'RE3  - REDAÇÃO 3º ANO DO ENSINO FUNDAMENTAL',
		'RE4': 	'RE4  - REDAÇÃO 4º ANO DO ENSINO FUNDAMENTAL',
		'RE5': 	'RE5  - REDAÇÃO 5º ANO DO ENSINO FUNDAMENTAL',
		'RE6': 	'RE6  - REDAÇÃO 6º ANO DO ENSINO FUNDAMENTAL',
		'RE7': 	'RE7  - REDAÇÃO 7º ANO DO ENSINO FUNDAMENTAL',
		'RE8': 	'RE8  - REDAÇÃO 8º ANO DO ENSINO FUNDAMENTAL',
		'RE9': 	'RE9  - REDAÇÃO 9º ANO DO ENSINO FUNDAMENTAL',
		'MA': 	'MA   - MUNICÍPIO AGRINHO',
	},
	IDCATEGORIASTRABALHO: {
		'1':  ['AGRINHO JOVEM', 						{'data-codgrupo': 'AJ'},	{'data-codigo': 'AJ'},	{'data-ano': '2016'}],
		'16': ['AGRINHO JOVEM ENSINO MÉDIO', 			{'data-codgrupo': 'AJ'},	{'data-codigo': 'AJEM'},{'data-ano': '2017'}],
		'17': ['AGRINHO JOVEM UNIVERSITÁRIO', 			{'data-codgrupo': 'AJ'},	{'data-codigo': 'AJU'},	{'data-ano': '2017'}],
		'2':  ['DESENHO 1º ANO DO ENSINO FUNDAMENTAL', 	{'data-codgrupo': 'DE'},	{'data-codigo': 'DE1'},	{'data-ano': '2017'}],
		'3':  ['DESENHO 2º ANO DO ENSINO FUNDAMENTAL', 	{'data-codgrupo': 'DE'},	{'data-codigo': 'DE2'},	{'data-ano': '2017'}],
		'4':  ['DESENHO EDUCAÇÃO ESPECIAL', 			{'data-codgrupo': 'DE'},	{'data-codigo': 'DEE'},	{'data-ano': '2017'}],
		'5':  ['DESENHO EDUCAÇÃO INFANTIL', 			{'data-codgrupo': 'DE'},	{'data-codigo': 'DEI'},	{'data-ano': '2017'}],
		'7':  ['REDAÇÃO 3º ANO DO ENSINO FUNDAMENTAL', 	{'data-codgrupo': 'RE'},	{'data-codigo': 'RE3'},	{'data-ano': '2017'}],
		'8':  ['REDAÇÃO 4º ANO DO ENSINO FUNDAMENTAL', 	{'data-codgrupo': 'RE'},	{'data-codigo': 'RE4'},	{'data-ano': '2017'}],
		'9':  ['REDAÇÃO 5º ANO DO ENSINO FUNDAMENTAL', 	{'data-codgrupo': 'RE'},	{'data-codigo': 'RE5'},	{'data-ano': '2017'}],
		'10': ['REDAÇÃO 6º ANO DO ENSINO FUNDAMENTAL', 	{'data-codgrupo': 'RE'},	{'data-codigo': 'RE6'},	{'data-ano': '2017'}],
		'11': ['REDAÇÃO 7º ANO DO ENSINO FUNDAMENTAL', 	{'data-codgrupo': 'RE'},	{'data-codigo': 'RE7'},	{'data-ano': '2017'}],
		'12': ['REDAÇÃO 8º ANO DO ENSINO FUNDAMENTAL', 	{'data-codgrupo': 'RE'},	{'data-codigo': 'RE8'},	{'data-ano': '2017'}],
		'13': ['REDAÇÃO 9º ANO DO ENSINO FUNDAMENTAL', 	{'data-codgrupo': 'RE'},	{'data-codigo': 'RE9'},	{'data-ano': '2017'}],
		//'14': ['EXPERIÊNCIA PEDAGÔGICA', 				{'data-codgrupo': 'EP'},	{'data-codigo': 'EP'},	{'data-ano': '2015'}],
		//'6':  ['ESCOLA AGRINHO', 						{'data-codgrupo': 'EA'},	{'data-codigo': 'EA'},	{'data-ano': '2016'}],
		'15': ['MUNICÍPIO AGRINHO', 					{'data-codgrupo': 'MA'},	{'data-codigo': 'MA'},	{'data-ano': '2017'}],
	},
	ESCOLAS:	function(uf, codMunicipio, cidade, codCfo){
		(uf 			=== undefined) ? uf 			= 'GO' : '' ;
		(codMunicipio 	=== undefined) ? codMunicipio 	= '' : '' ;
		(cidade 		=== undefined) ? cidade 		= '' : '' ;
		(codCfo 		=== undefined) ? codCfo 		= '' : '' ;
		
		if(codMunicipio == ''  &&  cidade == ''  &&  codCfo == ''){
			return {}
		} else {
			var filtro	 		= (uf + ',' + codMunicipio + ',' + cidade + ',' + codCfo);
			var filtroPadrao	= 'GO,,,';
			var DS_LISTA_ESCOLAS 		= new Object();
			var CASCH_LISTA_ESCOLAS 	= window[_global.objVars.data].cacheDataset['_LISTA_ESCOLAS'];
			if(CASCH_LISTA_ESCOLAS !== undefined  &&  CASCH_LISTA_ESCOLAS !== null  &&  filtro == filtroPadrao){
				console.log('... pegou cache de escolas');
				DS_LISTA_ESCOLAS = CASCH_LISTA_ESCOLAS;
			} else {
				var constraints = '';
				constraints += (uf 	 			!= '') ? 'CODETD,' +  		uf 				+ '' : '' ;
				constraints += (codMunicipio 	!= '') ? ',CODMUNICIPIO,' + codMunicipio 	+ '' : '' ;
				constraints += (cidade 			!= '') ? ',CIDADE,' +		cidade 			+ '' : '' ;
				constraints += (codCfo 			!= '') ? ',CODCFO,' +		codCfo 			+ '' : '' ;

				////return window[_global.objVars.mints].custom.dataset.getSelect('rmSql_finEscolas', 'CODETD,' + uf + ',CODMUNICIPIO,' + codMunicipio + ',CIDADE,' + cidade + ',CODCFO,' +	codCfo,  'cdMunicipio,nmMunicipio', 	'nmMunicipio');
				//return window[_global.objVars.mints].custom.dataset.getSelect('rmSql_finListaEscolas', 'CODETD,' + uf + ',CODMUNICIPIO,' + codMunicipio + ',CIDADE,' + cidade + ',CODCFO,' +	codCfo,  'CODCFO,NOME', 	'NOME', 'data-cnpj,CGCCFO,data-redeescola,REDEESCOLA');
				DS_LISTA_ESCOLAS = window[_global.objVars.mints].custom.dataset.getSelect('rmSql_finListaEscolas', constraints,  'CODCFO,NOME', 	'NOME', 'data-cnpj,CGCCFO,data-redeescola,REDEESCOLA');
				if(filtro == filtroPadrao){
					window[_global.objVars.data].cacheDataset['_LISTA_ESCOLAS'] = DS_LISTA_ESCOLAS;
				}
			}
			return DS_LISTA_ESCOLAS;
		}
	},
	PROFESSORES:	function(codCfo, codPessoa, cargo, ativo){
		(codCfo 	=== undefined) ? codCfo 	= '' : '' ;
		(codPessoa 	=== undefined) ? codPessoa 	= '' : '' ;
		(cargo	 	=== undefined) ? cargo 		= 'Professor(a)' : '' ;
		(ativo	 	=== undefined) ? ativo 		= '1' : '' ;

		if(codCfo == ''){
			return {};
		} else {
			var filtro	 		= (codCfo + ',' + codPessoa + ',' + cargo + ',' + ativo);
			var filtroPadrao	= $('#codCfo').val() + ',,Professor(a),1';
			var DS_LISTA_PROFESSORES 		= new Object();
			var CASCH_LISTA_PROFESSORES 	= window[_global.objVars.data].cacheDataset['_LISTA_PROFESSORES'];
			if(CASCH_LISTA_PROFESSORES !== undefined  &&  CASCH_LISTA_PROFESSORES !== null  &&  filtro == filtroPadrao){
				console.log('... pegou cache de professores');
				DS_LISTA_PROFESSORES = CASCH_LISTA_PROFESSORES;
			} else {
				var constraints = '';
				constraints += (codCfo 	 	!= '') ? 'CODCFO,' +  			codCfo 		+ '' : '' ;
				constraints += (codPessoa 	!= '') ? ',CODPESSOA,' + 		codPessoa 	+ '' : '' ;
				constraints += ',EMAIL,,PESSOAFISOUJUR,J' ;
				constraints += (cargo 		!= '') ? ',CARGO,' +			cargo 		+ '' : '' ;
				constraints += ',FCFO_ATIVO,1' ;
				constraints += (ativo 		!= '') ? ',VINCULO_ATIVO,' +	ativo 		+ '' : '' ;

				////return window[_global.objVars.mints].custom.dataset.getSelect('rm_RMSPRJ4555776Server_consulta_vinculo', 'CODCFO,' +	codCfo + ',CODPESSOA,' + codPessoa + ',CARGO,' + cargo + ',ATIVO,' + ativo,  'CODPESSOA,CARGO', 	'NOME');
				//return window[_global.objVars.mints].custom.dataset.getSelect('ds_grListaVinculoFcfoPpessoa_2_SENAR', 'CODCFO,' +	codCfo + ',CODPESSOA,' + codPessoa + ',EMAIL,,PESSOAFISOUJUR,J,CARGO,' + cargo + ',FCFO_ATIVO,1,VINCULO_ATIVO,' + ativo,  'CODPESSOA,NOME_PESSOA', 	'NOME', 	'data-cpf,CPF');
				DS_LISTA_PROFESSORES = window[_global.objVars.mints].custom.dataset.getSelect('ds_grListaVinculoFcfoPpessoa_2_SENAR',  constraints,  'CODPESSOA,NOME_PESSOA', 	'NOME', 	'data-cpf,CPF');
				if(filtro == filtroPadrao){
					window[_global.objVars.data].cacheDataset['_LISTA_PROFESSORES'] = DS_LISTA_PROFESSORES;
				}
			}
			return DS_LISTA_PROFESSORES;
		}
	},
	ORDEMAVALIACAO:	{'1': 'Nota 1', '2': 'Nota 2', '3': 'Nota 3', '4': 'Nota 4', '5': 'Nota 5', '6': 'Nota 6', '7': 'Nota 7', '8': 'Nota 8', '9': 'Nota 9'},
	CODAVALIACAO:	{'1': 'A1', '2': 'A2', '3': 'A3', '4': 'A4', '5': 'A5'},
	TIPOAVALIACOES:	{'1': 'Avaliador',  	'2': 'Banca'},
	NOTA_C1:		{'C': 'Classificado', 	'D': 'Desclassificado'},
	AVALIADORES:	function(idAvaliador, codPessoa, codNivel, ativo, ano){
		(idAvaliador=== undefined) ? idAvaliador= ''  : '' ;
		(codPessoa	=== undefined) ? codPessoa 	= ''  : '' ;
		(codNivel	=== undefined) ? codNivel 	= ''  : '' ;
		(ativo	 	=== undefined) ? ativo 		= '1' : '' ;
		ano = (ano === undefined  ||  ano === null  ||  ano == '')? $('#' + ListaTrabalhos.props.id.select.filterYear	).val()  :   ano  ;
		ano = (ano === undefined)?  moment().format('YYYY')  :  ano  ;
		
		var filtro 		= (idAvaliador + codPessoa + codNivel + ativo);
		var DS_AVA 		= new Object();
		var CASCH_AVA 	= window[_global.objVars.data].cacheDataset['_AVALIADORES'];
		if(CASCH_AVA !== undefined  &&  CASCH_AVA !== null  &&  filtro == '1'){
			DS_AVA = CASCH_AVA;
		} else {
			DS_AVA = window[_global.objVars.mints].custom.dataset.getSelect('rmSqlDefaultDataset', 'WEBSERVICE,LISTA_AVALIADORES_AGRINHO,IDAVALIADOR,' +	idAvaliador + ',CODPESSOA,' +	codPessoa + ',CODNIVEL,' +	codNivel + ',ATIVO,' + ativo + ',ANO,' + ano,  'IDAVALIADOR,NOME,CODPESSOA,CPF,CODNIVEL,DESCNIVEL', 	'NOME', 	'data-codpessoa,CODPESSOA,data-cpf,CPF,data-codnivel,CODNIVEL');
			if(filtro == '1'){
				window[_global.objVars.data].cacheDataset['_AVALIADORES'] = DS_AVA;
			}
		}
		return DS_AVA;
	},
	BANCAS:			function(idBanca, codBanca, principal, codGrupo, idCategoria, codCategoria, anoReferencia, ativo){
		(idBanca  		=== undefined) ? idBanca 		= '' : '' ;
		(codBanca  		=== undefined) ? codBanca 		= '' : '' ;
		(principal  	=== undefined) ? principal 		= '' : '' ;
		(codGrupo  		=== undefined) ? codGrupo 		= '' : '' ;
		(idCategoria  	=== undefined) ? idCategoria 	= '' : '' ;
		(codCategoria 	=== undefined) ? codCategoria 	= '' : '' ;
		(anoReferencia 	=== undefined) ? anoReferencia 	= '' : '' ;
		(ativo 			=== undefined) ? ativo 			= '1': '' ;

		var filtro 			= (idBanca + codBanca + principal + codGrupo + idCategoria + codCategoria + anoReferencia + ativo);
		var DS_BANCAS 		= new Object();
		var CASCH_BANCAS 	= window[_global.objVars.data].cacheDataset['_BANCAS'];
		if(CASCH_BANCAS !== undefined  &&  CASCH_BANCAS !== null  &&  filtro == '1'){
			DS_BANCAS = CASCH_BANCAS;
		} else {
			DS_BANCAS = window[_global.objVars.mints].custom.dataset.getSelect('rmSqlDefaultDataset', 'WEBSERVICE,LISTA_BANCAS_AGRINHO,IDBANCA,' + idBanca + ',CODBANCA,' + codBanca + ',PRINCIPAL,' + principal + ',CODGRUPO,' + codGrupo + ',IDCATEGORIA,' + idCategoria + ',CODCATEGORIA,' + codCategoria + ',ANOREFERENCIA,' + anoReferencia + ',ATIVO,' + ativo,  'CODBANCA,CODBANCA,IDBANCA,CODGRUPO,CODCATEGORIA', 	'CODBANCA', 	'data-grupo,CODGRUPO,data-codcategoria,CODCATEGORIA');
			if(filtro == '1'){
				window[_global.objVars.data].cacheDataset['_BANCAS'] = DS_BANCAS;
			}
		}
		return DS_BANCAS;
	},
	RELATORIOS_AGRINHO: {
		'REL_MFF': 		'Médias Finais', 
		'REL_MF': 		'Notas Finais dos Avaliadores', 
		'REL_BMF': 		'Notas Finais das Bancas', 
		'REL_DIFF': 	'Avaliações Discrepantes', 
		'REL_EMP': 		'Trabalhos Empatados',
		'REL_COM_BANCA':'Trabalhos Com Banca', 
		'REL_SEM_NOTA': 'Trabalhos Sem Notas', 
		'REL_SEM_AVA': 	'Trabalhos Sem Avaliação', 
		'REL_DESCL': 	'Trabalhos Desclassificados', 
		'REL_DESCL_QTD':'Trabalhos Desclassificados por Quantidade', 
		'REL_DESCL_C1': 'Trabalhos Desclassificados por Conceito 1', 
		'REL_ERROR': 	'Trabalhos com Erro de Digitação', 
		'REL_DELETE': 	'Trabalhos Inativos (deletados)', 
		//'REL_STATUS': 	'Situação dos Trabalhos', 
	}
}


var CASCH_CIDADES_GO = new Object();
CASCH_CIDADES_GO = {
	'00050': "Abadia de Goiás",
	'00100': "Abadiânia",
	'00134': "Acreúna",
	'00159': "Adelândia",
	'00175': "Água Fria de Goiás",
	'00209': "Água Limpa",
	'00258': "Águas Lindas de Goiás",
	'00308': "Alexânia",
	'00506': "Aloândia",
	'00555': "Alto Horizonte",
	'00605': "Alto Paraíso de Goiás",
	'00803': "Alvorada do Norte",
	'00829': "Amaralina",
	'00852': "Americano do Brasil",
	'00902': "Amorinópolis",
	'01108': "Anápolis",
	'01207': "Anhanguera",
	'01306': "Anicuns",
	'01405': "Aparecida de Goiânia",
	'01454': "Aparecida do Rio Doce",
	'01504': "Aporé",
	'01603': "Araçu",
	'01702': "Aragarças",
	'01801': "Aragoiânia",
	'02155': "Araguapaz",
	'02353': "Arenópolis",
	'02502': "Aruanã",
	'02601': "Aurilândia",
	'02809': "Avelinópolis",
	'03104': "Baliza",
	'03203': "Barro Alto",
	'03302': "Bela Vista de Goiás",
	'03401': "Bom Jardim de Goiás",
	'03500': "Bom Jesus de Goiás",
	'03559': "Bonfinópolis",
	'03575': "Bonópolis",
	'03609': "Brazabrantes",
	'03807': "Britânia",
	'03906': "Buriti Alegre",
	'03939': "Buriti de Goiás",
	'03962': "Buritinópolis",
	'04003': "Cabeceiras",
	'04102': "Cachoeira Alta",
	'04201': "Cachoeira de Goiás",
	'04250': "Cachoeira Dourada",
	'04300': "Caçu",
	'04409': "Caiapônia",
	'04508': "Caldas Novas",
	'04557': "Caldazinha",
	'04607': "Campestre de Goiás",
	'04656': "Campinaçu",
	'04706': "Campinorte",
	'04805': "Campo Alegre de Goiás",
	'04854': "Campo Limpo de  Goiás",
	'04904': "Campos Belos",
	'04953': "Campos Verdes",
	'05000': "Carmo do Rio Verde",
	'05059': "Castelândia",
	'05109': "Catalão",
	'05208': "Caturaí",
	'05307': "Cavalcante",
	'05406': "Ceres",
	'05455': "Cezarina",
	'05471': "Chapadão do Céu",
	'05497': "Cidade Ocidental",
	'05513': "Cocalzinho de Goiás",
	'05521': "Colinas do Sul",
	'05703': "Córrego do Ouro",
	'05802': "Corumbá de Goiás",
	'05901': "Corumbaíba",
	'06206': "Cristalina",
	'06305': "Cristianópolis",
	'06404': "Crixás",
	'06503': "Cromínia",
	'06602': "Cumari",
	'06701': "Damianópolis",
	'06800': "Damolândia",
	'06909': "Davinópolis",
	'07105': "Diorama",
	'07253': "Doverlândia",
	'07352': "Edealina",
	'07402': "Edéia",
	'07501': "Estrela do Norte",
	'07535': "Faina",
	'07600': "Fazenda Nova",
	'07808': "Firminópolis",
	'07907': "Flores de Goiás",
	'08004': "Formosa",
	'08103': "Formoso",
	'08152': "Gameleira de Goiás",
	'08301': "Divinópolis de Goiás",
	'08400': "Goianápolis",
	'08509': "Goiandira",
	'08608': "Goianésia",
	'08707': "Goiânia",
	'08806': "Goianira",
	'08905': "Goiás",
	'09101': "Goiatuba",
	'09150': "Gouvelândia",
	'09200': "Guapó",
	'09291': "Guaraíta",
	'09408': "Guarani de Goiás",
	'09457': "Guarinos",
	'09606': "Heitoraí",
	'09705': "Hidrolândia",
	'09804': "Hidrolina",
	'09903': "Iaciara",
	'09937': "Inaciolândia",
	'09952': "Indiara",
	'10000': "Inhumas",
	'10109': "Ipameri",
	'10158': "Ipiranga de Goiás",
	'10208': "Iporá",
	'10307': "Israelândia",
	'10406': "Itaberaí",
	'10562': "Itaguari",
	'10604': "Itaguaru",
	'10802': "Itajá",
	'10901': "Itapaci",
	'11008': "Itapirapuã",
	'11206': "Itapuranga",
	'11305': "Itarumã",
	'11404': "Itauçu",
	'11503': "Itumbiara",
	'11602': "Ivolândia",
	'11701': "Jandaia",
	'11800': "Jaraguá",
	'11909': "Jataí",
	'12006': "Jaupaci",
	'12055': "Jesúpolis",
	'12105': "Joviânia",
	'12204': "Jussara",
	'12253': "Lagoa Santa",
	'12303': "Leopoldo de Bulhões",
	'12501': "Luziânia",
	'12600': "Mairipotaba",
	'12709': "Mambaí",
	'12808': "Mara Rosa",
	'12907': "Marzagão",
	'12956': "Matrinchã",
	'13004': "Maurilândia",
	'13053': "Mimoso de Goiás",
	'13087': "Minaçu",
	'13103': "Mineiros",
	'13400': "Moiporá",
	'13509': "Monte Alegre de Goiás",
	'13707': "Montes Claros de Goiás",
	'13756': "Montividiu",
	'13772': "Montividiu do Norte",
	'13806': "Morrinhos",
	'13855': "Morro Agudo de Goiás",
	'13905': "Mossâmedes",
	'14002': "Mozarlândia",
	'14051': "Mundo Novo",
	'14101': "Mutunópolis",
	'14408': "Nazário",
	'14507': "Nerópolis",
	'14606': "Niquelândia",
	'14705': "Nova América",
	'14804': "Nova Aurora",
	'14838': "Nova Crixás",
	'14861': "Nova Glória",
	'14879': "Nova Iguaçu de Goiás",
	'14903': "Nova Roma",
	'15009': "Nova Veneza",
	'15207': "Novo Brasil",
	'15231': "Novo Gama",
	'15256': "Novo Planalto",
	'15306': "Orizona",
	'15405': "Ouro Verde de Goiás",
	'15504': "Ouvidor",
	'15603': "Padre Bernardo",
	'15652': "Palestina de Goiás",
	'15702': "Palmeiras de Goiás",
	'15801': "Palmelo",
	'15900': "Palminópolis",
	'16007': "Panamá",
	'16304': "Paranaiguara",
	'16403': "Paraúna",
	'16452': "Perolândia",
	'16809': "Petrolina de Goiás",
	'16908': "Pilar de Goiás",
	'17104': "Piracanjuba",
	'17203': "Piranhas",
	'17302': "Pirenópolis",
	'17401': "Pires do Rio",
	'17609': "Planaltina",
	'17708': "Pontalina",
	'18003': "Porangatu",
	'18052': "Porteirão",
	'18102': "Portelândia",
	'18300': "Posse",
	'18391': "Professor Jamil",
	'18508': "Quirinópolis",
	'18607': "Rialma",
	'18706': "Rianápolis",
	'18789': "Rio Quente",
	'18805': "Rio Verde",
	'18904': "Rubiataba",
	'19001': "Sanclerlândia",
	'19100': "Santa Bárbara de Goiás",
	'19209': "Santa Cruz de Goiás",
	'19258': "Santa Fé de Goiás",
	'19308': "Santa Helena de Goiás",
	'19357': "Santa Isabel",
	'19407': "Santa Rita do Araguaia",
	'19456': "Santa Rita do Novo Destino",
	'19506': "Santa Rosa de Goiás",
	'19605': "Santa Tereza de Goiás",
	'19704': "Santa Terezinha de Goiás",
	'19712': "Santo Antônio da Barra",
	'19738': "Santo Antônio de Goiás",
	'19753': "Santo Antônio do Descoberto",
	'19803': "São Domingos",
	'19902': "São Francisco de Goiás",
	'20009': "São João d Aliança",
	'20058': "São João da Paraúna",
	'20108': "São Luís de Montes Belos",
	'20157': "São Luíz do Norte",
	'20207': "São Miguel do Araguaia",
	'20264': "São Miguel do Passa Quatro",
	'20280': "São Patrício",
	'20405': "São Simão",
	'20454': "Senador Canedo",
	'20504': "Serranópolis",
	'20603': "Silvânia",
	'20686': "Simolândia",
	'20702': "Sítio D Abadia",
	'21007': "Taquaral de Goiás",
	'21080': "Teresina de Goiás",
	'21197': "Terezópolis de Goiás",
	'21304': "Três Ranchos",
	'21403': "Trindade",
	'21452': "Trombas",
	'21502': "Turvânia",
	'21551': "Turvelândia",
	'21577': "Uirapuru",
	'21601': "Uruaçu",
	'21700': "Uruana",
	'21809': "Urutaí",
	'21858': "Valparaíso de Goiás",
	'21908': "Varjão",
	'22005': "Vianópolis",
	'22054': "Vicentinópolis",
	'22203': "Vila Boa",
	'22302': "Vila Propício",
	'33605': "Goialândia"
}
