module.exports = {
  apps: [{
    name: "remodel.monster",
    cwd: "/var/www/remodel.monster",
    script: "npm",
    args: "start",
    env: {
      PORT: 3525,
      NODE_ENV: "production"
    }
  }]
}
