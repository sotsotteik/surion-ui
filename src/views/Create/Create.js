import React, {useState, useEffect} from 'react'
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import RUG from "react-upload-gallery";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core/styles"
const { create } = require('ipfs-http-client')
import Web3 from 'web3'
import surionABI from "abis/Surion.js";
import axios from 'axios'
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { setOriginalNode } from 'typescript';

const useStyles = makeStyles(styles);
const ipfs = create('https://ipfs.infura.io:5001')
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545")
const endpoint = "https://ipfs.infura.io:5001/api/v0/add?wrap-with-directory=true"

export default function Create(props) {
    const [layout, setLayout] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [sellerFee, setSellerFee] = useState('')
    const [errorMsg, setSetErrorMsg] = useState('')
    const [mainFile,setMainFile] = useState([])
    const [images,setImages] = useState([])
    const [videos,setVideos] = useState([])
    const [pdfs,setPdfs]= useState([])
    const [mainSourceUrl, setMainSourceUrl] = useState('')
    const [imageLayout, setImageLayout] = useState([])
    const [videoLayout, setVideoLayout] = useState([])
    const [pdfLayout, setPDFLayout] = useState([])
    const [progress,setProgress]= useState(0)

    const uploadEndpoint = process.env.REACT_APP_SURION_API_ENDPOINT+'/index/upload'


    const classes = useStyles()
    const { ...rest } = props

    const handleCreate  = async () => {
        if(mainFile.length === 0){
            setSetErrorMsg('Please upload at least one file.')
            return
        }
        if(!title){
            setSetErrorMsg('Title can not be empty.')
            return
        }
        if(!description){
            setSetErrorMsg('Description can not be empty.')
            return
        }
        if(!sellerFee){
            setSetErrorMsg('Seller Fee can not be empty.')
            return
        }
        const meta = {
          "name": title,
          "description": description,
          "image": mainSourceUrl,
          "external_link": "https://testtest.com",
          "seller_fee_basis_points": sellerFee,
          "fee_recipient": "abc"
        }
        
    
        const metaIPFS = await ipfs.add(JSON.stringify(meta))
    
        const tokenURIHash = metaIPFS.path
    
        console.log(tokenURIHash)

        const layout = {
          "images": imageLayout,
          "video": videoLayout,
          'pdf': pdfLayout
        }
        console.log('layout', layout)
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

    const generateSourceUrl= (file, type) => {
      const formData = new FormData();
        formData.append(
          file.name,
          file,
          file.name
        );
        axios.post(endpoint, formData).then(response=>{
          if(response){
              const arrHash = response.data.split('\n')
              const hash = JSON.parse(arrHash[0]).Hash
              const url = 'https://ipfs.io/ipfs/'+ hash+'?filename='+file.name
              if(type == 'image'){
                let layout = imageLayout
                layout.push({
                  "id": file.name,
                  "url": url,
                  "name": file.name
                }) 
                console.log(layout)
                setImageLayout(layout)
                document.querySelector('#imageUploadBtn').value = 'Upload ' + layout.length + ' files done';
                return
              }else if(type == 'video'){
                let layout = videoLayout
                layout.push({
                  "id": file.name,
                  "url": url,
                  "name": file.name
                }) 
                console.log(layout)
                setVideoLayout(layout)
                document.querySelector('#videoUploadBtn').value = 'Upload ' + layout.length + ' files done';
                return
              }else if(type == 'pdf'){
                let layout = pdfLayout
                layout.push({
                  "id": file.name,
                  "url": url,
                  "name": file.name
                }) 
                console.log(layout)
                setPDFLayout(layout)
                document.querySelector('#pdfUploadBtn').value = 'Upload ' + layout.length + ' files done';
                return
              }else{
                setMainSourceUrl(url)
                console.log(url)
                document.querySelector('#UploadBtn').value = 'Upload Done';
              }
          }
        });
    }

    const onChangeFiles=(e, type) =>{
      if(type == 'image'){
        let files = []
        Array.from(e).map(item=>{
          files.push(item.file)
        })
        setImages(files)
        setImageLayout([])
      }
      else if(type == 'video'){
        setVideos(e.target.files)
        setVideoLayout([])      
      }
      else if(type == 'pdf'){
        setPdfs(e.target.files)
        setPDFLayout([])
      }
      if(type){
        const uploadBtn = document.querySelector('#'+type+"UploadBtn")
        if(uploadBtn){
          uploadBtn.value = 'Upload'
          uploadBtn.disabled = false
        }
        
      }
      
    }
    
    const uploadMainFile = (file)=>{
      if(file.length>0){
        document.querySelector('#UploadBtn').value = 'Upload in progress';
        generateSourceUrl(file[0])
      }
      else{
        alert('no file to upload.')
      }
    }
    const uploadSubFile = (files, type) =>{
      if(files.length>0){
        const uploadBtn = document.querySelector('#'+type+"UploadBtn")
        uploadBtn.value = 'Upload in progress';
        uploadBtn.disabled = true
        
        Array.from(files).map(file=>{
          generateSourceUrl(file,type)    
        })
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
          <Button variant="contained" color="secondary" onClick={handleCreate} >Create NTF</Button>
          <p><InputLabel htmlFor="component-simple">{errorMsg}</InputLabel></p>
          <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: 'auto', margin:'10px' }}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
              <Paper style={{ backgroundColor: '#cfe8fc', height: '150px', margin:'10px' }}>
                <input type="file" className="form-control" onChange={e=>setMainFile(e.target.files)} accept="image/*, video/mp4,video/x-m4v,video/*" />
                <input type='button' id='UploadBtn' onClick={()=>uploadMainFile(mainFile)} value='upload' />
              </Paper>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                  <p>
                  <InputLabel htmlFor="component-simple">Title</InputLabel>
                  <Input type="text" value={title} onChange={e=>setTitle(e.target.value)} />
                  </p>
                  <p>
                  <InputLabel htmlFor="component-simple">Description</InputLabel>
                  <TextareaAutosize value={description} onChange={e=>setDescription(e.target.value)} />
                  </p>
                  <p>
                    <InputLabel htmlFor="component-simple">Seller Fee</InputLabel>
                    <Input type="text" value={sellerFee} onChange={e=>setSellerFee(e.target.value)} />
                  </p>
                </GridItem>
              </GridContainer>
          </Typography>
          <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: 'auto', margin:'10px' }}>
            <RUG onChange={(images) => onChangeFiles(images,'image')} />
            <input type='button' id='imageUploadBtn'variant="contained" color="secondary" onClick={()=>uploadSubFile(images,'image')} value='upload' />
            <CircularProgressWithLabel id='imageProgres' value={progress} />
          </Typography>
          <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: 'auto', margin:'10px' }}>
            <InputLabel htmlFor="component-simple">Upload Video</InputLabel>
            <input type="file" className="form-control" multiple onChange={e=>onChangeFiles(e, 'video')} accept="video/mp4,video/x-m4v,video/*" />
            <input type='button' id='videoUploadBtn'ariant="contained" color="secondary" onClick={()=>uploadSubFile(videos,'video')} value='upload' />
            <CircularProgressWithLabel value={progress} />
          </Typography>
          <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: 'auto', margin:'10px' }}>
            <InputLabel htmlFor="component-simple">Upload PDF</InputLabel>
            <input type="file" className="form-control" multiple onChange={e=>onChangeFiles(e, 'pdf')} accept="application/pdf" />
            <input type='button' id='pdfUploadBtn' variant="contained" color="secondary" onClick={()=>uploadSubFile(pdfs,'pdf')} value='upload' />
            <CircularProgressWithLabel value={progress} />
          </Typography>
        </div>
      </div>
    </>
  );
}


function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
