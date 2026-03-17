module.exports = {
  apps: [{
    name: "remodelnow.monster",
    cwd: "/var/www/remodel.monster",
    script: "npm",
    args: "start",
    env: {
      PORT: 3525,
      NODE_ENV: "production"
    }
  }]
}
