import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('section')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  if (!visible) return null

  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 rounded-full w-11 h-11 bg-primary text-primary-foreground transition-transform hover:scale-110"
      size="icon"
      aria-label="Kembali ke atas"
    >
      <ChevronUp size={20} strokeWidth={2.5} aria-hidden="true" />
    </Button>
  )
}
