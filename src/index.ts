import {
    createGoogleCalendarEvents,
    getKCIEvents,
    getLICEvents,
} from './utils';

async function krakenCommunityIceplex() {
    try {
        const kciEvents = await getKCIEvents();
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
        const licEvents = await getLICEvents();
        console.log('Creating events for Lynwood...');
        await createGoogleCalendarEvents(licEvents);
        console.log('Successfully created events for Lynwood!');
    } catch (error) {
        console.error('Error in creating events for Lynwood: ', error);
    }
    return 'finished!';
}

async function main() {
    await krakenCommunityIceplex();
    await lynnwoodIceArena();
    console.log('All rinks finished!');
    console.log('Shutting down...');
    console.log('Happy skating! 🏒⛸️');
}

main();
