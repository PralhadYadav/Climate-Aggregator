import dayjs from 'dayjs';

export const getHourKey = (timestamp: string): string => {
    return dayjs(timestamp).startOf('hour').toISOString();
};
