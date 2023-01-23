import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Client } from 'discord.js'
import { Command } from '../interfaces/command'
import { CommandList } from '../_commandList'

export const onReady = async (BOT: Client) => {
  const rest = new REST({ version: '9' }).setToken(
    process.env.BOT_TOKEN as string
  )

  const commandData = CommandList.map((command: Command) =>
    command.data.toJSON()
  )

  await rest.put(
    Routes.applicationGuildCommands(
      BOT.user?.id || 'missing id',
      process.env.GUILD_ID as string
    ),
    { body: commandData }
  )

  console.log('Discord ready!')
}
