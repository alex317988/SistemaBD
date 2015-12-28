/* Regra de negócio para entidades com o mesmo nome */

var criarregistro = function(){
	$(document).on('click','.criar',function(){
		var nomedept = $("#criardept").val();
		var idinst = $('.institutos').find(":selected").attr('value');
		$.ajax({
			type: "POST",
			url: "controle/ControllerDepartamento.php",
			data: {funcao: 'criar', nomedept: nomedept, idinst:idinst},
			success: function(data){
				if(data!="null"){
					dadosretornados = JSON.parse(data);
					console.log(dadosretornados);
					var colocarnapagina = "<tr id='tr";
					/* Id do departamento */
					colocarnapagina += dadosretornados['iddept'];
					colocarnapagina += "'><td>";
					/* Nome do departamento */
					colocarnapagina += dadosretornados['nomedept'];
					colocarnapagina += "</td>";
					colocarnapagina += "<td>";
					/* Nome do instituto desse departamento */
					colocarnapagina += dadosretornados['nomeinst'];
					colocarnapagina += "</td>";
	
					/* Botões */
					colocarnapagina += "<td><button id='e";
					colocarnapagina += dadosretornados['iddept'];
					colocarnapagina += "' class='excluir'>Excluir</button>";
					colocarnapagina += "</td>";
					colocarnapagina += "<td><button id='a";
					colocarnapagina += dadosretornados['iddept'];
					colocarnapagina += "' class='atualizar'>Atualizar</button>";				
					colocarnapagina += "</td>";
					colocarnapagina += "<td style='display:none'>";
					colocarnapagina += "<form><input id='atualizar";
					colocarnapagina += dadosretornados['iddept'];
					colocarnapagina += "' class='atualizardept' type='text'> </form>";
					colocarnapagina += "</td>";
	
					/* Colocar dropdown */
					colocarnapagina += "<td style='display:none'>";
					colocarnapagina += "<select id='drop";
					colocarnapagina += dadosretornados['iddept'];
					colocarnapagina += "' class='dropatu'>";
	
					/* Colocar opções na dropdown */
					for (var i =0; i<dadosretornados['idsinst'].length;i++){
						colocarnapagina += "<option value='";
						colocarnapagina += dadosretornados['idsinst'][i];
						colocarnapagina += "'";
						if(dadosretornados['nomeinst']==dadosretornados['nomesinst'][i]){
							colocarnapagina += " selected";
						}
	
						colocarnapagina += '>';
						colocarnapagina += dadosretornados['nomesinst'][i];
						colocarnapagina += "</option>";
					}
	
					colocarnapagina += "</select>";
					colocarnapagina += "</td>";
	
					/* Colocar botão de confirmar */
					colocarnapagina += "<td style='display:none'>";
					colocarnapagina += "<button id='c";
					colocarnapagina += dadosretornados['iddept'];
					colocarnapagina += "' class='confirmar'>Confirmar</button>";
					colocarnapagina += "</td>";
					colocarnapagina += "<td style='display:none'>";
					colocarnapagina += "<button id='can";
					colocarnapagina += dadosretornados['iddept'];
					colocarnapagina += "' class='cancelar'>Cancelar</button>";
					colocarnapagina += "</td>";
					colocarnapagina += "</tr>";
					$('table tr:last').after(colocarnapagina);
				}
				else{
					alert("Já existe um departamento com esse nome.");
				}
			}
		});
	});
}

var mostraratualizarregistro = function(){
	$(document).on('click','.atualizar',function(){
		var idbotao = $(this).attr('id').slice(1);
		$('#atualizar'+idbotao).parent().parent().css('display','inline-block');
		$("#drop"+idbotao).parent().css('display','inline-block');
		$('#c'+idbotao).parent().css('display','inline-block');
		$('#can'+idbotao).parent().css('display','inline-block');
	});
}

var confirmaratualizacao = function(){
	$(document).on('click','.confirmar',function(){
		var idbotao = $(this).attr('id').slice(1);
		var idbotaoint = parseInt(idbotao);
		var novonome = $('#atualizar'+idbotao).val();
		var novoinst = $('#drop'+idbotao+' option:selected').text();
		console.log(novoinst);
		$.ajax({
			type: "POST",
			url: 'controle/ControllerDepartamento.php',
			data: {funcao:'atualizar',iddept:idbotaoint,novonome:novonome,novoinst:novoinst},
			success: function(data){
				if(data!="null"){
					console.log(data);
					dadosretornados = JSON.parse(data);
					console.log(dadosretornados);
					$('#tr'+dadosretornados['iddept']+" td:first-child").text(dadosretornados['novonome']);
					$('#tr'+dadosretornados['iddept']+ " td:nth-child(2)").text(dadosretornados['novoinst']);
					$('#atualizar'+dadosretornados['iddept']).parent().parent().css('display','none');
					$('#atualizar'+dadosretornados['iddept']).val("");
					$('#c'+dadosretornados['iddept']).parent().css('display','none');
					$('#can'+dadosretornados['iddept']).parent().css('display','none');
					$('#drop'+dadosretornados['iddept']).parent().css('display','none');
				}
				else{
					$('#atualizar'+idbotao).parent().parent().css('display','none');
					$('#atualizar'+idbotao).val("");
					$('#c'+idbotao).parent().css('display','none');
					$('#can'+idbotao).parent().css('display','none');
					$('#drop'+idbotao).parent().css('display','none');
					alert("Já existe um departamento com esse nome.");
				}
			}
		});
	});	
}

var excluirregistro = function(){
	$(document).on('click','.excluir',function(){
		var iddeptstr = $(this).attr('id').slice(1);
		var iddeptint = parseInt(iddeptstr);
		$.ajax({
			type: "POST",
			url: 'controle/ControllerDepartamento.php',
			data: {funcao:'deletar',iddept:iddeptint},
			success: function(data){
				$("#tr"+iddeptint).remove();
			}
		});
	});
}

var exibirdepartamentos = function(){
	$.ajax({
		type: "GET",
		url: 'controle/ControllerDepartamento.php',
		success: function(data){
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
	});
}

$(document).ready(exibirdepartamentos);
$(document).ready(mostraratualizarregistro);
$(document).ready(excluirregistro);
$(document).ready(criarregistro);
$(document).ready(confirmaratualizacao);
$(document).ready(cancelarbotao);
//$(document).ready(enterimpedir);