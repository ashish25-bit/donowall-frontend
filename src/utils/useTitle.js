import { useLayoutEffect } from 'react';

const useTitle = (title) => {
    useLayoutEffect(() => {
        document.title = title;
    }, [title])
}
export default useTitle;
