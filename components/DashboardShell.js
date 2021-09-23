import React, { Children } from 'react';
import NextLink from 'next/link';
import { Avatar, Button, Flex, Icon, Link } from '@chakra-ui/react';

import AddSiteModal from './AddSiteModal';
import { auth } from 'firebase/app';
import { useAuth } from '@/lib/auth';

const DashboardShell = ({ children }) => {
    const { user, signout } = useAuth();

    return (
        <Flex flexDirection="column" height="100vh">
            <Flex
                justifyContent="space-between"
                alignItems="center"
                p={2}
                pl={10}
                pr={10}
                borderBottom="1px"
                borderBottomStyle="solid"
                borderColor="gray.100"
            >
                <Flex alignItems="center" justifyContent="flex-start">
                    <NextLink href="/" passHref>
                        <Link>
                            <Icon
                                viewBox="0 0 200 200"
                                color="red.500"
                                name="logo"
                                w="3em"
                                h="3em"
                                mr={4}
                            >
                                <path
                                    fill="currentColor"
                                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                                />
                            </Icon>
                        </Link>
                    </NextLink>
                    <NextLink href="/dashboard" passHref>
                        <Link mr={4}>Sites</Link>
                    </NextLink>
                    <NextLink href="/feedback" passHref>
                        <Link>Feedback</Link>
                    </NextLink>
                </Flex>
                <Flex alignItems="center">
                    {user && (
                        <Button
                            variant="ghost"
                            mr={2}
                            onClick={() => signout()}
                        >
                            Log Out
                        </Button>
                    )}
                    <Avatar src={user?.photoUrl} size="sm" mr={1} />
                </Flex>
            </Flex>
            <Flex
                width="100%"
                alignItems="stretch"
                justifyContent="flex-start"
                height="100%"
            >
                <Flex
                    flexDirection="column"
                    ml="20%"
                    mr="20%"
                    height="100%"
                    width="100%"
                    pt={6}
                >
                    {children}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default DashboardShell;
