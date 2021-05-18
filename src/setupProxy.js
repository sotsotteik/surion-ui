const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
const app = express();

module.exports = function(app) {
  app.use(
    '/index/layout',
    createProxyMiddleware({
      target: 'https://surion-api.herokuapp.com/',
      changeOrigin: true,
    })
  );

};