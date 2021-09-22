import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import { useAuth } from '@/lib/auth';
import useSWR from 'swr';

export default function Dashboard() {
    const { user } = useAuth();
    const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

    if (!data) {
        return (
            <DashboardShell>
                <SiteTableSkeleton />
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
        </DashboardShell>
    );
}
