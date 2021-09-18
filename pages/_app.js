// import { ThemeProvider, CSSReset } from '@chakra-ui/core';
// import { ThemeProvider } from '@chakra-ui/core';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import '@/styles/globals.css';
import customTheme from '@/styles/theme';

import { AuthProvider } from '@/lib/auth';

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

const App = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={customTheme}>
            <AuthProvider>
                <GlobalStyle />
                <Component {...pageProps} />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;