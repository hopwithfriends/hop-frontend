import React from 'react'
import Image from 'next/image'

const SelectCursor = () => {
  return (
    <div className="relative bg-slate-500 flex flex-row pt-3 pb-3 pr-4">
        <Image className= "pl-5 w-[25%] h-[100%]" src={'/norm.png'} alt={'cursor'} width={50} height={50} />
        <Image className= "pl-5 w-[25%] h-[100%]" src={'/me.jpg'} alt={'cursor'} width={50} height={50} />
        <Image className= "pl-5 w-[100%]" src={'/monkey.jpg'} alt={'cursor'} width={50} height={50} />
        <Image className= "pl-5 w-[25%] h-[100%]" src={'/ani.jpg'} alt={'cursor'} width={50} height={50} />
        <Image className= "pl-5 w-[100%]" src={'/emoji.jpg'} alt={'cursor'} width={50} height={50} />
        <Image className= "pl-5 w-[25%] h-[80%]" src={'/patrick.jpg'} alt={'cursor'} width={50} height={50} />
        <Image className= "pl-5 w-[25%] h-[80%]" src={'/skate.jpg'} alt={'cursor'} width={50} height={50} />
        <Image className= "pl-5 w-[25%] h-[80%]" src={'/skoob.jpg'} alt={'cursor'} width={50} height={50} />
    </div>
  )
}

export default SelectCursor