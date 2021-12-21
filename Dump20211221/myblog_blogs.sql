-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: localhost    Database: myblog
-- ------------------------------------------------------
-- Server version	5.7.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8 NOT NULL,
  `content` longtext CHARACTER SET utf8 NOT NULL,
  `createtime` bigint(20) NOT NULL,
  `author` varchar(20) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (1,'标题1','内容1',1622798310021,'王刚'),(4,'标题5','内容5',1622798910021,'李五'),(5,'标题6','内容6',1622798910021,'老六'),(7,'狂人日记','小说',1623334192819,'鲁迅'),(16,'《朝花夕拾》','散文',1623475985099,'鲁迅'),(17,'白夜行','小说',1625058517835,'李四'),(18,'白夜追凶','潘粤明',1625058618417,'李四'),(19,'白金数据','东野圭吾',1625058764310,'李四'),(20,'嫌疑人X现身','《嫌疑人X的献身》是日本推理小说作家东野圭吾创作的长篇推理小说，也是“伽利略系列”的第三本小说。\n该作讲述一个数学天才为了帮助一对母女隐藏杀害前夫的罪行，和警方展开了一连串的斗智，制造整个骗局。 [1] \n该作同时获得直木奖和本格推理小说大奖，同时摘得“这本小说了不起”、“本格推理小说Top 10”、“周刊文艺推理小说Top 10”三大推理小说排行榜年度总冠军。',1625059337595,'李四'),(21,'秘密','东野圭吾',1625059393575,'李四'),(22,'孔乙己','小说',1625059941084,'鲁迅'),(23,'引爆点','马尔西姆布拉德韦尔',1626015427332,'鲁迅'),(24,'早晨从中午开始','路遥',1626015521553,'鲁迅'),(26,'admin添加的博客','admin添加的博客admin添加的博客admin添加的博客admin添加的博客admin添加的博客admin添加的博客',1634052151259,'管理员'),(27,'引爆点-马克西姆','引爆点-马克西姆引爆点-马克西姆引爆点-马克西姆---',1639731811166,'张三'),(28,'萨哈林旅行记 - 契科夫','❈ 契诃夫唯一非虚构作品，被他自称为散文衣橱里的“粗硬的囚衣”，旅行文学的必读之作。\n\n❈ 这是关于一次救赎之旅和朝圣之旅的游记，也是认识和理解19世纪俄国社会面貌、民众生活的珍贵史料。曾获得村上春树、金宇澄、迟子建等众多著名作家盛赞。\n\n❈ 本书包含北大历史学教授罗新专门为此版本撰写的导读，以及刁绍华先生和姜长斌先生解读本书的长文。本书正文之前，收入两位译者翻译的契诃夫旅行随笔《寄自西伯利亚》，作者以诗意的笔触讲述了他去往萨哈林途中的所见所闻，是《萨哈林旅行记》的重要补充。\n\n----------\n\n俄苏文学的经典之作和契诃夫最重要的作品之一。1890年，契诃夫从莫斯科启程来到萨哈林岛，目的是了解当地的生活和当地人的命运。他在萨哈林岛做了详细的人口调查，了解了当地居民的家庭、劳动、思想等等情况。归来后，他写出了《萨哈林旅行记》，于1895年出版。这本书融汇...',1639731916468,'张三');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-21  8:25:39
