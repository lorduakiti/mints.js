console.log('%c [v.up.0.0.2] public-dataset.js', 'color:gray');


var DatasetPublic = new Object();
DatasetPublic = {
	createConstraint: function(field, initVal, endVal, type){
		var constraints = {
		    _field :		field,
		    _initialValue:	initVal,
		    _finalValue : 	endVal,
		    _type:			type,
		    _likeSearch:	false
		}
		
		return constraints;
	},
	getDataset: function(datasetName, fields, constraints, order){
		(fields === undefined  		||  fields === null) 		? fields = [] : '' ;
		(order === undefined   		||  order === null)  		? order  = [] : '' ;
		(constraints === undefined  ||  constraints === null)  	? constraints  = [] : '' ;
		
		var dataset = new Object();
		dataset = {
				columns: 	[],
				values: 	[],
				rowsCount: 	0
		}

//		var api 	 = "/api/public/ecm/dataset/datasets";
//		var paramObj = { 
//			name: 		 datasetName,
//			fields: 	 fields, 
//			constraints: constraints, 
//			order: 		 order
//		};
//		
//		var returnAjax = requestAjax('POST', api, paramObj);
//		if(!returnAjax.error){
//			dataset.columns 	= returnAjax.data.content.columns;
//			dataset.values 		= returnAjax.data.content.values;
//			dataset.rowsCount 	= returnAjax.data.content.values.length;
//		}
		var returnDs = DatasetFactory.getDataset(datasetName, fields, constraints, order);
		if(returnDs.values.length > 0){
			dataset.columns 	= returnDs.columns;
			dataset.values 		= returnDs.values;
			dataset.rowsCount 	= returnDs.values.length;
		}
		
		return dataset;
	},
	validateReturn: function(dataset, returnType){

		var aux = false;
		if(dataset !== null){
			if(dataset.values.length > 0){
				aux = true
			}
		}
		
		return aux;
	}
}


var ConstraintTypePublic = {
	'FILTER': 	0, // Reconstroi os campos de filtro padrão.
	'MUST': 	1, // O valor informado precisa estar nos resultados. 
	'SHOULD': 	2, // O valor informado pode estar ou não nos resultados. 
	'MUST_NOT': 3, // O valor informado não pode estar nos resultados.
	'NULL': 	4, // Indica que todos os registros devem ser do tipo NULL.
	'ID': 		5, // Indica que todos os registros devem ser numéricos.
	'TEXT': 	6, // Indica que todos os registros devem ser numéricos.
	'DATE': 	7, // Indica que todos os registros devem ser do tipo data.
	'RANGE': 	8, // O valor deve estar entre o intervalo de dados.
	'CLAUSE': 	9, // Início ou Fim de uma cláusula de filtro.
	'WHERE': 	10 // Iclui a cláusula "AND" ou "OR" no filtro.
};







//var c9 = DatasetFactory.createConstraint("stateSequence",      stateSequence, 		stateSequence, 		ConstraintType.MUST); //Número da Atividade que sera movimentada
//var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9);
//var dataset = DatasetFactory.getDataset("saveAndSendTask", null, constraints, null);


////----- Teste GET
//var api 	= '/api/public/ecm/dataset/availableDatasets';
////var api 	= '/ecm/dataset/datasetStructure/dataset_loginEscolas';
//var type 	= 'GET';
//var paramObj 	= '';
//
////----- Teste POST
//
//var api 	= "/api/public/ecm/dataset/datasets";
//var type 	= 'POST';
///*
//var paramObj 	= { 
//"name" : "colleague",
//"fields" : ["colleagueName", "login"], 
//"constraints" : [{
//    "_field" :			"sqlLimit",
//    "_initialValue":	"10",
//    "_finalValue" : 	"10",
//    "_type":			1,
//    "_likeSearch":		false
//}], 
//"order" : ["colleagueName"] };
//*/
//
//var paramObj 	= { 
//"name" : "dataset_loginEscolas",
//"fields" : ["DS_RETORNO",  "return",   "login_user",   "login_key",   "login_password",   "hash"], 
//"constraints" : [
//		 {
//            "_field" :		"sqlLimit",
//            "_initialValue":	"1",
//            "_finalValue" : 	"1",
//            "_type":			1,
//            "_likeSearch":	false
//        },  {
//            "_field" :		"login_user",
//            "_initialValue":	"49.739.473/0001-02",
//            "_finalValue" : 	"1",
//            "_type":			1,
//            "_likeSearch":	false
//        },  {
//            "_field" :		"login_key",
//            "_initialValue":	"000000",
//            "_finalValue" : 	"1",
//            "_type":			1,
//            "_likeSearch":	false
//        },  {
//            "_field" :		"login_password",
//            "_initialValue":	"123456",
//            "_finalValue" : 	"1",
//            "_type":			1,
//            "_likeSearch":	false
//        }], 
//"order" : [] };
//
///*
//var paramObj 	= { 
//"name" : "rmSql_eduQtdStatus",
//"fields" : ["DS_RETORNO", "IDTURMADISC", "QTD_TOTAL", "QTD_STATUS_1", "QTD_STATUS_2", "QTD_STATUS_3"], 
//"constraints" : [
//		 {
//            "_field" :		"IDTURMADISC",
//            "_initialValue":	"666",
//            "_finalValue" : 	"1",
//            "_type":			1,
//            "_likeSearch":	false
//        }], 
//"order" : [] };
//*/
