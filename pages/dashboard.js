import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import {
    Box,
    Button,
    Code,
    Flex,
    Heading,
    Icon,
    Text,
    Spacer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react';

import { auth } from 'firebase/app';
import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState';

export default function Dashboard() {
    const auth = useAuth();

    if (!auth.user) {
        return 'Loading...';
    }

    return <EmptyState />
};
