drop table if exists seller_categories;

create table seller_categories (
	seller_id bigint,
	category_id bigint,
	primary key (seller_id, category_id),
	foreign key(seller_id) references seller(id),
	foreign key(category_id) references category(id)
);

insert into seller_categories(seller_id, category_id) values(1, 1);