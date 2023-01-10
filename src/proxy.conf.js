const PROXY_CONFIG = [
  {
      context: [
          "/api",
          "/imagens"
      ],
      target: "http://10.9.235.245/apisisac/public",
      secure: false,
      changeOrigin: true,
      logLevel: "debug"
  }
]

module.exports = PROXY_CONFIG;