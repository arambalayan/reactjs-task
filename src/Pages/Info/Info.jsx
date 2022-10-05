import React, {useEffect, useState} from 'react';
import "./Info.scss";
import {useSelector} from "react-redux";
import Loading from "../../Components/Loading/Loading";

const Info = () => {
    const [loading, setLoading] = useState(true);

    const data = useSelector((state) => state.pokemon.info)
    const species = useSelector((state) => state.pokemon.species)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [loading])

    return (
        <div className='info'>
            {Object.keys(data).length !== 0 && Object.keys(species).length !== 0 &&
                <div className='info_block'>
                    <div className="header">
                        <img src={data.sprites.front_default} alt=""/>
                        <h2>{data.name}</h2>
                    </div>
                    <div className="main_block">
                        <div className="block1">
                            <h3>Weight: <span>{data.weight}</span></h3>
                            <h3>Height: <span>{data.height}</span></h3>
                        </div>
                        <h3>Species:</h3>
                        <ul>
                            <li>
                                Color: {species.color.name}
                            </li>
                            <li>
                                Egg groups: {
                                species.egg_groups.map((item, index) =>
                                    <ul key={index}>
                                        <li>{item.name}</li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                        <h3>Stats:</h3>
                        <ul>
                            {data.stats.map((item, index) =>
                                <li key={index}>{item.stat.name}</li>
                            )}
                        </ul>
                        <h3>Types:</h3>
                        <ul>
                            {data.types.map((item, index) =>
                                <li key={index}>{item.type.name}</li>
                            )}
                        </ul>
                        <h3>Moves:</h3>
                        <ul>
                            {data.moves.map((item, index) =>
                                <li key={index}>{item.move.name}</li>
                            )}
                        </ul>
                    </div>
                </div>
            }
            {loading && <Loading/>}
        </div>
    );
};

export default Info;