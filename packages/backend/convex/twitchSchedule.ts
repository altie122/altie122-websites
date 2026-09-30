import {action} from './_generated/server';
import {convertIcsCalendar, type DateObjectType, type IcsRecurrenceRule} from 'ts-ics';


interface ConvexIcsDateObject {
    date: number;
    type?: DateObjectType;
    local?: {
        date: number;
        timezone: string;
        tzoffset: string;
    };
}

export interface streamDate {
    date: {
        start: ConvexIcsDateObject;
        end?: ConvexIcsDateObject | null;
    };
    repeats?: IcsRecurrenceRule;
    title: string;
}

export const getTwitchSchedule = action({
    handler: async (_ctx) => {
        const calendar = await fetch(process.env.TWITCH_CALENDAR_ICS_URL!);

        if (!calendar.ok) {
            throw new Error(
                `Failed to fetch Twitch calendar: ${calendar.status} ${calendar.statusText}`,
            );
        }

        const calendarBody = await calendar.text();

        const icsCalendarString = convertIcsCalendar(undefined, calendarBody);

        if (!icsCalendarString.events) {
            return [];
        }

        const streamDates: streamDate[] = [];

        for (const event of icsCalendarString.events) {
            streamDates.push({
                title: event.summary ?? '',
                date: {
                    start: {
                        date: event.start.date.getTime(),
                        type: event.start.type,
                        local: event.start.local && {
                            ...event.start.local,
                            date: event.start.local.date.getTime(),
                        },
                    },
                    end: event.end && {
                        date: event.end.date.getTime(),
                        type: event.end.type,
                        local: event.end.local && {
                            ...event.end.local,
                            date: event.end.local.date.getTime(),
                        },
                    },
                },
                repeats: event.recurrenceRule,
            });
        }

        return streamDates;
    },
});
