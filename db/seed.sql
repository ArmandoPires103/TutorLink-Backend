--db/seed.sql
\c authdb

-- original for reference
-- INSERT INTO users (username, password_hash, email, created_at, updated_at)
-- VALUES 
-- ('demo', '$2b$10$.z68x3792U9LyBwmghfsKexstMO7i0SeNCoDmeJa7bEFPQBnZU3bK', 'demo@example.com', NOW(), NOW());

-- seed for a user who is a tutor named Jane Doe who teaches Mathematics remotely and
-- a student named John Smith who is enrolled in a Mathematics course remotely
INSERT INTO users (is_tutor, profile_pic, username, password_hash, email, name, is_enrolled, is_booked, subject, description, is_remote)
VALUES

-- TUTORS - users.id: 1,2,3
-- password 1: password
-- password 2: password2
-- password 3: password3
    (TRUE, 'profile1.jpg', 'demo_tutor', '$2b$10$.z68x3792U9LyBwmghfsKexstMO7i0SeNCoDmeJa7bEFPQBnZU3bK', 'demo_tutor@example.com', 'Jane Doe', FALSE, TRUE, 'Mathematics','Experienced tutor specializing in mathematics. Patient and dedicated to helping students achieve their goals.', TRUE),

    (TRUE, 'tutor2.jpg', 'tutor2', '$2b$10$FnW6j217LqxhnlkAYf1SAuiFeCNUGmBaQe9gLVPK9dhQk1Af/L9vy', 'tutor2@example.com', 'Jane Smith', FALSE, TRUE, 'Physics', 'Experienced tutor specializing in physics. Patient and committed to guiding students towards mastery of complex concepts and problem-solving skills.',TRUE),

    (TRUE, 'tutor3.jpg', 'tutor3', '$2b$10$KHZo4CN1vFYDs3E.W5SLzOVkKzbeu91mIHOCUYoS/Z2Q1zAClaSeG', 'tutor3@example.com', 'Alice Johnson', FALSE, TRUE, 'Chemistry', 'Experienced tutor specializing in chemistry. Patient and dedicated to assisting students in understanding the intricacies of chemical principles and fostering their problem-solving abilities.',TRUE),
-- Students - users.id 4,5,6
--password 4: password
--password 5: password5
--password 6: password6
    (FALSE, 'profile2.jpg', 'demo_student', '$2b$10$L5QiYCI6r9hddL3aRdAWTO6c7wj6aXgsjSCaDJ00kLWnwgTJ9o4TG', 'demo_student@example.com', 'John Smith', TRUE, FALSE, 'Mathematics', NULL, TRUE),

    (FALSE, 'student2.jpg', 'student2', '$2b$10$tHaKfLOvdy472Y0RvEQPue7RcGktFP8oUDKntM3jGOOMSpz4eChwe', 'student1@example.com', 'Michael Johnson', TRUE, FALSE, 'Physics', NULL, TRUE),

    (FALSE, 'student3.jpg', 'student3', '$2b$10$nZ4/GQomk6CNPXz00tODu.0YycaOxNcEVaAeCiHoeosjbXk/S0iua', 'student2@example.com', 'Emma Wilson', TRUE, FALSE, 'Chemistry', NULL, TRUE)
;

-- USER ID IS STUDENT ID
-- Inserting a request where the tutor accepts
INSERT INTO requests (user_id, tutor_id, accepted, created_at) 
VALUES 
    (4, 1, TRUE, NOW()),
    (5, 2, TRUE, NOW()),
    (6, 3, TRUE, NOW())
;

-- Inserting a review for a student
INSERT INTO student_reviews (tutor_id, subject, description, user_id, ratings) 
VALUES (1, 'Mathematics', 'Great tutor, very helpful with calculus problems.', 4, 5),
(2, 'Physics', 'Great tutor, very helpful with inertia problems.', 5, 5),
(3, 'Chemistry', 'Great tutor, very helpful with stoichiometry problems.', 6, 5)
;