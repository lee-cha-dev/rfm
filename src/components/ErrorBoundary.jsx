import { Component } from 'react'
import ErrorPage from '../interfaces/ErrorPage.jsx'
import { resolveErrorDisplay } from '../utils/normalizeError.js'

/**
 * Contains descendant render failures at the application root and replaces
 * them with a branded, patient-safe recovery interface. main.jsx installs this
 * class around App because React render error boundaries require lifecycle
 * methods that functional components do not provide.
 *
 * @augments {Component<{children: import('react').ReactNode, resetKey?: string}, {hasError: boolean, display: Readonly<{title: string, message: string}> | null}>}
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
class ErrorBoundary extends Component {
  state = { hasError: false, display: null }

  /**
   * Converts a descendant render failure into safe fallback state before the
   * next render. React calls it wherever a child throws during rendering.
   *
   * @param {unknown} error The captured descendant failure.
   * @returns {{hasError: true, display: Readonly<{title: string, message: string}>}} Safe fallback state.
   * @author Lee Charles
   * @since 20260902
   * @company Lazy Software
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, display: resolveErrorDisplay(error) }
  }

  /**
   * Reports diagnostic details only during development so production output
   * cannot disclose exception data. React invokes it after committing the
   * root fallback for a descendant render failure.
   *
   * @param {unknown} error The captured descendant failure.
   * @param {import('react').ErrorInfo} errorInfo React's component-stack context.
   * @returns {void}
   * @author Lee Charles
   * @since 20260902
   * @company Lazy Software
   */
  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) console.error('Application render error captured.', error, errorInfo)
  }

  /**
   * Clears a trapped error after successful navigation changes the reset key.
   * AppErrorBoundary supplies the active location so one failed route cannot
   * permanently block later routes.
   *
   * @param {Readonly<{resetKey?: string}>} previousProps The prior boundary properties.
   * @returns {void}
   * @author Lee Charles
   * @since 20260902
   * @company Lazy Software
   */
  componentDidUpdate(previousProps) {
    if (this.state.hasError && previousProps.resetKey !== this.props.resetKey) {
      this.reset()
    }
  }

  /**
   * Returns the boundary to its normal rendering state for retry, recovery
   * navigation, or route-key changes. ErrorPage receives it as its safe retry
   * handler.
   *
   * @returns {void}
   * @author Lee Charles
   * @since 20260902
   * @company Lazy Software
   */
  reset = () => {
    this.setState({ hasError: false, display: null })
  }

  /**
   * Selects normal descendants or the minimal safe fallback at the root.
   * React calls it for every boundary render in main.jsx.
   *
   * @returns {import('react').ReactNode} Routed descendants or safe recovery UI.
   * @author Lee Charles
   * @since 20260902
   * @company Lazy Software
   */
  render() {
    if (this.state.hasError) {
      return <ErrorPage display={this.state.display} onReset={this.reset} standalone />
    }

    return this.props.children
  }
}

export default ErrorBoundary
