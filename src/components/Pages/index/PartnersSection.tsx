import { FC } from "react";
import { c, dateStringToDateFormat } from "../../../services/misc";
import { NewsItem } from "../../../typings";
import Button from "../../Layout/Button";
import Image from 'next/image'

const PartnersSection: FC = () => {
    return (
        <div className="w-full space-y-24 my-36 px-36">
            <h2 className="text-4xl font-bold text-center">Hlavní Partneři</h2>
            <div className={c("flex justify-center space-x-24", 'md:flex-col md:space-x-0 md:space-y-16')}>
                <img src={'/images/google.png'}  />
                <img src={'/images/google.png'}  />
                <img src={'/images/google.png'}  />
            </div>
        </div>

    );
}

export default PartnersSection;