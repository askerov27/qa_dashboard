import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import { getBugs, getRegressBugs } from "./services/get_bugs.services.js";
import {
  printBugs,
  printOpenBugs,
  printRegressOpenBugs,
} from "./services/print.services.js";

const bot = new TelegramBot(process.env.TELEGRAM_KEY, {
  polling: true,
});

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Отправляем сообщение с клавиатурой
  bot.sendMessage(chatId, "Выберите действие:", {
    reply_markup: {
      keyboard: [
        ["Статистика багов по US"],
        ["Статистика открытых багов по US"],
        ["баги в регрессе"],
        ["открытые баги в регрессе"],
        ["статус регресса в %"],
        ["время регресса"],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

//Статистика багов по US"
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === "Статистика багов по US") {
    bot.sendMessage(chatId, "Введите номер US");
    bot.once("message", async (msg) => {
      try {
        const numbers = msg.text;
        const takeMsg = await getBugs(numbers);
        bot.sendMessage(chatId, printBugs(takeMsg), {
          parse_mode: "Markdown",
        });
      } catch (error) {
        bot.sendMessage(chatId, "Error: не верно введен номер US");
      }
    });
  }
});
//Статистика багов по US"
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === "Статистика открытых багов по US") {
    bot.sendMessage(chatId, "Введите номер US");
    bot.once("message", async (msg) => {
      try {
        const numbers = msg.text;
        const takeMsg = await getBugs(numbers);
        bot.sendMessage(chatId, printOpenBugs(takeMsg), {
          parse_mode: "Markdown",
        });
      } catch (error) {
        bot.sendMessage(chatId, "Error: не верно введен номер US");
      }
    });
  }
});
//баги в регрессе
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === "баги в регрессе") {
    bot.sendMessage(
      chatId,
      "Введите с какой даты отсчитывать баги (ex: 2024-01-31)"
    );
    bot.once("message", async (msg) => {
      try {
        const dataRange = msg.text;

        const takeMsg = await getRegressBugs(dataRange);

        bot.sendMessage(chatId, printBugs(takeMsg), {
          parse_mode: "Markdown",
        });
      } catch (error) {
        bot.sendMessage(chatId, "Error: не верно введен номер US");
      }
    });
  }
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === "открытые баги в регрессе") {
    bot.sendMessage(
      chatId,
      "Введите с какой даты отсчитывать баги (ex: 2024-01-31)"
    );
    bot.once("message", async (msg) => {
      try {
        const dataRange = msg.text;

        const takeMsg = await getRegressBugs(dataRange);

        bot.sendMessage(chatId, printOpenBugs(takeMsg), {
          parse_mode: "Markdown",
        });
      } catch (error) {
        bot.sendMessage(chatId, "Error: не верно введен номер US");
      }
    });
  }
});
