-- Active: 1698447626427@@127.0.0.1@3306
PRAGMA date_class = 'datetime';

-- CRIA A TABELA USERS --
CREATE TABLE
    users (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

-- POPULA A TABELA USERS --
    INSERT INTO users (id, name, email, password, role) VALUES
    ('u01', 'Usuario1', 'usuario1@example.com', 'senha1', 'role1'),
    ('u02', 'Usuario2', 'usuario2@example.com', 'senha2', 'role2'),
    ('u03', 'Usuario3', 'usuario3@example.com', 'senha3', 'role3'),
    ('u04', 'Usuario4', 'usuario4@example.com', 'senha4', 'role4'),
    ('u05', 'Usuario5', 'usuario5@example.com', 'senha5', 'role5');
    
DROP TABLE users;
SELECT * FROM users;

-- CRIA A TABELA POSTS --
CREATE TABLE
    posts (
        id TEXT PRIMARY KEY NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER NOT NULL,
        dislikes INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (creator_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

    DROP TABLE posts;
    SELECT * FROM posts;

-- POPULA A TABELA POSTS --
INSERT INTO posts (id, creator_id, content, likes, dislikes) VALUES
    ('p01', 'u01', 'Conteúdo da Postagem 1', 10, 2),
    ('p02', 'u02', 'Conteúdo da Postagem 2', 5, 1),
    ('p03', 'u03', 'Conteúdo da Postagem 3', 8, 3),
    ('p04', 'u04', 'Conteúdo da Postagem 4', 12, 4),
    ('p05', 'u05', 'Conteúdo da Postagem 5', 7, 2);



-- CRIA A TABELA LIKES_DESLIKES --
CREATE TABLE
    likes_dislikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

    DROP TABLE likes_dislikes;
    SELECT * FROM likes_dislikes;

INSERT INTO likes_dislikes (user_id, post_id, like) VALUES
    ('u01', 'p01', 1),
    ('u02', 'p01', 1),
    ('u03', 'p02', -1),
    ('u04', 'p03', 1),
    ('u05', 'p04', -1);



