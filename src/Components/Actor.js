import React, { useCallback, useEffect, useState } from "react";
import './shows.css';

export default function Actor() {
    const [actors, setActors] = useState("");

    const [data, setData] = useState([]);

    const [data2, setData2] = useState([]);

    useEffect(() => {
        async function fetchdata() {
            const response = await fetch(
                `https://api.tvmaze.com/search/people?q=${actors}`
            );

            const res_data = await response.json();

            // console.log(res_data);

            setData(res_data);
        }

        fetchdata();
    }, [actors]);

    const getFilms = () => {
        let res = data.filter(
            (item) => item.person.name.toLowerCase() === actors.toLowerCase()
        );

        return res && res.length > 0 && res[0].person.id !== undefined
            ? res[0].person.id
            : 1;
    };

    useEffect(() => {
        async function fetchdata() {
            let result = getFilms() >= 1 ? getFilms() : "No result found!";
            // console.log(result);
            // console.log(getFilms());

            const response = await fetch(
                `https://api.tvmaze.com/people/${result}/castcredits?embed=show`
            );

            const res_data2 = await response.json();
            console.log(res_data2);

            if (actors.length > 0) setData2(res_data2);
        }

        fetchdata();
    }, [actors]);

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

    const actorsName = (event) => {
        setActors(event.target.value);
    };

    const handleInput = useCallback(debounce(actorsName), [])

    return (
        <>
            <div className="container my-2">
                <div className="input-box-details my-4"> {actors === '' ? 'Enter Show Name by Actor Below' : ''}</div>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" onChange={handleInput} placeholder="eg: Akon.. Search" aria-label="Search"
                    />
                </form>
            </div>

            <div className="row row-cols-1 row-cols-md-4 g-4 my-3 main">
                {data2.length > 0 &&
                    data2.map((item) => {
                        const regex = /(<([^>]+)>)/ig;
                        return (
                            <div className="col" onClick={() => window.open(`${item._embedded.show.url !== null ? item._embedded.show.url : ''}`, "_blank")}>
                                <div className="card show">
                                    <img onHover={item._embedded.show.summary}
                                        src={
                                            item._embedded.show.image.medium !== null
                                                ? item._embedded.show.image.medium
                                                : ""
                                        }
                                        alt-text="No image available" />
                                    <div className="details">
                                        <h5 className="name">{item._embedded.show.name}({item._embedded.show.language})</h5>
                                        <span className="rating">⭐
                                            {item._embedded.show.rating.average !== null
                                                ? item._embedded.show.rating.average
                                                : "0.0"}
                                        </span>
                                        <p className="summary">
                                            <h3 >Summary:- </h3>
                                            {item._embedded.show.summary.replace(regex, '')}</p>
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

// `https://api.tvmaze.com/people/${item.person.id}/castcredits?embed=show

// https://pad.riseup.net/p/wuHeV6Wl40rWOc4ZvSIC