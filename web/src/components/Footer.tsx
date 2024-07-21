import Link from "next/link";
import React from "react";
import LogoVertical from "./icons/LogoVertical";
import FacebookIcon from "./icons/FacebookIcon";
import TwitterIcon from "./icons/TwitterIcon";
import InstagramIcon from "./icons/InstagramIcon";
import LinkedinIcon from "./icons/LinkedinIcon";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-midnight text-off-white py-8">
      <div className="container mx-auto px-4">
        <Link href="/">
          <LogoVertical className="h-20 fill-glow-tech mb-8 mx-auto" />
        </Link>
        <div className="grid grid-cols-2 md:grid-cols-4 justify-center md:justify-between gap-8">
          <div className="w-full md:w-auto px-4 mb-8 md:mb-0">
            <div className="footer">
              <h3 className="footer-title text-lg font-extrabold mb-4">
                Sobre Nós
              </h3>
              <ul className="footer-links space-y-2">
                <li>
                  <Link href="/sobre-nos" className="text-sm hover:text-electric-blue transition">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="text-sm hover:text-electric-blue transition">
                    Contate-Nos
                  </Link>
                </li>
                <li>
                  <Link href="/politica-de-privacidade" className="text-sm hover:text-electric-blue transition">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/devolucoes" className="text-sm hover:text-electric-blue transition">
                    Pedidos e Devoluções
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-auto px-4 mb-8 md:mb-0">
            <div className="footer">
              <h3 className="footer-title text-lg font-extrabold mb-4">
                Categorias
              </h3>
              <ul className="footer-links space-y-2">
                <li>
                  <Link href="/produtos?c=ofertas" className="text-sm hover:text-electric-blue transition">
                    Ofertas
                  </Link>
                </li>
                <li>
                  <Link href="/produtos?c=laptops" className="text-sm hover:text-electric-blue transition">
                    Laptops
                  </Link>
                </li>
                <li>
                  <Link href="/produtos?c=smartphones" className="text-sm hover:text-electric-blue transition">
                    Smartphones
                  </Link>
                </li>
                <li>
                  <Link href="/produtos?c=cameras" className="text-sm hover:text-electric-blue transition">
                    Câmeras
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-auto px-4 mb-8 md:mb-0">
            <div className="footer">
              <h3 className="footer-title text-lg font-extrabold mb-4">
                Informações
              </h3>
              <ul className="footer-links space-y-2">
                <li>
                  <Link href="/termos-e-condicoes" className="text-sm hover:text-electric-blue transition">
                    Termos e Condições
                  </Link>
                </li>
                <li>
                  <Link href="/minha-conta" className="text-sm hover:text-electric-blue transition">
                    Minha Conta
                  </Link>
                </li>
                <li>
                  <Link href="/carrinho" className="text-sm hover:text-electric-blue transition">
                    Ver Carrinho
                  </Link>
                </li>
                <li>
                  <Link href="/lista-de-desejos" className="text-sm hover:text-electric-blue transition">
                    Lista de Desejos
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-auto px-4 mb-8 md:mb-0">
            <div className="footer">
              <h3 className="footer-title text-lg font-extrabold mb-4">
                Serviço
              </h3>
              <ul className="footer-links space-y-2">
                <li>
                  <Link href="/rastrear-meu-pedido" className="text-sm hover:text-electric-blue transition">
                    Rastrear Meu Pedido
                  </Link>
                </li>
                <li>
                  <Link href="/ajuda" className="text-sm hover:text-electric-blue transition">
                    Ajuda
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ul className="flex gap-4">
            <li>
              <a
                href="https://www.facebook.com/TenazTech"
                className="fill-glow-tech hover:fill-electric-blue transition"
                target="_blank"
              >
                <FacebookIcon className="w-8 h-8" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/TenazTech"
                className="fill-glow-tech hover:fill-electric-blue transition"
                target="_blank"
              >
                <TwitterIcon className="w-8 h-8" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/TenazTech"
                className="fill-glow-tech hover:fill-electric-blue transition"
                target="_blank"
              >
                <InstagramIcon className="w-8 h-8" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/tenaztech"
                className="fill-glow-tech hover:fill-electric-blue transition"
                target="_blank"
              >
                <LinkedinIcon className="w-8 h-8" />
              </a>
            </li>
          </ul>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            &copy; 2024 TenazTech. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
