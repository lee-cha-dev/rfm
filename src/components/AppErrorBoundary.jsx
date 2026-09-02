import { useLocation } from 'react-router'
import ErrorBoundary from './ErrorBoundary.jsx'

/**
 * Connects the class boundary's reset key to the active browser location.
 * main.jsx uses this adapter inside BrowserRouter so a successful navigation
 * can intentionally release a previously trapped render error.
 *
 * @param {object} props The application-boundary properties.
 * @param {import('react').ReactNode} props.children The routed application.
 * @returns {import('react').JSX.Element} The location-aware root boundary.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function AppErrorBoundary({ children }) {
  const location = useLocation()
  const resetKey = `${location.pathname}${location.search}${location.hash}`

  return <ErrorBoundary resetKey={resetKey}>{children}</ErrorBoundary>
}

export default AppErrorBoundary
