drop table if exists product;
create table product (
	id bigserial primary key,
	uuid uuid,
	title varchar(255),
	price decimal(13, 2),
	description varchar(2048),
	category_id bigint,
	seller_id bigint,
	foreign key(category_id) references category(id),
	foreign key(seller_id) references seller(id)
);


--insert into product(uuid, title, price, description, category_id, seller_id) values
--    (unhex(replace(uuid(), "-", "")),"Zampionova", 189, "Tomat, eidam, šunka, žampióny (1a,7)*", 1, 1),
--    (unhex(replace(uuid(), "-", "")), "Ostravska", 179, "Tomat, eidam, šunka, anglická slanina, klobása, vejce, kozí rohy (1a,3,7)*", 1, 1),
--    (unhex(replace(uuid(), "-", "")), "S peti druhy salamu", 189, "Tomat, eidam, šunka, vysočina, anglická slanina, klobása, paprikový salám, kozí rohy (1a,7)* ", 1, 1),
--    (unhex(replace(uuid(), "-", "")),"Banicek", 199, "OSTRÁ!!! Tomat, eidam, šunka, vysočina, kukuřice, chilli, uzený eidam, paprika (1a,7,12)* ", 1, 1),
--    (unhex(replace(uuid(), "-", "")),"Anglicak", 179, "Tomat, eidam, anglická slanina, cibule, česnek (1a,7)* ", 1, 1),
--    (unhex(replace(uuid(), "-", "")),"Tri cunici", 189, "Tomat, eidam, vepřová panenka, šunka, anglická slanina, paprika, cibule, česnek (1a,7)* ", 1, 1),
--    (unhex(replace(uuid(), "-", "")),"Kureci pochoutka", 199, "Tomat, eidam, šunka, kuřecí maso, rajče, ementál, olivy (1a,7,10)* ", 1, 1);
