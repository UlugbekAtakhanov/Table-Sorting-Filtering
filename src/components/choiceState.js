import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid"

const ChoiceState = ({ selectedState, setSelectedState}) => {
    return (
        <Listbox as="div" value={selectedState} onChange={setSelectedState} className="relative">


            {({ open }) => (
                <>
                    <Listbox.Label className="text-white text-xs">State:</Listbox.Label>
                    <Listbox.Button className="bg-white text-slate-500 text-left rounded-sm px-2 py-[2px] flex justify-between items-center gap-3 group text-sm">
                        <span>{selectedState}</span>
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
                        <Listbox.Options as="ul" className="absolute bg-white w-[150%] right-0 top-[100] mt-2 rounded-sm overflow-hidden text-sm">

                            <Listbox.Option value={"equal"} as={Fragment}>
                                    {({ active, selected, disabled }) => (
                                        <li className={`
                                    ${active ? "bg-amber-100 text-amber-900" : "text-slate-500"} 
                                    ${selected ? "font-semibold text-slate-600" : "font-normal"} 
                                    flex items-center gap-2 pl-8 py-1 px-2 transition-all relative cursor-pointer
                                    `}>
                                            {selected ? <CheckIcon className='w-4 text-amber-600 absolute left-2' /> : null}
                                            equal
                                        </li>
                                    )}
                                </Listbox.Option>
                                <Listbox.Option value={"includes"} as={Fragment}>
                                    {({ active, selected, disabled }) => (
                                        <li className={`
                                    ${active ? "bg-amber-100 text-amber-900" : "text-slate-500"} 
                                    ${selected ? "font-semibold text-slate-600" : "font-normal"} 
                                    flex items-center gap-2 pl-8 py-1 px-2 transition-all relative cursor-pointer
                                    `}>
                                            {selected ? <CheckIcon className='w-4 text-amber-600 absolute left-2' /> : null}
                                            includes
                                        </li>
                                    )}
                                </Listbox.Option>
                                <Listbox.Option value={"more than"} as={Fragment}>
                                    {({ active, selected, disabled }) => (
                                        <li className={`
                                    ${active ? "bg-amber-100 text-amber-900" : "text-slate-500"} 
                                    ${selected ? "font-semibold text-slate-600" : "font-normal"} 
                                    flex items-center gap-2 pl-8 py-1 px-2 transition-all relative cursor-pointer
                                    `}>
                                            {selected ? <CheckIcon className='w-4 text-amber-600 absolute left-2' /> : null}
                                            more than
                                        </li>
                                    )}
                                </Listbox.Option>
                                <Listbox.Option value={"less than"} as={Fragment}>
                                    {({ active, selected, disabled }) => (
                                        <li className={`
                                    ${active ? "bg-amber-100 text-amber-900" : "text-slate-500"} 
                                    ${selected ? "font-semibold text-slate-600" : "font-normal"} 
                                    flex items-center gap-2 pl-8 py-1 px-2 transition-all relative cursor-pointer
                                    `}>
                                            {selected ? <CheckIcon className='w-4 text-amber-600 absolute left-2' /> : null}
                                            less than
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

export default ChoiceState