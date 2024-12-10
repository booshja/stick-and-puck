import axios from 'axios';
import { OVA_EVENTS_URL, OVA_RINK_ID } from '../constants';
import type { LiaOvaEvent } from '../types';

interface FetchOvaEvents {
    start: string;
    end: string;
}

export async function fetchOvaEvents({ start, end }: FetchOvaEvents) {
    const { data } = await axios.get<LiaOvaEvent[]>(OVA_EVENTS_URL, {
        params: {
            rink: OVA_RINK_ID,
            multiview: 0,
            start,
            end,
        },
    });

    return data;
}
