import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import Link from 'next/link';

interface StudyPlan {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'in_progress' | 'completed';
}

const DashboardPage: React.FC = () => {
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudyPlans = async () => {
      try {
        const response = await fetch('/api/study-plans');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setStudyPlans(data.studyPlans);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch study plans');
      } finally {
        setLoading(false);
      }
    };

    fetchStudyPlans();
  }, []);

  return (
    <ProtectedRoute>
      <Layout>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Study Plans</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your current study plans and progress
              </p>
            </div>
            <Link
              href="/study-plans/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create New Plan
            </Link>
          </div>

          {loading ? (
            <div className="px-4 py-5 sm:px-6">Loading...</div>
          ) : error ? (
            <div className="px-4 py-5 sm:px-6 text-red-600">{error}</div>
          ) : studyPlans.length === 0 ? (
            <div className="px-4 py-5 sm:px-6">
              <p className="text-gray-500">No study plans found. Create your first plan!</p>
            </div>
          ) : (
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {studyPlans.map((plan) => (
                  <li key={plan.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-medium text-gray-900 truncate">
                          {plan.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <span>
                            {new Date(plan.startDate).toLocaleDateString()} -{' '}
                            {new Date(plan.endDate).toLocaleDateString()}
                          </span>
                          <span className="mx-2">•</span>
                          <span
                            className={`capitalize ${
                              plan.status === 'completed'
                                ? 'text-green-600'
                                : plan.status === 'in_progress'
                                ? 'text-blue-600'
                                : 'text-gray-600'
                            }`}
                          >
                            {plan.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <Link
                          href={`/study-plans/${plan.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default DashboardPage; 