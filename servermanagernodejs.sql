-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2023 at 10:49 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `servermanagernodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `menugames_category`
--

CREATE TABLE `menugames_category` (
  `id` int(11) NOT NULL,
  `name` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menugames_itemgames`
--

CREATE TABLE `menugames_itemgames` (
  `id_list` int(11) NOT NULL,
  `id_name` int(11) NOT NULL,
  `namegames` text NOT NULL,
  `icon` text NOT NULL,
  `location` text NOT NULL,
  `parameter` text NOT NULL,
  `linkfolder_id` text NOT NULL,
  `rentaccount` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menugames_linkid`
--

CREATE TABLE `menugames_linkid` (
  `linkid` text NOT NULL,
  `target_link` text NOT NULL,
  `source_link` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rentaccount_account`
--

CREATE TABLE `rentaccount_account` (
  `id` int(11) NOT NULL,
  `typegame` text NOT NULL,
  `account` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rentaccount_account`
--

INSERT INTO `rentaccount_account` (`id`, `typegame`, `account`, `password`) VALUES
(1, 's1', 'zxfzxf', ''),
(2, 'setting', 'sdfsd', 'gsd'),
(3, 's1', 'asdasdasdasd', ''),
(4, 'setting', 'asgasg', 'asgasgasg'),
(6, 's1', 'dkfjskjdf', 'sdfdsf'),
(7, 'setting', 'sfsdfsdfs', 'dsfsdfsdf'),
(8, 'setting', 'dfdsf', 'dsfds'),
(9, 's1', 'dfdsfsd', 'sdfsdf'),
(10, 'setting', 'fdfdsf', 'cvcxvcx');

-- --------------------------------------------------------

--
-- Table structure for table `rentaccount_donateaccount`
--

CREATE TABLE `rentaccount_donateaccount` (
  `typegame` text NOT NULL,
  `account` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rentaccount_namegame`
--

CREATE TABLE `rentaccount_namegame` (
  `typegame` text NOT NULL,
  `settingmacro` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rentaccount_namegame`
--

INSERT INTO `rentaccount_namegame` (`typegame`, `settingmacro`) VALUES
('setting', 'setiing'),
('s1', 'safaf');

-- --------------------------------------------------------

--
-- Table structure for table `rentaccount_status`
--

CREATE TABLE `rentaccount_status` (
  `id` int(11) NOT NULL,
  `typegame` text NOT NULL,
  `account` text NOT NULL,
  `clientid` text NOT NULL,
  `clientname` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
