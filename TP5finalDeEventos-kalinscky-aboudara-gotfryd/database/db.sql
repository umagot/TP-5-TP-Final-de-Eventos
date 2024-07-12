--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.0

-- Started on 2024-07-05 10:04:58

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4818 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16484)
-- Name: event_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_categories (
    id integer NOT NULL,
    name text NOT NULL,
    display_order integer NOT NULL
);


ALTER TABLE public.event_categories OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16489)
-- Name: event_enrollments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_enrollments (
    id integer NOT NULL,
    id_event integer NOT NULL,
    id_user integer NOT NULL,
    description text NOT NULL,
    registration_date_time timestamp without time zone NOT NULL,
    attended integer NOT NULL,
    observations text NOT NULL,
    rating integer NOT NULL
);


ALTER TABLE public.event_enrollments OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16494)
-- Name: event_locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_locations (
    id integer NOT NULL,
    id_location integer NOT NULL,
    name text NOT NULL,
    full_address text NOT NULL,
    max_capacity text NOT NULL,
    latitude integer NOT NULL,
    longitude integer NOT NULL,
    id_creator_user integer NOT NULL
);


ALTER TABLE public.event_locations OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16502)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    id_event_category integer NOT NULL,
    id_event_location integer NOT NULL,
    start_date timestamp without time zone NOT NULL,
    duration_in_minutes integer NOT NULL,
    price integer NOT NULL,
    enabled_for_enrollment integer NOT NULL,
    max_assistance integer NOT NULL,
    id_creator_user integer NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16507)
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    name text NOT NULL,
    id_province integer NOT NULL,
    latitude integer NOT NULL,
    longitude integer NOT NULL
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16512)
-- Name: provinces; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.provinces (
    id integer NOT NULL,
    name text NOT NULL,
    full_name text NOT NULL,
    latitude integer NOT NULL,
    longitude integer NOT NULL,
    display_order integer NOT NULL
);


ALTER TABLE public.provinces OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16517)
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16523)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4805 (class 0 OID 16484)
-- Dependencies: 216
-- Data for Name: event_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4806 (class 0 OID 16489)
-- Dependencies: 217
-- Data for Name: event_enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4807 (class 0 OID 16494)
-- Dependencies: 218
-- Data for Name: event_locations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4808 (class 0 OID 16502)
-- Dependencies: 219
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4809 (class 0 OID 16507)
-- Dependencies: 220
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4810 (class 0 OID 16512)
-- Dependencies: 221
-- Data for Name: provinces; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4811 (class 0 OID 16517)
-- Dependencies: 222
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4812 (class 0 OID 16523)
-- Dependencies: 223
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



-- Completed on 2024-07-05 10:04:58

--
-- PostgreSQL database dump complete
--

