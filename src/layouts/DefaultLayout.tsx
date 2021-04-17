import Head from 'next/head';
import React, { FC } from "react";
import Footer from '../components/Layout/Footer';
import Navigation from '../components/Layout/Navigation';

const DefaultLayout: FC = ({ children }) => {
    return (
        <div className="text-dark-blue">
            <Head>
                <title>AML Solutions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navigation />
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;