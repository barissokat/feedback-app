import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import SiteEmptyState from '@/components/SiteEmptyState';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import UpgradeEmptyState from '@/components/UpgradeEmptyState';
import { useAuth } from '@/lib/auth';
import useSWR from 'swr';

const Dashboard = () => {
    const { user } = useAuth();
    const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);
    const isPaidAccount = user?.stripeRole !== 'free';

    if (!data) {
        return (
            <DashboardShell>
                <SiteTableHeader />
                <SiteTableSkeleton />
            </DashboardShell>
        );
    }

    if (data.sites.length) {
        return (
            <DashboardShell>
                <SiteTableHeader />
                <SiteTable sites={data.sites} />
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <SiteTableHeader isPaidAccount={isPaidAccount} />
            {isPaidAccount ? <SiteEmptyState /> : <UpgradeEmptyState />}
        </DashboardShell>
    );
};

const DashboardPage = () => (
    <Page name="Dashboard" path="/dashboard">
      <Dashboard />
    </Page>
  );
  
  export default DashboardPage;