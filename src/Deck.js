import React, { Component } from 'react'
import axios from 'axios';
import Card from './Card'
import "./Deck.css"

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
    constructor(props){
        super(props)
        this.state = {deckId: null, drawn: []}
        this.getCard = this.getCard.bind(this);
    }
    async componentDidMount() {
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        this.setState({ deck: deck.data })
    }
    async getCard() {
        let deck_id = this.state.deck.deck_id;
        try {
            let cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
            let cardResponse = await axios.get(cardUrl);
            if(!cardResponse.data.success) {
                throw new Error("no card remaining")
            }
            let card = cardResponse.data.cards[0];
            this.setState(st => ({
                drawn: [
                    ...st.drawn,
                    {
                        id: card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit}`
                    }
                ]
            }));
        } catch (err) {
            alert(err);
        }
    }
    render() {
        const cards = this.state.drawn.map(c => (
            <Card
            image={c.image}
            name={c.name}
            key={c.id}
            />
        ));
        return (
            <div className="Deck">
                <h1 className="Deck-title">card dealer</h1>
                <h2 className="Deck-title subtitle">a small react demo</h2>
                <button
                    onClick={this.getCard}
                    className="Deck-btn"
                >
                    gimme a card
                </button>
                <div className="Deck-cardarea">
                    {cards}
                </div>
            </div>
        )
    }
    /////////==================
    //////// the way I did it
    ////////===================
    // constructor(props){
    //     super(props);
    //     this.state = { deckId: "", deckInitialized: false, cardsDrawn: [], cardsUrl: []}
    //     this.getDeck = this.getDeck.bind(this);
    //     this.getCard = this.getCard.bind(this);
    //     this.renderItems = this.renderItems.bind(this);
    // }
    // async getDeck(){
    //     let url = 'https://deckofcardsapi.com/api/deck/new/shuffle/'
    //     let response = await axios.get(url)
    //     let data = response.data;
    //     this.setState({ deckId: data.deck_id, deckInitialized: true })
    //     this.getCard();
    // }
    // async getCard(){
    //     let url = `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/`
    //     let response = await axios.get(url);
    //     let data = response.data;
    //     let newCard = data.cards[0].code;
    //     let cardImg = data.cards[0].image;
    //     console.log(this.state);
    //     console.log(data)
    //     this.setState(state => ({
    //         cardsDrawn: [...state.cardsDrawn, newCard],
    //         cardsUrl: [...state.cardsUrl, cardImg]
    //     }))
    // }
    // renderItems(){
    //     return (
    //         <ul>
    //             {this.state.cardsUrl.map(imgUrl => (
    //                 <img 
    //                 src={imgUrl}
    //                 />
    //             ))}
    //         </ul>
    //     )
    // }
    // render(){
    //     return (
    //         <div>
    //             <h1>deck of cards react demo</h1>
    //             <button
    //             onClick={this.state.deckInitialized ? this.getCard : this.getDeck}>gimme a card</button>
    //             {this.renderItems()}
    //         </div>
    //     )
    // }
}

export default Deck;