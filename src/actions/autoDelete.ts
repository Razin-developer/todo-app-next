import db from "@/lib/db"

export const deleteData = async (type: 'day' | 'week' | 'month' | 'year') => {
  let timeLimit = new Date()

  switch (type) {
    case 'day':
      timeLimit = new Date(Date.now() - 24 * 60 * 60 * 1000)
      break
    case 'week':
      timeLimit = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      break
    case 'month':
      timeLimit = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      break
    case 'year':
      timeLimit = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
      break
    default:
      throw new Error('Invalid type')
  }

  const modelMap = {
    day: db.day,
    week: db.week,
    month: db.month,
    year: db.year,
  }

  const model = modelMap[type] as any // Type-safe access

  const { count } = await model.deleteMany({
    where: {
      createdAt: {
        lt: timeLimit,
      },
    },
  })

  console.log(`Deleted ${count} old ${type} entries.`)
}
