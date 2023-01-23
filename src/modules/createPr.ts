import PrModel, { ICreatePr, IPr } from '../database/models/PrModel'

export const createPr = async (data: ICreatePr): Promise<IPr> => {
  try {
    data.required = data.required ? data.required : '@everyone'
    const pr = await PrModel.create(data)
    return pr
  } catch (error) {
    console.log('Error trying to create a pr', error)
    throw error
  }
}
