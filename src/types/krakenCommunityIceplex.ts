import { LOCATIONS } from '../constants';

export interface KciEvent {
    url: string;
    title: string;
    start: string;
    end: string;
    sportId: number;
    color: string;
}

export type Location = (typeof LOCATIONS)[keyof typeof LOCATIONS];
