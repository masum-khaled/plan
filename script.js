function parseTime(timeString) {
  const [hours, minutes] = timeString.split('h').map(Number);
  return hours + minutes / 60;
}

function calculateHours() {
  const input = document.getElementById('plannerInput').value;
  const timePattern = /(\d{1,2}h\d{2}) - (\d{1,2}h\d{2})/g;
  const matches = input.matchAll(timePattern);
  let totalHours = 0;
  let output = '';

  for (const match of matches) {
      const [_, startTime, endTime] = match;
      const startHours = parseTime(startTime.trim());
      const endHours = parseTime(endTime.trim());
      const dailyHours = endHours - startHours;
      output += `${startTime.trim()} - ${endTime.trim()}: ${dailyHours.toFixed(2)} hours\n`;
      totalHours += dailyHours;
  }

  output += `\nTotal Hours: ${totalHours.toFixed(2)} hours`;
  document.getElementById('output').innerText = output;
}

function copyOutput() {
  const output = document.getElementById('output');
  navigator.clipboard.writeText(output.innerText)
      .then(() => alert('Output copied to clipboard!'))
      .catch(err => alert('Failed to copy output: ', err));
}
