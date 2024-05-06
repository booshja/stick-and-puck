import { fetchKCIEvents, getDaylightSavings } from '../api';
import { getNewEventObject, type NewEventObject } from './googleCalendar';
import { KCI_SKATER_EVENTS, LOCATIONS } from '../constants';
import type { KCIEvent, PacificTimeAbbreviation } from '../types';

function convertToKCIDate(date: string, timeZone: PacificTimeAbbreviation) {
    let newDate = date.split('T')[0];
    const timeZoneHour = timeZone === 'PDT' ? '07' : '08';
    return newDate.split('T')[0] + 'T00:00:00-' + timeZoneHour + ':00';
}

async function getKCIDates() {
    const timeZone = await getDaylightSavings();
    const currentDate = new Date();
    const kciStartDate = convertToKCIDate(currentDate.toISOString(), timeZone);
    const oneWeekDate = currentDate.setDate(currentDate.getDate() + 7);
    const kciEndDate = convertToKCIDate(
        new Date(oneWeekDate).toISOString(),
        timeZone
    );

    return [kciStartDate, kciEndDate];
}

function filterKCIEvents(events: KCIEvent[], start: string, end: string) {
    console.log('Filtering KCI events down to relevant hockey events...');
    const stickAndPucks = events.filter((event: KCIEvent) => {
        const isDesiredEvent =
            event.title === KCI_SKATER_EVENTS.stickAndPuck ||
            event.title === KCI_SKATER_EVENTS.dropInSkater ||
            event.title === KCI_SKATER_EVENTS.noviceDropInSkater;
        const isHockeyEvent = event.sportId === 20;
        const isWithinDateBounds = event.start >= start && event.end <= end;
        return isHockeyEvent && isDesiredEvent && isWithinDateBounds;
    });

    return stickAndPucks;
}

function transformKCIEvents(events: KCIEvent[]) {
    console.log('Transforming KCI events...');
    const kciEvents = events.map<NewEventObject>((event: KCIEvent) => ({
        endDateTime: event.end.substring(0, event.end.length - 1),
        location: LOCATIONS.kci,
        startDateTime: event.start.substring(0, event.start.length - 1),
        title: event.title,
    }));
    const transformedEvents = kciEvents.map((event) =>
        getNewEventObject(event)
    );

    return transformedEvents;
}

export async function getKCIEvents() {
    console.log('Getting KCI events...');
    const [start, end] = await getKCIDates();
    const events = await fetchKCIEvents({
        start,
        end,
    });
    const filteredEvents = filterKCIEvents(events, start, end);
    const numOfEvents = filteredEvents.length;
    console.log(
        `${numOfEvents} event${
            numOfEvents > 1 ? 's' : ''
        } found from KCI for the next week...`
    );
    const transformedEvents = transformKCIEvents(filteredEvents);
    return transformedEvents;
}
