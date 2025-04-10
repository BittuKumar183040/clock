import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = 'Clock App';
    };
  }, [title]);
};

export default useDocumentTitle;
