export default function Footer() {
  return (
    <footer className="bg-foreground dark:bg-background text-background dark:text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Logo + tagline */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-3">
              <img
                src="/images/logo.jpeg"
                alt="Exalter Students"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
              <span className="text-2xl font-bold text-accent">Exalter Students</span>
            </a>
            <p className="mt-2 text-sm text-muted-foreground">
              Platform inovasi dan pendidikan pemuda Indonesia — memberdayakan siswa dalam akademik, karier, kepemimpinan, dan pertumbuhan pribadi.
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Kontak</h3>
            <a
              href="mailto:info@exalterstudents.com"
              className="text-muted-foreground hover:text-background dark:hover:text-foreground transition-colors text-sm"
            >
              info@exalterstudents.com
            </a>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Media Sosial</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com/exalterstudents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-background dark:hover:text-foreground transition-colors text-sm flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  @exalterstudents
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/exalter-students"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-background dark:hover:text-foreground transition-colors text-sm flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  Exalter Students
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          © 2025 Exalter Students. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
