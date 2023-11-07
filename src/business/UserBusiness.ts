import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/Users";
import { TUserDB } from "../types";

export class UserBusiness {
  public getUser = async (input: any) => {
    const { q } = input;

    const userDatabase = new UserDatabase();
    const usersDB = await userDatabase.findUsers(q);

    const users: User[] = usersDB.map(
      (userDB: TUserDB) =>
        new User(
          userDB.id,
          userDB.name,
          userDB.email,
          userDB.password,
          userDB.role,
          userDB.created_at
        )
    );

    return users;
  };

  public createUser = async (input: any) => {
    const { id, name, email, password, role } = input;

    if (typeof id !== "string") {
      throw new Error("'id' deve ser string");
    }

    if (typeof name !== "string") {
      throw new Error("'name' deve ser string");
    }

    if (typeof email !== "string") {
      throw new Error("'email' deve ser string");
    }

    if (typeof password !== "string") {
      throw new Error("'password' deve ser string");
    }

    if (typeof role !== "string") {
      throw new Error("'password' deve ser string");
    }

    const userDatabase = new UserDatabase();
    const userDBExists = await userDatabase.findUserById(id);

    if (userDBExists) {
      throw new Error(" Este 'id' já existe em nosso banco de dados!");
    }

    const newUser = new User(
      id,
      name,
      email,
      password,
      role,
      new Date().toISOString()
    );

    const newUserDB: TUserDB = {
      id: newUser.getId(),
      name: newUser.getName(),
      email: newUser.getEmail(),
      password: newUser.getPassword(),
      role: newUser.getRole(),
      created_at: newUser.getCreatedAt(),
    };

    await userDatabase.createUser(newUserDB);

    return newUser;
  };

  public editUsers = async (input: any) => {
    const { id, name, password, email, role } = input;

    if (typeof id !== "string") {
      throw new Error("'id' deve ser uma string");
    }

    if (typeof name !== "string") {
      throw new Error("'name' deve ser uma string");
    }

    if (typeof email !== "string") {
      throw new Error("'email' deve ser uma string");
    }

    if (typeof password !== "string") {
      throw new Error("'password' deve ser uma string");
    }

    if (typeof role !== "string") {
      throw new Error("'role' deve ser uma string");
    }

    const userDatabase = new UserDatabase();

    // Verificar se o usuário com o ID existe
    const userExists = await userDatabase.findUserById(id);
    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    // Atualizar os dados do usuário
    userExists.name = name;
    userExists.email = email;
    userExists.password = password;
    userExists.role = role;

    // Salvar as mudanças no banco de dados
    await userDatabase.updateUser(userExists);

    return userExists;
  };

  public deleteUsers = async (input: any) => {
    const { id } = input;

    const userDatabase = new UserDatabase();

    // Verificar se o usuário com o ID existe
    const userExists = await userDatabase.findUserById(id);
    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    // Excluir o usuário do banco de dados
    await userDatabase.deleteUser(id);

    return userExists;
  };
}
