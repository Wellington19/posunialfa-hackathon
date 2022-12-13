export default {
  secretToken: process.env.SECRET_TOKEN || 'd5e38dd8b49b9c5b3977b2ff323b3f62',
  secretRefreshToken: process.env.SECRET_REFRESH_TOKEN || '60ed63267d5345a0a6f2b38b0504103a',
  expiresInToken: '1h',
  expiresInRefreshToken: '8h',
  expiresInRefreshTokenHours: 8
}