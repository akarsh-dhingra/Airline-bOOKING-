// These were module-level singleton objects that controllers mutated in place
// (`successResponse.data = x`) and then serialised. Every request shared the same
// object, so two concurrent requests could overwrite each other's payload. They are
// factories now, so each response is built fresh.
export function successResponse(data = {}) {
    return {
        sucess: "true",
        message: "Successfully completed the request",
        data: data,
        error: {}
    };
}
