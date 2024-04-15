drop table if exists category;
create table category (
    id bigserial primary key,
    name varchar(255) unique
);

insert into category(name) values ('food');
select reset_sequence('category')