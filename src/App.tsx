import { useEffect, useState } from 'react'
import './App.css'
import { characterList, classDescription, classes, deck } from './constants/common';
import clsx from 'clsx';

export type Card = {
  id: number;
  type: 'potion' | 'weapon' | 'enemy';
  value: number;
}
type Weapon = {
  power: number;
  durabilitiy: number;
}

function App() {
  const [remainingRooms, setRemainingRooms] = useState<Card[]>(deck.sort(() => 0.5 - Math.random()))
  const [dungeon, setDungeon] = useState<Card[]>([])
  const [currentWeapon, setCurrentWeapon] = useState<Weapon>()
  const [maxHP, setMaxHP] = useState<number>(20)
  const [health, setHealth] = useState<number>(maxHP)
  const [canRun, setCanRun] = useState<boolean>(true)
  const [useBareHands, setUseBareHands] = useState<boolean>(false)
  const [endText, setEndText] = useState<string>('Game Over')
  const [character, setCharacter] = useState<classes>()

  const ExploreDungeon = () => {
    const getCount = dungeon.length > 0 ? 3 : 4
    const newRoom = [...dungeon, ...remainingRooms.splice(0, getCount)]
    setDungeon(newRoom)
    const allEnemies = newRoom.filter((card) => card.type === 'enemy').length === 0
    setCanRun(character === classes.berserker && allEnemies ? false : true)
    switch(character) {
      case classes.healer:
        setHealth(health < maxHP ? health+1 : health)
        break
      case classes.blacksmith:
        if(currentWeapon){
          setCurrentWeapon({power: currentWeapon.power, durabilitiy: currentWeapon.durabilitiy+2 > 15 ? 15 : currentWeapon.durabilitiy+2})
        }
      break
    }
  }

  const handleEncounter = (card: Card) => {
    let healing
    switch(card.type){
      case 'weapon':
        setCurrentWeapon({power: card.value, durabilitiy: 15})
        break;
      case 'potion':
         healing = character === classes.blacksmith ? card.value/2 : card.value 
        setHealth(health+healing > maxHP ? maxHP : health+healing)
        break
      case 'enemy':
        if(currentWeapon && !useBareHands && currentWeapon.durabilitiy > card.value){
          setCurrentWeapon({power: currentWeapon.power, durabilitiy: card.value})
          setHealth(card.value - currentWeapon.power > 0 ? health-(card.value - currentWeapon.power) : health)
        }else{
          const dmg = character === classes.berserker ? card.value-2 : card.value
          setHealth(health-dmg)
        }
    }
    setDungeon(dungeon.filter(d => d.id !== card.id))
    setUseBareHands(false)
  }

  const handleRun = () => {
    setRemainingRooms([...remainingRooms, ...dungeon])
    setDungeon([])
    setTimeout(() => {
      setCanRun(false)
    }, 100)
  }

  const handleBareHandedFighting = () => {
    setUseBareHands(!useBareHands)
  }

  const handleOnHover = () => {
    setEndText('Retry?')
  }
  const handleOffHover = () => {
    setEndText('Game Over')
  }

  const reset = () => {
    setRemainingRooms(deck.sort(() => 0.5 - Math.random()))
    setDungeon([])
    setCurrentWeapon(undefined)
    setHealth(20)
    setMaxHP(20)
    setCanRun(true)
    setUseBareHands(false)
    setCharacter(undefined)
  }

  const handleCharacterSelect = (character: classes) => {
    setCharacter(character)
    switch(character){
      case classes.healer: 
        setMaxHP(18)
        setHealth(18)
    }
  }

  useEffect(() => {
    if(dungeon.length < 2){
      ExploreDungeon()
    }
  }, [dungeon])

  return (
    <>
      <div className={character ? 'hidden' : 'sm:block grid w-full sm:w-auto'}>
        <h1 className='mb-5 text-center'>Choose a Class</h1>
          {characterList.map((option) => (
            <button className={`m-3 sm:mb-3 mb-10 p-3 border-2 rounded-2xl border-amber-300 cursor-pointer group/item relative`} onClick={() => handleCharacterSelect(option)}>{option}
              <p className={`sm:invisible visible group-hover/item:visible absolute sm:w-80 w-full sm:top-16 top-12 sm:-right-32 right-0`}>{classDescription[option]}</p>
            </button>
          ))}
      </div>
      <div className={character ? 'max-w-sm' : 'hidden'}>
        <div className='text-3xl text-red-700 absolute top-4 left-4'>HP: {health}</div>
        <div className='text-3xl text-white absolute top-4 right-4'>Rooms: {Math.ceil(remainingRooms.length/4)}</div>
        <div id='dungeon' className={health <= 0 ? 'hidden' : 'w-2xs size-24 flex justify-between'}>
          {dungeon.map((card: Card) => (
            <div key={card.id} className={clsx('relative', card.type !== 'enemy' && 'cursor-pointer', (card.type == 'enemy' && ((currentWeapon?.durabilitiy || 0) < card.value || useBareHands)) && 'cursor-grabbing', (card.type == 'enemy' && (currentWeapon?.durabilitiy || 0) > card.value) && !useBareHands && 'sword')} onClick={() => handleEncounter(card)}>
              <span className='pl-1 w-5 absolute rounded-2xl top-1/4 left-1/3 text-white bg-black'>
              {card.value}
              </span>
              <img className='object-contain w-20 max-w-20' src={`./assets/${card.type}.png`} />
            </div>
          ))}
        </div>
        <div className={health > 0 ? 'hidden' : 'block cursor-pointer'} onMouseEnter={handleOnHover} onMouseLeave={handleOffHover} onClick={() => reset()}>{endText}</div>
        <div id='weapon' className={clsx(useBareHands ? 'text-gray-500' : 'text-yellow-500' ,'text-3xl absolute top-3/4 left-1/2')}>
          {currentWeapon?.power}
          <span className='text-sm'>{currentWeapon?.durabilitiy}</span>
        </div>
        <button className={clsx((!canRun || dungeon.length < 4) && 'hidden', 'cursor-pointer absolute bottom-4 left-4 p-5')} onClick={() => handleRun()}>Run</button>
        <button className='absolute bottom-4 right-4 p-5 cursor-grab' onClick={() => handleBareHandedFighting()}>Use Bare Hands</button>
      </div>
    </>
  )
}

export default App
