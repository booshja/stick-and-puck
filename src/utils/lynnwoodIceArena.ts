import { fetchLiaEvents } from '../api';
import {
    filterLiaOvaEvents,
    getLiaOvaDates,
    transformLiaOvaEvents,
} from './lynwoodAndOva';

export async function getLiaEvents() {
    console.log('Getting Lynnwood events...');
    const [start, end] = await getLiaOvaDates();
    const events = await fetchLiaEvents({
        start,
        end,
    });
    const filteredEvents = filterLiaOvaEvents(events, 'Lynnwood');
    const numOfEvents = filteredEvents.length;
    console.log(
        `Successfully fetched ${numOfEvents} Lynnwood events for the week!`
    );
    const transformedEvents = transformLiaOvaEvents(filteredEvents, 'Lynnwood');
    return transformedEvents;
}
