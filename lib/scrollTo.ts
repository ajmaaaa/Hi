// Helper to smoothly scroll to a section by its id, compensating for the fixed navbar height
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) {
    const navbarHeight = 80 // height offset of fixed navbar
    const elementPosition = el.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - navbarHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
