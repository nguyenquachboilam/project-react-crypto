import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'

import './Coin.css'

const Coin = () => {
    const [coin, setCoin] = useState({})
    const params = useParams();

    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`

    useEffect(() => {
        axios.get(url).then((res) => {
            setCoin(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <div>
            <div className='coin-container'>
                <div className='content'>
                    <h1>{coin.name}</h1>
                </div>
                <div className='content'>
                    <div className='rank'>
                        <span className='rank-btn'>Rank # {coin.market_cap_rank}</span>
                    </div>
                    <div className='info'>
                        <div className='coin-heading'>
                            {coin.image ? <img src={coin.image.small} /> : null}
                            <p>{coin.name}</p>
                            {coin.symbol ? <p>{coin.symbol.toUpperCase()}/USD</p> : null}
                        </div>
                        <div className='coin-price'>
                            {coin.market_data ? <h1>${coin.market_data.current_price.usd.toLocaleString()}</h1> : null}
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <table>
                        <thead>
                            <tr>
                                <th>24h</th>
                                <th>7d</th>
                                <th>14d</th>
                                <th>30d</th>
                                <th>60d</th>
                                <th>1yr</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {coin.market_data ? <td> {coin.market_data.price_change_percentage_24h.toFixed(1)}%</td> : null}
                                {coin.market_data ? <td> {coin.market_data.price_change_percentage_7d.toFixed(1)}%</td> : null}
                                {coin.market_data ? <td> {coin.market_data.price_change_percentage_14d.toFixed(1)}%</td> : null}
                                {coin.market_data ? <td> {coin.market_data.price_change_percentage_30d.toFixed(1)}%</td> : null}
                                {coin.market_data ? <td> {coin.market_data.price_change_percentage_60d.toFixed(1)}%</td> : null}
                                {coin.market_data ? <td> {coin.market_data.price_change_percentage_1y.toFixed(1)}%</td> : null}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='content'>
                    <div className='stats'>
                        <div className='left'>
                            <div className='row'>
                                <h4>24 Hour Low</h4>
                                {coin.market_data ? <p>${coin.market_data.low_24h.usd.toLocaleString()}</p> : null}
                            </div>
                            <div className='row'>
                                <h4>24 Hour High</h4>
                                {coin.market_data ? <p>${coin.market_data.high_24h.usd.toLocaleString()}</p> : null}
                            </div>
                        </div>
                        <div className='right'>
                        <div className='row'>
                                <h4>Market Cap</h4>
                                {coin.market_data ? <p>${coin.market_data.market_cap.usd.toLocaleString()}</p> : null}
                            </div>
                            <div className='row'>
                                <h4>Circulating Supply</h4>
                                {coin.market_data ? <p>{coin.market_data.circulating_supply}</p> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='about'>
                        <h3>About</h3>
                        <p dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(coin.description ? coin.description.en : '')
                        }}></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Coin