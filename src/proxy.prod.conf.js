const PROXY_CONFIG = [
  {
      context: [
          "/api",
          "/imagens"
      ],
      target: "http://10.9.235.245",
      secure: false,
      changeOrigin: true,
      logLevel: "debug",
      pathRewrite: {
        "^/api" : "/apisisac/public/api"
      }
  }
]

module.exports = PROXY_CONFIG;