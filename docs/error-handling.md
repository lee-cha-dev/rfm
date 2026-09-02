# Error handling and recovery

The application root wraps the complete route tree in `ErrorBoundary`. Render
failures are normalized through `ERROR_CODES` and replaced with a branded safe
fallback. The fallback never renders the exception, component stack, browser
state, or patient-entered values. Retry clears the boundary; Home and Contact
clear it before client-side recovery navigation. A location-key change also
resets a trapped boundary so one failed route cannot hold later routes.

The wildcard route is a separate 404 interface. It represents a valid router
match for an unknown URL and does not simulate or trigger a render error.

React error boundaries do not catch failures in event handlers, asynchronous
callbacks such as timers or request continuations, server rendering, or the
boundary's own render and lifecycle code. Those failures must be handled at
their local owner if those capabilities are introduced later.

Vite development and preview servers provide history fallback to `index.html`.
The copied `public/_redirects` rule preserves the same behavior on compatible
static deployment targets by rewriting all direct route requests to the built
application entry point. A different eventual host must receive the equivalent
SPA rewrite as part of its separately authorized deployment workflow.
