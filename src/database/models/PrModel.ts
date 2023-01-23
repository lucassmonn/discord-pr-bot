import { model, Schema } from 'mongoose'

export interface ICreatePr {
  discordId: string
  required?: string
  link: string
}

export interface IPr {
  id: string
  discordId: string
  link: string
  active: boolean
  required?: string
  createdAt: Date
}

export const PR = new Schema(
  {
    discordId: String,
    link: String,
    active: {
      type: Boolean,
      default: true,
    },
    required: String,
  },
  { timestamps: true }
)

export default model<IPr>('Pr', PR)
