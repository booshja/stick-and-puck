import axios from 'axios';
import { LIC_EVENTS_URL } from '../constants';
import type { LICEvent } from '../types';

interface FetchLICEvents {
    start: string;
    end: string;
}

export async function fetchLICEvents({ start, end }: FetchLICEvents) {
    const { data } = await axios.get<LICEvent[]>(LIC_EVENTS_URL, {
        params: {
            rink: 1146,
            multiview: 0,
            start,
            end,
        },
    });

    return data;
}
