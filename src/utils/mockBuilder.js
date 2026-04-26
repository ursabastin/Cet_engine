export function loadAllMocks() {
  const files = import.meta.glob('../../practice_pool/mocks/full_mocks/*.json', { eager: true, import: 'default' });
  const mocks = [];
  for (const path in files) {
    mocks.push(files[path]);
  }
  return mocks.sort((a, b) => {
    const numA = parseInt(a.mock_id.split('-').pop());
    const numB = parseInt(b.mock_id.split('-').pop());
    return numA - numB;
  });
}

export function buildMock(mockId, allMocks, idMap) {
  const mockData = allMocks.find(m => m.mock_id === mockId);
  if (!mockData) return null;

  const builtMock = JSON.parse(JSON.stringify(mockData));

  if (builtMock.sections) {
    builtMock.sections.forEach(section => {
      if (section.questions) {
        section.questions = section.questions.map(qId => idMap[qId] || { id: qId, missing: true });
      }
    });
  }

  return builtMock;
}
