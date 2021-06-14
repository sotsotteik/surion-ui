import React, {useState, useEffect} from 'react'
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import InputLabel from '@material-ui/core/InputLabel';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles"
const { create } = require('ipfs-http-client')
import Web3 from 'web3'
import surionABI from "abis/Surion.js";
import axios from 'axios'
import ReactPlayer from 'react-player'
import { useRouteMatch } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'


// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

const useStyles = makeStyles(styles);
const ipfs = create('https://ipfs.infura.io:5001')
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545")

export default function Details(props) {
    const [account, setAccount] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [mainFileUrl, setmainFileUrl] = useState()
    const match = useRouteMatch()
    const [images,setImages] = useState([])
    const [videos,setVideos] = useState([])
    const [pdfs,setPdfs]= useState([])

    useEffect( () => {
        loadchain()
        return () => {
            
        }
    },[])

    const classes = useStyles();
    const { ...rest } = props;

    async function loadchain() {
        const accounts = await ethereum.request({
            method: 'eth_requestAccounts'
        })
        setAccount(accounts[0])

        //var surion = new web3.eth.Contract(surionABI, process.env.REACT_APP_SURION_CONTRACT_ADDRESS);
        var surion = new web3.eth.Contract(surionABI, match.params.address);
        console.log(match.params.address)
        
        const tokenId = match.params.tokenid
        
        // Get Metadata
        const tokenURIHash = await surion.methods.tokenURI(tokenId).call()
        console.log(tokenURIHash)
        const metadata = await axios.get('https://ipfs.io/ipfs/'+tokenURIHash)

        // Set Metadata
        setTitle(metadata.data.name)
        setDescription(metadata.data.description)
        setmainFileUrl(metadata.data.image)       

        // Get Secret Data
        const secretURIHash = await surion.methods.getSecretURI(tokenId).call()
        const secretData = await axios.get('https://ipfs.io/ipfs/'+secretURIHash)
        console.log(secretData)
        if(secretData.data.images){
          let list = []
          Array.from(secretData.data.images).map((item)=>{
            list.push(
              {
                original: item.url,
                thumbnail: item.url
              }
          )
          console.log('list', list)
        })
          setImages(list)
        }
        if(secretData.data.video){
          console.log('video', secretData.data.video)
          setVideos(secretData.data.video)
        }
        if(secretData.data.video){
          setPdfs(secretData.data.pdf)
        }
    }

    return (
    <>
        <Parallax filter image={require("assets/img/landing-bg.jpg").default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Story Starts With Us.</h1>
              <h4>
                Every landing page needs a small description after the big bold
                title, that{"'"}s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
        <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Card style={{width: "100%"}}>
              <img src={mainFileUrl}  width="auto" height="auto" />
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card style={{width: "100%"}}>
                <p>
                  <InputLabel htmlFor="component-simple">{title}</InputLabel>
                </p>
                <p>
                  {description}
                </p>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              {images.length>0?
              <Card>
                <CardBody>
                  <InputLabel htmlFor="component-simple">Gallery</InputLabel>
                  <ImageGallery items={images} />     
                </CardBody>
              </Card>
              :null}
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
            {videos.length>0?
              <Card>
                <CardBody>
                 <InputLabel htmlFor="component-simple">Videos</InputLabel>
                 <ReactPlayer url={videos[0].url} loop={true} playing={true} controls={true} />
                </CardBody>
              </Card>
            :null}
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
            {pdfs.length>0?
              <Card>
                  <CardBody>
                    <InputLabel htmlFor="component-simple">Document</InputLabel>
                    <object data={pdfs[0].url} type="application/pdf" width="500" height="500">
                      <p>Alternative text - include a link <a href={pdfs[0].url}>to the PDF!</a></p>
                    </object>
                  </CardBody>
                </Card>
              :null}
            </GridItem>
          </GridContainer> 
        </div>
      </div>
    </>
  );
}