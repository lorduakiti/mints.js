/** The custom library functions.
	Developer by: UÃ¡kiti Pires
	Date: 27/07/2017
*/

console.log('%c [v.up.0.0.3] utils.js', 'color:gray');



/** ---------------------- BIBLIOTECA PAULO ------------------------ */
var MyUtils = function(){};
MyUtils.prototype.customDate = {
		adaptDate_ofRm: function(dateRM){//NOTE: FunÃ§Ã£o para formatar a data do RM e popular o campo
			this.dateRM = dateRM;			
			this.dateAdapt = '';
			if(this.dateRM != '' && this.dateRM != null){
				this.date = this.dateRM.slice(0, 10);
				this.dateAdapt = this.date.split('-').reverse().join('/');
			}
			return this.dateAdapt;
		},
		adaptDate_toRm: function(dateForm){//NOTE: FunÃ§Ã£o para formatar a data do campo para inserir no RM
			this.dateForm = dateForm;
			this.dateAdapt = '';
			if(this.dateForm != '' && this.dateForm != null){
				this.date = this.dateForm.slice(0, 10);
				this.dtAdapt = this.date.split('/').reverse().join('-');
				this.dtCurrent = new Date();
				this.hours = ((this.dtCurrent.getHours() < 10) ? "0" : "")+ this.dtCurrent.getHours();
				this.minutes = ((this.dtCurrent.getMinutes() < 10) ? "0" : "")+ this.dtCurrent.getMinutes();
				this.seconds = ((this.dtCurrent.getSeconds() < 10) ? "0" : "")+ this.dtCurrent.getSeconds();
				this.timeAtual = (this.hours+':'+this.minutes+':'+this.seconds);
				this.dateAdapt = this.dtAdapt+'T'+this.timeAtual;
			}
			return this.dateAdapt;
		},
		dateFormat: function(dateFormat, format){//NOTE: FunÃ§Ã£o para formatar a data
			this.formatAdapt = '';
			if(dateFormat != '' && dateFormat != null){
				this.date = dateFormat;
				this.day = ((this.date.getDate() < 10) ? "0" : "")+ this.date.getDate();
				this.month = ((this.date.getMonth() < 9) ? "0" : "")+ (this.date.getMonth()+1);
				this.year = (this.date.getFullYear()).toString();
				if(format != '' && format != null && format == 'PTBR'){
					this.formatAdapt = (this.day+'/'+this.month+'/'+this.year);
				}else if(format == 'ENG'){					
					this.formatAdapt = (this.year+'-'+this.month+'-'+this.day);
				}else{
					this.formatAdapt = (this.year+'-'+this.month+'-'+this.day);
				}
			}
			return this.formatAdapt;
		},
		currentDate: function(){//NOTE: Retorna Data Atual Dia - MÃªs - Ano
			this.date = new Date();
			this.day = ((this.date.getDate() < 10) ? "0" : "")+ this.date.getDate();
			this.month = ((this.date.getMonth() < 9) ? "0" : "")+ (this.date.getMonth()+1);
			this.year = (this.date.getFullYear()).toString();
			this.dayWeek = (this.date.getDay()+1).toString();
			this.result = new Object({'day': this.day, 'month': this.month, 'year': this.year, 'dayWeek': this.dayWeek});
			return this.result;
		},
		currentTime: function(){//NOTE: Retorna Hora Atual Hora - Minuto - Segundo - Milissegundo
			this.date = new Date();
			this.hours = ((this.date.getHours() < 10) ? "0" : "")+ this.date.getHours();
			this.minutes = ((this.date.getMinutes() < 10) ? "0" : "")+ this.date.getMinutes();
			this.seconds = ((this.date.getSeconds() < 10) ? "0" : "")+ this.date.getSeconds();
			this.milliseconds = ((this.date.getMilliseconds() < 10) ? "0" : "")+ this.date.getMilliseconds();		
			this.result = new Object({'hours': this.hours, 'minutes': this.minutes, 'seconds': this.seconds, 'milliseconds': this.milliseconds});
			return this.result;
		},
		currentQuarter: function(date) {//NOTE: Retorna Trimestre
			this.date = date;
			this.parts = this.date.match(/(\d+)/g);
			this.month = this.parts[1];
			this.quarter = (Math.floor((this.month-1)/3)+1);
			return this.quarter;
		},
		lastDayMonth: function(month, year){//NOTE: Retorna Ãšltimo dia do mÃªs
			this.month = month;
			this.year = year;
			this.m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if (this.month != 2){
				return this.m[this.month - 1];
			}
			if (this.year % 4 != 0){
				return this.m[1];
			}
			if (this.year % 100 == 0 && this.year%400 != 0){
				return this.m[1];
			}
			return this.m[1] + 1;
		},
		differenceDay: function(dateStart, dateEnd){//NOTE: Retorna quantidade de dias entre as datas
			this.dateStart = dateStart;
			this.dateEnd = dateEnd;
			this.initialDate = new Date(this.dateStart.split('/').reverse().join('/'));
			this.endDate = new Date(this.dateEnd.split('/').reverse().join('/'));
			this.timeDiff = Math.abs(this.endDate.getTime() - this.initialDate.getTime());
			this.diffDays = Math.ceil(this.timeDiff / (1000 * 3600 * 24)); 
			return this.diffDays;
		},
		differenceHours: function(dateStart, hoursStart, dateEnd, hoursEnd){//NOTE: Retorna quantidade de horas entre as datas
			this.dateStart = dateStart;
			this.hoursStart = hoursStart;
			this.dateEnd = dateEnd;
			this.hoursEnd = hoursEnd;
			this.dtHrStart = ((this.dateStart.split('/').reverse().join('/')) + " "+this.hoursStart);
			this.dtHrEnd = ((this.dateEnd.split('/').reverse().join('/')) + " "+this.hoursEnd);			
			this.initialDate = new Date(this.dtHrStart);
			this.endDate = new Date(this.dtHrEnd);
			this.timeDiff = Math.abs(this.endDate.getTime() - this.initialDate.getTime());
			this.diffHours = Math.ceil(this.timeDiff / (1000 * 3600)); 
			return this.diffHours;
		},
		weekendDays: function(dateStart, dateEnd){//NOTE: Retorna quantidades de dias de final de semana entre as datas
			this.dateStart = dateStart;
			this.dateEnd = dateEnd;
			this.dtInit = (this.dateStart.split('/').reverse().join('-')).split("-");
			this.dtEnd = (this.dateEnd.split('/').reverse().join('-')).split("-");
			this.dom = 0;
			this.sab = 0;
			this.result = "";
			this.diffDays = window[_global.objVars.utils].customDate.differenceDay(this.dateStart, this.dateEnd);			
			this.endDate = new Date(this.dtEnd[0], (this.dtEnd[1] - 1), this.dtEnd[2], 0, 0, 0);			
			this.initDate = new Date(this.dtInit[0], (this.dtInit[1] - 1), this.dtInit[2], 0, 0, 0);			
			this.limit = (this.diffDays + 1);
			for (var i = 0; i < this.limit; i++) {
				this.dayInt = (parseInt(this.dtInit[2]) + i);
				this.day = ((this.dayInt < 10) ? "0" : "")+ this.dayInt;
				this.startDate = new Date(this.dtInit[0], (this.dtInit[1] - 1), day, 0, 0, 0);				
				if (this.startDate.getDay() == 0){
					this.dom++;
				}else if (this.startDate.getDay() == 6){
					this.sab++;
				}
				if (this.startDate.getTime() == this.endDate.getTime()){
					this.result = (this.dom + this.sab);					
				}
			}
			return this.result;
		}
};

MyUtils.prototype.appComponents = {
		validVarObj: function(element, object) {//NOTE: FunÃ§Ã£o para Validar se existe e se Existe Valor em Variaveis/Objetos
			if(element != null && element != ""){
				if(typeof element !== 'undefined' && element != undefined && element != null && element != "" && Object.keys(element).length > 0){				
					if(object != null && object != ""){
						if (typeof element[object] !== 'undefined' && element[object] != undefined && element[object] != null && element[object].length > 0){
							return true;
						}else{
							return false;
						}
					}
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		},
		createTagXML: function (field, value){//NOTE: FunÃ§Ã£o para Criar Elementos/Tag do XML
			this.result =  "";
			if(field == 'CEP'){
				this.value = value.replace(/[^\d]+/g, '');
			}
			if ((value !== null) && (value !== "")){
				this.element = "<"+field+">"+value+"</"+ field + "> ";
				this.result = this.element;
			}else{
				this.result = "";
			}
			return this.result;
		},
		capitalizeField: function(element, value){//NOTE: Colocar todos letras iniciais maiusculas, e pronone entre de junÃ§Ã£o minusculos
			this.string = (element != null)? window[_global.objVars.utils].appComponents.getElement(element): value;			
			this.valor = this.string.toLowerCase();
			if(this.valor.length > 1){
				this.capitalize = '';
				for(var i = 0; i < this.valor.length; i++){
					this.capitalize = (this.valor[i - 1] == ' ' || i == 0)? this.capitalize + this.valor[i].toUpperCase(): this.capitalize + this.valor[i];
				}
				this.capitalize = this.capitalize.replace(/( (Da|Das|E|Em|De|Do|Dos|Para|Na|Nas|No|Nos) )/gi,function(m){
					return m.toLowerCase();
				});
				return this.capitalize;
			}else{
				return "";
			}
		},
		removeAccent: function (element, value) {//NOTE: FunÃ§Ã£o para remover acentos de Strings
			this.string = (element != null)? window[_global.objVars.utils].appComponents.getElement(element): value;
			this.vString = this.string.toLowerCase();
			this.vString = this.vString.replace(new RegExp('[ÃÃ€Ã‚Ãƒ]','gi'), 'a');
			this.vString = this.vString.replace(new RegExp('[Ã‰ÃˆÃŠ]','gi'), 'e');
			this.vString = this.vString.replace(new RegExp('[ÃÃŒÃŽ]','gi'), 'i');
			this.vString = this.vString.replace(new RegExp('[Ã“Ã’Ã”Ã•]','gi'), 'o');
			this.vString = this.vString.replace(new RegExp('[ÃšÃ™Ã›]','gi'), 'u');
			this.vString = this.vString.replace(new RegExp('[Ã‡]','gi'), 'c');
			return this.vString.toUpperCase();
		},
		calculateAge: function(field_dtNasc, field_idade){//NOTE: Calcula a idade conforme a Data de Nascimento
			this.dataNascimento = document.getElementById(field_dtNasc).value;
			if(this.dataNascimento != '' && this.dataNascimento != null){
				this.idade = document.getElementById(field_idade);
				this.d = new Date;
				this.anoAtual = this.d.getFullYear();
				this.mesAtual = this.d.getMonth() + 1;
				this.diaAtual = this.d.getDate();
				this.diaAniversario = this.dataNascimento.substring(0, 2);
				this.mesAniversario = this.dataNascimento.substring(3, 5);
				this.anoAniversario = this.dataNascimento.substring(6, 10);
				this.idade.value = this.anoAtual - this.anoAniversario;
				if (this.mesAtual < this.mesAniversario || (this.mesAtual == this.mesAniversario && this.diaAtual < this.diaAniversario)) {
					this.idade.value--;
				}
				if(this.idade.value < 0){
					this.idade.value = 0;
				}
			}else{
				return '';
			}
		},
		selectedReadonly: function (){//NOTE: FunÃ§Ã£o para adicionar Readonly Select
			$('select[readonly=readonly]').closest('div.form-field').css({'cursor': 'not-allowed'})
			$('select[readonly=readonly]').css({'pointer-events': 'none', 'touch-action': 'none'});
		},
		loadingOption: function(element) {
			window[_global.objVars.utils].appComponents.removeOption(element, 'option');
			this.option = window[_global.objVars.utils].appComponents.appendOption("carregando", "Carregando...");
			$('select#'+element).append(this.option);
			window[_global.objVars.utils].appComponents.setElement(element, "carregando");
		},
		appendOption: function(key, value){//NOTE: FunÃ§Ã£o para adicionar Elementos/Tag do hmtl Select
			this.result = "";
			if ((value != null) && (value != "")){
				this.element = '<option value="'+key+'">'+value+'</option>';
				this.result = this.element;
			}else{
				this.result = "";
			}
			return this.result;
		},
		removeOption: function(element, value){//NOTE: Remover options do Select
			if ((element != null) && (element != "")){
				$('select#'+element).find('option').remove();
				if(value == 'optionFull'){
					$('select#'+element).append('<option value="--">Selecione...</option>');
					$('select#'+element).append('<option value="todos">TODOS</option>');
				}else{
					$('select#'+element).append('<option value="">Selecione...</option>');
				}
			}
		},
		appendButton: function(_class, value, atribut) {//NOTE: Cria button para append
			this.result = "";
			if ((value != null) && (value != "")){
				this.element = '<button class="'+_class+'" '+atribut+'>'+value+'</button>';
				this.result = this.element;
			}else{
				this.result = "";
			}
			return this.result;
		},
		existElement: function(element) {//NOTE: FunÃ§Ã£o para verificar se existe elemento
			this.result = false;
			if($("#"+element).length){
				this.result = true;
			}
			if(document.getElementById(element) != null){
				this.result = true;
			}
			return this.result;			
		},
		getByIdPaiFilho: function(element, field, value){//NOTE: FunÃ§Ã£o retorna id da linha no paixfilho
			this.row;
			$('[id^='+element+'___]').each(function() {
				this.id = $(this).attr('id').replace(element, '');
				if(document.getElementById(field+id).value == value){
					this.row = this.id;
				}
			});
			return this.row;
		},
		getElementHmtl: function(tag, element, value) {
			this.result = document.querySelectorAll(tag+'#'+element)[0].innerHTML = value;
			if(this.result == '' || this.result == null){
				$(tag+'#'+element).html();
			}else{
				this.result = this.result;
			}
			return this.result;
		},
		getTextSelect: function (element){//NOTE: Buscar valor em Elemento
			this.result = document.getElementById(element).options[document.getElementById(element).selectedIndex].text;
			if(this.result == '' || this.result == null){
				this.result = $('#'+element).find('option:selected').text();
			}else{
				this.result = this.result;
			}
			return this.result;
		},
		getElement: function(element){//NOTE: Buscar valor em Elemento
			this.result = document.getElementById(element).value;
			if(this.result == '' || this.result == null){
				this.result = $('#'+element).val();
			}else{
				this.result = this.result;
			}
			return this.result;
		},
		getElements: function(element, atribut, active){//NOTE: Buscar valor em Elemento e Seta atributos
			this.result = document.getElementById(element).value;
			if(this.result == '' || this.result == null){
				this.result = $('#'+element).val();
				$('#'+element).attr(atribut, active);
			}else{
				this.result = this.result;
				document.getElementById(element).setAttribute(atribut, active);
			}
			return this.result;
		},
		setElementHmtl: function(tag, element, value) {
			document.querySelectorAll(tag+'#'+element)[0].innerHTML = value;
			$(tag+'#'+element).html(value);
		},
		setElementSelect: function (element, value){//NOTE: Seta valor em Elemento
			document.getElementById(element).options[document.getElementById(element).value=value];
			$('#'+element+' option[value="'+value+'"]').prop('selected', true);
		},
		setElementCheck: function (element, value){//NOTE: Seta valor em Elemento
			document.getElementById(element).checked = value;
			$('#'+element).prop('checked', value);
		},
		setElementChecks: function (element, value, atribut, active){//NOTE: Seta valor em Elemento
			document.getElementById(element).checked = value;
			document.getElementById(element).setAttribute(atribut, active);
			$('#'+element).attr(atribut, active).prop('checked', value);
		},
		setElementSelects: function (element, value, atribut, active){//NOTE: Seta valor em Elemento
			document.getElementById(element).options[document.getElementById(element).value=value];
			document.getElementById(element).setAttribute(atribut, active);
			$('#'+element+' option[value="'+value+'"]').prop('selected', true);
			$('#'+element).attr(atribut, active);
			if(atribut == "readonly"){				
				window[_global.objVars.utils].appComponents.selectedReadonly();
			}
		},
		setElement: function(element, value){//NOTE: Seta valor em Elemento
			document.getElementById(element).value = value;
			$('#'+element).val(value);
		},
		setElements: function(element, value, atribut, active){//NOTE: Seta valor em Elemento e Seta atributos
			document.getElementById(element).value = value;
			document.getElementById(element).setAttribute(atribut, active);
			$('#'+element).attr(atribut, active);
			$('#'+element).val(value);
		},
		addNumberRow: function (tableName){//NOTE: Adiciona Numeros nas linhas no PaixFilho 
			var i = 1;
			$('table#'+tableName).find('tbody').find('tr').find('td').find('label[name^="contador___"]').each(function(){
				$(this).html(i);
				i++;
			});
		},
		numberRowTable: function (tableId){//NOTE: Retorna numero linha de uma tabela do PaixFilho
			this.rowTable = $("table#"+tableId).find("tbody").find("tr").length - 1;
			return this.rowTable;
		},
		addRowTable: function(element){
			if(components.myid[element] == undefined){
				components.myid[element] = {count: 1};
			}else{
				this.cont = components.myid[element].count;
				components.myid[element].count = parseInt((this.cont + 1));
			}
			$('table#'+element).find('tbody').find('tr.tableHeadRow:first').clone().insertAfter($('table#'+element).find('tbody').find('tr.tableHeadRow:last'));
			$('table#'+element).find('tbody').find('tr.tableHeadRow:last').find('input, select, span, p, label').each(function(){
				this.row = components.myid[element].count;
				this.elementId = $(this).attr('id');
				this.id = this.elementId+'___'+this.row;
				if(this.elementId != null && this.elementId != "" && this.elementId != undefined){		
					if($(this).attr('type') == 'radio'){
						$(this).attr({'id': this.id});
					}else if($(this).attr('class') != 'fluigicon fluigicon-trash fluigicon-md'){
						$(this).attr({'id': this.id, 'name': this.id});
					}
				}
			});
			$.each($('span[data-removechild]'), function(){
				$(this).on('click', function(){
					this.element = $(this).closest('table[tablename]').attr('id');
					if($('table#'+element).find('tbody').find('tr.tableHeadRow').length > 1){
						$(this).closest('tr.tableHeadRow').remove();
					}
				});
			});
			$('table#'+element).find('tbody').find('tr.tableHeadRow:last').show();
			return components.myid[element].count;
		},
		removeTrashTable: function(element) {
			$('table#'+element).find('thead').find('tr.tableHeadRow').find('th[class!=tableColumn]').remove();
			$('table#'+element).find('tbody').find('tr.tableHeadRow').find('td').find('span[data-removechild]').each(function(){
				$(this).closest('td').remove();
			});
		},
		removeRowTable: function(element){
			$('table#'+element).find('tbody').find('tr.tableHeadRow').find('td').find('span[data-removechild]').on('click', function(){
				if($('table#'+element).find('tbody').find('tr.tableHeadRow').length > 1){
					$(this).closest('tr.tableHeadRow').remove();
					this.cont = components.myid[element].count;
					components.myid[element].count = parseInt((this.cont - 1));
				}
			});
			return components.myid[element].count;
		},
		removeRowsTable: function(element){
			this.tableElement = $('table#'+element).find('tbody').find('tr.tableHeadRow:first');
			$('table#'+element).find('tbody').find('tr.tableHeadRow').remove();
			$('table#'+element).find('tbody').append(this.tableElement);
			delete components.myid[element];
		},
		orderByArray: function(key, array){//NOTE: FunÃ§Ã£o para ordenar array
			array.sort(function(a,b){
				if (a[key] < b[key]){
					return -1;
				}
				if (a[key] > b[key]){
					return 1;
				}
				return 0;
			});
			return array;
		},
		twoDecimal: function(f_num) {
			this.i_num = parseFloat(f_num);
			this.i_num = parseInt(this.i_num * 100) / 100;
			return this.i_num;
		}
};

MyUtils.prototype.validMaskField = {//NOTE: ValidaÃ§Ã£o para campos & Mascaras para campos
		inscricaoEstadual: function (element) {//NOTE: public method valid for Inscricao Estadual
			this.campo = document.getElementById(element);
			this.ie = this.campo.value;
			this.strIE = this.ie.replace(/[^\d]+/g, '');
			this.soma = 0;
			this.resto;
			this.dgv;
			if (this.strIE != "" && this.strIE != null){
				if ((this.strIE.length != 9) || (this.valordataTabletido(this.strIE.length, this.strIE))){
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","A InscriÃ§Ã£o Estadual digitada Ã© invÃ¡lida!");
					this.campo.value = '';
					return false;
				}
				for (i = 1; i <= 8; i++){
					this.soma = this.soma + parseInt(this.strIE.substring(i - 1, i)) * (10 - i);
				}
				this.resto = (soma % 11);
				if(this.resto == 0) {
					this.dgv = 0;
				}
				if(this.resto == 1){
					this.dgv = ((parseInt(this.strIE.substring(0,(this.str.length - 1))) >= parseInt(10103105)) && (parseInt(this.strIE.substring(0,(this.str.length - 1))) <= parseInt(10119997))) ? 1 : 0;
				}
				if(this.resto != 1 && this.resto != 0){
					this.dgv = (11 - this.resto);
				}
				if(this.dgv != parseInt(this.strIE.substring(8, 9))){
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","A InscriÃ§Ã£o Estadual digitada Ã© invÃ¡lida!");
					this.campo.value = '';
					return false;
				}
				return true;
			}
		},
		cpf: function (element) {//NOTE: public method valid for CPF
			this.campo = document.getElementById(element);
			this.value = this.campo.value;
			this.strCPF = this.value.replace(/[^\d]+/g, '');
			this.soma = 0;
			this.resto;
			if (this.strCPF != "" && this.strCPF != null){
				if ((this.strCPF.length != 11) || (this.valorRepetido(this.strCPF.length, this.strCPF))){
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O CPF digitado Ã© invÃ¡lido!");
					this.campo.value = '';
					return false;
				}
				for (i = 1; i <= 9; i++){
					this.soma = this.soma + parseInt(this.strCPF.substring(i - 1, i)) * (11 - i);
				}
				this.resto = (this.soma * 10) % 11;
				if ((this.resto == 10) || (this.resto == 11)){
					this.resto = 0;
				}
				if (this.resto != parseInt(this.strCPF.substring(9, 10))) {
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O CPF digitado Ã© invÃ¡lido!");
					this.campo.value = '';
					return false;
				}
				this.soma = 0;
				for (i = 1; i <= 10; i++){
					this.soma = this.soma + parseInt(this.strCPF.substring(i - 1, i)) * (12 - i);
				}
				this.resto = (this.soma * 10) % 11;
				if ((this.resto == 10) || (this.resto == 11)){
					this.resto = 0;
				}
				if (this.resto != parseInt(this.strCPF.substring(10, 11))) {
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O CPF digitado Ã© invÃ¡lido!");
					this.campo.value = '';
					return false;
				}
				return true;
			}
		},
		cnpj: function (element) {//NOTE: public method valid for Inscricao Estadual
			this.campo = document.getElementById(element);
			this.value = this.campo.value;
			this.strCNPJ = this.value.replace(/[^\d]+/g, '');
			this.soma = 0;
			if (this.strCNPJ != "" && this.strCNPJ != null){
				if ((this.strCNPJ.length != 14) || (this.valorRepetido(this.strCNPJ.length, this.strCNPJ))){
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O CNPJ digitado Ã© invÃ¡lido!");
					this.campo.value = '';
					return false;
				}
				this.tamanho = this.strCNPJ.length - 2
				this.numeros = this.strCNPJ.substring(0, this.tamanho);
				this.digitos = this.strCNPJ.substring(this.tamanho);
				this.soma = 0;
				this.pos = (this.tamanho - 7);
				for (i = this.tamanho; i >= 1; i--) {
					this.soma += this.numeros.charAt(this.tamanho - i) * this.pos--;
					if (this.pos < 2){
						this.pos = 9;
					}
				}
				this.resultado = this.soma % 11 < 2 ? 0 : 11 - this.soma % 11;
				if (this.resultado != this.digitos.charAt(0)){
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O CNPJ digitado Ã© invÃ¡lido!");
					this.campo.value = '';
					return false;
				}
				this.tamanho = this.tamanho + 1;
				this.numeros = this.strCNPJ.substring(0, this.tamanho);
				this.soma = 0;
				this.pos = (this.tamanho - 7);
				for (i = this.tamanho; i >= 1; i--) {
					this.soma += this.numeros.charAt(this.tamanho - i) * this.pos--;
					if (this.pos < 2){
						this.pos = 9;
					}
				}
				this.resultado = this.soma % 11 < 2 ? 0 : 11 - this.soma % 11;
				if (this.resultado != this.digitos.charAt(1)){
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O CNPJ digitado Ã© invÃ¡lido!");
					this.campo.value = '';
					return false;
				}
				return true;
			}
		},
		date: function(element) {
			this.campo = document.getElementById(element);
			this.value = this.campo.value;
			this.strDate = this.value.replace(/[^\d]+/g, '');
			if (this.strFone != "" && this.strFone != null){
				this.re = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;
				if(!this.re.test(this.strDate)) { 
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","A Data digitada Ã© invÃ¡lida!");
					this.campo.value = '';
					return false;
				}				
				this.dateArray = this.value.split("/"); 
				this.toDate = this.value.split('/').reverse().join('-');
				this.d = new Date(this.toDate);
				this.day = ((this.d.getDate() < 10) ? "0" : "")+ (this.d.getDate()+1);
				this.month = ((this.d.getMonth() < 9) ? "0" : "")+ (this.d.getMonth()+1);
				this.year = (this.d.getFullYear()).toString();
				if(this.day != this.dateArray[0] || this.month != this.dateArray[1] || this.year != this.dateArray[2]){
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","A Data digitada Ã© invÃ¡lida!");
					this.campo.value = '';
					return false;
				}
				return true;
			}
		},
		cellphone: function(element) {
			this.campo = document.getElementById(element);
			this.value = this.campo.value;
			this.strFone = this.value.replace(/[^\d]+/g, '');
			if (this.strFone != "" && this.strFone != null){
				this.arddd = new Array(11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99);
				this.ddd = parseInt(this.strFone.substr(0, 2));
				if(this.arddd.indexOf(this.ddd) == -1){
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O DDD digitado Ã© invÃ¡lido!");
					this.campo.value = '';
					return false;
				}
				if ((this.strFone.length != 10 && this.strFone.length != 11) || (this.valorRepetido(this.strFone.length, this.strFone))){
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O Celular digitado Ã© invÃ¡lido!");
					this.campo.value = '';
					return false;
				}
				if(this.strFone.length == 10){
					this.re = /^\d\((10)|([1-9][1-9])\)[6-9][0-9]{3}-[0-9]{4}/;
				}else if(this.strFone.length == 11){
					this.re = /^\d\((10)|([1-9][1-9])\)[9][6-9][0-9]{3}-[0-9]{4}/;
				}
				if (!this.re.test(this.value)) {
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O Celular digitado Ã© invÃ¡lido!");
					this.campo.value = '';
					return false;
				}
				return true;
			}
		},
		phone: function(element) {
			this.campo = document.getElementById(element);
			this.value = this.campo.value;
			this.strFone = this.value.replace(/[^\d]+/g, '');
			if (this.strFone != "" && this.strFone != null){
				this.arddd = new Array(11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99);
				this.ddd = parseInt(this.strFone.substr(0, 2));
				if(this.arddd.indexOf(this.ddd) == -1){
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O Telefone digitado Ã© invÃ¡lido!");
					this.campo.value = '';
					return false;
				}				
				this.arespecial = new Array(0800, 0300, 0500, 0900, 3003, 4003, 4004);
				this.prefixo = parseInt(this.strFone.substr(this.strFone.length  - 8, 4));			
				if(this.arespecial.indexOf(this.prefixo) != -1){
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O Telefone digitado Ã© invÃ¡lido!");
					this.campo.value = '';
					return false;
				}
				if ((this.strFone.length != 10) || (this.valorRepetido(this.strFone.length, this.strFone))){
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O Telefone digitado Ã© invÃ¡lido!");
					this.campo.value = '';
					return false;
				}
				this.re = /^\d\((10)|([1-9][1-9])\)[2-5][0-9]{3}-[0-9]{4}/;
				if (!this.re.test(this.value)) {
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O Telefone digitado Ã© invÃ¡lido!");
					this.campo.value = '';
					return false;
				}
				return true;
			}
		},
		mail: function(element) {
			this.campo = document.getElementById(element);
			this.value = this.campo.value;
			var er = /[a-zA-Z0-9@._-]/g;
			this.streMail = this.value.replace(er, '');
			if (this.value != "" && this.value != null){
				if(this.streMail.indexOf(" ") != -1){
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O Email digitado Ã© invÃ¡lido!");
					this.campo.value = '';
					return false;
				}
				if(this.streMail.length > 0){
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O Email digitado Ã© invÃ¡lido!");
					this.campo.value = '';
					return false;
				}
				if((this.val.indexOf("@") < 1) || (this.val.indexOf('.') < 7)){
					window[_global.objVars.utils].byMessage.alertError("AtenÃ§Ã£o","O Email digitado Ã© invÃ¡lido!");
					this.campo.value = '';
					return false;
				}
				return true;			
			}
		},
		valorRepetido: function(tam, campo){//NOTE: FunÃ§Ã£o de comparaÃ§Ã£o numerica (Ex: CPF: 11111111111, 22222222222...)
			this.str = '';
			this.rest = false;
			this.c = 1;
			do{
				if(this.c != 10){
					for(var i = 0; i < tam; i++){
						this.str = this.str + this.c;
					}
					this.rest = (campo == this.str) ? true : false;
					this.str = '';
					this.c++;
				}
			}while(this.rest == false && this.c != 10);
			return this.rest;
		},
		cpfCnpj: function (element, teclapres){//NOTE: public method mask for CPF/CNPJ
			this.campo = document.getElementById(element);
			if(teclapres != null){
				this.tecla = teclapres.keyCode;
				if ((this.tecla < 48 || this.tecla > 57) && (this.tecla < 96 || this.tecla > 105) && this.tecla != 46 && this.tecla != 8 && this.tecla != 9){
					return false;
				}
			}
			this.vr = this.campo.value;
			this.vr = this.vr.replace( /[^\d,]/g, "" );
			this.vr = this.vr.replace( /\//g, "" );
			this.vr = this.vr.replace( /-/g, "" );
			this.vr = this.vr.replace( /\./g, "" );
			this.tam = this.vr.length;
			if(this.tam <= 2){
				this.campo.value = this.vr;
			}
			if((this.tam > 2) && (this.tam <= 5)){
				this.campo.value = this.vr.substr( 0, this.tam - 2) + '-' + this.vr.substr(this.tam - 2, this.tam);
			}
			if((this.tam >= 6) && (this.tam <= 8)){
				this.campo.value = this.vr.substr(0, this.tam - 5) + '.' + this.vr.substr(this.tam - 5, 3) + '-' + this.vr.substr(this.tam - 2, this.tam);
			}
			if((this.tam >= 9) && (this.tam <= 11)){
				this.campo.value = this.vr.substr(0, this.tam - 8) + '.' + this.vr.substr(this.tam - 8, 3) + '.' + this.vr.substr(this.tam - 5, 3) + '-' + this.vr.substr(this.tam - 2, this.tam);
			}
			if((this.tam == 12)){
				this.campo.value = this.vr.substr(this.tam - 12, 3) + '.' + this.vr.substr(this.tam - 9, 3) + '/' + this.vr.substr(this.tam - 6, 4) + '-' + this.vr.substr(this.tam - 2, this.tam);
			}
			if((this.tam > 12) && (this.tam <= 14)){
				this.campo.value = this.vr.substr(0, this.tam - 12) + '.' + this.vr.substr(this.tam - 12, 3) + '.' + this.vr.substr(this.tam - 9, 3) + '/' + this.vr.substr(this.tam - 6, 4) + '-' + this.vr.substr(this.tam - 2, this.tam);
			}
			if(this.tam > 13){ 	
				if (this.tecla != 8){
					return false;
				}
			}
		},
		telefone: function (element, teclapres){//NOTE: public method mask for Telefone ddd + 8 digitos
			this.campo = document.getElementById(element);
			if(this.teclapres != null){
				this.tecla = teclapres.keyCode;
				if ((this.tecla < 48 || this.tecla > 57) && (this.tecla < 96 || this.tecla > 105) && this.tecla != 46 && this.tecla != 8 && this.tecla != 9){
					return false;
				}
			}
			this.vr = this.campo.value;
			this.vr = this.vr.replace( /[^\d,]/g, "" );
			this.vr = this.vr.replace( /-/g, "" );
			this.vr = this.vr.replace( /\(/g, "" );
			this.vr = this.vr.replace( /\)/g, "" );
			this.tam = this.vr.length;
			if(this.tam <= 2){
				this.campo.value = this.vr;
			}
			if((this.tam >= 4) && (this.tam <= 8)){
				this.campo.value = this.vr.substr(0, this.tam - 4) + '-' + this.vr.substr(this.tam - 4, this.tam);
			}
			if((this.tam >= 9) && (this.tam <= 10)){
				this.campo.value = '(' + this.vr.substr(0, this.tam - 8) + ')' + this.vr.substr(this.tam - 8, 4) + '-' + this.vr.substr(this.tam - 4, 4);
			}
			if (this.tam > 11){ 	
				if (this.tecla != 8){
					return false;
				}
			}
		},
		celular: function (element, teclapres){//NOTE: public method mask for Celular ddd + 8/9 digitos
			this.campo = document.getElementById(element);
			if(this.teclapres != null){
				this.tecla = teclapres.keyCode;
				if ((this.tecla < 48 || this.tecla > 57) && (this.tecla < 96 || this.tecla > 105) && this.tecla != 46 && this.tecla != 8 && this.tecla != 9){
					return false;
				}
			}
			this.vr = this.campo.value;
			this.vr = this.vr.replace( /[^\d,]/g, "" );
			this.vr = this.vr.replace( /-/g, "" );
			this.vr = this.vr.replace( /\(/g, "" );
			this.vr = this.vr.replace( /\)/g, "" );
			this.tam = this.vr.length;
			if(this.tam <= 2){
				this.campo.value = this.vr;
			}
			if((this.tam >= 4) && (this.tam <= 8)){
				this.campo.value = this.vr.substr(0, this.tam - 4) + '-' + this.vr.substr(this.tam - 4, this.tam);
			}
			if((this.tam >= 9) && (this.tam <= 10)){
				this.campo.value = '(' + this.vr.substr(0, this.tam - 8) + ')' + this.vr.substr(this.tam - 8, 4) + '-' + this.vr.substr(this.tam - 4, 4);
			}
			if(this.tam == 11){
				this.campo.value = '(' + this.vr.substr(0, this.tam - 9) + ')' + this.vr.substr(this.tam - 9, 5) + '-' + this.vr.substr(this.tam - 4, 4);
			}
			if (this.tam > 11){
				if (this.tecla != 8){
					return false;
				}
			}
		},
		cep: function (element, teclapres){//NOTE: public method mask for Celular ddd + 8/9 digitos
			this.campo = document.getElementById(element);
			if(this.teclapres != null){
				this.tecla = teclapres.keyCode;
				if ((this.tecla < 48 || this.tecla > 57) && (this.tecla < 96 || this.tecla > 105) && this.tecla != 46 && this.tecla != 8 && this.tecla != 9){
					return false;
				}
			}
			this.vr = this.campo.value;
			this.vr = this.vr.replace( /[^\d,]/g, "" );
			this.vr = this.vr.replace( /-/g, "" );
			this.vr = this.vr.replace( /\./g, "" );
			this.tam = this.vr.length;
			if(this.tam <= 2){
				console.log(this.vr);
			}
			if((this.tam >= 3) && (this.tam <= 4)){
				this.campo.value = this.vr.substr(0, this.tam - 1) + '.' + this.vr.substr(this.tam - 1, this.tam);
			}
			if(this.tam == 5){
				this.campo.value = this.vr.substr(0, this.tam - (this.tam - 3)) + '.' + this.vr.substr(this.tam - 2, 4);
			}
			if(this.tam == 6){
				this.campo.value = this.vr.substr(0, this.tam - (this.tam - 2)) + '.' + this.vr.substr(this.tam - 4, 3) + '.' + this.vr.substr(this.tam - 1, 2);
			}
			if(this.tam == 7){
				this.campo.value = this.vr.substr(0, this.tam - (this.tam - 2)) + '.' + this.vr.substr(this.tam - 5, 3) + '.' + this.vr.substr(this.tam - 2, 2);
			}
			if(this.tam == 8){
				this.campo.value = this.vr.substr(0, this.tam - (this.tam - 2)) + '.' + this.vr.substr(this.tam - 6, 3) + '-' + this.vr.substr(this.tam - 3, 3);
			}
			if (this.tam > 8){
				if (this.tecla != 8){
					return false;
				}
			}
		},
		data: function (element, teclapres){//NOTE: public method mask for Data
			this.campo = document.getElementById(element);
			if(teclapres != null){
				this.tecla = teclapres.keyCode;
				if ((this.tecla < 48 || this.tecla > 57) && (this.tecla < 96 || this.tecla > 105) && this.tecla != 46 && this.tecla != 8 && this.tecla != 9){
					return false;
				}
			}
			this.vr = this.campo.value;
			this.vr = this.vr.replace( /[^\d,]/g, "" );
			this.vr = this.vr.replace( /\//g, "" );
			this.vr = this.vr.replace( /-/g, "" );
			this.vr = this.vr.replace( /\./g, "" );
			this.tam = this.vr.length;
			if(this.tam <= 2){
				this.campo.value = this.vr;
			}
			if((this.tam > 2) && (this.tam <= 4)){
				this.campo.value = this.vr.substr( 0, this.tam - 1) + '/' + this.vr.substr(this.tam - 1, this.tam - 1);
			}
			if((this.tam > 4) && (this.tam < 6)){
				this.campo.value = this.vr.substr( 0, this.tam - 3) + '/' + this.vr.substr(this.tam - 3, this.tam - 3) + '/' + this.vr.substr(this.tam - 1, this.tam);
			}
			if((this.tam == 6)){
				this.campo.value = this.vr.substr( 0, this.tam - 4) + '/' + this.vr.substr(this.tam - 4, this.tam - 4) + '/' + this.vr.substr(this.tam - 2, this.tam);
			}
			if((this.tam > 6) && (this.tam < 8)){
				this.campo.value = this.vr.substr( 0, this.tam - 5) + '/' + this.vr.substr(this.tam - 5, this.tam - 5) + '/' + this.vr.substr(this.tam - 3, this.tam);
			}
			if(this.tam == 8){
				this.campo.value = this.vr.substr( 0, this.tam - 6) + '/' + this.vr.substr(this.tam - 6, this.tam - 6) + '/' + this.vr.substr(this.tam - 4, this.tam);
			}
			if(this.tam > 8){ 	
				if (this.tecla != 8){
					return false;
				}
			}
		},
};

MyUtils.prototype.utf8 = {//NOTE UTF8 Encode e Decode
		encode: function (vstring){//NOTE: public method for url encoding
			this.string = vstring.replace(/\r\n/g,"\n");
			this.utftext = "";
			for (var n = 0; n < this.string.length; n++){
				this.c = this.string.charCodeAt(n);
				if (this.c < 128) {
					this.utftext += String.fromCharCode(c);
				}else if((this.c > 127) && (this.c < 2048)){
					this.utftext += String.fromCharCode((this.c >> 6) | 192);
					this.utftext += String.fromCharCode((this.c & 63) | 128);
				}else{
					this.utftext += String.fromCharCode((this.c >> 12) | 224);
					this.utftext += String.fromCharCode(((this.c >> 6) & 63) | 128);
					this.utftext += String.fromCharCode((this.c & 63) | 128);
				}
			}
			return this.utftext;
		},
		decode: function (utftext){//NOTE: public method for url decoding
			this.string = "";
			this.i = 0;
			this.c = this.c1 = this.c2 = 0;
			while ( this.i < this.utftext.length ){
				this.c = this.utftext.charCodeAt(i);
				if (this.c < 128) {
					this.string += String.fromCharCode(c);
					this.i++;
				}else if((this.c > 191) && (this.c < 224)){
					this.c2 = this.utftext.charCodeAt(this.i+1);
					this.string += String.fromCharCode(((this.c & 31) << 6) | (this.c2 & 63));
					this.i += 2;
				}else{
					this.c2 = this.utftext.charCodeAt(this.i+1);
					this.c3 = this.utftext.charCodeAt(this.i+2);
					this.string += String.fromCharCode(((this.c & 15) << 12) | ((this.c2 & 63) << 6) | (this.c3 & 63));
					this.i += 3;
				}
			}
			return this.string;
		}
};

MyUtils.prototype.byFluig = {
		removeValeuZoomData: function(inputObj){//NOTE: FunÃ§Ã£o para remove valor campo Zoom
			if($.type(inputObj) === "string"){
				window[inputObj].removeAll();
			}else{
				inputObj.removeAll();
			}
		},
		setZoomData: function(inputObj, item){//NOTE: FunÃ§Ã£o para setar campo Zoom
			if($.type(inputObj) === "string"){
				window[inputObj].add(item);
			}else{
				inputObj.add(item);
			}
		},
		disabledZoomData: function (inputObj, val){//NOTE: FunÃ§Ã£o para disabilitar/habilitar campo Zoom
			if($.type(inputObj) === "string"){
				window[inputObj].disable(val);
			}else{
				inputObj.disable(val);
			}
		},
		paiFilhoDelete: function(elementObj){//NOTE: FunÃ§Ã£o para remover linha paixFilho
			if($.type(elementObj)  === "string"){
				fnWdkRemoveChild(window[elementObj]);
			}else{
				fnWdkRemoveChild(elementObj);
			}
		},
		setSelectedZoomItem: function(selectedItem){//NOTE: FunÃ§Ã£o do leave do Zoom
			if(selectedItem.inputId == 'nomeCurso'){
				this.filterValues = "CODCURSO,"+selectedItem.CODCURSO;
				window[_global.objVars.utils].byFluig.zoomReloadFilter('nomeDisciplina', this.filterValues);

			}else{
				this.item = selectedItem.inputId.replace(/[0-9]+/g, '');
				this.zoomName = this.item.replace('___', '');
				this.id = selectedItem.inputId.replace(this.zoomName+'___', ''); //NOTE: Id do zoomfield no PaixFilho
				if (this.zoomName != '' && this.zoomName != null && this.zoomName == ''){

				}
			}
			window[_global.objVars.utils].byFluig.zoomRemoveDiplay('#'+selectedItem.inputId);
		},
		zoomRemoveDiplay: function(input){//NOTE: FunÃ§Ã£o para tratar campo zoom no fluig
			$(input).parent('div').find('div.bootstrap-tagsinput.bootstrap-tagsinput-max').find('span.tag.tag-gray').find('span[data-role=remove]').on('click', function(){
				$(input).parent('div.input-group.fs-full-width').find('div.bootstrap-tagsinput').find('span.fluig-typeahead').show();
			});
		},
		zoomReloadFilter: function(element, value){//NOTE: FunÃ§Ã£o do reload filters do Zoom
			this.filter = value;
			if(this.filter != null && this.filter != ''){
				reloadZoomFilterValues(element, this.filter);				
			}
		},
		openModal: function(id, title, content, size, button) {
			this.size = ((size == undefined) ? 'large': size); //NOTE: full | large | small
			this.actions = new Array();
			if(button != null && button.length > 0){
				for(var i = 0; i < button.length; i++){
					this.actions.push({
						'label': button[i].label,
						'bind': 'data-open-'+(button[i].label.replace(' ', '-')).toLowerCase(),
						'classType': 'btn-'+button[i].type,
						'autoClose': button[i].autoClose
					});
				}
			}else if(button != null){
				this.actions.push({
					'label': 'Cancelar',
					'bind': 'data-open-cancelar',
					'classType': 'btn-danger',
					'autoClose': true
				});
			}else{
				this.actions.push({
					'label': 'Fechar',
					'bind': 'data-open-fechar',
					'classType': 'btn-primary',
					'autoClose': true
				});
			}
			if(components.myModal[id] != undefined){
				components.myModal[id].remove();
			}			
			components.myModal[id] = FLUIGC.modal({
				title: 		title,
				content: 	content,
				id: 		'fluig-modal',
				size: 		this.size,
				actions: 	this.actions
			}, function(err, data) {
				if(err) {
					// do error handling
				} else {
					// do something with data
				}
			});
		},
		progressBarShow: function() {
			$('div#progressBar').parent('div.progress').slideDown('slow');
			$('div#progressBar').css('width', '0%');
			$('div#progressBar').html('0%');
		},
		progressBarHide: function() {
			$('div#progressBar').css('width', '100%');
			$('div#progressBar').html('100%%');
			$('div#progressBar').parent('div.progress').slideUp('slow').delay(800);
		},
		progressBarIncrement: function(progress) {						
			this.i_num = (parseInt(parseFloat(progress) * 100) / 100);
			$('div#progressBar').css('width', this.i_num+'%');
			$('div#progressBar').html(this.i_num+'%');
		}
};

MyUtils.prototype.byMessage = {
		messageAlert: function (titulo, mensagem){//NOTE: FunÃ§Ã£o Mensagem de alerta customizado fluig
			FLUIGC.message.alert({
				title: titulo,
				message: mensagem,
				label: 'OK'
			}, function(el, ev) {

			});
		},
		messageConfirm: function(titulo, mensagem){
			FLUIGC.message.confirm({
				title: titulo,
				message: mensagem,
				labelYes: 'Sim',
				labelNo: 'NÃ£o'
			}, function(result, el, ev) {
				return result;
			});
		},
		messageError: function(titulo, mensagem, detalhes) {
			FLUIGC.message.error({
				title: titulo,
				message: mensagem,
				details: detalhes
			}, function(el, ev) {

			});
		},
		alertSuccess: function(titulo, mensagem) {
			FLUIGC.toast({
				title: titulo,
				message: mensagem,
				type: 'success',
				timeout: 'slow'
			});
		},
		alertWarning: function(titulo, mensagem) {
			FLUIGC.toast({
				title: titulo,
				message: mensagem,
				type: 'warning',
				timeout: 'slow'
			});
		},
		alertInfo: function(titulo, mensagem) {
			FLUIGC.toast({
				title: titulo,
				message: mensagem,
				type: 'info',
				timeout: 'slow'
			});
		},
		alertError: function(titulo, mensagem) {
			FLUIGC.toast({
				title: titulo,
				message: mensagem,
				type: 'danger',
				timeout: 'slow'
			});
		}
};

MyUtils.prototype.byLoading = {
		loadDefault: function() {
			$('body').on('keypress', '[data-only-numbers]', function(ev) {//NOTE: permite digitar somente numeros
				var k = ev.keyCode || ev.which;//NOTE: Permite apagar o conteÃºdo do campo usando as teclas 'backspace' ou 'delete' no firefox. Nos outros navegadores o keypress nÃ£o gera evento.
				if(k == 8 || k == 46){
					return true;
				}
				k = String.fromCharCode(k);
				if(isNaN(k)){
					return false;
				}
				return true;
			});
			$('.create-form-components').on('keyup', 'input[required="required"][type="text"], input[required="required"][type="number"], input[required="required"][type="date"], textarea[required="required"]', function() {
				validationFieldsForm($(this), $(this).parents( '.form-field').data('type'));
			});
			$('.create-form-components').on('change', 'input[required="required"][type="checkbox"], input[required="required"][type="radio"], select[required="required"]', function() {
				validationFieldsForm($(this), $(this).parents('.form-field').data('type'));
			});
			function validationFieldsForm(field, type) {
				if (type === "checkbox" || type === "radio") {
					if(!field.is(':checked')){
						field.parents('.form-field').addClass('required');
					}else{
						field.parents('.form-field').removeClass('required');
					}
				}else{
					if(!field.val().trim()){
						field.parents('.form-field').addClass('required');
					}else{
						field.parents('.form-field').removeClass('required');
					}
				}
			}
			var $zoomPreview = $(".zoom-preview");
			if($zoomPreview.length){
				$zoomPreview.parent().removeClass("input-group");
				$zoomPreview.remove();
			}
			var ratings = $(".rating");
			if(ratings.length > 0){
				ratingStars(ratings);
			}
			function ratingStars(stars){
				$.each(stars, function(i, obj) {
					var field = $(this).closest(".form-group").find(".rating-value");
					var tgt = $(obj);
					tgt.html("");
					var rating = FLUIGC.stars(tgt, {
						value : field.val()
					});
					rating.on("click", function(o) {
						field.val($(this).index() + 1);
					});
				});
			}
			$.each($("[data-date]"), function(i, o) {
				var id = $(o).parent().attr("id");
				if(id !== undefined){
					FLUIGC.calendar("#" + id);
				}
			});
			$.each($('table[tablename]'), function(){
				$(this).find('tbody').find('tr.tableHeadRow:first').hide();
				$(this).find('thead').find('tr.tableHeadRow:first').append('<th></th>');
				$(this).find('tbody').find('tr.tableHeadRow:first').append('<td><span class="fluigicon fluigicon-trash fluigicon-md" data-removeChild></span></td>');
			});
			$.each($('span[data-removechild]'), function(){
				$(this).on('click', function(){
					var element = $(this).closest('table[tablename]').attr('id');
					if($('table#'+element).find('tbody').find('tr.tableHeadRow').length > 1){
						$(this).closest('tr.tableHeadRow').remove();
					}
				});
			});			
		}
};

MyUtils.prototype.byRecordRM = {
		loadrec_rm: function(myXML, dataset) {
			this.fieldsXml = myXML;
			this.dataset = dataset;
			if (window[_global.objVars.utils].byRecordRM.record_rm(this.fieldsXml, this.dataset)){
				return true;
			}else{
				return false;
			}
		},		
		record_rm: function(myXML, dataset) {
			this.cts = DatasetFactory.createConstraint('fieldsXml', myXML, myXML, ConstraintType.MUST);
			this.constraints = new Array(this.cts);
			this.gravaRM = DatasetFactory.getDataset(dataset, null, this.constraints, null);
			if (this.gravaRM.values.length > 0){
				if(this.gravaRM.values.length == 1 && this.gravaRM.values[0].ERROR === undefined && this.gravaRM.values[0].RESULT != null){
					this.result = this.gravaRM.values[0].RESULT;
					window[_global.objVars.utils].byRecordRM.setrecord_rm(dataset, this.result);
					window[_global.objVars.utils].byMessage.alertSuccess("Sucesso", "GravaÃ§Ã£o realizada com Sucesso!");
					return true;
				}else{
					var mensagem = "<h3 class=\"text-danger\">Erro para gravar o registro, contate o Administrador</h3>";
					window[_global.objVars.utils].byMessage.messageError("ERRO", mensagem, gravaRM.values[0].ERROR);
					return false;
				}
			}else{
				var mensagem = "<h3 class=\"text-danger\">Erro na Comunica&ccedil;&atilde;o com o TOTVS TBC - RM!</h3>";
				window[_global.objVars.utils].byMessage.messageError("ERRO", mensagem, "Contate o Administrador.");
				return false;
			}
		},
		getrecord_rm: function(key) {
			return components.recordRm[key];
		},
		setrecord_rm: function(key, value) {
			components.recordRm[key] = value;
		},
};
