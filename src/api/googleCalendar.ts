import { API_VERSION, CALENDAR_AUTH_URL } from '../constants';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import type { CreateEventObject } from '../types';

dotenv.config();

const serviceAcctAuthClient = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: [CALENDAR_AUTH_URL],
});

// set auth as a global default
google.options({
    auth: serviceAcctAuthClient,
});

const calendar = google.calendar({
    version: API_VERSION,
});

export async function getExistingCalendarEvents() {
    const colors = await calendar.colors.get();
    return colors;
    // const calendarEventList = await calendar.events.list({
    //     calendarId: process.env.GOOGLE_CALENDAR_ID,
    //     orderBy: 'startTime',
    //     singleEvents: true,
    // });
    // return calendarEventList.data.items;
}

export async function createGoogleCalendarEvent(newEvent: CreateEventObject) {
    await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: newEvent,
    });
}
