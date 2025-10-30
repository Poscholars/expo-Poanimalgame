
export default async (database) => {
    const sound = await database.get('playsound').find("1")
    sound.updateSound()
}

export const writeSound = async (database,soundstate) => {
await database.write(async () => {
    const theme = await database.get('playsound').create((sound) => {
      sound.idc = 1
      sound._raw.id = "1"
      sound.playSound = soundstate
    })
  })

}