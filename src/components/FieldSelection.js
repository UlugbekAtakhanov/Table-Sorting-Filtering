import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"

const FieldSelection = ({ selectedField, setSelectedField}) => {
    return (
        <Listbox as="div" value={selectedField} onChange={setSelectedField} className="relative">


            {({ open }) => (
                <>
                    <Listbox.Label className="text-white text-xs">Fields:</Listbox.Label>
                    <Listbox.Button className="bg-white text-slate-500 text-left rounded-sm px-2 py-[2px] flex justify-between items-center gap-3 group text-sm">
                        <span>{selectedField}</span>
                        <span>
                            <SelectorIcon className="h-4 w-4 group-hover:text-yellow-500" />
                        </span>
                    </Listbox.Button>

                    <Transition
                        show={open}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Listbox.Options as="ul" className="absolute bg-white w-[200%] right-0 top-[100] mt-2 rounded-sm overflow-hidden text-sm">

                            <Listbox.Option value={"title"} as={Fragment}>
                                {({ active, selected, disabled }) => (
                                    <li className={`
                                    ${active ? "bg-amber-100 text-amber-900" : "text-slate-500"} 
                                    ${selected ? "font-semibold text-slate-600" : "font-normal"} 
                                    flex items-center gap-2 pl-8 py-1 px-2 transition-all relative cursor-pointer
                                    `}>
                                        {selected ? <CheckIcon className='w-4 text-amber-600 absolute left-2' /> : null}
                                        title
                                    </li>
                                )}
                            </Listbox.Option>
                            <Listbox.Option value={"amount"} as={Fragment}>
                                {({ active, selected, disabled }) => (
                                    <li className={`
                                    ${active ? "bg-amber-100 text-amber-900" : "text-slate-500"} 
                                    ${selected ? "font-semibold text-slate-600" : "font-normal"} 
                                    flex items-center gap-2 pl-8 py-1 px-2 transition-all relative cursor-pointer
                                    `}>
                                        {selected ? <CheckIcon className='w-4 text-amber-600 absolute left-2' /> : null}
                                        amount
                                    </li>
                                )}
                            </Listbox.Option>
                            <Listbox.Option value={"distance"} as={Fragment}>
                                {({ active, selected, disabled }) => (
                                    <li className={`
                                    ${active ? "bg-amber-100 text-amber-900" : "text-slate-500"} 
                                    ${selected ? "font-semibold text-slate-600" : "font-normal"} 
                                    flex items-center gap-2 pl-8 py-1 px-2 transition-all relative cursor-pointer
                                    `}>
                                        {selected ? <CheckIcon className='w-4 text-amber-600 absolute left-2' /> : null}
                                        distance
                                    </li>
                                )}
                            </Listbox.Option>


                        </Listbox.Options>
                    </Transition>
                </>
            )}

        </Listbox>
    )
}

export default FieldSelection