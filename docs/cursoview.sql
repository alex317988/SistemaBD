CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `cursoview` AS
    SELECT 
        `curso`.`idCurso` AS `idCurso`,
        `curso`.`Nome` AS `Nome`,
        `curso`.`Duracao` AS `Duracao`
    FROM
        `curso`
    WHERE
        (`curso`.`Duracao` = 8)