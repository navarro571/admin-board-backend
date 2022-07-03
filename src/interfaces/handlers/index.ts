interface ReqError extends Error {
    isBoom?: any,
    output?: any
}

export {
    ReqError
}