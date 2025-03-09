import { useEffect, useState } from 'react'
import './App.css'
import { deck } from './constants/cardList';
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
  const [health, setHealth] = useState<number>(20)
  const [canRun, setCanRun] = useState<boolean>(true)
  const [useBareHands, setUseBareHands] = useState<boolean>(false)
  const [endText, setEndText] = useState<string>('Game Over')

  const ExploreDungeon = () => {
    const getCount = dungeon.length > 0 ? 3 : 4
    setDungeon([...dungeon, ...remainingRooms.splice(0, getCount)])
    setCanRun(true)
  }

  const handleEncounter = (card: Card) => {
    switch(card.type){
      case 'weapon':
        setCurrentWeapon({power: card.value, durabilitiy: 15})
        break;
      case 'potion':
        setHealth(health+card.value > 20 ? 20 : health+card.value)
        break
      case 'enemy':
        if(currentWeapon && !useBareHands && currentWeapon.durabilitiy > card.value){
          setCurrentWeapon({power: currentWeapon.power, durabilitiy: card.value})
          setHealth(card.value - currentWeapon.power > 0 ? health-(card.value - currentWeapon.power) : health)
        }else{
          setHealth(health-card.value)
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
    setCanRun(true)
    setUseBareHands(false)
  }

  useEffect(() => {
    if(dungeon.length < 2){
      ExploreDungeon()
    }
  }, [dungeon])

  return (
    <>
      <div className='text-3xl text-red-700 absolute top-4 left-4'>HP: {health}</div>
      <div className='text-3xl text-white absolute top-4 right-4'>Rooms: {Math.ceil(remainingRooms.length/4)}</div>
      <div id='dungeon' className={health <= 0 ? 'hidden' : 'w-2xs size-24 flex justify-between'}>
        {dungeon.map((card: Card) => (
          <div key={card.id} className='relative cursor-pointer' onClick={() => handleEncounter(card)}>
            <span className='pl-1 w-5 absolute rounded-2xl top-1/4 left-1/3 text-white bg-black'>
            {card.value}
            </span>
            <img className='object-contain w-20 max-w-20' src={`src/assets/${card.type}.png`} />
          </div>
        ))}
      </div>
      <div className={health > 0 ? 'hidden' : 'block cursor-pointer'} onMouseEnter={handleOnHover} onMouseLeave={handleOffHover} onClick={() => reset()}>{endText}</div>
      <div id='weapon' className={clsx(useBareHands ? 'text-gray-500' : 'text-yellow-500' ,'text-3xl absolute top-3/4 left-1/2')}>
        {currentWeapon?.power}  
        <span className='text-sm'>{currentWeapon?.durabilitiy}</span>
      </div>
      <button className={clsx((!canRun || dungeon.length < 4) && 'hidden', 'cursor-pointer absolute bottom-4 left-4 p-5')} onClick={() => handleRun()}>Run</button>
      <button className='cursor-pointer absolute bottom-4 right-4 p-5' onClick={() => handleBareHandedFighting()}>Use Bare Hands</button>
    </>
  )
}

export default App
