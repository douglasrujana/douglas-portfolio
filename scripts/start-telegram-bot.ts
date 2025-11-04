#!/usr/bin/env node
// scripts/start-telegram-bot.ts

/**
 * Script para iniciar el bot de Telegram
 * 
 * Uso:
 *   npm run bot:telegram
 *   
 * O directamente:
 *   tsx scripts/start-telegram-bot.ts
 */

import 'dotenv/config';
import { startTelegramBot } from '../src/infrastructure/bots/telegram-bot';

async function main() {
  console.log('🚀 Starting Telegram Bot...\n');

  try {
    const bot = await startTelegramBot();

    // Manejo de señales para shutdown graceful
    process.on('SIGINT', async () => {
      console.log('\n\n⚠️  Received SIGINT, shutting down gracefully...');
      await bot.stop();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\n\n⚠️  Received SIGTERM, shutting down gracefully...');
      await bot.stop();
      process.exit(0);
    });

    // Mantener el proceso vivo
    process.stdin.resume();
  } catch (error) {
    console.error('❌ Failed to start bot:', error);
    process.exit(1);
  }
}

main();
