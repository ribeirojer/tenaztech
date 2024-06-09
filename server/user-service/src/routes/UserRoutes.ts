import Elysia, { t } from "elysia";
import UserController from "../controllers/UserController";

const router = new Elysia()

// Rotas de usuários
router.group('/api/users', router => router
    .get('/', UserController.index/*, {
        body: t.Object({
            username: t.String(),
            password: t.String()
        }*/)
    )
    .get("/users/:id", UserController.show)
    .post("/users", UserController.store)
    .put("/users/:id", UserController.update)
    .delete("/users/:id", UserController.destroy)

export default router;
