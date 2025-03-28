import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedQuizzes1710522100000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO quizzes (title, description) 
            VALUES 
                ('JavaScript Basics', 'Test your knowledge of JavaScript fundamentals'),
                ('React Concepts', 'Challenge yourself with React framework questions'),
                ('CSS Mastery', 'How well do you know CSS?'),
                ('TypeScript Quiz', 'Explore your TypeScript expertise'),
                ('Node.js Essentials', 'Test your Node.js knowledge'),
                ('SQL Fundamentals', 'Basic to advanced SQL questions'),
                ('HTML5 Features', 'Discover the latest HTML5 capabilities'),
                ('Web Security', 'Test your knowledge of web security best practices');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM quizzes WHERE title IN (
            'JavaScript Basics', 
            'React Concepts', 
            'CSS Mastery', 
            'TypeScript Quiz', 
            'Node.js Essentials', 
            'SQL Fundamentals', 
            'HTML5 Features', 
            'Web Security'
        )`);
    }
}