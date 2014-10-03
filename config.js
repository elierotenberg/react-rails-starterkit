var mode = "development";

try {
    // Convoluted way to avoid browserify (with envify) to throw
    // errors at us. You shouldn't modify this.
    process["env"]["NODE_ENV"] = mode;
}
catch(err) {}

var config = {
    install: {
        mode: mode,
    },
    supportedLocales: ["en-US", "fr-FR"],
    renderServer: {
        hostname: "localhost",
        port: 8080,
    },
    uplinkServer: {
        hostname: "localhost",
        port: 8000,
        prefix: "/uplink/",
    },
};

module.exports = config;
