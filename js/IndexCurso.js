/* Regra de negócio para entidades com o mesmo nome */

var criarregistro = function(){
	$(document).on('click','.criar',function(){
		var nomecurs = $("#criarcurs").val();
		var iddept = $('.departamentos').find(":selected").attr('value');
		var duracao = $('.criarduracao').find(":selected").attr('value');
		var creditosnum = $('.creditoscriar').val();
		console.log(duracao);
		console.log(creditosnum);
		if(creditosnum<80 || creditosnum>500){
			alert("Digite um número de créditos entre 80 e 500");
		}
		else{

			$.ajax({
				type: "POST",
				url: "controle/ControllerCurso.php",
				data: {funcao: 'criar', nomecurs: nomecurs, iddept:iddept, duracao:duracao, creditos:creditosnum},
				success: function(data){
					if(data!="null"){
						dadosretornados = JSON.parse(data);
						console.log(dadosretornados);
						var colocarnapagina = "<tr id='tr";
						/* Id do curso */
						colocarnapagina += dadosretornados['idcurs'];
						colocarnapagina += "'><td>";
						/* Nome do curso */
						colocarnapagina += dadosretornados['nomecurs'];
						colocarnapagina += "</td>";
						colocarnapagina += "<td>";
						/* Nome do departamento desse curso */
						colocarnapagina += dadosretornados['nomedept'];
						colocarnapagina += "</td>";
	
						/* Duração do curso */
						colocarnapagina += "<td>";
						colocarnapagina += dadosretornados['duracao'];
						colocarnapagina += "</td>";
	
						/* Créditos */
						colocarnapagina += "<td>";
						colocarnapagina += dadosretornados['creditos'];
						colocarnapagina += "</td>";
		
						/* Botões */
						colocarnapagina += "<td><button id='e";
						colocarnapagina += dadosretornados['idcurs'];
						colocarnapagina += "' class='excluir'>Excluir</button>";
						colocarnapagina += "</td>";
						colocarnapagina += "<td><button id='a";
						colocarnapagina += dadosretornados['idcurs'];
						colocarnapagina += "' class='atualizar'>Atualizar</button>";				
						colocarnapagina += "</td>";
						colocarnapagina += "<td style='display:none'>";
						colocarnapagina += "<form><input id='atualizar";
						colocarnapagina += dadosretornados['idcurs'];
						colocarnapagina += "' class='atualizardept' type='text'> </form>";
						colocarnapagina += "</td>";

						colocarnapagina += "<td style='display:none'>";
						colocarnapagina += "<select id='atualizardura"+dadosretornados['idcurs']+"'>";
						colocarnapagina += "<option value='4'>4</option>";
						colocarnapagina += "<option value='8'>8</option>";
						colocarnapagina += "<option value='10'>10</option>";
						colocarnapagina += "</select>";
						colocarnapagina += "</td>";

						colocarnapagina += "<td style='display:none'>";
						colocarnapagina += "<input id='creditosatu"+dadosretornados['idcurs']+"' type='number' min='80' max='500'>";
						colocarnapagina += "</td>";
		
						/* Colocar dropdown */
						colocarnapagina += "<td style='display:none'>";
						colocarnapagina += "<select id='drop";
						colocarnapagina += dadosretornados['idcurs'];
						colocarnapagina += "' class='dropatu'>";
		
						/* Colocar opções na dropdown */
						for (var i =0; i<dadosretornados['idsdept'].length;i++){
							colocarnapagina += "<option value='";
							colocarnapagina += dadosretornados['idsdept'][i];
							colocarnapagina += "'";
							if(dadosretornados['nomedept']==dadosretornados['nomesdept'][i]){
								colocarnapagina += " selected";
							}
		
							colocarnapagina += '>';
							colocarnapagina += dadosretornados['nomesdept'][i];
							colocarnapagina += "</option>";
						}
		
						colocarnapagina += "</select>";
						colocarnapagina += "</td>";
		
						/* Colocar botão de confirmar */
						colocarnapagina += "<td style='display:none'>";
						colocarnapagina += "<button id='c";
						colocarnapagina += dadosretornados['idcurs'];
						colocarnapagina += "' class='confirmar'>Confirmar</button>";
						colocarnapagina += "</td>";
						colocarnapagina += "<td style='display:none'>";
						colocarnapagina += "<button id='can";
						colocarnapagina += dadosretornados['idcurs'];
						colocarnapagina += "' class='cancelar'>Cancelar</button>";
						colocarnapagina += "</td>";
						colocarnapagina += "</tr>";
						$('table tr:last').after(colocarnapagina);
					}
					else{
						alert("Já existe um curso com esse nome");
					}
				}
			});
		}
	});
}

var mostraratualizarregistro = function(){
	$(document).on('click','.atualizar',function(){
		var idbotao = $(this).attr('id').slice(1);
		$('#atualizar'+idbotao).parent().parent().css('display','inline-block');
		$("#drop"+idbotao).parent().css('display','inline-block');
		$('#c'+idbotao).parent().css('display','inline-block');
		$('#can'+idbotao).parent().css('display','inline-block');
		$('#atualizardura'+idbotao).parent().css('display','inline-block');
		$('#creditosatu'+idbotao).parent().css('display','inline-block');
	});
}

var confirmaratualizacao = function(){
	$(document).on('click','.confirmar',function(){
		var idbotao = $(this).attr('id').slice(1);
		var idbotaoint = parseInt(idbotao);
		var novonome = $('#atualizar'+idbotao).val();
		var novodept = $('#drop'+idbotao+' option:selected').text();
		var novadura = $('#atualizardura'+idbotao+' option:selected').text();
		var novocred = $('#creditosatu'+idbotao).val();
		if(novocred<80 || novocred>500){
			alert("Digite um número de créditos entre 80 e 500");
		}
		else{
			$.ajax({
				type: "POST",
				url: 'controle/ControllerCurso.php',
				data: {funcao:'atualizar',idcurs:idbotaoint,novonome:novonome,novodept:novodept,novadura:novadura,novocred:novocred},
				success: function(data){
					if(data!="null"){
						console.log(data);
						dadosretornados = JSON.parse(data);
						console.log(dadosretornados);
						$('#tr'+dadosretornados['idcurs']+" td:first-child").text(dadosretornados['novonome']);
						$('#tr'+dadosretornados['idcurs']+" td:nth-child(2)").text(dadosretornados['novodept']);
						$('#tr'+dadosretornados['idcurs']+" td:nth-child(3)").text(dadosretornados['duracao']);
						$('#tr'+dadosretornados['idcurs']+" td:nth-child(4)").text(dadosretornados['creditos']);
						$('#atualizar'+dadosretornados['idcurs']).parent().parent().css('display','none');
						$('#atualizar'+dadosretornados['idcurs']).val("");
						$('#creditosatu'+dadosretornados['idcurs']).val("");
						$('#atualizardura'+dadosretornados['idcurs']).val($("#atualizardura"+dadosretornados['idcurs']+" option:first").val());
						$('#atualizardura'+dadosretornados['idcurs']).parent().css('display','none');
						$('#creditosatu'+dadosretornados['idcurs']).parent().css('display','none');
						$('#c'+dadosretornados['idcurs']).parent().css('display','none');
						$('#can'+dadosretornados['idcurs']).parent().css('display','none');
						$('#drop'+dadosretornados['idcurs']).parent().css('display','none');
					}
					else{
						$('#atualizar'+idbotao).parent().parent().css('display','none');
						$('#atualizar'+idbotao).val("");
						$('#creditosatu'+idbotao).val("");
						$('#atualizardura'+idbotao).val($("#atualizardura"+idbotao+" option:first").val());
						$('#atualizardura'+idbotao).parent().css('display','none');
						$('#creditosatu'+idbotao).parent().css('display','none');
						$('#c'+idbotao).parent().css('display','none');
						$('#can'+idbotao).parent().css('display','none');
						$('#drop'+idbotao).parent().css('display','none');
						alert("Já existe um curso com esse nome.");
					}
				}
			});
		}
	});	
}

var excluirregistro = function(){
	$(document).on('click','.excluir',function(){
		var idcursstr = $(this).attr('id').slice(1);
		var idcursint = parseInt(idcursstr);
		$.ajax({
			type: "POST",
			url: 'controle/ControllerCurso.php',
			data: {funcao:'deletar',idcurs:idcursint},
			success: function(data){
				$("#tr"+idcursint).remove();
			}
		});
	});
}

var exibircursos = function(){
	$.ajax({
		type: "GET",
		url: 'controle/ControllerCurso.php',
		success: function(data){
			console.log(data);
			$("body").append(data);
		}
	});
}

var cancelarbotao = function(){
	$(document).on('click','.cancelar',function(){
		var idbotao = $(this).attr('id').slice(3);
		$('#atualizar'+idbotao).parent().parent().css('display','none');
		$('#drop'+idbotao).parent().css('display','none');
		$('#c'+idbotao).parent().css('display','none');
		$('#can'+idbotao).parent().css('display','none');
		$('#atualizardura'+idbotao).parent().css('display','none');
		$('#creditosatu'+idbotao).parent().css('display','none');
	});
}

$(document).ready(exibircursos);
$(document).ready(mostraratualizarregistro);
$(document).ready(excluirregistro);
$(document).ready(criarregistro);
$(document).ready(confirmaratualizacao);
$(document).ready(cancelarbotao);