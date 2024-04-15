drop table if exists user_detail_addresses;

create table user_detail_addresses (
	user_id bigint,
	address_id bigint,
	foreign key(user_id) references app_user(id),
	foreign key(address_id) references address(id)
);