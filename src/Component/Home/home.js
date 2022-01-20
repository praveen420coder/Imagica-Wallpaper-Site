import React, { Fragment, useEffect, useState } from "react";
import "./home.css";
import { createApi } from "unsplash-js";

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  const [query, setQuery] = useState("nature");
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

  const Body = () => {
    const [data, setPhotosResponse] = useState(null);

    useEffect(() => {
      api.photos
        .getRandom({
          query: "cat",
          count: 1,
        })
        .then((result) => {
          if (result.type === "success") {
            setPhotosResponse(result.response[0]);
          }
          console.log(result);
        })
        .catch(() => {
          console.log("something went wrong!");
        });
    }, []);

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
          <PhotoComp photo={data} />
        </div>
      );
    }
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleImageChange = () => {};
  const Navbar = () => {
    return (
      <div className="navbar">
        <h1 className="logo_text">Imagica</h1>

        <div className="container">
          <div className="section1">
            <select class="menu" id="type" onChange={handleChange}>
              <option value="colors">Background Color</option>
              <option value="cars">Cars</option>
              <option value="building">Buildings</option>
              <option value="nature">Nature</option>
            </select>
          </div>
          {/* <div className="section2">
            <button className="button search">Search</button>
          </div> */}
          <button className="button" onClick={handleImageChange}>
            Change Image
          </button>
          <button className="button">Download Image</button>
        </div>
      </div>
    );
  };
  return (
    <div className="home">
      <Navbar></Navbar>
      <div className="imageBox">
        <Body />
      </div>
    </div>
  );
};

export default Home;
