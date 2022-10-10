type User = {
    id: number,
    email: string,
    password: string
}

interface IAuthRepository {
    getUserByEmail: (email: User['email']) => Promise<User | null>;
    saveUser: (email: User['email'], password: User['password']) => Promise<User['id']>;
    deleteUserById: (id: User['id']) => Promise<void>;
}