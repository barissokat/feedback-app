import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';

export async function getStaticProps(context) {
    const siteId = context.params.siteId;
    const { feedback } = await getAllFeedback(siteId);

    return {
        props: {
            initialFeedback: feedback
        },
        revalidate: 1
    };
}

export async function getStaticPaths() {
    const { sites } = await getAllSites();
    const paths = sites.map((site) => ({
        params: {
            siteId: site.id.toString()
        }
    }));

    return {
        paths,
        fallback: true
    };
}

const FeedbackPage = ({ initialFeedback }) => {
    const auth = useAuth();
    const router = useRouter();
    const commentInput = useRef(null);
    const [allFeedback, setAllFeedback] = useState(initialFeedback);

    const onSubmit = (e) => {
        e.preventDefault();

        const newFeedback = {
            author: auth.user.name,
            authorId: auth.user.uid,
            siteId: router.query.siteId,
            text: commentInput.current.value,
            createdAt: new Date().toISOString(),
            provider: auth.user.provider,
            status: 'pending'
        };

        setAllFeedback([newFeedback, ...allFeedback]);
        createFeedback(newFeedback);
        document.getElementById('site-feedback-form').reset();
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            width="full"
            maxWidth="700px"
            margin="0 auto"
        >
            {auth.user && (
                <Box as="form" onSubmit={onSubmit} id="site-feedback-form">
                    <FormControl my={8}>
                        <FormLabel htmlFor="comment">Comment</FormLabel>
                        <Input
                            ref={commentInput}
                            id="comment"
                            placeholder="Leave a comment"
                        />
                        <Button
                            mt={4}
                            type="submit"
                            fontWeight="medium"
                            isDisabled={router.isFallback}
                        >
                            Add Comment
                        </Button>
                    </FormControl>
                </Box>
            )}
            {allFeedback &&
                allFeedback.map((feedback) => (
                    <Feedback key={feedback.id} {...feedback} />
                ))}
        </Box>
    );
};

export default FeedbackPage;
