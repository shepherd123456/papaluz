drop table if exists address;

create table address (
    id bigserial primary key,
    zip varchar(255),
    address_line1 varchar(255),
    address_line2 varchar(255),
    city varchar(255),
    state varchar(255),
    country varchar(255)
);