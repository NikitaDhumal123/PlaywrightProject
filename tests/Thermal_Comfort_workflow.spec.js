// Thermal_Comfort_workflow.spec.js
const { loginAndNavigateToSimulationGallery } = require('../tests/Autonomous_HVAC_CFD.spec');
const { test, expect } = require('@playwright/test');

test('Locat and Verify the Project', async ({ browser }, testInfo) => {
    testInfo.setTimeout(60000); // Increase test timeout to 60 seconds
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });

    const page = await context.newPage();

    // Call the loginAndNavigateToSimulationGallery function
    await loginAndNavigateToSimulationGallery(page);

    console.log('Waiting for element "simulationHub Office"...');
    const elementText1 = await page.locator("//span[contains(text(),'simulationHub Office')]")
        .filter({ hasText: "simulationHub Office" })
        .textContent();
    console.log(`Element Text Found: ${elementText1}`);

    await page.locator("#TJ7vOb9").waitFor({ state: 'visible' });
    await page.locator("#TJ7vOb9").click();

    // Click on "Design Configuration 4"
    await waitAndClick(page, 'Design Configuration 4', { timeout: 30000 });

    // Click on "Cooling- Full Occupancy"
    await waitAndClick(page, 'Cooling- Full Occupancy');                                                                                                                                                                                                                        

    // Click on "Office Room 8"                                                                                                                                                 
    await waitAndClick(page, 'Office Room 8');

    // Locate the "Thermal Comfort" button
    const thermalComfortLocator = page.locator("(//span[normalize-space()='Thermal Comfort'])[1]");

    // Retrieve the text content of the button
    const thermalComfortText = await thermalComfortLocator.textContent();
    console.log(`Button Text: ${thermalComfortText}`);

    // Click the "Thermal Comfort" button
    await thermalComfortLocator.click();
    await expect(page).toHaveURL("https://autonomous-hvac-cfd.simulationhub.com/public/TJ7vOb9/Xb8MtB_:pauQCUa:2MS23YZ/results/thermalcomfort?showAnimation=true");
    const currentURL = page.url();
    console.log("Thermal Comfort URL validated successfully: " + currentURL);
    await page.locator("//tbody/tr[1]/td[3]/button[1]/span[1]//*[name()='svg']").click();
    await page.waitForTimeout(2000);
});
