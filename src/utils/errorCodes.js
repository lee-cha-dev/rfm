/**
 * Maps supported HTTP-style status codes to patient-safe display copy.
 * This project-owned catalog centralizes error language for the routed error
 * interfaces and application boundary introduced in Sprint 8.
 *
 * @type {Readonly<Record<string | number, Readonly<{title: string, message: string}>>>}
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export const ERROR_CODES = {
    400: {
        title: "Bad Request",
        message: "The server could not understand the request due to invalid syntax.",
    },
    401: {
        title: "Unauthorized",
        message: "Authentication is required and has failed or has not yet been provided.",
    },
    402: {
        title: "Payment Required",
        message: "Payment is required to access this resource.",
    },
    403: {
        title: "Forbidden",
        message: "You do not have permission to access this requested resource.",
    },
    404: {
        title: "Page Not Found",
        message: "The requested resource could not be found on the server.",
    },
    405: {
        title: "Method Not Allowed",
        message: "The request method is known by the server but is not supported.",
    },
    406: {
        title: "Not Acceptable",
        message: "The server cannot produce a response matching the criteria given in the request headers.",
    },
    407: {
        title: "Proxy Authentication Required",
        message: "Authentication with a proxy server is required before this request can be served.",
    },
    408: {
        title: "Request Timeout",
        message: "The server timed out waiting for the request.",
    },
    409: {
        title: "Conflict",
        message: "The request could not be completed due to a conflict with the current state.",
    },
    410: {
        title: "Gone",
        message: "The requested resource has been permanently removed and will not be available again.",
    },
    411: {
        title: "Length Required",
        message: "The server requires the Content-Length header to be included in the request.",
    },
    412: {
        title: "Precondition Failed",
        message: "The server does not meet one or more of the preconditions set in the request headers.",
    },
    413: {
        title: "Content Too Large",
        message: "The request body exceeds the limit the server is willing or able to process.",
    },
    414: {
        title: "URI Too Long",
        message: "The URI provided was too long for the server to process.",
    },
    415: {
        title: "Unsupported Media Type",
        message: "The server does not support the media format of the requested data.",
    },
    416: {
        title: "Range Not Satisfiable",
        message: "The range specified in the request header cannot be fulfilled by the server.",
    },
    417: {
        title: "Expectation Failed",
        message: "The server cannot meet the requirements of the Expect request header.",
    },
    418: {
        title: "I'm a Teapot",
        message: "The server refuses to brew coffee because it is, permanently, a teapot.",
    },
    419: {
        title: "Page Expired",
        message: "Your session has expired due to inactivity. Please refresh the page and try again.",
    },
    421: {
        title: "Misdirected Request",
        message: "The request was directed at a server that is not able to produce a response.",
    },
    422: {
        title: "Unprocessable Entity",
        message: "The server understands the content type but was unable to process the contained instructions.",
    },
    423: {
        title: "Locked",
        message: "The resource that is being accessed is locked.",
    },
    424: {
        title: "Failed Dependency",
        message: "The request failed because it depended on another request that also failed.",
    },
    425: {
        title: "Too Early",
        message: "The server is unwilling to risk processing a request that might be replayed.",
    },
    426: {
        title: "Upgrade Required",
        message: "The server refuses to perform the request using the current protocol.",
    },
    428: {
        title: "Precondition Required",
        message: "The server requires the request to be conditional to prevent lost updates.",
    },
    429: {
        title: "Too Many Requests",
        message: "You have sent too many requests in a given amount of time. Please slow down.",
    },
    431: {
        title: "Request Header Fields Too Large",
        message: "The server is unwilling to process the request because its header fields are too large.",
    },
    444: {
        title: "No Response",
        message: "The server returned no information to the client and closed the connection.",
    },
    451: {
        title: "Unavailable For Legal Reasons",
        message: "This resource has been made unavailable as a result of a legal demand.",
    },
    499: {
        title: "Client Closed Request",
        message: "The connection was closed by the client while the server was still processing the request.",
    },
    500: {
        title: "Internal Server Error",
        message: "The server encountered an unexpected condition that prevented it from fulfilling the request.",
    },
    501: {
        title: "Not Implemented",
        message: "The server does not support the functionality required to fulfill the request.",
    },
    502: {
        title: "Bad Gateway",
        message: "The server received an invalid response from the upstream server.",
    },
    503: {
        title: "Service Unavailable",
        message: "The server is currently unable to handle the request due to a temporary overload or maintenance.",
    },
    504: {
        title: "Gateway Timeout",
        message: "The server did not receive a timely response from the upstream server.",
    },
    505: {
        title: "HTTP Not Supported",
        message: "The HTTP version used in the request is not supported by the server.",
    },
    506: {
        title: "Variant Also Negotiates",
        message: "The server has an internal configuration error in the content negotiation process.",
    },
    507: {
        title: "Insufficient Storage",
        message: "The server is unable to store the representation needed to complete the request.",
    },
    508: {
        title: "Loop Detected",
        message: "The server detected an infinite loop while processing the request.",
    },
    509: {
        title: "Bandwidth Limit Exceeded",
        message: "The server has exceeded the bandwidth limit specified by the administrator.",
    },
    510: {
        title: "Not Extended",
        message: "Further extensions to the request are required for the server to fulfill it.",
    },
    511: {
        title: "Authentication Required",
        message: "Network authentication is required before this request can be served.",
    },
    520: {
        title: "Web Server Returned an Unknown Error",
        message: "The origin server returned an empty, unknown, or unexpected response.",
    },
    521: {
        title: "Web Server Is Down",
        message: "The origin server refused the connection from the edge server.",
    },
    522: {
        title: "Connection Timed Out",
        message: "A TCP connection could not be established with the origin server.",
    },
    523: {
        title: "Origin Is Unreachable",
        message: "The edge server could not reach the origin server. The routing or DNS records may be incorrect.",
    },
    524: {
        title: "A Timeout Occurred",
        message: "A TCP connection was made, but the origin server did not reply with a timely HTTP response.",
    },
    525: {
        title: "SSL Handshake Failed",
        message: "The edge server could not negotiate a successful SSL/TLS handshake with the origin server.",
    },
    526: {
        title: "Invalid SSL Certificate",
        message: "The edge server could not validate the SSL/TLS certificate presented by the origin server.",
    },
    527: {
        title: "Railgun Error",
        message: "The connection between the edge server and the origin server was interrupted.",
    },
    default: {
        title: "Something Went Wrong",
        message: "An unexpected error occurred. Please try again or contact support if the problem persists.",
    },
};
