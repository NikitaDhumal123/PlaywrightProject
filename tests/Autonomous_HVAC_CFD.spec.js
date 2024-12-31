const { test, expect } = require('@playwright/test');

async function loginAndNavigateToSimulationGallery(page) {

    // Go to the login page
    await page.goto("https://accounts.simulationhub.com/login");

    // Fill the username and password fields
    const userName = page.locator("#l_email");
    await userName.fill("nikita.dhumal@cctech.co.in");
    await page.locator("#btn_get_user").click(); // Click on the "Get User" button

    const password = page.locator("#l_password");
    await password.fill("Nikita@1234");
    await page.locator("#btn_login_reg").click(); // Click on the "Login" button

    // Locate and click on the 'LEARN' dropdown
    const dropdown = page.locator("//div[@class='ui dropdown item' and contains(text(), 'LEARN')]");
    await dropdown.click();

    // Wait for the dropdown menu to appear
    const targetOption = page.locator(".menu .item.dropdownLink", { hasText: "Simulation gallery" });
    await targetOption.click();

    // Wait for the new page content to load after navigation
    await page.waitForSelector("h1 span"); // Wait until the target element appears on the new page

    // Get the text content of the element
    const elementText = await page.locator("h1 span").filter({ hasText: "Autonomous HVAC CFD" }).textContent();

    // Click on the "View Gallery" link
    await page.locator("//body/div[2]/div[2]/div[1]/div[2]/a[1]").click();
    return elementText;
    // await page.pause();
}

test('login Homepage', async ({ browser }) => {
    // Set up a context with the desired viewport
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 } // Setting resolution here
    });

    const page = await context.newPage();
    const elementText = await loginAndNavigateToSimulationGallery(page);
    console.log(elementText);
    // Assert that the text content matches the expected value
    expect(elementText).toContain("Autonomous HVAC CFD");
});

async function waitAndClick(page, text, options = {}) {
    console.log(`Waiting for "${text}"...`);
    const locator = page.getByText(text, { exact: true, ...options });
    await locator.waitFor({ state: 'visible', timeout: options.timeout || 30000 });
    await locator.click();
    console.log(`Clicked "${text}".`);
}


    //await page.pause();

module.exports = { loginAndNavigateToSimulationGallery };





