drop table if exists role;
create table role (
	id bigserial primary key,
	name varchar(255)
);

insert into role(name) values
    ('USER'),
    ('SELLER'),
    ('ADMIN');

select reset_sequence('role')