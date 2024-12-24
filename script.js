function parseTime(timeString) {
    const [hours, minutes] = timeString.split(/[:h]/).map(Number);
    return hours + minutes / 60;
}

function calculateHours() {
    const input = document.getElementById('plannerInput').value;
    const timePattern = /(\d{1,2}[:h]\d{2}) - (\d{1,2}[:h]\d{2})/g;
    const lines = input.split('\n');
    let totalHours = 0;
    let output = '';

    lines.forEach(line => {
        let dailyHours = 0;
        const matches = Array.from(line.matchAll(timePattern));

        matches.forEach(match => {
            const [_, startTime, endTime] = match;
            const startHours = parseTime(startTime.trim());
            const endHours = parseTime(endTime.trim());
            dailyHours += endHours - startHours;
        });

        if (matches.length > 0) {
            output += `${line.match(/(Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/) || `Day ${lines.indexOf(line) + 1}`}: ${dailyHours.toFixed(2)} hours\n`;
            totalHours += dailyHours;
        }
    });

    output += `\nTotal Hours: ${totalHours.toFixed(2)} hours`;
    document.getElementById('output').innerText = output;
}

function copyOutput() {
    const output = document.getElementById('output');
    navigator.clipboard.writeText(output.innerText)
        .then(() => alert('Output copied to clipboard!'))
        .catch(err => alert('Failed to copy output: ', err));
}
