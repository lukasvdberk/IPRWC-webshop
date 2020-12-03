CREATE TABLE product
(
    product_id SERIAL,
    name VARCHAR(255),
    price DOUBLE PRECISION,
    description TEXT,
    image_url TEXT,
    PRIMARY KEY (product_id)
);

CREATE TABLE customer
(
    customer_id SERIAL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(320),
    customer_since DATE,
    phone_number VARCHAR(12),
    PRIMARY KEY (customer_id)
);

CREATE TABLE "order"
(
    order_id SERIAL,
    customer_id BIGINT,
    ordered_on DATE,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    PRIMARY KEY (order_id)
);

CREATE TABLE order_rule
(
    order_rule_id SERIAL,
    order_id BIGINT,
    product_id BIGINT,
    amount BIGINT,
    FOREIGN KEY (order_id) REFERENCES "order"(order_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    PRIMARY KEY (order_rule_id)
)