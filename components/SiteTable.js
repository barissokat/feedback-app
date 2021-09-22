import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';
import { parseISO, format } from 'date-fns';
import NextLink from 'next/link';

const SiteTable = ({ sites }) => {
    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Site Link</Th>
                    <Th>Feedback Link</Th>
                    <Th>Date Added</Th>
                    <Th>{''}</Th>
                </Tr>
            </thead>
            <tbody>
                {sites.map((site) => (
                    <Box as="tr" key={site.url}>
                        <Td fontWeight="medium">{site.name}</Td>
                        <Td>
                            <Link href={site.url} isExternal>
                                {site.url}
                            </Link>
                        </Td>
                        <Td>
                            <Link>
                                <NextLink
                                    href="/p/[siteId]"
                                    as={`/p/${site.id}`}
                                    passHref
                                >
                                    <Link>View Feedback</Link>
                                </NextLink>
                            </Link>
                        </Td>
                        <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
                    </Box>
                ))}
            </tbody>
        </Table>
    );
};

export default SiteTable;