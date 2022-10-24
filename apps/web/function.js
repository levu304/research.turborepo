const { default: next } = require("next");
const nextConfig = require("./next.config");
const { runWith } = require("firebase-functions");

const server = next({
  dev: false,
  conf: { ...nextConfig, distDir: ".next" },
});

const nextjsHandle = server.getRequestHandler();

exports.turboNext = runWith({
  memory: "256MB"
}).https.onRequest((req, res) =>
  server.prepare().then(() => nextjsHandle(req, res))
);
