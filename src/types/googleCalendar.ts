import {
    KCI_CALENDAR_TIME_ZONE,
    LIA_CALENDAR_TIME_ZONE,
    OVA_CALENDAR_TIME_ZONE,
} from '../constants';
import type { calendar_v3 } from 'googleapis';

export interface NewCalendarEvent {
    attendees: [{ email: 'jacob.andes@gmail.com' }];
    eventType: string;
    location: string;
    summary: string;
    description: string;
    end: calendar_v3.Schema$EventDateTime;
    start: calendar_v3.Schema$EventDateTime;
}

export interface CreateEventObject {
    colorId: string;
    description: string;
    eventType: 'default';
    location: string;
    summary: string;
    end: {
        dateTime: string;
        timeZone:
            | typeof KCI_CALENDAR_TIME_ZONE
            | typeof LIA_CALENDAR_TIME_ZONE
            | typeof OVA_CALENDAR_TIME_ZONE;
    };
    start: {
        dateTime: string;
        timeZone:
            | typeof KCI_CALENDAR_TIME_ZONE
            | typeof LIA_CALENDAR_TIME_ZONE
            | typeof OVA_CALENDAR_TIME_ZONE;
    };
}
