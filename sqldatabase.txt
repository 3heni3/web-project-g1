create DATABASE group1;

create table group1.contact_us (
    phone varchar(32),
    email varchar(255),
    contact_name varchar(255),
    contact_description varchar(255)
);

create table group1.products (
	product_id int NOT NULL auto_increment,
    product_name varchar(255),
    price int,
    image_url varchar(255) not null,
    num_bought int DEFAULT 0,
    PRIMARY KEY (product_id)
);

insert into group1.products (product_name, price, image_url)
VALUES 
("סיליקון פרפיום", 100, "https://drive.google.com/uc?export=view&id=1VbAYDVAE4_p2YoMxNz0KTf0_I34J6cb0"),
("קרם גולד קרטין", 120, "https://drive.google.com/uc?export=view&id=10dD8RzghmPst0Xh6f6xZNl3tCHvKh4bP"),
("גולד קרטין", 200, "https://drive.google.com/uc?export=view&id=1LSXMYeK_qSAqjMrxjInniGB2v1ZaCzd7"),
("שמן לזקן ולשפם", 50, "https://drive.google.com/uc?export=view&id=1nlrhHWZA0cuAdwcCUKdVw6sxM-FYQ5nD"),
("ווקס", 100, "https://drive.google.com/uc?export=view&id=10_a2Uf-Tvdym2zTO3b4MpPwQynZk0o5u"),
("ווקס על בסיס מים", 180, "https://drive.google.com/uc?export=view&id=1ljLSMKArWDGSg7aj5Mpx-_pj18brS3gX"),
("אקווה מקס", 90, "https://drive.google.com/uc?export=view&id=1ezmMt7hX-JVvzeZWkhYdXyV0UfRzRCa0"),
("ג׳ל חזק במיוחד", 80, "https://drive.google.com/uc?export=view&id=1jIR_re9RdAZ2eosQhG7a7d6BvjDNBoV3"),
("מסיכת שמן ארגן", 150, "https://drive.google.com/uc?export=view&id=1ez5mBKWymtJsarsqsP8UqPGC5eZ8PkTX"),
("ספריי סיליקון", 129, "https://drive.google.com/uc?export=view&id=1TYBaM-nHDZP7WGJiq59QuqAzetV4BVUQ"),
("ספריי ארגן", 85, "https://drive.google.com/uc?export=view&id=1eEQaLJ9_6FCEkLu5Wav_efUzQgU4qmu5"),
("גלייז לשיער", 60, "https://drive.google.com/uc?export=view&id=15NBfln_y8KZUCgN9jfFgvXdJJ0aSRdaA"),
("מסכת שמן ארגן", 70, "https://drive.google.com/uc?export=view&id=1kTUEnstPJoEOQbQGGdQee5ch0mOTos77"),
("קרם קרטין", 110, "https://drive.google.com/uc?export=view&id=1Hsvku4RidNMw-OmBMM0yLmwMOiL7SiIj"),
("קרם שיער", 55, "https://drive.google.com/uc?export=view&id=1GQaPh6tSkibC8I0JsDa2cv2kXAgR3Ke7");

create table group1.tips(
	tip_id int auto_increment NOT NULL,
    tip varchar(255) NOT NULL,
    PRIMARY KEY (tip_id)
);

INSERT INTO group1.tips (tip) values
("בחרו את השמפו המתאים לסוג שיערכם"),
("אל תייבשו את שיערכם בעזרת מגבת"),
("השתמשו נכון בשמפו"),
("סרקו לעיתים רחוקות את שיערכם"),
("חבשו כובע להגנה על שיערכם מן השמש"),
("מרחו קרם לחות"),
("שטפו בטמפרטורה נכונה"),
("השתמשו לעיצים רחוקות במוצרים לעיצוב השיער"),
("שמרו על תזונה נכונה"),
("שטפו את מברשת השיער שלכם ושלכן"),
("הקפידו על גזירת קצוות השיער");

create table group1.recommendations(
	recommendation_id int auto_increment NOT NULL,
    recommendation varchar(255) NOT NULL,
    created_date datetime default CURRENT_TIMESTAMP(),
    PRIMARY KEY (recommendation_id)
);

insert into group1.recommendations (recommendation) values
('"קיבל את פניי בסבר פנים יפות, תספורת ראשונה מבלי להכיר את הראש יצא מצוין. אני מרוצה מאוד. ספר מקצועי ביותר. בהחלט אחזור." חגית אברגיל'),
('"ספי עיני ספר מדויק סימפטי צוחק איתך והכי חשבו מוציא אותך מיליון דולר" רוני דואני'),
('"ספר כשרוני וקשוב. מספרה שמקבלת אותי במאור פנים. כיף לבוא" דנה דהן'),
('"ספי תותח! קיבל אותי מהרגע להרגע והיה סופר מקצועי ושירותי, נהנתי מכל רגע וגם יצאה תספורת מהממת." אפי'),
('"כיף להגיע למקום שמקבלים אותך בחום ואהבה איכות ושירות מס 1 שזה קודם כל ספי מדהים ועושה את עבודתו בצורה מושלמת אחזור עוד הרבה אליו " דני רחמים'),
('"ספי הוא בחור מקסים ומקצועי, הגעתי אליו בעקבות המלצות באינטרנט ובהחלט אחזור אליו שוב. נשארתי מאוד מרוצה." אתי רווח');

create table group1.before_after_photos(
	id int not null auto_increment,
    image_url varchar(255),
    PRIMARY KEY (id)
);

insert into group1.before_after_photos (image_url) values
("https://drive.google.com/uc?export=view&id=1fmEnxfHy8FF_zYrnN80Ow3T30QCq9d7B"),
("https://drive.google.com/uc?export=view&id=1CoTISk8eKnUH7FjrejLwtnVkgeaaivKq"),
("https://drive.google.com/uc?export=view&id=11pUc6abgPOfQujZeUKJWhS4Js5SE6wCe"),
("https://drive.google.com/uc?export=view&id=1JKSHeFil84uJEiT7yXMgRFlFly_2o0n-"),
("https://drive.google.com/uc?export=view&id=1rfa_uzVkkqJrPugJzf9bmZRdZneVZ2hn");

create table group1.example_photos(
	id int not null auto_increment,
    image_url varchar(255),
    primary key (id)
);

insert into group1.example_photos (image_url) values
("https://drive.google.com/uc?export=view&id=1ebR8Bp_OIlt1ouyiruzjvskyXTOR5Ut7"),
("https://drive.google.com/uc?export=view&id=14xKFOwRtnU8O6B_TuLU-n1ZdOz5axk5w"),
("https://drive.google.com/uc?export=view&id=1ariX7ehOqg7PYeOiH6ZHWbjB3E75-sKs"),
("https://drive.google.com/uc?export=view&id=1YDvVHcPMYNTq2ypHceyohAetV_UKvQAn"),
("https://drive.google.com/uc?export=view&id=1oufuAi_pUjeImQcuQ12wOhuyKZWvV2rX");

create table group1.workers(
	id int not null auto_increment,
    worker_name varchar(255),
    image_url varchar(255),
    worker_description varchar(255),
    primary key (id)
);

insert into group1.workers (image_url, worker_name, worker_description) values
("https://drive.google.com/uc?export=view&id=1FS97oT5C3BoZzXYbGBg5V6_m3WdAWYy3", "ספי", "ספי - הספר הראשי של המספרה"),
("https://drive.google.com/uc?export=view&id=1QLUGXE4rUnz6vTkFfZrTtoI8xppQTXw4", "דני", "דני - ספר משנה במספרה"),
("https://drive.google.com/uc?export=view&id=1N7Msl1tlOrhH64t9nqPeGm_4WDqDA5jm", "מיקה", "מיקה - ספרית משנה במספרה"),
("https://drive.google.com/uc?export=view&id=1cKER7v9-yshSWxMEdQ4UmamEUV3FBN1d", "שקד", "שקד - אחותו של ספי");
create table group1.users(
    email varchar(255) not null,
    `password` varchar(255) not null,
    first_name varchar(128) not null,
	last_name varchar(128) not null,
    PRIMARY KEY (email)
);

create table group1.cart_data(
	id int not null auto_increment,
	user_email varchar(255) not null,
    product_id int,
    closed_session_date datetime default NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_email) REFERENCES users(email) ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON UPDATE CASCADE
);

create table group1.transactions(
	cc_number varchar(55),
    user_id int,
    cvv int,
    total int,
    expDate varchar(55)
);

create table group1.schedule(
    schedule_time datetime,
    phone varchar(25),
    schedule_type varchar(25),
    email varchar(55)
);

