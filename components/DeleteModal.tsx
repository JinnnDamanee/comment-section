
interface DeleteProps {
    onConfirm: () => Promise<void>
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
}

const DeleteModal: React.FC<DeleteProps> = ({ onConfirm, showModal, setShowModal }) => {
    return (
        (
            <div className="fixed flex justify-center items-center w-screen h-full top-0 right-0">
                <span className='w-screen h-full bg-dark-blue opacity-50' />
                <div className="absolute bg-white opacity-100 w-[350px] p-6 rounded-lg">
                    <h1 className="font-bold text-lg">Delete Comment</h1>
                    <p className="text-grayish-blue mt-2">Are you sure you want tso delete this comment? This will remove the comment and can&apos;t be undone</p>
                    <div className="flex w-full justify-between mt-4">
                        <button
                            className="btn btn-ghost bg-grayish-blue text-white hover:bg-dark-blue"
                            onClick={() => setShowModal(false)}>
                            No,Cancel
                        </button>
                        <button
                            className="btn btn-ghost bg-soft-red text-white hover:bg-pale-red"
                            onClick={onConfirm}>
                            Yes,Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    )
}
export default DeleteModal;