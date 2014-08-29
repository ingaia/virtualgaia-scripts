function MM_validateForm() {
    //  ---------------------------------------
    if (document.getElementById) {
        var i, p, q, nm, test, num, min, max, errors = '', args = MM_validateForm.arguments;
        firstField = new Array();
        for (i = 0; i < (args.length - 2); i += 4) {
            test = args[i + 2];
            label = args[i + 3];
            val = document.getElementById(args[i]);
            if (val) {
                nm = val.name;
                elInput = val;
                elInput.className = "";
                if ((val = val.value) != "") {
                    if (test.indexOf('isEmail') != -1) {
                        p = val.indexOf('@');
                        if (p < 1 || p == (val.length - 1)) {
                            errors += '- ' + label + ' inválido.\n';
                            elInput.className = "campoErrado";
                            firstField.push(elInput);
                        }
                    } else if (test != 'R') {
                        num = parseFloat(val);
                        if (isNaN(val)) {
                            errors += '- ' + label + ' deve ser um número válido.\n';
                            elInput.className = "campoErrado";
                            firstField.push(elInput);
                        }
                        if (test.indexOf('inRange') != -1) {
                            p = test.indexOf(':');
                            min = test.substring(8, p);
                            max = test.substring(p + 1);
                            if (num < min || max < num) {
                                errors += '- ' + label + ' deve ser um número entre ' + min + ' e ' + max + '.\n';
                                elInput.className = "campoErrado";
                                firstField.push(elInput);
                            }
                        }
                    }
                } else if (test.charAt(0) == 'R') {
                    errors += '- ' + label + ' é obrigatório.\n';
                    elInput.className = "campoErrado";
                    firstField.push(elInput);
                }
            }
        }
        if (errors) {
            alert('Os seguintes erros ocorreram:\n' + errors);
            firstField[0].focus();
        }
        document.MM_returnValue = (errors == '');
    }
}

$(document).ready(function () {
	
    //QUER COMPRAR E QUERO ALUGAR
    $("#ddlPretensao").change(function () {
        if ($("#ddlPretensao").val() == "1") {
            geraMinVenda();
            geraMaxVenda();
        }
        else {
            geraMinLocacao();
            geraMaxLocacao();
        }
		CarregarTipo();
    }).change();

    //$("#txtValorInformado").maskMoney();		

    //Carregar dropdown ddlTipo
      CarregarTipo();


    //LINK DO SLIDESHOW
    $("#slideshow-link").click(function () {
        $("#slideshowimovel a:eq(1)").trigger("click");
    });

    //SLIDESHOW DA FICHA DO IMÓVEL
    $('#slideshowimovel').cycle({
        timeout: 3000,
        pager: '#nav',
        pagerAnchorBuilder: function (idx, slide) {
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

    // monta tipos na ddltipo
    geraTipo($("#ddltipo"));
    $("#ddltipo").change(function () {
        geraTipo($(this));
    }).change();
    function geraTipo(tipo) {

        if (tipo.val() == "7" || tipo.val() == "25") {
            $(".dormitorios").show();
            $(".condFechado").show();
            $(".area").show();
            $("#lblArea").text("Área construída");
            $(".vagas").show();
            $(".suites").show();
            $(".areaTotal").show();
        }
        else if (tipo.val() == "2" || tipo.val() == "22" || tipo.val() == "23" || tipo.val() == "24") {
            $(".dormitorios").show();
            $(".condFechado").hide();
            $(".area").show();
            $("#lblArea").text("Área útil");
            $(".vagas").show();
            $(".suites").show();
            $(".areaTotal").show();
        }
        else if (tipo.val() == "6" || tipo.val() == "12" || tipo.val() == "15" || tipo.val() == "16") {
            $(".dormitorios").hide();
            $(".area").show();
            $("#lblArea").text("Área construída");
            $(".vagas").show();
            $(".suites").hide();
            $(".areaTotal").show();
            $(".condFechado").hide();
        }
        else if (tipo.val() == "11" || tipo.val() == "19" || tipo.val() == "14" || tipo.val() == "8") {
            $(".dormitorios").show();
            $(".area").show();
            $("#lblArea").text("Área construída");
            $(".vagas").show();
            $(".suites").show();
            $(".areaTotal").show();
            $(".condFechado").hide();
        }
        else if (tipo.val() == "5" || tipo.val() == "20") {
            $(".dormitorios").hide();
            $(".area").hide();
            $(".vagas").hide();
            $(".suites").hide();
            $(".areaTotal").show();
            $(".condFechado").show();
        }
        else if (tipo.val() == "27" || tipo.val() == "17" || tipo.val() == "18" || tipo.val() == "26") {
            $(".dormitorios").hide();
            $(".area").hide();
            $(".vagas").show();
            $(".suites").hide();
            $(".areaTotal").show();
            $(".condFechado").hide();
        }
    }

    $("#Cidade, #cidade").change(function () {
        $(".zona").hide();
        $("#ddlzona").val("");
        if ($(this).val() == "85") {
            $.ajax({
                beforeSend: function () {
                    $("#divbairro").html("<center>Escolha uma zona da cidade.</center>");
                },
                url: "jsonZonas.aspx",
                data: "cod_cid=" + $(this).val(),
                dataType: "json",
                success: function (json) {
                    if ($("#cidade").val() == 0) {
                        $(".zona").hide();
                        $("#divbairro").html("<center>Escolha alguma cidade</center>");
                    }
                    else
                        $(".zona").show();

                    if ($("#divbairroselect").length > 0)
                        ZonaHTML = zonasEmSelect(json);
                    else
                        ZonaHTML = zonasEmSelect(json);

                    $("#zona").html(ZonaHTML);

                    $("#ddlzona").change(function () {

                        if ($("#ddlzona").val() != "") {
                            $.ajax({
                                url: "jsonBairroZona.aspx",
                                data: "cod_cid=" + $("#cidade").val() + "&cod_zona=" + $(this).val(),
                                dataType: "json",
                                success: function (json) {

                                    if ($("#divbairroselect").length > 0) {
                                        BairroHTML = bairrosEmSelect(json);
                                        $("#divbairroselect").html(BairroHTML);
                                    }
                                    else {
                                        BairroHTML = bairrosEmChecks(json);
                                        $("#divbairro").html(BairroHTML);
                                    }

                                },
                                error: function () {
                                    if ($("#divbairroselect").length > 0)
                                        $("#divbairroselect").html('<select id="regiao" name="regiao"><option id="todos" selected="selected" value="">Selecione uma zona</option></select>');
                                    else
                                        $("#divbairro").html("<center>Escolha alguma zona</center>");
                                }
                            });

                        } else {
                            if ($("#cidade").val() == 0) {
                                $("#divbairro").html("<center>Escolha alguma cidade</center>");
                            }
                            else {
                                $.ajax({
                                    beforeSend: function () {
                                        $("#divbairro").html("<center>Aguarde, carregando os bairros</center>");
                                    },
                                    url: "jsonbairro.aspx",
                                    data: "cod_cid=" + $("#cidade").val(),
                                    dataType: "json",
                                    success: function (json) {

                                        if ($("#divbairroselect").length > 0)
                                            BairroHTML = bairrosEmSelect(json);
                                        else
                                            BairroHTML = bairrosEmChecks(json);

                                        if ($("#divbairroselect").length > 0) {
                                            BairroHTML = bairrosEmSelect(json);
                                            $("#divbairroselect").html(BairroHTML);
                                        }
                                        else {
                                            BairroHTML = bairrosEmChecks(json);
                                            $("#divbairro").html(BairroHTML);
                                        }

                                        $("#divbairro").html(BairroHTML);

                                        todosBairros();

                                    },
                                    error: function () {
                                        if ($("#divbairroselect").length > 0)
                                            $("#divbairroselect").html('<select id="bairro" name="bairro"><option id="todos" selected="selected" value="">Selecione uma cidade</option></select>');
                                        else
                                            $("#divbairro").html("<center>Escolha alguma cidade</center>");
                                    }
                                });
                            }

                        }

                    }).change();

                },
                error: function () {
                    if ($("#divbairroselect").length > 0)
                        $("#divbairroselect").html('<select id="regiao" name="regiao"><option id="todos" selected="selected" value="">Selecione uma zona</option></select>');
                    else
                        $("#divregiao").html("<center>Escolha alguma cidade</center>");
                }
            });

            //$(".regiaoBusca").show();
            //todasZonas();
        }
        else {
            $(".zona").hide();
            if ($("#cidade").val() == 0) {
                $("#divbairro").html("<center>Escolha alguma cidade</center>");
            }
            else {
                $.ajax({
                    beforeSend: function () {
                        $("#divbairro").html("<center>Aguarde, carregando os bairros</center>");
                    },
                    url: "jsonbairro.aspx",
                    data: "cod_cid=" + $(this).val(),
                    dataType: "json",
                    success: function (json) {
                        //					    if($("#divbairroselect").length > 0)
                        //						    BairroHTML = bairrosEmSelect(json);
                        //					    else
                        //						    BairroHTML = bairrosEmChecks(json);		

                        if ($("#divbairroselect").length > 0) {
                            BairroHTML = bairrosEmSelect(json);
                            $("#divbairroselect").html(BairroHTML);
                        }
                        else {
                            BairroHTML = bairrosEmChecks(json);
                            $("#divbairro").html(BairroHTML);
                        }

                        $("#divbairro").html(BairroHTML);

                        todosBairros();

                    },
                    error: function () {
                        if ($("#divbairroselect").length > 0)
                            $("#divbairroselect").html('<select id="bairro" name="bairro"><option id="todos" selected="selected" value="">Selecione uma cidade</option></select>');
                        else
                            $("#divbairro").html("<center>Escolha alguma cidade</center>");
                    }
                });
            }
        }

    }).change();

    BairroHTML = "";

    //});

    $("#ddltipo").change(function () {
        //filtraFinalidade("#ddlFinalidade",$(this).val());
        $.ajax({

            url: "jsonFinalidade.aspx",
            data: "cod_tipo=" + $("#ddltipo").val(),
            dataType: "json",
            success: function (json) {
                finalidadesEmSelect(json);
            },
            error: function () {

            }
        });

    }).change();

    function finalidadesEmSelect(json) {

        $("#ddlFinalidade").empty();
        $("#ddlFinalidade").append("<option value='0' selected='selected' >Indiferente</option>");
        for (i = 0; i < json.finalidades.length; i++) {
            $("#ddlFinalidade").append("<option value=" + json.finalidades[i].id + ">" + json.finalidades[i].finalidade + "</option>")
        }
    };

    function filtraFinalidade(campo, tipo) {
        strValues = "1,2,3,4,5,6";

        valorPadrao = $(campo).val();

        switch (tipo) {
            case "2":
            case "22":
            case "23":
            case "24":
                strValues = "1,5";
                break;

            case "6":
            case "12":
                strValues = "2,3";
                break;

            case "7":
            case "25":
                strValues = "1,2,4,5";
                break;

            case "8":
                strValues = "1,4";
                break;

            case "11":
            case "14":
            case "19":
                strValues = "4";
                break;

            case "15":
            case "26":
                strValues = "2";
                break;

            case "16":
                strValues = "1,2,6";
                break;

            case "17":
            case "18":
            case "27":
                strValues = "2,6";
                break;

            case "20":
            case "5":
                strValues = "1,2,3,4";
                break;
        }

        var arrFinalidades = new Array("", "Residencial", "Comercial", "Industrial", "Rural", "Temporada", "Corporativa");
        $(campo).empty();
        strValues = strValues.split(",");

        for (i = 0; i < strValues.length; i++) {
            if (valorPadrao == strValues[i])
                selected = " selected='selected' ";
            else
                selected = "";

            $(campo).append("<option value=" + strValues[i] + selected + ">" + arrFinalidades[strValues[i]] + "</option>")
        }
    };

    function zonasEmSelect(json) {
        ZonaHTML = "";
        ZonaHTML += '<select id="ddlzona" name="ddlzona">';
        ZonaHTML += '<option selected="selected" value="">Todos as zonas</option>';
        for (i = 0; i < json.zonas.length; i++) {
            ZonaHTML += '<option value="' + json.zonas[i].id + '">';
            ZonaHTML += json.zonas[i].zona;
            ZonaHTML += '</option>';
        }
        ZonaHTML += '</select>';
        return (ZonaHTML);
    }

    function bairrosEmChecks(json) {
        BairroHTML = "";
        BairroHTML += '<div class="">';
        BairroHTML += '<input type="checkbox" checked="checked" id="todos" value="" name="bairro"/>';
        BairroHTML += '<label for="todos"> Todos os bairros</label>';
        BairroHTML += '</div>';
        for (i = 0; i < json.bairros.length; i++) {
            BairroHTML += '<div class="">';
            BairroHTML += '<input type="checkbox" id="' + json.bairros[i].bairro + '" value="' + json.bairros[i].id + '" name="bairro"/>';
            BairroHTML += '<label for="' + json.bairros[i].bairro + '"> ' + json.bairros[i].bairro + '</label>';
            BairroHTML += '</div>';
        }
        return (BairroHTML);
    }

    function bairrosEmSelect(json) {
        BairroHTML = "";
        BairroHTML += '<select id="bairro" name="bairro">';
        BairroHTML += '<option id="todos" selected="selected" value="">Todos os Bairros</option>';
        for (i = 0; i < json.bairros.length; i++) {
            BairroHTML += '<option value="' + json.bairros[i].id + '">';
            BairroHTML += json.bairros[i].bairro;
            BairroHTML += '</option>';
        }
        BairroHTML += '</select>';
        return (BairroHTML);
    }

    function todosBairros() {
        if ($("#divbairro").length > 0) {
            $("#todos").click(function () {
                if (this.checked) {
                    $("#divbairro input").not("#todos").attr("checked", false);
                } else {
                    $("#divbairro input").not("#todos").attr("checked", false);
                }
                pintaBairros();
            });
            $("#divbairro input").not("#todos").click(function () {
                $("#todos").attr("checked", false);
                pintaBairros();
            });
            pintaBairros();
        }
    }

    function pintaBairros() {
        if ($("#divbairro").length > 0) {
            $("#divbairro input").each(function () {
                if (this.checked) {
                    $(this).parent().attr("class", "bairroSelecionado");
                } else {
                    $(this).parent().removeAttr("class");
                }
            });
        }
    }

    function geraMinLocacao() {
        $("#ddlValorMin").html("<option value=\"0\">Valor M&iacute;nimo</option><option value=\"1.000\">R$ 1.000,00</option><option value=\"2.000\">R$ 2.000,00</option><option value=\"3.000\">R$ 3.000,00</option><option value=\"5.000\">R$ 5.000,00</option><option value=\"10.000\">R$ 10.000,00</option><option value=\"15.000\">R$ 15.000,00</option>");
    }

    function geraMaxLocacao() {
        $("#ddlValorMax").html("<option value=\"9999.00\">Valor M&aacute;ximo</option><option value=\"1.000\">R$ 1.000,00</option><option value=\"2.000\">R$ 2.000,00</option><option value=\"3.000\">R$ 3.000,00</option><option value=\"5.000\">R$ 5.000,00</option><option value=\"10.000\">R$ 10.000,00</option><option value=\"15.000\">R$ 15.000,00</option><option value=\"999999.000\">Acima de R$ 15.000,00</option>");
    }

    function geraMinVenda() {
        $("#ddlValorMin").html("<option value=\"0\">Valor M&iacute;nimo</option><option value=\"50.000\">R$ 50.000,00</option><option value=\"100.000\">R$ 100.000,00</option><option value=\"250.000\">R$ 250.000,00</option><option value=\"500.000\">R$ 500.000,00</option><option value=\"750.000\">R$ 750.000,00</option><option value=\"1.000.000\">R$ 1.000.000,00</option>");
    }

    function geraMaxVenda() {
        $("#ddlValorMax").html("<option value=\"999.999.999.999\">Valor M&aacute;ximo</option><option value=\"50.000\">R$ 50.000,00</option><option value=\"100.000\">R$ 100.000,00</option><option value=\"250.000\">R$ 250.000,00</option><option value=\"500.000\">R$ 500.000,00</option><option value=\"750.000\">R$ 750.000,00</option><option value=\"1.000.000\">R$ 1.000.000,00</option><option value=\"999.999.999.999\">Acima de R$ 1.000.000,00</option>");
    }

    $('#pauseButton').click(function () {
        $('#slideshowimovel').cycle('pause');
        return false;
    });

    $('#resumeButton').click(function () {
        $('#slideshowimovel').cycle('resume');
        return false;
    });

    $(".boxSlideShow").each(function () {
        $(this).find("a").slideshow();
    });

    $("#ddlBairro").mouseover(function () {
        $("#lnkBairro").attr("href", "bairroListagem.aspx?idCidade=" + $("#cidade").val() + "&zona=" + $("#ddlzona").val());
    })
	
	$("#ddlMetro").mouseover(function(){
            $("#lnkMetro").attr("href","metroListagem.aspx?idCidade=" + $("#cidade").val() + "&tipo=" + $("#ddltipo").val() + "&pretensao=" + $("#ddlPretensao").val());
        })

    var pathname = window.location.href;

    if (pathname.indexOf('?') != -1) {
        var parametros = pathname.split('?');
        valoresEmSelect(parametros[1]);
    }

    function valoresEmSelect(parametros) {
        if (parametros.indexOf('&') != -1) {
            var parametrosList = parametros.split('&');
            for (var i = 0; i < parametrosList.length; i++) {
                var parametro = parametrosList[i].split('=');
                if (parametro[0] == "cidade") {
                    if (parametro[1] == "0") {
                        $("#" + parametro[0]).append("<option value='0' selected='selected' >Cidade</option>");
                    }
                    else {
                        $("#" + parametro[0]).val(parametro[1]);
                    }

                }
            }
        }
    }

});

//Carregar o dropdow ddlTipo
function CarregarTipo() {
    $.ajax({
        url: "jsonTipo.aspx",
        data: "cod_pret=" + $("#ddlPretensao").val(),
        dataType: "json",
        success: function (json) {
            $("#ddltipo").empty();
            $("#ddltipo").append("<option value='0' selected='selected' >Indiferente</option>");
            for (i = 0; i < json.tipos.length; i++) {
                $("#ddltipo").append("<option value=" + json.tipos[i].id + ">" + json.tipos[i].tipo + "</option>")
            }
        },
        error: function (json) {
            var e = json;
        }
    });

}

//função de bairros por listagem em thickbox
function bairroThickbox(idSelectBairro) {
    $("#" + idSelectBairro).after("<a href=\"bairroListagem.aspx?idCidade=0\"id=\"lnkBairro\" class='thickbox' title=\"Bairros\"></a>");
    $("#" + idSelectBairro).focus(function () {
        $("#lnkBairro").trigger("click");
        $(this).blur();
        return (false);
    })
}	


	
