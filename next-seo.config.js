const title =
    'Feedback App – The easiest way to add comments or reviews to your static site.';
const description = 'Feedback App is being built as part of React 2025 course.';

const SEO = {
    title,
    description,
    canonical: 'https://barissokat.vercel.app',
    openGraph: {
        type: 'website',
        locale: 'tr_TR',
        url: 'https://barissokat.vercel.app',
        title,
        description,
        images: [
            {
                url: 'https://barissokat.vercel.app/og.png',
                alt: title,
                width: 1280,
                height: 720
            }
        ]
    }
};

export default SEO;
