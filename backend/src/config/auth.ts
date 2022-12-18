export default {
  secretToken: process.env.SECRET_TOKEN,
  secretRefreshToken: process.env.SECRET_REFRESH_TOKEN,
  expiresInToken: '1h',
  expiresInRefreshToken: '8h',
  expiresInRefreshTokenHours: 8
}