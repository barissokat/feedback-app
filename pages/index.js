import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import { Button, Heading, Text, Code } from '@chakra-ui/react';

import { auth } from 'firebase/app';
import { useAuth } from '@/lib/auth';

export default function Home() {
    const auth = useAuth();

    return (
        <div className={styles.container}>
            <Head>
                <title>Local</title>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next</a> Feedback App
                </h1>

                <Heading>Fast Feedback</Heading>

                <Text>
                    Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
                </Text>
                {auth.user ? (
                    <Button onClick={(e) => auth.signout()}>Sign Out</Button>
                ) : (
                    <Button onClick={(e) => auth.signinWithGitHub()}>Sign In</Button>
                )}
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </div>
    )
};
