const bounties = [
    {
        severity: 'Low',
        title: 'Insecure OAuth Implementation and Endpoint Misconfiguration (Duplicate)',
        description: 'These vulnerabilities pose significant risks including unauthorized API access and potential data exposure due to insecure authentication and endpoint misconfiguration.',
        bounty: 'NA',
        date: 'June 2024',
        company: 'Cyberghost VPN'
        },
        {
        severity: 'High',
        title: 'PII Exposure via Archived employeeDirectory.json Endpoint (Duplicate)',
        description: 'An archived employeeDirectory.json endpoint exposed PII, leading to potential privacy risks.',
        bounty: 'NA',
        date: 'Jan 2025',
        company: 'Government Agency'
        },
        {
        severity: 'Medium',
        title: 'COVID-19 Testing Site Data Exposure via Web Archive (Duplicate)',
        description: 'Exposure of site addresses and coordinates risks phishing, scams, and unauthorized access.',
        bounty: 'NA',
        date: 'Jan 2025',
        company: 'a healthcare provider'
        },
        {
        severity: 'High',
        title: 'Unauthenticated Cache Purge via Varnish (Duplicate)',
        description: 'Allows attackers to purge cached content, causing downtime or serving outdated data.',
        bounty: 'NA',
        date: 'Oct 2024',
        company: 'Media Company'
        },
        {
        severity: 'High',
        title: 'Reflected XSS in Search Functionality',
        description: ' Allows theft of session data, phishing, and script execution, but no bounty as no bug bounty program exists.',
        bounty: 'NA',
        date: 'Dec 2024',
        company: 'Media Company'
        },
        {
        severity: 'Medium',
        title: 'HTTP Header Injection / SSRF via X-Forwarded-Host',
        description: 'Allows phishing, internal service access, and security bypass, but no bounty as no bug bounty program exists.',
        bounty: 'NA',
        date: 'Dec 2024',
        company: 'Media Company'
        },
        {
        severity: 'High',
        title: 'Public Exposure of Confidential Contract Files',
        description: 'Unauthorized access to sensitive business contracts poses significant risks, but no bounty is available as the company operates a Vulnerability Disclosure Program (VDP) without monetary rewards.',
        bounty: 'NA',
        date: 'Feb 2025',
        company: 'Telecommunications and Network Services Provider'
        },
        {
        severity: 'High',
        title: 'Public Exposure of Firmware Deployment Archives',
        description: 'Unauthorized access to firmware deployment details and internal infrastructure poses significant security risks. No bounty is available as the company operates a Vulnerability Disclosure Program (VDP) without monetary rewards.',
        bounty: 'NA',
        date: 'Feb 2025',
        company: 'Technology Company Specializing in Placeshifting and Smart TV Solutions'
        },
        {
        severity: 'High',
        title: 'Public Exposure of Database Migration Files',
        description: 'Unauthorized access to sensitive database migration scripts poses significant security risks. No bounty is available as the company operates a Vulnerability Disclosure Program (VDP) without monetary rewards.',
        bounty: 'NA',
        date: 'Feb 2025',
        company: 'Technology Company Specializing in Placeshifting and Smart TV Solutions'
        },
        {
        severity: 'High',
        title: 'Public Exposure of Confidential Firmware Release Notes',
        description: 'Unauthorized access to confidential firmware release notes poses significant security and competitive risks. No bounty is available as the company operates a Vulnerability Disclosure Program (VDP) without monetary rewards.',
        bounty: 'NA',
        date: 'Feb 2025',
        company: 'Consumer Electronics Company Specializing in Video Placeshifting Products and Services'
        },
        {
        severity: 'High',
        title: 'Public Exposure of SQL Database File',
        description: 'Unauthorized access to sensitive SQL database files poses significant security and data privacy risks. No bounty is available as the company operates a Vulnerability Disclosure Program (VDP) without monetary rewards.',
        bounty: 'NA',
        date: 'Feb 2025',
        company: 'Consumer Electronics Company Specializing in Video Placeshifting Products and Services'
        },
        {
        severity: 'Critical',
        title: 'HTML Injection Enabling Fake Login Page Deployment',
        description: 'Facilitates credential theft and phishing attacks by allowing malicious content injection. No bounty is available as the organization operates a Vulnerability Disclosure Program (VDP) without monetary rewards.',
        bounty: 'NA',
        date: 'Jan 2025',
        company: 'E-commerce Platform'
        },
        {
        severity: 'High',
        title: 'Reflected XSS Vulnerability in Search Parameter',
        description: 'Enables attackers to execute arbitrary JavaScript, leading to potential session hijacking or data theft. No bounty is available as the organization operates a Vulnerability Disclosure Program (VDP) without monetary rewards.',
        bounty: 'NA',
        date: 'Jan 2025',
        company: 'E-commerce Platform'
        },
];

let currentSeverity = 'all';
let showAllFindings = false;

function filterFindings(severity) {
    currentSeverity = severity;
    showAllFindings = false; // Reset to show only 2 findings when filter changes
    renderFindings();
    // Update active button styling
    document.querySelectorAll('.bg-gray-50 button').forEach(btn => {
        if (btn.textContent.toLowerCase() === severity.toLowerCase()) {
            btn.classList.add('bg-white', 'shadow-sm');
        } else {
            btn.classList.remove('bg-white', 'shadow-sm');
        }
    });
}

function renderFindings() {
    const container = document.getElementById('findings-container');
    container.innerHTML = '';
    let filteredBounties = bounties;
    if (currentSeverity !== 'all') {
        filteredBounties = bounties.filter(b => b.severity === currentSeverity);
    }
    const displayBounties = showAllFindings ? filteredBounties : filteredBounties.slice(0, 3);
    displayBounties.forEach(bounty => {
        const severityColor = {
            'Critical': 'red',
            'High': 'orange',
            'Medium': 'yellow',
            'Low': 'blue'
        }[bounty.severity];
        container.innerHTML += `
            <div class="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex items-start justify-between">
                    <div>
                        <span class="inline-block px-3 py-1 text-sm font-medium text-${severityColor}-700 bg-${severityColor}-100 rounded-full mb-3">${bounty.severity} Severity</span>
                        <h3 class="text-xl font-semibold mb-2">${bounty.title}</h3>
                        <p class="text-gray-600 mb-4">${bounty.description}</p>
                    </div>
                    <span class="text-green-600 font-semibold">${bounty.bounty} Bounty</span>
                </div>
                <div class="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                    <span class="flex items-center gap-1">
                        <i class="ri-calendar-line"></i>
                        <span>Reported: ${bounty.date}</span>
                    </span>
                    <span class="flex items-center gap-1">
                        <i class="ri-building-line"></i>
                        <span>${bounty.company}</span>
                    </span>
                </div>
            </div>
        `;
    });

    if (filteredBounties.length > 2) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'text-center mt-4';
        const button = document.createElement('button');
        button.className = 'text-primary hover:underline';
        button.onclick = toggleFindings;
        button.textContent = showAllFindings ? 'See Less' : 'See More';
        buttonContainer.appendChild(button);
        container.appendChild(buttonContainer);
    }
}

function toggleFindings() {
    showAllFindings = !showAllFindings;
    renderFindings();
}

// Initial load
filterFindings('all');

document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault();  // Prevent default form submission
  
      const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          message: document.getElementById('message').value
      };
  
      console.log('Form submitted:', formData);
  
      try {
          const response = await fetch('/submit', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: new URLSearchParams(formData)  // Convert JSON to form-urlencoded
          });
  
          const result = await response.json();
  
          if (result.success) {
              // Show success notification
              const notification = document.createElement('div');
              notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
              notification.textContent = result.message;
              document.body.appendChild(notification);
              
              setTimeout(() => {
                  notification.remove();
              }, 3000);
  
              // Redirect to WhatsApp with message
              if (result.whatsapp_link) {
                  window.open(result.whatsapp_link, '_blank');  // Open WhatsApp link
              }
  
              // Reset the form
              e.target.reset();
          } else {
              alert(result.message);  // Show error if submission fails
          }
      } catch (error) {
          console.error('Error submitting form:', error);
          alert('Failed to send message. Please try again.');
      }
  });
  