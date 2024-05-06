import axios from 'axios';
import { KCI_EVENTS_URL } from '../constants';
import type { KCIEvent } from '../types';

interface FetchKCIEvents {
    start: string;
    end: string;
}

export async function fetchKCIEvents({ start, end }: FetchKCIEvents) {
    const { data } = await axios.get<KCIEvent[]>(KCI_EVENTS_URL, {
        params: {
            start,
            end,
            variant: 2,
        },
    });
    return data;
}
