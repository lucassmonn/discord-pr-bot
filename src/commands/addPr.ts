import { SlashCommandBuilder } from '@discordjs/builders'
import {
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from 'discord.js'
import { Command } from '../interfaces/command'
import { createPr } from '../modules/createPr'

export const addPr: Command = {
  data: new SlashCommandBuilder()
    .setName('pr')
    .setDescription('Add a new PR to list')
    .addStringOption((option) =>
      option.setName('link').setDescription('PR Link').setRequired(true)
    )
    .addMentionableOption((option) =>
      option
        .setName('approver')
        .setDescription('User required to approve the PR')
    ),
  run: async (interaction: CommandInteraction) => {
    await interaction.deferReply()
    const { user } = interaction
    const pr = interaction.options.getString('link', true)
    const newPr = await createPr({
      discordId: user.tag,
      link: pr,
      required: interaction.options.getMentionable('approver')?.toString(),
    })

    try {
      const oneHundredEmbed = new MessageEmbed()
      oneHundredEmbed.setTitle(`New PR created.`)
      oneHundredEmbed.setDescription(`${newPr.required}\nCan you check please?`)
      oneHundredEmbed
        .setAuthor({
          name: user.tag,
          iconURL: user.displayAvatarURL(),
        })
        .setURL(newPr.link)
      oneHundredEmbed.setFooter({
        text: `Created at:  ${new Date(newPr.createdAt).toLocaleString(
          'pt-BR'
        )}\nCreated by: ${newPr.discordId}\n`,
      })

      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId(`${newPr.id}`)
          .setLabel('Close')
          .setStyle('PRIMARY')
      )

      await interaction.editReply({
        embeds: [oneHundredEmbed],
        components: [row],
      })
    } catch (err) {
      await interaction.editReply({
        content: 'Something went wrong, try again later',
      })
    }
  },
}
