Number.prototype.formatMoney = function(c, d, t){
	var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}; 
function buscaSlider(divBusca){
	var tipos_em_grupo = false;
	var objTipos = new Object([
		 {id: 0, name: "Todos", min:1000, max:1000000, dorm: false, vagas: false, area_util: true} 
		,{id: 2, name: "Apartamento", min:50000, max:1000000, dorm: true, vagas: true, area_util: true} 
		,{id: 5, name: "Área", min:10000, max:1000000, area_total: true}
		,{id: 6, name: "Barracao", min:50000, max:1000000, vagas: true, area_total: true}
		,{id: 7, name: "Casa", min:50000, max:1000000, dorm: true, vagas: true, area_construida: true}
		,{id: 8, name: "Chácara", min:50000, max:1000000, dorm: true, vagas: true, area_total: true}
		,{id: 11, name: "Fazenda", min:100000, max:5000000, area_total: true}
		,{id: 12, name: "Galp&atilde;o", min:50000, max:1000000, vagas: true, area_total: true}
		,{id: 14, name: "Haras", min:100000, max:5000000, area_total: true}
		,{id: 15, name: "Ponto", min:50000, max:3000000, vagas: true, area_util: true}
		,{id: 16, name: "Prédio", min:100000, max:5000000, area_construida: true}
		,{id: 17, name: "Sala", min:10000, max:500000, vagas: true, area_util: true}
		,{id: 18, name: "Salao", min:100000, max:10000000, vagas: true, area_util: true}
		,{id: 19, name: "Sítio", min:50000, max:1000000, area_total: true}
		,{id: 20, name: "Terreno", min:5000, max:1000000, area_total: true}	
		,{id: 22, name: "Kitnet", min:20000, max:500000, dorm: true, vagas: true, area_util: true, area_total: false}	
		,{id: 23, name: "Flat", min:50000, max:3000000, dorm: true, vagas: true, area_util: true, area_total: false}	
		,{id: 24, name: "Cobertura", min:100000, max:2000000, dorm: true, vagas: true, area_util: true, area_total: false}
		,{id: 25, name: "Sobrado", min:50000, max:1000000, dorm: true, vagas: true, area_construida: true}
		,{id: 26, name: "Loja", min:50000, max:3000000, vagas: true, area_util: true}	
		,{id: 27, name: "Conjunto", min:50000, max:3000000, dorm: false, vagas: true, area_construida: true}		
	]);
	
	$(function(){
			//divBusca.find("a.thickbox").Thickbox();
			tb_init("a.thickbox");
			if(divBusca.length > 0){
				
				divBusca.find("form").submit(function(){
					if($("#cidade").val() != "")
						return(true);
					else
						return(false);
				});
				
//				$("#cidade").change(function(){
//					if($("#cidade").val() != ""){
//						$("#ddlBairro").attr("disabled",false);
//						$("#btnEnviar").attr("disabled",false);
//						$("#btnEnviar").attr("class", "enabled");
//					}
//					else{
//						$("#ddlBairro").attr("disabled",true);
//						$("#btnEnviar").attr("disabled",true);
//						$("#btnEnviar").attr("class", "disabled");
//					}
//					updateBairros("");
//				}).change();
//				
//				$("#ddlBairro").click(function(){
//					link = $("#lnkBairro").attr("href");
//					$("#lnkBairro").attr("href", link + "?idCidade=" + $("#dlcidade").val());
//					$("#lnkBairro").attr("href", link + "?idCidade=" + $("#cidade").val());
//					$("#lnkBairro").trigger("click");
//					$("#lnkBairro").attr("href", link);
//					$(this).blur();	    
//					return false;
//				})

                $("#estado").change(function(){
                    $.ajax({
                        url: "jsonCidade.aspx",
                        data: "estado=" + $(this).val(),
                        dataType: "json",
                        success: function(json){
                            $("#cidade").empty();
                            var selected = " selected=\"selected\" ";
                            var option = "";
                            for(i = 0; i < json.cidades.length; i++){
                                if(selected=="")
                                    option = "<option value=\""+ json.cidades[i].id + "\">";
                                else
                                    option = "<option" + selected + " value=\""+ json.cidades[i].id + "\">";                                  
                                option += json.cidades[i].cidade;
                                option += "</option>";
                                $("#cidade").append(option);
                                selected=""; 
                            }
                        }
                    });
                })
				
				$("#dlcidade").change(function(){
					if($("#dlcidade").val() != ""){
						$("#ddlBairro").attr("disabled",false);					
						$("#btnEnviar").attr("disabled",false);
						$("#btnEnviar").attr("class", "enabled");
						$("#ddlBairro").attr("disabled",false);
	
					}
					else{
						$("#ddlBairro").attr("disabled","disabled");		
						$("#btnEnviar").attr("disabled",true);
						$("#btnEnviar").attr("class", "disabled");
					}
					updateBairros("");
				}).change();
				
				$("#ddlBairro").focus(function(){
					if($("#cidade").val() != ""){
						link = $("#lnkBairro").attr("href");
						//$("#lnkBairro").attr("href", link + "?idCidade=" + $("#cidade").val());
						$("#lnkBairro").trigger("click");
						//console.debug($("#lnkBairro").attr("href"))
						$("#lnkBairro").attr("href", link);
					}
					$(this).blur();	    
					return false;
				})
				
				//CHANGE DAS SELECTS
				$("#ddlPretensao, #ddltipo").change(function(){buscaRapida()}).change();				
				
				//criaSliderValor(new Array(0,0));
				//criaSliderArea(new Array(0,0));
				//criaSliderDorm(false);
			}
	});
	
	function getObjTipo(number){
		if(tipos_em_grupo){
			number = number.substr(0,number.indexOf("|"));
			number = number.split(",")[0];
		}
		for(i = 0; i < objTipos.length; i++){
			if(number == objTipos[i].id){
				//console.debug(objTipos[i]);
				return(objTipos[i]);
			}
        }
        return {};
	}	
	
	function zeraTudo()
	{
		$("#boxEncontreImovel select").each(function(){
			if($(this).attr("disabled") == true)
				$(this).val("");
		});
	}	
	
	function sliderFormat(rotulo, value1, value2, objTo, hidden1, hidden2){

	    var valorMin = 0;
	    var valorMax = 0;

		try{
		    valorMin = ($("#ddltipo").val() != "") ? getObjTipo($("#ddltipo").val()).min : 0;
		    valorMax = ($("#ddltipo").val() != "") ? getObjTipo($("#ddltipo").val()).max : 0;
        } catch (e) {
            //alert(e);
		}
		
		//se estiver tudo zerado
		if(valorMin == 0 && valorMax == 0){
			objTo.html("Valor: <strong>indiferente</strong>");
			$("#label_valor").css("opacity", "0.5");			
		}else{
			if($("#ddlPretensao").val() == 2){
				valorMin = valorMin  * 0.002;
				valorMax = valorMax * 0.002;
			}
			value1Format = value1.formatMoney(0,',','.');
			value2Format = value2.formatMoney(0,',','.');		
			//se a barra estiver no meio
			if(parseInt(value2) < valorMax && parseInt(value1) > valorMin){
				$(hidden1).val(value1Format);
				$(hidden2).val(value2Format);				
				objTo.html(rotulo + ': de <strong>' + value1Format + '</strong> &agrave; <strong>' + value2Format + "</strong>");
			//se a barra estiver nos extremos
			}else if(parseInt(value2) >= valorMax && parseInt(value1) <= valorMin){		
					$(hidden1).val("");
					$(hidden2).val("");
					objTo.html(rotulo + ': <strong>indiferente</strong>');	
			}else{
				//se a barra estiver no canto direito
				if(parseInt(value2) >= valorMax){
					$(hidden1).val(value1Format);
					$(hidden2).val("");
					objTo.html(rotulo + ': de <strong>' + value1Format + '</strong> &agrave; <strong>indiferente</strong>');
				//se a barra estiver no canto esquerdo			
				}else{
					$(hidden1).val("");
					$(hidden2).val(value2Format);
					objTo.html(rotulo + ': <strong>indiferente</strong> &agrave; <strong>' + value2Format + "</strong>");
				}
			}
		}
		return(true);
	}
	
	function sliderFormatArea(valor){
		valor = parseInt(valor);
		if(valor > 0 && valor < 1000){
			$("#txtArea").attr("value",valor);
			valor = valor.formatMoney(0,",",".");
			
			$("#label-area").html("&Aacute;rea  m&iacute;nima: <strong>" + valor + 'm&sup2; </strong> (aprox.)');
		}else{
			$("#txtArea").attr("value","");
			$("#label-area").html("&Aacute;rea  m&iacute;nima: <strong>Indiferente</strong>");
		}
		return(true);
	}	
	
	function sliderFormatDorm(valor){
		valor = parseInt(valor);
		
		if(valor > 0 && valor < 5){
			$("#ddlDorms").val(valor);
			valor = valor.formatMoney(0,",",".");
			
			$("#label-dorm").html("À partir de: <strong>" + valor + ' dormitório'+((valor > 1) ? 's' : '') +'</strong>');
		}else{
			$("#ddlDorms").attr("value","");
			$("#label-dorm").html("Dormitórios: <strong>Indiferente</strong>");
		}
		return(true);
	}	
	
	function sliderFormatVagas(valor){
		valor = parseInt(valor);
		
		if(valor > 0 && valor < 5){
			$("#ddlVagas").val(valor);
			valor = valor.formatMoney(0,",",".");
			
			$("#label-vagas").html("À partir de: <strong>" + valor + ' vaga'+((valor > 1) ? 's' : '') +'</strong>');
		}else{
			$("#ddlVagas").attr("value","");
			$("#label-vagas").html("Vagas: <strong>Indiferente</strong>");
		}
		return(true);
	}
		
	function buscaRapida(){
		//Desabilita todos campos da busca...
		$("#boxEncontreImovel input, #boxEncontreImovel select").attr("disabled",true);
		
		//Menos o tipo e pretensão
		$("#ddlPretensao, #ddltipo, #txtImb, #txtRef, #idBairros").attr("disabled",false);
		
		//Some com o valor maximo e minimo
		$("#txtValorMin, #txtValorMax, #ddlDorms, #ddlVagas").parent().parent().parent().hide();
		$("#txtValorMin, #txtValorMax, #ddlDorms, #ddlVagas").removeAttr("disabled");
		$("#txtArea").parent().parent().parent().hide();
		$("#cidade").val(0);		
		
		//se tiver algum tipo válido
		if($("#ddltipo").val() != ""){
		    var valorMinMax = new Array();
			try{
				if($("#ddlPretensao").val() == 1)
				    valorMinMax = Array(getObjTipo($("#ddltipo").val()).min, getObjTipo($("#ddltipo").val()).max);
			    else
				    valorMinMax = Array((getObjTipo($("#ddltipo").val()).min * 0.002), (getObjTipo($("#ddltipo").val()).max * 0.002));
            } catch (e) {
                //alert(e);
			}

            
			$("#cidade").attr("disabled", false);	
			$("#cidade").change();
			
			//alert("Habilita");
			
			//habilita tudo
			$(".passoN2, .passoN3, #busca-rapida-c21 input:type=submit").css("opacity", "1");
			$(".passoN3 select, #busca-rapida-c21 input:type=submit").attr("disabled", false);
	
			//cria slider de valor
			criaSliderValor(valorMinMax);
			
			//slider de área
			criaSliderArea(valorMinMax);

			//slider de dormitórios
			criaSliderDorm(getObjTipo($("#ddltipo").val()).dorm)
			
			//slider de dormitórios
			criaSliderVagas(getObjTipo($("#ddltipo").val()).vagas)
		}else{
			criaSliderValor(false);
			criaSliderArea([0,0]);
			criaSliderDorm(false);
			criaSliderVagas(false);
			//alert("Desabilita");
			$(".passoN2, .passoN3").css("opacity", "0.5");
			$(".passoN3 select").attr("disabled",true);
			$("#busca-rapida-c21 input:type=submit").attr("disabled",true);
			$("#busca-rapida-c21 input:type=submit").css("opacity", "0.5");
		}
		zeraTudo();
		updateBairros("");
	}
	function updateBairros(strTitulo){
		if(strTitulo == "" || !strTitulo){
			$("#ddlBairro, #idBairros").empty();
			$("#ddlBairro").append("<option value=''>Selecione o bairro</option>");
		}else{
			var txt = new String();
			txt = strTitulo;
			if(txt.length > 18)
				txt = txt.substring(0, 18) + "...";
			else
				txt = txt.substr(0, txt.lastIndexOf(","));
			$("#ddlBairro").empty();
			$("#ddlBairro").append("<option value=''>" + txt + "</option>");
		}
	}
	
	function criaSliderValor(valorMinMax){
			$("#slider-range-valor, #label_valor").remove();
			$("#txtValorMax").parent().parent().parent().after("<div id='slider-range-valor'>");
			$("#slider-range-valor").before("<div id='label_valor' class='slider-rotulo' for=''>");
			//$("#label_valor").wrap("<dt />");
			if(valorMinMax[0] == 0 && valorMinMax[1] == 0){
				$("#slider-range-valor").slider({ disabled: true, range: true, values: [0,1], min:0, max: 1});
				$("#slider-range-valor").css({"opacity":"0.5"})
			}else{
				$("#slider-range-valor").slider({
					range: true,
					animate: true,
					min: valorMinMax[0],
					max: valorMinMax[1],
					step: valorMinMax[0],
					values: [valorMinMax[0],valorMinMax[1]],
					slide: function(event, ui) {
						sliderFormat("Valor",ui.values[0],ui.values[1],$("#label_valor"),$("#txtValorMin"),$("#txtValorMax"));
					}
				});
			}
			sliderFormat("Valor",$("#slider-range-valor").slider("values", 0),$("#slider-range-valor").slider("values", 1),$("#label_valor"),$("#txtValorMin"),$("#txtValorMax"));		
	
	}
	
	function criaSliderArea(valorMinMax){
			$("#slider-range-area, #label-area").remove();
			$("#txtArea").parent().parent().parent().after("<div id='slider-range-area'>");
			$("#slider-range-area").before("<div id='label-area' class='slider-rotulo'>");
			$("#label-area").wrap("<dt>");
			if(valorMinMax[0] == 0 && valorMinMax[1] == 0){
				$("#slider-range-area").slider({ disabled: true});
				
			}else{	
				$("#slider-range-area").slider({
					animate: true,
					range: "min",
					min: 0,
					max: 1000,
					step: 50,
					value: 0,
					slide: function(event, ui){
						sliderFormatArea(ui.value);
					}
				});
			}
//			$("#slider-range-area").css({"opacity":"0.5"});
			sliderFormatArea($("#slider-range-area").slider("value"));
	}
	function criaSliderDorm(DormTrue){
			$("#slider-range-dorm, #label-dorm").remove();
			$("#ddlDorms").parent().parent().parent().after("<div id='slider-range-dorm'>");
			$("#slider-range-dorm").before("<div id='label-dorm' class='slider-rotulo'>");
			$("#label-dorm").wrap("<dt>");
			if(!DormTrue){
				$("#slider-range-dorm").slider({ disabled: true});
				
			}else{	
				$("#slider-range-dorm").slider({
					animate: true,
					range: "max",
					min: 0,
					max: 5,
					step: 1,
					value: 0,
					slide: function(event, ui){
						sliderFormatDorm(ui.value);
					}
				});
			}
//			$("#slider-range-dorm").css({"opacity":"0.5"});
			sliderFormatDorm($("#slider-range-dorm").slider("value"));
	}
	
	function criaSliderVagas(DormTrue){
			$("#slider-range-vagas, #label-vagas").remove();
			$("#ddlVagas").parent().parent().parent().after("<div id='slider-range-vagas'>");
			$("#slider-range-vagas").before("<div id='label-vagas' class='slider-rotulo'>");
			$("#label-vagas").wrap("<dt>");
			if(!DormTrue){
				$("#slider-range-vagas").slider({ disabled: true});
				
			}else{	
				$("#slider-range-vagas").slider({
					animate: true,
					range: "max",
					min: 0,
					max: 5,
					step: 1,
					value: 0,
					slide: function(event, ui){
						sliderFormatVagas(ui.value);
					}
				});
			}
//			$("#slider-range-vagas").css({"opacity":"0.5"});			
			sliderFormatVagas($("#slider-range-vagas").slider("value"));
	}
}