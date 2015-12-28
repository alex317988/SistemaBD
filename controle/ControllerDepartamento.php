<?php
require('../exibicao/DepartamentoView.php');
require('../persistencia/ConnectionUtil.php');
require('../persistencia/departamento/Departamento.php');
require('../persistencia/departamento/DepartamentoDao.php');
require('../persistencia/departamento/DepartamentoService.php');
require('../exibicao/InstitutoView.php');
require('../persistencia/instituto/Instituto.php');
require('../persistencia/instituto/InstitutoDao.php');
require('../persistencia/instituto/InstitutoService.php');
$tiporequest = $_SERVER['REQUEST_METHOD'];
if($tiporequest=="GET"){
	DepartamentoView::exibeDepartamentos();
}
else if($tiporequest=="POST"){
	$funcao = $_POST['funcao'];
	if($funcao=="deletar"){
		$iddept = $_POST['iddept'];
		$departamentodeletar = DepartamentoService::getById($iddept);
		DepartamentoService::delete($departamentodeletar);
	}
	else if($funcao=="criar"){
		$nomedept = $_POST['nomedept'];
		$idinst = $_POST['idinst'];
		$departamentocriar = new Departamento();
		$departamentocriar->setNome(utf8_encode($nomedept));
		$departamentocriar->setInst_id($idinst);
		$criou = DepartamentoService::inserir($departamentocriar);
		if(!is_null($criou)){
			$departamentocriado = DepartamentoService::getByNome($nomedept);
			$arrayretorno['nomedept'] = $nomedept;
			$arrayretorno['iddept'] = $departamentocriado->getId();
			$arrayretorno['idinst'] = $departamentocriado->getInst_id();
			$arrayretorno['nomeinst'] = InstitutoService::getById($idinst)->getNome();
			$institutos = InstitutoService::getInstitutos();
			for($i=0;$i<sizeof($institutos);$i++){
				$nomesinstitutos[$i] = $institutos[$i]->getNome();
				$idsinstitutos[$i] = $institutos[$i]->getId();
			}
			$arrayretorno['nomesinst'] = $nomesinstitutos;
			$arrayretorno['idsinst'] = $idsinstitutos;
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
		$iddept = $_POST['iddept'];
		$novoinst = $_POST['novoinst'];
		$pode = DepartamentoService::getByNome($novonome);
		if(is_null($pode)){
			$departamentoatualizar = DepartamentoService::getById($iddept);
			$departamentoatualizar->setNome($novonome);
			$departamentoatualizar->setInst_id(InstitutoService::getByNome($novoinst)->getId());
			DepartamentoService::alterar($departamentoatualizar);
			$arrayretorno['novonome'] = $departamentoatualizar->getNome();
			$arrayretorno['iddept'] = $departamentoatualizar->getId();
			$arrayretorno['novoinst'] = InstitutoService::getByNome($novoinst)->getNome();
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