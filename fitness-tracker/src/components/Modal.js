const Modal = ({ open, closeModal, data, selectFood }) => {
    if (!open) {
        return null;
    }
    return (
        <div className='modal-overlay'>
            <div className="modal-content">
                <div>
                    <button onClick={closeModal} className="modal-close">Close Modal</button>
                </div>
                <div>
                    {data.map((food) => (
                        <button 
                            key={food.id} 
                            onClick={() => selectFood(food)}
                        >
                            {food.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Modal

{/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Select Food</h2>
                    <button 
                        onClick={closeModal} 
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                    {data.map((food) => (
                        <button
                            key={food.id}
                            onClick={() => selectFood(food)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors rounded-md"
                        >
                            {food.name}
                        </button>
                    ))}
                </div>
            </div>
        </div> */}