import Elysia, { t } from "elysia";
import { UserController } from "../controllers/UserController";
import { RoleController } from "../controllers/RoleController";
import { AddressController } from "../controllers/AddressController";
import { OrderController } from "../controllers/OrderController";
import { SocialAuthController } from "../controllers/SocialAuthController";
import { NotificationController } from "../controllers/NotificationController";
import { SubscriptionController } from "../controllers/SubscriptionController";
import { WishlistController } from "../controllers/WishlistController";
import { ProductReviewController } from "../controllers/ProductReviewController";

const router = new Elysia()

// Rotas de usuários
router.group("/api/users", (router) => 
  router.get("/", UserController.index)
  .get("/:id", UserController.show)
  .post("/", UserController.store)
  .put("/:id", UserController.update)
  .delete("/:id", UserController.destroy)

  // Gerenciamento de Perfil
  .get("/profile", UserController.showProfile)
  .put("/profile", UserController.updateProfile)

  // Gerenciamento de Permissões
  .get("/roles", RoleController.getRoles)
  .get("/roles/:id", RoleController.getRole, {
    params: t.Object({
      id: t.String(),
    }),
  })
  .post("/roles", RoleController.createRole, {
    body: t.Object({
      name: t.String(),
      description: t.Optional(t.String()),
    }),
  })
  .put("/roles/:id", RoleController.updateRole, {
    params: t.Object({
      id: t.String(),
    }),
    body: t.Object({
      name: t.Optional(t.String()),
      description: t.Optional(t.String()),
    }),
  })
  .delete("/roles/:id", RoleController.deleteRole, {
    params: t.Object({
      id: t.String(),
    }),
  })
  .get("/user-permissions/:userId", UserController.getUserPermissions, {
    params: t.Object({
      userId: t.String(),
    }),
  })
  .post("/user-permissions/:userId", UserController.setUserPermissions, {
    params: t.Object({
      userId: t.String(),
    }),
    body: t.Object({
      roles: t.Array(t.String()), // Array of role IDs
    }),
  })
  .delete("/user-permissions/:userId/:roleId", UserController.removeUserPermission, {
    params: t.Object({
      userId: t.String(),
      roleId: t.String(),
    }),
  })

  // Gerenciamento de Endereços
  .get("/addresses", AddressController.getAddresses)
  .get("/addresses/:id", AddressController.getAddress, {
    params: t.Object({
      id: t.String(),
    }),
  })
  .post("/addresses", AddressController.createAddress, {
    body: t.Object({
      userId: t.String(),
      street: t.String(),
      city: t.String(),
      state: t.String(),
      postalCode: t.String(),
      country: t.String(),
    }),
  })
  .put("/addresses/:id", AddressController.updateAddress, {
    params: t.Object({
      id: t.String(),
    }),
    body: t.Object({
      street: t.Optional(t.String()),
      city: t.Optional(t.String()),
      state: t.Optional(t.String()),
      postalCode: t.Optional(t.String()),
      country: t.Optional(t.String()),
    }),
  })
  .delete("/addresses/:id", AddressController.deleteAddress, {
    params: t.Object({
      id: t.String(),
    }),
  })

  // Histórico de Pedidos (Opcional)
  .get("/orders", OrderController.getOrders)
  .get("/orders/:id", OrderController.getOrder, {
    params: t.Object({
      id: t.String(),
    }),
  })

  // Integração com Redes Sociais (Opcional)
  .post("/auth/social/:provider", SocialAuthController.initSocialAuth, {
    params: t.Object({
      provider: t.String(),
    }),
  })
  .get("/auth/social/callback/:provider", SocialAuthController.socialAuthCallback, {
    params: t.Object({
      provider: t.String(),
    }),
  })

  // Gerenciamento de Notificações (Opcional)
  .get("/notifications", NotificationController.getNotifications)
  .put("/notifications/:id", NotificationController.markNotificationAsRead, {
    params: t.Object({
      id: t.String(),
    }),
  })
  .delete("/notifications/:id", NotificationController.deleteNotification, {
    params: t.Object({
      id: t.String(),
    }),
  })

  // Gerenciamento de Assinaturas (Opcional)
  .get("/subscriptions", SubscriptionController.getSubscriptions)
  .post("/subscriptions", SubscriptionController.createSubscription, {
    body: t.Object({
      plan: t.String(),
      userId: t.String(),
    }),
  })
  .delete("/subscriptions/:id", SubscriptionController.deleteSubscription, {
    params: t.Object({
      id: t.String(),
    }),
  })

  // Funcionalidades de Busca (Opcional)
  .get("/search", UserController.searchUsers, {
    query: t.Object({
      query: t.String(),
    }),
  })

  // Funcionalidades de Gamificação (Opcional)
  .get("/user-points", UserController.getUserPoints, {
    query: t.Object({
      userId: t.String(),
    }),
  })
  .post("/user-points/add", UserController.addUserPoints, {
    body: t.Object({
      userId: t.String(),
      points: t.Number(),
    }),
  })
  .get("/leaderboard", UserController.getLeaderboard)

  // Gerenciamento de Listas de Desejos (Opcional)
  .get("/wishlists", WishlistController.getWishlist)
  .post("/wishlists/items", WishlistController.addItemToWishlist, {
    body: t.Object({
      userId: t.String(),
      productId: t.String(),
    }),
  })
  .delete("/wishlists/items/:itemId", WishlistController.removeItemFromWishlist, {
    params: t.Object({
      itemId: t.String(),
    }),
  })
  .put("/wishlists/items/:itemId", WishlistController.updateItemInWishlist, {
    params: t.Object({
      itemId: t.String(),
    }),
    body: t.Object({
      notes: t.Optional(t.String()),
    }),
  })

  // Gerenciamento de Avaliações de Produtos (Opcional)
  .post("/products/:productId/reviews", ProductReviewController.addReview, {
    params: t.Object({
      productId: t.String(),
    }),
    body: t.Object({
      userId: t.String(),
      rating: t.Number({ min: 1, max: 5 }),
      comment: t.Optional(t.String()),
    }),
  })
)

export default router;
