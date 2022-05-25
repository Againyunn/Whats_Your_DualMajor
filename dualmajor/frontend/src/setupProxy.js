const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/', {
          target: 'http://localhost:8080', //서버 연결 및 git push할 때는 반드시 8080포트로 설정
          // target: 'http://localhost:3000', //프론트만 체크할 때는 변경
          changeOrigin: true
      })
  )
};