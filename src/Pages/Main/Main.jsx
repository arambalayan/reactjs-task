import React, {useEffect, useState} from 'react';
import "./Main.scss";
import {useDispatch, useSelector} from "react-redux";
import {infoAsync, pokemonAsync, speciesAsync} from "../../redux/pokemonSlice";
import img from "../../assets/pokemon.png";
import {useNavigate} from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

const Main = () => {
    const [value, setValue] = useState("");
    const [id, setId] = useState(1);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const data = useSelector((state) => state.pokemon.data)

    let picId = id;

    const nextData = () => {
        setOffset(offset + 16)
        setId(id + 16)
        picId = id
        dispatch(pokemonAsync(offset + 16))
        setLoading(true)
        setValue("")
    }

    const prevData = () => {
        setOffset(offset - 16)
        setId(id - 16)
        picId = id
        dispatch(pokemonAsync(offset))
        setLoading(true)
        setValue("")
    }

    const moreInfo = (id) => {
        dispatch(infoAsync(id))
        dispatch(speciesAsync(id))
        navigate(`pokemon/${id}`);
    }

    const handleSearch = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        dispatch(pokemonAsync(offset))
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [loading])

    return (
        <div className="main">
            <div className="header">
                <img src={img} alt="img"/>
            </div>
            <input type="text" onChange={handleSearch} placeholder="Search" value={value}/>
            <div className="blocks">
                {data && data
                    .filter(name => value.length > 2 ? name.name.toLowerCase().includes(value.toLowerCase()) : name)
                    .map((item) =>
                        <div key={item.name} className="block" onClick={() => moreInfo(item.name)}>
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picId++}.png`}
                                alt={item.name}
                            />
                            <p>{item.name}</p>
                        </div>
                    )
                }
            </div>
            <button
                className={offset > 10 ? 'btn' : 'btn disabled'}
                onClick={prevData}
                disabled={offset > 10 ? false : true}
            >
                &laquo; Previous
            </button>
            <button className="btn next" onClick={nextData}>Next &raquo;</button>
            {loading && <Loading/>}
        </div>
    );
};

export default Main;
