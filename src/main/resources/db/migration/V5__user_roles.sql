drop table if exists user_roles;

create table user_roles (
	user_id bigint,
	role_id bigint,
	foreign key(user_id) references app_user(id),
	foreign key(role_id) references role(id)
);

insert into user_roles values
    (1,1),
    (2,1),
    (3,1),
    (1,2),
    (3,3);
