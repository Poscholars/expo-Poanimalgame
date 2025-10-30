
export default async (database) => {
        const theme = await database.get('darkmode').find("1")
        theme.updateTheme()
  }

export const writeTheme = async (database,themestate) => {
    await database.write(async () => {
        const theme = await database.get('darkmode').create((darktheme) => {
          darktheme.idc = 1
          darktheme._raw.id = "1"
          darktheme.isDarkMode = themestate
        })
      })

}