console.log('%c [v.up.0.0.6] mints.js', 'color:gray');




window.importScript = function(url, type, callback){
    // Adding the script tag to the head as suggested before
    var head 	= document.getElementsByTagName('head')[0];
    var script 	= document.createElement('script');
    script.src 	= url;
    (type !== undefined) ? script.type = type : script.type = 'text/javascript';

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
	if(callback !== undefined){
	    script.onreadystatechange = callback;
    	script.onload = callback;
	}

    // Fire the loading
    head.appendChild(script);
	
	// Run the callback function
	//callback();
}


window.importScriptAsync = function(url, type, callback){
	setTimeout(function(){
		window.requireUrl(url, type, callback);
	}, 1);
}

window.renderCustomHTML = function(element, html, append){
	if(append){
		$(element).append(html);
	} else {
		$(element).html(html);
	}
	
	// Oculta campos inativos
	$(element).find( _global.selectors['hide'] ).hide();
	// Define mascaras de campos
	var parans = new Object();
	for(var maskClass in _global.maskType) {
		(maskClass == 'cpf'  ||  maskClass == 'cnpj'  ||  maskClass == 'money') ?  parans = {reverse: true} : parans = {reverse: false}  ;
		(maskClass == 'email') ?  parans =  {translation: { "A": { pattern: /[\w@\-.+]/, recursive: true }	} } : ''  ;
		$(element).find('.' + maskClass).mask( _global.maskType[maskClass], parans);
	}
	
	// Ajuste para nÃ£o permitir alteraÃ§Ã£o de campos "select" que estÃ£o em readonly
	$(element).find( 'select[readonly=readonly], select[readonly=true]' ).css( "pointer-events", "none" ).css( "touch-action", "none" );
	
	// Ajuste para nÃ£o permitir alteraÃ§Ã£o de campos "datetime" que estÃ£o em readonly
	$(element).find( 'input[readonly=readonly], input[readonly=true]' ).parent('div.date').find('span').css( "pointer-events", "none" ).css( "touch-action", "none" );

}

window.reloadCustomIdHTML = function(idTarget, objComponent, append, auxEval){
	
	var element = '#' + idTarget;
	window.reloadCustomHTML(element, objComponent, append, auxEval);
}

window.reloadCustomHTML = function(element, objComponent, append, auxEval){
	//var targetDOM = document.getElementById(element);	
	var targetDOM = $(element);
	var newHTML = objComponent.render();

	if(append === undefined){
		window.renderCustomHTML(targetDOM, newHTML, false);
	} else {
		window.renderCustomHTML(targetDOM, newHTML, append);
	}
	if(auxEval !== undefined){
		eval(auxEval);
	}
}

//importScript('https://unpkg.com/rxjs/bundles/Rx.min.js');



var MyMints = function(){};
// Utilizado pra atualizar a funÃ§Ã£o/classe.
MyMints.prototype.version = 'Version - UP - 0.0.6'; 

MyMints.prototype.RM = {
	report: {
		createParameter: function(param, val, description, visible){
			visible = (visible 	=== undefined) ? 'true' : visible ;
			val 	= (val 		=== undefined) ? '' 	: val ;
			
			var auxParameter = '' +
			'<RptParameterReportPar>' +
			'   <Description>' + description + '</Description>' +
			'   <ParamName>' + param + '</ParamName>' +
			'   <Type xmlns:d3p1="http://schemas.datacontract.org/2004/07/System" xmlns:d3p2="-mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089-System-System.RuntimeType" i:type="d3p2:RuntimeType" xmlns:d3p3="-mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089-System-System.UnitySerializationHolder" z:FactoryType="d3p3:UnitySerializationHolder" xmlns:z="http://schemas.microsoft.com/2003/10/Serialization/">' +
			'      <Data xmlns:d4p1="http://www.w3.org/2001/XMLSchema" i:type="d4p1:string" xmlns="">System.String</Data>' +
			'      <UnityType xmlns:d4p1="http://www.w3.org/2001/XMLSchema" i:type="d4p1:int" xmlns="">4</UnityType>' +
			'      <AssemblyName xmlns:d4p1="http://www.w3.org/2001/XMLSchema" i:type="d4p1:string" xmlns="">mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</AssemblyName>' +
			'   </Type>' +
			'   <Value xmlns:d3p1="http://www.w3.org/2001/XMLSchema" i:type="d3p1:string">' + val + '</Value>' +
			'   <Visible>' + visible + '</Visible>' +
			'</RptParameterReportPar>';

			return auxParameter;
		},
		createFilter: function(filter, val, sql){
			filter 	= (filter 	=== undefined) ? '' : filter ;
			val 	= (val 		=== undefined) ? '' : val ;
			sql 	= (sql 		=== undefined) ? '' : sql ;
			//var BandName = 'rptReport1';
			var bandName = 'RptReport';
			
			var auxFilter = '' +
			'<RptFilterReportPar>' +
			'	<BandName>' + bandName + '</BandName>'; 
			if(filter.toString() != ''){
				auxFilter += '' +
				'<FiltersByTable>' +
				'	<RptFilterByTablePar>'+
				'		<Filter>' + sql + '</Filter>'+
				'		<TableName>' + filter + '</TableName>' +
				'	</RptFilterByTablePar>' +
				'</FiltersByTable>';
			} else {
				auxFilter += '' +
				'	<FiltersByTable />';
			}
			auxFilter += '' +
			'	<MainFilter>true</MainFilter>' +  
			'	<Value>' + val + '</Value>' +
			'</RptFilterReportPar>';
			
			return auxFilter;
		},
		query: function(idReport, arrFilter, arrParans){
			// Montando filtros do relatÃ³rio
			var filters = '';
			if(arrFilter !== undefined  &&  arrFilter !== null){
				for(var i=0; i < arrFilter.length; i++){
					filters += this.createFilter(arrFilter[i].FILTRO, arrFilter[i].VALOR, arrFilter[i].SQL);
				}
			}
			filters = '' +
			'<ArrayOfRptFilterReportPar xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.totvs.com.br/RM/">' +
			'' + filters +
			'</ArrayOfRptFilterReportPar>';

			// Montando parÃ¢metros do relatÃ³rio
			var parameters = '';			
			if(arrParans !== undefined  &&  arrParans !== null){
				for(var i=0; i < arrParans.length; i++){
					parameters += this.createParameter(arrParans[i].PARAMETRO, arrParans[i].VALOR, arrParans[i].DESCRICAO, arrParans[i].VISIVEL);
				}
			}
			parameters = '' +
			'<ArrayOfRptParameterReportPar xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.totvs.com.br/RM/">' +
			'' + parameters +
			'</ArrayOfRptParameterReportPar>';
			
			var retorno = null;
			var c1 = DatasetFactory.createConstraint('relatorio', 	idReport, 	idReport,	ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint('filtro', 		filters, 	filters,	ConstraintType.MUST);
			var c3 = DatasetFactory.createConstraint('parametro', 	parameters, parameters,	ConstraintType.MUST);
			var DS_RM_REPORT = DatasetFactory.getDataset("GenerateReportSenar",  null,  [c1, c2, c3],  null);
			if (DS_RM_REPORT.values.length > 0) {
				retorno = new Array(DS_RM_REPORT.values[0].fileChunk, DS_RM_REPORT.values[0].reportSize);
			}
			return retorno;
		},
		donwload: function(idLink, idProgressBar, file, fileName, folderName, folder){
			var dlnk 	= document.getElementById(idLink);
			var guidRM 	= file;
			
			if (guidRM.length > 0 && guidRM.length != undefined){
				var fileChunk  = guidRM[0];
				var reportSize = guidRM[1];
				var pdf = 'data:application/octet-stream;base64,' + fileChunk;
				dlnk.href = pdf;
				
				var progress = 0;
				var interval;
				interval = window.setInterval(function () {
					$('div#' + idProgressBar).css('width', progress + '%');
					$('div#' + idProgressBar).html(progress + '%');
					progress++;
					if (progress >= 100) {
						interval = window.clearInterval(interval);
						$('div#' + idProgressBar).css('width', '100%');
						$('div#' + idProgressBar).html(progress + '%');
						dlnk.click();
						$('div#' + idProgressBar).parent('div.progress').slideUp('slow').delay(800);
					}
				}, 100);
				
				if(fileName !== undefined  &&  folderName !== undefined){
					folder = (folder !== undefined) ? '' : folder ;					
					var publisherFolder = _global.report.publisher;
					var folderFile = window[_global.objVars.mints].RM.GED.validateFolder(folder, folderName, publisherFolder);
					if(folderFile == null){
						folderFile = window[_global.objVars.mints].RM.GED.newFolder(folder, folderName, publisherFolder);
					}
					
					var codDocument = window[_global.objVars.mints].RM.GED.validateDocument(folderFile, fileName, publisherFolder);
					if(codDocument == null){
						codDocument = window[_global.objVars.mints].RM.GED.newDocument(folderName, fileName, fileChunk, reportSize);
					}
				}
			} else {
				var title	= 'Aten&ccedil;&atilde;o:';
				var msg		= 'Erro ao baixar relatÃ³rio, favor tentar novamente! Caso erro persista, contate o Administrador.';
				var type	= 'danger';
				window[_global.objVars.mints].FLUIG.alert.toast(title, msg, type);
				
				$('div#' + idProgressBar).parent('div.progress').slideUp('slow').delay(800);
			}
		},
		donwloadReport: function(idReport, arrFilter, arrParans, idLink, idProgressBar, myModal, autoClose){
			var timeOut = 1000, _busy = true, _runing  = false;
			var dataset = null;
			var title	= 'Aten&ccedil;&atilde;o:', msg = '', type = 'danger';
				
			var progress = 0;
			var interval;
			interval = setInterval(function (){
				$('div#' + idProgressBar).parent('div').show();
				$('div#' + idProgressBar).css('width', progress + '%');
				$('div#' + idProgressBar).html(progress + '%');
				progress++;
			    if (!_runing){
			    	_runing = true;
			    	dataset = window[_global.objVars.mints].RM.report.query(idReport, arrFilter, arrParans);
			    }
			    if(progress >= timeOut){
			    	_busy = false;
					var msg	= 'Erro ao baixar relatÃ³rio, nÃ£o foram retornados os dados.';					
			    }
			    if(dataset != null){
					var dlnk 	= document.getElementById(idLink);
					var guidRM 	= dataset;
					
					if (guidRM.length > 0 && guidRM.length !== undefined){
						var fileChunk  = guidRM[0];
						var reportSize = guidRM[1];
						var pdf = 'data:application/octet-stream;base64,' + fileChunk;
						dlnk.href = pdf;

						$('div#' + idProgressBar).css('width', '100%');
						$('div#' + idProgressBar).html(progress + '%');
						
						dlnk.click();
					} else {
						var msg	= 'Erro ao baixar relatÃ³rio, favor tentar novamente! Caso erro persista, contate o Administrador.';						
					}
					$('div#' + idProgressBar).parent('div.progress').slideUp('slow').delay(800);
					_runing = false;
			    	_busy = false;
			    }
			    if(msg != ''){
			    	window[_global.objVars.mints].FLUIG.alert.toast(title, msg, type);
			    }
				if(!_busy){
					if(myModal !== undefined){
						var modalIsOpen = (typeof(myModal) === 'undefined') ?  true : myModal.isOpen() ;
						if(!modalIsOpen || autoClose){
							(typeof(myModal) 	!== 'undefined') ?  myModal.remove() : '' ;
						}
					}
					clearInterval( interval );
				}
			}, timeOut);
		},
	},
	GED: {
      searchDocument: function(parentId, description){
         var c1 = DatasetFactory.createConstraint("parentDocumentId",parentId, parentId, ConstraintType.MUST);
         var c2 = DatasetFactory.createConstraint("deleted",false, false, ConstraintType.MUST);
         var c3 = DatasetFactory.createConstraint("activeVersion",true, true, ConstraintType.MUST);
         var c4 = DatasetFactory.createConstraint("documentDescription",description, description, ConstraintType.MUST);
         var sortingFields = new Array("documentDescription");
         var constraints  = new Array(c1,c2,c3,c4);
         var resultado = DatasetFactory.getDataset("document", null, constraints, sortingFields);
         
         return resultado;
      },
		filterFolderOrDocument: function(parentId, description, mask, rows, page){
			rows = (rows === undefined  ||  rows === null  ||  rows == '')? '100' : rows ;
			page = (page === undefined  ||  page === null  ||  page == '')? '1' : page ;
			var apiUrl = '/ecm/api/rest/ecm/navigation/content/' + parentId + '?filter=%7B%22documentDescription%22:%22' + description + '%22,%22documentTypeId%22:%22%22,%22topicId%22:%22%22,%22publisherId%22:%22%22,%22colleagueId%22:%22%22,%22dtstartModify%22:%22%22,%22dtendModify%22:%22%22,%22IdDocumentStart%22:%22%22,%22IdDocumentEnd%22:%22%22,%22customFieldId%22:%22%22,%22customDescription%22:%22%22%7D&_search=false&nd=1536604177331&rows=' + rows + '&page=' + page + '&sidx=documentDescription&sord=asc&_=1536584969318';
			var retorno = null;
			
			if((description !== undefined && parentId !== undefined) && (description !== null && parentId !== null) && (description != '' && parentId != '')){
				var existePasta = $.ajax({
					async : false,
					type : "GET",
					dataType : "json",
					url : _global.fluigAPI.serverURL + apiUrl,
					success : function(data){
						console.log('filterFolderOrDocument - OK');
						// ------- Debug Ajax ---------
						//console.log(data);
					},
					fail: function(data) {
						console.log("%c Erro ao filtrar documento!", 'color:red');
						console.log('fail:', data);
					}});
				
				for(var i = 0; i < existePasta.responseJSON.invdata.length; i++){
					if(existePasta.responseJSON.invdata[i].documentDescription.substring(mask, existePasta.responseJSON.invdata[i].documentDescription.length) == description.substring(mask, description.length)) {
						retorno = existePasta.responseJSON.invdata[i].documentId;
					}
				}
			}
			return retorno;
		},
		validateFolder:	function(folder, folderName, publisherFolder){
			var retorno = null;
			var c1 = DatasetFactory.createConstraint('pasta', 		folder, 		 	folder,				ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint('publicador', 	publisherFolder, 	publisherFolder,	ConstraintType.MUST);
			var DS_RM_FIND_FOLDER = DatasetFactory.getDataset("searchSimpleSubFolders", null, [c1, c2], null);
			if (DS_RM_FIND_FOLDER.values.length > 0) {
				for(var i = 0; i < DS_RM_FIND_FOLDER.values.length; i++){
					if(folderName == DS_RM_FIND_FOLDER.values[i].DocumentDescription){
						retorno = DS_RM_FIND_FOLDER.values[i].DocumentId;
					}else{
						retorno = null;
					}
				}
			}
			return retorno;
		},
		validateDocument: function(folderFile, fileName, publisherFolder){
			var file = fileName + '.pdf'; //Nome do arquivo.
			var retorno = null;
			var c1 = DatasetFactory.createConstraint('pasta', 		folderFile, 		folderFile,			ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint('publicador', 	publisherFolder, 	publisherFolder,	ConstraintType.MUST);
			var DS_RM_FIND_CHILDREN = DatasetFactory.getDataset("searchSimpleChildren", null, [c1, c2], null);
			if (DS_RM_FIND_CHILDREN.values.length > 0) {
				for(var i = 0; i < DS_RM_FIND_CHILDREN.values.length; i++){
					if(file == DS_RM_FIND_CHILDREN.values[i].DocumentDescription){
						return DS_RM_FIND_CHILDREN.values[i].DocumentId;
					}else{
						retorno = null;
					}
				}
			}
			return retorno;
		},
		newFolder: function(folder, folderName, publisherFolder){
			var retorno = null;
			var c1 = DatasetFactory.createConstraint('pasta', 	 	folder, 	 		folder,	 	 		ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint('publicador', 	publisherFolder, 	publisherFolder, 	ConstraintType.MUST);
			var c3 = DatasetFactory.createConstraint('arquivo', 	folderName, 	 	folderName,	 		ConstraintType.MUST);
			var DS_RM_CREATE_FOLDER = DatasetFactory.getDataset("createSimpleFolder", null, [c1, c2, c3], null);
			if (DS_RM_CREATE_FOLDER.values.length > 0) {
				retorno = DS_RM_CREATE_FOLDER.values[0].DocumentId;
			}
			return retorno;
		},
		newDocument: function(folderName, fileName, fileChunk, reportSize, formLoading){
			var parentDocumentId 	= folderName;
			var documentDescription = fileName + '.pdf';
			var retorno 			= null;
			var attachments 		= new Array(false, false, false, _global.report.fileName + '.pdf', null, reportSize, fileChunk, null, null, null, null, null);
			$(document).ready(function() {
				var myLoading1 = FLUIGC.loading( formLoading );
				myLoading1.show();
				
				var _xml 		= null;
				var xmlDefault 	= $.ajax({
					async: 		false,
					dataType: 	"xml",
					success: function(data) {
						_xml = $(data);
					},
					fail: function(data) {
						console.log("%c Erro ao buscar padrÃ£o do relatÃ³rio!", 'color:red');
						console.log('fail:', data);
					},
					type: 	"GET",
					url: 	"/webdesk/streamcontrol/xmls/CreateSimpleDocument.xml"
				});
				//AlteraÃ§Ã£o dos elementos XML
				_xml.find("username").text(				_global.report.userNameId);
				_xml.find("password").text(				_global.report.password);
				_xml.find("companyId").text(			_global.report.companyId);
				_xml.find("parentDocumentId").text(		parentDocumentId); 
				_xml.find("publisherId").text(			_global.report.publisherId);
				_xml.find("documentDescription").text(	documentDescription);
				_xml.find("fileSize").text(				reportSize);
				_xml.find("filecontent").text(			fileChunk);
				_xml.find("fileName").text(				documentDescription);
				//Envio de requisiÃ§Ã£o SOAP
				parentOBJ.WCMAPI.Create({
					url: 		 "/webdesk/ECMDocumentService?wsdl",
					contentType: "text/xml",
					dataType: 	 "xml",
					data: 		 _xml[0],
					success: function(data){
						console.log($(data));
					},
					fail: function(data) {
						console.log("%c Erro para salvar o relatÃ³rio!", 'color:red');
						console.log('fail:', data);
					}
				});
				myLoading1.hide(); 
			});
			return retorno;
		},
		newUpload: function(folderName, fileName, fileChunk, reportSize, formLoading){
			var parentDocumentId 	= folderName;
			var documentDescription = fileName + '.pdf';
			var retorno 			= null;
			var attachments 		= new Array(false, false, false, _global.report.fileName + '.pdf', null, reportSize, fileChunk, null, null, null, null, null);
			$(document).ready(function() {  
				var myLoading1 = FLUIGC.loading( formLoading );
				myLoading1.show();
				
				var _xml = null;
				var xmlDefault = $.ajax({
					async: 		false,
					dataType: 	"xml",
					success: function(data) {
						_xml = $(data);
					},
					fail: function(data) {
						console.log("%c Erro ao buscar padrÃ£o do relatÃ³rio!", 'color:red');
						console.log('fail:', data);
					},
					type: "GET",
					url: "/webdesk/streamcontrol/xmls/CreateSimpleDocument.xml"
				});	
				//AlteraÃ§Ã£o dos elementos XML
				_xml.find("username").text(				_global.report.userNameId);
				_xml.find("password").text(				_global.report.password);
				_xml.find("companyId").text(			_global.report.companyId);
				_xml.find("parentDocumentId").text(		parentDocumentId); 
				_xml.find("publisherId").text(			_global.report.publisherId);
				_xml.find("documentDescription").text(	documentDescription);
				_xml.find("fileSize").text(				reportSize);
				_xml.find("filecontent").text(			fileChunk);
				_xml.find("fileName").text(				documentDescription);
				//Envio de requisiÃ§Ã£o SOAP
				parentOBJ.WCMAPI.Create({
					url: 		 "/webdesk/ECMDocumentService?wsdl",
					contentType: "text/xml",
					dataType: 	 "xml",
					data: 		 _xml[0],
					success: function(data){
						console.log($(data));
					},
					fail: function(data) {
						console.log("%c Erro para salvar o relatÃ³rio!", 'color:red');
						console.log('fail:', data);
					}
				});
				myLoading1.hide(); 
			});
			return retorno;
		},
		downloadDocument: function(documentId, version, inputDownload){
			version = (version === undefined  ||  version === null  ||  version == '')? '1000' : version ;
			var apiUrl = '/webdesk/webdownload?documentId=' + documentId + '&version=' + version + '&tenantId=1&replication=false';
			var retorno = false;
			
			if((documentId !== undefined && version !== undefined) && (documentId !== null && version !== null) && (documentId != '' && version != '')){
				var file = $.ajax({
					async : false,
					type : "GET",
					dataType : "json",
					url : _global.fluigAPI.serverURL + apiUrl,
					success : function(data){
						console.log('downloadDocument - OK');
						// ------- Debug Ajax ---------
						//console.log(data);
						retorno = true;
					},
					fail: function(data) {
						console.log("%c Erro ao baixar documento!", 'color:red');
						console.log('fail:', data);
						retorno = false;
					}});
			}
			if(retorno){
				if(input !== undefined){
					var dlnk = document.getElementById( inputDownload );
					var pdf  = 'data:application/octet-stream;base64,' + file.responseText
					dlnk.href = pdf;
					dlnk.click();
					
					return '';
				} else {
					return file.responseText;
				}
			} else {
				return '';
			}
		}
	}
}

MyMints.prototype.FLUIG = {
	hostName: function(){
        var hostname = $(location).attr('hostname');
        return hostname;
    },
	severType: function(hostname){
        var aux = '';
        if((hostname == '') || (hostname === undefined)){
            //hostname = $(location).attr('hostname');
            hostname = this.hostname();
        }
        switch(hostname){
            case 'fluighomolog.sistemafaeg.org.br':
                aux = 'homolog';
                break;
            case 'fluig.sistemafaeg.org.br':
                aux = 'producao';
                break;
            default:
                aux = '';
        }	
        return aux;
    },
    security:	{
    	getUser: function(idUsuario, email, tipoRetorno) {

    		var arr_colleague = new Array();
    		if((idUsuario === undefined) || (idUsuario === null) || (idUsuario == '')){
    			idUsuario = 0;
    		}
    		if((email === undefined) || (email === null)){
    			email = '';
    		}

    		
    		arr_colleague = [{
    			'colleaguePK.colleagueId': 	0,
    			'colleagueName': 			'',
    			'adminUser': 				'',
    			'mail': 					'',
    			'currentProject': 			'',
    			'especializationArea': 		''
    		}];
    		if((idUsuario == 0) && (email == '')){
    			fnDebug("USUÃRIO NÃ‚O INFORMADO...", 'c');

    		} else {
    			var c1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', idUsuario, 	idUsuario, 	ConstraintType.MUST);
    			var c2 = DatasetFactory.createConstraint('mail', 					email, 		email, 		ConstraintType.MUST);
    			if((idUsuario != 0) && (email != '')){
    				var filtros = new Array(c1, c2);
    				
    			} else if(idUsuario != 0){
    				var filtros = new Array(c1);
    				
    			} else if(email != ''){
    				var filtros = new Array(c2);
    			}
    			var db_user = DatasetFactory.getDataset('colleague', null, filtros, null);
    			
    			if (db_user.values.length > 0) {
    				for (n = 0; n < db_user.values.length; n++) {
    					arr_colleague[n] = {
    						'colleaguePK.colleagueId': 	db_user.values[n]['colleaguePK.colleagueId'] ,
    			            'colleagueName': 			db_user.values[n]['colleagueName'] ,
    			            'adminUser': 				db_user.values[n]['adminUser'] ,
    			            'mail': 					db_user.values[n]['mail'] ,
    			            'currentProject': 			db_user.values[n]['currentProject'] ,
    			            'especializationArea': 		db_user.values[n]['especializationArea']
    					};
    				}
    			} else {
    				fnDebug("USUÃRIO NÃƒO EXISTE...", 'c');
    			}
    		}
    		if(tipoRetorno == 'id'){
    			return arr_colleague[0]['colleaguePK.colleagueId'];
    			
    		} else if(tipoRetorno == 'nome'){
    			return arr_colleague[0]['colleagueName'];
    			
    		} else {
    			return arr_colleague;
    		}
    	},
    	validateGroup: 	function(grupo, idUsuario){
    		idUsuario = (idUsuario == undefined) ? WCMAPI.userCode : idUsuario ;
    		console.log('fnValidaGrupoUsuario: ', grupo, idUsuario);
			var cst_colleague 		= DatasetFactory.createConstraint('colleagueGroupPK.colleagueId', 	idUsuario, 	idUsuario, 	ConstraintType.MUST);
			var cst_colleague2 		= DatasetFactory.createConstraint('colleagueGroupPK.groupId', 		grupo, 		grupo, 		ConstraintType.MUST);
			var constraints4 		= new Array(cst_colleague, cst_colleague2);
			var ds_colleagueGroup 	= DatasetFactory.getDataset('colleagueGroup', null, constraints4, null);
			
			if (ds_colleagueGroup.values.length > 0) {
				return true;
			} else {
				return false;
			}
		}
    },
    proccess: 	{
    	getFather:	function(numProcesso, numAtividade){
    		return this.getProccess('pai', numProcesso, numAtividade);
    	},
    	getChild: 	function(numProcesso, numAtividade){
    		return this.getProccess('filho', numProcesso, numAtividade);
    	},
    	getProccess:function(tipo, numProcesso, numAtividade){
//    		fnDebug("--Debbug-- fnPegaProcesso(" + tipo + ", " + numProcesso + ", " + numAtividade + ")", 'c');

    		var auxNumProcesso		= 0;
    		var numProcessoPai 		= 0;
    		var numProcessoFilho 	= 0;
    		var dataSet 			= 'processHistory';
    		var filtro_campo		= '';
    		var ds_campo			= '';
    		if((numProcesso === undefined) || (numProcesso === null) || (numProcesso == 0)){
    			fnDebug("NÃƒO FOI INFORMADO O NÂ° DO PROCESSO...", 'c');
    			
    		} else {
    			if(tipo == 'pai'){
    				filtro_campo = 'subProcessId';
    				ds_campo	 = 'processHistoryPK.processInstanceId';
    			
    			} else if(tipo == 'filho'){
    				filtro_campo = 'processHistoryPK.processInstanceId';
    				ds_campo	 = 'subProcessId';
    			
    			}
    			
    			var f1 = DatasetFactory.createConstraint(filtro_campo, 	numProcesso, numProcesso, ConstraintType.MUST);
    			if((numAtividade !== undefined) || (numAtividade !== null) || (numAtividade != '')){
    				var f2 = DatasetFactory.createConstraint('stateSequence', numAtividade, numAtividade, ConstraintType.MUST);
    				var filtros = new Array(f1, f2);
    			
    			} else {
    				var filtros = new Array(f1);
    			}
    			var db_processo = DatasetFactory.getDataset(dataSet, null, filtros, null);
    			
    			
    			if(db_processo.values.length > 0){
    				auxNumProcesso = db_processo.values[0][ds_campo];
    			} else {
    				auxNumProcesso = 0;
    				fnDebug("--Debbug-- NÃƒO ENCONTRADO PROCESSO " + tipo + "...", 'c');
    			}
    		}

//    		fnDebug("--Debbug-- Processo - " + tipo + ": [" + numProcesso + "]->[" + auxNumProcesso + "]", 'c');
    		if(tipo == 'pai'){
    			numProcessoPai 		= auxNumProcesso;
    			numProcessoFilho 	= numProcesso;
    		} else if(tipo == 'filho'){
    			numProcessoPai 		= numProcesso;
    			numProcessoFilho 	= auxNumProcesso;
    		}	
    		fnDebug("--Debbug-- Processo(" + tipo + ") - Pai: [" + numProcessoPai + "] | Filho: [" + numProcessoFilho + "]", 'c');
    		
    		return auxNumProcesso;
    	}
    },
    progress: {
    	init: 		function(type, id, title, content, autoClose){
    		
    	},
    	bar: {
    		create: function(id, val, msgEnd, addClass){
    			id 		= (id  	    === undefined) ? 'divBar' : id ;
    			val 	= (val      === undefined) ? '0'      : val ;
    			msgEnd 	= (msgEnd   === undefined) ? '100% Completo (sucesso)' : msgEnd ;
    			addClass= (addClass === undefined) ? 'progress-bar-success progress-bar-striped active' : addClass ;
    			
    			return '' +
    			'<div id="' + id + '" >' +
	    		'	<div class="progress">' +
	    		'		<div class="progress-bar ' + addClass + '" role="progressbar" aria-valuenow="' + val + '" aria-valuemin="0" aria-valuemax="100" style="width: 0%">' +
	    		'			<span class="sr-only">' + msgEnd + '</span>' +
	    		'		</div>' +
	    		'	</div>' +
	    		'</div>';
    		},
    		move: 	function(divId, divClass, divStatus, timeInterval, autoClose) {
    			autoClose = (autoClose == ''  ||  autoClose === null  ||  autoClose === undefined) ? false : autoClose ;
    			
    			$('#' + divId).show();
    			$('#' + divStatus).show();
    			//console.log('fnMoveProgressBar: ', divId, divClass, divStatus);
    			var width = 0;
    			var element = $('#' + divId).find(divClass); 
    			this.clear(divId, divClass, divStatus, false);

    		    var id = window.setInterval(this.frameBar (id, divId, divClass, divStatus, element, width, autoClose), timeInterval);
    		},
			frameBar: function(id, divId, divClass, divStatus, element, width, autoClose){
				if (width == 100) {
					if(id === undefined){
						clearInterval(id);
					} else {
						// Clear All Intervals
						(function(w){w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }})(/*window*/);
					}
					// Zerando barra
					this.clear(divId, divClass, divStatus, autoClose);
				} else {
					width++; 
				}
				//console.log('width: ', width);
				element.attr('aria-valuenow', width);
				element.css('width', width + '%');
			    $('#' + divStatus + ' > strong > span').html(width + '%')
			},
    		clear: 	function(divId, divClass, divStatus, autoClose) {
    			var element = $('#' + divId).find(divClass); 
    			element.attr('aria-valuenow', 0);
    			element.css('width', 0 + '%');
    			$('#' + divStatus + ' > strong > span').html(0 + '%');
    			if(autoClose){
    				$('#' + divId).hide();
    			}
    		}
    	},
    	counter: {
    		
    	},
    	msg: {
    		
    	},
    },
	loading: 	function(type, id, title, content, disable, autoClose, func, ...parans){
		autoClose 	= (autoClose == ''  ||  autoClose === null  ||  autoClose === undefined) ? false : autoClose ;
		disable 	= (disable == ''    ||  disable === null    ||  disable === undefined) ?   false : disable ;
		
		
		var myModalLoading 	= undefined;
		var myLoading 		= undefined;
        switch(type){
	        case 'msg':
	        case 'message':
	        	var myModalLoading = this.alert.message(title, content, labelYes, labelNo, '', '', 'fluig-modal', 'larger', true);
	    		if(disable){
	    			$(".modal-footer").find("button").attr("disabled", true);
	    		}
	            break;
	        case 'm':
	        case 'modal':
	        	var myModalLoading = this.alert.modal(title, content, 'Ok', 'fluig-modal', 'larger', true);
	    		if(disable){
	    			$(".modal-footer").find("button").attr("disabled", true);
	    		}
	            break;
	        case 't':
	        case 'toast':
	        	var myModalLoading = this.alert.toast(title, content, 'info');
	        	break;
	        case 'p':
	        case 'progress':
	        	var myModalLoading = this.alert.progress.init('bar', 'progress-bar', title, content, true);
	        	break;
	        case 'a':
	        case 'alert':
	        case 'c':
	        case 'console':
	        case 'l':
	        case 'load':
	        case 'loading':
	        	title 	= (title == ''    ||  title === null    ||  title === undefined) ?   'Aguarde ...' : title ;
	        	content	= (content == ''  ||  content === null  ||  content === undefined) ? '' : content ;
	        	
	        	if(type == 'a'  ||  type == 'alert'){
	        		alert(title + ': ' + content);
	        		
	        	} else if(type == 'c'  ||  type == 'console'){
	        		console.log('%c ' + title + ': ' + content, 'color:blue');
	        		
	        	}
	        	var myLoading = FLUIGC.loading('#' + id);
	        	myLoading.setMessage(title + content);
	        	myLoading.show();
	        	break;
	        default:	            
	    }

        _global.modal = myModalLoading;
        _global.load  = myLoading;
        
        var timeOut = 100;
		var i = 0, _busy = false;
		_global.autoClose = false;
		var processorInterval = setInterval(function(){
			if(i == 0){
			    console.log('%c processorInterval(loading): [' + processorInterval + '][' + _busy + '][' + _global.autoClose + ']', 'color:#c92ae0');
			}
			_global.numInterval = processorInterval;
			if(!_busy){
				_busy = true;
				if(i == 0){
					i++;
					if(func !== undefined){
						(typeof(window[func]) == 'function') ?  window[func](...parans) : '' ;
					}
				}
				var modalIsOpen = false;
				//(typeof(myModalLoading) !== 'undefined') ?  modalIsOpen = myModalLoading.isOpen() : '' ;
				modalIsOpen = (typeof(myModalLoading) === 'undefined') ?  true : myModalLoading.isOpen() ;
				
				console.log('%c processorInterval(loading...): [' + processorInterval + '][' + _busy + '][' + _global.autoClose + '][' + modalIsOpen + ']', 'color:#c92ae0');
				
				if(!modalIsOpen || _global.autoClose){
					(typeof(myModalLoading) !== 'undefined') ?  myModalLoading.remove() : '' ;
					(typeof(myLoading) 		!== 'undefined') ?  myLoading.hide() 		: '' ;
					
					var aux = '(clearInterval)'
					if(processorInterval !== undefined){
						aux += ': ' + processorInterval;
						clearInterval(processorInterval);
					} else {
						// Clear All Intervals
						aux += ': All';
						(function(w){w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }})(/*window*/);
					}
					console.log('%c processorInterval ' + aux + '.. finalizado!', 'color:#c92ae0');
				}
				_busy = false;
			}
		}, timeOut);
	},
    alert: {
    	toast:	function(title, msg, type){
	    	(type === undefined) ? type = 'danger' : '' ;
	    	
	    	var myModal = FLUIGC.toast({
	    		title: 	 title,
	    		message: msg,
	    		type: 	 type,
	    		//timeout: 'slow'
	    	});
	    	return myModal;
	    },
	    modal: function(title, msg, label, id, size, autoClose){
	    	label 		= (label 	 == ''  ||  label 	  === null  ||  label 	  === undefined) ? 'OK' 		 : label ;
	    	id 			= (id 	 	 == ''  ||  id 	      === null  ||  id 	  	  === undefined) ? 'fluig-modal' : id ;
	    	size 		= (size 	 == ''  ||  size 	  === null  ||  size 	  === undefined) ? 'larger' 	 : size ;
	    	autoClose 	= (autoClose == ''  ||  autoClose === null  ||  autoClose === undefined) ? true 		 : autoClose ;
	    	
	    	var myModal = FLUIGC.modal({
	    		title: 	 title,
	    		content: msg,
	    		id: 	 id,
	    		size: 	 size,  // full | large | small
	    		actions: [{
	    			'label': 	 label,
	    			'bind':  	 'data-open-modal',
	    			'autoClose': autoClose
	    		}]
	    	});
	    	return myModal;
	    },
	    message: function(title, msg, labelYes, labelNo, evalYes, evalNo, id, size, autoClose){
	    	// Chamada de popup de aviso.
	    	id 		 = (id 	 	 == ''  ||  id 	    === null  ||  id 	  === undefined) ? 'fluig-modal' : id ;
	    	size 	 = (size 	 == ''  ||  size 	=== null  ||  size 	  === undefined) ? 'larger' 	 : size ;
	    	labelYes = (labelYes == ''  ||  evalYes === null  ||  evalYes === undefined) ? 'Sim' : labelYes ;
	    	labelNo  = (labelNo  == ''  ||  evalYes === null  ||  evalYes === undefined) ? 'NÃ£o' : labelNo ;

	    	var funs = null;
	    	//if((typeof(window[actionsYes]) == 'function')  ||  (typeof(window[actionsNo]) == 'function')){
	    	if((evalYes !== '')  ||  (evalNo !== '')){
	    		funs = function(result, el, ev) {
	    			if(result){
	    				//(typeof(window[actionsYes]) == 'function') ?  window[actionsYes]() : '' ;
	    				eval( evalYes );
	    			} else {
	    				//(typeof(window[actionsNo])  == 'function') ?  window[actionsNo]()  : '' ;
	    				eval( evalNo );
	    			}
	    		}
	    	}
	    	
			var configs = {
				title:    title,
				message:  msg,
				id: 	  id,
				size:     size, // full | large | small
				labelYes: labelYes,
				labelNo:  labelNo
			}
	    	var myModal = FLUIGC.message.confirm(configs, funs);
	    	return myModal;
	    }
    }
}

MyMints.prototype.custom = {
	replaceSqlInjection: function(str){
		return str.replace(/[\\\-\\\;\\\=\\\'\\\"\\<\\>=]/gi, '');
	},
	md5: function(s){
		function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()
	},
	createInputs: function(arrInputs){
		(_global.debug) ?  console.log('AQUI!!!<br><br> '  + JSON.stringify(arrInputs)) : '' ;
		var strHtml = '';
		var acts	= {
			form: 		false,
			formGroup: 	false,
			table: 		false,
			nav: 		false,
			collapse: 	false,
			div: 		false
		};
		
		for(var y=0; y < arrInputs.length; y++){
			var item = arrInputs[y];
			if(item !== undefined){
				if(item.obj == 'form'){
					strHtml += (acts['div']) 	  ?  '</div>'   : '' ;
					strHtml += (acts['formGroup'])?  '</div>'   : '' ;
					strHtml += (acts['table']) 	  ?  '</table>' : '' ;
					strHtml += (acts['collapse']) ?  '</div>'   : '' ;
					strHtml += (acts['nav']) 	  ?  '</div>'   : '' ;
					strHtml += (acts['table']) 	  ?  '</table>' : '' ;
					strHtml += (acts['form']) 	  ?  '</form>'  : '' ;
					
					item.id   		= (item.id   		=== undefined  ||  item.id 			=== null) ? '' 		: item.id ;
					item.size 		= (item.size 		=== undefined  ||  item.size 		=== null) ? '' 		: item.size ;
					item.preSize 	= (item.preSize 	=== undefined  ||  item.preSize 	=== null) ? '' 		: item.preSize ;
					item.autocLose 	= (item.autocLose	=== undefined  ||  item.autocLose 	=== null) ? false 	: item.autocLose ;
					item.action 	= (item.action		=== undefined  ||  item.action 		=== null) ? true 	: item.action ;
					item.itens 		= (item.itens		=== undefined  ||  item.itens 		=== null) ? {} 	: item.itens ;
					
					item.size = (item.preSize != '') ?  (item.size + '-' + item.preSize)  :  item.size  ;
					
					strHtml += this.createHtml[item.obj](item.id, item.size, item.autocLose, item.action, item.itens);
					acts['form'] = true;
					
				} else if((item.obj == 'formgroup') || (item.obj == 'nav') || (item.obj == 'collapse') || (item.obj == 'div')){
//						strHtml += (acts['div']) 	  ?  '</div>'  : '' ;
					strHtml += (acts['formGroup'])?  '</div>'  : '' ;
//						strHtml += (acts['table']) 	  ?  '</table>': '' ;
					strHtml += (acts['collapse']) ?  '</div>'  : '' ;
					strHtml += (acts['nav']) 	  ?  '</div>'  : '' ;

					item.id   		= (item.id   		=== undefined  ||  item.id 			=== null) ? '' 		: item.id ;
					item.size 		= (item.size 		=== undefined  ||  item.size 		=== null) ? '' 		: item.size ;
					item.preSize 	= (item.preSize 	=== undefined  ||  item.preSize 	=== null) ? '' 		: item.preSize ;
					item.autocLose 	= (item.autocLose	=== undefined  ||  item.autocLose 	=== null) ? false 	: item.autocLose ;
					item.dataType	= (item.dataType	=== undefined  ||  item.dataType	=== null) ? ''		: item.dataType ;
					item.addclass	= (item.addclass	=== undefined  ||  item.addclass	=== null) ? ''		: item.addclass ;
					item.attrs	 	= (item.attrs    	=== undefined  ||  item.attrs	 	=== null) ? '' 		: item.attrs ;
					item.itens 		= (item.itens		=== undefined  ||  item.itens 		=== null) ? false 	: item.itens ;
					item.itensclass = (item.itensclass	=== undefined  ||  item.itensclass 	=== null) ? '' 		: item.itensclass ;
					item.prefixheading 	= (item.prefixheading	=== undefined  ||  item.prefixheading 	=== null) ? '' 	: item.prefixheading ;
					item.prefixbody		= (item.prefixbody		=== undefined  ||  item.prefixbody 		=== null) ? '' 	: item.prefixbody ;
					
					item.size = (item.preSize != '') ?  (item.size + '-' + item.preSize)  :  item.size  ;
					
					if(item.obj == 'div'){
						//strHtml   += this.createHtml[item.obj](item.id, item.size, item.autocLose, item.itens);							
						strHtml   	+= this.createHtml[item.obj](item.id, item.size, item.autocLose, item.dataType, item.attrs, item.addclass, item.itens, item.itensclass);
						
					} else if(item.obj == 'collapse'){
						strHtml   	+= this.createHtml[item.obj](item.id, item.size, item.autocLose, item.itens, item.prefixheading, item.prefixbody);
						
					} else {
						strHtml   	+= this.createHtml[item.obj](item.id, item.size, item.autocLose, item.itens);
					}

					acts['formGroup'] = true;
					
				} else if(item.obj == 'table'){
					strHtml += (acts['div']) 	   ?  '</div>'  : '' ;
					strHtml += (acts['formGroup']) ?  '</div>'   : '' ;
					strHtml += (acts['table']) 	   ?  '</table>' : '' ;

					item.id   		= (item.id   		=== undefined  ||  item.id 			=== null) ? '' 		: item.id ;
					item.size 		= (item.size 		=== undefined  ||  item.size 		=== null) ? '' 		: item.size ;
					item.preSize 	= (item.preSize 	=== undefined  ||  item.preSize 	=== null) ? '' 		: item.preSize ;
					item.autocLose 	= (item.autocLose	=== undefined  ||  item.autocLose 	=== null) ? false 	: item.autocLose ;
					item.columns 	= (item.columns		=== undefined  ||  item.columns 	=== null) ? [] 		: item.columns ;
					item.remove 	= (item.remove		=== undefined  ||  item.remove 		=== null) ? '' 		: item.remove ;
					item.order 		= (item.order		=== undefined  ||  item.order 		=== null) ? '' 		: item.order ;
					item.idadd 		= (item.idadd		=== undefined  ||  item.idadd 		=== null) ? '' 		: item.idadd ;
					item.textadd 	= (item.textadd		=== undefined  ||  item.textadd 	=== null) ? '' 		: item.textadd ;
					item.classadd 	= (item.classadd	=== undefined  ||  item.classadd 	=== null) ? '' 		: item.classadd ;
					
					item.size = (item.preSize != '') ?  (item.size + '-' + item.preSize)  :  item.size  ;
					
					strHtml  += this.createHtml[item.obj](item.id, item.size, item.autocLose, item.columns, item.remove, item.order, item.idadd, item.textadd, item.classadd);
					acts['table'] = true;

				//} else if(item.obj !== ''  ||  item.obj !== undefined  ||  item.obj !== null) {
				} else if(item.obj !== ''  &&  item.obj !== undefined  &&  item.obj !== null) {
					
					item.id 		= (item.id 		 	=== undefined  ||  item.id 			=== null) ? '' 		: item.id ;
					item.text 		= (item.text 		=== undefined  ||  item.text 		=== null) ? '' 		: item.text ;
					item.size 		= (item.size 	 	=== undefined  ||  item.size 		=== null) ? '12' 	: item.size ;
					item.preSize 	= (item.preSize 	=== undefined  ||  item.preSize 	=== null) ? '' 		: item.preSize ;
					item.required 	= (item.required	=== undefined  ||  item.required 	=== null) ? false 	: item.required ;
					item.readonly 	= (item.readonly 	=== undefined  ||  item.readonly 	=== null) ? false 	: item.readonly ;
					item.value 		= (item.value 	 	=== undefined  ||  item.value 		=== null) ? '' 		: item.value ;
					item.relValue 	= (item.relValue 	=== undefined  ||  item.relValue 	=== null) ? '' 		: item.relValue ;
					item.type 		= (item.type 	 	=== undefined  ||  item.type 		=== null) ? 'text' 	: item.type ;
					item.options 	= (item.options  	=== undefined  ||  item.options 	=== null) ? {} 		: item.options ;
					item.dataOptions= (item.dataOptions === undefined  ||  item.dataOptions === null) ? false 	: item.dataOptions ;
					item.configs 	= (item.configs  	=== undefined  ||  item.configs 	=== null) ? {} 		: item.configs ;
					item.autocLose 	= (item.autocLose	=== undefined  ||  item.autocLose 	=== null) ? true 	: item.autocLose ;
					item.rows 		= (item.rows	 	=== undefined  ||  item.rows	 	=== null) ? ''	 	: item.rows ;
					item.mask		= (item.mask		=== undefined  ||  item.mask		=== null) ? ''	 	: item.mask ;
					item.placeholder= (item.placeholder	=== undefined  ||  item.placeholder	=== null) ? ''	 	: item.placeholder ;
					item.maxlength	= (item.maxlength	=== undefined  ||  item.maxlength	=== null) ? '100'	: item.maxlength ;
					item.multiple	= (item.multiple	=== undefined  ||  item.multiple	=== null) ? false	: item.multiple ;
					item.onblur	 	= (item.onblur		=== undefined  ||  item.onblur	 	=== null) ? ''		: item.onblur ;
					item.onclick	= (item.onclick		=== undefined  ||  item.onclick	 	=== null) ? ''		: item.onclick ;
					item.addclass	= (item.addclass	=== undefined  ||  item.addclass	=== null) ? ''		: item.addclass ;
					item.divclass	= (item.divclass	=== undefined  ||  item.divclass	=== null) ? ''		: item.divclass ;
					item.display	= (item.display		=== undefined  ||  item.display		=== null) ? true	: item.display ;
					item.div	 	= (item.div		 	=== undefined  ||  item.div	 		=== null) ? ((item.obj == 'label') ? false : true )	: item.div ;
					item.attrs	 	= (item.attrs    	=== undefined  ||  item.attrs	 	=== null) ? '' 		: item.attrs ;
					var attrs = '';
					attrs += (item.value 		!= '') 	? ' value="' + 			item.value 			+ '" ' : '' ;
					attrs += (item.relValue 	!= '') 	? ' data-rel-value="' + item.relValue 		+ '" ' : '' ;
					attrs += (item.text 		!= '') 	? ' data-label="' + 	item.text 			+ '" ' : '' ;
					attrs += (item.mask		 	!= '') 	? ' mask="' + 			item.mask		 	+ '" ' : '' ;
					attrs += (item.placeholder 	!= '') 	? ' placeholder="' + 	item.placeholder 	+ '" ' : '' ;
					attrs += (item.maxlength 	!= '')  ? ' maxlength="' + 		item.maxlength 		+ '" ' : '' ;
					attrs += (item.onblur 		!= '') 	? ' onblur="' + 		item.onblur 		+ '" ' : '' ;
					attrs += (item.onclick 		!= '') 	? ' placeholder="' + 	item.onclick 		+ '" ' : '' ;
					attrs += (item.display 	 == false) 	? ' style="display:none;" ' : '' ;
					
					item.size = (item.preSize != '') ?  (item.size + '-' + item.preSize)  :  item.size  ;
										
					var aux  = '';
					switch( item.obj ){
						case 'input':
							aux  = item.type;
							break;
						case 'radio':
						case 'table':
						case 'zoom':
							aux = item.configs;
							break;
						case 'textarea':
						case 'label':
						case 'checkbox':
						case 'date':
						case 'label':
						case 'button':
							if(item.obj == 'textarea'){
								attrs += (item.rows != '') 		? ' rows="' + 	item.rows			+ '" ' : '' ;								
								attrs += ' data-size="small" ';
								
							} else if(item.obj == 'date'){
								if(attrs == ''){
									attrs += ' data-date=""  mask="00/00/0000"  placeholder="__/__/____" ';
								}								
							} else if(item.obj == 'button'){
								item.addclass = ' btn btn-default ' + item.addclass;
							}
							aux = item.autocLose;
							break;
						case 'select':
						case 'yesno':
						case 'radio':
							if(item.obj == 'select'){
								attrs += (item.multiple != '') 	? ' multiple="' + 	item.multiple 	+ '" ' : '' ;
								
							} else if(item.obj == 'yesno'){
								attrs += ' data-on-color="success" data-off-color="danger" data-size="small" ';
							}
							aux = item.options
							break;
						default:
							aux = '';
					}
					
//						if(acts['table']){
//							var auxSize = item.size;
//							item.size 	= '';
//						}
							
					item.attrs += attrs;
					var auxParans = [item.id, item.text, item.size, item.required, item.readonly, item.attrs, item.addclass, item.div];
					auxParans.push(aux);
					
					
					if( item.obj == 'select' ){
						auxParans.push( item.dataOptions );
						
					} else if( item.obj == 'input' ){
						auxParans.push( item.divclass );
					}
					
					if(this.createHtml[item.obj] !== undefined){
						if( item.obj == 'select'  ||  item.obj == 'input' ){
							item.html = this.createHtml[item.obj]( auxParans[0], auxParans[1], auxParans[2], auxParans[3], auxParans[4], auxParans[5], auxParans[6], auxParans[7], auxParans[8], auxParans[9] );
						} else {
							item.html = this.createHtml[item.obj]( auxParans[0], auxParans[1], auxParans[2], auxParans[3], auxParans[4], auxParans[5], auxParans[6], auxParans[7], auxParans[8] );
						}

//							if(acts['table']  && (item.type != 'hidden')){
//								item.html = '' +
//								'<td class="fs-v-align-middle ' + auxSize + '">' +
//								'	' + item.html + 
//								'</td>';
//							}
						strHtml += item.html
						
					} else {
						(_global.debug) ?  strHtml += '-> NÃƒO EXISTE: ' + item.obj : '' ;
					}
				}
			} else {
				(_global.debug) ?  strHtml += '-> ITEM INEXISTENTE: ' + y : '';
			}
		}

		// Fechando tags agregadoras
		strHtml += (acts['div']) 	  ?  '</div>'   : '' ;
		strHtml += (acts['formGroup'])?  '</div>'   : '' ;
		strHtml += (acts['table']) 	  ?  '</table>' : '' ;
		strHtml += (acts['collapse']) ?  '</div>'   : '' ;
		strHtml += (acts['nav']) 	  ?  '</div>'   : '' ;
		strHtml += (acts['table']) 	  ?  '</table>' : '' ;
		strHtml += (acts['form']) 	  ?  '</form>'  : '' ;
		
		return strHtml;
	},
	setDirectInputs: function(objInputs){
		for(var idInput in objInputs) {
			$('#' + idInput).val( objInputs[idInput] );
		}
	},
	setDatasetInputs: function(model, arrInputs){
		for(var n=0; n < filter.length; n++){
			
		}
	},
	createHtml: {
		size: 		function(n, all){
			if(n !== ''){
				var fullSize = '12';
				var size 	 = (n === undefined  ||  n === null) ? fullSize : n;
				var strSize  = '';
				
				if(size.toString().indexOf('-') > -1){
					var arrSize = size.split('-');
					size	= arrSize[0];
					preSize = arrSize[1];
					strSize += 'col-lg-offset-' + preSize + '  col-md-offset-' + preSize + ' ';
					strSize += 'col-lg-' + size + ' col-md-' + size + ' ';
				} else {
					strSize += 'col-lg-' + size + ' col-md-' + size + ' ';
				}
				
				if(all){
					strSize += 'col-sm-' + size + ' col-xs-' + size + '';
				} else {
					strSize += 'col-sm-6  col-xs-12';
				}
				
				return strSize;
			}
		},
		alert: 		function(msg, type, size){
			size 	 = (size !== undefined  &&  size != '') ?  this.size( size ) : '' ;
			(type == ''  ||  type === undefined) ? type = 'danger' : '' ;
			
			var aux = '' +
			'	<button type="button" class="close" data-dismiss="alert">' +
			'		<span aria-hidden="true">Ã—</span>' +
			'		<span class="sr-only">Fechar</span>' +
			'	</button>' +
			'	<font>' + msg + '</font>';
			aux = (this.div('', size, false, '', ' role="alert" ', ' paragraph-is-required  text-center  alert alert-' + type + ' alert-dismissible text-left ') + aux + '</div>');
			return aux;
		},
		msg: 		function(title, msg, size){
			size 	 = (size !== undefined  &&  size != '') ?  this.size( size ) : '' ;
			
			var aux = '' +
			'	<h4><strong>' + title + '</strong></h4>' +
			'	<p>'  + msg   + '</p>';
			aux = (this.div('', size, false, '', '', '', ' clearfix   well well-lg ') + aux + '</div>');
			return aux;
		},
		form: 		function(id, size, autoClose, action, itens){
			id 		= (id   !== '') ?  ' name="' + id + '" id="' + id + '"   ' : '' ;
			size 	= (size !== '') ?  this.size( size ) : '' ;
			
			if(itens !== undefined){
				var auxHtml = window[_global.objVars.mints].custom.createInputs( itens );
			} else {
				var auxHtml = '';
			}
			
			var aux = '<form  ' + id + '  action="' + action + '"  class="' + size + ' form-horizontal totvs-form grid vertical create-form-components ui-sortable t5" role="form" >';
			aux += auxHtml + ((autoClose) ? '</form>' : '' );
			return aux;
		},
		formgroup:  function(id, size, autoClose, itens){
			id 		= (id   !== '') ?  ' name="' + id + '" id="' + id + '"   ' : '' ;
			size 	= (size !== '') ?  this.size( size ) : '' ;

			if(itens !== undefined){
				var auxHtml = window[_global.objVars.mints].custom.createInputs( itens );
			} else {
				var auxHtml = '';
			}
			
			var aux = ' <div  ' + id + '  class="form-group fs-clearfix ' + size + '">';
			aux += auxHtml + ((autoClose) ? '</div>' : '' );
			return aux;
		},
		menu: 		function(id, size, autoClose, itens){
		},
		megaMenu: 	function(id, size, autoClose, itens){
		},
		nav: 		function(id, size, autoClose, itens){
		},
		collapse: 	function(id, size, autoClose, itens, prefixHeading, prefixBody){
		},
		table:  	function(id, size, autoClose, columns, remove, order, idAdd, textAdd, classadd){
				
			var k = 0;
			var auxColumns 	= '';
			var auxHtml 	= '';
			var auxHtmlHide	= '';
			var td = false;
			for(var k=0; k < columns.length; k++){
				if(columns[k].obj !== undefined){
					if(columns[k].type == 'hidden'){
						auxHtmlHide += window[_global.objVars.mints].custom.createInputs( [ columns[k] ] );
						td = false;
					} else {
						var textColum = (columns[k].columname === undefined) ? ''   : columns[k].columname ;
						var columsize = (columns[k].columsize === undefined) ? '12' : columns[k].columsize ;
						var auxSize   = this.size( columsize );
						
						auxColumns += '<th class="tableColumn">' + textColum + '</th>'
						
						auxHtml += (td) ? '</td>' : '' ;
						auxHtml += '<td  class="fs-v-align-middle ' + auxSize + '">';
						td = true;
						
						auxHtml 	+= window[_global.objVars.mints].custom.createInputs( [ columns[k] ] );
					}
				}
			}
			
			var htmlFirstColum 	= '<td class="bpm-mobile-trash-column"><div class="hidden-inputs">' + auxHtmlHide + '</div>';
			var auxHtmlOrder	= '';
			if(order === true){
				auxHtmlOrder = '' +
					'<div class="col-lg-2  col-md-2  col-sm-2  col-xs-12"  style="padding-top:7px">' + 
					'	<label  name="contador" id="contador"  class="control-label" value="">0</label>' + 
					'</div>';
			}
			htmlFirstColum += auxHtmlOrder;
			var auxHtmlRemove 	= '';
			if(remove !== undefined  &&  remove !== ''){
				auxHtmlRemove += '' +
				'<div class="col-lg-8  col-md-8  col-sm-8  col-xs-12" >' +
					'<span class="fluig-style-guide fs-display-block fs-xs-space">' +
					'	<i class="fluigicon fluigicon-trash fluigicon-md" onclick="Javascript:' + remove + '" style="cursor:pointer"></i>'+
					'</span>'+
				'</div>';
			}
			htmlFirstColum += auxHtmlRemove;
			htmlFirstColum += '</td>';


			var htmlLastColum = '';
			
			
			if(order === true){
				auxColumns 	= '' +
					'<th >' +
					'	<div class="col-lg-2  col-md-2  col-sm-2  col-xs-12">NÂº</div>' +
					'	<div class="col-lg-10 col-md-10 col-sm-10 col-xs-12"> </div>' +
					'</th>' + auxColumns;
			} else {
				auxColumns 	= '<th></th>' + auxColumns;
			}				
			auxHtml = htmlFirstColum + auxHtml + htmlLastColum;
			
			
			
			//auxHtml += window[_global.objVars.mints].custom.createInputs( columns );
//console.log(auxHtml);

			var aux = '' +
//				'<div class="form-field" data-type="tabledetail" data-show-properties="" data-field-name="' + id + '">' +
				'	<div class="form-input">' +
				'		<div class="table-responsive">' +
				'			<table tablename="' + id + '"  id="' + id + '" class="table table-condensed table-hover" onRemoveRow="' + remove + '" noAddButton="false" noDeleteButton="true" noOrder="true">' +
				'				<thead>' +
				'					<tr class="tableHeadRow" >' +
				'						' + auxColumns +
				'					</tr>' +
				'				</thead>' +
				'				<tbody>' +
				'					<tr class="tableBodyRow"  data-order="0"  style="display:none;" >' +
				'						' + auxHtml +
				'					</tr>' +
				'				</tbody>' +
				'			</table>' +
				'		</div>';
			if((idAdd != '')  &&  (idAdd !== undefined)){
				aux += '' + this.button(idAdd, textAdd, '12', '', '', '', 'btn btn-default form-control ' + classadd, true, true);
			}
			aux += '' +
			'	</div>';
//				'</div>';
			
			size 	= (size !== undefined  &&  size !== '') ?  this.size( size ) : '' ;
			aux = (this.div('', size, false, 'tabledetail', ' data-show-properties="" data-field-name="' + id + '" ', 'form-field') + aux + '</div>');
			return aux;
		},
		div: 		function(id, size, autoClose, dataType, attrs, addclass, itens, itensclass){
			id 		 = (id 		 !== undefined  &&  id   !== '') ?  ' name="' + id + '" id="' + id + '"   ' : '' ;
			size 	 = (size 	 !== undefined  &&  size != '')  ?  this.size( size ) : '' ;
			dataType = (dataType === undefined) ? 	'' 			: dataType ;
			dataType = (dataType == 'text') 	? 	'textbox' 	: dataType ;
			dataType = (dataType != '') 		? 	' data-type="' + dataType + '" ' : '' ;
			attrs 	 = (attrs 	 === undefined) ? 	'' 			: attrs ;
			addclass = (addclass === undefined) ? 	'' 			: addclass ;
			itensclass = (itensclass === undefined) ? 'form-horizontal' : itensclass ;
			
			var k = 0;
			var auxHtml 	= '';
			var auxHtmlHide	= '';
			if(itens !== undefined){
				for(var k=0; k < itens.length; k++){
					if(itens[k].obj !== undefined){
						if(itens[k].type == 'hidden'){
							auxHtmlHide += window[_global.objVars.mints].custom.createInputs( [ itens[k] ] );
						} else {
							auxHtml 	+= window[_global.objVars.mints].custom.createInputs( [ itens[k] ] );
						}
					}
				}
				auxHtml		= (auxHtml 		!= '') ?  '<div class="' + itensclass + '" role="form">' + auxHtml + '</div>'  : '' ;
				auxHtmlHide	= (auxHtmlHide 	!= '') ?  '<div class="hidden-inputs">' + auxHtmlHide + '</div>'  : '' ;
			}
			
			//var aux  = '<div  ' + id + '  class="' + size + ' ' + addclass + '"  ' + dataType + '   ' + attrs + '>' + ((autoClose) ? '</div>' : '' );
			var aux  = '<div  ' + id + '  class="' + size + ' ' + addclass + '"  ' + dataType + '   ' + attrs + '>' + auxHtmlHide + auxHtml + ((autoClose) ? '</div>' : '' );
			return aux;
		},
		input: 		function(id, text, size, required, readonly, attrs, addclass, div, type, divclass){
			id 		= (id   !== '') ?  ' name="' + id + '" id="' + id + '"   ' : '' ;
			var auxRequired = (required) ? ' required="' + required + '" ' : '' ;
			var auxReadonly = (readonly) ? ' readonly="' + readonly + '" ' : '' ;
			var auxClass 	= (type == 'checkbox'  ||  type == 'radio') ? '' : 'form-control' ;
			auxClass 		= ' class="' + auxClass + ' ' + addclass + '" ';
			var aux = (text != '') ? this.label('', text, null, required, null, '', '', false, true) : '' ;
			aux 	= aux + '<input ' + id + '  type="' + type + '"  ' + auxRequired + '  ' + auxClass + '  ' + auxReadonly + '  ' + attrs + ' />';
			aux 	= (div) ? (this.div('', size, false, type, '', divclass) + aux + '</div>') : aux ;
			return aux;
		},
		select: 	function(id, text, size, required, readonly, attrs, addclass, div, options, dataOptions){
			id 		= (id   !== '') ?  ' name="' + id + '" id="' + id + '"   ' : '' ;
			var auxRequired = (required) ? ' required="' + required + '" ' : '' ;
			var auxReadonly = (readonly) ? ' readonly="' + readonly + '" ' : '' ;
//				var auxOptions = '<option value="">Selecione...</option>';
//				if(dataOptions){
//					for(var op in options){
//						auxOptions += '<option value="' + op + '" ';
//						for(var k=0; k < options[op].length; k++){
//							if(k > 0){
//								var props = options[op];
//								auxOptions += '  ' + Object.keys(props)[k] + '="' + props[Object.keys(props)[k]] +'"  ';
//							}
//						}
//						auxOptions += '>' + options[op][0] + '</option>';
//					}
//				} else {
//					for(var op in options){
//						auxOptions += '<option value="' + op + '">' + options[op] + '</option>';
//					}
//				}
			dataOptions = (dataOptions === undefined) ?  false : dataOptions ;
			var auxOptions = window[_global.objVars.mints].custom.document.createSelectOptions(options, dataOptions);
			
			var aux =  (text != '') ? this.label('', text, null, required, null, '', '', false, true) : '' ;
			aux 	+= '<select ' + id + '  class="form-control ' + addclass + '"  ' + auxRequired + '  ' + auxReadonly + '  ' + attrs + '>'; 
			aux 	+= auxOptions + '</select>';
			aux 	=  (div) ? (this.div('', size, false, 'select', '') + aux + '</div>') : aux ;
			return aux;
		},
		checkbox: 	function(id, text, size, required, readonly, attrs, addclass, div, autoClose){
			var aux = '<label>' + (this.input(id, '', size, required, readonly, attrs, '', false, 'checkbox') + '  ' + text + ' ' + this.required( required )) + '</label><br/>';
			aux = '<div  class="checkbox ' + addclass + '">' + aux + '</div>';
			aux = (div) ? (this.div('', size, false, 'textbox',  'data-show-properties="" data-field-name="' + id + '" ', '') + aux + '</div>') : aux ;
			return aux;
		},
		yesno: 		function(id, text, size, required, readonly, attrs, addclass, div, options){
			attrs += (attrs.indexOf('value') == -1) ? ' value="nao"  ' : '' ;
			var aux = (this.checkbox(id, text, size, required, readonly, attrs, addclass, div));
			return aux;
		},
		radio: 		function(id, text, size, required, readonly, attrs, addclass, div, options){
			var k = 0;
			var auxOptions = '';
			for(var op in options) {
				attrs = ' value="' + op + '" ';
				auxOptions += '<label>' + (this.input(id, '', size, required, readonly, attrs, '', false, 'radio')) + ' ' + options[op] + '</label><br/>';
				auxOptions = auxOptions.replace('id="' + id + '"', 'id="' + id + k + '"');
				k++;
			}
			var aux = (text != '') ? this.label('', text, null, required, null, '', '', false, true) : '' ;
			aux += '<div  class="radio ' + addclass + '">' + auxOptions + '</div>';
			aux = (div) ? (this.div('', size, false, 'radio', '', '') + aux + '</div>') : aux ;
			return aux;
		},
		textarea: 	function(id, text, size, required, readonly, attrs, addclass, div, autoClose){
			id 		= (id   !== '') ?  ' name="' + id + '" id="' + id + '"   ' : '' ;
			var aux = (text != '') ? this.label('', text, null, required, null, '', '', false, true) : '' ;
			aux += '<textarea  ' + id + '   class="form-control ' + addclass + '"   ' + attrs + '>' + ((autoClose) ? '</textarea>' : '' );
			aux = (div) ? (this.div('', size, false, 'textbox',  'data-show-properties="" data-field-name="' + id + '" ', '') + aux + '</div>') : aux ;
			return aux;
		},
		zoom: 		function(id, text, size, required, readonly, attrs, addclass, div, configs){
			attrs += ' dataset="' + 	 configs['dataset'] + '" ' +
					 ' datasetvalue="' + configs['datasetvalue'] + '" ' +
					 ' data-zoom="' + 	 JSON.stringify(configs['datazoom']) + '" ';
			
			var aux = '' +
			'<div class="form-field ' + addclass + '" data-type="zoomfield" data-show-properties="" data-field-name="' + id + '">' +
			'	<div class="form-input">'+
			'		' + (this.input(id, text, size, required, readonly, attrs, '', false, 'zoom')).replace('/>', '/><div class="input-group-addon zoom-preview"><span class="fluigicon fluigicon-zoom-in"></span></div>') +
			'	</div>' +
			'</div>';
			aux = (div) ? (this.div('', size, false, 'zoomfield',  'data-show-properties="" data-field-name="' + id + '" ', '') + aux + '</div>') : aux ;
			return aux;
		},
		date:		function(id, text, size, required, readonly, attrs, addclass, div, autoClose){
			var auxId = (id   !== '') ?  ' name="' + id + '" id="' + id + '"   ' : '' ;
			var aux = (text != '') ? this.label('', text, null, required, null, '', '', false, true) : '' ;
			aux += '' +
			'<div id="div' + id + '" class="input-group date ' + addclass + '" >' +
//				'	<input  ' + auxId + '  type="text"  class="form-control date"  data-date=""  mask="00/00/0000"  placeholder="__/__/____" />' +
			'	' + (this.input(auxId, '', size, required, readonly, attrs, ' date', false, 'text')).replace('/>', '/><span class="input-group-addon"><span class="fluigicon fluigicon-calendar"></span></span>') +
			'</div>';
			aux = (div) ? (this.div('', size, false, 'date',  'data-show-properties="" data-field-name="' + id + '" ', '') + aux + '</div>') : aux ;
			return aux;
		},
		button:		function(id, text, size, required, readonly, attrs, addclass, div, autoClose){
			id 		= (id   !== '') ?  ' name="' + id + '" id="' + id + '"   ' : '' ;
			size 	= (size !== '') ?  this.size( size ) : '' ;
			var aux = ((autoClose) ? '</button>' : '' );
			aux = '<button  ' + id + '  type="button" class="' + size + ' ' + addclass + '"  ' + attrs + '>' + text + aux;
			aux = (div) ? (this.div('', false, '', '') + aux + '</div>') : aux ;
			return aux;
		},
		label: 		function(id, text, size, required, readonly, attrs, addclass, div, autoClose){
			var aux = this.required( required ) + ((autoClose) ? '</label>' : '' );
			aux = '<label for="' + id + '" class="control-label ' + addclass + '" >' + text + aux;
			aux = (div) ? (this.div('', size, false, 'label', '') + aux + '</div>') : aux ;
			return aux;
		},
		required: 	function(required){
			return ( (required) ? '<span class="required text-danger"><strong> *</strong></span>' : '' );
		}
	},
	dataset: {
		get: function(dataset, fields, constraints, order){
			
			var aux  = null;
			var data = DatasetPublic.getDataset(dataset, fields, constraints, order);
			if(DatasetPublic.validateReturn(data)){
				//if(data.values[0]['return'] !== ''){
				if(data.rowsCount > 0){
					aux = data;
				} else {
					aux = null;
				}
			} else {
				aux = null;
			}
			return aux;
		},	
		set: function(dataset, model, dataObj){
			return true;
		},	
		getSelect: function(dataset, filter, fields, order, attrs){
			
			var itens = new Object();
			if(typeof(DatasetPublic) != 'undefined'){
				var constraints = new Array();
				filter 	= (filter === undefined  ||  filter === null  ||  filter === '') ? null : filter.split(',') ;
				if(filter !== null){
					for(var n=0; n < filter.length; n++){
						if(n%2 == 0){
							//var cn = DatasetPublic.createConstraint(filter[n], filter[n + 1], null, ConstraintTypePublic.MUST);
							var cn = DatasetFactory.createConstraint(filter[n], filter[n + 1], null, ConstraintTypePublic.MUST);
							constraints.push( cn );
						}
					}
				}
				fields 	= (fields === undefined   ||  fields === null   ||  fields === '') ? null : fields.split(',') ;
				order 	= (order  === undefined   ||  order  === null   ||  order  === '') ? null : order.split(',') ;
				attrs 	= (attrs  === undefined   ||  attrs  === null   ||  attrs  === '') ? null : attrs.split(',') ;
				
				var data = this.get(dataset, fields, constraints, order);
				if((data !== null)  &&  (fields !== null)){
					
					for(var i=0; i < data.rowsCount; i++){
						if(attrs !== null){
							//itens[ data.values[i][ fields[0] ] ][ fields[1] ] =  data.values[i][ fields[1] ];
							itens[ data.values[i][ fields[0] ] ] =  [ data.values[i][ fields[1] ] ];
							
							var r = 1;
							for(var n=0; n < attrs.length; n++){
								if(n%2 == 0){
									//itens[ data.values[i][ fields[0] ] ][ attrs[n] ] =  data.values[i][ attrs[n + 1] ];
									var auxAttr = attrs[n];
									itens[ data.values[i][ fields[0] ] ][r] = new Object();
									itens[ data.values[i][ fields[0] ] ][r][ auxAttr ] =  data.values[i][ attrs[n + 1] ];
									r++;
								}
							}
						} else {
							itens[ data.values[i][ fields[0] ] ] = data.values[i][ fields[1] ];
						}
					}
				} else {
					itens = {};
				}
			} else {
				itens = {};
			}
			
			return itens;
		}	
	},
	document: {
		isMobile:		function(userAgent){
			userAgent = (userAgent === undefined  ||  userAgent === null) ? navigator.userAgent.toLowerCase() : userAgent ;
			if( userAgent.search(/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i)!= -1 ){
				return true;
			} else {
				return false;
			}
		},
		redirectPage: 	function(link){
			location.href = link;
		},
		setHideInputs:  function(selector){
			// Oculta cabeÃ§alho do layout e inputs hide
			if(selector !== undefined){
				$(selector).hide();
			} else {
				$( _global.selectors['hide'] ).hide();
			}
		},
		setMask: function(selector, mask, reverse){
			// Define mascaras de campos
			if(selector !== undefined){
				(reverse === undefined) ? reverse = false : '';
				$(selector).mask(mask, {reverse: reverse});
			} else {
				var parans = new Object();
				for(var maskClass in _global.maskType) {
					(maskClass == 'cpf'  ||  maskClass == 'cnpj'  ||  maskClass == 'money') ?  parans = {reverse: true} : parans = {reverse: false}  ;
					(maskClass == 'email') ?  parans =  {translation: { "A": { pattern: /[\w@\-.+]/, recursive: true }	} } : ''  ;
					$('.' + maskClass).mask( _global.maskType[maskClass], parans);
				}
			}
		},
		msg: function(id, title, msg, append){
			(title !== undefined) ? title = '' : '' ;
			(msg   !== undefined) ? msg   = '' : '' ;
			(append === undefined) ? append = false : '' ;
			
			var html = window[_global.objVars.mints].custom.createHtml.msg(title, msg);
			renderCustomIdHTML(id, html, append);
			
			$('#' + id).fadeIn('slow');
		},
		alert: function(id, msg, type, append){
			if(msg !== undefined){
				(append === undefined) ? append = false : '' ;
				
				var html = window[_global.objVars.mints].custom.createHtml.alert(msg, type);
				renderCustomHTML('#' + id, html, append);
				
				$('#' + id).fadeIn('slow');
			} else {
				$('#' + id).fadeOut('fast');			
			}
		},
		setLinkSelect: function(selectId, options, clearIds, dataOptions){
			
			var auxOptions = this.createSelectOptions(options, dataOptions);
			
			$('#' + selectId).html( auxOptions );
			$(clearIds).val( '' );
		},
		setLinkSelectUf: function(selectId, value, clearIds){
//				var auxOptions  = '<option value="">Selecione...</option>';
//				var options 	= window[_global.objVars.data].modelItens.MUNICIPIOS( value );
//				for(var op in options) {   auxOptions += '<option value="' + op + '">' + options[op] + '</option>'; }
//				$('#' + selectId).html( auxOptions );
//				$(clearIds).val( '' );
			var options = window[_global.objVars.data].modelItens.MUNICIPIOS( value );
			this.setLinkSelect(selectId, options, clearIds)
		},
		createSelectOptions: function(options, dataOptions){
//				var auxOptions  = '<option value="">Selecione...</option>';
//				if(options === undefined){ var options = {}; }
//				for(var op in options) {
//					auxOptions += '<option value="' + op + '">' + options[op] + '</option>';
//				}
			
			//console.log('createSelectOptions: ', options, dataOptions);
			
			dataOptions = (dataOptions === undefined) ? false : dataOptions ;
			var auxOptions = '<option value="">Selecione...</option>';
			for(var op in options){
				if(dataOptions){
					auxOptions += '<option value="' + op + '" ';
					for(var k=0; k < options[op].length; k++){
						if(k > 0){
							var props = options[op][k];
							auxOptions += '  ' + Object.keys(props) + '="' + props[Object.keys(props)] + '"  ';
							//console.log(op, k, props, Object.keys(props), props[Object.keys(props)]);
						}
					}
					auxOptions += '>' + options[op][0] + '</option>';
				} else {
					auxOptions += '<option value="' + op + '">' + options[op] + '</option>';
				}
			}
			return auxOptions; 
		},
		orderSelect:	function(idSelect){
			var selectToSort = jQuery('#' + idSelect);
			var optionActual = selectToSort.val();
			selectToSort.html(selectToSort.children('option').sort(function (a, b) {
				//return a.text === b.text ? 0 : a.text < b.text ? -1 : 1;
				return ((a.text == 'Selecione...') ? -1 : ((a.text === b.text) ? 0 : ((a.text < b.text) ? -1 : 1 ) ) );
			})).val(optionActual);
		},
		time: {
			calcExec: function(func, ...parans){
			    // pega os argumentos a serem repassados
			    var args = Array.prototype.slice.call(arguments, 1);

			    // logo antes da execuÃ§Ã£o
			    var ini = performance.now();

			    // executa a funÃ§Ã£o passada, passando os argumentos se for o caso
			    //funcao.apply(null, args);
			    if(func !== undefined){
			    	(typeof(window[func]) == 'function') ?  window[func](...parans) : '' ;
			    }

			    // logo apÃ³s a execuÃ§Ã£o
			    return performance.now() - ini;
			}
		},
		delay: {
			loop: 	function(x, y) {
			    for(var i=x; i<(x + y); i++)  console.log('Loop: ', i);
			},
			sleep: function(milliseconds){
				var start = new Date().getTime();
				for(var i=0; i < 1e7; i++){
					if((new Date().getTime() - start) > milliseconds){
						break;
					}
				}
			}
		}
	}
}
