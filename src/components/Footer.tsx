import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone, Mail, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <img src={logo} alt="Doces São Fidélis" className="h-20 w-auto brightness-0 invert" />
            <p className="text-sm opacity-90">
              Tradição e qualidade desde 2000
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Sobre Nós</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/empresa" className="text-sm hover:underline opacity-90 hover:opacity-100">
                  Empresa
                </Link>
              </li>
              <li>
                <Link to="/produtos" className="text-sm hover:underline opacity-90 hover:opacity-100">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/qualidade" className="text-sm hover:underline opacity-90 hover:opacity-100">
                  Qualidade
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-sm hover:underline opacity-90 hover:opacity-100">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4">Acompanhe</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>22-999408875</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>bananadacampista@hotmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Seg. a quinta das 8 às 18h e às sex. até às 17h</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Doces São Fidélis. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
