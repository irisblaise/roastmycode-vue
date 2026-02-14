import { test, expect } from '@playwright/test'

test.describe('Roast My Code Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('displays the home page with correct heading and description', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Roast My Code')
    await expect(page.getByText('Get your code roasted by AI')).toBeVisible()
  })

  test('submit button is disabled when code editor is empty', async ({ page }) => {
    await page.waitForSelector('.cm-editor', { timeout: 10000 })

    const submitButton = page.getByRole('button', { name: 'Submit code for roasting' })

    await expect(submitButton).toBeDisabled()
  })

  test('allows user to enter code and submit for roasting', async ({ page }) => {
    await page.waitForSelector('.cm-editor', { timeout: 10000 })

    const codeEditor = page.locator('.cm-content')
    const submitButton = page.getByRole('button', { name: 'Submit code for roasting' })

    await codeEditor.click()
    await codeEditor.fill('const x = 1;\nconsole.log(x);')

    await expect(submitButton).toBeEnabled()

    await submitButton.click()

    await expect(submitButton).toBeDisabled()
    await expect(page.locator('.animate-bounce').first()).toBeVisible()
  })

  test('navigates to archive page', async ({ page }) => {
    const archiveLink = page.getByRole('link', { name: /archive/i })

    await archiveLink.click()

    await expect(page).toHaveURL(/.*archive/)
    await expect(page.locator('h1')).toContainText('Archive')
  })

  test('displays navigation links in header', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'RoastMyCode' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible()
  })
})
