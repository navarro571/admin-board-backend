CREATE TABLE IF NOT EXISTS public.roles
(
    id  SERIAL,
    name character varying(255),
    CONSTRAINT roles_pkey PRIMARY KEY (id)
)