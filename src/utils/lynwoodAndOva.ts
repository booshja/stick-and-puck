import { getDaylightSavings } from '../api';
import { LOCATIONS } from '../constants';
import type { LiaOvaEvent, PacificTimeAbbreviation } from '../types';
import { getNewEventObject, type NewEventObject } from './googleCalendar';

export function convertToLiaOvaDate(
    date: string,
    timeZone: PacificTimeAbbreviation
) {
    let newDate = date.split('T')[0];
    const timeZoneHour = timeZone === 'PDT' ? '07' : '08';

    return newDate.split('T')[0] + 'T00:00:00-' + timeZoneHour + ':00';
}

export async function getLiaOvaDates() {
    const timeZone = await getDaylightSavings();
    const currentDate = new Date();
    const liaStartDate = convertToLiaOvaDate(
        currentDate.toISOString(),
        timeZone
    );
    const oneWeekDate = currentDate.setDate(currentDate.getDate() + 6);
    const liaEndDate = convertToLiaOvaDate(
        new Date(oneWeekDate).toISOString(),
        timeZone
    );

    return [liaStartDate, liaEndDate];
}

export function filterLiaOvaEvents(
    events: LiaOvaEvent[],
    rink: 'Lynnwood' | 'OVA'
) {
    console.log(`Filtering ${rink} events down to relevant hockey events...`);
    const stickAndPucks = events.filter(
        (event: LiaOvaEvent) =>
            (event.title.toLowerCase() === 'stick & puck' &&
                event.eventType.toLowerCase() === 'stick & puck') ||
            (event.title.toLowerCase() === 'adult drop in' &&
                event.eventType.toLowerCase() === 'adult game')
    );

    return stickAndPucks;
}

export function transformLiaOvaEvents(
    events: LiaOvaEvent[],
    rink: 'Lynnwood' | 'OVA'
) {
    console.log(`Transforming ${rink} events...`);
    const liaEvents = events.map<NewEventObject>((event: LiaOvaEvent) => {
        const eventEnd = event.end.split(' ').join('T');
        const eventStart = event.start.split(' ').join('T');
        const location = rink === 'Lynnwood' ? LOCATIONS.lia : LOCATIONS.ova;
        return {
            endDateTime: eventEnd,
            location,
            startDateTime: eventStart,
            title: event.title,
        };
    });
    const transformedEvents = liaEvents.map((event) =>
        getNewEventObject(event)
    );

    return transformedEvents;
}
