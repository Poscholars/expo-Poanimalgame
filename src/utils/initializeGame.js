import data from "../constants/data"

export default async (database) => {

    const animalbase = database.collections.get("animaldata")
    const  animals = Object.keys(data)
    const li = []
    const loop = ["1","2","3","4","5","6"]

    const DeleteCourse = async (data) => {
        const getcourse = await database.write(async() => {
            const CourseData = await database.collections.get('userdata').query().fetch()
            const deleted = CourseData.map(data => data.prepareDestroyPermanently())
            const CourseData2 = await database.collections.get('animaldata').query().fetch()
            const deleted2 = CourseData2.map(data => data.prepareDestroyPermanently())
            database.batch(...deleted,...deleted2,...data)
        })
         
    }
    // const SaveAnimals = async (data) => {
    //      await database.write(async () =>{
    //         try{
    //             await database.batch(...data)
    //         }catch(e){
                
    //             await database.batch(...data)
    //         }
           
    //     })
    //  }

    animals.forEach((animal,i)=>{
        loop.forEach(data=>{
            li.push(
                animalbase.prepareCreate(write=>{
                    write.animalClass = animal
                    write.gameLevel = `level${data}`
                    write.animalsLearnt = "[]"
                    write.noAnimals = 0
                }
                )
            )
        })
    })
    
    DeleteCourse(li)



}