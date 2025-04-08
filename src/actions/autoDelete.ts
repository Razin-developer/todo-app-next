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

  let data;

  if (type === 'day') {
    data = await db.day.deleteMany({
      where: {
        createdAt: {
          lt: timeLimit,
        },
      },
    })
  } else if (type === 'week') {
    data = await db.week.deleteMany({
      where: {
        createdAt: {
          lt: timeLimit,
        },
      },
    })
  } else if (type === 'month') {
    data = await db.month.deleteMany({
      where: {
        createdAt: {
          lt: timeLimit,
        },
      },
    })
  } else if (type === 'year') {
    data = await db.year.deleteMany({
      where: {
        createdAt: {
          lt: timeLimit,
        },
      },
    })
  } else if (type === 'other') {
    data = await db.other.deleteMany({
      where: {
        createdAt: {
          lt: timeLimit,
        },
      },
    })
  }

  console.log(`Deleted ${(data as { count: number }).count} old ${type} entries.`)
}
