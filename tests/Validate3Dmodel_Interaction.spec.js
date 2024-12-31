const { test } = require('@playwright/test');

test('Validate3Dmodel_Interaction', async ({ browser }) => {
    // Set the test timeout to ensure enough time for execution
    test.setTimeout(120000);

    // Set up a context with the desired viewport
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();

    try {
        // Navigate to the page
        console.log('Navigating to the page...');
        await page.goto("https://autonomous-hvac-cfd.simulationhub.com/public/TJ7vOb9/Xb8MtB_:pauQCUa:2MS23YZ/results", { waitUntil: 'domcontentloaded' });

        // Wait for the 3D canvas to load
        console.log('Waiting for canvas...');
        const canvasSelector = 'canvas'; // Update with the actual canvas selector
        await page.waitForSelector(canvasSelector, { timeout: 60000 });
        console.log('Canvas loaded.');

        // Focus on the canvas to ensure interaction
        await page.hover(canvasSelector);

        // Simulate zoom-in using mouse drag (instead of wheel)
        console.log('Performing zoom-in using mouse drag...');
        await page.mouse.move(500, 500); // Move to the center of the canvas
        await page.mouse.down();
        for (let i = 0; i < 50; i++) {
            // Dragging down to simulate zoom-in action
            await page.mouse.move(500, 500 + i, { steps: 5 });
        }
        await page.mouse.up();
        console.log('Zoom-in drag completed.');

        // Wait briefly to observe the effect
        await page.waitForTimeout(3000);

        // Simulate zoom-out using mouse drag
        console.log('Performing zoom-out using mouse drag...');
        await page.mouse.move(500, 500); // Reset mouse position
        await page.mouse.down();
        for (let i = 0; i < 50; i++) {
            // Dragging up to simulate zoom-out action
            await page.mouse.move(500, 500 - i, { steps: 5 });
        }
        await page.mouse.up();
        console.log('Zoom-out drag completed.');

        // Wait briefly to observe the effect
        await page.waitForTimeout(3000);

    } catch (error) {
        console.error('Error during test execution:', error);
    } finally {
        // Close the browser context
        console.log('Closing browser context...');
        await context.close();
    }
});
