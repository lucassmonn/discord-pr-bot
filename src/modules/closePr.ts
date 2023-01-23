import PrModel, { IPr } from '../database/models/PrModel'

export const closePr = async (id: string): Promise<IPr | null> => {
  try {
    const pr = await PrModel.findOneAndUpdate(
      { _id: id },
      { active: false },
      { new: true }
    )

    return pr
  } catch (error) {
    console.log('Error trying to close a pr', error)
    throw error
  }
}
