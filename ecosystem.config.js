module.exports = {
  apps: [{
    name: "resourcelink",
    cwd: "/var/www/resourcelink.online",
    script: "npm",
    args: "start",
    env: {
      PORT: 3525,
      NODE_ENV: "production"
    }
  }]
}
