import { createGoogleCalendarEvent } from '../api';
import {
    KCI_ADDRESS,
    KCI_CALENDAR_COLOR,
    KCI_CALENDAR_TIME_ZONE,
    LIC_ADDRESS,
    LIC_CALENDAR_COLOR,
    LIC_CALENDAR_TIME_ZONE,
    LOCATIONS,
} from '../constants';
import type { CreateEventObject, Location, TimeZone } from '../types';

function getLocationDetails(location: Location) {
    let locationAddress = '';
    let locationPrefix = '';
    let calendarColor = '';
    let timeZone: TimeZone = LIC_CALENDAR_TIME_ZONE;

    switch (location) {
        case LOCATIONS.kci:
            locationAddress = KCI_ADDRESS;
            locationPrefix = 'KCI - ';
            calendarColor = KCI_CALENDAR_COLOR;
            timeZone = KCI_CALENDAR_TIME_ZONE;
            break;
        case LOCATIONS.lic:
            locationAddress = LIC_ADDRESS;
            locationPrefix = 'Lynwood - ';
            calendarColor = LIC_CALENDAR_COLOR;
            timeZone = LIC_CALENDAR_TIME_ZONE;
            break;
        default:
            throw new Error('Invalid location');
    }

    return { calendarColor, locationAddress, locationPrefix, timeZone };
}

export interface NewEventObject {
    endDateTime: string;
    location: Location;
    startDateTime: string;
    title: string;
}

export function getNewEventObject({
    endDateTime,
    location,
    startDateTime,
    title,
}: NewEventObject) {
    const { calendarColor, locationAddress, locationPrefix, timeZone } =
        getLocationDetails(location);
    const newEventObject: CreateEventObject = {
        colorId: calendarColor,
        description: title,
        eventType: 'default',
        location: locationAddress,
        summary: locationPrefix + title,
        end: {
            dateTime: endDateTime,
            timeZone,
        },
        start: {
            dateTime: startDateTime,
            timeZone,
        },
    };
    return newEventObject;
}

export async function createGoogleCalendarEvents(events: CreateEventObject[]) {
    console.log('Creating Google Calendar events...');
    let eventsCreated = 0;
    for (let i = 0; i < events.length; i++) {
        try {
            await createGoogleCalendarEvent(events[i]);
            eventsCreated++;
        } catch (error) {
            console.error('Error in creating Google Calendar event: ', error);
            console.info('Event failed to create: ', events[i]);
            console.info('Continuing to create the next event...');
        }
    }
    console.log(
        `Successfully created ${eventsCreated} Google Calendar events!`
    );
}

/** Calendar Color Ids */
// '1': { background: '#a4bdfc', foreground: '#1d1d1d' },
//   '2': { background: '#7ae7bf', foreground: '#1d1d1d' },
//   '3': { background: '#dbadff', foreground: '#1d1d1d' },
//   '4': { background: '#ff887c', foreground: '#1d1d1d' },
//   '5': { background: '#fbd75b', foreground: '#1d1d1d' },
//   '6': { background: '#ffb878', foreground: '#1d1d1d' },
//   '7': { background: '#46d6db', foreground: '#1d1d1d' },
//   '8': { background: '#e1e1e1', foreground: '#1d1d1d' },
//   '9': { background: '#5484ed', foreground: '#1d1d1d' },
//   '10': { background: '#51b749', foreground: '#1d1d1d' },
//   '11': { background: '#dc2127', foreground: '#1d1d1d' }
