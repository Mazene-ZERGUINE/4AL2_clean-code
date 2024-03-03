import { test, expect } from '@playwright/test';

test.use({ headless: false });

test('test creation of new card', async ({ page }) => {
	await page.goto('http://localhost:4200/leitner-box/dashboard');

	await page.click('#add_list_btn');
	await page.waitForTimeout(1000);

	await page.fill("#tag_input", "teamwork");
	await page.waitForTimeout(1000);

	await page.fill("#question_input", "my question");
	await page.waitForTimeout(1000);

	await page.fill("#answer_input", "my answer");
	await page.waitForTimeout(1000);

	await page.click("#add_new_card_btn");

	await page.waitForSelector('.mat-mdc-snack-bar-label');

	const snackbarText = await page.textContent('.mat-mdc-snack-bar-label');

	await expect(snackbarText).toContain("You added new card");
});

test('test created card to be in first category', async ({ page }) => {
	await page.goto('http://localhost:4200/leitner-box/dashboard');

		const pageContent = await page.content();

		await expect(pageContent.includes('Teamwork')).toBeTruthy();
});
