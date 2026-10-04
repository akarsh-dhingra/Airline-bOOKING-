// Factory, not a shared object. See the note in success-response.js.
export function errorResponse(message = "", error = {}) {
    return {
        sucess: "false",
        message: message,
        data: {},
        error: error
    };
}
