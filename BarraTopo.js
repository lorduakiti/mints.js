console.log('%c [v.up.0.0.1] BarraTopo.js', 'color:gray');

function callBackBarraTopo(idTarget){
	console.log('%c ' + arguments.callee.name, 'color:brown');
	
	BarraTopo.removeAllChilds();
	$('#' + idTarget).show();	
}


var BarraTopo = {
	props: {
		target: 		'divBarraTopo',
		id:	{
			div: {
				top:	'divBarraTopo',
				alert: 	'divMsgAlertaTopo'
			},
			breadcrumb: {
				top: 	'barraTopo'
			},
			child: 		['home', 'child_1', 'child_2', 'child_3', 'child_4', 'child_5']
		},
		link: {
			child: 		['#', '#', '#', '#', '#', '#'],
			defaul: 	'#'
		},
		text: {
			main:		'Home',
			child: 		['...', '...', '...', '...', '...'],
			alert: 		'...'
		}
	},
	addChild: function(n, link, text){
		$('#' + this.props.id.breadcrumb.top).removeClass('active');
		$('#' + this.props.id.child[n]).find('a').attr('href', link ).html( text );
		//$('#' + this.props.id.div.top).find('li:visible').length
//		$('#' + this.props.id.div.top).find('li').each(function(){
//			// ???
//		});
	},
	removeAllChilds: function(){
		for(i=5; i>=0; i--){
			this.removeChild(i);
		}
		$('#' + this.props.id.breadcrumb.top).addClass('active');
	},
	removeChild: function(n){
		(n === undefined) ? n = (6 - $('#' + this.props.id.div.top).find('li:hidden').length) : '' ;
		this.clearChild(n);
		$('#' + this.props.id.child[n]).hide();
		$('#' + this.props.id.child[n-1]).addClass('active');
	},
	clearChild: function(n){
		$('#' + this.props.id.child[n]).removeClass('active').find('a').attr('href', this.props.link.child[n] ).html( this.props.text.child[n] );
	},
	alert: function(msg){
		(msg !== undefined) ? this.props.text.alert = msg : '' ;
		
		var html = myMints.custom.createHtml.alert(this.props.text.alert);
		renderCustomHTML('#' + this.props.id.div.alert, html, false);
		
		$('#' + this.props.id.div.alert).fadeIn('slow');
	},
	render: function(){
		return '' +
		'<div id="' + this.props.id.div.top + '" >' +
		'	<div class="row">' +
		'		<ol class="breadcrumb  col-lg-4 col-md-4 col-sm-6 col-xs-12" >' +
		'    		<li id="' + this.props.id.breadcrumb.top + '" 	><a data-link="' + this.props.link.defaul + '">' + this.props.text.main + '</a></li>' +
		'    		<li id="' + this.props.id.child[1] + '" 		><a data-link="' + this.props.link.child[1] + '">' + this.props.text.child[1] + '</a></li>' +
		'    		<li id="' + this.props.id.child[2] + '" 		><a data-link="' + this.props.link.child[2] + '">' + this.props.text.child[2] + '</a></li>' +
		'    		<li id="' + this.props.id.child[3] + '" 		><a data-link="' + this.props.link.child[3] + '">' + this.props.text.child[3] + '</a></li>' +
		'    		<li id="' + this.props.id.child[4] + '" 		><a data-link="' + this.props.link.child[4] + '">' + this.props.text.child[4] + '</a></li>' +
		'   	 	<li id="' + this.props.id.child[5] + '" class="active"><a data-link="' + this.props.link.child[5] + '">' + this.props.text.child[5] + '</a></li>' +
	    '		</ol>' +
	    '	</div>' +
	    '	<div class="row">' +
	    '		<div id="' + this.props.id.div.alert + '"  style="display:none;"  class="col-lg-8 col-md-8 col-sm-10 col-xs-12     col-lg-offset-2 col-md-offset-2 col-sm-offset-1 col-xs-offset-0" ></div>' +
		'	</div>' +
		'</div>';
	},
	callBack: function(){
		this.removeAllChilds();
		return "callBackBarraTopo('" + this.props.target + "');"
	}
};
