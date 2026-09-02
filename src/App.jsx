import HomePage from './interfaces/HomePage.jsx'

/**
 * Mounts the current routed-interface placeholder for the application root.
 * This boundary keeps entry concerns separate from page composition and is used
 * by main.jsx until the shared router is introduced in Sprint 8.
 *
 * @returns {import('react').JSX.Element} The application interface.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function App() {
  return <HomePage />
}

export default App
