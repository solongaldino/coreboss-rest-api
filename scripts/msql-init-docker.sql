-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema corebossdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema corebossdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `corebossdb` ;
USE `corebossdb` ;

-- -----------------------------------------------------
-- Table `corebossdb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `corebossdb`.`User` (
  `id` CHAR(36) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `genre` VARCHAR(45) NOT NULL,
  `attempt_login` SMALLINT UNSIGNED NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `corebossdb`.`JwtBlackList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `corebossdb`.`JwtBlackList` (
  `id` CHAR(36) NOT NULL,
  `user` CHAR(36) NOT NULL,
  `token` VARCHAR(600) NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_JwtBlackList_User1_idx` (`user` ASC) VISIBLE,
  CONSTRAINT `fk_JwtBlackList_User1`
    FOREIGN KEY (`user`)
    REFERENCES `corebossdb`.`User` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `corebossdb`.`LoginStatement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `corebossdb`.`LoginStatement` (
  `id` CHAR(36) NOT NULL,
  `user` CHAR(36) NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_UserLoginStatement_User1_idx` (`user` ASC) VISIBLE,
  CONSTRAINT `fk_UserLoginStatement_User1`
    FOREIGN KEY (`user`)
    REFERENCES `corebossdb`.`User` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `corebossdb`.`TokenMail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `corebossdb`.`TokenMail` (
  `id` CHAR(36) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `details` VARCHAR(1020) NULL DEFAULT NULL,
  `token_expiration` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
