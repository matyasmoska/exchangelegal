import { FC } from "react";

const ReadingTime: FC<{ stats: { minutes: number } }> = ({ stats }) => {
    return (
        <span className="p-1.5 text-sm font-bold bg-gray-100">{ Math.round(stats.minutes) + ' minut čtení' }</span>
    );
}

export default ReadingTime;