import React from 'react'
import {
    Flex,
    Icon,
    Heading,
} from '@chakra-ui/react'

import DashboardShell from './DashboardShell'
import AddSiteModal from './AddSiteModal'

const EmptyState = () => (
    <Flex
        width="100%"
        height="100%"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        paddingBottom="25%"
    >
        <Heading as="h2" size="lg" mb={3}>
            You haven&apos;t added any sites.
        </Heading>
        <AddSiteModal>Add Your First Site</AddSiteModal>
        <Icon viewBox="0 0 200 200" color="red.500" name="logo" w="3em" h="4em">
            <path
                fill="currentColor"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
            />
        </Icon>
    </Flex>
)

export default EmptyState