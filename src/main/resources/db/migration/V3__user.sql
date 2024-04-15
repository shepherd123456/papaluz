drop table if exists app_user;
create table app_user (
	id bigserial primary key,
	password varchar(255),
	email varchar(255),
	unique(email)
);

insert into app_user values
    (1,'$2a$10$jtmE0l0HY9fKkuklhOgo4uADfnaLCw/McOq3ffVc2tBuEOlWQwaEy','dave@gmail.com'),
    (2,'$2a$10$6g5/SquRfITzKfICWSHY0.GQNmmd.fveI6k3UqfRpfl/FIBUB8j8W','kevin@gmail.com'),
    (3,'$2a$10$QfDQ/UZidayXs3NGBNPVku09a4xda2.nX6JCHM3TQ.oXN0q0dLQ/S','jane@gmail.com');

select reset_sequence('app_user')