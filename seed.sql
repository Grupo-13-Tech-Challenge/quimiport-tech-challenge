INSERT INTO chemical_product (
    id,
    name,
    description,
    chemical_formula,
    onu_number,
    risk_class,
    compatibility_group,
    status
) VALUES (
    '5b48ce34-3cce-47ca-8892-51582632555c',
    'Metanol',
    'Alcool toxico e inflamavel utilizado como solvente e materia-prima.',
    'CH3OH',
    '1230',
    '3',
    'Alcoois inflamaveis',
    'ACTIVE'
) ON CONFLICT (id) DO UPDATE
SET status = 'ACTIVE',
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO technical_responsible (
    id,
    name,
    professional_registry,
    contact,
    email,
    active
) VALUES (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'Ana Souza',
    'CRQ-12345',
    '11999999999',
    'ana.souza@quimiport.local',
    TRUE
) ON CONFLICT (id) DO NOTHING;

INSERT INTO chemical_cargo (
    id,
    cargo_code,
    product_id,
    quantity,
    unit_of_measure,
    cargo_type,
    origin,
    destination,
    technical_responsible_id,
    status,
    entry_date
) VALUES (
    'c1000000-0000-4000-8000-000000000010',
    'CARGA-SEED-001',
    '5b48ce34-3cce-47ca-8892-51582632555c',
    1500.500,
    'kg',
    'Granel liquido',
    'Porto de Santos',
    'Cubatao - SP',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'UNDER_INSPECTION',
    TIMESTAMP '2026-10-29 11:30:00'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO cargo_document (
    id,
    cargo_id,
    document_type,
    document_number,
    expiration_date,
    validation_status
) VALUES (
    'd1000000-0000-4000-8000-000000000010',
    'c1000000-0000-4000-8000-000000000010',
    'FISPQ',
    'DOC-SEED-001',
    DATE '2027-12-31',
    'VALID'
) ON CONFLICT (id) DO NOTHING;
