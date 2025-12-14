import Link from 'next/link'

const footerLinks = {
  navigation: [
    { name: 'Accueil', href: '/' },
    { name: 'Téléchargement', href: '/download' },
    { name: 'Lore', href: '/lore' },
    { name: 'Team', href: '/team' },
  ],
  informations: [
    { name: 'Règlement', href: '/rules' },
    { name: 'Wiki', href: '/wiki' },
  ],
  legal: [
    { name: 'Conditions d\'utilisation', href: '/legal/terms' },
    { name: 'Politique de confidentialité', href: '/legal/privacy' },
  ],
  reseaux: [
    { name: 'Discord', href: 'https://discord.gg/VPqdAzKhVv', external: true },
    { name: 'GitHub', href: 'https://github.com/Mathew3585/los-nachos-launcher', external: true },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo and description centered */}
        <div className="flex flex-col items-center mb-12">
          <img
            src="/image/logo.png"
            alt="Los Nachos Chipies"
            className="h-24 w-auto mb-4"
          />
          <p className="text-gray-500 text-center text-sm max-w-md">
            Los Nachos Chipies est un serveur Minecraft post-apocalyptique.
            <br />
            Nous ne sommes pas affilié à Mojang AB.
          </p>
        </div>

        {/* Links in columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Liens utiles
            </h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Informations
            </h3>
            <ul className="space-y-2">
              {footerLinks.informations.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Légal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Réseaux */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Nos réseaux
            </h3>
            <ul className="space-y-2">
              {footerLinks.reseaux.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-red-900/20 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Los Nachos Chipies. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
