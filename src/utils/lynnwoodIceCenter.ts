import { fetchLICEvents, getDaylightSavings } from '../api';
import { getNewEventObject, type NewEventObject } from './googleCalendar';
import type { LICEvent, PacificTimeAbbreviation } from '../types';
import { LOCATIONS } from '../constants';

function convertToLICDate(date: string, timeZone: PacificTimeAbbreviation) {
    let newDate = date.split('T')[0];
    const timeZoneHour = timeZone === 'PDT' ? '07' : '08';

    return newDate.split('T')[0] + 'T00:00:00-' + timeZoneHour + ':00';
}

async function getLICDates() {
    const timeZone = await getDaylightSavings();
    const currentDate = new Date();
    const licStartDate = convertToLICDate(currentDate.toISOString(), timeZone);
    const oneWeekDate = currentDate.setDate(currentDate.getDate() + 6);
    const licEndDate = convertToLICDate(
        new Date(oneWeekDate).toISOString(),
        timeZone
    );

    return [licStartDate, licEndDate];
}

function filterLICEvents(events: LICEvent[]) {
    console.log('Filtering Lynnwood events down to relevant hockey events...');
    const stickAndPucks = events.filter(
        (event: LICEvent) =>
            (event.title.toLowerCase() === 'stick & puck' &&
                event.eventType.toLowerCase() === 'stick & puck') ||
            (event.title.toLowerCase() === 'adult drop in' &&
                event.eventType.toLowerCase() === 'adult game')
    );

    return stickAndPucks;
}

function transformLICEvents(events: LICEvent[]) {
    console.log('Transforming Lynnwood events...');
    const licEvents = events.map<NewEventObject>((event: LICEvent) => {
        const eventEnd = event.end.split(' ').join('T');
        const eventStart = event.start.split(' ').join('T');
        return {
            endDateTime: eventEnd,
            location: LOCATIONS.lic,
            startDateTime: eventStart,
            title: event.title,
        };
    });
    const transformedEvents = licEvents.map((event) =>
        getNewEventObject(event)
    );

    return transformedEvents;
}

export async function getLICEvents() {
    console.log('Getting Lynnwood events...');
    const [start, end] = await getLICDates();
    const events = await fetchLICEvents({
        start,
        end,
    });
    const filteredEvents = filterLICEvents(events);
    const numOfEvents = filteredEvents.length;
    console.log(
        `Successfully fetched ${numOfEvents} Lynnwood events for the week!`
    );
    const transformedEvents = transformLICEvents(filteredEvents);
    return transformedEvents;
}
