import React, { FC } from "react";
import { Fade } from "react-awesome-reveal";
import { c } from "../../../services/misc";

const PartnersSection: FC = () => {
    return (
        <div className={c("w-full space-y-12 mb-96 mt-52 px-36", "md:px-8 md:py-16")}>
            <h2 className="text-4xl font-bold text-center">Hlavní Partneři</h2>
            <div className={c("flex justify-center space-x-32", 'md:flex-col md:space-x-0 md:space-y-16')}>
                <Fade damping={0.5} duration={500} cascade triggerOnce>
                    <img alt="google-logo" className="w-72" src={'/images/google.png'}  />
                    <img alt="google-logo" className="w-72" src={'/images/google.png'}  />
                    <img alt="google-logo" className="w-72" src={'/images/google.png'}  />
                </Fade>
            </div>
        </div>

    );
}

export default PartnersSection;