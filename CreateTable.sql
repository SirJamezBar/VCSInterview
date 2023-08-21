-- public.contacts definition

-- Drop table

-- DROP TABLE public.contacts;

CREATE TABLE public.contacts (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	"name" varchar NULL,
	surname varchar NULL,
	telno varchar NULL,
	email varchar NULL,
	datebirth date NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);