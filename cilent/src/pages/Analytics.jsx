import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Analytics = () => {
  const location = useLocation();
  const { matchData } = location.state || {};

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-5">
        <h1 className="text-3xl font-bold mb-5">Resume Analysis</h1>
        {matchData ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Percentage Match: {matchData.percentageMatch}</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Strong Points</h3>
              <ul className="list-disc list-inside">
                {matchData.strongPoints.map((item, index) => (
                  <li key={index} className="mb-2">{item.point}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Improvement Suggestions</h3>
              <ul className="list-disc list-inside">
                {matchData.improvementSuggestions.map((item, index) => (
                  <li key={index} className="mb-2">{item.point}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>No analytics data available.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Analytics;
