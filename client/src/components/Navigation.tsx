import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet'
import ThemeToggle from './ThemeToggle'

interface NavigationProps {
  currentPath: string
}

const WA_LINK =
  'https://api.whatsapp.com/send/?phone=6285214960974&text=Halo%2C+saya+tertarik+dengan+program+yang+tersedia+di+Exalter+Students%21&type=phone_number&app_absent=0'

const WaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function Navigation({ currentPath }: NavigationProps) {
  const links = [
    { href: '/', label: 'Beranda' },
    { href: '/program', label: 'Program' },
    { href: '/berita', label: 'Berita' },
  ]

  const isActive = (href: string) => currentPath === href

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          {/* Left — Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img src="/images/logo.jpeg" alt="Exalter Students" width="36" height="36" className="rounded-full object-cover" />
            <span className="text-xl font-bold tracking-tight hidden sm:block text-primary">
              Exalter Students
            </span>
          </a>

          {/* Center — Page links (desktop) */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  isActive(link.href)
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'text-foreground font-medium hover:bg-muted'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right — ThemeToggle + WhatsApp CTA + mobile Sheet trigger */}
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />

            <Button
              asChild
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
            >
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hubungi kami via WhatsApp"
              >
                <WaIcon />
                Hubungi Kami
              </a>
            </Button>

            {/* Mobile menu — Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex md:hidden rounded-full text-foreground"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle>
                    <a href="/" className="flex items-center gap-2">
                      <img src="/images/logo.jpeg" alt="Exalter Students" width="28" height="28" className="rounded-full object-cover" />
                      <span className="text-lg font-bold text-primary">Exalter Students</span>
                    </a>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-1 px-4">
                  {links.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <a
                        href={link.href}
                        className={`rounded-full px-4 py-2 text-sm transition-all ${
                          isActive(link.href)
                            ? 'bg-primary text-primary-foreground font-semibold'
                            : 'text-foreground font-medium hover:bg-muted'
                        }`}
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                </div>

                <div className="flex items-center gap-2 px-4 mt-4">
                  <ThemeToggle />
                  <Button
                    asChild
                    className="inline-flex items-center gap-2 rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 w-fit"
                  >
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WaIcon />
                      Hubungi Kami
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
