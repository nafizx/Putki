const axios = require('axios');

module.exports = {
    config: {
        name: "gpt",
        author: "Nafiz",
        description: "Send a response using the GPT-4 Mini API",
        category: "text",
        usage: "<prompt>",
        usePrefix: true
    },

    onStart: async function ({ bot, chatId, args }) {
        const prompt = args.join(' ');
        if (!prompt) {
            bot.sendMessage(chatId, "Please provide a prompt.");
            return;
        }

        try {
            const apiUrl = `https://www.samirxpikachu.run.place/gpt4mini?prompt=${encodeURIComponent(prompt)}`;
            const response = await axios.get(apiUrl);
            const responseData = response.data;

            if (responseData) {
                bot.sendMessage(chatId, responseData);
            } else {
                bot.sendMessage(chatId, "No response received from the API.");
            }
        } catch (error) {
            console.error('Error sending response:', error);
            bot.sendMessage(chatId, 'Sorry, an error occurred while processing your request.');
        }
    }
};
