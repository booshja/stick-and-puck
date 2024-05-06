import axios from 'axios';
import type { PacificTimeAbbreviation } from '../types';

interface WorldTimeAPIResponse {
    abbreviation: PacificTimeAbbreviation;
    client_ip: string;
    datetime: string;
    day_of_week: number;
    day_of_year: number;
    dst: boolean;
    dst_from: string;
    dst_offset: number;
    dst_until: string;
    raw_offset: number;
    timezone: string;
    unixtime: number;
    utc_datetime: string;
    utc_offset: string;
    week_number: number;
}

export async function getDaylightSavings(): Promise<PacificTimeAbbreviation> {
    const { data } = await axios.get<WorldTimeAPIResponse>(
        'http://worldtimeapi.org/api/timezone/America/Los_Angeles'
    );
    return data.abbreviation;
}
