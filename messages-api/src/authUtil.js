const crypto = require("crypto")

const secret = process.env.MESSAGES_HMAC_KEY || `development`
const secretBuffer = Buffer.from(secret, "base64")

const validateAuthMiddleware = (req, _res, next) => {
  const authHeader = getAuthorizationHeader(req)
  const hmacFromBody = calculateHashOfBuffer(secretBuffer, req.bodyBuffer)
  const isValid = isAuthorizedRequest(authHeader, hmacFromBody)
  if (isValid) return next()
  throwForbiddenError()
}

const getAuthorizationHeader = req => {
  const { authorization } = req.headers
  if (!authorization) throwForbiddenError()
  return authorization
}

const calculateHashOfBuffer = (secretBuffer, contentBuffer) => {
  return crypto
    .createHmac("sha256", secretBuffer)
    .update(contentBuffer)
    .digest("base64")
}

const isAuthorizedRequest = (authorizationHeader, hmacFromBody) => {
  return authorizationHeader === `HMAC ${hmacFromBody}`
}

const throwForbiddenError = () => {
  const forbiddenError = new Error("Forbidden")
  forbiddenError.status = 403
  throw forbiddenError
}

const addBodyBufferOptions = {
  verify: function(req, _res, buf) {
    req.bodyBuffer = buf || Buffer.from("")
  }
}

module.exports = {
  validateAuthMiddleware,
  getAuthorizationHeader,
  isAuthorizedRequest,
  calculateHashOfBuffer,
  addBodyBufferOptions
}
