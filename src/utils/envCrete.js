const fs = require('fs');
const readline = require('readline');

async function main() {
  const { default: chalk } = await import('chalk'); // Import chalk dynamically

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const fields = [
    { key: 'REACT_APP_API_URL', prompt: 'Enter backend URL for REACT_APP_API_URL (default http://localhost:5000): ', defaultValue: 'http://localhost:5000' },
    { key: 'SERVER', prompt: 'Enter backend server URL for SERVER (default http://localhost:5000): ', defaultValue: 'http://localhost:5000' },
    { key: 'CLIENT_URL', prompt: 'Enter frontend URL for CLIENT_URL (default http://localhost:3000): ', defaultValue: 'http://localhost:3000' },
    { key: 'NODE_ENV', prompt: 'Enter environment for NODE_ENV (default development): ', defaultValue: 'development' },
    { key: 'RAZORPAY_ID', prompt: 'Enter Razorpay ID for RAZORPAY_ID (Optional): ', optional: true }
  ];

  const askQuestions = async (index = 0, config = {}) => {
    if (index === fields.length) {
      const configContent = Object.entries(config)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

      fs.writeFileSync('./.env', configContent);
      console.log(chalk.yellow('Successfully created .env file!'));
      rl.close();
      return;
    }

    const { key, prompt, defaultValue, optional } = fields[index];

    rl.question(chalk.blue(prompt), (answer) => {
      if (optional && answer.trim() === '') {
        config[key] = '';
      } else {
        config[key] = answer.trim() || defaultValue || '';
      }

      askQuestions(index + 1, config);
    });
  };

  console.log(chalk.green('Creating .env file for your project...'));
  askQuestions();
}

main();