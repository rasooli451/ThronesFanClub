


const {Client} = require("pg");
require("dotenv").config();



const SQL = `
     
     CREATE TABLE IF NOT EXISTS users(
     user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     username VARCHAR (255),
     password VARCHAR (255),
     email VARCHAR (100),
     isAdmin INTEGER,
     isMember INTEGER,
     favorite VARCHAR (100)
     );

     INSERT INTO users (username,password,email,isAdmin,isMember) VALUES ('Farhad Rasoli', '$2b$10$nuTe3MJ69x8CpOu2aFQK/uML/KF7/pw8y7RciyGTZ9nvfcdrbFHVi', 'rasoolyfarhad7@gmail.com', 1, 1);


     CREATE TABLE IF NOT EXISTS messages(
     message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     message VARCHAR (3000),
     date TIMESTAMPTZ,
     owner_id INTEGER);

     ALTER TABLE messages ADD FOREIGN KEY(owner_id)
     REFERENCES users(user_id) ON DELETE CASCADE;

     CREATE TABLE IF NOT EXISTS comments(
     comment_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     comment VARCHAR (500),
     owner_id INTEGER,
     message_id INTEGER);

     ALTER TABLE comments ADD FOREIGN KEY(owner_id)
     REFERENCES users(user_id) ON DELETE CASCADE;

     ALTER TABLE comments ADD FOREIGN KEY(message_id)
     REFERENCES messages(message_id) ON DELETE CASCADE;

     CREATE TABLE IF NOT EXISTS likes(
     like_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     owner_id INTEGER,
     message_id INTEGER);

     ALTER TABLE likes ADD FOREIGN KEY(owner_id)
     REFERENCES users(user_id) ON DELETE CASCADE;

     ALTER TABLE likes ADD FOREIGN KEY(message_id)
     REFERENCES messages(message_id) ON DELETE CASCADE;

`;



async function Main(){
    const client = new Client({
        connectionString : `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:5432/${process.env.DATABASE}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}




Main();