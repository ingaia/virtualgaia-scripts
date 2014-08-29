$(document).ready(function(){
						   
	$('#slideDestaquesVenda').after('<div id="barraDestaquesVenda">').cycle({ 
		next: "#super_destaque .next",
		prev: "#super_destaque .prev",
		fx:              'fade,growX,growY,wipe', 
        randomizeEffects: false, 
		speed: 200,
		timeout: 6000, 
		pager:  '#barraDestaquesVenda' 
	});
	
	$("#cycleSlide").jCarouselLite({
		btnNext: "#destaqueGrande .next",
		btnPrev: "#destaqueGrande .prev",
		auto: 15000,
		speed: 800,
		visible: 3,
		cleartype: 0
	});
	
	$('.parceiros').cycle({ 
		next: "#parceiros .next",
		prev: "#parceiros .prev",
		fx:     'scrollLeft', 
		speed:  800, 
		timeout: 6000, 
		cleartypeNoBg:true 
	});
	
	$("#site #tipos .vertodos").corner("6px");
	$("#site #bairros .vertodos").corner("6px");
	$("#site .negocieImovel .vertodos").corner("6px");
	$("#site .conheca .vertodos").corner("6px");
	$(".boxlistagem .condominio .botoes a").corner("5px");
	$("#site #parceiros .vertodos").corner("5px");
	
});

//Mascara Telefone
$(document).ready(function(){
	$("#Telefone").mask("(99) 9999-9999");
	$("#Telefone2").mask("(99) 9999-9999");
	$("#Celular").mask("(99) 9999-9999");	
	$("#Celular2").mask("(99) 9999-9999");	
	$("#Telefone_imobiliaria").mask("(99) 9999-9999");	
	$("#Telefone_comercial").mask("(99) 9999-9999");
	$("#Telefone_comercial_conjuge").mask("(99) 9999-9999");
	$("#Telefone_banco").mask("(99) 9999-9999");	
	$("#Telefone_banco2").mask("(99) 9999-9999");	
	$("#Telefone_empresa_contato").mask("(99) 9999-9999");
	$("#Telefone_empresa_contato2").mask("(99) 9999-9999");
	$("#Telefone_residencial").mask("(99) 9999-9999");
	$("#Telefone_banco3").mask("(99) 9999-9999");
	$("#Telefone_empresa_contato3").mask("(99) 9999-9999");
	$("#Telefone_locador").mask("(99) 9999-9999");
	$("#Telefone_conjuge").mask("(99) 9999-9999");
	$("#Celular_conjuge").mask("(99) 9999-9999");
	$("#Telefone_Residencial").mask("(99) 9999-9999");
	$("#Telefone_Comercial").mask("(99) 9999-9999");
	$("dd #telefone").mask("(99) 9999-9999");	
	$("#celular").mask("(99) 9999-9999");	
	$("#Fax").mask("(99) 9999-9999");	
	$("#Celular_locador").mask("(99) 9999-9999");
	$("#tx_telefone").mask("(99) 9999-9999");
	
	$("#Data_nascimento").mask("99/99/9999");
	$("#Data_nascimento_conjuge").mask("99/99/9999");
	$("#Data_Nascimento").mask("99/99/9999");	
	
	$("#Cpf").mask("999.999.999-99");
	$("#Cpf_conjuge").mask("999.999.999-99");	
	
	$("#Cep").mask("99999-999");
	$("#Cep_locador").mask("99999-999");
	$("#Cep_conjuge").mask("99999-999");
	
	$("#txtArea").maskDecimal();
	$("#txtAreaTot").maskDecimal();
	$("#Area_construida").maskDecimal();
	$("#Valor").maskMoney();
	$("#Valor_condominio").maskMoney();		

	
});






