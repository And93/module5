const {defineSupportCode} = require('cucumber');

const CareerPage = require('../po/careerPage');
const careerPage = new CareerPage();

defineSupportCode(({Given, When, Then, setDefaultTimeout}) => {
    setDefaultTimeout(TIMEOUT.m);

    Given(/the career page is opened/, () => {
        return careerPage.load();
    });

    When(/'(.+)' is introduced in the keyword field/, keyword => {
        return careerPage.setKeyword(keyword);
    });

    When(/the search button is clicked on/, () => {
        return careerPage.submit();
    });

    Then(/the search form should be visible/, () => {
        return expect(careerPage.searchForm.isDisplayed()).to.eventually.be.true;
    });

    Then(/there should be a job offer for '(.+)' position/, async position => {
        const textInElement = await careerPage.searchResult.getText();
        const regExp = new RegExp(`WE FOUND [0-9]+ JOB OPENINGS RELATED TO "${position.toUpperCase()}"`);
        if (textInElement.search(regExp) === -1) {
            throw new Error(`Text into header is: ${textInElement}, but must be: ${regExp}`);
        }
        return;
    });
});
