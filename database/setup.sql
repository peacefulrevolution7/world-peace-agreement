-- Datenbank für World Peace Agreement
-- MariaDB/MySQL kompatibel

-- Tabelle für Unterzeichner erstellen
CREATE TABLE IF NOT EXISTS signers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  signer_no INT NOT NULL UNIQUE,
  is_reserved TINYINT(1) DEFAULT 0,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  birth_date DATE NOT NULL,
  country VARCHAR(100) NOT NULL,
  gender VARCHAR(20),
  title_field VARCHAR(100),
  profession VARCHAR(100),
  function_title VARCHAR(100),
  organization VARCHAR(255),
  place VARCHAR(100),
  public_name TINYINT(1) DEFAULT 0,
  public_approved TINYINT(1) DEFAULT 0,
  wants_postal TINYINT(1) DEFAULT 0,
  street VARCHAR(255),
  postal_code VARCHAR(20),
  city VARCHAR(100),
  country_address VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_country (country),
  INDEX idx_created_at (created_at),
  INDEX idx_public (public_name, public_approved),
  INDEX idx_signer_no (signer_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabelle für Blog-Posts (für zukünftige Nutzung)
CREATE TABLE IF NOT EXISTS blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  author VARCHAR(100),
  published TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_published (published),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabelle für Admin-Benutzer (für Backend)
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Beispiel Admin-Benutzer einfügen (Passwort: admin123)
-- WICHTIG: Passwort nach erster Anmeldung ändern!
INSERT INTO admin_users (username, password_hash, email) 
VALUES ('admin', '$2a$10$rLcIvN8qKq7P9EqCLqvRZOxO9qX5q5JJx5q5JJx5q5JJx5q5JJx5q', 'info@gaiamocracy.org')
ON DUPLICATE KEY UPDATE username=username;
