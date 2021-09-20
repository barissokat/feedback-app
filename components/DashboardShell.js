import React, { Children } from 'react'
import {
    Flex,
    Icon,
    Link,
    Avatar,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Heading,
} from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'

import { auth } from 'firebase/app';
import { useAuth } from '@/lib/auth';

const DashboardShell = ({ children }) => {
    const auth = useAuth();
    
    return (
        <Flex flexDirection="column" height="100vh">
            <Flex justifyContent="space-between" alignItems="center" p={2} pl={10} pr={10} borderBottom="1px" borderBottomStyle="solid" borderColor="gray.100">
                <Flex alignItems="center" justifyContent="flex-start">
                    <Icon viewBox="0 0 200 200" color="red.500" name="logo" w="3em" h="3em" mr={4}>
                        <path
                            fill="currentColor"
                            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                        />
                    </Icon>
                    <Link mr={4}>Sites</Link>
                    <Link>Feedback</Link>
                </Flex>
                <Flex alignItems="center">
                    <Link mr={4}>Account</Link>
                    <Avatar src={auth.user.photoUrl} size="sm" mr={1} />
                </Flex>
            </Flex>
            <Flex
                width="100%"
                alignItems="stretch"
                justifyContent="flex-start"
                height="100%"
            >
                <Breadcrumb />
                <Flex
                    flexDirection="column"
                    ml="20%"
                    mr="20%"
                    height="100%"
                    width="100%"
                    pt={6}
                >
                    <Breadcrumb pb={2}>
                        <BreadcrumbItem>
                            <BreadcrumbLink color="gray.700">Sites</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Heading pb={4}>My Sites</Heading>
                    {children}
                </Flex>
            </Flex>
        </Flex>
    )
};

export default DashboardShell