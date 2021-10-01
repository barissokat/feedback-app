import React, { useState } from 'react';
import { Heading, Flex, Text, Button, useToast } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

const UpgradeEmptyState = () => {
    const { user } = useAuth();
    const [isCheckoutLoading, setCheckoutLoading] = useState(false);
    const toast = useToast();

    return (
        <Flex
            width="100%"
            backgroundColor="white"
            borderRadius="8px"
            p={16}
            justify="center"
            align="center"
            direction="column"
        >
            <Heading size="lg" mb={2}>
                Get feedback on your site instantly.
            </Heading>
            <Text mb={4}>Start today, then grow with us 🌱</Text>
            <Button
                // Add when implement stripe service.
                // onClick={() => {
                //     setCheckoutLoading(true);
                //     createCheckoutSession(user.uid);
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
                isLoading={isCheckoutLoading}
                _hover={{ bg: 'gray.700' }}
                _active={{
                    bg: 'gray.800',
                    transform: 'scale(0.95)'
                }}
            >
                Upgrade to Starter
            </Button>
        </Flex>
    );
};

export default UpgradeEmptyState;
