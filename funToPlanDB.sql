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
    url VARCHAR(1024) NOT NULL,
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
('https://lh5.googleusercontent.com/p/AF1QipONQVvtMTudYatxLHXQVPhnvYBd3lEkH9Pzf6f7=w101-h72-n-k-no-nu', 'Mount Harbel'),
('https://lh5.googleusercontent.com/p/AF1QipN6nbi6s4hbo2E_qdN8R7fOKI3XznHbYyzN3L-O=w101-h72-n-k-no-nu', 'Mount Harbel'),
('https://lh5.googleusercontent.com/p/AF1QipP2GMnGVuDKABzniHLJE46fZWtvjfUWTcPLFJW4=w101-h72-n-k-no-nu', 'Mount Harbel'),
('https://lh5.googleusercontent.com/p/AF1QipNKbVnrm6PciHeACWq8-WdCvzlFPNMxh-BRmnyL=w101-h72-n-k-no-nu', 'Mount Harbel'),
('https://lh3.googleusercontent.com/p/AF1QipNxUCY_2h7J8gQu4CTxJOdDdyE-gHvUmX13zP-_=s680-w680-h510', 'Mount Harbel'),
('https://lh5.googleusercontent.com/p/AF1QipOtyIJvkzkbygayQP_Z8XrKdV9jAHiaFiCo0rAZ=w540-h312-n-k-no', 'Mount Harbel'),
('https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcThU1L3CY4LI_LjCRPg0W6_liG9NK9S0UUbnsnziYBJOEH78lPxSbvF5UzCgR1SI91i5KGJt14CET04C2T92QJUdaQkwDpNxn-L5kDU1M8', 'park leumi massada'),
('https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSnygI9VXGU4UBab6pOB39J6isEkM05BSutzkOd0IB1u5vqReOYwLVHKnnTdlh6Wiru-GOVqngdX_38ngDAfDNjTGpsFyjBqgE8nQHA_A', 'park leumi massada'),
('https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTb-PEd0xcxwmuzQv0vN4FjFSBStnl9DC7DcbcO5DQ3-nstD20nDHWyK_GVFmXxmVVQIA9QYh9UFt6j19yOkRf2--_uMeAnN8ctXSTtfQ', 'park leumi massada'),
('https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcThU1L3CY4LI_LjCRPg0W6_liG9NK9S0UUbnsnziYBJOEH78lPxSbvF5UzCgR1SI91i5KGJt14CET04C2T92QJUdaQkwDpNxn-L5kDU1M8', 'park leumi massada'),
('https://lh3.googleusercontent.com/p/AF1QipOMzw13wDhhN2VhjGJPKeGt0g3VMHmGh1avtB4C=s680-w680-h510', 'park leumi massada'),
('https://lh3.googleusercontent.com/p/AF1QipOM04Pml4i7M9aHj-8UwuhEZg-Sf1I9saYA22Xt=s680-w680-h510', 'park leumi massada'),
('https://lh3.googleusercontent.com/p/AF1QipOOnPXW8mXXCU3twH63TLQsku-lXcz3HuhFtbye=s680-w680-h510', 'park leumi massada'),
('https://lh3.googleusercontent.com/p/AF1QipN2g7xzIsB-3DW1HdcG7O53lg_FhzDhravXDmrQ=s680-w680-h510', 'park leumi massada'),
('https://lh3.googleusercontent.com/p/AF1QipPiu_OwXJIByRqlNQxphXTKcIfEa9Pm_fqzs9n2=s680-w680-h510', 'park leumi massada'),
('https://lh3.googleusercontent.com/p/AF1QipM29Hy1Fj44HUDj5PvXjBbAyC3oqG-BlAyryeGc=s680-w680-h510', 'park leumi massada'),
('https://lh5.googleusercontent.com/p/AF1QipPl1kl0F2hkFBuigpJL8wqMMtJ37ocLSCzlPE8=w141-h235-n-k-no-nu', 'har sdom'),
('https://lh5.googleusercontent.com/p/AF1QipPUDdgxjh6-wlSIxXrZOnFHB5hfscPz2dUql2iP=w141-h118-n-k-no-nu', 'har sdom'),
('https://lh3.googleusercontent.com/p/AF1QipNIF_uZBcAcVo-DQ3oC8CPEIYoLzRTROQ19RgqB=s680-w680-h510', 'har sdom'),
('https://lh5.googleusercontent.com/p/AF1QipN0wf_Vh2m71wvMpfbOXNr8RyBROz3DphCYLfKF=w141-h101-n-k-no-nu', 'har sdom'),
('https://lh3.googleusercontent.com/p/AF1QipMWgDNIuV1U0hJRWOo85jhPlobxGiX1bEPj1AVZ=s680-w680-h510', 'har sdom'),
('https://lh5.googleusercontent.com/p/AF1QipN6IJr_4Y8iBFFQUgrkCgieVE3wwYCgGGw5DKfo=w141-h101-n-k-no-nu', 'har sdom'),
('https://lh5.googleusercontent.com/p/AF1QipPfh3yqD7bPNkryGTsecIS7i3lAmpxWGNkfcgoU=w540-h312-n-k-no', 'har sdom'),
('https://lh5.googleusercontent.com/p/AF1QipNmUj7nthGC00CBA74fHSyaOYYJYem69MYE35-g=w540-h312-n-k-no', 'har sdom'),
('https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRk_RikI6jpCnLj56pWuIh83ePR9bgA4Vakak1DHfHW3rewQq23-eT2HQlhXGVHrCemkUbKo7W9bVBuWSrGXTw8u7smelldB0pAj9eO0g', 'har sdom'),
('https://lh5.googleusercontent.com/p/AF1QipPfh3yqD7bPNkryGTsecIS7i3lAmpxWGNkfcgoU=w540-h312-n-k-no', 'har sdom'),
('https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcT2tw_U9XKg_gmn17dNyW_rQLFoSRTIQOLQZG8_RT5cwAKixDLbeaSwtbcwNZqJ8FjdmhiNu7hpT_GJllejsd10APK5CNM4ZYobKRThMA', 'har sdom'),
('https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSfBgAQux71ZopennmayW1YDA2UKnaCW1X1ruZsBDa2Vna4AbzjEWM1e11RRu1ZkXmTVV7fmi0NRQ801VvbckMTaYjIlvbF8mh4IvbYxQ', 'nachal og');


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
INSERT INTO sites (
    site_name, url, description, popularity, id_difficulty, id_area, price, id_age, opening_hour, closing_hour, latitude, longitude, track_length
) VALUES
('Masada', 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRFmF_eLFHchAMgSnmOS7ml3lPFSk_blbwywDwuCTx8y0Vlv61wPS1jAFVwJ6pE7cyyQsTIHiopHXnT6TaIgBzaQ-3bnbmWAydkHjQ0cg', 'Ancient fortress in the southern district of Israel.', 85, 1, 3, 50, 1, '08:00:00', '17:00:00', 31.3156, 35.3533, 700),
('Ein Gedi Nature Reserve', 'https://reefdivinggroup.co.il/wp-content/uploads/2022/12/shutterstock_1770727010.jpg', 'Nature reserve located west of the Dead Sea.', 90, 2, 3, 20, 2, '08:00:00', '16:00:00', 31.4542, 35.3882, 4000),
('Timna Park', 'https://baliletayel.co.il/wp-content/uploads/2020/10/DSC00713-1024x683.jpg', 'Large desert park in the Negev Desert.', 80, 1, 2, 30, 3, '08:00:00', '17:00:00', 29.7873, 34.9766, 10000),
('Mount Hermon', 'https://www.kukutrip.co.il/wp-content/uploads/2022/03/274353783_10161789928178761_3163234694195470524_n_10161789922173761_resize_67.jpg', 'Highest mountain in Israel, located in the north.', 95, 3, 1, 75, 3, '08:00:00', '16:00:00', 33.4167, 35.8500, 2000),
('Banias Nature Reserve', 'https://green-lady.co.il/wp-content/uploads/2020/10/Banias35.jpg', 'Natural spring in the Golan Heights.', 85, 1, 1, 40, 2, '08:00:00', '16:00:00', 33.2481, 35.6902, 3500),
('Makhtesh Ramon', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/MakhteshRamonMar262022_01.jpg/1200px-MakhteshRamonMar262022_01.jpg', 'Geological phenomenon in the Negev Desert.', 70, 2, 2, 20, 1, '08:00:00', '17:00:00', 30.6097, 34.8013, 4500),
('Yehudia Nature Reserve', 'https://static.parks.org.il/wp-content/uploads/2017/09/shmurat-teva-yaar-yeudia-jorji-norkin-compressed.jpg', 'Nature reserve in the central Golan Heights.', 80, 1, 1, 25, 2, '08:00:00', '16:00:00', 32.9667, 35.6833, 6000),
('Carmel National Park', 'https://static.parks.org.il/wp-content/uploads/2017/09/maad-carmel-archion.jpg', 'National park in northern Israel.', 85, 1, 1, 30, 2, '08:00:00', '17:00:00', 32.7447, 35.0395, 3000),
('Arbel National Park', 'https://static.parks.org.il/wp-content/uploads/2017/10/arbel_2012_1-e1512900771516.jpg', 'National park and nature reserve in northern Israel.', 75, 2, 1, 15, 3, '08:00:00', '17:00:00', 32.8333, 35.5000, 2500),
('Tel Dan Nature Reserve', 'https://static.parks.org.il/wp-content/uploads/2017/08/DSC_7577.jpg', 'Nature reserve and archaeological site in northern Israel.', 85, 1, 1, 30, 1, '08:00:00', '17:00:00', 33.2490, 35.6534, 3500),
('Sea of Galilee', 'https://psagot.ort.org.il/wp-content/uploads/thumbs/WhatsApp-Image-2022-01-20-at-13.27.21-3fbg2dnnqf24f859ghhdkw.jpeg', 'The largest lake in Israel.', 90, 1, 3, 40, 1, '08:00:00', '18:00:00', 32.8704, 35.6177, 0),
('Achziv National Park', 'https://familytrips.co.il/wp-content/uploads/elementor/thumbs/IMG-20210516-WA0047-qa7uxom8xsvgdhydz76gx2n016jdocw73bbrti3vds.jpg', 'National park on the northern coast of Israel.', 80, 2, 1, 25, 2, '08:00:00', '17:00:00', 33.0247, 35.1024, 0),
('Ein Avdat Nature Reserve', 'https://static.parks.org.il/wp-content/uploads/2017/09/eynot-zukim-doron-nisim-3.jpg', 'Large canyon in the Negev Desert.', 75, 3, 2, 30, 2, '08:00:00', '16:00:00', 30.7833, 34.7333, 0),
('Caesarea', 'https://cdn.goodlifetv.co.il/wp-content/uploads/2021/08/09190333/shutterstock_491053702-640x405-1.jpg', 'Ancient city on the Mediterranean coast of Israel.', 85, 2, 1, 35, 1, '08:00:00', '18:00:00', 32.5000, 34.8958, 0),
('Old City of Jerusalem', 'https://cdn.exiteme.com/exitetogo/www.more-tourism.co.il/gallery/B4BE3D77-8D64-E1C5-D16A-7275FCE27852.jpg', 'The historic heart of Jerusalem.', 95, 3, 1, 50, 1, '08:00:00', '19:00:00', 31.7780, 35.2355, 0),
('Dead Sea', 'https://www.psoriasis.org.il/wp-content/uploads/2017/03/%D7%99%D7%9D-%D7%94%D7%9E%D7%9C%D7%97-%D7%A8%D7%A7%D7%A2-53585846_l.jpg', 'The lowest point on Earth, famous for its rich salt content.', 90, 3, 3, 60, 2, '08:00:00', '18:00:00', 31.4965, 35.4945, 0),
('Old Acre', 'https://cdn.exiteme.com/exitetogo/www.oldakko.co.il/userfiles/images/%D7%98%D7%99%D7%99%D7%9C%D7%AA_%D7%94%D7%97%D7%95%D7%9E%D7%95%D7%AA.jpg', 'Historical city on the northern coast of Israel.', 80, 1, 1, 30, 1, '08:00:00', '18:00:00', 32.92228588536576, 35.07148851831015, 0);

insert into passwords(password, loginAttempts, lastLogin, account_status) values
('$2b$10$T8orXcY8jiNlOqImWUDp6uroW/u8P5IOJa0Mv/8dFMG9GzaBSJyja',1, '2024-06-15 21:35:39', 1);

insert into passwords(password, loginAttempts, lastLogin, account_status) values
('$2b$10$T8orXcY8jiNlOqImWUDp6uroW/u8P5IOJa0Mv/8dFMG9GzaBSJyja',1, '2024-06-15 21:35:39', 1);

insert into passwords(password, loginAttempts, lastLogin, account_status) values
('$2b$10$T8orXcY8jiNlOqImWUDp6uroW/u8P5IOJa0Mv/8dFMG9GzaBSJyja',1, '2024-06-15 21:35:39', 1);
insert into users(role_id, user_name, password_id, email) values
(2, 'admin', 1, 'admin@gmail.com');
insert into users(role_id, user_name, password_id, email) values
(3, 'guide', 2, 'guide@gmail.com');

 insert into users(role_id, user_name, password_id, email) values
(1, 'The Traveler', 3, 't@gmail.com');
