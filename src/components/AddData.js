import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

const AddData = ({ isFormOpen, setIsFormOpen, addDataHandler, formData, setFormData, btnDisabled, clearForm, errorMsg}) => {



    return (
        <>
            <Transition
                as={Fragment}
                show={isFormOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Dialog onClose={() => setIsFormOpen(false)} className={`text-white fixed inset-0 bg-black/50 flex justify-center items-center px-2`}>
                    <Dialog.Panel className="bg-gray-700  rounded-md w-full sm:w-[30%] flex flex-col items-center gap-4 p-4">
                        <Dialog.Title className="text-xl">Add data</Dialog.Title>

                        <form onSubmit={addDataHandler} className="w-full">
                            <div className='mt-2'>
                                <label>Title</label>
                                <input onChange={(e) => setFormData(prev => setFormData({ ...prev, [e.target.name]: e.target.value }))} className='bg-white/50 focus:ring text-white outline-none w-full p-2 rounded-md placeholder:text-gray-300' type="text" name="title" />
                                <span className='text-[12px] text-red-500'>{formData.title ? "" : "Field must be filled"}</span>
                            </div>

                            <div className='mt-2'>
                                <label>Amount</label>
                                <input onChange={(e) => setFormData(prev => setFormData({ ...prev, [e.target.name]: e.target.value }))} className='bg-white/50 focus:ring text-white outline-none w-full p-2 rounded-md placeholder:text-gray-300' type="number" name="amount" />
                                <span className='text-[12px] text-red-500'>{formData.amount ? "" : "Field must be filled"}</span>
                            </div>

                            <div className='mt-2'>
                                <label>Distance</label>
                                <input onChange={(e) => setFormData(prev => setFormData({ ...prev, [e.target.name]: e.target.value }))} className='bg-white/50 focus:ring text-white outline-none w-full p-2 rounded-md placeholder:text-gray-300' type="number" name="distance" />
                                <span className='text-[12px] text-red-500'>{formData.distance ? "" : "Field must be filled"}</span>
                            </div>

                            <div className='flex gap-4 mt-4'>
                                <button type='button' onClick={() => {
                                    setIsFormOpen(false)
                                    clearForm()
                                }} className={`
                                bg-red-500 flex-1 py-2 rounded-md active:bg-red-700 disabled:active:bg-red-500
                                    ${btnDisabled ? "cursor-wait" : ""}
                                `} disabled={btnDisabled}>Back</button>

                                <button type='submit' className={`
                                    bg-green-500 flex-1 py-2 rounded-md active:bg-green-700
                                    disabled:opacity-30 disabled:active:bg-green-500
                                    ${btnDisabled ? "cursor-wait" : ""}
                                `} disabled={btnDisabled || !formData.title || !formData.amount || !formData.distance}>Add</button>

                            </div>
                            <p className='text-sm text-red-500'>{errorMsg}</p>
                        </form>

                    </Dialog.Panel>
                </Dialog>
            </Transition>
        </>
    )
}

export default AddData