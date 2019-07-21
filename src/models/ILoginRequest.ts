/**
 * @module Authentication
 */

export default interface ILoginRequest {
    /**
     * Username of the user performing the login request
     */
    username: string,
    /**
     * Password of the user performing the login request
     */
    password: string
}
