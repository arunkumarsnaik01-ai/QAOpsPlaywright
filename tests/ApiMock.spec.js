const { test, expect } = require('@playwright/test');

// =====================================================
// Constants
// =====================================================

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = BASE_URL + '/api';

const YAHOO_USER = {
    email: 'arunsnaik10@yahoo.com',
    password: 'Arunkumar'
};

const GMAIL_USER = {
    email: 'arunsnaik11@gmail.com',
    password: 'Arunkumar'
};

// =====================================================
// Helper - Login through UI
// =====================================================

async function loginAs(page, user) {

    await page.goto(`${BASE_URL}/auth/login`);

    await page.getByPlaceholder('Enter email').fill(user.email);
    await page.getByPlaceholder('Enter password').fill(user.password);

    await page.getByRole('button', { name: /login/i }).click();

    await page.waitForLoadState('networkidle');
}

// =====================================================
// Assignment
// =====================================================

test('Yahoo booking should not be accessible by Gmail user', async ({
    request,
    page
}) => {

    // =================================================
    // STEP 1 - Login as Yahoo user through API
    // =================================================

    const loginRes = await request.post(`${API_URL}/auth/login`, {
        data: {
            email: YAHOO_USER.email,
            password: YAHOO_USER.password
        }
    });

    expect(loginRes.ok()).toBeTruthy();

    const loginJson = await loginRes.json();

    const token = loginJson.token;

    console.log('Yahoo Token:', token);


    // =================================================
    // STEP 2 - Get events through API
    // =================================================

    const eventsRes = await request.get(`${API_URL}/events`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    expect(eventsRes.ok()).toBeTruthy();

    const eventsJson = await eventsRes.json();

    const eventId = eventsJson.data[0].id;

    console.log('Event ID:', eventId);


    // =================================================
    // STEP 3 - Create booking as Yahoo user
    // =================================================

    const bookingRes = await request.post(`${API_URL}/bookings`, {

        headers: {
            Authorization: `Bearer ${token}`
        },

        data: {
            eventId: eventId,
            customerName: 'Yahoo User',
            customerEmail: YAHOO_USER.email,
            customerPhone: '9876543210',
            quantity: 1
        }
    });

    expect(bookingRes.ok()).toBeTruthy();

    const bookingJson = await bookingRes.json();

    const yahooBookingId = bookingJson.data.id;

    console.log('Yahoo Booking ID:', yahooBookingId);


    // =================================================
    // STEP 4 - Login as Gmail user through UI
    // =================================================

    await loginAs(page, GMAIL_USER);


    // =================================================
    // STEP 5 - Navigate to Yahoo booking as Gmail user
    // =================================================

    await page.goto(
        `${BASE_URL}/bookings/${yahooBookingId}`,
        {
            waitUntil: 'networkidle'
        }
    );


    // =================================================
    // STEP 6 - Validate Access Denied
    // =================================================

    await expect(
        page.getByText('Access Denied')
    ).toBeVisible();

    await expect(
        page.getByText('You are not authorized to view this booking')
    ).toBeVisible();
});