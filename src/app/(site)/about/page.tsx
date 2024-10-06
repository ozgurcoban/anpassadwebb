'use client';

import { useEffect, useRef } from 'react';

const AboutPage = () => {
  const documentTitleRef = useRef<string>('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    documentTitleRef.current = e.target.value;
    const currentTitle = documentTitleRef.current;
    console.log(currentTitle);
    console.log(documentTitleRef.current);

    if (document.title !== currentTitle) {
      document.title = currentTitle;
    }
  };

  useEffect(() => {
    const currentTitle = documentTitleRef.current;
    if (document.title !== currentTitle) {
      document.title = currentTitle;
    }
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter new title"
        onChange={handleTitleChange}
      />
    </div>
  );
};

export default AboutPage;
