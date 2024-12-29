const passions = ['Art', 'Technology', 'Health', 'Business', 'Science', 'Environment', 'Sports', 'Music'];

window.onload = function() {
    populateDropdowns('passion1');
    populateDropdowns('passion2');
    populateDropdowns('passion3');
};

// Populate dropdowns dynamically
function populateDropdowns(id) {
    const select = document.getElementById(id);
    select.innerHTML = '<option value="" disabled selected>Select Passion Area</option>';
    passions.forEach(passion => {
        const option = document.createElement('option');
        option.value = passion;
        option.textContent = passion;
        select.appendChild(option);
    });
}

document.getElementById('generatePath').addEventListener('click', function() {
    const studentName = document.getElementById('studentName').value;
    const gradeLevel = document.getElementById('gradeLevel').value;
    const passion1 = document.getElementById('passion1').value;
    const passion2 = document.getElementById('passion2').value;
    const passion3 = document.getElementById('passion3').value;

    if (!studentName || !gradeLevel || !passion1 || !passion2 || !passion3) {
        alert('Please fill all fields before generating the path.');
        return;
    }

    // Simulated output
    const output = `
        <h2>Suggested Path for ${studentName}</h2>
        <p><strong>Grade Level:</strong> ${gradeLevel}</p>
        <p><strong>Passion Areas:</strong> ${passion1}, ${passion2}, ${passion3}</p>
        
        <h3>Suggested College Majors</h3>
        <ul>
            <li>${suggestMajors(passion1)}</li>
            <li>${suggestMajors(passion2)}</li>
            <li>${suggestMajors(passion3)}</li>
        </ul>

        <h3>Suggested Activities</h3>
        ${generateActivities(passion1)}
        ${generateActivities(passion2)}
        ${generateActivities(passion3)}

        <h3>Top 20 Colleges for Selected Majors</h3>
        <ul>
            ${generateColleges(passion1)}
        </ul>

        <h3>Academic Requirements</h3>
        <p>Weighted GPA: 3.8+ | Unweighted GPA: 3.5+ | SAT: 1350+ | ACT: 29+</p>
    `;

    document.getElementById('outputSection').innerHTML = output;
    generateSpiderChart();
});

// Suggest majors based on passion areas
function suggestMajors(passion) {
    const majorMap = {
        'Art': 'Fine Arts, Graphic Design, Theater',
        'Technology': 'Computer Science, Engineering, AI',
        'Health': 'Medicine, Biotech, Sports Science',
        'Business': 'Economics, Entrepreneurship, Marketing'
    };
    return majorMap[passion] || 'Undeclared';
}

// Generate suggested activities
function generateActivities(passion) {
    const activityMap = {
        'Art': ['Art Exhibitions', 'Drawing Classes', 'Photography'],
        'Technology': ['Coding Bootcamps', 'Hackathons', 'Robotics'],
        'Health': ['First Aid Training', 'Sports Competitions', 'Health Camps'],
        'Business': ['Leadership Seminars', 'Business Plan Competitions']
    };
    const activities = activityMap[passion] || [];
    return activities.map(activity => `
        <p>${activity} <input type="range" min="1" max="10"></p>
    `).join('');
}

// Simulate colleges
function generateColleges() {
    const colleges = ['Stanford', 'MIT', 'Harvard', 'UC Berkeley'];
    return colleges.map(college => `<li>${college}</li>`).join('');
}

// Chart.js spider chart
function generateSpiderChart() {
    const ctx = document.getElementById('spiderChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Academics', 'Leadership', 'Activities', 'Creativity'],
            datasets: [{
                label: 'Profile Strength',
                data: [8, 7, 9, 6],
                backgroundColor: 'rgba(52, 152, 219, 0.3)',
                borderColor: '#3498db'
            }]
        },
        options: {
            scale: {
                ticks: { beginAtZero: true, max: 10 }
            }
        }
    });
}
