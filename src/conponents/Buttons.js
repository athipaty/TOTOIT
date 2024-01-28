export default function Buttons({handleShowFavorite, handleShowPopular}) {
    return (
        <div className="buttons">
            <button onClick={handleShowPopular} >Popular</button>
            <button onClick={handleShowFavorite}>Favorite</button>
        </div>
    )
}