import { AnimateSharedLayout } from "framer-motion";
import React from "react"
import Logo from "./Logo";
import NavItem from "./NavItem";

const Navigation = () => {
    return (
        <div className="flex items-center justify-between w-full py-8 text-black bg-transparent px-36">
            <Logo />
            <div className="flex items-center space-x-32 text-lg font-bold">
                <NavItem href={'/'}>O Nás</NavItem>
                <NavItem href={'/services'}>Naše služby</NavItem>
                <NavItem href={'/obligations'}>Povinnosti</NavItem>
                <NavItem href={'/contact'}>Kontakty</NavItem>
            </div>
        </div>
    )
}

export default Navigation;