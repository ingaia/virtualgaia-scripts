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

function finalidade(){
    $.ajax({
            url: "json/jsonFinalidadeBuscaRapida.ashx",
            data: "ddlPretensao=" + $("#ddlPretensao").val() +  "&ddltipo=" + $("#ddltipo").val(),
            dataType: "json",
            beforeSend: function(){ $("#ddlFinalidade").empty().append("<option value='0'>Carregando...</option>")},
            success: function(json){
                        $("#ddlFinalidade").empty().append("<option value='0'>Finalidade</option>");

                        for(i=0; i<json.tipos.length; i++)
                        {
                            $("#ddlFinalidade").append("<option value= "+ json.tipos[i].id + ">"+ json.tipos[i].finalidade + "</option>").resetSS();
                        }
                        $("#ddlFinalidade").val(1);
                        
                      cidade();                  
            },
            error: function(error){
                var e = error;
            }
    })
};

function tipo(){
    $.ajax({
            url: "json/jsonTipoBuscaRapida.ashx",
            data:"ddlPretensao=" + $("#ddlPretensao").val(),
            dataType: "json",
             beforeSend: function(){ $("#ddltipo").empty().append("<option value='0'>Carregando...</option>")},
            success: function(json){
                        $("#ddltipo").empty();
                        $("#ddltipo").append("<option value='0'>Tipo</option>");
                        for(i=0; i<json.tipos.length; i++)
                        {
                            $("#ddltipo").append("<option value= "+ json.tipos[i].id + ">"+ json.tipos[i].tipo + "</option>").resetSS();
                        }  
                        
                        finalidade();                                                

            },
            error: function(error){
                var e = error;
            }
    })

}


function estado(){
    $.ajax({
        url: "json/jsonEstadoBuscaRapida.ashx",
        data:"ddlPretensao=" + $("#ddlPretensao").val() + "&" + "ddlFinalidade="+ $("#ddlFinalidade").val() +"&"+ "ddltipo=" + $("#ddltipo").val() + "&" + "valorInformado=" + $("#txtValorInformado").val(),
        dataType: "json",
        beforeSend: function(){ $("#estado").empty().append("<option value='0'>Carregando...</option>")},
        success: function(json){
            $("#estado").empty();
            for(i=0; i<json.tipos.length; i++)
            {
                $("#estado").append("<option value=" + json.tipos[i].id + ">" + json.tipos[i].estado + "</option>");
            }
            $("#estado").val(1);
            cidade();      
        }
    })
}

function cidade(){
    $.ajax({
        url: "json/jsonCidadeBuscaRapida.ashx",
        data:"ddlPretensao=" + $("#ddlPretensao").val() + "&" + "ddlFinalidade="+ $("#ddlFinalidade").val() +"&"+ "ddltipo=" + $("#ddltipo").val() + "&" + "valorInformado=" + $("#txtValorInformado").val() + "&" + "ddlEstado=" + $("#estado").val(), 
         dataType: "json",
         beforeSend: function(){ $("#cidade").empty().append("<option value='0'>Carregando...</option>")},
         success: function(json){
            $("#cidade").empty();
            $("#cidade").append("<option selected='selected' value='0'>Cidade</option>");
            for(i=0; i<json.tipos.length; i++)
            {
                $("#cidade").append("<option value=" + json.tipos[i].id + ">" + json.tipos[i].cidade + "</option>").resetSS();
            }
            zona();
            regioes();
         }
    })
}

function zona()
{
    $.ajax({
        url:"json/jsonZonaBuscaRapida.ashx",
        data:"ddlPretensao=" + $("#ddlPretensao").val() + "&" + "ddlFinalidade="+ $("#ddlFinalidade").val() +"&"+ "ddltipo=" + $("#ddltipo").val() + "&" + "valorInformado=" + $("#txtValorInformado").val() + "&" + "ddlEstado=" + $("#estado").val() + "&" + "ddlCidade=" + $("#cidade").val(), 
        dataType: "json",
        beforeSend: function(){ $("#ddlzona").empty().append("<option value='0'>Carregando...</option>")},
        success: function(json){
                if(json == "error")
                {
                    $("#ddlzona").attr("disabled","disabled");
                    $("#ddlzona").empty();
                    $("#ddlzona").resetSS();
                    $("#ddlzona").append("<option selected='selected' value='0' >Zonas</option>").resetSS();
                }
                else
                {
                        $("#ddlzona").empty();
                        $("#ddlzona").attr("disabled",false);
                        $("#ddlzona").append("<option selected='selected' value='0'>Zonas</option>");
                        for(i=0; i<json.tipos.length; i++)
                        {
                            $("#ddlzona").append("<option value=" + json.tipos[i].id + ">" + json.tipos[i].zona + "</option>").resetSS();
                        }
                    }
            },
            error: function(error){
                    $("#ddlzona").attr("disabled","disabled").resetSS();
                    $("#ddlzona").empty();
                    $("#ddlzona").append("<option selected='selected' value='0' >Zonas</option>").resetSS();
                }
    })
}

function regioes()
{
    $.ajax({
        url: "json/jsonRegioesBuscaRapida.ashx",
        data:"ddlPretensao=" + $("#ddlPretensao").val() + "&" + "ddlFinalidade="+ $("#ddlFinalidade").val() +"&"+ "ddltipo=" + $("#ddltipo").val() + "&" + "valorInformado=" + $("#txtValorInformado").val() + "&" + "ddlEstado=" + $("#estado").val() + "&" + "ddlCidade=" + $("#cidade").val() + "&" + "ddlzona=" + $("#ddlzona").val(),         
        dataType: "json",
        beforeSend: function(){ $("#txRegioes").empty().append("<option value='0'>Carregando...</option>")},
        success: function(json){
                if(json == "error")
                {
                    $("#txRegioes").attr("disabled",true);
                    $("#txRegioes").empty();
                    $("#txRegioes").append("<option selected='selected' value='0'>Regiões</option>");
                }
                else
                {
                    $("#txRegioes").empty();
                    $("#txRegioes").attr("disabled",false);
                    $("#txRegioes").append("<option selected='selected' value='0'>Regiões</option>");
                    for(i=0; i<json.tipos.length; i++)
                    {
                        $("#txRegioes").append("<option value=" + json.tipos[i].id + ">" + json.tipos[i].regioes + "</option>"); 
                    }
                    
                    bairro();
                }
        },
        error: function(error){
            $("#txRegioes").attr("disabled","disabled");
            $("#txRegioes").empty();
            $("#txRegioes").append("<option selected='selected' value='0' >Regiões</option>");
        }
    })   
}

function bairro(){
    $.ajax({
            url: "json/jsonBairroBuscaRapida.ashx",
            data:"ddlPretensao=" + $("#ddlPretensao").val() + "&" + "ddlFinalidade="+ $("#ddlFinalidade").val() +"&"+ "ddltipo=" + $("#ddltipo").val() + "&" + "valorInformado=" + $("#txtValorInformado").val() + "&" + "ddlEstado=" + $("#estado").val() + "&" + "ddlCidade=" + $("#cidade").val() + "&" + "ddlzona=" + $("#ddlzona").val(),         
            dataType: "json",
            beforeSend: function(){ $("#ddlBairro").empty().append("<option value='0'>Carregando...</option>")},
            success: function(json){
                        $("#ddlBairro").empty().append("<option value='0'>Finalidade</option>");

                        for(i=0; i<json.tipos.length; i++)
                        {
                            $("#ddlBairro").append("<option value= "+ json.tipos[i].id + ">"+ json.tipos[i].bairro + "</option>").resetSS();
                        }
                        $("#ddlBairro").val(1);
                                                              
            },
            error: function(error){
                var e = error;
            }
    })
};

$(document).ready(function() {

    $("#ddlPretensao").val(1);      
      tipo();  
    
    $("#ddlPretensao").change(function(){    
       tipo();
//        estado();
//        cidade();
//        zona();
//        regioes();
    });
    
    $("#ddltipo").change(function(){
      finalidade();
//        cidade();
//        zona();
//        regioes();
    });      
    
    $("#ddlFinalidade").change(function(){
        cidade();
//        cidade();
//        zona();
//        regioes();
    });  
     

    
    $("#estado").change(function(){    
          cidade();
//        zona();
//        regioes();
    }); 
    
    $("#cidade").change(function(){
      zona();
      regioes();
    });   
    
    $("#ddlzona").change(function(){
       regioes();
    });
    
        //LINK DO SLIDESHOW
    $("#slideshow-link").click(function() {
        $("#slideshowimovel a:eq(1)").trigger("click");
    });

    //SLIDESHOW DA FICHA DO IMÓVEL
    $('#slideshowimovel').cycle({
        timeout: 3000,
        pager: '#nav',
        pagerAnchorBuilder: function(idx, slide) {

            url = $(slide).find("img").attr("src").split("/");
            rel = $(slide).attr("rel");
            add = "";
            for (i = 0; i < (url.length - 1); i++) {
                add += url[i] + "/";
            }
            //add += "thumbs/thumb";
            add += url[url.length - 1];
            if (rel == "empreendimento")
                return '<li class=\"fotosEmpreendimento\"><h4>Fotos do Condomínio</h4></li><li><a href="#"><img src="' + add + '" /></a></li>';
            else
                return '<li><a href="#"><img src="' + add + '" /></a></li>';
        }
    });
    $("#slideshowimovel a").slideshow();
    
     $('#pauseButton').click(function() {
        $('#slideshowimovel').cycle('pause');
        return false;
    });

    $('#resumeButton').click(function() {
        $('#slideshowimovel').cycle('resume');
        return false;
    });

    $(".boxSlideShow").each(function() {
        $(this).find("a").slideshow();
    });

    $("#ddlBairro").mouseover(function() {
        $("#lnkBairro").attr("href", "bairroListagem.aspx?idCidade=" + $("#cidade").val() + "&ddlPretensao=" + $("#ddlPretensao").val() + "&ddltipo=" + $("#ddltipo").val() + "&zona=" + $("#ddlzona").val());
    })
});
	
//função de bairros por listagem em thickbox
function bairroThickbox(idSelectBairro){
    $("#" + idSelectBairro).after("<a href=\"bairroListagem.aspx?idCidade=0\"id=\"lnkBairro\" class='thickbox' title=\"Regiões\"></a>");
    $("#" + idSelectBairro).focus(function(){
        $("#lnkBairro").trigger("click");
        $(this).blur(); 
        return(false);
    })
}		
	
