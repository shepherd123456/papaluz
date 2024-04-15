drop table if exists email_verification;

create table email_verification (
    id bigserial primary key,
    user_email varchar(255),
    user_password varchar(255),
    token varchar(255),
    expiration timestamp,
    unique(user_email)
);