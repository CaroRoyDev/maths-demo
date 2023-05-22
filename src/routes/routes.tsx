import { PolynomialsPage } from '../pages'

export const APP_ROUTES = [
  {
    id: 'polynomials',
    path: '/polynomials',
    displayName: 'Polynomials',
    element: <PolynomialsPage />,
  },
  {
    id: 'linear-algebra',
    path: '/linear-algebra',
    displayName: 'Linear algebra',
    element: <></>,
  },
] as const

export type AppRoute = (typeof APP_ROUTES)[number]
