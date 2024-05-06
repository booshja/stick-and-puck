import { KCI_CALENDAR_TIME_ZONE, LIC_CALENDAR_TIME_ZONE } from '../constants';

export type PacificTimeAbbreviation = 'PDT' | 'PST';

export type TimeZone =
    | typeof LIC_CALENDAR_TIME_ZONE
    | typeof KCI_CALENDAR_TIME_ZONE;
