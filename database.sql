CREATE TABLE jusers (
    user_id uuid DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE jbanks (
    bank_id SERIAL,
    user_id UUID,
    name VARCHAR(255) NOT NULL,
    amount NUMERIC(12,2), 
    date VARCHAR(30), 
    category VARCHAR(30),
    PRIMARY KEY (bank_id),
    FOREIGN KEY (user_id) REFERENCES jusers(user_id)
);

CREATE TABLE jbgtex (
    bank_id SERIAL,
    user_id UUID,
    name VARCHAR(255) NOT NULL,
    amount NUMERIC(12,2), 
    date VARCHAR(30), 
    category VARCHAR(30),
    PRIMARY KEY (bank_id),
    FOREIGN KEY (user_id) REFERENCES jusers(user_id)
);



CREATE TABLE jfunds (
    fund_id SERIAL,
    user_id UUID,
    funds DECIMAL NOT NULL,
    PRIMARY KEY (fund_id),
    FOREIGN KEY (user_id) REFERENCES jusers(user_id)
);

CREATE TABLE jbudget (
    budget_id SERIAL,
    user_id UUID,
    category VARCHAR(30),
    budget DECIMAL NOT NULL,
    PRIMARY KEY (budget_id),
    FOREIGN KEY (user_id) REFERENCES jusers(user_id)
);


