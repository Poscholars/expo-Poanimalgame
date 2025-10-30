import {Model} from "@nozbe/watermelondb"
import { field, writer } from '@nozbe/watermelondb/decorators'


class AnimalData extends Model {
  static table = 'animaldata';
  @field('animal_class') animalClass
  @field('game_level') gameLevel
  @field('animals_learnt') animalsLearnt
  @field('no_animals') noAnimals

  
}

class UserData extends Model {
    static table = 'userdata';
    @field('user_name') userName
    @field('email') email
    @field('phone_number') phoneNumber

    @writer async updateUser(useremail,phone){
      await this.update(user => {
        user.email = useremail
        user.phoneNumber = phone
      })
    }
  }

class Key extends Model {
    static table = 'userkey';
    @field('key') key
    @field('idc') idc
    @field('token') token
    @field('showbutton') showbutton

    @writer async updateKey(key,token){
      await this.update(usekey => {
        usekey.key = key,
        usekey.token = token
      })
    }
  }

class Link extends Model {
    static table = 'whatsapp';
    @field('idc') idc
    @field('link') link
  }

  class Coin extends Model {
    static table = 'coin';
    @field('coin_amount') coinAmount
    @field('idc') idc

    @writer async increaseCoin(amount){
      await this.update(coin => {
        coin.coinAmount = coin.coinAmount + amount
      })
    }

    @writer async decreaseCoin(amount){
      await this.update(coin => {
        coin.coinAmount = coin.coinAmount - amount
      })
      }
    }

 
  class DarkMode extends Model {
    static table = 'darkmode';
    @field('dark_mode') isDarkMode
    @field('idc') idc


    @writer async writeTheme(themestate){
      await this.create(theme => {
        theme.idc = 1
        theme._raw.id = "1"
        theme.isDarkMode = themestate
      })
    }

    @writer async updateTheme(){
      await this.update(theme=>{
        theme.isDarkMode = !theme.isDarkMode
      })
    }
  }

  class PlaySound extends Model {
    static table = 'playsound';
    @field('play_sound') playSound
    @field('idc') idc


    @writer async updateSound(){
      await this.update(sound=>{
        sound.playSound = !sound.playSound
      })
    }
  }
  
export {AnimalData,UserData,Coin,Key,Link,DarkMode,PlaySound}