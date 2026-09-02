import { Route, Routes } from 'react-router'
import SiteLayout from './components/SiteLayout.jsx'
import { ROUTES } from './config/routes.js'
import AboutPage from './interfaces/AboutPage.jsx'
import ErrorPage from './interfaces/ErrorPage.jsx'
import FaqPage from './interfaces/FaqPage.jsx'
import HomePage from './interfaces/HomePage.jsx'
import PrivacyPage from './interfaces/PrivacyPage.jsx'

/**
 * Defines the complete route table beneath one persistent site shell.
 * main.jsx places it inside BrowserRouter and the root boundary while this
 * component keeps path matching and page selection centralized.
 *
 * @returns {import('react').JSX.Element} The application interface.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.about} element={<AboutPage />} />
        <Route path={ROUTES.faq} element={<FaqPage />} />
        <Route path={ROUTES.privacy} element={<PrivacyPage />} />
        <Route path={ROUTES.notFound} element={<ErrorPage error={404} />} />
      </Route>
    </Routes>
  )
}

export default App
