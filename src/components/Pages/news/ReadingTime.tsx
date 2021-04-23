import { FC, useMemo } from "react";

const ReadingTime: FC<{ stats: { minutes: number } }> = ({ stats }) => {
    const minuteString = useMemo(() => {
        if ( Math.round(stats.minutes) === 1 ) return 'minuta'
        else return 'minut'
    }, [stats]);

    return (
        <span className="p-1.5 text-sm font-bold bg-gray-100">{ `${Math.round(stats.minutes)} ${minuteString} čtení` }</span>
    );
}

export default ReadingTime;