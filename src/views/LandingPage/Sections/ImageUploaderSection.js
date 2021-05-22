import React, {useState, useEffect} from 'react'
import Button from "components/CustomButtons/Button.js";
import RUG from "react-upload-gallery";
import "react-upload-gallery/dist/style.css";
import axios from 'axios'
import Web3 from 'web3'
const { create } = require('ipfs-http-client')
import ReactPlayer from 'react-player'

function ImageUploaderSection() {
    const ipfs = create('https://ipfs.infura.io:5001')
    const uploadEndpoint = process.env.REACT_APP_SURION_API_ENDPOINT+'/index/upload'

    const surionABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"initialValue","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"string","name":"_tokenURI","type":"string"},{"internalType":"string","name":"_secretURI","type":"string"}],"name":"safeMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getSecretURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"creatorOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"allTokenOwnedBy","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function","constant":true}]

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
      "name": "OpenSea Creatures",
      "description": "OpenSea Creatures are adorable aquatic beings primarily for demonstrating what can be done using the OpenSea platform. Adopt one today to try out all the OpenSea buying, selling, and bidding feature set.",
      "image": "https://cloudflare-ipfs.com/ipfs/QmV4kNabrP9Vy92f7QKQPfM1cEtvLN7keX6763KNdN6ssw",
      "external_link": "https://openseacreatures.io",
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
        "url": imageData.source
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
    

    var surion = new web3.eth.Contract(surionABI, '0xBaf60C8250b26fBef62BC5f40120392D704D9b1d');
   
    var totalSupply = await surion.methods.totalSupply().call();
    var mintHash = await surion.methods.safeMint(accounts[0],totalSupply + 1, tokenURIHash, secretHash).send({
      from: accounts[0]
    });

    console.log('hash: '+mintHash)
    

    // Need to change contract minting logic

  }

  const handleView  = async () => {
    var surion = new web3.eth.Contract(surionABI, '0xBaf60C8250b26fBef62BC5f40120392D704D9b1d');
    
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
