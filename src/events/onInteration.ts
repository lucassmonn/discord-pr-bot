import { Interaction, MessageEmbed } from 'discord.js'
import { closePr } from '../modules/closePr'
import { CommandList } from '../_commandList'

export const onInteraction = async (interaction: Interaction) => {
  if (interaction.isCommand()) {
    for (const Command of CommandList) {
      if (interaction.commandName === Command.data.name) {
        await Command.run(interaction)
        break
      }
    }
  }

  if (interaction.isButton()) {
    const newPr = await closePr(interaction.customId)
    if (newPr) {
      const { user } = interaction
      const oneHundredEmbed = new MessageEmbed()
      oneHundredEmbed.setTitle(`PR Closed.`)
      oneHundredEmbed
        .setAuthor({
          name: user.tag,
          iconURL: user.displayAvatarURL(),
        })
        .setURL(newPr.link)

      oneHundredEmbed.setFooter({
        text: `Created at:  ${new Date(newPr.createdAt).toLocaleString(
          'pt-BR'
        )}\nCreated by: ${
          newPr.discordId
        }\nApproved at: ${new Date().toLocaleString('pt-BR')}\nApproved by: ${
          user.tag
        }`,
      })

      await interaction.update({
        embeds: [oneHundredEmbed],
        components: [],
      })
    }
  }
}
