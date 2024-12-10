import axios from 'axios';
import { LIA_EVENTS_URL, LIA_RINK_ID } from '../constants';
import type { LiaOvaEvent } from '../types';

interface FetchLiaEvents {
    start: string;
    end: string;
}

export async function fetchLiaEvents({ start, end }: FetchLiaEvents) {
    const { data } = await axios.get<LiaOvaEvent[]>(LIA_EVENTS_URL, {
        params: {
            rink: LIA_RINK_ID,
            multiview: 0,
            start,
            end,
        },
    });

    return data;
}
