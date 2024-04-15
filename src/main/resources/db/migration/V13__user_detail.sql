drop table if exists user_detail;

create table user_detail (
    id bigserial primary key,
    first_name varchar(255),
    middle_name varchar(255),
    last_name varchar(255),
    birth date,
    citizenship varchar(255),
    phone varchar(255),
    profile_imgfilename varchar(255),
    foreign key(id) references app_user(id)
);