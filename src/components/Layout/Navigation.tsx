import { AnimateSharedLayout } from "framer-motion";
import React from "react"
import Logo from "./Logo";
import NavItem from "./NavItem";

const Navigation = () => {
    return (
        <div className="flex items-center justify-between w-full py-8 text-black bg-transparent px-36">
            <Logo />
            <div className="flex items-center space-x-16 font-semibold">
                <NavItem href={'/'}>O Nás</NavItem>
                <NavItem href={'/news'}>Aktuality</NavItem>
                <NavItem href={'/services'}>Naše služby</NavItem>
                <NavItem href={'/calculator'}>Cenový kalkulátor</NavItem>
                <NavItem href={'/contact'}>Kontakty</NavItem>
                <NavItem href={'/about'}>O nás</NavItem>
            </div>
        </div>
    )
}

export default Navigation;