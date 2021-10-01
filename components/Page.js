import React from 'react';
import { NextSeo } from 'next-seo';

const Page = ({ name, path, children }) => {
    const title = `Feedback App – ${name}`;
    const url = `https://barissokat.vercel.app${path}`;

    return (
        <>
            <NextSeo
                title={title}
                canonical={url}
                openGraph={{
                    url,
                    title
                }}
            />
            {children}
        </>
    );
};

export default Page;
