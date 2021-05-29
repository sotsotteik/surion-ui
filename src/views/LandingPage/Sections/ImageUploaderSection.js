import React, {useState, useEffect} from 'react'
import Button from "components/CustomButtons/Button.js";
import RUG from "react-upload-gallery";
import "react-upload-gallery/dist/style.css";
import axios from 'axios'
import Web3 from 'web3'
const { create } = require('ipfs-http-client')
import ReactPlayer from 'react-player'
import surionABI from "abis/Surion.js";

function ImageUploaderSection() {
    const ipfs = create('https://ipfs.infura.io:5001')
    const uploadEndpoint = process.env.REACT_APP_SURION_API_ENDPOINT+'/index/upload'


    var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

    const initialState = [{
      name: "Item 1",
      size: "232kb",
      source:
        "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4050&q=80"
    },
    {
      name: "Item 2",
      size: "23kb",
      source:
        "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80"
    },
    {
      name: "Item 3",
      size: "222kb",
      source:
        "https://images.unsplash.com/photo-1541837283948-d4242eda4585?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1835&q=80"
    }
  ]
    
  const [uploadedImages, setUploadedImages] = useState([])

  const handleCreate  = async () => {

    const meta = {
      "name": "Test Surion NFT",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "image": "https://cloudflare-ipfs.com/ipfs/QmV4kNabrP9Vy92f7QKQPfM1cEtvLN7keX6763KNdN6ssw",
      "external_link": "https://testtest.com",
      "seller_fee_basis_points": 100,
      "fee_recipient": "abc"
    }
    

    const metaIPFS = await ipfs.add(JSON.stringify(meta))

    const tokenURIHash = metaIPFS.path

    console.log(tokenURIHash)
    
    const imageLayout = []

    uploadedImages.map(imageData => {
      imageLayout.push({
        "id": imageData.uid,
        "url": imageData.source,
        "name": imageData.name
      })

      
      console.log(imageLayout)
    })
    const layout = {"images": imageLayout}
    console.log(layout)
    const secretIPFS = await ipfs.add(JSON.stringify(layout))

    const secretHash = secretIPFS.path
    console.log(secretHash)
    
    const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
    })
    

    var surion = new web3.eth.Contract(surionABI, process.env.REACT_APP_SURION_CONTRACT_ADDRESS);
   
    var totalSupply = await surion.methods.totalSupply().call();
    console.log('total Supply : '+ totalSupply)

    

    var mintHash = await surion.methods.safeMint(accounts[0], tokenURIHash, secretHash).send({
      from: accounts[0]
    });

    console.log('hash: '+mintHash)
    

    // Need to change contract minting logic

  }

  const handleView  = async () => {
    var surion = new web3.eth.Contract(surionABI, process.env.REACT_APP_SURION_CONTRACT_ADDRESS);
    
    var secretURI = await surion.methods.tokenURI(1).call()
    console.log(secretURI)
    var secretURI = await surion.methods.getSecretURI(1).call()
    console.log(secretURI)
  }

  return (
      <div>
          <RUG 
          onChange={(images) => {
            setUploadedImages(images)
              console.log(images)



            }}

          action={uploadEndpoint} initialState={initialState} />

          <Button onClick={handleCreate}>Create</Button>
          <Button onClick={handleView}>View</Button>
          <ReactPlayer url="https://gateway.ipfs.io/ipfs/QmW3xsGiypfwthGqGUQrBvVcUZ2omA9K9WhuqXjd8LhCSm" loop={true} playing={true} controls={true} />
      </div>
  )
}

export default ImageUploaderSection
