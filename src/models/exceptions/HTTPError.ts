/**
 * Defines a throwable subclass of Error used for signaling an HTTP status code.
 */
class HTTPError extends Error {
    /**
     * The HTTP status code.
     */
    readonly statusCode: number;

    /**
     * The body of the response.
     */
    readonly body: any;

    /**
     * The header fields
     */
    readonly headers: any;

    /**
     * Constructor for the HTTPError class
     * @param statusCode - the HTTP status code
     * @param body - the response body
     * @param headers - the response headers
     */
    constructor(statusCode: number, body: any, headers?: any) {
        super();
        this.statusCode = statusCode;
        if (headers) this.headers = headers;
        this.body = body;
    }
}

export default HTTPError;
