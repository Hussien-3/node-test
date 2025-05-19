class appError extends Error {
    constructor () {
        super();
    }

    creat(massage, statusCode, statusText) {
        this.massage = massage
        this.statusCode = statusCode
        this.statusText = statusText
        return this
    }
}

module.exports = new appError