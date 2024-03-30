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

-- TUTORS - users.id: 1 - 12
-- password 1: password
-- password 2: password2
-- password 3: password3
-- 4 - 12 Password: password
    (TRUE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711469497/Data%20seed%20class/tutor1_cxrea6.webp', 'demo_tutor', '$2b$10$.z68x3792U9LyBwmghfsKexstMO7i0SeNCoDmeJa7bEFPQBnZU3bK', 'demo_tutor@example.com', 'Jane Doe', FALSE, TRUE, 'Mathematics','Experienced tutor specializing in mathematics. Patient and dedicated to helping students achieve their goals.', TRUE),

    (TRUE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711469507/Data%20seed%20class/tutor_2_fruod4.jpg', 'tutor2', '$2b$10$FnW6j217LqxhnlkAYf1SAuiFeCNUGmBaQe9gLVPK9dhQk1Af/L9vy', 'tutor2@example.com', 'Jane Smith', FALSE, TRUE, 'Physics', 'Experienced tutor specializing in physics. Patient and committed to guiding students towards mastery of complex concepts and problem-solving skills.',TRUE),

    (TRUE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711469511/Data%20seed%20class/tutor_3_nditky.jpg', 'tutor3', '$2b$10$KHZo4CN1vFYDs3E.W5SLzOVkKzbeu91mIHOCUYoS/Z2Q1zAClaSeG', 'tutor3@example.com', 'Alice Johnson', FALSE, TRUE, 'Chemistry', 'Experienced tutor: Patient and dedicated to assisting students in understanding the intricacies of chemical principles and fostering their problem-solving abilities.',TRUE),
    
    (TRUE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711678887/istockphoto-852115076-612x612_cvq4tu.jpg', 'tutor4', '$2b$10$aJqz9sGLgbDHK1GcmEWII.NKfw.Yn/SL5pIG7QmGn/LxCuGbOtDVC', 'tutor4@example.com', 'Allison Mark', FALSE, FALSE, 'Chemistry', 'I guide students through the intricacies of chemical reactions, fostering a deep understanding of molecular structures and their applications in the world around us.',TRUE),    
    
    (TRUE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711678900/istockphoto-482428924-612x612_wp4z9x.jpg', 'tutor5', '$2b$10$MVWLs8MqC36lBPFi8ZFNkeoXLtiNNW6hqJoWIU4LBLuzkdfzoZUbu', 'tutor5@example.com', 'May Allison', FALSE, FALSE, 'Physics', 'A dedicated middle school educator with a knack for making science fun and accessible, engages students in hands-on experiments and real-life examples.', TRUE),     
    
    (TRUE, 'https://ca.slack-edge.com/TCVA3PF24-U03BTCLF2GH-2be48c37f9c8-512', 'tutor6', '$2b$10$i07rZ4DP5vXXxJwU7Rgd/OeZgvHnB62qDrze2UJVRs0hTlKzKCqW6', 'tutor6@example.com', 'JD Richards', FALSE, FALSE, 'Coding', 'Exceptional tutor with a wealth of experience in the field of Coding',TRUE),

    (TRUE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711678909/e69d5a27e5316533fc6570f8ce7fb14b_whcda4.jpg', 'tutor7', '$2b$10$h9eHDLmpJh9SS.hXCQmCqOA2O4.oirf8/sr59/NYBYiObcE0K48hq', 'tutor7@example.com', 'Emily Patel', FALSE, FALSE, 'Chemistry', 'Highly skilled tutor boasting extensive expertise in the realm of chemistry.',TRUE),    
    
    (TRUE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711678915/1000_F_422823992_ZtyrE96o6wGTJcyZolZ6pLRUGHBRCH9c_ld3e2z.jpg', 'tutor8', '$2b$10$9D0pDwFsMA2FOAm3PNOmZOpVrhnD795freBMvMjNeInEO7DTp1b6G', 'tutor8@example.com', 'Olivia Thompson', FALSE, FALSE, 'Physics', 'PhD in theoretical physics, specializing in quantum mechanics.', TRUE),     
    
    (TRUE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711678921/istockphoto-1386910472-612x612_oq6osy.jpg', 'tutor9', '$2b$10$TtMetpu00msw8buSiGwB.OqMPbOZazzC5ickXcvgVDszitJ1TL3qq', 'tutor9@example.com', 'Sophia Rodriguez', FALSE, FALSE, 'Psychology', 'I am an experienced high school educator with a passion for understanding human behavior.',TRUE),

    (TRUE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711678927/65f9cbfbbacf5d6c794534c1_virtual-headshot-1_y6u9gu.webp', 'tutor10', '$2b$10$3pFQgzRuWJ8hnjbjZ2b.ceXDZ3cFkhjmJjXH3hguBeQeI.pUQ7BMW', 'tutor10@example.com', 'William Nguyen', FALSE, FALSE, 'History', 'With my engaging teaching style, I transport students back in time, unraveling the intricacies of historical events and their relevance to the modern world.',TRUE),    
    
    (TRUE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711678935/studio-portrait-beautiful-young-woman-posing-with-white-screen_1301-3864_ebsntf.avif', 'tutor11', '$2b$10$9PWokvrLsgVi.fZ4xVxnX.0H87eQHfp7NRxXFEGmRbod72uYcem6q', 'tutor11@example.com', 'Elijah Sullivan', FALSE, FALSE, 'Physics', 'I empower students to grasp the intricate laws governing matter, energy, and motion.', TRUE),     
    
    (TRUE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711678941/teacher-professional-headshot-1-534x800_imqxnr.jpg', 'tutor12', '$2b$10$GQs509VePpU15ntBy/6yy.Ev6jfQ4eMzBuCQrFlxoBWRSBZmcML3K', 'tutor12@example.com', 'Ava Martinez', FALSE, FALSE, 'Psychology', 'My expertise in the psychology field ensures that I can offer valuable insights and assistance tailored to each individual and their learning needs.',TRUE),


-- Students - users.id 13-24
--password 13: password
--password 14: password5
--password 15: password6
    (FALSE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711472464/Data%20seed%20class/student_1_qjnrah.jpg', 'demo_student', '$2b$10$L5QiYCI6r9hddL3aRdAWTO6c7wj6aXgsjSCaDJ00kLWnwgTJ9o4TG', 'demo_student@example.com', 'John Smith', TRUE, FALSE, 'Mathematics', NULL, TRUE),

    (FALSE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711472470/Data%20seed%20class/student_2_ooq6vn.jpg', 'student2', '$2b$10$tHaKfLOvdy472Y0RvEQPue7RcGktFP8oUDKntM3jGOOMSpz4eChwe', 'student1@example.com', 'Michael Johnson', TRUE, FALSE, 'Physics', NULL, TRUE),

    (FALSE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711472477/Data%20seed%20class/student_3_wyafvc.jpg', 'student3', '$2b$10$nZ4/GQomk6CNPXz00tODu.0YycaOxNcEVaAeCiHoeosjbXk/S0iua', 'student2@example.com', 'Emma Wilson', TRUE, FALSE, 'Chemistry', NULL, TRUE),
-- change images for math students
-- user.id values 16 - 27 are math students
-- password for 16 - 27: password
    (FALSE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711679509/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj_fkphja.jpg', 'math_student1', '$2b$10$ryN5R2JlR9pSEKsnJ3WmNOC0aWoo4Ru6sgvvJiZ45tW9.b2/Aaocm', 'math_student1@example.com', 'August Maple', TRUE, FALSE, 'Mathematics', NULL, TRUE),   

    (FALSE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711679514/pngtree-indian-young-girl-student-in-library-ai-image-image_13930476_apyslb.jpg', 'math_student2', '$2b$10$ROorLfG.C4cO16AgKtpNle2W1f9YYG2r/pApQt/9.qzioZcpves6q', 'math_student2@example.com', 'Martha Sunny', TRUE, FALSE, 'Mathematics', NULL, TRUE),      

    (FALSE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711679520/istockphoto-1437816897-170667a_jrxqkq.webp', 'math_student3', '$2b$10$Ebv.4/y6.sLr0fwsdQ8E5eJDUSAVnxEssYVWdEdw/NfOBTl4j4Uc.', 'math_student3@example.com', 'Mark Smith', TRUE, FALSE, 'Mathematics', NULL, TRUE),      

    (FALSE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711679527/getty_522854574_360091_mqa7ti.jpg', 'math_student4', '$2b$10$WD0DoX5tEdvHY5sn48wBlOJTMooIXbBPf7pgHtazKWPu/bFgq4jIa', 'math_student4@example.com', 'Michael Vader', TRUE, FALSE, 'Mathematics', NULL, TRUE),   

    (FALSE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711679533/girl-with-folder-folder-her-shoulder_662214-123350_iu2azk.avif', 'math_student5', '$2b$10$QmYjFtiBKqxiyx1p3bFf3uiOgEo4m.p2kEHbMNAFFwbyTNTRdt0Qm', 'math_student5@example.com', 'Stanley Marsh', TRUE, FALSE, 'Mathematics', NULL, TRUE),  

    (FALSE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711679539/istockphoto-1473711199-170667a_gwgamt.webp', 'math_student6', '$2b$10$r.8na/q2rIWUzs0cqQh44.BZl9w8Mzq2GBSCOAgwwlDQVLOF9XyrC', 'math_student6@example.com', 'Hank Hill', TRUE, FALSE, 'Mathematics', NULL, TRUE),     

    (FALSE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711679547/istockphoto-1340766096-612x612_rxbtvm.jpg', 'math_student7', '$2b$10$xsq8BMZdy8UEDuodiUhxzuRlnDXnhommW1PBfKcU09et2M.15k2pG', 'math_student7@example.com', 'Hilary Banks', TRUE, FALSE, 'Mathematics', NULL, TRUE),     

    (FALSE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711679555/download_dt0gqj.jpg', 'math_student8', '$2b$10$XAc9JPsVP8eiZPyN25YLsuO7cjLtkKnL.KUid45rxS0ZGniRULITu', 'math_student8@example.com', 'April Smith', TRUE, FALSE, 'Mathematics', NULL, TRUE),      

    (FALSE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711679561/download_1_a1o9jy.jpg', 'math_student9', 'p$2b$10$DAgTmtP4TptrdMYVsL5QhuZ8xFYXIdhEeB8wSbwRjQqAD1PZDAjfm', 'math_student9@example.com', 'Lana Davidson', TRUE, FALSE, 'Mathematics', NULL, TRUE),

    (FALSE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711679684/BU-student-headshot-questrom-1_qyyttw.jpg', 'math_student10', '$2b$10$eaDycUyVIdqTExhxeGINJ.HJO6iNovN9jfPyEZwOG2Cc72ryg6PNa', 'math_student10@example.com', 'Sterling Archers', TRUE, FALSE, 'Mathematics', NULL, TRUE),       

    (FALSE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711679690/istockphoto-583862104-612x612_p4l7yx.jpg', 'math_student11', '$2b$10$c0Kc9ijPjF3JKskqY9roM.QUWltn.UkNj0Krm/qZhkHBjzTwxOvHm', 'math_student11@example.com', 'William Waters', TRUE, FALSE, 'Mathematics', NULL, TRUE),   

    (FALSE, 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1711679700/istockphoto-911033208-612x612_mxxvkm.jpg', 'math_student12', '$2b$10$tCkguRGSAqqHGqrjTU2iMefKmLoO9UckBVfhaWJl2sUBUaDnXGtaO', 'math_student12@example.com', 'Matthew Summers', TRUE, FALSE, 'Mathematics', NULL, TRUE)
;

-- USER ID IS STUDENT ID
-- Inserting a request where the tutor accepts
INSERT INTO requests (user_id, tutor_id, accepted, created_at) 
VALUES 
    (13, 1, FALSE, NOW()),
    (14, 2, TRUE, NOW()),
    (15, 3, TRUE, NOW()),
    (16, 1, FALSE, NOW()),
    (17, 1, TRUE, NOW()),
    (18, 1, TRUE, NOW()),
    (19, 1, TRUE, NOW()),
    (20, 1, TRUE, NOW()),
    (21, 1, TRUE, NOW()),
    (22, 1, TRUE, NOW()),
    (23, 1, TRUE, NOW()),
    (24, 1, TRUE, NOW()),
    (25, 1, TRUE, NOW()),
    (26, 1, TRUE, NOW()),
    (27, 1, TRUE, NOW())
;

-- Inserting a review for a student
INSERT INTO student_reviews (tutor_id, subject, description, user_id, ratings) 
VALUES (1, 'Mathematics', 'Great tutor, very helpful with calculus problems.', 13, 5),
(1, 'Mathematics', 'AMAAAZIIIING!!', 16, 5),
(1, 'Mathematics', 'Great tutor, but gives alot of homework', 17, 4),
(2, 'Physics', 'Great tutor, very helpful with inertia problems.', 14, 5),
(3, 'Chemistry', 'Great tutor, very helpful with stoichiometry problems.', 15, 5)
;