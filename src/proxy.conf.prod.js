const PROXY_CONFIG = [
  {
      context: [
          "/api",
          "/imagens"
      ],
      target: "http://10.9.255.218/apisisac/public",
      secure: false,
      changeOrigin: false,
      logLevel: "debug",
      
  }
]

module.exports = PROXY_CONFIG;