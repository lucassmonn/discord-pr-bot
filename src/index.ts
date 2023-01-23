import { Client } from 'discord.js'
import { IntentOptions } from './config/IntentOptions'
import { connectDatabase } from './database/connect'
import { onInteraction } from './events/onInteration'
import { onReady } from './events/onReady'
;(async () => {
  const BOT = new Client({ intents: IntentOptions })

  BOT.on('ready', async () => await onReady(BOT))

  BOT.on(
    'interactionCreate',
    async (interaction) => await onInteraction(interaction)
  )

  await connectDatabase(process.env.MONGO_URI as string)

  await BOT.login(process.env.BOT_TOKEN as string)
})()
