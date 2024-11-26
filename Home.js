console.log('%c [v.up.0.0.1] Home.js', 'color:gray');

function callBackHome(idTarget){
	console.log('%c ' + arguments.callee.name, 'color:brown');
	
	$('#' + idTarget).show();	
}


var Home = {
	props: {
		target: 		'divApp',
		id:		{
			div: {
				home:	'divPainel',
				msg: 	'divMsgPrincipal'
			}
		},
		link:	{
			defaul: 	'#'
		},
		text: 	{
			msg:		'<b>Programa Agrinho 2017</b>.'
		}
	},
	render: function() {
		return '' +
		'<div id="' + this.props.id.div.home + '">' +
	    '	<div class="row">' +
	    '		<div id="' + this.props.id.div.msg + '"  class="col-lg-8 col-md-8 col-sm-10 col-xs-12     col-lg-offset-2 col-md-offset-2 col-sm-offset-1 col-xs-offset-0  well well-lg" >' +
	    '			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">' +
	    '				<img src="/wcm_escolas/resources/images/agrinho-senargo-m.png">' +
	    '			</div>' +
	    '			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12  paragraph-is-required text-center " style="padding:10px;">' +
	    '				<br>' +
		'				<font>' + this.props.text.msg + '</font>' +
		'			</div>' +
		'		</div>' +
		'	</div>' +
		'</div>';
	},
	callBack: function(){
		return "callBackHome('" + this.props.target + "');"
	}
};
