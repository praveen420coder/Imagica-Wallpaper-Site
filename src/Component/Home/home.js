import React, { Fragment, useEffect, useState } from "react";
import "./home.css";
import { createApi } from "unsplash-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  let [query, setQuery] = useState("superhero");
  let [data, setPhotosResponse] = useState(null);
  let [imgcount, setImgCount] = useState(0);
  let [id, setId] = useState("n-2_KHgeAy0");

  useEffect(() => {
    unsplash();
  }, [imgcount, query]);
  const api = createApi({
    accessKey: "ZYe2aTx96Vdhb5vEmlUW9rLrxS017xyWMrUSfXGUSPY",
  });

  const PhotoComp = ({ photo }) => {
    return (
      <Fragment>
        <img className="picture" alt="hey" src={photo.urls.regular} />

        <a
          className="credit"
          target="_blank"
          href={`https://unsplash.com/@${photo.user.username}`}
        >
          {photo.user.name}
        </a>
      </Fragment>
    );
  };
  const unsplash = () => {
    api.search
      .getPhotos({
        query: query,
        count: 20,
        orientation: "landscape",
        perPage: 30,
      })
      .then((result) => {
        setId(result.response.results[imgcount].id);
        setPhotosResponse(result);

        console.log(id);

        console.log(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  };

  const Body = () => {
    if (data === null) {
      return <div>Loading...</div>;
    } else if (data.errors) {
      return (
        <div>
          <div>{data.errors[0]}</div>
          <div>PS: Make sure to set your access token!</div>
        </div>
      );
    } else {
      return (
        <div className="feed">
          <button className="arrow" onClick={handleImageChangeLeft}>
            <FontAwesomeIcon className="icon" icon={faAngleDoubleLeft} />
          </button>
          <button className="arrow2" onClick={handleImageChangeRight}>
            <FontAwesomeIcon className="icon" icon={faAngleDoubleRight} />
          </button>
          <PhotoComp photo={data.response.results[imgcount]} />
        </div>
      );
    }
  };
  //   const Download = () => {
  //     api.photos.trackDownload({
  //       downloadLocation: data.response.results[imgcount].links.download_location,
  //     });
  //   };
  //   const handleChange = () => {
  //     setQuery(document.forms["FormName"]["type"].value);
  //   };

  //   const Usevalue = () => {

  //   };
  const handleSearch = () => {
    var myTextbox = document.getElementById("type");
    var nameValue = myTextbox.value;
    myTextbox.onchange = function () {
      nameValue = myTextbox.value;
    };

    setQuery(nameValue);
    // document.getElementById("type").keyup(function (event) {
    //   if (event.keyCode === 13) {
    //     document.getElementById("search").click();
    //     alert("buttonClicked");
    //   }
    // });
    // setQuery(document.getElementById("type").value);
    unsplash();
  };
  const handleImageChangeRight = () => {
    setImgCount((imgcount += 1));
    Body();
  };
  const handleImageChangeLeft = () => {
    if (imgcount > 0) {
      setImgCount((imgcount -= 1));
      Body();
    }
  };
  const handleKey = (event) => {
    if (event.keyCode == 13) {
      document.getElementById("search").click();
    }
  };

  const Navbar = () => {
    return (
      <div className="navbar">
        <h1 className="logo_text">Imagica</h1>

        <div className="container">
          <div className="section1">
            {/* <form method="post" name="FromName"> */}
            <input
              className="menu"
              type="text"
              id="type"
              defaultValue={query}
              onKeyDown={handleKey}
              //   onChange={(event) => setQuery(event.target.value)}
            />
            {/* </form> */}
          </div>
          <div className="section2">
            <button
              type="submit"
              className="btn"
              id="search"
              onClick={handleSearch}
            >
              Search
            </button>
            <button className="btn">
              <a
                href={`https://unsplash.com/photos/${id}/download?ixid=ZYe2aTx96Vdhb5vEmlUW9rLrxS017xyWMrUSfXGUSPY&force=true`}
                download="sc"
              >
                Download
              </a>
            </button>
          </div>
          {/* <button className="btn">Change Image</button> */}
        </div>
      </div>
    );
  };
  return (
    <div className="home">
      <Navbar></Navbar>
      <div className="imageBox">
        {/* {unsplash()} */}
        <Body />
      </div>
    </div>
  );
};

export default Home;
