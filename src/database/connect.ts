import { connect } from 'mongoose'

export const connectDatabase = async (uri: string): Promise<void> => {
  connect(uri, () => {
    console.log('Database connected')
  })
  return
}
