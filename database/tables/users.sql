CREATE TABLE IF NOT EXISTS public.users
(
    id integer SERIAL,
    role integer NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    lastname character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    recovery_token character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT email UNIQUE (email),
    CONSTRAINT role FOREIGN KEY (role)
        REFERENCES public.roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)