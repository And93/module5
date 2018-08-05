const webdriver = require('selenium-webdriver');

function createDriver() {
    const driver = new webdriver.Builder()
        .usingServer('http://localhost:4444/wd/hub')
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    driver.manage().timeouts().implicitlyWait(5000);
    driver.manage().window().setSize(1920, 1080);
    return driver;
}

const browser = createDriver();

function closeBrowser() {
    browser.quit();
}

function assertVisibilityOfElement(element, isVisible) {
    browser.findElement(webdriver.By.css(element))
        .then(element => element.isDisplayed()
            .then(result => {
                if (typeof isVisible === 'boolean' && result !== isVisible) {
                    throw new Error(`Element: ${element} is: ${result} visible, but must be: ${isVisible}`)
                }
            })
            .catch(e => new Error(e))
        )
        .catch(e => new Error(e));
}

async function scrollToElement(element) {
    const elem = await browser.findElement(webdriver.By.css(element));
    browser.executeScript('arguments[0].scrollIntoView(true);', elem);
}

async function searchResultTile(text) {
    browser.findElement(webdriver.By.className('search-result__heading'))
        .then(element =>  element.getText()
            .then(textInElement => {
                const regExp = new RegExp(`WE FOUND [0-9]+ JOB OPENINGS${' ' + text}`);
                if (textInElement.search(regExp) === -1) {
                    throw new Error(`Text into header is: ${textInElement}, but must be: ${regExp}`)
                }
            })
            .catch(e => new Error(e))
        )
        .catch(e => new Error(e));
}


browser.get('https://www.epam.com');
browser.findElement(webdriver.By.css('[href="/what-we-do"]')).then(element => browser.actions().mouseMove(element).perform());
assertVisibilityOfElement('.top-navigation__sub-list-wrapper', true);
browser.navigate().refresh();        
scrollToElement('.section__icon-plus');
browser.findElement(webdriver.By.css('.button-ui.bg-color-white[href="/careers"]')).click();
browser.findElement(webdriver.By.css('[placeholder="Keyword or job ID"]')).sendKeys('Test Automation Engineer');
browser.findElement(webdriver.By.className('job-search__submit')).click();
searchResultTile('RELATED TO "TEST AUTOMATION ENGINEER"');
closeBrowser();