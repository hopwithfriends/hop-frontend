import type React from 'react'
import {useState} from 'react'
import Image from 'next/image'

interface SelectProps {
    setSelectedCursor: (cursor: string) => void; 
  }

const SelectCursor: React.FC<SelectProps>= ({setSelectedCursor}) => {

    const handleClick = (src:string) => {
        setSelectedCursor(src);
    }

  return (
    <div className="relative bg-slate-500 flex flex-row pt-3 pb-3 pr-4">
        <Image onClick={()=> handleClick("/norm.png")} className= "pl-5 w-[25%] h-[100%]" src={'/norm.png'} alt={'cursor'} width={50} height={50} />
        <Image onClick={()=> handleClick("/me.jpg")} className= "pl-5 w-[25%] h-[100%]" src={'/me.jpg'} alt={'cursor'} width={50} height={50} />
        <Image onClick={()=> handleClick("/monkey.jpg")} className= "pl-5 w-[100%]" src={'/monkey.jpg'} alt={'cursor'} width={50} height={50} />
        <Image onClick={()=> handleClick("/ani.jpg")} className= "pl-5 w-[25%] h-[100%]" src={'/ani.jpg'} alt={'cursor'} width={50} height={50} />
        <Image onClick={()=> handleClick("/emoji.jpg")} className= "pl-5 w-[100%]" src={'/emoji.jpg'} alt={'cursor'} width={50} height={50} />
        <Image onClick={()=> handleClick("/partick.jpg")} className= "pl-5 w-[25%] h-[80%]" src={'/patrick.jpg'} alt={'cursor'} width={50} height={50} />
        <Image onClick={()=> handleClick("/skate.jpg")} className= "pl-5 w-[25%] h-[80%]" src={'/skate.jpg'} alt={'cursor'} width={50} height={50} />
    </div>
  )
}

export default SelectCursor