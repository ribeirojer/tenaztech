import Elysia, { t } from "elysia";
import { AuthController } from "../controllers/AuthController";

const router = new Elysia()

router.group('/api', router => router
    .get('/', () => 'Using API')
    .group('/auth', router => router
    .post('/login', AuthController.login, {
        body: t.Object({
            email: t.String(),
            password: t.String()
        })
    })
    .post('/register', AuthController.register, {
        body: t.Object({
            name: t.String(),
            email: t.String(),
            password: t.String(),
        })
    })
    ).post("/auth/forgot-password", AuthController.forgotPassword, {
        body: t.Object({
            email: t.String(),
        })
    })
    .post("/auth/change-password", AuthController.changePassword, {
        body: t.Object({
            password: t.String(),
            confirmPassword: t.String(),
            token: t.String(),
        })
    })
    .post("/auth/confirm-email", AuthController.confirmEmail)
    .post("/auth/reset-password", AuthController.resetPassword)
)

export default router;
