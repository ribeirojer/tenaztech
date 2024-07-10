import { Context } from 'https://deno.land/x/oak/mod.ts';
import { userSchema } from '../../shared/validations/userValidation.ts';
import { CreateUserUseCase } from '../../application/use_cases/CreateUserUseCase.ts';
import { UpdateUserUseCase } from '../../application/use_cases/UpdateUserUseCase.ts';

export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private updateUserUseCase: UpdateUserUseCase
    ) {}

    async create(ctx: Context) {
        const { value } = await ctx.request.body();
        const validation = userSchema.safeParse(value);

        if (!validation.success) {
            ctx.response.status = 400;
            ctx.response.body = { error: validation.error.errors };
            return;
        }

        const { name, email } = value;
        await this.createUserUseCase.execute(name, email);
        ctx.response.status = 201;
    }

    async update(ctx: Context) {
        const { id } = ctx.params;
        const { value } = await ctx.request.body();
        const validation = userSchema.safeParse(value);

        if (!validation.success) {
            ctx.response.status = 400;
            ctx.response.body = { error: validation.error.errors };
            return;
        }

        const { name, email } = value;
        try {
            await this.updateUserUseCase.execute(id!, name, email);
            ctx.response.status = 200;
        } catch (e) {
            ctx.response.status = 404;
            ctx.response.body = { error: e.message };
        }
    }
}
