import {
    KCI_CALENDAR_TIME_ZONE,
    LIA_CALENDAR_TIME_ZONE,
    OVA_CALENDAR_TIME_ZONE,
} from '../constants';

export type PacificTimeAbbreviation = 'PDT' | 'PST';

export type TimeZone =
    | typeof LIA_CALENDAR_TIME_ZONE
    | typeof OVA_CALENDAR_TIME_ZONE
    | typeof KCI_CALENDAR_TIME_ZONE;
