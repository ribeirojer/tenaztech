import { createRouter, createWebHistory } from 'vue-router'

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
import PrivacyPolicyView from '../pages/PrivacyPolicy.vue'
import WishlistView from '../pages/Wishlist.vue'
import ComparisonView from '../pages/Comparison.vue'
import HelpView from '../pages/Help.vue'
import OrderTrackingView from '../pages/OrderTracking.vue'
import BlogView from '../pages/Blog.vue'
import ContactView from '../pages/Contact.vue'
import FAQView from '../pages/FAQ.vue'
import AdminView from '../pages/Admin.vue'
import OffersView from '../pages/Offers.vue'
import BlogPostView from '../pages/BlogPost.vue'
import ReturnPolicyView from '../pages/ReturnPolicy.vue'
import CustomerSupportView from '../pages/CustomerSupport.vue'
import TermsAndConditionsView from '../pages/TermsAndConditions.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/sobre', component: AboutView },
  { path: '/produtos', component: ProductListView },
  { path: '/produto/:slug', component: ProductDetailsView },
  { path: '/carrinho', component: CartView },
  { path: '/checkout', component: CheckoutView },
  { path: '/confirmacao-pedido', component: OrderConfirmationView },
  { path: '/minha-conta', component: AccountView },
  { path: '/login', component: LoginView },
  { path: '/registro', component: RegisterView },
  { path: '/politica-de-privacidade', component: PrivacyPolicyView },
  { path: '/lista-de-desejos', component: WishlistView },
  { path: '/comparacao', component: ComparisonView },
  { path: '/ajuda', component: HelpView },
  { path: '/pedidos-e-devolucoes', component: ReturnPolicyView },
  { path: '/rastrear-meu-pedido', component: OrderTrackingView },
  { path: '/blog', component: BlogView },
  { path: '/contato', component: ContactView },
  { path: '/faq', component: FAQView },
  { path: '/administrador', component: AdminView },
  { path: '/ofertas', component: OffersView },
  { path: '/blog/:slug', component: BlogPostView },
  { path: '/politica-de-devolucoes', component: ReturnPolicyView },
  { path: '/suporte-ao-cliente', component: CustomerSupportView },
  { path: '/termos-e-condicoes', component: TermsAndConditionsView },
  { path: '/:catchAll(.*)', component: NotFoundView } // Página não encontrada
]

const router = createRouter({
  history: createWebHistory(),
  //history: createMemoryHistory(),
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
