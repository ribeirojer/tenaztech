import { User } from '../../domain/entities/User.ts';

export const toDTO = (user: User) => ({
    id: user.id,
    name: user.name,
    email: user.email
});

export const fromDTO = (dto: any) => new User(dto.id, dto.name, dto.email);
