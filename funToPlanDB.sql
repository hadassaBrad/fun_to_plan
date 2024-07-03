CREATE DATABASE IF NOT EXISTS funToPlanDB;
USE funToPlanDB;
DROP TABLE IF EXISTS basket;
DROP TABLE IF EXISTS tripRoute;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS passwords;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS gallery;
DROP TABLE IF EXISTS sites;
DROP TABLE IF EXISTS difficulty;
DROP TABLE IF EXISTS area;
DROP TABLE IF EXISTS age;

CREATE TABLE passwords (
    id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(225) NOT NULL,
    loginAttempts INT NOT NULL,
    lastLogin DATETIME,
    lastFailedLogin DATETIME,
    account_status BOOL NOT NULL
);

CREATE TABLE permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(225) NOT NULL
);

CREATE TABLE addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(225) NOT NULL,
    street VARCHAR(225) NOT NULL
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    user_name VARCHAR(225) NOT NULL,
    password_id INT NOT NULL,
    email VARCHAR(225) NOT NULL,
    address_id INT,
    phone_number INT,
    FOREIGN KEY (address_id) REFERENCES addresses(id),
    FOREIGN KEY (role_id) REFERENCES permissions(id),
    FOREIGN KEY (password_id) REFERENCES passwords(id)
);

CREATE TABLE gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(225) NOT NULL,
    name VARCHAR(225) NOT NULL
);

CREATE TABLE difficulty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    level VARCHAR(225) NOT NULL
);

CREATE TABLE area (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_area VARCHAR(225) NOT NULL
);

CREATE TABLE age (
    id INT AUTO_INCREMENT PRIMARY KEY,
    age_range VARCHAR(225) NOT NULL
);

CREATE TABLE sites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_name VARCHAR(225) NOT NULL,
    url VARCHAR(225) NOT NULL,
    description VARCHAR(225),
    popularity INT NOT NULL,
    id_difficulty INT NOT NULL,
    id_area INT NOT NULL,
    price INT NOT NULL,
    id_age INT NOT NULL,
    opening_hour TIME,
    closing_hour TIME,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    track_length INT,
    FOREIGN KEY (id_difficulty) REFERENCES difficulty(id),
    FOREIGN KEY (id_area) REFERENCES area(id),
    FOREIGN KEY (id_age) REFERENCES age(id)
);

create table basket(
    id INT AUTO_INCREMENT PRIMARY KEY,
user_id int not null,
site_id int not null,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (site_id) REFERENCES sites(id)
);

CREATE TABLE tripRoute (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    route JSON NOT NULL,
    trip_date DATE,
    guide_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (guide_id) REFERENCES users(id)
);

INSERT INTO gallery (url, name) VALUES
('https://lh5.googleusercontent.com/p/AF1QipONQVvtMTudYatxLHXQVPhnvYBd3lEkH9Pzf6f7=w101-h72-n-k-no-nu', 'הר הארבל'),
('https://lh5.googleusercontent.com/p/AF1QipN6nbi6s4hbo2E_qdN8R7fOKI3XznHbYyzN3L-O=w101-h72-n-k-no-nu', 'הר הארבל'),
('https://lh5.googleusercontent.com/p/AF1QipP2GMnGVuDKABzniHLJE46fZWtvjfUWTcPLFJW4=w101-h72-n-k-no-nu', 'הר הארבל'),
('https://lh5.googleusercontent.com/p/AF1QipNKbVnrm6PciHeACWq8-WdCvzlFPNMxh-BRmnyL=w101-h72-n-k-no-nu', 'הר הארבל'),
('https://lh3.googleusercontent.com/p/AF1QipNxUCY_2h7J8gQu4CTxJOdDdyE-gHvUmX13zP-_=s680-w680-h510', 'הר הארבל'),
('https://lh5.googleusercontent.com/p/AF1QipOtyIJvkzkbygayQP_Z8XrKdV9jAHiaFiCo0rAZ=w540-h312-n-k-no', 'הר הארבל'),
('https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcThU1L3CY4LI_LjCRPg0W6_liG9NK9S0UUbnsnziYBJOEH78lPxSbvF5UzCgR1SI91i5KGJt14CET04C2T92QJUdaQkwDpNxn-L5kDU1M8', 'גן לאומי מצדה'),
('https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSnygI9VXGU4UBab6pOB39J6isEkM05BSutzkOd0IB1u5vqReOYwLVHKnnTdlh6Wiru-GOVqngdX_38ngDAfDNjTGpsFyjBqgE8nQHA_A', 'גן לאומי מצדה'),
('https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTb-PEd0xcxwmuzQv0vN4FjFSBStnl9DC7DcbcO5DQ3-nstD20nDHWyK_GVFmXxmVVQIA9QYh9UFt6j19yOkRf2--_uMeAnN8ctXSTtfQ', 'גן לאומי מצדה'),
('https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcThU1L3CY4LI_LjCRPg0W6_liG9NK9S0UUbnsnziYBJOEH78lPxSbvF5UzCgR1SI91i5KGJt14CET04C2T92QJUdaQkwDpNxn-L5kDU1M8', 'גן לאומי מצדה'),
('https://lh3.googleusercontent.com/p/AF1QipOMzw13wDhhN2VhjGJPKeGt0g3VMHmGh1avtB4C=s680-w680-h510', 'גן לאומי מצדה'),
('https://lh3.googleusercontent.com/p/AF1QipOM04Pml4i7M9aHj-8UwuhEZg-Sf1I9saYA22Xt=s680-w680-h510', 'גן לאומי מצדה'),
('https://lh3.googleusercontent.com/p/AF1QipOOnPXW8mXXCU3twH63TLQsku-lXcz3HuhFtbye=s680-w680-h510', 'גן לאומי מצדה'),
('https://lh3.googleusercontent.com/p/AF1QipN2g7xzIsB-3DW1HdcG7O53lg_FhzDhravXDmrQ=s680-w680-h510', 'גן לאומי מצדה'),
('https://lh3.googleusercontent.com/p/AF1QipPiu_OwXJIByRqlNQxphXTKcIfEa9Pm_fqzs9n2=s680-w680-h510', 'גן לאומי מצדה'),
('https://lh3.googleusercontent.com/p/AF1QipM29Hy1Fj44HUDj5PvXjBbAyC3oqG-BlAyryeGc=s680-w680-h510', 'גן לאומי מצדה'),
('https://lh5.googleusercontent.com/p/AF1QipPl1kl0F2hkFBuigpJL8wqMMtJ37ocLSCzlPE8=w141-h235-n-k-no-nu', 'הר סדום'),
('https://lh5.googleusercontent.com/p/AF1QipPUDdgxjh6-wlSIxXrZOnFHB5hfscPz2dUql2iP=w141-h118-n-k-no-nu', 'הר סדום'),
('https://lh3.googleusercontent.com/p/AF1QipNIF_uZBcAcVo-DQ3oC8CPEIYoLzRTROQ19RgqB=s680-w680-h510', 'הר סדום'),
('https://lh5.googleusercontent.com/p/AF1QipN0wf_Vh2m71wvMpfbOXNr8RyBROz3DphCYLfKF=w141-h101-n-k-no-nu', 'הר סדום'),
('https://lh3.googleusercontent.com/p/AF1QipMWgDNIuV1U0hJRWOo85jhPlobxGiX1bEPj1AVZ=s680-w680-h510', 'הר סדום'),
('https://lh5.googleusercontent.com/p/AF1QipN6IJr_4Y8iBFFQUgrkCgieVE3wwYCgGGw5DKfo=w141-h101-n-k-no-nu', 'הר סדום'),
('https://lh5.googleusercontent.com/p/AF1QipPfh3yqD7bPNkryGTsecIS7i3lAmpxWGNkfcgoU=w540-h312-n-k-no', 'הר סדום'),
('https://lh5.googleusercontent.com/p/AF1QipNmUj7nthGC00CBA74fHSyaOYYJYem69MYE35-g=w540-h312-n-k-no', 'הר סדום'),
('https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRk_RikI6jpCnLj56pWuIh83ePR9bgA4Vakak1DHfHW3rewQq23-eT2HQlhXGVHrCemkUbKo7W9bVBuWSrGXTw8u7smelldB0pAj9eO0g', 'הר סדום'),
('https://lh5.googleusercontent.com/p/AF1QipPfh3yqD7bPNkryGTsecIS7i3lAmpxWGNkfcgoU=w540-h312-n-k-no', 'הר סדום'),
('https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcT2tw_U9XKg_gmn17dNyW_rQLFoSRTIQOLQZG8_RT5cwAKixDLbeaSwtbcwNZqJ8FjdmhiNu7hpT_GJllejsd10APK5CNM4ZYobKRThMA', 'הר סדום'),
('https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSfBgAQux71ZopennmayW1YDA2UKnaCW1X1ruZsBDa2Vna4AbzjEWM1e11RRu1ZkXmTVV7fmi0NRQ801VvbckMTaYjIlvbF8mh4IvbYxQ', 'נחל עוג');


INSERT INTO permissions(role) VALUES
('user'),
('admin'),
('guide'),
('guideWating');
INSERT INTO  difficulty(level) VALUES 
('Easy '),
('Moderate '),
('Challenging '),
('Difficult '),
('Very Difficult');
INSERT INTO  area(name_area) VALUES
('north'),
('South'),
(' East'),
(' West');
INSERT INTO  age(age_range) VALUES
('children'),
('teen ager'),
('adults'),
('families');
-- הוספת נתונים לטבלה עם 20 אתרים ועם נתונים עבור שדות id_difficulty, id_area, id_age וקישורים תקינים לתמונות
INSERT INTO sites (
    site_name, url, description, popularity, id_difficulty, id_area, price, id_age, opening_hour, closing_hour, latitude, longitude, track_length
) VALUES
('מצדה', 'https://www.pexels.com/photo/aerial-photography-of-ancient-city-1128545/', 'מבצר עתיק במחוז הדרומי של ישראל.', 85, 1, 3, 50, 1, '08:00:00', '17:00:00', 31.3156, 35.3533, 700),
('שמורת עין גדי', 'https://www.pexels.com/photo/nature-green-tree-outdoors-104827/', 'שמורת טבע הממוקמת מערבית לים המלח.', 90, 2, 3, 20, 2, '08:00:00', '16:00:00', 31.4542, 35.3882, 4000),
('פארק תימנע', 'https://www.pexels.com/photo/brown-rock-formation-1167029/', 'פארק מדברי גדול במדבר הנגב.', 80, 1, 2, 30, 3, '08:00:00', '17:00:00', 29.7873, 34.9766, 10000),
('הר חרמון', 'https://www.pexels.com/photo/snow-capped-mountain-under-clear-blue-sky-1462021/', 'הר הגבוה ביותר בישראל, הממוקם בצפון.', 95, 3, 1, 75, 3, '08:00:00', '16:00:00', 33.4167, 35.8500, 2000),
('שמורת בניאס', 'https://www.pexels.com/photo/waterfall-against-trees-257360/', 'מעיין טבעי בגולן.', 85, 1, 1, 40, 2, '08:00:00', '16:00:00', 33.2481, 35.6902, 3500),
('מכתש רמון', 'https://www.pexels.com/photo/canyon-under-blue-sky-1904232/', 'תופעה גיאולוגית במדבר הנגב.', 70, 2, 2, 20, 1, '08:00:00', '17:00:00', 30.6097, 34.8013, 4500),
('שמורת יהודיה', 'https://www.pexels.com/photo/green-trees-during-daytime-6748807/', 'שמורת טבע במרכז הגולן.', 80, 1, 1, 25, 2, '08:00:00', '16:00:00', 32.9667, 35.6833, 6000),
('פארק הר כרמל הלאומי', 'https://www.pexels.com/photo/trees-near-mountain-3720670/', 'פארק לאומי בצפון ישראל.', 85, 1, 1, 30, 2, '08:00:00', '17:00:00', 32.7447, 35.0395, 3000),
('פארק ארבל הלאומי', 'https://www.pexels.com/photo/landscape-photo-of-mountains-7893967/', 'פארק לאומי ושמורה טבעית בצפון ישראל.', 75, 2, 1, 15, 3, '08:00:00', '17:00:00', 32.8333, 35.5000, 2500),
('שמורת תל דן', 'https://www.pexels.com/photo/footpath-by-trees-in-forest-256481/', 'שמורת טבע ואתר ארכיאולוגי בצפון ישראל.', 85, 1, 1, 30, 1, '08:00:00', '17:00:00', 33.2490, 35.6534, 3500),
('ים כנרת', 'https://www.pexels.com/photo/landscape-photography-of-body-of-water-7384869/', 'האגם הגדול ביותר בישראל.', 90, 1, 3, 40, 1, '08:00:00', '18:00:00', 32.8704, 35.6177, 0),
('פארק חוף אחזיב הלאומי', 'https://www.pexels.com/photo/beach-shoreline-during-golden-hour-3286950/', 'פארק לאומי בחוף הצפוני של ישראל.', 80, 2, 1, 25, 2, '08:00:00', '17:00:00', 33.0247, 35.1024, 0),
('שמורת עין עבדת', 'https://www.pexels.com/photo/photography-of-canyon-1324624/', 'נחל גדול במדבר הנגב.', 75, 3, 2, 30, 2, '08:00:00', '16:00:00', 30.7833, 34.7333, 0),
('קיסריה המריטימה', 'https://www.pexels.com/photo/landscape-photography-of-sea-2486168/', 'עיר עתיקה על חופי הים התיכון של ישראל.', 85, 2, 1, 35, 1, '08:00:00', '18:00:00', 32.5000, 34.8958, 0),
('העיר העתיקה בירושלים', 'https://www.pexels.com/photo/city-with-lights-at-night-1227985/', 'הלב ההיסטורי של ירושלים.', 95, 3, 1, 50, 1, '08:00:00', '19:00:00', 31.7780, 35.2355, 0),
('ים המלח', 'https://www.pexels.com/photo/landscape-photography-of-desert-6755442/', 'הנקודה הנמוכה ביותר בכדור הארץ, מפורסם בשל מי הים העשירות במלח.', 90, 3, 3, 60, 2, '08:00:00', '18:00:00', 31.4965, 35.4945, 0),
('עכו העתיקה', 'https://www.pexels.com/photo/cityscape-photography-of-a-old-city-3573381/', 'עיר היסטורית על חופי צפון ישראל.', 80, 1, 1, 30,)

insert into passwords(password, loginAttempts, lastLogin, account_status) values
('$2b$10$T8orXcY8jiNlOqImWUDp6uroW/u8P5IOJa0Mv/8dFMG9GzaBSJyja',1, '2024-06-15 21:35:39', 1);
insert into users(role_id, user_name, password_id, email) values
(2, 'admin', 1, 'admin@gmail.com');

  SELECT * FROM users  INNER JOIN passwords ON users.password_id = passwords.id INNER JOIN permissions ON users.role_id = permissions.id WHERE users.email = 'hadassa26162@gmail.com';
