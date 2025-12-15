const background = () => {
    return(
        <div className="w-screen h-screen z-0 fixed top-0 left-0 overflow-hidden pointer-events-none flex justify-center items-center">
            <img
                src="/images/background.jpg"
                alt="Background"
                className="scale-150"
            />
        </div>
    )
}
export default background;