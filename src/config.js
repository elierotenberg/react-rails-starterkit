module.exports = {
    install: {
        React: require("react"),
        instantiateReactComponent: require("react/lib/instantiateReactComponent"),
        mode: "development",
        //mode: "production",
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
