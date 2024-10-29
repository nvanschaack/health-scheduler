INSERT INTO user (role, firstName, lastName, age, username, password)
VALUES
    ('patient', 'John', 'Doe', 30, 'johndoe', 'hashed_password_1'),
    ('patient', 'Jane', 'Smith', 25, 'janesmith', 'hashed_password_2'),
    ('patient', 'Michael', 'Johnson', 35, 'michaeljohnson', 'hashed_password_3'),
    ('patient', 'Emily', 'Brown', 28, 'emilybrown', 'hashed_password_4'),
    ('patient', 'David', 'Davis', 40, 'daviddavis', 'hashed_password_5');

INSERT INTO user (role, firstName, lastName, age, username, password)
VALUES
    ('provider', 'Dr. Alice', 'Johnson', 45, 'dralicejohnson', 'hashed_password_6'),
    ('provider', 'Dr. Bob', 'Smith', 50, 'drbobsmith', 'hashed_password_7'),
    ('provider', 'Dr. Carol', 'Lee', 38, 'drcarlolee', 'hashed_password_8'),
    ('provider', 'Dr. David', 'Kim', 42, 'drdavidkim', 'hashed_password_9'),
    ('provider', 'Dr. Emily', 'Chen', 35, 'dreemilychen', 'hashed_password_10');

INSERT INTO user (role, firstName, lastName, age, username, password)
VALUES
    ('admin', 'Admin', 'User', 30, 'admin', 'hashed_admin_password');