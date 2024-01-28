export default function Search({handleChange, serchValue}) {
    return (
        <div className="search">
            <input 
            className="search-input" 
            type="text" 
            value={serchValue}
            onChange={handleChange} 
            placeholder="Search for a movie "
            />
        </div>
    )
}