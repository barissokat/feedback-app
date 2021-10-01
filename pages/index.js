import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Box, Button, Icon, Link, Text, HStack } from '@chakra-ui/react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

import { useAuth } from '@/lib/auth';
import { getAllFeedback } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import FeedbackLink from '@/components/FeedbackLink';

const SITE_ID = 'N1R4eQVEqcC0NuSpJHmm';

export async function getStaticProps(context) {
    const { feedback } = await getAllFeedback(SITE_ID);

    return {
        props: {
            allFeedback: feedback
        },
        revalidate: 1
    };
}

export default function Home({ allFeedback }) {
    const auth = useAuth();

    return (
        <div className={styles.container}>
            <Head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if (document.cookie && document.cookie.includes('feedback-app-auth')) {
                                window.location.href = "/dashboard"
                            }
                            `
                    }}
                />
            </Head>

            <main className={styles.main}>
                <Icon
                    viewBox="0 0 200 200"
                    color="red.500"
                    name="logo"
                    w="3em"
                    h="5em"
                >
                    <path
                        fill="currentColor"
                        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    />
                </Icon>
                <Text mb={2}>
                    {auth.user ? (
                        <Link href="/dashboard">{auth.user.name}</Link>
                    ) : (
                        'Feedback App'
                    )}
                </Text>
                <Box>
                    {auth.user ? (
                        <Button
                            onClick={(e) => auth.signout()}
                            size="xs"
                            w="100%"
                            variant="link"
                        >
                            Sign Out
                        </Button>
                    ) : (
                        <HStack>
                            <Button
                                leftIcon={<FaGithub />}
                                onClick={(e) => auth.signinWithGitHub()}
                                size="xs"
                                w="100%"
                                variant="link"
                                mr={2}
                            >
                                Sign in with GitHub
                            </Button>
                            <Button
                                leftIcon={<FaGoogle />}
                                onClick={(e) => auth.signinWithGoogle()}
                                size="xs"
                                w="100%"
                                variant="link"
                            >
                                Sign in with Google
                            </Button>
                        </HStack>
                    )}
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    width="full"
                    maxWidth="700px"
                    margin="0 auto"
                    mt={8}
                >
                    <FeedbackLink siteId={SITE_ID} />
                    {allFeedback.map((feedback) => (
                        <Feedback key={feedback.id} {...feedback} />
                    ))}
                </Box>
            </main>
        </div>
    );
}
