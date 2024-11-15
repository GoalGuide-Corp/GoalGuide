const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function updateConfig() {
    try {
        const response = await axios.get('http://127.0.0.1:4040/api/tunnels'); // `ngrok` API endpoint
        const publicUrl = response.data.tunnels[0].public_url;
        
        const configPath = path.join(__dirname, 'config.js'); // Adjusted path
        
        const configContent = `const API_URL = '${publicUrl}';\n\nexport { API_URL };`;
        fs.writeFileSync(configPath, configContent);

        console.log(`Config updated with new API_URL: ${publicUrl}`);
    } catch (error) {
        console.error('Error updating config.js:', error);
    }
}

updateConfig();
