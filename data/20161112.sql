ALTER TABLE `blog`.`t_article` 
CHANGE COLUMN `Content` `Content` LONGTEXT COLLATE 'utf8mb4_unicode_ci' NOT NULL COMMENT 'ÄÚÈÝ(html)' ,
CHANGE COLUMN `MarkDown` `MarkDown` LONGTEXT COLLATE 'utf8mb4_unicode_ci' NOT NULL COMMENT 'MarkDownÄÚÈÝ' ;
