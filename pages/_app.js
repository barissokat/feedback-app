import { useEffect } from 'react';
import { DefaultSeo } from 'next-seo';
import Router from 'next/router';
import * as Fathom from 'fathom-client';

import { ThemeProvider, theme, CSSReset } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import '@/styles/globals.css';
import customTheme from '@/styles/theme';

import { AuthProvider } from '@/lib/auth';

import SEO from '../next-seo.config';

const GlobalStyle = ({ children }) => {
    return (
        <>
            <CSSReset />
            <Global
                styles={css`
                    html {
                        min-width: 360px;
                        scroll-behavior: smooth;
                    }
                    #__next {
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                    }
                `}
            />
            {children}
        </>
    );
};

Router.events.on('routeChangeComplete', () => {
    Fathom.trackPageview();
});

const App = ({ Component, pageProps }) => {
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
                includedDomains: ['fastfeedback.io']
            });
        }
    }, []);

    return (
        <ThemeProvider theme={customTheme}>
            <AuthProvider>
                <DefaultSeo {...SEO} />
                <GlobalStyle />
                <Component {...pageProps} />
            </AuthProvider>
        </ThemeProvider>
    );
};
export default App;
