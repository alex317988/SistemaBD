<?php
require('../exibicao/CursoView.php');
require('../persistencia/ConnectionUtil.php');
require('../persistencia/curso/Curso.php');
require('../persistencia/curso/CursoDao.php');
require('../persistencia/curso/CursoService.php');
require('../persistencia/departamento/Departamento.php');
require('../persistencia/departamento/DepartamentoDao.php');
require('../persistencia/departamento/DepartamentoService.php');
$tiporequest = $_SERVER['REQUEST_METHOD'];
if($tiporequest=="GET"){
	CursoView::exibeCursos();
}
else if($tiporequest=="POST"){
	$funcao = $_POST['funcao'];
	if($funcao=="deletar"){
		$idcurs = $_POST['idcurs'];
		$cursodeletar = CursoService::getById($idcurs);
		CursoService::delete($cursodeletar);
	}
	else if($funcao=="criar"){
		$nomecurs = $_POST['nomecurs'];
		$iddept = $_POST['iddept'];
		$duracao = $_POST['duracao'];
		$creditos = $_POST['creditos'];
		$cursocriar = new Curso();
		$cursocriar->setNome(utf8_encode($nomecurs));
		$cursocriar->setDept_id($iddept);
		$cursocriar->setCred_form($creditos);
		$cursocriar->setDuracao($duracao);
		$criou = CursoService::inserir($cursocriar);
		if(!is_null($criou)){
			$cursocriado = CursoService::getByNome($nomecurs);
			$arrayretorno['nomecurs'] = $nomecurs;
			$arrayretorno['idcurs'] = $cursocriado->getId();
			$arrayretorno['iddept'] = $cursocriado->getDept_id();
			$arrayretorno['nomedept'] = DepartamentoService::getById($iddept)->getNome();
			$arrayretorno['duracao'] = $cursocriado->getDuracao();
			$arrayretorno['creditos'] = $cursocriado->getCred_form();
			$departamentos = DepartamentoService::getDepartamentos();
			for($i=0;$i<sizeof($departamentos);$i++){
				$nomesdepartamentos[$i] = $departamentos[$i]->getNome();
				$idsdepartamentos[$i] = $departamentos[$i]->getId();
			}
			$arrayretorno['nomesdept'] = $nomesdepartamentos;
			$arrayretorno['idsdept'] = $idsdepartamentos;
			$retornoJSON = json_encode($arrayretorno);
			echo $retornoJSON;
		}
		else{
			$retornoJSON = json_encode(NULL);
			echo $retornoJSON;
		}
	}
	else if($funcao=="atualizar"){
		$novonome = $_POST['novonome'];
		$idcurs = $_POST['idcurs'];
		$novodept = $_POST['novodept'];
		$novadura = $_POST['novadura'];
		$novocred = $_POST['novocred'];
		$pode = CursoService::getByNome($novonome);
		if(is_null($pode)){
			$cursoatualizar = CursoService::getById($idcurs);
			$cursoatualizar->setNome($novonome);
			$cursoatualizar->setDept_id(DepartamentoService::getByNome($novodept)->getId());
			$cursoatualizar->setDuracao($novadura);
			$cursoatualizar->setCred_form($novocred);
			CursoService::alterar($cursoatualizar);
			$arrayretorno['novonome'] = $cursoatualizar->getNome();
			$arrayretorno['idcurs'] = $cursoatualizar->getId();
			$arrayretorno['iddept'] = $cursoatualizar->getDept_id();
			$arrayretorno['duracao'] = $cursoatualizar->getDuracao();
			$arrayretorno['creditos'] = $cursoatualizar->getCred_form();
			$arrayretorno['novodept'] = DepartamentoService::getByNome($novodept)->getNome();
			$retornoJSON = json_encode($arrayretorno);
			echo $retornoJSON;
		}
		else{
			$retornoJSON = json_encode(NULL);
			echo $retornoJSON;
		}
	}
}

?>