exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js'],
    capabilities: {
        browserName: 'chrome'
    },

    onPrepare: function() {
        browser.driver.manage().window().setSize(1920, 1080);
        browser.waitForAngularEnabled(true);
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 60000
    }
};
