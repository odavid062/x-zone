-- ============================================================
-- X-Zone 2026 — Schema inicial
-- ============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- Ticket types
-- ============================================================
CREATE TABLE ticket_types (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT    NOT NULL,
  description     TEXT,
  price           DECIMAL(10,2) NOT NULL,
  quantity_total  INTEGER NOT NULL,
  quantity_sold   INTEGER NOT NULL DEFAULT 0,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  sale_start      TIMESTAMPTZ,
  sale_end        TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Coupons
-- ============================================================
CREATE TABLE coupons (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code             TEXT    NOT NULL UNIQUE,
  discount_type    TEXT    NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value   DECIMAL(10,2) NOT NULL,
  max_uses         INTEGER,
  uses_count       INTEGER NOT NULL DEFAULT 0,
  min_order_value  DECIMAL(10,2),
  valid_from       TIMESTAMPTZ,
  valid_until      TIMESTAMPTZ,
  is_active        BOOLEAN NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Orders
-- ============================================================
CREATE TABLE orders (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number         TEXT    NOT NULL UNIQUE,
  customer_name        TEXT    NOT NULL,
  customer_email       TEXT    NOT NULL,
  customer_cpf         TEXT    NOT NULL,
  customer_phone       TEXT,
  subtotal             DECIMAL(10,2) NOT NULL,
  discount             DECIMAL(10,2) NOT NULL DEFAULT 0,
  total                DECIMAL(10,2) NOT NULL,
  coupon_id            UUID REFERENCES coupons(id),
  status               TEXT    NOT NULL DEFAULT 'pending'
                         CHECK (status IN ('pending','paid','cancelled','refunded','failed')),
  payment_method       TEXT    CHECK (payment_method IN ('pix', 'credit_card')),
  payment_id           TEXT,
  payment_expires_at   TIMESTAMPTZ,
  paid_at              TIMESTAMPTZ,
  ip_address           INET,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Order items
-- ============================================================
CREATE TABLE order_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID    NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  ticket_type_id  UUID    NOT NULL REFERENCES ticket_types(id),
  quantity        INTEGER NOT NULL CHECK (quantity > 0),
  unit_price      DECIMAL(10,2) NOT NULL,
  total_price     DECIMAL(10,2) NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Tickets (generated after payment)
-- ============================================================
CREATE TABLE tickets (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID    NOT NULL REFERENCES orders(id),
  ticket_type_id  UUID    NOT NULL REFERENCES ticket_types(id),
  ticket_code     TEXT    NOT NULL UNIQUE,
  attendee_name   TEXT,
  attendee_cpf    TEXT,
  checked_in      BOOLEAN NOT NULL DEFAULT false,
  checked_in_at   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Admin users
-- ============================================================
CREATE TABLE admin_users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('super_admin', 'admin', 'viewer')),
  is_active   BOOLEAN NOT NULL DEFAULT true,
  last_login  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Audit logs
-- ============================================================
CREATE TABLE audit_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type  TEXT NOT NULL,
  entity_id    UUID,
  action       TEXT NOT NULL,
  admin_id     UUID REFERENCES admin_users(id),
  ip_address   INET,
  payload      JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Triggers: updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_ticket_types_updated_at
  BEFORE UPDATE ON ticket_types
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Function: increment coupon uses
-- ============================================================
CREATE OR REPLACE FUNCTION increment_coupon_uses(coupon_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE coupons SET uses_count = uses_count + 1 WHERE id = coupon_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- Function: decrement ticket availability (with lock)
-- ============================================================
CREATE OR REPLACE FUNCTION reserve_tickets(p_type_id UUID, p_quantity INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
  available INTEGER;
BEGIN
  SELECT (quantity_total - quantity_sold) INTO available
  FROM ticket_types WHERE id = p_type_id FOR UPDATE;

  IF available < p_quantity THEN RETURN FALSE; END IF;

  UPDATE ticket_types
  SET quantity_sold = quantity_sold + p_quantity
  WHERE id = p_type_id;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE orders       ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets      ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs   ENABLE ROW LEVEL SECURITY;

-- Only service role can read orders/tickets
CREATE POLICY "service_all_orders"
  ON orders FOR ALL TO service_role USING (true);

CREATE POLICY "service_all_tickets"
  ON tickets FOR ALL TO service_role USING (true);

CREATE POLICY "service_all_audit"
  ON audit_logs FOR ALL TO service_role USING (true);

-- ============================================================
-- Seed: ticket types
-- ============================================================
INSERT INTO ticket_types (name, description, price, quantity_total) VALUES
  ('Inteira',      'Acesso completo ao evento',                            60.00,  3000),
  ('Meia-Entrada', 'Estudante, idoso ou PCD — apresentar documento',       30.00,  1000),
  ('VIP',          'Experiência premium com benefícios exclusivos',        120.00,   200);

-- ============================================================
-- Indexes for performance
-- ============================================================
CREATE INDEX idx_orders_email        ON orders (customer_email);
CREATE INDEX idx_orders_status       ON orders (status);
CREATE INDEX idx_orders_payment_id   ON orders (payment_id);
CREATE INDEX idx_orders_created_at   ON orders (created_at DESC);
CREATE INDEX idx_tickets_code        ON tickets (ticket_code);
CREATE INDEX idx_tickets_order_id    ON tickets (order_id);
CREATE INDEX idx_audit_entity        ON audit_logs (entity_type, entity_id);
