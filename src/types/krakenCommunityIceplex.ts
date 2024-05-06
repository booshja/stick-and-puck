import { LOCATIONS } from '../constants';

export interface KCIEvent {
    url: string;
    title: string;
    start: string;
    end: string;
    sportId: number;
    color: string;
}

export type Location = (typeof LOCATIONS)[keyof typeof LOCATIONS];
