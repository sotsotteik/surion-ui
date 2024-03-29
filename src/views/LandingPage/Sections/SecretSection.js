import React, {useState, useEffect} from 'react'
import AccountSection from "./AccountSection";
import ImageUploaderSection from "./ImageUploaderSection";
import axios from 'axios'


function SecretSection() {

    const [layout, setLayout] = useState('')
    const [images, setImages] = useState([])

    useEffect(() => {

        axios.get(process.env.REACT_APP_SURION_API_ENDPOINT+"/index/layout")
        .then(resp => {
            
            setLayout(resp.data.layout)
            setImages(resp.data.images)

            console.log(resp.data.layout)
            console.log(resp.data.images)
        })
    },[])

    return ( 
        <div>
            <ImageUploaderSection />
            {
                images ?
                images.map(image => <img key={image.id} src={image.url}/>) : null
            }
            {/*<AccountSection />*/}
        </div>
    )
}

export default SecretSection
