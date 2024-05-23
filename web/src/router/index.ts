import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../pages/Home.vue'
import AboutView from '../pages/About.vue'
import ProductListView from '../pages/ProductList.vue'
import ProductDetailsView from '../pages/ProductDetails.vue'
import CartView from '../pages/Cart.vue'
import CheckoutView from '../pages/Checkout.vue'
import OrderConfirmationView from '../pages/OrderConfirmation.vue'
import AccountView from '../pages/Account.vue'
import LoginView from '../pages/Login.vue'
import RegisterView from '../pages/Register.vue'
import NotFoundView from '../pages/NotFound.vue'
import TermsOfServiceView from '../pages/TermsOfService.vue'
import PrivacyPolicyView from '../pages/PrivacyPolicy.vue'
import WishlistView from '../pages/Wishlist.vue'
import ComparisonView from '../pages/Comparison.vue'
import HelpView from '../pages/Help.vue'
import OrderTrackingView from '../pages/OrderTracking.vue'
import BlogView from '../pages/Blog.vue'
import ContactView from '../pages/Contact.vue'
import FAQView from '../pages/FAQ.vue'
import AdminView from '../pages/Admin.vue'
import PedidoseDevolucoesView from '../pages/PedidoseDevolucoes.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/sobre', component: AboutView },
  { path: '/produtos', component: ProductListView },
  { path: '/produto/:slug', component: ProductDetailsView },
  { path: '/carrinho', component: CartView },
  { path: '/checkout', component: CheckoutView },
  { path: '/confirmacao-pedido', component: OrderConfirmationView },
  { path: '/minha-conta', component: AccountView, meta: { requiresAuth: true } },
  { path: '/login', component: LoginView },
  { path: '/registro', component: RegisterView },
  { path: '/termos-de-servico', component: TermsOfServiceView },
  { path: '/politica-de-privacidade', component: PrivacyPolicyView },
  { path: '/lista-de-desejos', component: WishlistView, meta: { requiresAuth: true } },
  { path: '/comparacao', component: ComparisonView },
  { path: '/ajuda', component: HelpView },
  { path: '/pedidos-e-devolucoes', component: PedidoseDevolucoesView },
  { path: '/rastrear-meu-pedido', component: OrderTrackingView, meta: { requiresAuth: true } },
  { path: '/blog', component: BlogView },
  { path: '/contato', component: ContactView },
  { path: '/faq', component: FAQView },
  { path: '/administrador', component: AdminView },
  { path: '/:catchAll(.*)', component: NotFoundView } // Página não encontrada
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export { router }
