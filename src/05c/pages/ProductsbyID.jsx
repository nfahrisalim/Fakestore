import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function ProductsbyID() {
    const {id} = useParams()
    const [product, setProduct] = useState(null)

    async function getproductbyid() {
        const res = await fetch('https://fakestoreapi.com/products/'+id)
        const data = await res.json()
        setProduct(data)
    }

    useEffect( () => {
        getproductbyid()
    },[])
  
    return (
        <div>
            {product.title}
        </div>
  )
}
