import { fetchOvaEvents } from '../api';
import {
    filterLiaOvaEvents,
    getLiaOvaDates,
    transformLiaOvaEvents,
} from './lynwoodAndOva';

export async function getOvaEvents() {
    console.log('Getting OVA events...');
    const [start, end] = await getLiaOvaDates();
    const events = await fetchOvaEvents({
        start,
        end,
    });
    const filteredEvents = filterLiaOvaEvents(events, 'OVA');
    const numOfEvents = filteredEvents.length;
    console.log(`Successfully fetched ${numOfEvents} OVA events for the week!`);
    const transformedEvents = transformLiaOvaEvents(filteredEvents, 'OVA');
    return transformedEvents;
}
