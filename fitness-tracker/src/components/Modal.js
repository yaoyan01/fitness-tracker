const Modal = ({ open, closeModal, data, selectFood }) => {
    if (!open) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md overflow-hidden w-96">
                <div className="bg-[#272838] text-white flex justify-between items-center p-4">
                    <h2 className="text-xl pl-4">Select Food</h2>
                    <button
                        onClick={closeModal}
                        className="text-white hover:text-gray-300 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="p-6">
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
            </div>
        </div>
    )
}

export default Modal

