const puppeteer = require("puppeteer");
const path = require('path');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe("Generate on start", () => {
    it("Three random colors should be generated when page loads", async () => {
        const bgColors = await page.$$eval('body *', els => els.map(el => getComputedStyle(el).backgroundColor));
        expect(new Set(bgColors).size).toBeGreaterThan(2)
    })
})
describe("Add more colors", () => {
    it("Input field should exist on page", async () => {
        const input = await page.$('input[type="text"],input[type="number"]');
        expect(input).toBeTruthy();
    });
    it("Button 'Add colors' should exist on page", async () => {
        const button = await page.$x("//*[text()[contains(.,'Add')]]")
        expect(button.length).toBeTruthy();
    });
    it("Should add the specified number of new colors", async () => {
        const input = await page.$('input[type="text"],input[type="number"]');
        const submitButton = await page.$x("//*[text()[contains(.,'Add')]]")
        let bgColors = await page.$$eval('body *', els => els.map(el => getComputedStyle(el).backgroundColor));
        const numUniqueColors = new Set(bgColors).size
        await input.click({ clickCount: 2 });
        await input.type('5');
        await submitButton[0].click();
        await page.waitForTimeout(500);
        bgColors = await page.$$eval('body *', els => els.map(el => getComputedStyle(el).backgroundColor));
        const numUniqueColorsAfterAdd = new Set(bgColors).size
        expect(numUniqueColorsAfterAdd - numUniqueColors).toBe(5)
    });
});
describe("Delete colors", () => {
    it("Removing/deleting color container should be possible", async () => {
        const deleteBtn = await page.$x("//*[contains(text(), 'X') or contains(text(), 'x')]")
        let bgColors = await page.$$eval('body *', els => els.map(el => getComputedStyle(el).backgroundColor));
        const numUniqueColors = new Set(bgColors).size
        await deleteBtn[0].click();
        await page.waitForTimeout(500);
        bgColors = await page.$$eval('body *', els => els.map(el => getComputedStyle(el).backgroundColor));
        const numUniqueColorsAfterDelete = new Set(bgColors).size
        expect(numUniqueColors - numUniqueColorsAfterDelete).toBe(1)
    });
});
