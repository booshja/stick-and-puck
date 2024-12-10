import {
    createGoogleCalendarEvents,
    getKciEvents,
    getLiaEvents,
} from './utils';
import { getOvaEvents } from './utils/olympicviewArena';

async function krakenCommunityIceplex() {
    try {
        const kciEvents = await getKciEvents();
        console.log('Creating events for KCI...');
        await createGoogleCalendarEvents(kciEvents);
        console.log('Successfully created events for KCI!');
    } catch (error) {
        console.error('Error in creating events for KCI: ', error);
    }
    return 'finished!';
}

async function lynnwoodIceArena() {
    try {
        const liaEvents = await getLiaEvents();
        console.log('Creating events for Lynwood...');
        await createGoogleCalendarEvents(liaEvents);
        console.log('Successfully created events for Lynwood!');
    } catch (error) {
        console.error('Error in creating events for Lynwood: ', error);
    }
    return 'finished!';
}

async function olympicviewArena() {
    try {
        const ovaEvents = await getOvaEvents();
        console.log('Creating events for OVA...');
        await createGoogleCalendarEvents(ovaEvents);
        console.log('Successfully created events for OVA!');
    } catch (error) {
        console.error('Error in creating events for OVA: ', error);
    }
    return 'finished!';
}

async function main() {
    console.log('Finding time for some hockey! 🏒🥅');
    console.log('...');
    await krakenCommunityIceplex();
    console.log('...');
    await lynnwoodIceArena();
    console.log('...');
    await olympicviewArena();
    console.log('...');
    console.log('All rinks finished!');
    console.log('Shutting down...');
    console.log('Happy skating! 🏒🥅⛸️');
}

main();
