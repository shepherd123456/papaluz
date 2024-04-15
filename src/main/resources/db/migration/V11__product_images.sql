drop table if exists product_images;
create table product_images(
    id bigserial primary key,
    filename varchar(255),
    product_id BIGINT,
    foreign key(product_id) references product(id)
);