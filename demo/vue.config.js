module.exports = {
  devServer: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000/socket.io/', // 你自己的api接口地址
        changeOrigin: true,
        ws: true
      },
      'socketjs-node': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: false
      }
    }
  }
}
