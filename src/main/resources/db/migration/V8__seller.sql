drop table if exists seller;

create table seller (
    id bigserial primary key,
    foreign key(id) references app_user(id)
);

insert into seller(id) values(1);
select reset_sequence('seller');