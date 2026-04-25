const fs = require('fs');
const path = 'c:/Projects/Cet_engine/Cet_engine/public/mock_plan.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

let output = "# CET 2026 Mock Test Blueprint\n\n";

Object.keys(data).forEach(subject => {
  output += `## ${subject.toUpperCase()}\n\n`;
  data[subject].forEach(mock => {
    const topics = mock.topics.map(t => `${t.name.replace(/_/g, ' ')} (${t.count} Qs)`).join(', ');
    output += `### Mock ${mock.id}\n`;
    output += `**Topics:** ${topics}\n\n`;
  });
});

fs.writeFileSync('c:/Projects/Cet_engine/Cet_engine/artifacts/mock_blueprint.md', output);
console.log("Blueprint generated at artifacts/mock_blueprint.md");
