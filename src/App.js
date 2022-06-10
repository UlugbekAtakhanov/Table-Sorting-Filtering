
import { collection, addDoc, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import AddData from "./components/AddData"
import ChoiceState from "./components/choiceState"
import FieldSelection from "./components/FieldSelection"
import { db } from "./firebase"

const tableHeadings = ["data", "title", "amount", "distance"]

function App() {

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [formData, setFormData] = useState({ title: "", amount: "", distance: "" })
    const [errorMsg, setErrorMsg] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)

    const [dataFromDB, setDataFromDB] = useState("")

    const [order, setOrder] = useState(false)
    const [orderByHeading, setOrderByHeading] = useState("")

    const [selectedField, setSelectedField] = useState("title")
    const [selectedState, setSelectedState] = useState("includes")

    const [filtering, setFiltering] = useState("")
    const [filteredList, setFilteredList] = useState(dataFromDB)

    const [limit, setLimit] = useState(5)
    const [pages, setPages] = useState(null)
    const [page, setPage] = useState(0)
    const [listPerPage, setListPerPage] = useState(filteredList)

    // list per page
    useEffect(() => {
        const newList = filteredList.slice(limit * page, (parseFloat(limit) + parseFloat((limit * page)) || 5))
        setListPerPage(newList)
    }, [filteredList, page, limit])

    // limitation and pagination
    useEffect(() => {
        if (filteredList && limit) {
            const pagesCount = Math.ceil(filteredList.length / limit)
            setPages([...Array(pagesCount).keys()])
        }
        setPage(0)
    }, [filteredList, limit])

    const paginationHandler = (item) => {
        setPage(item)
    }

    // clear form function
    const clearForm = () => {
        setFormData({ title: "", amount: "", distance: "" })
    }

    // sorting data
    const sortingByHandler = (header) => {
        setOrderByHeading(header)

        if (order && header === "title") {
            // ordering by string
            listPerPage.sort((a, b) => {
                const nameA = a[header]
                const nameB = b[header]
                if (nameA < nameB) {
                    return -1
                }
                if (nameA > nameB) {
                    return 1
                }
                return 0
            })

        } else if (!order && header === "title") {
            // reverse ordering by string
            listPerPage.sort((a, b) => {
                const nameA = a[header]
                const nameB = b[header]
                if (nameA < nameB) {
                    return -1
                }
                if (nameA > nameB) {
                    return 1
                }
                return 0
            }).reverse()

        } else if (order) {
            // ascending ordering by numbers
            listPerPage.sort((a, b) => {
                return a[header] - b[header]
            })

        } else {
            // descending ordering by numbers
            listPerPage.sort((a, b) => {
                return b[header] - a[header]
            })

        }
        setOrder(!order)
    }

    // filtering data
    useEffect(() => {
        setPage(0)
        if (dataFromDB) {
            const newList = dataFromDB.filter(item => {
                if (!filtering) return item

                // includes
                if (item[selectedField].toLowerCase().includes(filtering.toLocaleLowerCase()) && selectedState === "includes") return item

                // equal
                if (selectedState === "equal" && item[selectedField] === filtering) return item

                // more than
                if (selectedState === "more than" && parseFloat(item[selectedField]) >= parseFloat(filtering)) return item

                // less than
                if (selectedState === "less than" && parseFloat(item[selectedField]) <= parseFloat(filtering)) return item
            })
            setFilteredList(newList)
        }
    }, [filtering, dataFromDB, selectedField, selectedState])


    // getting all data from DB
    useEffect(() => {
        const fetchData = async () => {
            const list = []
            try {
                const querySnapshot = await getDocs(collection(db, "table"), formData);
                querySnapshot.forEach((doc) => {
                    const data = { id: doc.id, ...doc.data() }
                    list.push(data)
                });
            } catch (error) {
                console.log(error)
            }
            setDataFromDB(list)
        }
        fetchData()
    }, [])

    // adding data to DB
    const addDataHandler = async (e) => {
        e.preventDefault()
        setBtnDisabled(true)
        const { title, amount, distance } = formData
        if (title && amount && distance) {
            try {
                const res = await addDoc(collection(db, "table"), formData)
                setIsFormOpen(false)
                setBtnDisabled(false)
                setDataFromDB(prev => [...prev, { ...formData, id: res.id }])
                clearForm()
            } catch (error) {
                console.log(error)
                setErrorMsg(error)
            }
        }
    }

    if (!dataFromDB) {
        return <p className="text-white text-2xl p-12">Loading...</p>
    }

    return (
        <>
            {/* form for adding data (modal) */}
            <AddData isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} addDataHandler={addDataHandler} formData={formData} setFormData={setFormData} btnDisabled={btnDisabled} clearForm={clearForm} errorMsg={errorMsg} />

            <div className="p-8">

                <h1 className="text-gray-200 text-center text-4xl">Table</h1>

                {/* add-button and fields for filtering */}
                <div className="mt-12 flex justify-between items-end mb-4">

                    {/* button for opening form */}
                    <button onClick={() => setIsFormOpen(true)} className=" bg-green-500 text-white flex items-center gap-1 p-1 text-sm rounded hover:ring-2 ring-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 " viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add data
                    </button>

                    {/* filtering data */}
                    <div className="flex gap-4 items-end">
                        <FieldSelection selectedField={selectedField} setSelectedField={setSelectedField} />
                        <ChoiceState selectedState={selectedState} setSelectedState={setSelectedState} />
                        <div className="flex flex-col">
                            <label className="text-white text-xs pb-[2px]">Search:</label>
                            <input value={filtering} onChange={(e) => setFiltering(e.target.value)} type="text" className="outline-none pl-2 rounded-sm focus:ring text-slate-500" />
                        </div>
                    </div>

                </div>

                {/* Table of data */}
                <table className="w-full text-center">
                    <thead>
                        <tr>
                            {tableHeadings.map((item, index) => (
                                <th onClick={() => sortingByHandler(item)} className={`
                                    border border-gray-600 font-bold py-2 cursor-pointer w-1/4   
                                    ${orderByHeading === item ? "text-sky-500" : "text-gray-100"}
                                `} key={index} title="click me to sort the field">{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {listPerPage.length > 0 ? (listPerPage.map(item => (
                            <tr key={item.id} className="hover:bg-white/10">
                                <td className="text-gray-300 border border-gray-600 py-2 text-[14px]">{item.id}</td>
                                <td className="text-gray-300 border border-gray-600 py-2 text-[14px]">{item.title}</td>
                                <td className="text-gray-300 border border-gray-600 py-2 text-[14px]">{item.amount}</td>
                                <td className="text-gray-300 border border-gray-600 py-2 text-[14px]">{item.distance}</td>
                            </tr>
                        ))) : (
                            <tr>
                                <td><p className="text-left text-white">No data found..</p></td>
                            </tr>
                        )}
                    </tbody>
                </table>


                {/* pagination */}
                <div className="mt-4 flex items-center justify-center gap-4">

                    {/* limitation */}
                    <div className="space-x-1">
                        <label className="text-white text-sm">limit: </label>
                        <input value={limit} onChange={(e) => setLimit(e.target.value)} type="number" className="outline-none text-sm text-slate-500 w-16 p-1 rounded-sm" />
                    </div>

                    {/* left arrow */}
                    <button onClick={() => {
                        console.log(page)
                        setPage(page - 1)
                        if (page < 1) {
                            setPage(0)
                        }
                    }} disabled={page === 0}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={` ${page === 0 ? "text-gray-700" : "text-gray-300"} h-4 w-4`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* pagination numbers */}
                    {pages && pages.map((item, index) => (
                        <button onClick={() => paginationHandler(item)} key={index} className={`
                             text-sm  w-6 h-6 flex justify-center items-center rounded-full
                                ${page === item ? "bg-green-500 text-white" : "text-gray-400"}
                            `}>
                            {item + 1}
                        </button>
                    ))}

                    {/* right arrow */}
                    <button onClick={() => {
                        setPage(page + 1)
                        if (page > pages.length - 2) {
                            setPage(pages.length - 1)
                        }
                    }} disabled={page === pages?.length - 1}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={` ${page === pages?.length - 1 ? "text-gray-700" : "text-gray-300"} h-4 w-4`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    
                </div>


            </div>

        </>
    );
}

export default App;
