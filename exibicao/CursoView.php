<?php

class CursoView{
	public static function exibeCursos(){

		$cursos = CursoService::getCursos();
		$departamentos = DepartamentoService::getDepartamentos();

		$table = "";
		$table .= "<form> Nome do Curso|Duração|Créditos|Departamento <br> <input class='noEnter' id='criarcurs' type='text'>";
		$table .= "<select class='criarduracao style='display:inline'>";
		$table .= "<option value='4'>4</option>";
		$table .= "<option value='8'>8</option>";
		$table .= "<option value='10'>10</option>";
		$table .= "</select>";
		$table .= "<input class='creditoscriar' type='number' min='80' max='500'>";
		$table .= "<select class='departamentos' style='display:inline'>";
		if($departamentos != null){
			for($i=0;$i<sizeof($departamentos);$i++){
				$table .= "<option value='".$departamentos[$i]->getId()."'>".$departamentos[$i]->getNome()."</option>";
			}
		}

		$table .= "</select>";
		$table .= "</form>";
		$table .= "<button class='criar'> Criar </button><br><br>";
		
		$table .= "<table>";
			
		$table .= "<tr>";
		$table .= "<th>Nome</th>";
		$table .= "<th>Departamento</th>";
		$table .= "<th>Duração</th>";
		$table .= "<th>Créditos</th>";
		$table .= "<th>Excluir</th>";
		$table .= "<th>Atualizar</th>";
		$table .= "</tr>";

		if($cursos != null){
			for($i=0;$i<sizeof($cursos);$i++){
				$departamento = DepartamentoService::getById($cursos[$i]->getDept_id());
				$table .= "<tr id='tr".$cursos[$i]->getId()."'>";

				$table .= "<td>";
				$table .= $cursos[$i]->getNome(); 
				$table .= "</td>";

				$table .= "<td>";
				$table .= $departamento->getNome();
				$table .= "</td>";

				$table .= "<td>";
				$table .= $cursos[$i]->getDuracao();
				$table .= "</td>";

				$table .= "<td>";
				$table .= $cursos[$i]->getCred_form();
				$table .= "</td>";

				$table .= "<td>";
				$table .= "<button id='e".$cursos[$i]->getId()."' class='excluir'>Excluir</button>"; 
				$table .= "</td>";

				$table .= "<td>";
				$table .= "<button id='a".$cursos[$i]->getId()."' class='atualizar'>Atualizar</button>"; 
				$table .= "</td>";

				$table .= "<td style='display:none'>";
				$table .= "<form><input id='atualizar".$cursos[$i]->getId()."' class='atualizarcurs' type='text'></form>";
				$table .= "</td>";

				$table .= "<td style='display:none'>";
				$table .= "<select id='atualizardura".$cursos[$i]->getId()."'>";
				$table .= "<option value='4'>4</option>";
				$table .= "<option value='8'>8</option>";
				$table .= "<option value='10'>10</option>";
				$table .= "</select>";
				$table .= "</td>";

				$table .= "<td style='display:none'>";
				$table .= "<input id='creditosatu".$cursos[$i]->getId()."' type='number' min='80' max='500'>";
				$table .= "</td>";

				$table .= "<td style='display:none'>";
				$table .= "<select id='drop".$cursos[$i]->getId()."' class='dropatu'>";
				if($departamentos != null){
					for($j=0;$j<sizeof($departamentos);$j++){
						$table .= "<option value='".$departamentos[$j]->getId()."'";
						if($departamentos[$j]->getNome()==$departamento->getNome()){
							$table .= " selected";
						}
						$table .= ">".$departamentos[$j]->getNome()."</option>";
					}
				}

				$table .= "</select>";
				$table .= "</td>";

				$table .= "<td style='display:none'>";
				$table .= "<button id='c".$cursos[$i]->getId()."' class='confirmar'>Confirmar</button>";
				$table .= "</td>";

				$table .= "<td style='display:none'>";
				$table .= "<button id='can".$cursos[$i]->getId()."' class='cancelar'>Cancelar</button>";
				$table .= "</td>";

				$table .= "</tr>";
			}
		}
		
		$table .= "</table>";
		$table .= "<br>";
		$table .= "<button class='instbut nav'>Institutos</button>";
		$table .= "<button class='deptbut nav'>Departamentos</button>";
		$table .= "<button class='cursbut nav'>Cursos</button>";
		
		$output = file_get_contents("/var/www/html/Projeto Final BD/Codigo/exibicao/html/curso.html");
		$output = str_replace("tabela", $table, $output);
		
		echo $output;
	}
}

?>