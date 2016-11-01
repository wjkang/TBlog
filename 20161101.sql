CREATE DATABASE  IF NOT EXISTS `blog` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `blog`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	5.6.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_user`
--

DROP TABLE IF EXISTS `admin_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_user` (
  `admin_id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastloginip` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastlogintime` int(10) unsigned NOT NULL,
  `email` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `realname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_user`
--

LOCK TABLES `admin_user` WRITE;
/*!40000 ALTER TABLE `admin_user` DISABLE KEYS */;
INSERT INTO `admin_user` VALUES (1,'admin','admin','127.0.0.1',1478011003,'','',0);
/*!40000 ALTER TABLE `admin_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_statistics`
--

DROP TABLE IF EXISTS `home_statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `home_statistics` (
  `id` int(11) NOT NULL,
  `ip` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` int(10) unsigned NOT NULL DEFAULT '1',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createDate` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_statistics`
--

LOCK TABLES `home_statistics` WRITE;
/*!40000 ALTER TABLE `home_statistics` DISABLE KEYS */;
INSERT INTO `home_statistics` VALUES (1,'127.0.0.1',2,'2016-08-30 00:55:15','2016-08-30'),(0,'127.0.0.1',4,'2016-10-21 07:25:04','2016-10-21'),(0,'127.0.0.1',1,'2016-10-27 12:44:37','2016-10-27');
/*!40000 ALTER TABLE `home_statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_article`
--

DROP TABLE IF EXISTS `t_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_article` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '内码',
  `Title` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标题',
  `Content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容(html)',
  `MarkDown` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'MarkDown内容',
  `CategoryId` int(11) NOT NULL COMMENT '分类Id',
  `CreatedDate` datetime NOT NULL COMMENT '创建日期',
  `UpdatedDate` datetime NOT NULL COMMENT '更新日期',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_article`
--

LOCK TABLES `t_article` WRITE;
/*!40000 ALTER TABLE `t_article` DISABLE KEYS */;
INSERT INTO `t_article` VALUES (3,'','wqwqwqwqw','',0,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,'','<p>fgfgfffffffff<br></p>','',0,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,'','vbvbvb','',0,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `t_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_aticletagrelate`
--

DROP TABLE IF EXISTS `t_aticletagrelate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_aticletagrelate` (
  `Id` int(11) NOT NULL COMMENT '内码',
  `ArticleId` int(11) NOT NULL COMMENT '文章Id',
  `TagId` int(11) DEFAULT NULL COMMENT '标签Id',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='文章标签关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_aticletagrelate`
--

LOCK TABLES `t_aticletagrelate` WRITE;
/*!40000 ALTER TABLE `t_aticletagrelate` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_aticletagrelate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_category`
--

DROP TABLE IF EXISTS `t_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_category` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '内码',
  `Name` char(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '名称',
  `CreatedDate` datetime NOT NULL COMMENT '创建日期',
  `UpdatedDate` datetime NOT NULL COMMENT '更新日期',
  `Sort` int(5) NOT NULL DEFAULT '0' COMMENT '排序',
  `ParentId` int(11) DEFAULT '0' COMMENT '父分类Id',
  PRIMARY KEY (`Id`),
  KEY `IDX_T_Category_Id` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_category`
--

LOCK TABLES `t_category` WRITE;
/*!40000 ALTER TABLE `t_category` DISABLE KEYS */;
INSERT INTO `t_category` VALUES (1,'test','0000-00-00 00:00:00','2016-10-20 00:00:00',1,0),(2,'test2','0000-00-00 00:00:00','2016-10-20 00:00:00',0,0),(3,'qwqwqw','0000-00-00 00:00:00','2016-10-20 00:00:00',0,0),(4,'fgfgfg','0000-00-00 00:00:00','2016-10-20 00:00:00',0,0),(5,'vbvbvbv','0000-00-00 00:00:00','2016-10-20 00:00:00',0,0);
/*!40000 ALTER TABLE `t_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_tags`
--

DROP TABLE IF EXISTS `t_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_tags` (
  `Id` int(11) NOT NULL COMMENT '内码',
  `Name` varchar(45) NOT NULL COMMENT '名称',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='标签表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_tags`
--

LOCK TABLES `t_tags` WRITE;
/*!40000 ALTER TABLE `t_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_tags` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-01 23:01:44
