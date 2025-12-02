-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: marly-server.mysql.database.azure.com    Database: tiendademarly
-- ------------------------------------------------------
-- Server version	8.0.42-azure

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
-- Table structure for table `clientefavorito`
--

DROP TABLE IF EXISTS `clientefavorito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientefavorito` (
  `fecha_registro` datetime(6) DEFAULT NULL,
  `id_cliente` bigint NOT NULL,
  `id_producto` bigint NOT NULL,
  PRIMARY KEY (`id_cliente`,`id_producto`),
  KEY `FK8co3tu4scntqxfsybese3lq2b` (`id_producto`),
  CONSTRAINT `FK8co3tu4scntqxfsybese3lq2b` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  CONSTRAINT `FKk43xqh52h151o11mmlytwjjat` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientefavorito`
--

LOCK TABLES `clientefavorito` WRITE;
/*!40000 ALTER TABLE `clientefavorito` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientefavorito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `puntos_fidelizacion` int DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `id_cliente` bigint NOT NULL AUTO_INCREMENT,
  `id_usuario` bigint DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `identificacion` varchar(255) DEFAULT NULL,
  `nombres` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `UKl8nfa1qkfrk958v1rx9h8anvb` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (0,'2002-07-22',1,14,'Villanueva','nay@gmail.com','Jr lima','78966533','Nayeli','943886781'),(0,'2003-06-23',2,15,'Coveñas','rrrrrrenzo545@gmail.com','Mi Perú','2','Renzo','949062161'),(0,'2002-06-11',3,16,'Bauml','jamesbauml@gmail.com','usa','93746528','James','836478746'),(0,'2004-07-11',4,17,'Gonzales','pepe@gmail.com','home','72536789','Pepe','765567567'),(0,'2000-01-01',5,1,'Lopez','juanitoooooosss@example.com','Direccion 1','10000001','Juanitoooooosss','900000001'),(0,'2000-01-02',6,2,'Perez','juanito@example.com','Direccion 2','10000002','Juanito','900000002'),(0,'2000-01-03',7,3,'Admin','admin@example.com','Direccion 3','10000003','Admin','900000003'),(0,'2000-01-04',8,4,'Marco','marco@example.com','Direccion 4','10000004','Marco','900000004'),(0,'2000-01-05',9,5,'Prueba','prueba@example.com','Direccion 5','10000005','Prueba','900000005'),(0,'2000-01-06',10,6,'Lopez','juanito98@example.com','Direccion 6','10000006','Juanito98','900000006'),(0,'2000-01-07',11,7,'Josue','josue@example.com','Direccion 7','10000007','Josue','900000007'),(0,'2000-01-08',12,8,'Maryen','maryen@example.com','Direccion 8','10000008','Maryen','900000008'),(0,'2000-01-09',13,9,'Abel','abel@example.com','Direccion 9','10000009','Abel','900000009'),(0,'2000-01-10',14,10,'Marco','marco23@example.com','Direccion 10','10000010','Marco23','900000010'),(0,'2000-01-11',15,11,'Sofia','sofia@example.com','Direccion 11','10000011','Sofia','900000011'),(0,'2000-01-12',16,12,'Angelo','angelo@example.com','Direccion 12','10000012','Angelo','900000012'),(0,'2000-01-13',17,13,'Tere','tere@example.com','Direccion 13','10000013','Tere','900000013'),(0,'2025-10-31',18,18,'Fernandez Cabrera','borisfernandezcabrera954@gmail.com','Los Ficus','75976505','Boris','994244794'),(0,'2025-10-31',19,19,'Fernandez','b.fernandez.fcalma@gmail.com','Los Ficus','7597650522','Juan','994244794'),(0,'2020-08-30',20,20,'norte','u22240951@gmail.com','Barrios Altos','74747474','cono','987654321'),(0,'2004-07-18',21,21,'Leon Moreno','marco_leon2004@outlook.com','Lima','72893256','Marco Antonio','925912701'),(0,'2004-07-18',22,22,'Leon Morenos','marcoantonioleonmoreno77@gmail.com','Lima','72893278','Marco josue','925912701'),(0,'1800-02-22',23,23,'hola','hola@example.com','hola','12345678','hola','123456789'),(0,'1980-01-21',24,24,'Boluarte','corrupto@example.com','En la esquina','23232323','Dina','987654321');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallepedidos`
--

DROP TABLE IF EXISTS `detallepedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detallepedidos` (
  `cantidad` int DEFAULT NULL,
  `precio_unitario` double DEFAULT NULL,
  `id_detalle` bigint NOT NULL AUTO_INCREMENT,
  `id_pedido` bigint DEFAULT NULL,
  `id_producto` bigint DEFAULT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `FKnv84qjfbiy9ki8k0p211e3w50` (`id_pedido`),
  KEY `FKfl8xyrakuyop6an7y5aa202sq` (`id_producto`),
  CONSTRAINT `FKfl8xyrakuyop6an7y5aa202sq` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  CONSTRAINT `FKnv84qjfbiy9ki8k0p211e3w50` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallepedidos`
--

LOCK TABLES `detallepedidos` WRITE;
/*!40000 ALTER TABLE `detallepedidos` DISABLE KEYS */;
INSERT INTO `detallepedidos` VALUES (1,35,1,1,1),(1,35,2,2,1),(8,35,3,3,1),(4,40,4,4,2),(1,28,5,5,5),(2,42,6,6,1),(1,18,7,7,3),(6,40,8,8,2),(2,10999,9,9,11),(6,10999,10,10,11),(3,45,11,11,1),(3,10999,12,12,11);
/*!40000 ALTER TABLE `detallepedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libroreclamaciones`
--

DROP TABLE IF EXISTS `libroreclamaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `libroreclamaciones` (
  `fecha_reclamo` datetime(6) DEFAULT NULL,
  `id_cliente` bigint DEFAULT NULL,
  `id_reclamo` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_reclamo`),
  KEY `FK8g1yjndk4o9974d8uiuuovwr1` (`id_cliente`),
  CONSTRAINT `FK8g1yjndk4o9974d8uiuuovwr1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libroreclamaciones`
--

LOCK TABLES `libroreclamaciones` WRITE;
/*!40000 ALTER TABLE `libroreclamaciones` DISABLE KEYS */;
INSERT INTO `libroreclamaciones` VALUES ('2025-11-25 00:33:38.248000',8,1,'reclamando'),('2025-11-25 23:00:15.993000',8,2,'lalallalalalala'),('2025-11-26 01:04:14.517000',20,3,'van a caer'),('2025-11-30 03:29:06.555000',8,5,'El producto llegó con fallas'),('2025-11-30 03:38:52.273000',20,7,'Compré una joya que llegó defectuosa y mal empaquetada. Al contactar atención al cliente no recibí solución. Solicito devolución, reemplazo o compensación, ya que el servicio y control de calidad recibido no cumplen con lo esperado.');
/*!40000 ALTER TABLE `libroreclamaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificaciones` (
  `id_notificacion` int NOT NULL AUTO_INCREMENT,
  `mensaje` text,
  `tipo` tinyint DEFAULT NULL,
  `fecha_envio` datetime DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`id_notificacion`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificaciones`
--

LOCK TABLES `notificaciones` WRITE;
/*!40000 ALTER TABLE `notificaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `preference_id` varchar(255) DEFAULT NULL,
  `payment_id` varchar(255) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `email_cliente` varchar(255) DEFAULT NULL,
  `cliente_id` bigint DEFAULT NULL,
  `pedido_id` bigint DEFAULT NULL,
  `merchant_order_id` varchar(255) DEFAULT NULL,
  `tipo_pago` varchar(100) DEFAULT NULL,
  `metodo_pago` varchar(100) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_actualizacion` datetime DEFAULT NULL,
  `fecha_aprobacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `preference_id` (`preference_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` VALUES (1,'756581887-efd6432e-46de-411d-8cd8-67bc7064ce10',NULL,'pending',35.00,'Compra en Marly Handmade - 1 productos','invitado@temp.com',NULL,NULL,NULL,NULL,NULL,'2025-11-21 00:13:30','2025-11-21 00:13:30',NULL),(2,'756581887-69d69e35-61f8-4bf9-b26f-db0a572deb88',NULL,'pending',35.00,'Compra en Marly Handmade - 1 productos','invitado@temp.com',NULL,NULL,NULL,NULL,NULL,'2025-11-21 00:40:26','2025-11-21 00:40:26',NULL),(3,'756581887-5707c400-e06c-4683-bd9a-8bb8f279ec77',NULL,'pending',75.00,'Compra en Marly Handmade - 2 productos','invitado@temp.com',NULL,NULL,NULL,NULL,NULL,'2025-11-21 01:05:38','2025-11-21 01:05:38',NULL),(4,'756581887-49c175fa-f569-4d8e-82d4-356d016ccf00',NULL,'pending',114.00,'Compra en Marly Handmade - 1 productos','invitado@temp.com',NULL,NULL,NULL,NULL,NULL,'2025-11-22 23:40:43','2025-11-22 23:40:43',NULL),(5,'756581887-96812697-4c12-4f1a-bf25-08676b869d16',NULL,'pending',114.00,'Compra en Marly Handmade - 1 productos','invitado@temp.com',NULL,NULL,NULL,NULL,NULL,'2025-11-22 23:40:44','2025-11-22 23:40:44',NULL),(6,'756581887-88ff8600-e363-43b5-826f-5b3809cde477',NULL,'pending',114.00,'Compra en Marly Handmade - 1 productos','invitado@temp.com',NULL,NULL,NULL,NULL,NULL,'2025-11-22 23:41:36','2025-11-22 23:41:36',NULL),(7,'756581887-6d98934b-0d02-48f7-af84-dd1801b34472',NULL,'pending',114.00,'Compra en Marly Handmade - 1 productos','invitado@temp.com',NULL,NULL,NULL,NULL,NULL,'2025-11-22 23:41:38','2025-11-22 23:41:38',NULL),(8,'756581887-fb99867a-5044-47f6-ab23-6f4eeefb46a8',NULL,'pending',102.00,'Compra en Marly Handmade - 2 productos','invitado@temp.com',NULL,NULL,NULL,NULL,NULL,'2025-11-25 00:38:02','2025-11-25 00:38:02',NULL),(9,'756581887-a2d53337-c171-456a-be1e-5ba517eb2ef0',NULL,'pending',3474.00,'Compra en Marly Handmade - 2 productos','invitado@temp.com',NULL,NULL,NULL,NULL,NULL,'2025-11-27 12:48:50','2025-11-27 12:48:50',NULL),(10,'756581887-5edf10c4-3313-43a4-8912-af3df352be38',NULL,'pending',18.00,'Compra en Marly Handmade - 1 productos','invitado@temp.com',NULL,NULL,NULL,NULL,NULL,'2025-11-27 13:02:57','2025-11-27 13:02:57',NULL),(11,'756581887-9b0f5e6e-499a-420c-973e-c178c6844af3',NULL,'pending',160.00,'Compra en Marly Handmade - 2 productos','invitado@temp.com',NULL,NULL,NULL,NULL,NULL,'2025-11-27 13:50:50','2025-11-27 13:50:50',NULL);
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `estado` bit(1) DEFAULT NULL,
  `total` double DEFAULT NULL,
  `fecha_pedido` datetime(6) DEFAULT NULL,
  `id_cliente` bigint DEFAULT NULL,
  `id_pedido` bigint NOT NULL AUTO_INCREMENT,
  `direccion_envio` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `FKdnomiluem4t3x66t6b9aher47` (`id_cliente`),
  CONSTRAINT `FKdnomiluem4t3x66t6b9aher47` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (_binary '\0',35,'2025-11-22 17:04:09.208000',11,1,'Direccion 7'),(_binary '\0',35,'2025-11-22 17:05:52.284000',11,2,'Direccion 7'),(_binary '\0',280,'2025-11-22 18:30:02.640000',12,3,'Direccion 8'),(_binary '\0',160,'2025-11-22 22:50:26.395000',12,4,'Direccion 8'),(_binary '\0',28,'2025-11-22 22:51:37.888000',12,5,'Direccion 8'),(_binary '\0',84,'2025-11-25 00:38:14.862000',8,6,'Direccion 4'),(_binary '\0',18,'2025-11-25 00:38:18.159000',8,7,'Direccion 4'),(_binary '\0',240,'2025-11-27 12:49:12.279000',21,8,'Lima'),(_binary '',21998,'2025-11-30 03:41:12.719000',20,9,'Barrios Altos'),(_binary '',65994,'2025-11-30 21:26:34.258000',18,10,'Los Ficus'),(_binary '\0',135,'2025-11-30 21:27:44.738000',18,11,'Los Ficus'),(_binary '\0',32997,'2025-11-30 21:27:47.779000',18,12,'Los Ficus');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `precio` double DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `id_producto` bigint NOT NULL AUTO_INCREMENT,
  `care` text,
  `categoria` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `details` text,
  `foto_principal` varchar(255) DEFAULT NULL,
  `foto_secundario` varchar(255) DEFAULT NULL,
  `foto_terciario` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `shipping_info` text,
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1100,_binary '',20,1,'Faltante','Faltante','Faltante','Faltante','https://res.cloudinary.com/cloudjosue/image/upload/v1763701335/rlfwulwabph34pbdiffe.jpg','https://res.cloudinary.com/cloudjosue/image/upload/v1764268589/jo7lwqvspwyo7fskr3iy.jpg','https://res.cloudinary.com/cloudjosue/image/upload/v1764268706/gfy2z8axfr8dvpbkxjky.png','Hanging natural shell earrings with pearl','Envío nacional con empaque ecológico y protección especial para productos artesanales. Entregas entre 3 a 5 días hábiles.'),(23,_binary '',20,2,'Faltante','Faltante','Faltante','Faltante','https://res.cloudinary.com/cloudjosue/image/upload/v1763701459/etsvebrnntpylus6nkqe.png','https://res.cloudinary.com/cloudjosue/image/upload/v1764268930/b9pexnaj87doskluqyeb.jpg','https://res.cloudinary.com/cloudjosue/image/upload/v1764268934/pqbtplquqroq0tm7xpge.jpg','Collar Bohemio de Cuencas y Dijes','Envío nacional disponible. El producto se entrega en empaques ecológicos y protectores para evitar daños durante el traslado.'),(18,_binary '',11,3,'Evitar contacto con agua, perfumes y cremas. Limpiar con un paño suave y guardar en un lugar seco para mantener el brillo de las piezas doradas.','Bracelet','Pulsera artesanal de estilo marino elaborada con cuentas azules, blancas y doradas, acompañada de un dije de tortuga en tono marfil. Su diseño fresco y veraniego la convierte en un accesorio perfecto para looks playeros o casuales.','Hecha a mano con combinación de cuentas en tonos oceánicos y detalles dorados. Incluye un dije de tortuga tallado y una estrella marina decorativa. Pulsera elástica, cómoda y ajustable.','https://res.cloudinary.com/cloudjosue/image/upload/v1763701609/jquek3fb7ldljxkrhmd6.png','','','Pulsera Skye con dije de tortuga','Envío nacional con embalaje protector y ecológico. La pulsera se entrega en una bolsita segura para evitar daños durante el traslado.'),(38,_binary '',12,4,'Guardar en un lugar seco, evitar contacto con agua, perfumes o cremas para prolongar el color dorado. Limpiar suavemente con un paño seco.','Earrings','Aretes colgantes de concha dorada con detalles perlados y dijes marinos. Complemento elegante y veraniego, ideal para outfits playeros o looks sofisticados. Diseño artesanal ligero y cómodo para usar durante todo el día.','Aretes elaborados a mano con conchas doradas texturizadas, dijes marinos y perlas sintéticas. Su diseño inspirado en el estilo boho–chic los hace perfectos para eventos, cenas o salidas casuales. Cierre tipo gancho, resistente y cómodo.','https://res.cloudinary.com/cloudjosue/image/upload/v1763702079/flmbgghucycv26z5wh0x.png','https://res.cloudinary.com/cloudjosue/image/upload/v1763702085/pl0vbnytcdhemsua0u2o.png','https://res.cloudinary.com/cloudjosue/image/upload/v1763702087/scipapbwzaj8mdmdd7t7.png','Aretes Colgantes de Concha Dorada','Envíos nacionales e internacionales. Empaquetado seguro y ecológico para evitar daños durante el transporte.'),(28,_binary '',14,5,'Evitar exponer la pulsera al agua o sustancias químicas para conservar el color y la textura. Limpiar las cuentas con un paño suave y mantener guardada en un lugar seco.','Bracelet','Pulsera artesanal elaborada con hilo resistente y cuentas naturales de piedra pulida. Su diseño minimalista y ajustable la convierte en un accesorio ideal para uso diario o para complementar estilos boho y casuales.','Cada pulsera está tejida a mano utilizando hilos encerados de alta durabilidad y cuentas de piedra natural, por lo que cada pieza presenta ligeras variaciones únicas en color y patrón. Cuenta con un cierre ajustable que se adapta cómodamente a cualquier muñeca.','https://res.cloudinary.com/cloudjosue/image/upload/v1763732560/n1jwn6qrh0qrcax1jdej.png','https://res.cloudinary.com/cloudjosue/image/upload/v1763732566/gvlbk92gy7ofml2p89tz.png','https://res.cloudinary.com/cloudjosue/image/upload/v1763732569/idpy3eyk0jaawrr6fpxa.png','Pulsera tejida con cuentas hecha a mano','Envío estándar disponible. El producto se entrega en un envoltorio protegido para evitar daños durante el transporte.'),(10999,_binary '',39,11,'Evitar exposición prolongada a temperaturas extremas, limpiar regularmente con aire comprimido','GPU','Tarjeta gráfica de última generación con arquitectura Astral','Incluye sistema de refrigeración avanzada, soporte Ray Tracing y DLSS 4.0','https://res.cloudinary.com/cloudjosue/image/upload/v1764487896/pe6qiztscptljkiwllyc.webp','https://res.cloudinary.com/cloudjosue/image/upload/v1764487900/ure6qnr2zrnz2itx4ezf.png','https://res.cloudinary.com/cloudjosue/image/upload/v1764487902/chybooooyz61uhsb6cpr.png','RTX 5090 ROG Astral','Envío estándar en 5-7 días hábiles, embalaje seguro');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promociones`
--

DROP TABLE IF EXISTS `promociones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promociones` (
  `fecha_fin` date DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `porcentaje_descuento` float DEFAULT NULL,
  `id_producto` bigint DEFAULT NULL,
  `id_promocion` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_promocion`),
  KEY `FKt7gckfxxeiexrjqtkytk6qir3` (`id_producto`),
  CONSTRAINT `FKt7gckfxxeiexrjqtkytk6qir3` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promociones`
--

LOCK TABLES `promociones` WRITE;
/*!40000 ALTER TABLE `promociones` DISABLE KEYS */;
/*!40000 ALTER TABLE `promociones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `rol` int DEFAULT NULL,
  `estado` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'juanitoooooosss','$2a$10$kfCHl/xvqwl3s0rCtjXcyOnUCjLRTyRN2LmVJzMAd4F/5asHksMFG',0,_binary ''),(2,'juanito','$2a$10$WhzFpuD0NbPiJJqsT.g.tueCpy3juoO3RGQXz5GUCJKLo3Z9e.Fn6',1,_binary ''),(3,'admin','$2a$10$7sDkUe8vqY8ZC0y7Y8z8vOzvGg9bYfbbmG5hVfA7zCkq.v5RM9q8K',0,_binary ''),(4,'marco','$2a$10$waQQI/xYyNV423xv9YAYm.o/02TtndBHnZLrVWmrFjOO1nI/QqhyO',0,_binary ''),(5,'prueba','$2a$10$M8rknfbKJ06Vzy7v0.hDIeg64Ri/z30I7axLtSc/U6N1kGuYlcMie',1,_binary ''),(6,'juanito98','$2a$10$GnLZWL/32fSMLqplvgOdjOQt/pZ8vlnb6/5tNEk9uC6RQlQEnr.5u',1,_binary ''),(7,'Josue','$2a$10$T/tcbbBRV4U1CZCgnJqgP.Xw0hoKU8cqKs3rOKAG51PYS3GD.trvS',1,_binary ''),(8,'Maryen','$2a$10$5suXjhCq/R1FS1hpWTxheOFVbw8jt0ZQ77Uif4c32xPNtU3Uq22G6',0,_binary ''),(9,'Abel','$2a$10$qJ5VwC/1Huy4UhrhVteBhOcGXSddu6RmnaPPaCQ5BXYAS9TVS2AEe',1,_binary ''),(10,'Marco23','$2a$10$BFGneG0Du3kUtmnnQgiKBe14/jzR/De1KZqr1mJEfl2/nzE6MLSj2',1,_binary ''),(11,'Sofia','$2a$10$aBzII5va/EKKc.RI9puJQeRegCSnADQ3nV1K9fjNaoVfOPM008Mt.',1,_binary ''),(12,'Angelo','$2a$10$CQrR/WvhwCo9EFMTO8hscO1hLN0XbDregOvkkd2IwbkF2YDMYpPWm',1,_binary ''),(13,'Tere','$2a$10$2L3I.Ey.9OrBzVg1eLVQsOXUJdDsuCiY47aHuB.mCUw6X8b0amiGS',1,_binary ''),(14,'Nayeli','$2a$10$/Cnybyzb1TVA5DRf.PeCCOYFumPJwQA7TjIAg3SZqPDTG6P7YS5ke',1,_binary ''),(15,'Renzo','$2a$10$ZvHati53q65bWIte9wWlM.tn47pIxqZsMdVti.CduqOLuR3339G6K',1,_binary ''),(16,'James','$2a$10$w4RmPGQp.QhPIgwjHGKlU.5p5yTZKYwrYnA6q22eTrdwP1FpptgwO',1,_binary ''),(17,'Pepe','$2a$10$4VP2RKVpTM6.d/dqL7jAJeylja16/RXZqmambjThAY0G4wUJ5SQby',1,_binary ''),(18,'Boris Fernandez Cabrera','$2a$10$MZOyAKaL1kMtUklhQp5tY.fVm2loNL.SiNrVQuwm.sS3AiS.7TyhO',1,_binary ''),(19,'Juan','$2a$10$UHeIFeiW/gZYK8OYjji14.hRZ.MITDpijVlSpSRRYr38T6Im47Kjm',1,_binary ''),(20,'extorsionador','$2a$10$Ur17jvQvLqZ.VZCEZ01zdOcJHnKmjoXkdBhUWH9uO1rsMUntxQM7G',1,_binary ''),(21,'Marco123','$2a$10$BMk.iPj13nmVYvB/IEMHWuy53WhCO2ZnalVXA9VdUePmwihCFgDva',1,_binary ''),(22,'MarcusELPro123','$2a$10$AjQRokLcBrFYzrvEABbV.u.TxF82.oyFfrLtLvHNSpfxBgE3XNihe',1,_binary ''),(23,'HOLA','$2a$10$QJ5h3Hl/Hu3WtU3dHiMT.uU2J87ASv/54tnwCqx6VWotCa/kXOCJG',1,_binary ''),(24,'corrupto','$2a$10$CZnVBctYP0wYMoPyGvjri.l2hX5Q8QJNvHexJpXiBInbhbt4VEide',1,_binary '');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-02  0:13:57
