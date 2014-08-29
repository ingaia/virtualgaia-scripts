	// JavaScript Documentfunction inc(filename)
String.prototype.formatCurrency = formatamoney;
http_request = false;
var intervalo;
var rodadestaque = 0;
//imports("http://valueimob.e-value.com.br/scripts/timer.js");


//  ---------------------------------------
function imports(filename){
	var head = document.getElementsByTagName('head').item(0);
	script = document.createElement('script');
	script.src = filename;
	script.type = 'text/javascript';
	script.charset = "iso-8859-1";
	head.appendChild(script);
}

	function validaCod(limit)
	{
		var cod = document.getElementById("pg");
		if(cod.value == "")
		{
			alert("Informe a página");
			cod.focus();
			return false;
		}
		return true;
		if(cod.value > Number(limit))
		{ 
			alert("Página fora do indice, informe a página de 1 a "+limit);
			cod.focus();
			return false;
		}
		return true;
	}

//  ---------------------------------------
function validaBusca(){
//  ---------------------------------------
	var cidade = document.getElementById('cidade');
	var tipo = document.getElementById('tipo');
	var finalidade = document.getElementById('finalidade');
	var valormin = document.getElementById('valormin');
	var valormax = document.getElementById('valormax');

	if(tipo.value == '') {
		alert('Informe o tipo do imóvel.');
		tipo.focus();
		return false;
	}
	//if(finalidade.value == '') {
	//	alert('Informe a finalidade.');
	//	finalidade.focus();
	//	return false;
	//}
	if(valormin.value == '') {
		alert('Informe o valor mínimo.');
		valormin.focus();
		return false;
	}
	if(valormax.value == '') {
		alert('Informe o valor máximo.');
		valormax.focus();
		return false;
	}
	//if(valormin.value > valormax.value) {
		//alert('Informe o valor mínimo menor que o valor máximo.');
		//valormin.focus();
		//return false;
	//}
	if(cidade.value == '') {
		alert('Informe a cidade.');
		cidade.focus();
		return false;
	}
	return true;
}

function formatamoney(c) {
//  ---------------------------------------
	var t = this;
	if(c == undefined)
		c = 2;
	var p, d = (t=t.split("."))[1].substr(0, c);
	for(p = (t=t[0]).length; (p-=3) >= 1;) {
		t = t.substr(0,p) + "." + t.substr(p);
	}
	return t+","+d+Array(c+1-d.length).join(0);
}
  //Funcao somente numeros	
var nav4 = window.Event ? true : false;
function numeros(evt){
// NOTE: Backspace = 8, Enter = 13, '0' = 48, '9' = 57
var key = nav4 ? evt.which : evt.keyCode;
return (key <= 13 || (key >= 48 && key <= 57));
}



function MascaraMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e){
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
	//SeparadorDecimal = '.';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    if (whichCode == 13) return true;
	if (whichCode == 8) return true;
	key = String.fromCharCode(whichCode); // Valor para o código da Chave	
    if (strCheck.indexOf(key) == -1) return false; // Chave inválida
    len = objTextBox.value.length;
    for(i = 0; i < len; i++)
        if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;
    aux = '';
    for(; i < len; i++)
        if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);
    aux += key;
    len = aux.length;
    
    if (len > 0) {
        aux2 = '';
        for (j = 2, i = len - 3; i >= 0; i--) {
            if (j == 3) {
                aux2 += SeparadorMilesimo;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        objTextBox.value = '';
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
        objTextBox.value += aux2.charAt(i);
        objTextBox.value += aux.substr(len - 2, len);		
    }
    return false;
}



function demaskvalue(valor, currency) {
//  ---------------------------------------
	/*
	* Se currency é false, retorna o valor sem apenas com os números. Se é true, os dois últimos caracteres são considerados as 
	* casas decimais
	*/
	var val2 = '';
	var strCheck = '0123456789';
	var len = valor.length;
	if (len== 0) {
		return 0.00;
	}

	if (currency ==true) {
		/* Elimina os zeros à esquerda
		* a variável  <i> passa a ser a localização do primeiro caractere após os zeros e 
		* val2 contém os caracteres (descontando os zeros à esquerda)
		*/

		for(var i = 0; i < len; i++)
			if ((valor.charAt(i) != '0') && (valor.charAt(i) != ','))
				break;

		for(; i < len; i++) {
			if (strCheck.indexOf(valor.charAt(i))!=-1)
				val2+= valor.charAt(i);
		}

		if(val2.length==0)
			return "0.00";
		if (val2.length==1)
			return "0.0" + val2;
		if (val2.length==2)
			return "0." + val2;
		var parte1 = val2.substring(0,val2.length-2);
		var parte2 = val2.substring(val2.length-2);
		var returnvalue = parte1 + "." + parte2;
		return returnvalue; 

	} else {
		/* currency é false: retornamos os valores COM os zeros à esquerda,
		* sem considerar os últimos 2 algarismos como casas decimais 
		*/
		val3 ="";
		for(var k=0; k < len; k++) {
			if (strCheck.indexOf(valor.charAt(k))!=-1)
				val3+= valor.charAt(k);
		}
		return val3.substring(0,val3.length-2);
	}
}

function reais(obj,event) {
//  ---------------------------------------

	var whichCode = (window.Event) ? event.which : event.keyCode;
	if(!whichCode)
	    whichCode = event.keyCode;
	/*
	Executa a formatação após o backspace nos navegadores !document.all
	*/
	if (whichCode == 8 && !document.all) {
		/*
		Previne a ação padrão nos navegadores
		*/
		if (event.preventDefault) { //standart browsers
			event.preventDefault();
		} else { // internet explorer
			event.returnValue = false;
		}
		var valor = obj.value;
		var x = valor.substring(0,valor.length-1) + "00";
		x= demaskvalue(x,true).formatCurrency();
		
		obj.value= x.substring(0, x.length -3);
		
		return false;
	}
	/*
	Executa o Formata Reais e faz o format currency novamente após o backspace
	*/
	FormataReais(obj,'.',',',event);
} // end reais



function reais_old(obj,event) {
//  ---------------------------------------

	var whichCode = (window.Event) ? event.which : event.keyCode;
	/*
	Executa a formatação após o backspace nos navegadores !document.all
	*/
	if (whichCode == 8 && !document.all) {
		/*
		Previne a ação padrão nos navegadores
		*/
		if (event.preventDefault) { //standart browsers
			event.preventDefault();
		} else { // internet explorer
			event.returnValue = false;
		}
		var valor = obj.value;
		var x = valor.substring(0,valor.length-1);
		obj.value= demaskvalue(x,true).formatCurrency();
		return false;
	}
	/*
	Executa o Formata Reais e faz o format currency novamente após o backspace
	*/
	FormataReais(obj,'.',',',event);
} // end reais


function backspace(obj,event) {
//  ---------------------------------------
	/*
	Essa função basicamente altera o  backspace nos input com máscara reais para os navegadores IE e opera.
	O IE não detecta o keycode 8 no evento keypress, por isso, tratamos no keydown.
	Como o opera suporta o infame document.all, tratamos dele na mesma parte do código.
	*/

	var whichCode = (window.Event) ? event.which : event.keyCode;
	if(!whichCode)
	    whichCode = event.keyCode;
	if (whichCode == 8 && document.all) {
		var valor = obj.value;
		var x = valor.substring("",valor.length-1) + "00";
		var y = demaskvalue(x,true).formatCurrency();
		
		x = x.substring();
		
		obj.value = ""; //necessário para o opera
		if(y.length != 3)
		{
			obj.value += y.substring(0, y.length -3);
		}
		

		
		if (event.preventDefault) { //standart browsers
			event.preventDefault();
		} else { // internet explorer
			event.returnValue = false;
		}
		return false;

	}// end if
}// end backspace

function backspace_old(obj,event) {
//  ---------------------------------------
	/*
	Essa função basicamente altera o  backspace nos input com máscara reais para os navegadores IE e opera.
	O IE não detecta o keycode 8 no evento keypress, por isso, tratamos no keydown.
	Como o opera suporta o infame document.all, tratamos dele na mesma parte do código.
	*/

	var whichCode = (window.Event) ? event.which : event.keyCode;
	if (whichCode == 8 && document.all) {
		var valor = obj.value;
		var x = valor.substring("",valor.length-1);
		var y = demaskvalue(x,true).formatCurrency();

		obj.value =""; //necessário para o opera
		obj.value += y;

		if (event.preventDefault) { //standart browsers
			event.preventDefault();
		} else { // internet explorer
			event.returnValue = false;
		}
		return false;

	}// end if
}// end backspace


function FormataReais(fld, milSep, decSep, e) {
	                                var sep = 0;
	                                var key = '';
	                                var i = j = 0;
	                                var len = len2 = 0;
	                                var strCheck = '0123456789';
	                                var aux = aux2 = '';
	                                var whichCode = (window.Event) ? e.which : e.keyCode;
	                                if(!whichCode)
	                                    whichCode = e.keyCode;

	                                //if (whichCode == 8 ) return true; //backspace - estamos tratando disso em outra função no keydown
	                                if (whichCode == 0 )
		                                return true;
	                                if (whichCode == 9 )
		                                return true; //tecla tab
	                                if (whichCode == 13)
		                                return true; //tecla enter
	                                if (whichCode == 16)
		                                return true; //shift internet explorer
	                                if (whichCode == 17)
		                                return true; //control no internet explorer
	                                if (whichCode == 27 )
		                                return true; //tecla esc
	                                if (whichCode == 34 )
		                                return true; //tecla end
	                                if (whichCode == 35 )
		                                return true;//tecla end
	                                if (whichCode == 36 )
		                                return true; //tecla home

	                                /*
	                                O trecho abaixo previne a ação padrão nos navegadores. Não estamos inserindo o caractere normalmente, mas via script
	                                */

	                                if (e.preventDefault) { //standart browsers
		                                e.preventDefault()
	                                } else { // internet explorer
		                                e.returnValue = false
	                                                }

	                                                var key = String.fromCharCode(whichCode);  // Valor para o código da Chave
	                                if (strCheck.indexOf(key) == -1)
		                                return false;  // Chave inválida

	                                /*
	                                Concatenamos ao value o keycode de key, se esse for um número
	                                */
	                                fld.value += key;

	                                var len = fld.value.length;
									fld.value += "00";
									
									var bodeaux = "";
	                                var bodeaux = demaskvalue(fld.value,true).formatCurrency();
									
									bodeaux=bodeaux.substring(0, bodeaux.length -3);
	                                fld.value=bodeaux;

	                                /*
	                                Essa parte da função tão somente move o cursor para o final no opera. Atualmente não existe como movê-lo no konqueror.
	                                */
	                                if (fld.createTextRange) {
		                                var range = fld.createTextRange();
		                                range.collapse(false);
		                                range.select();
	                                } else if (fld.setSelectionRange) {
		                                fld.focus();
		                                var length = fld.value.length;
		                                fld.setSelectionRange(length, length);
	                                }
	                                return false;

                                }
//Exibe Campo Av
function exibe(x) {
	var obj = document.getElementById(x);
	var btn = document.getElementById('btnAv');
	if(obj.style.display == "block") {
		$("#buscaAv").slideUp("slow", function(){
			obj.style.display = "none";
		});
		//btn.value = 'Busca Avançada';
	} else {				
		obj.style.display = "block";
		$("#buscaAv").slideDown("slow");		
	//	btn.value = 'Ocultar Busca Avançada';
	}

}
//Exibe Campo Av
function exibe2(x,name) {
	var obj = document.getElementById(x);
	var btn = document.getElementById('btnAv');
	if(obj.style.display == "block") {
		$("#buscaAv").slideUp("slow", function(){
			obj.style.display = "none";
		});
	//	btn.value = name;
	} else {				
		obj.style.display = "block";
		$("#buscaAv").slideDown("slow");		
	//	btn.value = name;
	}

}
//  ---------------------------------------
// AJAX
function makeRequest(url,funcao) {
	http_request = false;
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/xml');
			// See note below about this line
		}
	} else if (window.ActiveXObject) { // IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	if (!http_request) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	http_request.onreadystatechange = funcao;
	http_request.open('GET', url, true);
	http_request.send(null);

}

//  ---------------------------------------
function destaquesRandomicos() {
	var imoveisDestaques = document.getElementById("imoveisDestaques");
	//document.write("asdds");	
	//var carregados = imoveisDestaques.getElementsByTagName("div");
	//if(carregados[1].getAttribute("class") == "imobDestaque"){
		makeRequest("inc_destaques.aspx",function(){chamaDestaque(imoveisDestaques);});
	//}
}

//  ---------------------------------------
function chamaDestaque(tag) {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			//alert(http_request.responseText);
			tag.style.opacity = (0 / 100);
			tag.style.MozOpacity = (0 / 100);
			tag.style.KhtmlOpacity = (0 / 100);
			tag.style.filter = "alpha(opacity=" + 0 + ")";			
			tag.innerHTML = http_request.responseText;						
			opacity(tag.id, 0, 100, 2000);			
		} else {
			clearInterval(intervalo);
		}
	}
}
function RefreshDest(){
	
	var imoveisDestaques = document.getElementById("imoveisDestaques");
	if(imoveisDestaques){
			intervalo = setInterval(destaquesRandomicos,100);
	}
}


function MM_validateForm() {
//  ---------------------------------------
	if (document.getElementById) {
		var i,p,q,nm,test,num,min,max,errors='',args=MM_validateForm.arguments;
		firstField = new Array();
		for (i=0; i<(args.length-2); i+=4) {
			test=args[i+2];
			label = args[i+3];
			val=document.getElementById(args[i]);
			if (val) {
				nm=val.name;
				elInput = val;
				elInput.className = "";
				if ((val=val.value)!="") {
					if (test.indexOf('isEmail')!=-1) {
						p=val.indexOf('@');
						if (p<1 || p==(val.length-1)) {
							errors+='- '+label+' inválido.\n';
							elInput.className = "campoErrado";
							firstField.push(elInput);
						}
					} else if (test!='R') {
						num = parseFloat(val);
						if (isNaN(val)) {
							errors+='- '+label+' deve ser um número válido.\n';
							elInput.className = "campoErrado";
							firstField.push(elInput);
						}
						if (test.indexOf('inRange') != -1) {
							p=test.indexOf(':');
							min=test.substring(8,p);
							max=test.substring(p+1);
							if (num<min || max<num) {
								errors+='- '+label+' deve ser um número entre '+min+' e '+max+'.\n';
								elInput.className = "campoErrado";
								firstField.push(elInput);
							}
						}
					}
				} else if (test.charAt(0) == 'R') {
					errors += '- '+label+' é obrigatório.\n';
					elInput.className = "campoErrado";
					firstField.push(elInput);
				}
			}
		}
		if (errors) {
			alert('Os seguintes erros ocorreram:\n'+errors);
			firstField[0].focus();
		}
		document.MM_returnValue = (errors == '');
	}
}

function check(field) {
        
            for (i = 0; i < field.length; i++) {
                field[i].checked = false;
            }
			field[0].checked = true;
            return true;     
		
}
function FechaBar()
{
	var doc = document.getElementById("divbairro");
	doc.style.display = "none";
}
function isIE() {
//  ---------------------------------------
	browser = window.navigator.appName;
	versao = window.navigator.appVersion
	         nm = browser.indexOf("Microsoft Internet Explorer");
	nv = versao.indexOf("MSIE 7");
	if(nm > 0) {
		if(nv < 0) {
			return "IE6";
		} else {
			return "IE7";
		}
	} else {
		return false;
	}
}
function opacity(id, opacStart, opacEnd, millisec) {
	// speed for each frame
	var speed = Math.round(millisec / 100);
	var timer = 0;

	// determine the direction for the blending, if start and end are the same nothing happens
	if(opacStart > opacEnd) {
		for(i = opacStart; i >= opacEnd; i -- ) {
			setTimeout("changeOpac(" + i + ",'" + id + "')", (timer * speed));
			timer ++ ;
		}
	} else if(opacStart < opacEnd) {
		for(i = opacStart; i <= opacEnd; i ++ ) {
			setTimeout("changeOpac(" + i + ",'" + id + "')", (timer * speed));
			timer ++ ;
		}
	}
}

//  ---------------------------------------
function changeOpac(opacity, id) {
	var object = document.getElementById(id).style;
	object.opacity = (opacity / 100);
	object.MozOpacity = (opacity / 100);
	object.KhtmlOpacity = (opacity / 100);
	object.filter = "alpha(opacity=" + opacity + ")";
}

//  ---------------------------------------
function todosBairros(){
	var divbairro = document.getElementById("divbairro");
	if(divbairro){
		var todos = document.getElementById("todos");
		if(todos){
			todos.onclick = function(){	
				if(this.checked == true){
					desmarcaTodosBairros();
				}
				pintaBairros();			
			}
			var allBairros = divbairro.getElementsByTagName("input");
			for(i = 1; i < allBairros.length; i++){
				allBairros[i].onclick = function(){
					var todos = document.getElementById("todos");
					if(todos.checked == true){
						todos.checked = false;
					}
					pintaBairros();
				}
			}
			pintaBairros();
		}
	}
}
function desmarcaTodosBairros(){
	$("#divbairro input").attr({"checked":false})
	$("#divbairro #todos").attr({"checked":true})
}

function pintaBairros(){
	var divbairro = document.getElementById("divbairro");		
	var allBairros = divbairro.getElementsByTagName("input");
	for(i = 0; i < allBairros.length; i++){
		if(allBairros[i].checked == true){
			allBairros[i].parentNode.className = "bairroSelecionado";
		}else{
			allBairros[i].parentNode.className = "";
		}
	}

}
function limpaTabelas(){
	$("table").removeAttr("border");
	$("table").removeAttr("cellspacing");
	$("table").removeAttr("rules");
	$("table").removeAttr("style");
}

function RodaImbs(){
	

	if(document.getElementById("imoveisDestaques")){
		if(document.getElementById("imoveisDestaques").title){
	    	time = document.getElementById("imoveisDestaques").title;
		}else{
			time = 15000;
		}
	   intervalo = setInterval(function(){
			i = Math.round(1000*Math.random())	
			rodadestaque = rodadestaque+1;
			if(rodadestaque <= 3)
			{							 
			$.ajax({
			type: "GET",
			url: "inc_destaques.aspx",
			data: "novo=" + i+'-'+rodadestaque,
			cache: false,
			datatype: "html",

			success: function(msg){
				html = msg;
				$("#imoveisDestaques").fadeOut('slow', function(){
					$(this).empty();
					$(this).html(html).fadeIn('slow');
				});
			}
		});
		}
								 },time);
		}
	
}

document.oncontextmenu=new Function("return false");

function CarregaUnload()
{
	GUnload();
}

$(document).ready(
	function(){
    $('#tipo').change(function(){
		condTipos($(this));
	}).change();
	condTipos($("#tipo"));
	todosBairros();	
	limpaTabelas();
	RodaImbs();
	$("#condfechado, label[for='condfechado']").parent().remove();
});

function condTipos(obj){
	var valorCombo;
	var html;
	$(".condAutoShow").remove();
	
	valorCombo = obj.find("option:selected").text();
	valorCombo = valorCombo.toUpperCase();
	valorCombo = valorCombo.replace(/^\s+|\s+$/g,"")

	if(valorCombo == "CASA" || valorCombo == "TERRENO"){
		html = "<dt class='condAutoShow'><label for='condfechado'>Condomínio fechado?</label></dt><dd class='condAutoShow'><select name='condfechado' id='condfechado'><option value=''>Todos</option><option value='Sim'>Sim</option><option value='Não'>Não</option></select></dd>";
		obj.parent().after(html);
	}
	if(valorCombo == "APARTAMENTO"){
	html = "<dt class='condAutoShow'><label for='cobertura'>Cobertura?</label></dt><dd class='condAutoShow'><select name='cobertura' id='cobertura'><option value=''>Todos</option><option value='7'>Sim</option><option value='0'>Não</option></select></dd>";
		obj.parent().after(html);
	}
}
//window.onload = CarregaPagina;
//window.unload = CarregaUnload;
$(function(){
	
	if($("#cidade").attr("class") == "cbocidade"){	
		$("#cidade").change(function(){
			BairroHTML = "";
			$.ajax({
				beforeSend: function(){
					$("#divbairro").html("<center>Aguarde, carregando os bairros</center>");
				},
				url: "jsonbairro.aspx",
				data: "cod_cid=" + $(this).val(),
				dataType: "json",
				success: function(json){
					if($("#imvBusca").length > 0)
						BairroHTML += bairrosEmSelect(json);
					else
						BairroHTML += bairrosEmChecks(json);					

					$("#divbairro").html(BairroHTML);
					todosBairros();
				},
				error: function(){
					if($("#imvBusca").length > 0)
						$("#divbairro").html('<select id="bairro" name="bairro"><option id="todos" selected="selected" value="">Selecione uma cidade</option></select>');
					else
						$("#divbairro").html("<center>Escolha alguma cidade</center>");
				}
			});
		}).change();
	}
	function bairrosEmChecks(json){
		BairroHTML = "";
		BairroHTML += '<div class="">';
		BairroHTML += '<input type="checkbox" checked="checked" id="todos" value="" name="bairro"/>';
		BairroHTML += '<label for="todos"> Todos os bairros</label>';
		BairroHTML += '</div>';			
		for(i = 0; i < json.bairros.length; i++){
			BairroHTML += '<div class="">';
			BairroHTML += '<input type="checkbox" id="' + json.bairros[i].bairro + '" value="' + json.bairros[i].id + '" name="bairro"/>';
			BairroHTML += '<label for="' + json.bairros[i].bairro + '"> ' + json.bairros[i].bairro + '</label>';					
			BairroHTML += '</div>';
		}
		return(BairroHTML);
	}
	function bairrosEmSelect(json){
		BairroHTML = "";
		BairroHTML += '<select id="bairro" name="bairro">';
		BairroHTML += '<option id="todos" selected="selected" value="">Todos os Bairros</option>';
		for(i = 0; i < json.bairros.length; i++){
			BairroHTML += '<option value="' + json.bairros[i].id + '">';
			BairroHTML += json.bairros[i].bairro;					
			BairroHTML += '</option>';
		}
		BairroHTML += '</select>';		
		return(BairroHTML);		
	}
});

$(document).ready(function(){

		$("#frmBuscaAjax").submit(function(){
		    if($("#cod_jb").val() != "" || $("#cod_jb").val() != "Código")
		    {
		        $.ajax({
		            type: "POST",
		            url: "busca-codigo.aspx",
		            dataType: "json",
		            data: "cod_jb=" + $("#cod_jb").val(),
		            success : function(msg)
		            {
		                //alert(msg.busca_rapida.length);
		                if(msg.busca_rapida.length == 0)
		                    location.href = "naoencontrou.aspx";
		                
		                if(msg.busca_rapida.length == 1)
		                    location.href = "detalhes.aspx?pret=" + msg.busca_rapida[0].pret + "&cod_jb=" + $("#cod_jb").val();
		                
		                if(msg.busca_rapida.length > 1) 
		                    location.href = "listagem.aspx?cod_jb=" + $("#cod_jb").val();
		            }
		        });
		    }
		    return false;
		});

});