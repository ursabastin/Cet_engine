import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadQuestionPool } from '../utils/questionLoader';
import { loadAllMocks, buildMock } from '../utils/mockBuilder';

const MockContext = createContext();

export function MockProvider({ children }) {
  const [allMocks, setAllMocks] = useState([]);
  const [questionData, setQuestionData] = useState(null);
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    const qData = loadQuestionPool();
    const mocks = loadAllMocks();
    setQuestionData(qData);
    setAllMocks(mocks);

    const savedStatuses = {};
    mocks.forEach(m => {
      const attemptStr = localStorage.getItem(`attempt_${m.mock_id}`);
      if (attemptStr) {
        try {
          const attempt = JSON.parse(attemptStr);
          savedStatuses[m.mock_id] = attempt.status || 'not_started';
        } catch (e) {
          savedStatuses[m.mock_id] = 'not_started';
        }
      } else {
        savedStatuses[m.mock_id] = 'not_started';
      }
    });
    setStatuses(savedStatuses);
  }, []);

  const getMockById = (id) => {
    if (!allMocks.length || !questionData) return null;
    return buildMock(id, allMocks, questionData.idMap);
  };

  const getMockStatus = (id) => {
    return statuses[id] || 'not_started';
  };

  const updateMockStatus = (id, status) => {
    setStatuses(prev => ({ ...prev, [id]: status }));
  };

  const value = {
    allMocks,
    questionData,
    getMockById,
    getMockStatus,
    updateMockStatus
  };

  return <MockContext.Provider value={value}>{children}</MockContext.Provider>;
}

export function useMock() {
  return useContext(MockContext);
}
