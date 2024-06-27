# DaVinci (GPT-3) Telegram Bot

ChatGPT rebuilt with the GPT-3 DaVinci OpenAI model.

The bot has a terrible memory, so don't expect it to remember any chat context. But you can ask follow-up questions using a plus sign

## Available commands

-   `/retry` - retry answering the last question
-   `/help` - show help

## Setup

1. Get your [OpenAI API](https://openai.com/api/) key

2. Get your Telegram bot token from [@BotFather](https://t.me/BotFather)

3. Copy `config.example.yml` to `config.yml` and specify your tokens there.

4. Start the bot:

```bash
docker compose up --build
```

## Credits

Based on the [chatgpt_telegram_bot](https://github.com/karfly/chatgpt_telegram_bot).
