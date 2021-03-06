import { useState } from 'react';
import {
    Avatar,
    Heading,
    Box,
    Button,
    Flex,
    Text,
    Badge,
    StatGroup,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    useToast
} from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { goToBillingPortal } from '@/lib/db';
import DashboardShell from '@/components/DashboardShell';
import Page from '@/components/Page';

const FeedbackUsage = () => (
    <StatGroup>
        <Stat>
            <StatLabel color="gray.700">Feedback</StatLabel>
            <StatNumber fontWeight="medium">∞</StatNumber>
            <StatHelpText>10,000 limit</StatHelpText>
        </Stat>

        <Stat>
            <StatLabel color="gray.700">Sites</StatLabel>
            <StatNumber fontWeight="medium">1/∞</StatNumber>
            <StatHelpText>Unlimited Sites</StatHelpText>
        </Stat>
    </StatGroup>
);

const SettingsTable = ({ stripeRole, children }) => (
    <Box
        backgroundColor="white"
        mt={8}
        borderRadius={[0, 8, 8]}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
    >
        <Flex
            backgroundColor="gray.50"
            borderTopLeftRadius={[0, 8, 8]}
            borderTopRightRadius={[0, 8, 8]}
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            px={6}
            py={4}
        >
            <Flex justify="space-between" align="center" w="full">
                <Text
                    textTransform="uppercase"
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="medium"
                    mt={1}
                >
                    Settings
                </Text>
                <Badge h="1rem" variantColor="blue">
                    {stripeRole}
                </Badge>
            </Flex>
        </Flex>
        <Flex direction="column" p={6}>
            {children}
        </Flex>
    </Box>
);

const Account = () => {
    const { user, signout } = useAuth();
    const [isBillingLoading, setBillingLoading] = useState(false);
    const toast = useToast();

    return (
        <DashboardShell>
            <Flex
                direction="column"
                maxW="600px"
                align={['left', 'center']}
                margin="0 auto"
            >
                <Flex direction="column" align={['left', 'center']} ml={4}>
                    <Avatar
                        w={['3rem', '6rem']}
                        h={['3rem', '6rem']}
                        mb={4}
                        src={user?.photoUrl}
                    />
                    <Heading letterSpacing="-1px">{user?.name}</Heading>
                    <Text>{user?.email}</Text>
                </Flex>
                <SettingsTable stripeRole={user?.stripeRole}>
                    <FeedbackUsage />
                    <Text my={4}>
                        Feedback App will use Stripe to update, change, or cancel
                        your subscription. You can also update card information
                        and billing addresses through the secure portal.
                    </Text>
                    <Flex justify="flex-end">
                        <Button
                            variant="ghost"
                            ml={4}
                            onClick={() => signout()}
                        >
                            Log Out
                        </Button>
                        <Button
                            // Add when implement stripe service.
                            // onClick={() => {
                            //     setBillingLoading(true);
                            //     goToBillingPortal();
                            // }}
                            // Otherwise
                            onClick={() =>
                                toast({
                                    title: 'This service is unavailable.',
                                    status: 'info',
                                    duration: 5000,
                                    isClosable: true
                                })
                            }
                            backgroundColor="gray.900"
                            color="white"
                            fontWeight="medium"
                            ml={4}
                            isLoading={isBillingLoading}
                            _hover={{ bg: 'gray.700' }}
                            _active={{
                                bg: 'gray.800',
                                transform: 'scale(0.95)'
                            }}
                        >
                            Manage Billing
                        </Button>
                    </Flex>
                </SettingsTable>
            </Flex>
        </DashboardShell>
    );
};

const AccountPage = () => (
    <Page name="Account" path="/account">
        <Account />
    </Page>
);

export default AccountPage;
