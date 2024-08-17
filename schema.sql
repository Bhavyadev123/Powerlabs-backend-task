CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL -- "teacher" or "student"
);

CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    total_score INTEGER,
    created_by INTEGER REFERENCES users(id),
    student_id INTEGER REFERENCES users(id),
    grade INTEGER
);
