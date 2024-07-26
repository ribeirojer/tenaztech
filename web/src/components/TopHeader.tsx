import React from 'react'

type Props = {
    isFixed?: boolean
}

const TopHeader = ({isFixed}: Props) => {
  return (
<>
    <div className="md:hidden h-[80px]"></div>
    <div
        className={`hidden md:block bg-gray-200 ${isFixed ? "h-[140px]" : ""}`}
    >
        <div className="hidden md:block text-center bg-glow-tech p-2 text-sm">
            Utilize o Cupom "EUSOUTENAZ" para obter 5% de desconto na sua primeira
            compra
        </div>
        <div className="block md:hidden text-center bg-glow-tech p-2 text-sm">
            Use o cupom "EUSOUTENAZ" e ganhe 5% off na 1ª compra.
        </div>
    </div></> )
}

export default TopHeader