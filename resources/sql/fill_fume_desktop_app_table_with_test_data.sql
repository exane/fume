-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 09. Mrz 2015 um 19:40
-- Server Version: 5.6.17
-- PHP-Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `fume`
--

--
-- TRUNCATE Tabelle vor dem Einfügen `desktopApps`
--

TRUNCATE TABLE `desktopApps`;
--
-- Daten für Tabelle `desktopApps`
--

INSERT INTO `desktopApps` (`id`, `title`, `content`) VALUES
(1, 'youtube', '<iframe style="width: 100%; height: 100%;" width="560" height="315" src="https://www.youtube.com/embed/efR4kpts6eg" frameborder="0" allowfullscreen></iframe>'),
(2, 'goku ssj3', 'lol verarscht!');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
