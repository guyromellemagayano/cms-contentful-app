import { notFound } from 'next/navigation'

/**
 * Renders the catch-all page component.
 * @returns The catch-all page component.
 */
const CatchAllPage = () => {
  notFound()
}

CatchAllPage.displayName = 'CatchAllPage'

export default CatchAllPage
