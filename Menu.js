console.log('%c [v.up.0.0.1] Menu.js', 'color:gray');

function callBackMenu(idTarget){
	console.log('%c ' + arguments.callee.name, 'color:brown');
	
	
	$('#' + Menu.props.id.div.menu).find('a').on("click", function(event){
		
		$('#' + Menu.props.id.div.menu).find('a').parent('li').css({ 'font-weight': '' }).removeClass('active');
		$(this).parent('li').css({ 'font-weight': 'bold' }).addClass('active');
		
		var paramns = ""; 
		var id = $(this).attr('id');
		if(id !== undefined){
			var target = 'Home';
			switch( id ){
				case 'navPrincipal':
					target = 'Home';
					break;
//				case 'navEscola':
//					target = 'Escola';
//					break;
//				case 'navProfessores':
//					//target = 'Professor';
//					target = 'ListaProfessores';
//					break;
//				case 'navNovoTrabalho':
//					target  = 'Trabalho';
//					paramns = "'-1'";
//					break;
				case 'navListaTrabalhos':
					target = 'ListaTrabalhos';
					break;
//				case 'navListaDesclassificados':
//					target = 'ListaDesclassificados';
//					break;
//				case 'navListaErrosDigitacao':
//					target = 'ListaErrosDigitacao';
//					break;
//				case 'navAvaliadores':
//					target = 'Avaliadores';
//					break;
//				case 'navRelatorios':
//					target = 'Painel';
//					break;	
				case 'navRelatorioPreliminar':
					target = 'RelatorioPreliminar';
					break;
				case 'navRelatorioFinal':
					target = 'RelatorioFinal';
					break;
				case 'navRelatorios':
					target = 'Relatorios';
					break;
				case 'navCalculaMedias':
					target = 'CalculaMedias';
					break;
			    default:
			    	target = 'Home';
			}
			
			eval( "reloadCustomIdHTML('divApp', " + target + ", false, " + target + ".callBack(" + paramns + "));" );
		}
	});
	
//	$('#' + Menu.props.id.button.logout).on("click", function(event){
//		myMints.custom.document.redirectPage('http://' + _hostName + '/escolas');
//	});
	
	
	$('#' + idTarget).show();	
}


var Menu = {
	props: {
		target: 			'divMenu',
		id:		{
			div: {
				menu:		'divMenuCustomizado'
			},
			nav: {
				main: 		 'navPrincipal',
				cadastre: 	 'navEscola',
//				newworks: 	 'navNovoTrabalho',
				works: 		 'navListaTrabalhos',
//				disqualified:'navListaDesclassificados',
//				errors:  	 'navListaErrosDigitacao',
//				reports: 	 'navRelatorios',
				preReport: 	 'navRelatorioPreliminar',
				endReport: 	 'navRelatorioFinal',
				reports: 	 'navRelatorios',
				calculate: 	 'navCalculaMedias',
			},
			button: {
//				logout: 	'submitLogout'
			}
		},
		link:	{
			defaul: 		'#',
			wcm: 			'http://fluig.sistemafaeg.org.br/avaliacoesAgrinho'
		},
		text: 	{
			main:			'INÃCIO',
//			cadastre: 		'Cadastro',
			dropdown: 		'Outros',
//			newworks: 		'Novo Trabalho',
//			works: 			'Trabalhos',
			works: 			'AvaliaÃ§Ãµes',
//			disqualified:	'DesclassificaÃ§Ã£o',
//			errors:			'Erros de DigitaÃ§Ã£o',
//			reports:		'RelatÃ³rios',
//			submitLogout:	'Sair',
			preReport:		'Resultado Preliminar',
			endReport:		'Resultado Final',
			reports:		'RelatÃ³rios',
			calculate:		'CÃ¡lculo de MÃ©dias',
		}
	},
	render: function() {
		return '' +
		'<div id="' + this.props.id.div.menu + '">' +
		'<nav class="navbar navbar-default" role="navigation">' +
		'    <div class="container-fluid">' +
		'        <div class="navbar-header">' +
		'            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">' +
		'            <span class="sr-only">Toggle navigation</span>' +
		'            <span class="icon-bar"></span>' +
		'            <span class="icon-bar"></span>' +
		'            <span class="icon-bar"></span>' +
		'            </button>' +
		'            <a id="' + this.props.id.nav.main + '"  class="navbar-brand" href="' + this.props.link.defaul + '">' + this.props.text.main + '</a>' +
		'        </div>' +
		'        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
		'            <ul class="nav navbar-nav navbar-left">' +
//		'                <li><a  id="' + this.props.id.nav.newworks 	+ '"   	href="' + this.props.link.defaul + '" >' + this.props.text.newworks 	+ '</a></li>' +
		'                <li><a  id="' + this.props.id.nav.works 		+ '" 	href="' + this.props.link.defaul + '" >' + this.props.text.works 		+ '</a></li>' +
//		'                <li><a  id="' + this.props.id.nav.disqualified + '" 	href="' + this.props.link.defaul + '" >' + this.props.text.disqualified + '</a></li>' +
//		'                <li><a  id="' + this.props.id.nav.errors 		+ '" 	href="' + this.props.link.defaul + '" >' + this.props.text.errors 		+ '</a></li>' +
		'                <li><a  id="' + this.props.id.nav.preReport 	+ '" 	href="' + this.props.link.defaul + '" >' + this.props.text.preReport 	+ '</a></li>' +
		'                <li><a  id="' + this.props.id.nav.endReport 	+ '" 	href="' + this.props.link.defaul + '" >' + this.props.text.endReport 	+ '</a></li>' +
		'                <li><a  id="' + this.props.id.nav.reports 		+ '" 	href="' + this.props.link.defaul + '" >' + this.props.text.reports 	+ '</a></li>' +
		'                <li><a  id="' + this.props.id.nav.calculate 	+ '" 	href="' + this.props.link.defaul + '" >' + this.props.text.calculate 	+ '</a></li>' +
////		'                <li class="dropdown  debug">' +
////		'                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">' + this.props.text.dropdown + '<span class="caret"></span></a>' +
////		'                    <ul class="dropdown-menu" role="menu">' +
////		'                        <li><a id="' + this.props.id.nav.works + '" 		href="' + this.props.link.defaul + '" >' + this.props.text.works + '</a></li>' +
////		'                        <li><a id="' + this.props.id.nav.appraisers + '" 	href="' + this.props.link.defaul + '" >' + this.props.text.appraisers + '</a></li>' +
////		'                        <li class="divider"></li>' +
////		'                        <li><a id="' + this.props.id.nav.reports + '" 		href="' + this.props.link.defaul + '" >' + this.props.text.reports + '</a></li>' +
////		'                    </ul>' +
////		'                </li>' +
		'            </ul>' +
//		'            <form class="navbar-form navbar-right" role="form"  action="/escolas" method="get" enctype="text/plain" >' +
//		'                <button  id="' + this.props.id.button.logout + '"  type="submit" class="btn btn-default">' + this.props.text.submitLogout + '</button>' +
//		'            </form>' +
		'        </div>' +
		'    </div>' +
		'</nav>' +
		'</div>';
	},
	callBack: function(){
		return "callBackMenu('" + this.props.target + "'); " +
//			  "reloadCustomIdHTML('divBarraTopo', BarraTopo, 	false, BarraTopo.callBack());" +
			  "reloadCustomIdHTML('divApp', 		Home, 		false, Home.callBack());"
	}
};
