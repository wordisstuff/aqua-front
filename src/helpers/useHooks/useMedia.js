import { useMediaQuery } from 'react-responsive';
import { useMemo } from 'react';

const useMedia = () => {
    const desktop = useMediaQuery({ query: '(min-width: 1440px)' });
    const tablet = useMediaQuery({ query: '(min-width: 768px)' });

    return useMemo(
        () => ({
            desktop,
            tablet: tablet && !desktop,
        }),
        [desktop, tablet],
    );
};

export default useMedia;
