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

  useEffect(() => {
    if(dungeon.length < 2){
      ExploreDungeon()
    }
  }, [dungeon])

  return (
    <>
      <div className='text-3xl text-red-700 absolute top-0 left-0'>HP: {health}</div>
      <div className='text-3xl text-white absolute top-0 right-0'>Rooms: {Math.ceil(remainingRooms.length/4)}</div>
      <div id='dungeon' className={health <= 0 ? 'hidden' : 'w-2xs flex justify-between'}>
        {dungeon.map((card: Card) => (
          <div key={card.id} className={clsx(card.type, 'cursor-pointer w-5')} onClick={() => handleEncounter(card)}>
            {card.value}
          </div>
        ))}
      </div>
      <div className={health > 0 ? 'hidden' : 'block'}>Game Over</div>
      <div id='weapon' className={clsx(useBareHands ? 'text-gray-500' : 'text-yellow-500' ,'text-3xl absolute top-3/4 left-1/2')}>{currentWeapon?.power} <span className='text-sm'>{currentWeapon?.durabilitiy}</span></div>
      <button className={clsx(!canRun && 'hidden', 'cursor-pointer absolute bottom-0 left-0 p-5')} onClick={() => handleRun()}>Run</button>
      <button className='cursor-pointer absolute bottom-0 right-0 p-5' onClick={() => handleBareHandedFighting()}>Use Bare Hands</button>
    </>
  )
}

export default App
