drop table if exists refresh_token;
create table refresh_token (
	id bigserial primary key,
	token varchar(255),
	user_id bigint,
	foreign key(user_id) references app_user(id)
);
