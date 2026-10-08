CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE product_status AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


CREATE TYPE cargo_status AS ENUM (
    'REGISTERED',
    'UNDER_ANALYSIS',
    'UNDER_INSPECTION',
    'RELEASED',
    'BLOCKED',
    'IN_TRANSIT',
    'COMPLETED',
    'CANCELED'
);


CREATE TYPE document_status AS ENUM (
    'PENDING',
    'VALID',
    'INVALID',
    'EXPIRED'
);

CREATE TABLE chemical_product (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    description TEXT,
    chemical_formula VARCHAR(100),
    onu_number VARCHAR(20),
    risk_class VARCHAR(50) NOT NULL,
    compatibility_group VARCHAR(50),
    status product_status NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE technical_responsible (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    professional_registry VARCHAR(50) NOT NULL UNIQUE,
    contact VARCHAR(30),
    email VARCHAR(150),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE chemical_cargo (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cargo_code VARCHAR(50) NOT NULL UNIQUE,
    product_id UUID NOT NULL,
    quantity NUMERIC(12, 3) NOT NULL,
    unit_of_measure VARCHAR(20) NOT NULL,
    cargo_type VARCHAR(50),
    origin VARCHAR(150) NOT NULL,
    destination VARCHAR(150) NOT NULL,
    technical_responsible_id UUID NOT NULL,
    status cargo_status NOT NULL DEFAULT 'REGISTERED',
    entry_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_cargo_quantity
        CHECK (quantity > 0),

    CONSTRAINT fk_cargo_product
        FOREIGN KEY (product_id)
        REFERENCES chemical_product(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_cargo_technical_responsible
        FOREIGN KEY (technical_responsible_id)
        REFERENCES technical_responsible(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


CREATE TABLE cargo_document (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cargo_id UUID NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    document_number VARCHAR(100),
    expiration_date DATE,
    file_url VARCHAR(255),
    validation_status document_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_document_cargo
        FOREIGN KEY (cargo_id)
        REFERENCES chemical_cargo(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


CREATE INDEX idx_chemical_cargo_product
    ON chemical_cargo(product_id);

CREATE INDEX idx_chemical_cargo_technical_responsible
    ON chemical_cargo(technical_responsible_id);

CREATE INDEX idx_cargo_document_cargo
    ON cargo_document(cargo_id);
