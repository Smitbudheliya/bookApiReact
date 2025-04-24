import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const Book = () => {
    const [items, setItems] = useState([])

    const GetItems = () => {
        fetch('https://www.googleapis.com/books/v1/volumes?q=react&key=AIzaSyCOYoZwveNV8NsRQ-6rZCkFaRwBGPRs01M')
            .then(res => res.json())
            .then((data) => {
                setItems(data.items || []) // safeguard if no items returned
                console.log(data.items)
            })
            .catch((err) => {
                console.error("Failed to fetch books:", err)
            })
    }

    useEffect(() => {
        GetItems()
    }, [])

    return (
        <div className="container">
            <div className="row" style={{ marginTop: "50px" }}>
                {items.map((item) => {
                    const { title, description, imageLinks, infoLink } = item.volumeInfo
                    return (
                        <div className="col-md-4" key={item.id}>
                            <div className="card mb-4 shadow-sm">
                                {imageLinks?.thumbnail && (
                                    <img src={imageLinks.thumbnail} className="card-img-top" alt={title} />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{title}</h5>
                                    <p className="card-text">
                                        {description ? description.substring(0, 100) + '...' : "No description available."}
                                    </p>
                                    <a href={infoLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">View More</a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Book
