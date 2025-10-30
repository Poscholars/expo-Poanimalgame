export default async (database,setUser) => {
    const gameuser = await database.collections.get('coin').query().fetch()
    setUser(v => gameuser[0])
  }