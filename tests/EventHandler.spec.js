const { test, expect } = require('@playwright/test');

async function loginPage1(page) {

    await page.goto("https://eventhub.rahulshettyacademy.com");

    await page.waitForLoadState('networkidle');

    await page.getByPlaceholder('you@email.com').fill('arun_1@gmail.com');

    await page.getByLabel("password").fill('bj2D6tnea#qv8kH');

    await page.locator("#login-btn").click();

    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
    

}
function futureDateValue() {
    const date = new Date();

    date.setDate(date.getDate() + 3);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

test('EventManagement', async ({ page }) => {

    await loginPage1(page);
    const eventTitle = `Test Event ${Date.now()}`;
    console.log(eventTitle)
    await page.getByRole('button',{name:'Admin'}).click();
    await page.locator("[href*='/admin/events']").nth(0).click();
    await page.locator("#event-title-input").fill(eventTitle);
    await page.locator("#admin-event-form textarea").fill("Music Concert");
    await page.getByLabel('City').fill("Bangalore")
    await page.locator('#venue').fill("KR puram-Devasandra");
    const futureDate=futureDateValue()
    console.log(futureDate)
   // await page.getByLabel('Event Date & Time').pressSequentially(futureDate,{delay:150});
   await page.getByLabel('Event Date & Time').fill(futureDate);
     await page.locator("[placeholder='0.00']").click();
    await page.locator("[placeholder='0.00']").fill('100');
    await page.getByLabel('Total Seats').fill('50');
    await page.locator("#add-event-btn").click();
    expect(page.getByText('Event created!')).toBeVisible();
    console.log(eventTitle);
    await page.locator('#nav-events').click();
    //const allevent= page.locator('[data-testid="event-card"]')
    await expect(page.locator('[data-testid="event-card"]').nth(1)).toBeVisible();
    const matchedcard = page.locator('[data-testid="event-card"]').filter({ hasText: eventTitle });
    await expect(matchedcard).toBeVisible();
    const beforeseat = await matchedcard.getByText('seats available').textContent();

console.log(beforeseat);
    var bseat=beforeseat.split(" ")[0].trim();
    console.log(bseat);
   // await matchedcard.getByRole('button',{name:'Book Now'}).click();
   await matchedcard.locator('[data-testid="book-now-btn"]').click();
   await expect(page.locator('#ticket-count')).toHaveText('1');
   await page.getByLabel("Full Name").fill("Arunkumar");
   await page.locator('#customer-email').fill('arun_1@gmail.com');
   await page.getByPlaceholder('+91 98765 43210').fill('98765 43210')
   await page.locator('.confirm-booking-btn').click();
   await expect(page.locator('.booking-ref').first()).toBeVisible();
   const bookingRef=(await page.locator('.booking-ref').textContent()).trim();
   console.log(bookingRef);
   await page.getByRole('button',{name:'View My Bookings'}).click();
   await expect(page).toHaveURL(/\/bookings/);
   const allcards= page.locator("#booking-card");
   await expect(allcards.first()).toBeVisible();
   const bookedcard= page.locator('.booking-ref').filter({hasText:bookingRef})
   await expect(bookedcard).toBeVisible();
   await expect(page.locator('#booking-card h3').filter({hasText:eventTitle})).toBeVisible();
   await page.locator('[data-testid="nav-events"]').click();
   await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible()
   const eventmatch1=page.locator('[data-testid="event-card"]');
   const eventmathedTitle=page.locator('[data-testid="event-card"]').filter({hasText:eventTitle});
   await expect(eventmathedTitle).toBeVisible();
   const afterseat= await matchedcard.getByText('seats available').textContent();
   const afseat=afterseat.split(' ')[0].trim();
   console.log(afseat)
   console.log('Beforeseat',bseat,"===",'afterseat',afseat)
   expect(afseat==bseat-1).toBeTruthy()
});