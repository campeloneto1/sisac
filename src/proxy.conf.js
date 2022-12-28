const PROXY_CONFIG = [
  {
      context: [
          "/api",
          "/imagens"
      ],
      target: "http://10.9.235.245:8080/apisisac/public",
      secure: true,
      changeOrigin: true,
      logLevel: "debug"
  }
]

module.exports = PROXY_CONFIG;