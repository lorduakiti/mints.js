console.log('%c [v.up.0.0.4] inits.js', 'color:gray');

var _global = new Object({
	debug: 		false,
	isWcm: 		true,
	isPublic: 	false,
	objVars: 	{},
	selectors: 	{},
	maskType: 	{},
	modal:		'',
	load:		'',
	autoClose:	false,
	numInterval: null,
	report: {
		companyId:	1,		
		publisher:	'fluig',
		publisherId:'9oo3zsl55zeeafqo1399984696827',  // fluig
		//userName:	'totvs',
		//password:	'!Totvs2016',
		userName:	'anonimo.sistemafaeg.com.br.1',
		userNameId:	'j0jwkiw2gvfpmmmc1487368938236',
		password:	'Ano@0217mo',
		fileName:	'Relatorio',
		file:		'',
		folderName:	'',
		folder:		'',
	},
	fluigAPI:  null
});

//_global.debug    = false;
//_global.isWcm    = true;
//_global.isPublic = false;

_global.objVars = {
	utils: 		'myUtils',
	mints: 		'myMints',
	functions: 	'myFuns',
	data: 		'myModelData',
	components: 'myApps'
}

if(_global.publicWcm){
	_global.selectors.hide = '#wcm_header, .debug, .hidden-inputs';
} else {
	_global.selectors.hide = '.wcm_title_widget, .debug, .hidden-inputs';
}

_global.maskType = {
	date:		'00/00/0000',
	time:		'00:00:00',
	date_time:	'00/00/0000 00:00:00',
	cep:		'00000-000',
	phone:		'0000-0000',
	phone_with_ddd: '(00) 0000-0000',
	phone_us:	'(000) 000-0000',
	tel:		'(00) 00000-0000',
	cel:		'(00) 00000-0000',
	cpf:		'000.000.000-00',
	cnpj:		'00.000.000/0000-00',
	money:		'000.000.000.000.000,00',
	email:		'A',
	mixed:		'AAA 000-S0S'
}
//var DatasetPublic = new Object();
//var ConstraintTypePublic = new Object();

if(top.WCMAPI == undefined){
	_global.fluigAPI = parentOBJ.WCMAPI;
} else{
	_global.fluigAPI = top.WCMAPI;
}


var _hostName = '';
var _hostType = '';
