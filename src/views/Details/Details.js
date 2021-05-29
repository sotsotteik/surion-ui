import React from "react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry" // https://github.com/cedricdelpoux/react-responsive-masonry#readme
import ImageGallery from 'react-image-gallery'; // https://github.com/xiaolin/react-image-gallery

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

import styles from "assets/jss/material-kit-react/views/profilePage.js";



const useStyles = makeStyles(styles);

export default function Details(props) {


    const images = [
        {
          original: studio1,
          height: '300px',
        },
        {
          original: studio2,
          height: '300px',
        },
        {
          original: studio3,
          height: '300px',
        },
      ];

    
    const classes = useStyles();
    const { ...rest } = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    return (
        <div>
        <Header
            color="transparent"
            brand="Material Kit React"
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
            height: 200,
            color: "white",
            }}
            {...rest}
        />
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
                        <h3 className={classes.title}>NFT TITLE</h3>
                    </div>
                    </div>
                </GridItem>
                </GridContainer>
                <div className={classes.description}>
                <p>
                    An artist of considerable range, Chet Faker — the name taken by
                    Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                    and records all of his own music, giving it a warm, intimate
                    feel with a solid groove structure.{" "}
                </p>
                </div>
                <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
                
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                    >
                        <Masonry columnsCount={3} gutter="10px">
                            
                            <img
                                alt="..."
                                src={studio1}
                                width={'360px'}
                                />
                            <img
                                alt="..."
                                src={studio2}
                                width={'360px'}
                                />
                            <img
                                alt="..."
                                src={studio5}
                                width={'360px'}
                                />
                            <img
                                alt="..."
                                src={studio4}
                                width={'360px'}
                                />
                            <img
                                alt="..."
                                src={work1}
                                width={'360px'}
                                />
                            <img
                                alt="..."
                                src={work2}
                                width={'360px'}
                                />
                            <img
                                alt="..."
                                src={work3}
                                width={'360px'}
                                />
                            <img
                                alt="..."
                                src={studio5}
                                width={'360px'}
                                />
                            <img
                                alt="..."
                                src={studio4}
                                width={'360px'}
                                />
                        </Masonry>
                    </ResponsiveMasonry>

                    <ImageGallery items={images} showThumbnails={false} />


                </GridItem>
                </GridContainer>
            </div>
            </div>
        </div>
        <Footer />
        </div>
    );
}
