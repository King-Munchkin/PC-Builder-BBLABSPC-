-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 19, 2025 at 12:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pc_parts_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `case_fans`
--

CREATE TABLE `case_fans` (
  `fan_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `fan_type` varchar(10) NOT NULL,
  `size` int(11) NOT NULL,
  `rpm_range` varchar(20) NOT NULL,
  `airflow` varchar(20) NOT NULL,
  `tdp` int(11) NOT NULL,
  `noise_level` varchar(20) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `rgb` tinyint(1) NOT NULL,
  `quantity` int(11) NOT NULL,
  `stocks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `case_fans`
--

INSERT INTO `case_fans` (`fan_id`, `name`, `fan_type`, `size`, `rpm_range`, `airflow`, `tdp`, `noise_level`, `price`, `rgb`, `quantity`, `stocks`) VALUES
(1, 'Noctua NF-F12 PWM', 'PWM', 120, '300–1500 RPM', '54.97 CFM', 5, '22.4 dBA', 1671.21, 0, 1, 44),
(2, 'Corsair ML120 PRO RGB', 'PWM', 120, '400–1600 RPM', '47.3 CFM', 6, '25.0 dBA', 1952.44, 1, 1, 22),
(3, 'be quiet! Silent Wings 3', 'PWM', 120, '1450 RPM', '50.5 CFM', 4, '16.4 dBA', 1389.42, 0, 1, 39),
(4, 'ARCTIC F12 PWM PST', 'PWM', 120, '600–1350 RPM', '53.0 CFM', 4, '22.5 dBA', 501.64, 0, 1, 22),
(5, 'Thermaltake Riing 12 RGB', 'PWM', 120, '500–1500 RPM', '48.8 CFM', 5, '24.8 dBA', 1115.44, 1, 1, 43),
(6, 'Noctua NF-A12x25 PWM', 'PWM', 120, '450–2000 RPM', '60.1 CFM', 5, '22.6 dBA', 1668.42, 0, 1, 48),
(8, 'be quiet! Pure Wings 2 120mm', 'PWM', 120, '1500 RPM', '51.4 CFM', 4, '19.2 dBA', 719.82, 0, 1, 9),
(9, 'Cooler Master MasterFan MF120R ARGB', 'PWM', 120, '650–2000 RPM', '59 CFM', 6, '31 dBA', 1115.44, 1, 1, 13),
(10, 'ARCTIC F12 PWM', 'PWM', 120, '600–1350 RPM', '53 CFM', 4, '22.5 dBA', 501.64, 0, 1, 35),
(11, 'NZXT Aer RGB 2 120mm', 'PWM', 120, '500–1500 RPM', '52.44 CFM', 5, '22 dBA', 1673.44, 1, 1, 37),
(12, 'Fractal Design Dynamic X2 GP-12', 'PWM', 120, '500–2000 RPM', '52.3 CFM', 5, '32.2 dBA', 836.44, 0, 1, 29),
(13, 'Phanteks PH-F120MP', 'PWM', 120, '500–1800 RPM', '53.3 CFM', 5, '25.3 dBA', 836.44, 0, 1, 35),
(14, 'Deepcool RF120 RGB', 'PWM', 120, '500–1500 RPM', '56.5 CFM', 5, '27 dBA', 724.84, 1, 1, 35),
(15, 'Rosewill RGBF-23001', 'PWM', 120, '800–1500 RPM', '33.1 CFM', 4, '26 dBA', 445.84, 1, 1, 19),
(16, 'Montech RX 120 ARGB', 'PWM', 120, '600–1600 RPM', '58.4 CFM', 5, '25.3 dBA', 557.44, 1, 1, 42),
(17, 'Okinos Hurricane Series 120mm', 'PWM', 120, '1500 RPM', '67 CFM', 5, '28 dBA', 189.72, 0, 1, 2),
(18, 'NZXT F120Q', 'PWM', 120, '500–1700 RPM', '74.26 CFM', 6, '25.1 dBA', 836.44, 0, 1, 31),
(19, 'be quiet! Pure Wings 3 White 120mm', 'PWM', 120, '1500 RPM', '49.9 CFM', 5, '25.5 dBA', 749.95, 0, 1, 2),
(20, 'Cooler Master SickleFlow 120 V2', 'PWM', 120, '650–1800 RPM', '62 CFM', 5, '27 dBA', 724.84, 0, 1, 14),
(21, 'ARCTIC P12 PWM PST Value Pack', 'PWM', 120, '200–1800 RPM', '56 CFM', 5, '22 dBA', 1277.82, 0, 3, 12),
(22, 'Noctua NF-S12B redux-1200', 'PWM', 120, '300–1200 RPM', '55.0', 4, '18.1 dBA', 831.42, 0, 2, 21),
(23, 'Corsair AF120 Quiet Edition', 'PWM', 120, '1000–2000 RPM', '52.2', 5, '25.0 dBA', 1003.84, 0, 3, 16),
(24, 'be quiet! Silent Wings 4 140mm', 'PWM', 140, '1500 RPM', '57.5', 6, '15.5 dBA', 1389.42, 0, 2, 17),
(25, 'Thermaltake Pure 12 ARGB Sync', 'PWM', 120, '500–1850 RPM', '50.0', 5, '22.0 dBA', 1115.44, 1, 4, 36),
(26, 'ARCTIC P14 PWM PST', 'PWM', 140, '200–1700 RPM', '93.0', 5, '24.9 dBA', 669.04, 0, 5, 30),
(27, 'Phanteks PH-F120MP', 'PWM', 120, '500–1800 RPM', '53.3', 5, '25.3 dBA', 836.44, 0, 2, 39),
(28, 'Deepcool RF120 FS', 'PWM', 120, '500–1500 RPM', '45.2', 5, '26.2 dBA', 697.50, 1, 3, 6),
(29, 'NZXT AER F120', 'PWM', 120, '500–1800 RPM', '52.44', 5, '22.4 dBA', 1227.04, 0, 2, 14),
(30, 'Cooler Master MasterFan MF200R ARGB', 'PWM', 200, '650–2000 RPM', '59.0', 6, '31.0 dBA', 1338.64, 1, 3, 49),
(31, 'ARCTIC P12 PST CO', 'PWM', 120, '600–1800 RPM', '56.3', 5, '24.5 dBA', 780.64, 0, 4, 2),
(32, 'Noctua NF-A14 PWM redux', 'PWM', 140, '300–1500 RPM', '82.5', 5, '21.8 dBA', 1001.61, 0, 2, 15),
(33, 'Corsair QL120 RGB', 'PWM', 120, '600–1500 RPM', '43.25', 1, '24.8 dBA', 1785.04, 1, 3, 17),
(34, 'be quiet! Pure Wings 3 White', 'PWM', 120, '1500 RPM', '49.9', 5, '25.5 dBA', 749.95, 0, 5, 42),
(35, 'Thermaltake Riing 14 RGB', 'PWM', 140, '500–1400 RPM', '53.5', 5, '28.0 dBA', 892.24, 1, 2, 6),
(36, 'ARCTIC F14 PWM PST', 'PWM', 140, '200–1700 RPM', '79.0', 5, '25.0 dBA', 780.64, 0, 4, 5),
(37, 'Noctua redux NF-S12B 1200', 'PWM', 120, '300–1200 RPM', '55.0', 5, '18.1 dBA', 719.82, 0, 3, 6),
(38, 'Lian Li Uni Fan SL120', 'PWM', 120, '700–1900 RPM', '61.0', 5, '28.5 dBA', 948.04, 1, 2, 13),
(39, 'Thermaltake Toughfan 12', 'PWM', 120, '600–1800 RPM', '64.2', 1, '30.5 dBA', 1003.84, 1, 5, 47),
(40, 'Phanteks PH-F140TS 140mm', 'PWM', 140, '500–1300 RPM', '58.0', 6, '22.1 dBA', 1115.44, 0, 3, 45),
(41, 'CoolMaster X', 'Axial', 120, '1500-2500 RPM', '75 CFM', 90, '32 dB', 1115.44, 1, 100, 50),
(42, 'HyperFlow 2000', 'Radial', 140, '1800-3000 RPM', '90 CFM', 100, '28 dB', 1450.24, 0, 200, 30),
(43, 'QuietBlower', 'Axial', 120, '1000-1500 RPM', '55 CFM', 80, '22 dB', 892.24, 1, 50, 20),
(44, 'WindForce Turbo', 'Radial', 180, '2000-3500 RPM', '120 CFM', 110, '35 dB', 1673.44, 1, 150, 100),
(45, 'SilentFlow', 'Axial', 120, '1200-2000 RPM', '70 CFM', 95, '29 dB', 1003.84, 0, 75, 60);

-- --------------------------------------------------------

--
-- Table structure for table `ComputerCases`
--

CREATE TABLE `ComputerCases` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `form_factor` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `stocks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ComputerCases`
--

INSERT INTO `ComputerCases` (`id`, `name`, `price`, `form_factor`, `color`, `weight`, `stocks`) VALUES
(1, 'NZXT H510', 4463.44, 'ATX', 'Black', 6.50, 39),
(2, 'Corsair 4000D Airflow', 5300.44, 'ATX', 'White', 7.80, 34),
(3, 'Cooler Master MasterBox NR600', 3905.44, 'ATX', 'Black', 6.10, 3),
(4, 'Fractal Design Meshify C', 5579.44, 'ATX', 'Black', 6.40, 7),
(5, 'Phanteks Eclipse P400A', 5021.44, 'ATX', 'Black', 7.00, 28),
(6, 'Lian Li Lancool II Mesh', 6137.44, 'ATX', 'White', 8.30, 19),
(7, 'be quiet! Pure Base 500DX', 6416.44, 'ATX', 'Black', 7.40, 11),
(8, 'Thermaltake Versa H18', 2789.44, 'Micro-ATX', 'Black', 4.60, 46),
(9, 'Cooler Master MasterBox Q300L', 2789.44, 'Micro-ATX', 'Black', 4.50, 47),
(10, 'Fractal Design Focus G Mini', 3347.44, 'Micro-ATX', 'White', 4.40, 45),
(11, 'Thermaltake Core V21', 3905.44, 'Micro-ATX', 'Black', 6.50, 35),
(12, 'Phanteks Enthoo Pro', 6137.44, 'E-ATX', 'Black', 11.20, 39),
(13, 'Lian Li PC-O11 Dynamic', 7811.44, 'E-ATX', 'Black', 8.50, 42),
(14, 'Corsair 7000D Airflow', 14507.44, 'E-ATX', 'Black', 18.00, 39),
(15, 'Cooler Master HAF 700 EVO', 19529.44, 'E-ATX', 'Black', 20.80, 20),
(16, 'be quiet! Dark Base Pro 900 Rev. 2', 15065.44, 'E-ATX', 'Black', 15.60, 34),
(17, 'Phanteks Eclipse P600S', 8369.44, 'E-ATX', 'Gray', 13.80, 7),
(18, 'Thermaltake View 71 TG', 9485.44, 'E-ATX', 'Black', 18.90, 33),
(19, 'SilverStone Primera PM01', 6695.44, 'ATX', 'Red', 7.60, 43),
(20, 'NZXT H7 Flow', 7253.44, 'ATX', 'White', 7.90, 14),
(26, 'NZXT H510', 3905.44, 'Mid Tower', 'Black', 7.20, 148),
(27, 'Corsair 4000D', 3905.44, 'Mid Tower', 'White', 7.00, 200),
(28, 'Fractal Design Meshify C', 5021.44, 'Mid Tower', 'Black', 7.40, 100),
(29, 'Cooler Master MasterBox Q300L', 3347.44, 'Mini Tower', 'Black', 5.50, 120),
(32, 'TEST Corsair 4000D Airflow', 360244.80, 'Mid Tower', 'White', 7.20, 66);

-- --------------------------------------------------------

--
-- Table structure for table `cpu_cooler`
--

CREATE TABLE `cpu_cooler` (
  `cooler_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `supported_sockets` varchar(255) NOT NULL,
  `fan_rpm_range` varchar(50) DEFAULT NULL,
  `tdp` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stocks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cpu_cooler`
--

INSERT INTO `cpu_cooler` (`cooler_id`, `name`, `type`, `supported_sockets`, `fan_rpm_range`, `tdp`, `price`, `stocks`) VALUES
(1, 'Noctua NH-D15', 'Air', 'AM4,AM5,LGA1200,LGA1700,LGA1151,LGA2066', '300-1500', 220, 5574.42, 34),
(2, 'be quiet! Dark Rock Pro 4', 'Air', 'AM4,AM5,LGA1200,LGA1700,LGA1151,LGA2066', '200-2000', 250, 5016.42, 38),
(3, 'Corsair iCUE H100i RGB PRO XT', 'Liquid', 'AM4,AM5,LGA1200,LGA1700,LGA1151', '4000', 250, 6695.44, 33),
(4, 'NZXT Kraken X63', 'Liquid', 'AM4,AM5,LGA1200,LGA1700,LGA1151', '500-1800', 280, 7253.44, 4),
(5, 'Arctic Freezer II 280', 'Liquid', 'AM4,AM5,LGA1200,LGA1700,LGA1151', '200-1800', 250, 5021.44, 17),
(6, 'DeepCool Assassin III', 'Air', 'AM4,AM5,LGA1200,LGA1700,LGA1151', '500-1800', 280, 4463.44, 25),
(7, 'Scythe Mugen 5 Rev. B', 'Air', 'AM4,AM5,LGA1200,LGA1700,LGA1151', '300-1400', 200, 3347.44, 24),
(8, 'Cooler Master Hyper 212 EVO V2', 'Air', 'AM4,LGA1200,LGA1700,LGA1151', '650-2000', 180, 1952.44, 43),
(9, 'ARCTIC Freezer 7 X', 'Air', 'AM4,LGA1200,LGA1151', '450-1600', 150, 1115.44, 43),
(10, 'Thermalright Peerless Assassin 120', 'Air', 'AM4,AM5,LGA1200,LGA1700,LGA1151', '300-1600', 180, 2231.44, 35),
(11, 'EK-AIO 240 D-RGB', 'Liquid', 'AM4,AM5,LGA1200,LGA1700,LGA1151', '500-2200', 260, 5579.44, 48),
(12, 'ID-Cooling SE-224-XT', 'Air', 'AM4,LGA1200,LGA1151', '200-1800', 180, 1673.44, 31),
(13, 'Fractal Design Lumen S36', 'Liquid', 'AM4,AM5,LGA1200,LGA1700,LGA1151', '500-2000', 280, 7811.44, 12),
(14, 'Cooler Master MasterLiquid ML360R', 'Liquid', 'AM4,AM5,LGA1200,LGA1700,LGA1151', '650-2000', 300, 8369.44, 19),
(15, 'Noctua NH-L9a', 'Air', 'AM4,LGA1151', '600-2500', 65, 2505.42, 5),
(16, 'ThermalMaster 5000', 'Air', 'LGA 1200, LGA 1151', '1200-2000 RPM', 150, 5021.44, 120),
(17, 'SilentBreeze 200', 'Liquid', 'AM4, LGA 1151', '900-1600 RPM', 250, 6695.44, 75),
(18, 'CoolerKing 600', 'Air', 'LGA 1700, AM4', '1500-2500 RPM', 200, 3905.44, 200),
(19, 'VortexFlow X', 'Liquid', 'LGA 1200, AM4', '1000-1800 RPM', 180, 5356.24, 90),
(20, 'StormCool Pro', 'Air', 'LGA 1151, AM4', '1300-2200 RPM', 120, 2789.44, 250),
(21, 'TEST Cooler 1', 'Air', 'AM4, LGA1200', '1200-2200 RPM', 95, 2231.44, 50),
(22, 'TEST Cooler 2', 'Liquid', 'AM4, LGA1151', '1500-2500 RPM', 150, 5579.44, 30),
(23, 'TEST Cooler 3', 'Air', 'LGA1151, LGA2066', '1000-2000 RPM', 110, 3347.44, 70),
(24, 'TEST Cooler 4', 'Liquid', 'AM4, LGA1700', '1300-2300 RPM', 200, 7253.44, 40),
(25, 'TEST Cooler 5', 'Air', 'AM4, LGA1200', '1100-2100 RPM', 100, 2789.44, 60),
(26, 'Cooler Master Hyper 212', 'Air', 'AM4, LGA1200, LGA115x', '600-2000 RPM', 150, 2008.24, 50),
(27, 'Noctua NH-D15', 'Air', 'AM4, LGA115x, LGA1200', '300-1500 RPM', 250, 5021.44, 34),
(28, 'Corsair iCUE H100i', 'Liquid', 'AM4, LGA1200, LGA115x', '400-2400 RPM', 280, 7811.44, 25),
(29, 'NZXT Kraken X73', 'Liquid', 'AM4, LGA1200, LGA115x', '500-2000 RPM', 360, 10601.44, 15),
(30, 'TEST Cooler Master Hyper 212 EVO', 'Air', 'LGA 1151, AM4', '600-2000 RPM', 150, 2008.24, 25),
(31, 'TEST Noctua NH-D15', 'Air', 'LGA 1151, AM4', '300-1500 RPM', 220, 5021.44, 10),
(32, 'TEST Corsair iCUE H150i ELITE CAPELLIX', 'Liquid', 'LGA 1151, AM4', '800-2500 RPM', 360, 10043.44, 15);

-- --------------------------------------------------------

--
-- Table structure for table `gpu`
--

CREATE TABLE `gpu` (
  `gpu_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `chipset` varchar(50) NOT NULL,
  `memory_type` varchar(50) NOT NULL,
  `memory_size` int(11) NOT NULL,
  `interface` varchar(10) NOT NULL,
  `power_draw` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stocks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gpu`
--

INSERT INTO `gpu` (`gpu_id`, `name`, `chipset`, `memory_type`, `memory_size`, `interface`, `power_draw`, `price`, `stocks`) VALUES
(1, 'NVIDIA GeForce RTX 4090', 'RTX 40', 'GDDR6X', 24, 'PCIe 4.0', 450, 89224.20, 17),
(2, 'NVIDIA GeForce RTX 4080', 'RTX 40', 'GDDR6X', 16, 'PCIe 4.0', 320, 66904.20, 25),
(3, 'NVIDIA GeForce RTX 4070 Ti', 'RTX 40', 'GDDR6X', 12, 'PCIe 4.0', 285, 44584.20, 21),
(4, 'NVIDIA GeForce RTX 4070', 'RTX 40', 'GDDR6X', 12, 'PCIe 4.0', 200, 33424.20, 28),
(5, 'NVIDIA GeForce RTX 4060 Ti', 'RTX 40', 'GDDR6', 8, 'PCIe 4.0', 160, 22264.20, 27),
(6, 'AMD Radeon RX 7900 XTX', 'RX 7000', 'GDDR6', 24, 'PCIe 4.0', 355, 55744.20, 49),
(7, 'AMD Radeon RX 7900 XT', 'RX 7000', 'GDDR6', 20, 'PCIe 4.0', 300, 50164.20, 17),
(8, 'AMD Radeon RX 7800 XT', 'RX 7000', 'GDDR6', 16, 'PCIe 4.0', 265, 30634.20, 34),
(9, 'AMD Radeon RX 7700 XT', 'RX 7000', 'GDDR6', 12, 'PCIe 4.0', 230, 25054.20, 19),
(10, 'AMD Radeon RX 7600', 'RX 7000', 'GDDR6', 8, 'PCIe 4.0', 165, 14452.20, 44),
(11, 'Intel Arc A770', 'Arc', 'GDDR6', 16, 'PCIe 4.0', 225, 19529.44, 11),
(12, 'Intel Arc A750', 'Arc', 'GDDR6', 12, 'PCIe 4.0', 200, 15623.44, 23),
(13, 'NVIDIA GeForce RTX 3080 Ti', 'RTX 30', 'GDDR6X', 12, 'PCIe 4.0', 350, 66904.20, 33),
(14, 'NVIDIA GeForce RTX 3080', 'RTX 30', 'GDDR6X', 10, 'PCIe 4.0', 320, 39004.20, 44),
(15, 'NVIDIA GeForce RTX 3070 Ti', 'RTX 30', 'GDDR6X', 8, 'PCIe 4.0', 290, 33424.20, 22),
(16, 'NVIDIA GeForce RTX 3070', 'RTX 30', 'GDDR6', 8, 'PCIe 4.0', 220, 27844.20, 26),
(17, 'AMD Radeon RX 6900 XT', 'RX 6000', 'GDDR6', 16, 'PCIe 4.0', 300, 55744.20, 13),
(18, 'AMD Radeon RX 6800 XT', 'RX 6000', 'GDDR6', 16, 'PCIe 4.0', 250, 36214.20, 39),
(19, 'AMD Radeon RX 6800', 'RX 6000', 'GDDR6', 16, 'PCIe 4.0', 250, 32308.20, 6),
(20, 'AMD Radeon RX 6700 XT', 'RX 6000', 'GDDR6', 12, 'PCIe 4.0', 230, 26728.20, 10),
(21, 'NVIDIA GeForce RTX 3060', 'RTX 30', 'GDDR6', 12, 'PCIe 4.0', 170, 18358.20, 30),
(22, 'AMD Radeon RX 6600', 'RX 6000', 'GDDR6', 8, 'PCIe 4.0', 132, 12778.20, 22),
(23, 'NVIDIA GeForce RTX 3050', 'RTX 30', 'GDDR6', 8, 'PCIe 4.0', 130, 13894.20, 21),
(24, 'Intel Arc A380', 'Arc', 'GDDR6', 6, 'PCIe 4.0', 75, 7756.20, 37),
(25, 'NVIDIA GeForce RTX 4060', 'RTX 40', 'GDDR6', 8, 'PCIe 4.0', 115, 16684.20, 22),
(26, 'AMD Radeon RX 7600', 'RX 7000', 'GDDR6', 8, 'PCIe 4.0', 165, 15010.20, 50),
(27, 'NVIDIA GeForce RTX 4070', 'RTX 40', 'GDDR6X', 12, 'PCIe 4.0', 200, 33424.20, 32),
(28, 'Intel Arc A750', 'Arc', 'GDDR6', 12, 'PCIe 4.0', 225, 16126.20, 9),
(29, 'NVIDIA GeForce RTX 4080', 'RTX 40', 'GDDR6X', 16, 'PCIe 4.0', 320, 66904.20, 1),
(30, 'AMD Radeon RX 7800 XT', 'RX 7000', 'GDDR6', 16, 'PCIe 4.0', 250, 36214.20, 24),
(31, 'NVIDIA GeForce RTX 4090', 'RTX 40', 'GDDR6X', 24, 'PCIe 5.0', 450, 89224.20, 18),
(32, 'AMD Radeon RX 7900 XTX', 'RX 7000', 'GDDR6', 24, 'PCIe 5.0', 355, 55744.20, 21),
(33, 'NVIDIA GeForce RTX 3060 Ti', 'RTX 30', 'GDDR6', 8, 'PCIe 4.0', 200, 22264.20, 49),
(34, 'AMD Radeon RX 6700 XT', 'RX 6000', 'GDDR6', 12, 'PCIe 4.0', 230, 26728.20, 30),
(35, 'NVIDIA GeForce RTX 3070', 'RTX 30', 'GDDR6', 8, 'PCIe 4.0', 220, 27844.20, 1),
(36, 'Intel Arc A580', 'Arc', 'GDDR6', 8, 'PCIe 4.0', 150, 11104.20, 16),
(37, 'NVIDIA GeForce RTX 3080', 'RTX 30', 'GDDR6X', 10, 'PCIe 4.0', 320, 39004.20, 25),
(38, 'AMD Radeon RX 6800', 'RX 6000', 'GDDR6', 16, 'PCIe 4.0', 250, 32308.20, 29),
(39, 'NVIDIA GeForce RTX 3090', 'RTX 30', 'GDDR6X', 24, 'PCIe 4.0', 350, 83644.20, 20),
(40, 'NVIDIA GeForce GTX 1660 Super', 'GTX 16', 'GDDR6', 6, 'PCIe 3.0', 125, 12778.20, 14),
(41, 'AMD Radeon RX 580', 'RX 500', 'GDDR5', 8, 'PCIe 3.0', 185, 11104.20, 6),
(42, 'NVIDIA GeForce GTX 1650', 'GTX 16', 'GDDR5', 4, 'PCIe 3.0', 75, 8314.20, 37),
(43, 'AMD Radeon RX 570', 'RX 500', 'GDDR5', 4, 'PCIe 3.0', 150, 9430.20, 17),
(44, 'NVIDIA GeForce GTX 1050 Ti', 'GTX 10', 'GDDR5', 4, 'PCIe 3.0', 75, 7756.20, 23),
(45, 'AMD Radeon RX 560', 'RX 500', 'GDDR5', 4, 'PCIe 3.0', 80, 5524.20, 15),
(46, 'NVIDIA GeForce GTX 1060 6GB', 'GTX 10', 'GDDR5', 6, 'PCIe 3.0', 120, 13894.20, 4),
(47, 'AMD Radeon RX 550', 'RX 500', 'GDDR5', 2, 'PCIe 3.0', 50, 4408.20, 25),
(48, 'NVIDIA GeForce GTX 960', 'GTX 900', 'GDDR5', 4, 'PCIe 3.0', 120, 11104.20, 12),
(49, 'AMD Radeon R9 380', 'R9 300', 'GDDR5', 4, 'PCIe 3.0', 190, 11104.20, 33),
(50, 'NVIDIA GeForce GTX 970', 'GTX 900', 'GDDR5', 4, 'PCIe 3.0', 145, 18358.20, 32),
(51, 'AMD Radeon R9 390', 'R9 300', 'GDDR5', 8, 'PCIe 3.0', 275, 18358.20, 8),
(52, 'NVIDIA GeForce GTX 980', 'GTX 900', 'GDDR5', 4, 'PCIe 3.0', 165, 27844.20, 44),
(53, 'AMD Radeon R9 290X', 'R9 200', 'GDDR5', 4, 'PCIe 3.0', 290, 22264.20, 47),
(54, 'NVIDIA GeForce GTX 750 Ti', 'GTX 700', 'GDDR5', 2, 'PCIe 3.0', 60, 8314.20, 50),
(55, 'AMD Radeon HD 7970', 'HD 7000', 'GDDR5', 3, 'PCIe 3.0', 250, 19474.20, 9),
(56, 'NVIDIA GeForce GTX 780', 'GTX 700', 'GDDR5', 3, 'PCIe 3.0', 250, 27844.20, 45),
(57, 'AMD Radeon HD 7950', 'HD 7000', 'GDDR5', 3, 'PCIe 3.0', 200, 16684.20, 46),
(58, 'NVIDIA GeForce GTX 760', 'GTX 700', 'GDDR5', 2, 'PCIe 3.0', 170, 13894.20, 47),
(59, 'AMD Radeon HD 7870', 'HD 7000', 'GDDR5', 2, 'PCIe 3.0', 175, 13392.00, 43),
(60, 'TEST GPU 1', 'NVIDIA RTX 3060', 'GDDR6', 6, 'PCIe 4.0', 200, 22319.44, 150),
(61, 'TEST GPU 2', 'AMD RX 6700 XT', 'GDDR6', 12, 'PCIe 4.0', 250, 27899.44, 120),
(62, 'TEST GPU 3', 'NVIDIA RTX 3080', 'GDDR6X', 10, 'PCIe 4.0', 320, 39059.44, 80),
(63, 'TEST GPU 4', 'AMD RX 6800', 'GDDR6', 16, 'PCIe 4.0', 300, 32363.44, 110),
(64, 'TEST GPU 5', 'NVIDIA GTX 1660 Ti', 'GDDR5', 6, 'PCIe 3.0', 150, 13949.44, 200),
(65, 'NVIDIA RTX 3080', 'Ampere', 'GDDR6X', 10240, 'PCIe 4.0', 320, 39059.44, 50),
(66, 'AMD Radeon RX 6800 XT', 'RDNA 2', 'GDDR6', 16384, 'PCIe 4.0', 300, 36269.44, 60),
(67, 'NVIDIA GTX 1660 Ti', 'Turing', 'GDDR5', 6144, 'PCIe 3.0', 120, 15623.44, 75),
(68, 'AMD Radeon RX 5700', 'RDNA', 'GDDR6', 8192, 'PCIe 4.0', 180, 22319.44, 40),
(69, 'TEST NVIDIA GeForce RTX 3080', 'RTX 3080', 'GDDR6X', 10240, 'PCIe 4.0', 320, 39059.44, 10),
(70, 'TEST AMD Radeon RX 6800 XT', 'RX 6800 XT', 'GDDR6', 16384, 'PCIe 4.0', 300, 36269.44, 12),
(71, 'TEST NVIDIA GeForce GTX 1660 Super', 'GTX 1660 Super', 'GDDR5', 6144, 'PCIe 3.0', 120, 12833.44, 25);

-- --------------------------------------------------------

--
-- Table structure for table `motherboard`
--

CREATE TABLE `motherboard` (
  `motherboard_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `manufacturer` varchar(100) DEFAULT NULL,
  `socket_type` varchar(50) DEFAULT NULL,
  `chipset` varchar(50) DEFAULT NULL,
  `memory_type` varchar(50) DEFAULT NULL,
  `memory_slots` int(11) DEFAULT NULL,
  `max_memory` int(11) DEFAULT NULL,
  `pcie_version` varchar(10) DEFAULT NULL,
  `form_factor` varchar(50) DEFAULT NULL,
  `sata_ports` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `power_consumption` int(11) DEFAULT NULL,
  `stocks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `motherboard`
--

INSERT INTO `motherboard` (`motherboard_id`, `name`, `manufacturer`, `socket_type`, `chipset`, `memory_type`, `memory_slots`, `max_memory`, `pcie_version`, `form_factor`, `sata_ports`, `price`, `power_consumption`, `stocks`) VALUES
(1, 'ASUS ROG Crosshair X670E Hero', 'ASUS', 'AM5', 'X670E', 'DDR5', 4, 128, 'PCIe 5.0', 'ATX', 6, 33479.44, 70, 27),
(2, 'MSI MAG B650 Tomahawk WiFi', 'MSI', 'AM5', 'B650', 'DDR5', 4, 128, 'PCIe 4.0', 'ATX', 6, 12275.44, 65, 4),
(3, 'Gigabyte X670 AORUS Elite AX', 'Gigabyte', 'AM5', 'X670', 'DDR5', 4, 128, 'PCIe 5.0', 'ATX', 6, 15065.44, 68, 45),
(4, 'ASRock B650M Pro RS', 'ASRock', 'AM5', 'B650', 'DDR5', 4, 128, 'PCIe 4.0', 'Micro-ATX', 4, 7811.44, 60, 7),
(5, 'ASUS TUF Gaming B550-PLUS', 'ASUS', 'AM4', 'B550', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 8369.44, 65, 2),
(6, 'MSI MPG B550 Gaming Edge WiFi', 'MSI', 'AM4', 'B550', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 10043.44, 70, 36),
(7, 'Gigabyte B550 AORUS PRO AC', 'Gigabyte', 'AM4', 'B550', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 8927.44, 68, 22),
(8, 'ASRock B550M Steel Legend', 'ASRock', 'AM4', 'B550', 'DDR4', 4, 128, 'PCIe 4.0', 'Micro-ATX', 4, 7253.44, 60, 4),
(9, 'ASUS ROG Strix Z790-E Gaming WiFi', 'ASUS', 'LGA1700', 'Z790', 'DDR5', 4, 128, 'PCIe 5.0', 'ATX', 6, 27899.44, 75, 4),
(10, 'MSI MPG Z790 Carbon WiFi', 'MSI', 'LGA1700', 'Z790', 'DDR5', 4, 128, 'PCIe 5.0', 'ATX', 6, 23993.44, 70, 8),
(11, 'Gigabyte Z790 AORUS Master', 'Gigabyte', 'LGA1700', 'Z790', 'DDR5', 4, 128, 'PCIe 5.0', 'ATX', 6, 27899.44, 78, 25),
(12, 'ASRock Z790 Taichi', 'ASRock', 'LGA1700', 'Z790', 'DDR5', 4, 128, 'PCIe 5.0', 'ATX', 6, 26225.44, 72, 3),
(13, 'ASUS TUF Gaming Z690-PLUS WiFi D4', 'ASUS', 'LGA1700', 'Z690', 'DDR4', 4, 128, 'PCIe 5.0', 'ATX', 6, 12833.44, 65, 37),
(14, 'MSI PRO Z690-A DDR4', 'MSI', 'LGA1700', 'Z690', 'DDR4', 4, 128, 'PCIe 5.0', 'ATX', 6, 10601.44, 60, 28),
(15, 'Gigabyte Z690 UD DDR4', 'Gigabyte', 'LGA1700', 'Z690', 'DDR4', 4, 128, 'PCIe 5.0', 'ATX', 6, 10043.44, 62, 26),
(16, 'ASRock Z690 Phantom Gaming 4', 'ASRock', 'LGA1700', 'Z690', 'DDR4', 4, 128, 'PCIe 5.0', 'ATX', 6, 8927.44, 60, 46),
(17, 'ASUS ROG Maximus XIII Hero', 'ASUS', 'LGA1200', 'Z590', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 27899.44, 70, 1),
(18, 'MSI MEG Z590 ACE', 'MSI', 'LGA1200', 'Z590', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 23993.44, 68, 17),
(19, 'Gigabyte Z590 AORUS Master', 'Gigabyte', 'LGA1200', 'Z590', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 22319.44, 65, 31),
(20, 'ASRock Z590 Taichi', 'ASRock', 'LGA1200', 'Z590', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 20645.44, 66, 4),
(21, 'ASUS ROG Maximus XIII Hero', 'ASUS', 'LGA1200', 'Z590', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 27899.44, 70, 28),
(22, 'MSI MEG Z590 ACE', 'MSI', 'LGA1200', 'Z590', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 23993.44, 68, 25),
(23, 'Gigabyte Z590 AORUS Master', 'Gigabyte', 'LGA1200', 'Z590', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 22319.44, 65, 40),
(24, 'ASRock Z590 Taichi', 'ASRock', 'LGA1200', 'Z590', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 8, 20645.44, 66, 26),
(25, 'ASUS TUF Gaming Z590-PLUS WiFi', 'ASUS', 'LGA1200', 'Z590', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 12833.44, 65, 7),
(26, 'MSI MPG Z590 Gaming Edge WiFi', 'MSI', 'LGA1200', 'Z590', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 12275.44, 65, 9),
(27, 'Gigabyte Z590 AORUS Elite AX', 'Gigabyte', 'LGA1200', 'Z590', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 11717.44, 64, 24),
(28, 'ASRock Z590 Extreme WiFi 6E', 'ASRock', 'LGA1200', 'Z590', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 11159.44, 63, 42),
(29, 'ASUS Prime Z590-A', 'ASUS', 'LGA1200', 'Z590', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 10601.44, 62, 39),
(30, 'MSI Z590 PRO WiFi', 'MSI', 'LGA1200', 'Z590', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 10043.44, 60, 19),
(31, 'ASUS ROG Maximus XI Hero (Wi-Fi)', 'ASUS', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 15623.44, 65, 26),
(32, 'MSI MPG Z390 Gaming Edge AC', 'MSI', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 11159.44, 60, 21),
(33, 'Gigabyte Z390 AORUS PRO WiFi', 'Gigabyte', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 10601.44, 60, 27),
(34, 'ASRock Z390 Phantom Gaming 4', 'ASRock', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 8927.44, 58, 20),
(35, 'ASUS Prime Z390-A', 'ASUS', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 9485.44, 60, 21),
(36, 'MSI Z390-A PRO', 'MSI', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 8369.44, 55, 44),
(37, 'Gigabyte Z390 UD', 'Gigabyte', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 7811.44, 55, 6),
(38, 'ASRock Z390 Pro4', 'ASRock', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 7253.44, 55, 50),
(39, 'ASUS TUF Z390-PLUS Gaming (Wi-Fi)', 'ASUS', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 8927.44, 58, 28),
(40, 'MSI MPG Z390M Gaming Edge AC', 'MSI', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'Micro-ATX', 6, 10043.44, 60, 42),
(41, 'ASUS ROG Maximus XI Hero (Wi-Fi)', 'ASUS', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 19716.37, 65, 25),
(42, 'MSI MPG Z390 Gaming Edge AC', 'MSI', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 11159.44, 60, 48),
(43, 'Gigabyte Z390 AORUS PRO WiFi', 'Gigabyte', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 10601.44, 60, 14),
(44, 'ASRock Z390 Phantom Gaming 4', 'ASRock', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 8927.44, 58, 27),
(45, 'ASUS Prime Z390-A', 'ASUS', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 9485.44, 60, 44),
(46, 'MSI Z390-A PRO', 'MSI', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 8369.44, 55, 35),
(47, 'Gigabyte Z390 UD', 'Gigabyte', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 7811.44, 55, 45),
(48, 'ASRock Z390 Pro4', 'ASRock', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 7253.44, 55, 20),
(49, 'ASUS TUF Z390-PLUS Gaming (Wi-Fi)', 'ASUS', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 8927.44, 58, 15),
(50, 'MSI MPG Z390M Gaming Edge AC', 'MSI', 'LGA1151', 'Z390', 'DDR4', 4, 64, 'PCIe 3.0', 'Micro-ATX', 6, 10043.44, 60, 14),
(51, 'ASUS ROG Rampage VI Extreme Encore', 'ASUS', 'LGA2066', 'X299', 'DDR4', 8, 256, 'PCIe 3.0', 'E-ATX', 8, 36269.44, 90, 25),
(52, 'MSI Creator X299', 'MSI', 'LGA2066', 'X299', 'DDR4', 8, 256, 'PCIe 3.0', 'ATX', 8, 27899.44, 85, 33),
(53, 'Gigabyte X299 AORUS Master', 'Gigabyte', 'LGA2066', 'X299', 'DDR4', 8, 256, 'PCIe 3.0', 'ATX', 8, 26783.44, 85, 40),
(54, 'ASRock X299 Taichi CLX', 'ASRock', 'LGA2066', 'X299', 'DDR4', 8, 256, 'PCIe 3.0', 'ATX', 8, 25667.44, 80, 50),
(55, 'ASUS Prime X299-A II', 'ASUS', 'LGA2066', 'X299', 'DDR4', 8, 256, 'PCIe 3.0', 'ATX', 8, 19529.44, 75, 30),
(56, 'MSI X299 PRO', 'MSI', 'LGA2066', 'X299', 'DDR4', 8, 256, 'PCIe 3.0', 'ATX', 8, 16739.44, 70, 49),
(57, 'Gigabyte X299 UD4 Pro', 'Gigabyte', 'LGA2066', 'X299', 'DDR4', 8, 256, 'PCIe 3.0', 'ATX', 8, 15623.44, 70, 4),
(58, 'ASRock X299 Steel Legend', 'ASRock', 'LGA2066', 'X299', 'DDR4', 8, 256, 'PCIe 3.0', 'ATX', 8, 14507.44, 68, 22),
(59, 'ASUS TUF X299 Mark 2', 'ASUS', 'LGA2066', 'X299', 'DDR4', 8, 256, 'PCIe 3.0', 'ATX', 8, 13391.44, 65, 49),
(60, 'MSI X299 SLI PLUS', 'MSI', 'LGA2066', 'X299', 'DDR4', 8, 256, 'PCIe 3.0', 'ATX', 8, 13056.64, 65, 28),
(66, 'TEST Motherboard 1', 'ASUS', 'AM4', 'B550', 'DDR4', 4, 64, 'PCIe 4.0', 'ATX', 6, 8369.44, 120, 100),
(67, 'TEST Motherboard 2', 'MSI', 'LGA1200', 'Z490', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 11159.44, 130, 90),
(68, 'TEST Motherboard 3', 'Gigabyte', 'AM4', 'X570', 'DDR4', 4, 128, 'PCIe 4.0', 'E-ATX', 8, 12833.44, 140, 110),
(69, 'TEST Motherboard 4', 'ASRock', 'LGA1151', 'H410', 'DDR4', 2, 64, 'PCIe 3.0', 'Micro-ATX', 4, 5021.44, 110, 150),
(70, 'TEST Motherboard 5', 'MSI', 'AM4', 'B450', 'DDR4', 4, 64, 'PCIe 3.0', 'ATX', 6, 6695.44, 100, 120),
(71, 'TEST ASUS ROG Strix Z590-E', 'ASUS', 'LGA 1200', 'Intel Z590', 'DDR4', 4, 128, 'PCIe 4.0', 'ATX', 6, 13949.44, 200, 15),
(72, 'TEST MSI MPG B550 GAMING EDGE WIFI', 'MSI', 'AM4', 'AMD B550', 'DDR4', 4, 64, 'PCIe 4.0', 'ATX', 6, 8369.44, 180, 20),
(73, 'TEST Gigabyte Z490 AORUS ELITE', 'Gigabyte', 'LGA 1200', 'Intel Z490', 'DDR4', 4, 128, 'PCIe 3.0', 'ATX', 6, 7811.44, 150, 25);

-- --------------------------------------------------------

--
-- Table structure for table `power_supplies`
--

CREATE TABLE `power_supplies` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `form_factor` varchar(20) DEFAULT NULL,
  `efficiency` varchar(50) DEFAULT NULL,
  `modularity` varchar(50) DEFAULT NULL,
  `fanless` enum('Yes','No') DEFAULT 'No',
  `wattage` int(11) DEFAULT NULL,
  `stocks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `power_supplies`
--

INSERT INTO `power_supplies` (`id`, `name`, `price`, `form_factor`, `efficiency`, `modularity`, `fanless`, `wattage`, `stocks`) VALUES
(1, 'Corsair RM850x', 7811.44, 'ATX', '80 Plus Gold', 'Fully Modular', 'No', 850, 42),
(2, 'EVGA SuperNOVA 750 G5', 7253.44, 'ATX', '80 Plus Gold', 'Fully Modular', 'No', 750, 29),
(3, 'Seasonic PRIME TX-1000', 15065.44, 'ATX', '80 Plus Titanium', 'Fully Modular', 'No', 1000, 15),
(4, 'Cooler Master MWE Gold 650W', 5021.44, 'ATX', '80 Plus Gold', 'Fully Modular', 'No', 650, 38),
(5, 'Thermaltake Toughpower GF1 750W', 6137.44, 'ATX', '80 Plus Gold', 'Fully Modular', 'No', 750, 43),
(6, 'be quiet! Straight Power 11 850W', 8927.44, 'ATX', '80 Plus Platinum', 'Fully Modular', 'No', 850, 1),
(7, 'NZXT C750', 6695.44, 'ATX', '80 Plus Gold', 'Fully Modular', 'No', 750, 27),
(8, 'ASUS ROG Strix 850W', 9485.44, 'ATX', '80 Plus Gold', 'Fully Modular', 'No', 850, 30),
(9, 'Corsair SF600', 6974.44, 'SFX', '80 Plus Gold', 'Fully Modular', 'No', 600, 17),
(10, 'SilverStone SX700-G', 7811.44, 'SFX', '80 Plus Gold', 'Fully Modular', 'No', 700, 47),
(11, 'FSP Dagger Pro 850W', 8369.44, 'SFX', '80 Plus Gold', 'Fully Modular', 'No', 850, 31),
(12, 'EVGA 600 BR', 2789.44, 'ATX', '80 Plus Bronze', 'Non Modular', 'No', 600, 15),
(13, 'Thermaltake Smart 500W', 2510.44, 'ATX', '80 Plus', 'Non Modular', 'No', 500, 31),
(14, 'Corsair CX550M', 3905.44, 'ATX', '80 Plus Bronze', 'Semi Modular', 'No', 550, 9),
(15, 'Seasonic S12III 650W', 4184.44, 'ATX', '80 Plus Bronze', 'Non Modular', 'No', 650, 4),
(16, 'Cooler Master MasterWatt 750W', 5021.44, 'ATX', '80 Plus Bronze', 'Semi Modular', 'No', 750, 41),
(17, 'Antec Earthwatts Gold Pro 750W', 5579.44, 'ATX', '80 Plus Gold', 'Semi Modular', 'No', 750, 42),
(18, 'Rosewill Photon 850W', 6137.44, 'ATX', '80 Plus Gold', 'Fully Modular', 'No', 850, 36),
(19, 'XFX XTR 650W', 5300.44, 'ATX', '80 Plus Gold', 'Fully Modular', 'No', 650, 3),
(20, 'Gigabyte P750GM', 5021.44, 'ATX', '80 Plus Gold', 'Fully Modular', 'No', 750, 8),
(21, 'Corsair RM1000x', 10601.44, 'ATX', '80 Plus Gold', 'Fully Modular', 'No', 1000, 30),
(22, 'EVGA SuperNOVA 1000 G5', 11159.44, 'ATX', '80 Plus Gold', 'Fully Modular', 'No', 1000, 28),
(23, 'Seasonic Focus GX-850', 7253.44, 'ATX', '80 Plus Gold', 'Fully Modular', 'No', 850, 46),
(24, 'Thermaltake Toughpower PF1 1050W', 12275.44, 'ATX', '80 Plus Platinum', 'Fully Modular', 'No', 1050, 47),
(25, 'be quiet! Dark Power Pro 12 1200W', 16739.44, 'ATX', '80 Plus Titanium', 'Fully Modular', 'No', 1200, 46),
(26, 'NZXT C1000 Gold', 8369.44, 'ATX', '80 Plus Gold', 'Fully Modular', 'No', 1000, 39),
(27, 'ASUS TUF Gaming 750W', 6695.44, 'ATX', '80 Plus Bronze', 'Semi Modular', 'No', 750, 8),
(28, 'Corsair HX1200', 13949.44, 'ATX', '80 Plus Platinum', 'Fully Modular', 'No', 1200, 21),
(29, 'SilverStone Strider Platinum 1000W', 12833.44, 'ATX', '80 Plus Platinum', 'Fully Modular', 'No', 1000, 33),
(30, 'FSP Hydro PTM Pro 850W', 10044.00, 'ATX', '80 Plus Platinum', 'Fully Modular', 'No', 850, 48);

-- --------------------------------------------------------

--
-- Table structure for table `processor`
--

CREATE TABLE `processor` (
  `processor_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `boost` varchar(10) DEFAULT NULL,
  `socket` varchar(20) DEFAULT NULL,
  `microarch` varchar(50) DEFAULT NULL,
  `tdp` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `cores` int(11) DEFAULT NULL,
  `igpu` varchar(50) DEFAULT NULL,
  `stocks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `processor`
--

INSERT INTO `processor` (`processor_id`, `name`, `boost`, `socket`, `microarch`, `tdp`, `price`, `cores`, `igpu`, `stocks`) VALUES
(31, 'AMD Ryzen 9 7950X', '5.7 GHz', 'AM5', 'Zen 4', 170, 44584.20, 16, 'None', 69),
(32, 'AMD Ryzen 7 7700X', '5.4 GHz', 'AM5', 'Zen 4', 105, 18358.20, 8, 'None', 12),
(33, 'AMD Ryzen 5 7600X', '5.3 GHz', 'AM5', 'Zen 4', 95, 12778.20, 6, 'None', 45),
(34, 'AMD Ryzen 5 7600', '5.1 GHz', 'AM5', 'Zen 4', 65, 11104.20, 6, 'None', 34),
(35, 'AMD Ryzen 5 5600G', '4.4 GHz', 'AM4', 'Zen 3', 65, 14452.20, 6, 'Vega 7', 32),
(36, 'AMD Ryzen 7 5700G', '4.6 GHz', 'AM4', 'Zen 3', 65, 18358.20, 8, 'Vega 8', 10),
(37, 'AMD Ryzen 9 5900X', '4.8 GHz', 'AM4', 'Zen 3', 105, 22264.20, 12, 'None', 3),
(38, 'AMD Ryzen 9 5950X', '4.9 GHz', 'AM4', 'Zen 3', 105, 30634.20, 16, 'None', 32),
(39, 'Intel Core i9-13900K', '5.8 GHz', 'LGA1700', 'Raptor Lake', 125, 32866.20, 24, 'Intel UHD 770', 4),
(40, 'Intel Core i7-13700K', '5.4 GHz', 'LGA1700', 'Raptor Lake', 125, 22822.20, 16, 'Intel UHD 770', 21),
(41, 'Intel Core i5-13600K', '5.1 GHz', 'LGA1700', 'Raptor Lake', 125, 17800.20, 14, 'Intel UHD 770', 42),
(42, 'Intel Core i5-13400', '4.6 GHz', 'LGA1700', 'Raptor Lake', 65, 12499.20, 10, 'Intel UHD 730', 47),
(43, 'Intel Core i7-12700K', '5.0 GHz', 'LGA1700', 'Alder Lake', 125, 22822.20, 12, 'Intel UHD 770', 7),
(44, 'Intel Core i5-12600K', '4.9 GHz', 'LGA1700', 'Alder Lake', 125, 16126.20, 10, 'Intel UHD 770', 43),
(45, 'Intel Core i5-12400', '4.4 GHz', 'LGA1700', 'Alder Lake', 65, 9988.20, 6, 'Intel UHD 730', 46),
(46, 'Intel Core i9-11900K', '5.3 GHz', 'LGA1200', 'Rocket Lake', 125, 30076.20, 8, 'Intel UHD 750', 49),
(47, 'Intel Core i7-11700K', '5.0 GHz', 'LGA1200', 'Rocket Lake', 125, 22264.20, 8, 'Intel UHD 750', 8),
(48, 'Intel Core i5-11600K', '4.9 GHz', 'LGA1200', 'Rocket Lake', 125, 15010.20, 6, 'Intel UHD 750', 40),
(49, 'Intel Core i5-11400', '4.4 GHz', 'LGA1200', 'Rocket Lake', 65, 8760.60, 6, 'Intel UHD 730', 26),
(50, 'Intel Core i9-10900K', '5.3 GHz', 'LGA1200', 'Comet Lake', 125, 27844.20, 10, 'Intel UHD 630', 11),
(53, 'AMD Ryzen 9 7900X', '5.6 GHz', 'AM5', 'Zen 4', 170, 23938.20, 12, '0', 45),
(55, 'AMD Ryzen 7 7800X3D', '5.0 GHz', 'AM5', 'Zen 4', 105, 25054.20, 8, '0', 29),
(56, 'AMD Ryzen 5 5600X', '4.6 GHz', 'AM4', 'Zen 3', 65, 11104.20, 6, '0', 14),
(57, 'AMD Ryzen 7 5800X', '4.7 GHz', 'AM4', 'Zen 3', 105, 16684.20, 8, '0', 35),
(60, 'AMD Ryzen 5 5500', '4.2 GHz', 'AM4', 'Zen 3', 65, 8872.20, 6, '0', 19),
(63, 'Intel Core i9-12900K', '5.2 GHz', 'LGA1700', 'Alder Lake', 125, 32866.20, 16, '1', 46),
(66, 'Intel Core i5-10400', '4.3 GHz', 'LGA1200', 'Comet Lake', 65, 10155.60, 6, '1', 46),
(67, 'Intel Core i7-10700K', '5.1 GHz', 'LGA1200', 'Comet Lake', 125, 19474.20, 8, '1', 45),
(71, 'Intel Core i5-8600K', '4.3 GHz', 'LGA1151', 'Coffee Lake', 95, 14340.60, 6, '1', 10),
(72, 'Intel Core i7-8700K', '4.7 GHz', 'LGA1151', 'Coffee Lake', 95, 20869.20, 6, '1', 35),
(73, 'Intel Core i5-7600K', '4.2 GHz', 'LGA1151', 'Kaby Lake', 91, 13503.60, 4, '1', 46),
(74, 'Intel Core i7-7700K', '4.5 GHz', 'LGA1151', 'Kaby Lake', 91, 19474.20, 4, '1', 26),
(75, 'Intel Core i3-8100', '3.6 GHz', 'LGA1151', 'Kaby Lake', 65, 3850.20, 4, '1', 69),
(76, 'Intel Core i7-7800X', '4.0 GHz', 'LGA2066', 'Skylake-X', 140, 21706.20, 6, '0', 25),
(77, 'Intel Core i9-7900X', '4.3 GHz', 'LGA2066', 'Skylake-X', 140, 55744.20, 10, '0', 2),
(78, 'Intel Core i9-9920X', '4.5 GHz', 'LGA2066', 'Skylake-X', 165, 66346.20, 12, '0', 34),
(79, 'Intel Core i9-10920X', '4.6 GHz', 'LGA2066', 'Cascade Lake-X', 165, 54628.20, 12, '0', 15),
(80, 'Intel Core i9-10980XE', '4.6 GHz', 'LGA2066', 'Cascade Lake-X', 165, 54628.20, 18, '0', 22);

-- --------------------------------------------------------

--
-- Table structure for table `processor_backup`
--

CREATE TABLE `processor_backup` (
  `processor_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(100) DEFAULT NULL,
  `boost` varchar(10) DEFAULT NULL,
  `socket` varchar(20) DEFAULT NULL,
  `microarch` varchar(50) DEFAULT NULL,
  `tdp` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `cores` int(11) DEFAULT NULL,
  `igpu` varchar(50) DEFAULT NULL,
  `stocks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `processor_backup`
--

INSERT INTO `processor_backup` (`processor_id`, `name`, `boost`, `socket`, `microarch`, `tdp`, `price`, `cores`, `igpu`, `stocks`) VALUES
(31, 'AMD Ryzen 9 7950X', '5.7 GHz', 'AM5', 'Zen 4', 170, 44584.20, 16, 'None', 42),
(32, 'AMD Ryzen 7 7700X', '5.4 GHz', 'AM5', 'Zen 4', 105, 18358.20, 8, 'None', 14),
(33, 'AMD Ryzen 5 7600X', '5.3 GHz', 'AM5', 'Zen 4', 95, 12778.20, 6, 'None', 45),
(34, 'AMD Ryzen 5 7600', '5.1 GHz', 'AM5', 'Zen 4', 65, 11104.20, 6, 'None', 34),
(35, 'AMD Ryzen 5 5600G', '4.4 GHz', 'AM4', 'Zen 3', 65, 14452.20, 6, 'Vega 7', 32),
(36, 'AMD Ryzen 7 5700G', '4.6 GHz', 'AM4', 'Zen 3', 65, 18358.20, 8, 'Vega 8', 10),
(37, 'AMD Ryzen 9 5900X', '4.8 GHz', 'AM4', 'Zen 3', 105, 22264.20, 12, 'None', 3),
(38, 'AMD Ryzen 9 5950X', '4.9 GHz', 'AM4', 'Zen 3', 105, 30634.20, 16, 'None', 32),
(39, 'Intel Core i9-13900K', '5.8 GHz', 'LGA1700', 'Raptor Lake', 125, 32866.20, 24, 'Intel UHD 770', 4),
(40, 'Intel Core i7-13700K', '5.4 GHz', 'LGA1700', 'Raptor Lake', 125, 22822.20, 16, 'Intel UHD 770', 21),
(41, 'Intel Core i5-13600K', '5.1 GHz', 'LGA1700', 'Raptor Lake', 125, 17800.20, 14, 'Intel UHD 770', 42),
(42, 'Intel Core i5-13400', '4.6 GHz', 'LGA1700', 'Raptor Lake', 65, 12499.20, 10, 'Intel UHD 730', 47),
(43, 'Intel Core i7-12700K', '5.0 GHz', 'LGA1700', 'Alder Lake', 125, 22822.20, 12, 'Intel UHD 770', 7),
(44, 'Intel Core i5-12600K', '4.9 GHz', 'LGA1700', 'Alder Lake', 125, 16126.20, 10, 'Intel UHD 770', 43),
(45, 'Intel Core i5-12400', '4.4 GHz', 'LGA1700', 'Alder Lake', 65, 9988.20, 6, 'Intel UHD 730', 46),
(46, 'Intel Core i9-11900K', '5.3 GHz', 'LGA1200', 'Rocket Lake', 125, 30076.20, 8, 'Intel UHD 750', 49),
(47, 'Intel Core i7-11700K', '5.0 GHz', 'LGA1200', 'Rocket Lake', 125, 22264.20, 8, 'Intel UHD 750', 8),
(48, 'Intel Core i5-11600K', '4.9 GHz', 'LGA1200', 'Rocket Lake', 125, 15010.20, 6, 'Intel UHD 750', 40),
(49, 'Intel Core i5-11400', '4.4 GHz', 'LGA1200', 'Rocket Lake', 65, 8760.60, 6, 'Intel UHD 730', 26),
(50, 'Intel Core i9-10900K', '5.3 GHz', 'LGA1200', 'Comet Lake', 125, 27844.20, 10, 'Intel UHD 630', 11),
(51, 'AMD Ryzen 5 7600X', '5.3 GHz', 'AM5', 'Zen 4', 95, 12778.20, 6, '0', 26),
(52, 'AMD Ryzen 7 7700X', '5.4 GHz', 'AM5', 'Zen 4', 105, 18358.20, 8, '0', 45),
(53, 'AMD Ryzen 9 7900X', '5.6 GHz', 'AM5', 'Zen 4', 170, 23938.20, 12, '0', 45),
(54, 'AMD Ryzen 9 7950X', '5.7 GHz', 'AM5', 'Zen 4', 170, 39004.20, 16, '0', 43),
(55, 'AMD Ryzen 7 7800X3D', '5.0 GHz', 'AM5', 'Zen 4', 105, 25054.20, 8, '0', 29),
(56, 'AMD Ryzen 5 5600X', '4.6 GHz', 'AM4', 'Zen 3', 65, 11104.20, 6, '0', 14),
(57, 'AMD Ryzen 7 5800X', '4.7 GHz', 'AM4', 'Zen 3', 105, 16684.20, 8, '0', 35),
(58, 'AMD Ryzen 9 5900X', '4.8 GHz', 'AM4', 'Zen 3', 105, 22264.20, 12, '0', 29),
(59, 'AMD Ryzen 9 5950X', '4.9 GHz', 'AM4', 'Zen 3', 105, 41794.20, 16, '0', 41),
(60, 'AMD Ryzen 5 5500', '4.2 GHz', 'AM4', 'Zen 3', 65, 8872.20, 6, '0', 19),
(61, 'Intel Core i5-12600K', '4.9 GHz', 'LGA1700', 'Alder Lake', 125, 16126.20, 10, '1', 22),
(62, 'Intel Core i7-12700K', '5.0 GHz', 'LGA1700', 'Alder Lake', 125, 22822.20, 12, '1', 3),
(63, 'Intel Core i9-12900K', '5.2 GHz', 'LGA1700', 'Alder Lake', 125, 32866.20, 16, '1', 46),
(64, 'Intel Core i5-13600K', '5.1 GHz', 'LGA1700', 'Raptor Lake', 125, 17800.20, 14, '1', 20),
(65, 'Intel Core i9-13900K', '5.8 GHz', 'LGA1700', 'Raptor Lake', 125, 32866.20, 24, '1', 11),
(66, 'Intel Core i5-10400', '4.3 GHz', 'LGA1200', 'Comet Lake', 65, 10155.60, 6, '1', 46),
(67, 'Intel Core i7-10700K', '5.1 GHz', 'LGA1200', 'Comet Lake', 125, 19474.20, 8, '1', 45),
(68, 'Intel Core i9-10900K', '5.3 GHz', 'LGA1200', 'Comet Lake', 125, 27844.20, 10, '1', 38),
(69, 'Intel Core i7-11700K', '5.0 GHz', 'LGA1200', 'Rocket Lake', 125, 22264.20, 8, '1', 4),
(70, 'Intel Core i9-11900K', '5.3 GHz', 'LGA1200', 'Rocket Lake', 125, 30076.20, 8, '1', 4),
(71, 'Intel Core i5-8600K', '4.3 GHz', 'LGA1151', 'Coffee Lake', 95, 14340.60, 6, '1', 10),
(72, 'Intel Core i7-8700K', '4.7 GHz', 'LGA1151', 'Coffee Lake', 95, 20869.20, 6, '1', 35),
(73, 'Intel Core i5-7600K', '4.2 GHz', 'LGA1151', 'Kaby Lake', 91, 13503.60, 4, '1', 46),
(74, 'Intel Core i7-7700K', '4.5 GHz', 'LGA1151', 'Kaby Lake', 91, 19474.20, 4, '1', 26),
(75, 'Intel Core i3-8100', '3.6 GHz', 'LGA1151', 'Kaby Lake', 65, 6528.60, 4, '1', 41),
(76, 'Intel Core i7-7800X', '4.0 GHz', 'LGA2066', 'Skylake-X', 140, 21706.20, 6, '0', 25),
(77, 'Intel Core i9-7900X', '4.3 GHz', 'LGA2066', 'Skylake-X', 140, 55744.20, 10, '0', 2),
(78, 'Intel Core i9-9920X', '4.5 GHz', 'LGA2066', 'Skylake-X', 165, 66346.20, 12, '0', 34),
(79, 'Intel Core i9-10920X', '4.6 GHz', 'LGA2066', 'Cascade Lake-X', 165, 54628.20, 12, '0', 15),
(80, 'Intel Core i9-10980XE', '4.6 GHz', 'LGA2066', 'Cascade Lake-X', 165, 54628.20, 18, '0', 22),
(81, 'AMD Ryzen 7 7700X', '5.4 GHz', 'AM5', 'Zen 4', 105, 18358.20, 8, 'None', 13),
(82, 'AMD Ryzen 9 7900X', '5.6 GHz', 'AM5', 'Zen 4', 170, 23938.20, 12, 'None', 48),
(83, 'AMD Ryzen 9 7950X', '5.7 GHz', 'AM5', 'Zen 4', 170, 39004.20, 16, 'None', 1),
(84, 'AMD Ryzen 7 7800X3D', '5.0 GHz', 'AM5', 'Zen 4', 105, 25054.20, 8, 'None', 12),
(85, 'AMD Ryzen 5 7600', '5.1 GHz', 'AM5', 'Zen 4', 65, 11104.20, 6, 'None', 6),
(86, 'AMD Ryzen 5 5600X', '4.6 GHz', 'AM4', 'Zen 3', 65, 11104.20, 6, 'None', 42),
(87, 'AMD Ryzen 7 5800X', '4.7 GHz', 'AM4', 'Zen 3', 105, 16684.20, 8, 'None', 41),
(88, 'AMD Ryzen 9 5900X', '4.8 GHz', 'AM4', 'Zen 3', 105, 22264.20, 12, 'None', 30),
(89, 'AMD Ryzen 9 5950X', '4.9 GHz', 'AM4', 'Zen 3', 105, 41794.20, 16, 'None', 28),
(90, 'AMD Ryzen 5 5500', '4.2 GHz', 'AM4', 'Zen 3', 65, 8872.20, 6, 'None', 47),
(91, 'Intel Core i5-12600K', '4.9 GHz', 'LGA1700', 'Alder Lake', 125, 16126.20, 10, 'Intel UHD 770', 3),
(92, 'Intel Core i7-12700K', '5.0 GHz', 'LGA1700', 'Alder Lake', 125, 22822.20, 12, 'Intel UHD 770', 24),
(93, 'Intel Core i9-12900K', '5.2 GHz', 'LGA1700', 'Alder Lake', 125, 32866.20, 16, 'Intel UHD 770', 9),
(94, 'Intel Core i5-13600K', '5.1 GHz', 'LGA1700', 'Raptor Lake', 125, 17800.20, 14, 'Intel UHD 770', 24),
(95, 'Intel Core i9-13900K', '5.8 GHz', 'LGA1700', 'Raptor Lake', 125, 32866.20, 24, 'Intel UHD 770', 43),
(96, 'Intel Core i5-10400', '4.3 GHz', 'LGA1200', 'Comet Lake', 65, 10155.60, 6, 'Intel UHD 630', 44),
(97, 'Intel Core i7-10700K', '5.1 GHz', 'LGA1200', 'Comet Lake', 125, 19474.20, 8, 'Intel UHD 630', 37),
(98, 'Intel Core i9-10900K', '5.3 GHz', 'LGA1200', 'Comet Lake', 125, 27844.20, 10, 'Intel UHD 630', 4),
(99, 'Intel Core i7-11700K', '5.0 GHz', 'LGA1200', 'Rocket Lake', 125, 22264.20, 8, 'Intel UHD 750', 8),
(100, 'Intel Core i9-11900K', '5.3 GHz', 'LGA1200', 'Rocket Lake', 125, 30076.20, 8, 'Intel UHD 750', 28),
(101, 'Intel Core i5-8600K', '4.3 GHz', 'LGA1151', 'Coffee Lake', 95, 14340.60, 6, 'Intel UHD 630', 17),
(102, 'Intel Core i7-8700K', '4.7 GHz', 'LGA1151', 'Coffee Lake', 95, 20869.20, 6, 'Intel UHD 630', 48),
(103, 'Intel Core i5-7600K', '4.2 GHz', 'LGA1151', 'Kaby Lake', 91, 13503.60, 4, 'Intel UHD 630', 40),
(104, 'Intel Core i7-7700K', '4.5 GHz', 'LGA1151', 'Kaby Lake', 91, 19474.20, 4, 'Intel UHD 630', 7),
(105, 'Intel Core i3-8100', '3.6 GHz', 'LGA1151', 'Kaby Lake', 65, 6528.60, 4, 'Intel UHD 630', 12),
(106, 'Intel Core i7-7800X', '4.0 GHz', 'LGA2066', 'Skylake-X', 140, 21706.20, 6, 'None', 40),
(107, 'Intel Core i9-7900X', '4.3 GHz', 'LGA2066', 'Skylake-X', 140, 55744.20, 10, 'None', 11),
(108, 'Intel Core i9-9920X', '4.5 GHz', 'LGA2066', 'Skylake-X', 165, 66346.20, 12, 'None', 37),
(109, 'Intel Core i9-10920X', '4.6 GHz', 'LGA2066', 'Cascade Lake-X', 165, 54628.20, 12, 'None', 2),
(110, 'Intel Core i9-10980XE', '4.6 GHz', 'LGA2066', 'Cascade Lake-X', 165, 54628.20, 18, 'None', 48);

-- --------------------------------------------------------

--
-- Table structure for table `ram_modules`
--

CREATE TABLE `ram_modules` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `ram_type` varchar(50) NOT NULL,
  `form_factor` varchar(50) NOT NULL,
  `speed` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `stocks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ram_modules`
--

INSERT INTO `ram_modules` (`id`, `name`, `price`, `ram_type`, `form_factor`, `speed`, `capacity`, `stocks`) VALUES
(1, 'Corsair Vengeance LPX 32GB (2 x 16GB) DDR4 3200MHz', 8926.88, 'DDR4', 'DIMM', 3200, 32, 30),
(2, 'G.SKILL Ripjaws V Series 32GB (2 x 16GB) DDR4 3600MHz', 10042.88, 'DDR4', 'DIMM', 3600, 32, 14),
(3, 'Crucial Ballistix 64GB (2 x 32GB) DDR4 2400MHz', 15064.88, 'DDR4', 'DIMM', 2400, 64, 25),
(4, 'Kingston HyperX Fury 32GB (2 x 16GB) DDR4 2666MHz', 8368.88, 'DDR4', 'DIMM', 2666, 32, 32),
(5, 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4 3200MHz', 4463.44, 'DDR4', 'DIMM', 3200, 16, 35),
(6, 'G.SKILL Ripjaws V Series 16GB (2 x 8GB) DDR4 3600MHz', 5021.44, 'DDR4', 'DIMM', 3600, 16, 29),
(7, 'Crucial Ballistix 32GB (2 x 16GB) DDR4 2400MHz', 7532.44, 'DDR4', 'DIMM', 2400, 32, 38),
(8, 'Kingston HyperX Fury 16GB (2 x 8GB) DDR4 2666MHz', 4184.44, 'DDR4', 'DIMM', 2666, 16, 4),
(9, 'Corsair Vengeance 8GB (2 x 4GB) DDR3 1600MHz', 2789.44, 'DDR3', 'DIMM', 1600, 8, 3),
(10, 'Kingston HyperX Fury 16GB (2 x 8GB) DDR3 1866MHz', 5021.44, 'DDR3', 'DIMM', 1866, 16, 4),
(11, 'G.SKILL Ripjaws X Series 16GB (2 x 8GB) DDR3 2133MHz', 5579.44, 'DDR3', 'DIMM', 2133, 16, 10),
(12, 'Crucial Ballistix Sport 8GB (2 x 4GB) DDR3 1600MHz', 2510.44, 'DDR3', 'DIMM', 1600, 8, 38),
(13, 'Corsair Vengeance LPX 32GB (2 x 16GB) DDR4 3200MHz', 8927.44, 'DDR4', 'DIMM', 3200, 32, 9),
(14, 'G.SKILL Trident Z RGB 16GB (2 x 8GB) DDR4 3600MHz', 6416.44, 'DDR4', 'DIMM', 3600, 16, 37),
(15, 'Kingston HyperX Predator 32GB (2 x 16GB) DDR4 3200MHz', 9764.44, 'DDR4', 'DIMM', 3200, 32, 1),
(16, 'Crucial Ballistix 16GB (2 x 8GB) DDR4 2666MHz', 4184.44, 'DDR4', 'DIMM', 2666, 16, 46),
(17, 'Corsair Dominator Platinum RGB 32GB (2 x 16GB) DDR5 5200MHz', 11159.44, 'DDR5', 'DIMM', 5200, 32, 26),
(18, 'G.SKILL Trident Z5 RGB 32GB (2 x 16GB) DDR5 6000MHz', 12275.44, 'DDR5', 'DIMM', 6000, 32, 40),
(19, 'Kingston FURY Beast 16GB (2 x 8GB) DDR5 4800MHz', 7253.44, 'DDR5', 'DIMM', 4800, 16, 21),
(20, 'Crucial DDR5 32GB (2 x 16GB) DDR5 5600MHz', 10266.64, 'DDR5', 'DIMM', 5600, 32, 35);

-- --------------------------------------------------------

--
-- Table structure for table `storage_devices`
--

CREATE TABLE `storage_devices` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `rpm` varchar(10) DEFAULT NULL,
  `form_factor` varchar(50) DEFAULT NULL,
  `interface` varchar(50) DEFAULT NULL,
  `nvme` enum('Yes','No') DEFAULT NULL,
  `capacity` decimal(5,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `stocks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `storage_devices`
--

INSERT INTO `storage_devices` (`id`, `name`, `price`, `rpm`, `form_factor`, `interface`, `nvme`, `capacity`, `image`, `stocks`) VALUES
(1, 'Samsung 970 EVO Plus 1TB', 7253.44, 'N/A', 'M.2', 'NVMe', 'Yes', 1.00, 'https://placehold.co/150x150', 12),
(2, 'Seagate Barracuda 2TB', 3068.44, '7200', '3.5 inch', 'SATA', 'No', 2.00, 'https://placehold.co/150x150', 10),
(3, 'WD Black SN850X 500GB', 5579.44, 'N/A', 'M.2', 'NVMe', 'Yes', 0.50, 'https://placehold.co/150x150', 9),
(4, 'Crucial MX500 1TB', 4742.44, 'N/A', '2.5 inch', 'SATA', 'No', 1.00, 'https://placehold.co/150x150', 15),
(5, 'Kingston A2000 1TB', 6137.44, 'N/A', 'M.2', 'NVMe', 'Yes', 1.00, 'https://placehold.co/150x150', 46),
(6, 'Toshiba X300 4TB', 5579.44, '7200', '3.5 inch', 'SATA', 'No', 4.00, 'https://placehold.co/150x150', 35),
(7, 'Samsung 860 EVO 500GB', 3905.44, 'N/A', '2.5 inch', 'SATA', 'No', 0.50, 'https://placehold.co/150x150', 37),
(8, 'WD Blue 1TB', 2789.44, '7200', '3.5 inch', 'SATA', 'No', 1.00, 'https://placehold.co/150x150', 28),
(9, 'Seagate FireCuda 2TB', 5300.44, '7200', '3.5 inch', 'SATA', 'No', 2.00, 'https://placehold.co/150x150', 28),
(10, 'Intel 660p 1TB', 5021.44, 'N/A', 'M.2', 'NVMe', 'Yes', 1.00, 'https://placehold.co/150x150', 7),
(11, 'ADATA SU800 512GB', 3347.44, 'N/A', '2.5 inch', 'SATA', 'No', 0.50, 'https://placehold.co/150x150', 2),
(12, 'Corsair MP600 1TB', 8369.44, 'N/A', 'M.2', 'NVMe', 'Yes', 1.00, 'https://placehold.co/150x150', 36),
(13, 'WD Red 4TB', 6695.44, '5400', '3.5 inch', 'SATA', 'No', 4.00, 'https://placehold.co/150x150', 24),
(14, 'Samsung 980 PRO 2TB', 12833.44, 'N/A', 'M.2', 'NVMe', 'Yes', 2.00, 'https://placehold.co/150x150', 13),
(15, 'Seagate IronWolf 6TB', 8927.44, '7200', '3.5 inch', 'SATA', 'No', 6.00, 'https://placehold.co/150x150', 40),
(16, 'Crucial P5 1TB', 6695.44, 'N/A', 'M.2', 'NVMe', 'Yes', 1.00, 'https://placehold.co/150x150', 11),
(17, 'Kingston KC2500 500GB', 4184.44, 'N/A', 'M.2', 'NVMe', 'Yes', 0.50, 'https://placehold.co/150x150', 33),
(18, 'WD Blue SN550 1TB', 5858.44, 'N/A', 'M.2', 'NVMe', 'Yes', 1.00, 'https://placehold.co/150x150', 34),
(19, 'Seagate BarraCuda 1TB', 2510.44, '7200', '3.5 inch', 'SATA', 'No', 1.00, 'https://placehold.co/150x150', 19),
(20, 'Samsung 870 QVO 2TB', 11159.44, 'N/A', '2.5 inch', 'SATA', 'No', 2.00, 'https://placehold.co/150x150', 45),
(21, 'Toshiba N300 8TB', 12833.44, '7200', '3.5 inch', 'SATA', 'No', 8.00, 'https://placehold.co/150x150', 16),
(22, 'Intel Optane 900P 280GB', 21761.44, 'N/A', '2.5 inch', 'NVMe', 'Yes', 0.28, 'https://placehold.co/150x150', 44),
(23, 'Crucial BX500 240GB', 2231.44, 'N/A', '2.5 inch', 'SATA', 'No', 0.24, 'https://placehold.co/150x150', 24),
(24, 'WD Black P10 5TB', 7253.44, '5400', '2.5 inch', 'USB 3.0', 'No', 5.00, 'https://placehold.co/150x150', 36),
(25, 'Seagate Expansion 4TB', 5579.44, '5400', '3.5 inch', 'USB 3.0', 'No', 4.00, 'https://placehold.co/150x150', 8),
(26, 'Samsung T5 1TB', 7811.44, 'N/A', '2.5 inch', 'USB 3.1', 'No', 1.00, 'https://placehold.co/150x150', 33),
(27, 'ADATA XPG SX8200 Pro 1TB', 6974.44, 'N/A', 'M.2', 'NVMe', 'Yes', 1.00, 'https://placehold.co/150x150', 40),
(28, 'Toshiba Canvio Basics 2TB', 3348.00, '5400', '2.5 inch', 'USB 3.0', 'No', 2.00, 'https://placehold.co/150x150', 50);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `case_fans`
--
ALTER TABLE `case_fans`
  ADD PRIMARY KEY (`fan_id`);

--
-- Indexes for table `ComputerCases`
--
ALTER TABLE `ComputerCases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cpu_cooler`
--
ALTER TABLE `cpu_cooler`
  ADD PRIMARY KEY (`cooler_id`);

--
-- Indexes for table `gpu`
--
ALTER TABLE `gpu`
  ADD PRIMARY KEY (`gpu_id`);

--
-- Indexes for table `motherboard`
--
ALTER TABLE `motherboard`
  ADD PRIMARY KEY (`motherboard_id`);

--
-- Indexes for table `power_supplies`
--
ALTER TABLE `power_supplies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `processor`
--
ALTER TABLE `processor`
  ADD PRIMARY KEY (`processor_id`);

--
-- Indexes for table `ram_modules`
--
ALTER TABLE `ram_modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `storage_devices`
--
ALTER TABLE `storage_devices`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `case_fans`
--
ALTER TABLE `case_fans`
  MODIFY `fan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `ComputerCases`
--
ALTER TABLE `ComputerCases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `cpu_cooler`
--
ALTER TABLE `cpu_cooler`
  MODIFY `cooler_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `gpu`
--
ALTER TABLE `gpu`
  MODIFY `gpu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `motherboard`
--
ALTER TABLE `motherboard`
  MODIFY `motherboard_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `power_supplies`
--
ALTER TABLE `power_supplies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `processor`
--
ALTER TABLE `processor`
  MODIFY `processor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT for table `ram_modules`
--
ALTER TABLE `ram_modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `storage_devices`
--
ALTER TABLE `storage_devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
