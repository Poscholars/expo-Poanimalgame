import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
  version: 5,
  tables: [
    tableSchema({
      name: 'animaldata',
      columns: [
        { name: 'animal_class', type: 'string'},
        { name: 'game_level', type: 'string' },
        { name: 'no_animals', type: 'number'},
        {name: 'animals_learnt', type: 'string'}
      ]
    }),
    tableSchema({
        name: 'userdata',
        columns: [
          { name: 'user_name', type: 'string' },
          { name: 'email', type: 'string' },
          { name: 'phone_number', type: 'string', isOptional: true },
        ]
      }),
    tableSchema({
      name: 'coin',
      columns: [
        { name: 'coin_amount', type: 'number' },
        {name: 'idc', type:'number'}
      ]
    }),
    tableSchema({
      name: 'userkey',
      columns: [
        { name: 'key', type: 'string',isOptional:true},
        {name: 'idc', type: "number"},
        {name:"token", type:"string",isOptional:true},
        {name:"showbutton", type:'string'}
      ]
    }),
    tableSchema({
      name: 'darkmode',
      columns: [
        { name: 'dark_mode', type: 'boolean' },
        {name: 'idc', type:'number'}
      ]
    }),
    tableSchema({
      name: 'playsound',
      columns: [
        { name: 'play_sound', type: 'boolean' },
        {name: 'idc', type:'number'}
      ]
    }),
    tableSchema({
      name: 'whatsapp',
      columns: [
        { name: 'idc', type: 'number' },
        {name: 'link', type:'string'}
      ]
    }),
  ]
})
