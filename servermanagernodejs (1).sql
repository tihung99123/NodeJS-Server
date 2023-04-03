-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2023 at 01:13 PM
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
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menugames_category`
--

INSERT INTO `menugames_category` (`id`, `name`) VALUES
(4, 'sdsdsd'),
(5, 'âfafaff'),
(6, 'dgdgdg');

-- --------------------------------------------------------

--
-- Table structure for table `menugames_itemgames`
--

CREATE TABLE `menugames_itemgames` (
  `id_list` text NOT NULL,
  `id_name` text NOT NULL,
  `category_id` text NOT NULL,
  `name_game` text NOT NULL,
  `icon` text NOT NULL,
  `folder` text NOT NULL,
  `exe` text NOT NULL,
  `parameter` text NOT NULL,
  `linkfolder_target` text NOT NULL,
  `linkfolder_link` text NOT NULL,
  `reg_id` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menugames_itemgames`
--

INSERT INTO `menugames_itemgames` (`id_list`, `id_name`, `category_id`, `name_game`, `icon`, `folder`, `exe`, `parameter`, `linkfolder_target`, `linkfolder_link`, `reg_id`) VALUES
('22fa9ce7fed93c25b322afe11f3c8cff', '22fa9ce7fed93c25b322afe11f3c8cff', 'sfsfsf', 'sdf', '22fa9ce7fed93c25b322afe11f3c8cff', 'sdf', 'sdf', 'sdfs', '[{\"Tag_Target\":\"target-edit-0\",\"Target\":\"dfsd\"},{\"Tag_Target\":\"target-edit-1\",\"Target\":\"fsd\"},{\"Tag_Target\":\"target-edit-2\",\"Target\":\"sdf\"}]', '[{\"Tag_Link\":\"link-edit-0\",\"Link\":\"fs\"},{\"Tag_Link\":\"link-edit-1\",\"Link\":\"df\"},{\"Tag_Link\":\"link-edit-2\",\"Link\":\"sdf\"}]', '[{\"Tag_Reg\":\"reg-edit-0\",\"File\":\"sdfsdf\"},{\"Tag_Reg\":\"reg-edit-1\",\"File\":\"sd\"}]'),
('bc9bfd755486b1c0116686de56ec27a9', 'bc9bfd755486b1c0116686de56ec27a9', 'Bấm vào để chọn thể loại', 'sdf', 'bc9bfd755486b1c0116686de56ec27a9', 'sdf', 'sdf', 'sdf', '[{\"Tag_Target\":\"target0\",\"Target\":\"sdfs\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"dfsd\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"fsdfsdf\"}]'),
('5c401351a3cd03cff4249016bca7c28b', '5c401351a3cd03cff4249016bca7c28b', 'Bấm vào để chọn thể loại', 'sdg', '5c401351a3cd03cff4249016bca7c28b', 'sdgs', 'dg', 'sd', '[{\"Tag_Target\":\"target0\",\"Target\":\"sdgs\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"dgs\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"dgsdgsdg\"}]'),
('0d61cd05738f703bc38e6a5939439311', '0d61cd05738f703bc38e6a5939439311', 'Bấm vào để chọn thể loại', 'sd', '0d61cd05738f703bc38e6a5939439311', 'sdg', 'sd', 'gsdgsd', '[{\"Tag_Target\":\"target0\",\"Target\":\"gs\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"dgsd\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"dgsdg\"}]'),
('412417f88f07669d2fd05a46b31117c1', '412417f88f07669d2fd05a46b31117c1', 'Bấm vào để chọn thể loại', 'sd', '412417f88f07669d2fd05a46b31117c1', 'gsdg', 'sd', 'gsdgs', '[{\"Tag_Target\":\"target0\",\"Target\":\"dgsd\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"gsdg\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdg\"}]'),
('f41a66eb0bdd720e5526249021a9d0f9', 'f41a66eb0bdd720e5526249021a9d0f9', 'Bấm vào để chọn thể loại', 'sdfsd', 'f41a66eb0bdd720e5526249021a9d0f9', 'fsdf', 'sdf', 'sdfs', '[{\"Tag_Target\":\"target0\",\"Target\":\"df\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"sdfsd\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"fsdfsdf\"}]'),
('3d978ea54d010443850ac6b76fc40b26', '3d978ea54d010443850ac6b76fc40b26', 'Bấm vào để chọn thể loại', 'sd', '3d978ea54d010443850ac6b76fc40b26', 'sdff', 'sdfs', 'dfsd', '[{\"Tag_Target\":\"target0\",\"Target\":\"fsd\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"sdf\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdfsdfsdf\"}]'),
('eb1d1a4ac835b6500670b3add2cd7244', 'eb1d1a4ac835b6500670b3add2cd7244', 'Bấm vào để chọn thể loại', 'dsf', 'eb1d1a4ac835b6500670b3add2cd7244', 'f', 'sdfsd', 'sdfsd', '[{\"Tag_Target\":\"target0\",\"Target\":\"fsdf\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"sdf\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdfsdfsdf\"}]'),
('2edd4b1a37acb8c8aa0f6e2e66f73d0f', '2edd4b1a37acb8c8aa0f6e2e66f73d0f', 'Bấm vào để chọn thể loại', 'sdf', '2edd4b1a37acb8c8aa0f6e2e66f73d0f', 'dsfdsfsd', 'sd', 'fsdff', '[{\"Tag_Target\":\"target0\",\"Target\":\"sdf\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"dsfsd\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"fsdfsdf\"}]'),
('6ccd2d2667bcc86eb319fd8edbce568b', '6ccd2d2667bcc86eb319fd8edbce568b', 'Bấm vào để chọn thể loại', 'dsf', '6ccd2d2667bcc86eb319fd8edbce568b', 'sdf', 'sdf', 'sdfsd', '[{\"Tag_Target\":\"target0\",\"Target\":\"fsd\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"fsdf\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdfsdfsdf\"}]'),
('317ca7bd1a69706c20030a912d31521d', '317ca7bd1a69706c20030a912d31521d', 'Bấm vào để chọn thể loại', 'dsf', '317ca7bd1a69706c20030a912d31521d', 'sd', 'f', 'sdfsd', '[{\"Tag_Target\":\"target0\",\"Target\":\"fsdf\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"sdfs\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"dfsdf\"}]'),
('908c7ff9061cbb7dfa76138fe21b3f59', '908c7ff9061cbb7dfa76138fe21b3f59', 'Bấm vào để chọn thể loại', 'fsdf', '908c7ff9061cbb7dfa76138fe21b3f59', 'sdf', 'sdfsddsfs', 'df', '[{\"Tag_Target\":\"target0\",\"Target\":\"sdfsd\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"fdsf\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdfsdfsdf\"}]'),
('dfc910316ba8a84c78a7de2811365e9e', 'dfc910316ba8a84c78a7de2811365e9e', 'Bấm vào để chọn thể loại', 'sdf', 'dfc910316ba8a84c78a7de2811365e9e', 's', 'df', 'sdfsd', '[{\"Tag_Target\":\"target0\",\"Target\":\"fsdf\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"sdf\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdfsdfdsf\"}]'),
('e29464250aafc2f996f76c64f33a760f', 'e29464250aafc2f996f76c64f33a760f', 'Bấm vào để chọn thể loại', 'sd', 'e29464250aafc2f996f76c64f33a760f', 'fsdf', 'sd', 'fsdfdsf', '[{\"Tag_Target\":\"target0\",\"Target\":\"sdsfs\"},{\"Tag_Target\":\"target1\",\"Target\":\"sdf\"},{\"Tag_Target\":\"target2\",\"Target\":\"fsdf\"},{\"Tag_Target\":\"target3\",\"Target\":\"sdfsd\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"fd\"},{\"Tag_Link\":\"link1\",\"Link\":\"f\"},{\"Tag_Link\":\"link2\",\"Link\":\"fsdsdf\"},{\"Tag_Link\":\"link3\",\"Link\":\"fsdf\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"dfsdfsdfsd\"}]'),
('ae4c9a5243bd11e56bf71b64fba2b198', 'ae4c9a5243bd11e56bf71b64fba2b198', 'âfafaff', 'sdf', 'ae4c9a5243bd11e56bf71b64fba2b198', 'sdf', 'fsdfsd', 'f', '[{\"Tag_Target\":\"target0\",\"Target\":\"sdfds\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"fdsf\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdfsdf\"}]'),
('def0340b0e898c9902704e9845c4a6da', 'def0340b0e898c9902704e9845c4a6da', 'dgdgdg', 'f', 'def0340b0e898c9902704e9845c4a6da', 'dssdf', 'sd', 'fsdf', '[{\"Tag_Target\":\"target0\",\"Target\":\"sdf\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"sf\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdfsdfdsf\"}]'),
('ac07fdf3b723f29c0f223afc5f249cd3', 'ac07fdf3b723f29c0f223afc5f249cd3', 'sdsdsd', 'fs', 'ac07fdf3b723f29c0f223afc5f249cd3', 'sdfsd', 'df', 'sdfsdf', '[{\"Tag_Target\":\"target0\",\"Target\":\"sdf\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"sdf\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdfsdf\"}]'),
('05a829833b2e2cdf27d44ce9e25e9c07', '05a829833b2e2cdf27d44ce9e25e9c07', 'Bấm vào để chọn thể loại', 'f', '05a829833b2e2cdf27d44ce9e25e9c07', 'dfsd', 'sdf', 'sd', '[{\"Tag_Target\":\"target0\",\"Target\":\"fsdf\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"dsf\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdfsdfdf\"}]'),
('4ea2cc494bb72c5d2f8af3d1b4a0ca00', '4ea2cc494bb72c5d2f8af3d1b4a0ca00', 'sdsdsd', 'f', '4ea2cc494bb72c5d2f8af3d1b4a0ca00', 'ds', 'f', 'sdf', '[{\"Tag_Target\":\"target0\",\"Target\":\"sd\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"sdfsd\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"fsdf\"}]'),
('850c49e26f36f71a0af318036c6afe9a', '850c49e26f36f71a0af318036c6afe9a', 'Bấm vào để chọn thể loại', 'fdsf', '850c49e26f36f71a0af318036c6afe9a', 'sdf', 'sdf', 'sdfs', '[{\"Tag_Target\":\"target0\",\"Target\":\"dfsd\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"fsdf\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdfsdf\"}]'),
('991db4718506004090ecbc0c21c673dc', '991db4718506004090ecbc0c21c673dc', 'sdsdsd', 'f', '991db4718506004090ecbc0c21c673dc', 'f', 'dsfsdsdf', 'sdf', '[{\"Tag_Target\":\"target0\",\"Target\":\"sdf\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"sdf\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdfsdfds\"}]'),
('b7c5a6fb579ed9a7ae8ba597e9044d41', 'b7c5a6fb579ed9a7ae8ba597e9044d41', 'Bấm vào để chọn thể loại', 'fsd', 'b7c5a6fb579ed9a7ae8ba597e9044d41', 'f', 'sd', 'fdsf', '[{\"Tag_Target\":\"target0\",\"Target\":\"sdfds\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"fsfd\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdfsdf\"}]'),
('a7aef322471866b5139ea3bd34365c59', 'a7aef322471866b5139ea3bd34365c59', 'Bấm vào để chọn thể loại', 'fsd', 'a7aef322471866b5139ea3bd34365c59', 'f', 'sdf', 'sdfsd', '[{\"Tag_Target\":\"target0\",\"Target\":\"dfsdf\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"fs\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdfsfd\"}]'),
('dc72f3f3b6d8de8741cb96e68ccbee63', 'dc72f3f3b6d8de8741cb96e68ccbee63', 'Bấm vào để chọn thể loại', 'f', 'dc72f3f3b6d8de8741cb96e68ccbee63', 'sdfsdsd', 'sdfsdf', 'fsdffsdf', '[{\"Tag_Target\":\"target0\",\"Target\":\"sdf\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"sdf\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdfsdf\"}]'),
('48216e87fcee2593d1401387cb5cb78c', '48216e87fcee2593d1401387cb5cb78c', 'Bấm vào để chọn thể loại', 'sdf', '48216e87fcee2593d1401387cb5cb78c', 'sdf', 'fsdf', 'sdfsd', '[{\"Tag_Target\":\"target0\",\"Target\":\"fsd\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"fsdf\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdfds\"}]'),
('a9ec15152610658ddc40088fafc6a145', 'a9ec15152610658ddc40088fafc6a145', 'dgdgdg', 'dsf', 'a9ec15152610658ddc40088fafc6a145', 'sdf', 'sd', 'fsdf', '[{\"Tag_Target\":\"target0\",\"Target\":\"fsd\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"sdfsd\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"fsdf\"}]'),
('e77af8ad90e940adc7af851d733c2b47', 'e77af8ad90e940adc7af851d733c2b47', 'sdsdsd', 'sdfsd', 'e77af8ad90e940adc7af851d733c2b47', 'fsd', 'sddfsdf', 'sdf', '[{\"Tag_Target\":\"target0\",\"Target\":\"fsdfs\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"dfs\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"dfsdffsd\"}]'),
('7b38f57280e84030f0921d84309f3dde', '7b38f57280e84030f0921d84309f3dde', 'âfafaff', 'sd', '7b38f57280e84030f0921d84309f3dde', 'fsd', 'f', 'sdfds', '[{\"Tag_Target\":\"target0\",\"Target\":\"dfsd\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"fsdf\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"sdfsdf\"}]'),
('16e90893bac14647c13f83fe52e0f2ed', '16e90893bac14647c13f83fe52e0f2ed', 'Bấm vào để chọn thể loại', 'sdg', '16e90893bac14647c13f83fe52e0f2ed', 'gsdg', 'sdgsd', 'sdg', '[{\"Tag_Target\":\"target0\",\"Target\":\"sdg\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"sdgsd\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"gsdg\"}]'),
('fd6785efaeadc34c8833e8e1f4026396', 'fd6785efaeadc34c8833e8e1f4026396', 'Bấm vào để chọn thể loại', 'sd', 'fd6785efaeadc34c8833e8e1f4026396', 'g', 'sdgsd', 'gsdg', '[{\"Tag_Target\":\"target0\",\"Target\":\"dgsd\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"gs\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"gsdg\"}]'),
('03cded7dda7b5dd2515ad15d21d1ad0e', '03cded7dda7b5dd2515ad15d21d1ad0e', 'Bấm vào để chọn thể loại', 'dfg', '03cded7dda7b5dd2515ad15d21d1ad0e', 'd', 'fg', 'dfgdf', '[{\"Tag_Target\":\"target0\",\"Target\":\"gd\"}]', '[{\"Tag_Link\":\"link0\",\"Link\":\"fgdf\"}]', '[{\"Tag_Reg\":\"reg0\",\"File\":\"gdfgdfg\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `menugames_setting`
--

CREATE TABLE `menugames_setting` (
  `test` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menugames_sortorder`
--

CREATE TABLE `menugames_sortorder` (
  `number` int(11) NOT NULL,
  `id_list` text NOT NULL,
  `id_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menugames_sortorder`
--

INSERT INTO `menugames_sortorder` (`number`, `id_list`, `id_name`) VALUES
(1, '412417f88f07669d2fd05a46b31117c1', '412417f88f07669d2fd05a46b31117c1'),
(2, '0d61cd05738f703bc38e6a5939439311', '0d61cd05738f703bc38e6a5939439311'),
(3, 'bc9bfd755486b1c0116686de56ec27a9', 'bc9bfd755486b1c0116686de56ec27a9'),
(4, '3d978ea54d010443850ac6b76fc40b26', '3d978ea54d010443850ac6b76fc40b26'),
(5, '22fa9ce7fed93c25b322afe11f3c8cff', '22fa9ce7fed93c25b322afe11f3c8cff'),
(6, 'f41a66eb0bdd720e5526249021a9d0f9', 'f41a66eb0bdd720e5526249021a9d0f9'),
(7, 'eb1d1a4ac835b6500670b3add2cd7244', 'eb1d1a4ac835b6500670b3add2cd7244'),
(8, '2edd4b1a37acb8c8aa0f6e2e66f73d0f', '2edd4b1a37acb8c8aa0f6e2e66f73d0f'),
(9, '6ccd2d2667bcc86eb319fd8edbce568b', '6ccd2d2667bcc86eb319fd8edbce568b'),
(10, '317ca7bd1a69706c20030a912d31521d', '317ca7bd1a69706c20030a912d31521d'),
(11, 'dfc910316ba8a84c78a7de2811365e9e', 'dfc910316ba8a84c78a7de2811365e9e'),
(12, '908c7ff9061cbb7dfa76138fe21b3f59', '908c7ff9061cbb7dfa76138fe21b3f59'),
(13, '5c401351a3cd03cff4249016bca7c28b', '5c401351a3cd03cff4249016bca7c28b'),
(14, 'e29464250aafc2f996f76c64f33a760f', 'e29464250aafc2f996f76c64f33a760f'),
(15, 'ae4c9a5243bd11e56bf71b64fba2b198', 'ae4c9a5243bd11e56bf71b64fba2b198'),
(16, 'def0340b0e898c9902704e9845c4a6da', 'def0340b0e898c9902704e9845c4a6da'),
(17, 'ac07fdf3b723f29c0f223afc5f249cd3', 'ac07fdf3b723f29c0f223afc5f249cd3'),
(18, '05a829833b2e2cdf27d44ce9e25e9c07', '05a829833b2e2cdf27d44ce9e25e9c07'),
(19, '4ea2cc494bb72c5d2f8af3d1b4a0ca00', '4ea2cc494bb72c5d2f8af3d1b4a0ca00'),
(20, '850c49e26f36f71a0af318036c6afe9a', '850c49e26f36f71a0af318036c6afe9a'),
(21, '991db4718506004090ecbc0c21c673dc', '991db4718506004090ecbc0c21c673dc'),
(22, 'b7c5a6fb579ed9a7ae8ba597e9044d41', 'b7c5a6fb579ed9a7ae8ba597e9044d41'),
(23, 'a7aef322471866b5139ea3bd34365c59', 'a7aef322471866b5139ea3bd34365c59'),
(24, 'dc72f3f3b6d8de8741cb96e68ccbee63', 'dc72f3f3b6d8de8741cb96e68ccbee63'),
(25, '48216e87fcee2593d1401387cb5cb78c', '48216e87fcee2593d1401387cb5cb78c'),
(26, 'a9ec15152610658ddc40088fafc6a145', 'a9ec15152610658ddc40088fafc6a145'),
(27, 'e77af8ad90e940adc7af851d733c2b47', 'e77af8ad90e940adc7af851d733c2b47'),
(28, '7b38f57280e84030f0921d84309f3dde', '7b38f57280e84030f0921d84309f3dde'),
(29, '16e90893bac14647c13f83fe52e0f2ed', '16e90893bac14647c13f83fe52e0f2ed'),
(30, 'fd6785efaeadc34c8833e8e1f4026396', 'fd6785efaeadc34c8833e8e1f4026396'),
(31, '03cded7dda7b5dd2515ad15d21d1ad0e', '03cded7dda7b5dd2515ad15d21d1ad0e');

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
(1, 'Steam', 'tyhungpubg04', '01639731606Qw'),
(2, 'Steam', 'tyhungpubg03', '01639731606Qw'),
(3, 'Steam', 'tyhungpubg05', '0339731606Qw'),
(4, 'Steam', 'tyhungpubg06', '0339731606Qw'),
(5, 'Steam', 'tyhunggtav01', '0339731606Qw'),
(6, 'Steam', 'tyhunggtav02', '0339731606Qw'),
(8, 'Đột Kích', 'anhdadencubu113', '0169833899aa'),
(9, 'Đột Kích', 'quytkanhz0987', 'quytkanhz1203'),
(10, 'Đột Kích', 'captaincao', 'Chi001tinhyeu'),
(11, 'Đột Kích', 'phuc123kv12', '0147852369963'),
(12, 'Đột Kích', 'nickcf99080', '8s7kJQF2T'),
(13, 'Đột Kích', 'hoanhdung123456', '0169833899aa'),
(14, 'Đột Kích', 'hoanhdungdz123', '0169833899aa'),
(15, 'Đột Kích', 'hoanhdung12345', '0169833899aa'),
(16, 'Đột Kích', 'tihung12399123', '48974897489');

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
('Steam', 'Steam_Login'),
('Đột Kích', 'CF_Login');

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
