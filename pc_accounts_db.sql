-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: pc_accounts_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (25,'Lawrence','lawrencetan1104@gmail.com','$2a$12$NJ.iXoqf//fYm4KuzKqOFOjGe1IrNxtlVFLi9H4cj9Wm1uBVZfFTa');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `builds`
--

DROP TABLE IF EXISTS `builds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `builds` (
  `build_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `build_name` varchar(100) NOT NULL,
  `case_name` varchar(100) DEFAULT NULL,
  `ram` varchar(100) DEFAULT NULL,
  `cpu` varchar(100) DEFAULT NULL,
  `gpu` varchar(100) DEFAULT NULL,
  `motherboard` varchar(100) DEFAULT NULL,
  `cpucooler` varchar(100) DEFAULT NULL,
  `storage` varchar(100) DEFAULT NULL,
  `powersupply` varchar(100) DEFAULT NULL,
  `casefan` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`build_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `builds_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `builds`
--

LOCK TABLES `builds` WRITE;
/*!40000 ALTER TABLE `builds` DISABLE KEYS */;
INSERT INTO `builds` VALUES (24,25,'Admin 1','Corsair 4000D Airflow','Corsair Dominator Platinum RGB 32GB (2 x 16GB) DDR5 5200MHz','AMD Ryzen 7 7700X','NVIDIA GeForce RTX 4080','MSI MAG B650 Tomahawk WiFi','Noctua NH-D15','Seagate Barracuda 2TB','Corsair RM850x','Noctua NF-F12 PWM');
/*!40000 ALTER TABLE `builds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `cpu_name` varchar(100) DEFAULT NULL,
  `cpu_price` decimal(10,2) DEFAULT NULL,
  `mobo_name` varchar(100) DEFAULT NULL,
  `mobo_price` decimal(10,2) DEFAULT NULL,
  `gpu_name` varchar(100) DEFAULT NULL,
  `gpu_price` decimal(10,2) DEFAULT NULL,
  `ram_name` varchar(100) DEFAULT NULL,
  `ram_price` decimal(10,2) DEFAULT NULL,
  `cooler_name` varchar(100) DEFAULT NULL,
  `cooler_price` decimal(10,2) DEFAULT NULL,
  `storage_name` varchar(100) DEFAULT NULL,
  `storage_price` decimal(10,2) DEFAULT NULL,
  `psu_name` varchar(100) DEFAULT NULL,
  `psu_price` decimal(10,2) DEFAULT NULL,
  `case_name` varchar(100) DEFAULT NULL,
  `case_price` decimal(10,2) DEFAULT NULL,
  `casefan_name` varchar(100) DEFAULT NULL,
  `casefan_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `fk_order` (`order_id`),
  CONSTRAINT `fk_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (12,13,'AMD Ryzen 7 7700X',18358.20,'MSI MAG B650 Tomahawk WiFi',12275.44,'NVIDIA GeForce RTX 4080',66904.20,'Corsair Dominator Platinum RGB 32GB (2 x 16GB) DDR5 5200MHz',11159.44,'Noctua NH-D15',5574.42,'Seagate Barracuda 2TB',3068.44,'Corsair RM850x',7811.44,'Corsair 4000D Airflow',5300.44,'',0.00),(13,14,'AMD Ryzen 7 7700X',18358.20,'MSI MAG B650 Tomahawk WiFi',12275.44,'NVIDIA GeForce RTX 4080',66904.20,'Corsair Dominator Platinum RGB 32GB (2 x 16GB) DDR5 5200MHz',11159.44,'Noctua NH-D15',5574.42,'Seagate Barracuda 2TB',3068.44,'Corsair RM850x',7811.44,'Corsair 4000D Airflow',5300.44,'',0.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `apartment` varchar(100) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `save_info` tinyint(1) DEFAULT 0,
  `subtotal` decimal(10,2) NOT NULL,
  `shipping_fee` decimal(10,2) DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL,
  `payment_method` enum('Bank','Cash on Delivery') NOT NULL,
  `coupon_code` varchar(50) DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (13,25,'Lawrence','DLT Trading','Villa Annapolis','','san jose del monte city, bulacan','09550437508','lawrencetan1104@gmail.com',1,132123.23,0.00,132123.23,'Cash on Delivery','yes','2025-05-18 17:24:59'),(14,25,'Tan','Ireliance','Villa Annapolis','','san jose del monte city, SJDM','09952511018','lawrencetan1104@gmail.com',0,132123.23,0.00,132123.23,'Bank','LOL','2025-05-18 17:25:35');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-19  1:28:54
