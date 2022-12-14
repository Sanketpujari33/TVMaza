import "./shows.css";
import React, { useCallback, useEffect, useState } from "react";

export default function Shows() {
  const [shows, setShows] = useState("");
  const [data, setData] = useState([]);
  // const searchvalue = true;

  useEffect(() => {
    async function fetchdata() {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${shows}`
      );
      const res_data = await response.json();
      console.log(res_data);
      setData(res_data);
    }
    fetchdata();
  }, [shows]);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    }
  }

  const showsName = (event) => {
    setShows(event.target.value);
  };

  const optimisedVesion = useCallback(debounce(showsName), []);

  return (
    <>
      <div className="container my-2">
        <div className="input-box-details"> {shows === '' ? 'Enter Show Name Below' : ''}</div>
        <form class="d-flex" role="search">
          <input class="form-control me-1" type="search" onChange={optimisedVesion} placeholder="eg: friends.. Search" aria-label="Search" />
        </form>
      </div>

      <div className="row row-cols-1 row-cols-md-4 g-4 my-3 main">
        {data.length > 0 &&
          data.map((item) => {
            const regex = /(<([^>]+)>)/ig;
            return (
              <div className="col" onClick={() => window.open(`${item.show.url !== null ? item.show.url : ''}`, "_blank")} key={item.show.id}>
                <div className="card show">
                  <img
                    src={item.show.image !== null ? item.show.image.medium : ""}
                    alt-text={item.show.name}
                  />
                  <div className="details">
                    <h5 className="name">{item.show.name}({item.show.language})</h5>
                    <span className="rating">⭐
                      {item.show.rating.average !== null ? item.show.rating.average : "0.0"}</span>
                    <p className="summary">
                      <h3>Summary</h3>
                      {item.show.summary !== null ? item.show.summary.replace(regex, '') : ''}</p>
                  </div>
                </div>
              </div>
            )
          }
          )
        }
      </div>
    </>
  );
}