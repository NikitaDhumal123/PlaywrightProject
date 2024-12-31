const { test, expect } = require('@playwright/test');

test('Validate Flowline Section', async ({ browser }) => {
    // Set the test timeout to ensure enough time for execution
    test.setTimeout(60000);

    // Set up a context with the desired viewport
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();
    await page.goto("https://autonomous-hvac-cfd.simulationhub.com/public/TJ7vOb9/Xb8MtB_:pauQCUa:2MS23YZ/results");

    // Ensure the 'Flow Lines' section is visible and clickable
    const flowLinesLocator = page.locator("(//span[normalize-space()='Flow Lines'])[1]");
    await flowLinesLocator.waitFor({ state: 'visible', timeout: 5000 });  // Wait for the element to be visible
    await flowLinesLocator.click();

    await page.waitForTimeout(3000);

    // Click the dropdown to show options
    const dropdown = page.locator("#criteria-customized-native-simple");
    await dropdown.click();
    await dropdown.selectOption("Velocity");

    // Click on the Apply button
    await page.locator("(//span[normalize-space()='Apply'])[1]").click();
    
    // Unchecked and checked settings
    const AnimateFlow = page.locator("input[value='Animate Flow']");
    await AnimateFlow.uncheck();
    
    const ShowFlowlines = page.locator("(//input[@value='Show Flowlines'])[1]");
    await ShowFlowlines.uncheck();

    // Assert that the 'Animate Flow' checkbox is unchecked
    await expect(AnimateFlow).not.toBeChecked();

    // Assert that the 'Show Flowlines' checkbox is unchecked
    await expect(ShowFlowlines).not.toBeChecked();

    const bubbleOpacity = page.locator("//input[@value='Bubble Opacity']");
    await expect(bubbleOpacity).not.toBeChecked();
    // Optionally, log the success
    console.log('Three checkboxes are successfully unchecked.');
    
    //Checked all three checkedboxes
    await AnimateFlow.check();
    await ShowFlowlines.check();
    await bubbleOpacity.check();
    console.log('Three checkboxes are successfully checked.');
    
    //await page.pause();
});
