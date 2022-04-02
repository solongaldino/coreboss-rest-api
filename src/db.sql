-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema garotaweb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema garotaweb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `garotaweb` ;
USE `garotaweb` ;

-- -----------------------------------------------------
-- Table `garotaweb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `garotaweb`.`User` (
  `id` CHAR(36) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `genre` VARCHAR(45) NOT NULL,
  `attempt_login` SMALLINT UNSIGNED NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 1001
PACK_KEYS = DEFAULT;


-- -----------------------------------------------------
-- Table `garotaweb`.`TokenMail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `garotaweb`.`TokenMail` (
  `id` CHAR(36) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `details` VARCHAR(1020) NULL,
  `token_expiration` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `token_UNIQUE` (`token` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `garotaweb`.`Ads`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `garotaweb`.`Ads` (
  `id` CHAR(36) NOT NULL,
  `user` CHAR(36) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `genre` VARCHAR(45) NOT NULL,
  `token` VARCHAR(32) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  `spotlighted` TINYINT(1) NULL,
  `state` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `whatsapp` VARCHAR(45) NULL,
  `age` VARCHAR(45) NULL,
  `hair` VARCHAR(45) NULL,
  `height` VARCHAR(45) NULL,
  `weight` VARCHAR(45) NULL,
  `mannequin` VARCHAR(45) NULL,
  `foot` VARCHAR(45) NULL,
  `eyes` VARCHAR(45) NULL,
  `schedule` VARCHAR(45) NULL,
  `price` VARCHAR(45) NULL,
  `short_description` VARCHAR(200) NULL,
  `description` TEXT NULL,
  `own_place` TINYINT(1) NULL,
  `cred_card` TINYINT(1) NULL,
  `debit_card` TINYINT(1) NULL,
  `pix` TINYINT(1) NULL,
  `bitcoin` TINYINT(1) NULL,
  `code` VARCHAR(45) NULL,
  `uprised_at` DATETIME NULL,
  `kiss_on_the_mouth` TINYINT(1) NULL,
  `doubles` TINYINT(1) NULL,
  `ejaculation_in_the_body` TINYINT(1) NULL,
  `facial_ejaculation` TINYINT(1) NULL,
  `costumes_and_disguises` TINYINT(1) NULL,
  `erotic_massage` TINYINT(1) NULL,
  `little_girlfriend` TINYINT(1) NULL,
  `oral_until_the_end` TINYINT(1) NULL,
  `blowjob_to_the_end` TINYINT(1) NULL,
  `blowjob_with_condom` TINYINT(1) NULL,
  `blowjob_without_condom` TINYINT(1) NULL,
  `pse` TINYINT(1) NULL,
  `anal_sex` TINYINT(1) NULL,
  `black_kiss` TINYINT(1) NULL,
  `golden_rain` TINYINT(1) NULL,
  `black_rain` TINYINT(1) NULL,
  `fetishism` TINYINT(1) NULL,
  `deep_throat` TINYINT(1) NULL,
  `hard_sado` TINYINT(1) NULL,
  `soft_sado` TINYINT(1) NULL,
  `squirting` TINYINT(1) NULL,
  `strap_on` TINYINT(1) NULL,
  `at_home` TINYINT(1) NULL,
  `with_apartment` TINYINT(1) NULL,
  `hotel` TINYINT(1) NULL,
  `swing_club` TINYINT(1) NULL,
  `bachelor_party` TINYINT(1) NULL,
  `parties_and_events` TINYINT(1) NULL,
  `romantic_dinner` TINYINT(1) NULL,
  `trips` TINYINT(1) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Ads_User1_idx` (`user` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_Ads_User1`
    FOREIGN KEY (`user`)
    REFERENCES `garotaweb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `garotaweb`.`Plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `garotaweb`.`Plan` (
  `id` CHAR(36) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `value` DECIMAL(16,8) NOT NULL,
  `days` SMALLINT UNSIGNED NOT NULL,
  `uprise` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `garotaweb`.`Invoice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `garotaweb`.`Invoice` (
  `id` CHAR(36) NOT NULL,
  `ads` CHAR(36) NOT NULL,
  `plan` CHAR(36) NOT NULL,
  `value` DECIMAL(8,2) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `token` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Invoice_Ads1_idx` (`ads` ASC) VISIBLE,
  INDEX `fk_Invoice_Plan1_idx` (`plan` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_Invoice_Ads1`
    FOREIGN KEY (`ads`)
    REFERENCES `garotaweb`.`Ads` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Invoice_Plan1`
    FOREIGN KEY (`plan`)
    REFERENCES `garotaweb`.`Plan` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1001;


-- -----------------------------------------------------
-- Table `garotaweb`.`Payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `garotaweb`.`Payment` (
  `id` CHAR(36) NOT NULL,
  `invoice` CHAR(36) NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Payment_Invoce1_idx` (`invoice` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_Payment_Invoce1`
    FOREIGN KEY (`invoice`)
    REFERENCES `garotaweb`.`Invoice` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `garotaweb`.`LoginStatement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `garotaweb`.`LoginStatement` (
  `id` CHAR(36) NOT NULL,
  `user` CHAR(36) NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_UserLoginStatement_User1_idx` (`user` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_UserLoginStatement_User1`
    FOREIGN KEY (`user`)
    REFERENCES `garotaweb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `garotaweb`.`Tube`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `garotaweb`.`Tube` (
  `id` CHAR(36) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `code` SMALLINT UNSIGNED NULL,
  `status` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `garotaweb`.`Job`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `garotaweb`.`Job` (
  `id` CHAR(36) NOT NULL,
  `tube` CHAR(36) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `priority` SMALLINT UNSIGNED NOT NULL,
  `attempts` INT UNSIGNED NOT NULL,
  `details` VARCHAR(1020) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Task_Tube1_idx` (`tube` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_Task_Tube1`
    FOREIGN KEY (`tube`)
    REFERENCES `garotaweb`.`Tube` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `garotaweb`.`Photo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `garotaweb`.`Photo` (
  `id` CHAR(36) NOT NULL,
  `ads` CHAR(36) NOT NULL,
  `url` VARCHAR(500) NOT NULL,
  `order` SMALLINT UNSIGNED NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Photo_Ads1_idx` (`ads` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_Photo_Ads1`
    FOREIGN KEY (`ads`)
    REFERENCES `garotaweb`.`Ads` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `garotaweb`.`Uprise`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `garotaweb`.`Uprise` (
  `id` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `garotaweb`.`JwtBlackList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `garotaweb`.`JwtBlackList` (
  `id` CHAR(36) NOT NULL,
  `user` CHAR(36) NOT NULL,
  `token` VARCHAR(600) NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_JwtBlackList_User1_idx` (`user` ASC) VISIBLE,
  CONSTRAINT `fk_JwtBlackList_User1`
    FOREIGN KEY (`user`)
    REFERENCES `garotaweb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `garotaweb`.`User`
-- -----------------------------------------------------
START TRANSACTION;
USE `garotaweb`;
INSERT INTO `garotaweb`.`User` (`id`, `email`, `password`, `status`, `type`, `genre`, `attempt_login`, `created_at`, `updated_at`) VALUES ('1000', 'gulosa@exxx.com', '$2y$10$JF7pFWpHWNb39DOJEmBWXuIQJALHiWNy84ilMl0.nWAVh6WhVVkPi', '1', '2', 'TRANS', 0, '2015-01-01 12:44:21', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `garotaweb`.`Plan`
-- -----------------------------------------------------
START TRANSACTION;
USE `garotaweb`;
INSERT INTO `garotaweb`.`Plan` (`id`, `name`, `value`, `days`, `uprise`) VALUES ('1', 'Bronze', 0.00200000, 5, 50);
INSERT INTO `garotaweb`.`Plan` (`id`, `name`, `value`, `days`, `uprise`) VALUES ('2', 'Silver', 0.00500000, 10, 100);
INSERT INTO `garotaweb`.`Plan` (`id`, `name`, `value`, `days`, `uprise`) VALUES ('3', 'Gold', 0.01000000, 15, 200);

COMMIT;


-- -----------------------------------------------------
-- Data for table `garotaweb`.`Tube`
-- -----------------------------------------------------
START TRANSACTION;
USE `garotaweb`;
INSERT INTO `garotaweb`.`Tube` (`id`, `name`, `code`, `status`, `created_at`, `updated_at`) VALUES ('1', 'general', 1, '1', '2015-01-01 12:44:21', NULL);

COMMIT;

