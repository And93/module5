const TIMEOUT = {
    xs: 1000,
    s: 5000,
    m: 10000,
    l: 15000,
    xl: 20000
};

const SIZE_OF_WINDOW = {
    fullHD: {
        width: 1920,
        height: 1080
    }
}

exports.config = {

    baseUrl: 'https://www.epam.com/',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true,
    globalTimeout: TIMEOUT.xl * 100,
    pageTimeout: TIMEOUT.xl * 100,
    allScriptsTimeout: TIMEOUT.xl * 100,

    specs: [
        'features/**/*.feature'
    ],
    
    capabilities: {
        browserName: 'chrome'
    },
    
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    cucumberOpts: {
        require: ['./step_definitions/**/*.js'],
        tags: false,
        format: ['json:cucumber.json']
    },
    
    onPrepare: () => {
        global.TIMEOUT = TIMEOUT;
        global.ec = protractor.ExpectedConditions;

        const chai = require('chai');

        chai.use(require('chai-as-promised'));
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();

        browser.waitForAngularEnabled(false);
        return browser.driver.manage().window().setSize(SIZE_OF_WINDOW.fullHD.width, SIZE_OF_WINDOW.fullHD.height);
    }
};
