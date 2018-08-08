class CareerPage {

    constructor() {
        this.logo = element(by.css('a.logo'));
        
        this.searchForm = $('[data-view="searchForm"]');
        this.keywordField = $('[placeholder="Keyword or job ID"]');
        this.submitButton = $('.recruiting-search__submit');

        this.searchResult = $('.search-result__heading');
    };

    load() {
        browser.get('careers');
        return browser.wait(ec.visibilityOf(this.searchForm), TIMEOUT.m);
    };

    setKeyword(keyword) {
        this.keywordField.isDisplayed().then(displayed => {
            if (!displayed) {
                browser.wait(ec.visibilityOf(this.keywordField), TIMEOUT.m);
            }
            return this.keywordField.sendKeys(keyword)
        }, e => this.keywordField.sendKeys(keyword));
    };

    submit() {
        this.submitButton.click();
        return browser.wait(ec.invisibilityOf(this.searchForm), TIMEOUT.m);
    };
}

module.exports = CareerPage;