import React, { useState } from 'react'
import css from './tickets.module.scss'
import { Modal, ModalContent } from 'lib/components/modal'
import { Button } from 'lib/components/button'

export interface TicketDiscount { 
  name: string
  description: string
  body: string
  discount: number
  target: number
  tags: string[]
}

export function Ticket(props: TicketDiscount) {
  const [modalOpen, setModalOpen] = useState(false)
  
  return (
    <div className='flex flex-col relative p-4'>
      <div className={css['background-logo']}></div>
      <div className={css['border']}></div>
      <div className='h-full'>
        <h3 className='text-lg font-semibold font-secondary border-b border-solid border-gray-300 pb-4 mb-4'>{props.name}</h3>
        <p>{props.description}</p>
        <ul className='list-disc list-inside mt-2 font-medium text-sm'>
          {props.tags.map((tag: string) => {
            return <li key={tag}>{tag}</li>
          })}
        </ul>
      </div>
      <div className='flex flex-row justify-between items-center mt-4 z-10'>
        <p className='h2 bold'>{props.discount}%</p>
        <p>
          <span className='text-sm cursor-pointer font-medium text-[#1b6fae] hover:text-[#448dc3]' onClick={() => setModalOpen(true)}>Learn more</span>
        </p>
      </div>

      <Modal open={modalOpen} close={() => setModalOpen(false)}>
        <ModalContent
          className="border-solid border-[#8B6BBB] border-t-4 w-[560px]"
          close={() => setModalOpen(false)}
        >
          <div className='flex flex-col w-full h-full'>
            <div className="bg-[#dff8fd] w-full h-24 p-4">
              <p className="text-xs font-bold text-uppercase">{props.name}</p>
              <p className="font-bold mt-4">{props.description}</p>
            </div>

            <div className="p-4 my-4">              
              <p className="text-sm whitespace-pre-line leading-loose">{props.body}</p>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  )
}
