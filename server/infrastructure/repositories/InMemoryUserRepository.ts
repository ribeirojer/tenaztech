import {UserRepository} from '../../domain/interfaces/UserRepository';

class InMemoryUserRepository extends UserRepository {
    users: any[];
    constructor() {
        super();
        this.users = [];
    }

    async getById(id) {
        return this.users.find(user => user.id === id);
    }

    async add(user: any) {
        this.users.push(user);
    }
}

export {InMemoryUserRepository};
