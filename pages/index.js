import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import {
    Box,
    Button,
    Icon,
    Link,
    Text
} from '@chakra-ui/react';

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
                <Icon viewBox="0 0 200 200" color="red.500" name="logo" w="3em" h="5em">
                    <path
                        fill="currentColor"
                        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    />
                </Icon>
                <Text>
                    {auth.user ? <Link href="/dashboard">{auth.user.name}</Link> : ''}
                </Text>
                <Box>
                    {auth.user ? (
                        <Button onClick={(e) => auth.signout()} size="xs" w="100%" variant="link">Sign Out</Button>
                    ) : (
                        <Button onClick={(e) => auth.signinWithGitHub()} size="xs" w="100%" variant="link">Sign In</Button>
                    )}
                </Box>
            </main>
        </div>
    )
};
