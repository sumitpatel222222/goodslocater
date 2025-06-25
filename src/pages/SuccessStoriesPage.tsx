import React from 'react';
import Layout from '../components/layout/Layout';

const stories = [
  {
    name: "sumit patel",
    role: "Shopkeeper",
    photo: "/goodslocater/IMG_0511.JPG",
    story: "Using Goodslocater, my sales increased by 30% in just two months! Customers love knowing what's in stock.",
  },
  {
    name: "Priya Patel",
    role: "Customer",
    photo: "/goodslocater/IMG20250101081319.jpg",
    story: "I found all the groceries I needed at local shops without wasting time. Super convenient!",
  },
  // Add more stories...
];

const SuccessStoriesPage: React.FC = () => (
  <Layout>
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-pink-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
        Success Stories
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        {stories.map((s, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition hover:scale-105">
            <img src={s.photo} alt={s.name} className="w-20 h-20 rounded-full mb-4 border-4 border-indigo-300" />
            <h2 className="text-xl font-bold text-indigo-700 dark:text-pink-300">{s.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">{s.role}</p>
            <p className="text-gray-700 dark:text-gray-200 italic">"{s.story}"</p>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export default SuccessStoriesPage;