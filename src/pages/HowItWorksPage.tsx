import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';

const HowItWorksPage: React.FC = () => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    fetch('/goodslocater/howitworks.txt')
      .then((res) => res.text())
      .then(setContent)
      .catch(() => setContent('Could not load content.'));
  }, []);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12 px-4 bg-white dark:bg-gray-900 rounded-lg transition-colors">
        <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-indigo-500 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
          How It Works
        </h1>
        <pre className="whitespace-pre-wrap text-lg leading-relaxed text-indigo-800 dark:text-pink-200 font-semibold">
          {content}
        </pre>
      </div>
    </Layout>
  );
};

export default HowItWorksPage;