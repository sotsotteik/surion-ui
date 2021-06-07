import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import Web3 from 'web3'
import axios from 'axios'

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";


import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";

import surionABI from "abis/Surion.js";

import { cardTitle } from "assets/jss/material-kit-react.js";


import profile from "assets/img/faces/christian.jpg";

import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";

import profileStyles from "assets/jss/material-kit-react/views/profilePage.js";

const styles = {
    ...profileStyles,
    ...imagesStyles,
    cardTitle
    
  };

const useStyles = makeStyles(styles);

export default function MyItems(props) {

    var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545")

    var cardDatas = [];
    const tokenData = []
    
    const [account, setAccount] = useState('')
    const [cardData, setCardData] = useState([])

    const [testva, setTestva] = useState(['def'])

    async function loadchain() {

        const accounts = await ethereum.request({
            method: 'eth_requestAccounts'
        })
        setAccount(accounts[0])

        const allTokens = await axios.get('https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address='+accounts[0]+'&startblock=0&endblock=999999999&sort=asc&apikey=GIQKFU59KMSBAAKRRW2Q8NKHDRK7B48PVJ')
        .then(response => {
            console.log(response)
        })


        var surion = new web3.eth.Contract(surionABI, process.env.REACT_APP_SURION_CONTRACT_ADDRESS);

        var ownedToken = await surion.methods.allTokenOwnedBy(accounts[0]).call();

        if (ownedToken != '') {
            var ownedTokenString = String(ownedToken)

            var tokenIds = ownedTokenString.split(",");

            

            tokenIds.map(async tokenId => {

                const tokenURIHash = await surion.methods.tokenURI(tokenId).call()
                //const secretURIHash = await surion.methods.getSecretURI(tokenId).call()
    //console.log(secretURIHash)
                const metadata = await axios.get('https://ipfs.io/ipfs/'+tokenURIHash)
                //console.log(metadata)
                setCardData(cardData => cardData.concat({
                    "tokenId": tokenId,
                    "metadata": metadata.data
                    
                }) )
            })
        }
        
        
        
    }



    useEffect( () => {
        loadchain()

        
        return () => {
            if (cardData.length > 0) {
                setCardData([])
            }
        }
    },[])

    const classes = useStyles();
    const { ...rest } = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    return (
        
    <>
        <Parallax
            small
            filter
            image={require("assets/img/profile-bg.jpg").default}
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
            <div>
            <div className={classes.container}>
                <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.profile}>
                    <div>
                        <img src={profile} alt="..." className={imageClasses} />
                    </div>
                    <div className={classes.name}>
                        <h3 className={classes.title}>{account} - {testva[0]} - {cardData ? cardData.length : '777'}</h3>
                        
                    </div>
                    </div>
                </GridItem>
                </GridContainer>

                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                    <h3>
                        <small>My Items</small>
                    </h3>
                    <CustomTabs
                        plainTabs
                        headerColor="primary"
                        tabs={[
                        {
                            tabName: "Created",
                            tabContent: (
                                <GridContainer>
                                    {
                                        cardData.map(data => 

                                        <GridItem key={data.tokenId} xs={4} sm={4} md={4}>
                                            <Card style={{width: "20rem"}}>
                                                <img
                                                style={{ width: "100%", display: "block"}}
                                                className={classes.imgCardTop}
                                                src={data.metadata.image}
                                                alt="Card-img-cap"
                                                />
                                                <CardBody>
                                                <h4 className={classes.cardTitle}>{data.metadata.name}</h4>
                                                <p>{data.metadata.description}</p>
                                                <Link to={{ pathname: `/details/${process.env.REACT_APP_SURION_CONTRACT_ADDRESS}/${data.tokenId}` }} id="nav_mybet">
                                                    <Button color="primary">View</Button>
                                                </Link>
                                                
                                                </CardBody>
                                            </Card>
                                        </GridItem>
                                        )
                                    }
                                    
                                    <GridItem xs={4} sm={4} md={4}>
                                        <Link to="details/1">
                                        <Card style={{width: "20rem"}}>
                                            <img
                                            style={{height: "180px", width: "100%", display: "block"}}
                                            className={classes.imgCardTop}
                                            src="..."
                                            alt="Card-img-cap"
                                            />
                                            <CardBody>
                                            <h4 className={classes.cardTitle}>Card title3</h4>
                                            <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <Button color="primary">Do something</Button>
                                            </CardBody>
                                        </Card>
                                        </Link>
                                    </GridItem>
                                    <GridItem xs={4} sm={4} md={4}>
                                        <Card style={{width: "20rem"}}>
                                            <img
                                            style={{height: "180px", width: "100%", display: "block"}}
                                            className={classes.imgCardTop}
                                            src="..."
                                            alt="Card-img-cap"
                                            />
                                            <CardBody>
                                            <h4 className={classes.cardTitle}>Card title4</h4>
                                            <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <Button color="primary">Do something</Button>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                    
                                </GridContainer>
                            ),
                        },
                        {
                            tabName: "Owned",
                            tabContent: (
                            <p className={classes.textCenter}>
                                I think that’s a responsibility that I have, to push
                                possibilities, to show people, this is the level that
                                things could be at. I will be the leader of a company
                                that ends up being worth billions of dollars, because I
                                got the answers. I understand culture. I am the nucleus.
                                I think that’s a responsibility that I have, to push
                                possibilities, to show people, this is the level that
                                things could be at.
                            </p>
                            ),
                        }
                        ]}
                    />
                    </GridItem>
                </GridContainer>
            </div>
            </div>
        </div>
    </>
  );
}
