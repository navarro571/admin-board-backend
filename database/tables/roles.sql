CREATE TABLE IF NOT EXISTS public.roles
(
    id  SERIAL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    authorization_level integer NOT NULL,
    CONSTRAINT roles_pkey PRIMARY KEY (id)
    CONSTRAINT roles_name_key UNIQUE (name)
)