import React, { useState } from 'react';
import Actor from './Actor';
import Shows from './Shows';
const Nevbar = () => {
    const [selected, setSelected] = useState(false);
    const [selectValue, setSelectValue]=useState("SHOW");
    const handleChange = (e) => {
        console.log(selected);
        if (selected === false) {
            setSelected(true);
            setSelectValue("ACTOR")
        } else if (selected === true) {
            setSelected(false);
            setSelectValue("SHOW")
        } 
    };
    return (
        <>
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">TVmaza</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link"  href="#">Home</a>
                            </li>
                        </ul>
                        </div> */}
                        <form className="d-flex">
                            <div class="form-check form-check-inline">
                                    <input type="checkbox" class="btn-check" id="btn-check-3" value={selected}  checked={selected === true} onChange={handleChange} />
                                    <label class="btn btn-primary" for="btn-check-3">{selectValue}</label>
                            </div>
                            {/* <div class="form-check form-check-inline">
                                    <input type="checkbox" class="btn-check" id="btn-check-3"  value={selected} checked={selected === false} onChange={handleChange} />
                                    <label class="btn btn-primary" for="btn-check-3">Shows</label>
                            </div> */}
                        </form>
                </div>
            </nav>
        </div>
            <div className='header-details'>
                <p className='header' >Search your favourite Actors & Shows</p>
                <p className='choice'>Please Select Your Choice</p>
            </div>
            <div className='Contener my-4 mx-5'>
            <div className='shows-display'>{selected === true ? <Actor /> : " "}{selected === false ? <Shows /> : " "}</div>
        </div>
    </>
    );
}
export default Nevbar;
