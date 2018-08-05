describe('Simple tests applications with Angular and without', () => {

    it('should simple check Angular application', async () => {
        await browser.get('https://angularjs.org/');
        await expect(await browser.getTitle()).toEqual('AngularJS — Superheroic JavaScript MVW Framework');
        await browser.$('.hero [href="https://angular.io"]').click();

        const tabs = await browser.getAllWindowHandles();
        await browser.switchTo().window(tabs[1]);
        await expect(await browser.getTitle()).toEqual('Angular');
        await browser.$('.home-row .card').click();
        await expect(await browser.getTitle()).toEqual('Angular - QuickStart');
    });

    it('should simple check no Angular application', async function () {

        browser.waitForAngularEnabled(false);
        await browser.get('https://www.epam.com');
        await expect(await browser.getTitle()).toEqual('EPAM | Software Product Development Services');

        const whatWeDoTab = await browser.$('[href="/what-we-do"]');

        await browser.actions().mouseMove(whatWeDoTab).perform();
        await expect(await browser.$('.top-navigation__sub-list-wrapper').isDisplayed()).toBe(true);
        await browser.$('.button-ui.bg-color-white[href="/careers"]').click();
        await browser.$('[placeholder="Keyword or job ID"]').sendKeys('Test Automation Engineer');
        await browser.$('.job-search__submit').click();
        await browser.pause(5000)
    });
});
