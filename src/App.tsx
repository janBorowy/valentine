import React, {useState} from 'react';
import './App.css';

interface State {
    query: string;
    nextState: State | null
    yesToState: State | null
    noToState: State | null
    nextMessage: string | null,
    image: string,
}

const last: State = {
    query: "A no tak, to do zobaczenia",
    nextState: null,
    yesToState: null,
    noToState: null,
    image: "/static/happy-doggo.gif",
    nextMessage: "Przecież mamy wspólną kartę"
}

const whoPays: State = {
    query: "Ale kto płaci?",
    nextState: last,
    yesToState: null,
    noToState: null,
    image: "/static/jamnik-zlozone-lapki.jpg",
    nextMessage: "Przecież mamy wspólną kartę"
}

const hellYeah: State = {
    query: "YAY!",
    nextState: whoPays,
    yesToState: null,
    noToState: null,
    image: "/static/excited-doggo.gif",
    nextMessage: "Dobra, uspokój się już"
}


const areYouSure: State = {
    query: "Czy jesteś tego pewna?",
    nextState: null,
    yesToState: null,
    noToState: null,
    image: "/static/sad-henio.webp",
    nextMessage: null
}

const initial: State = {
    query: "Czy zostaniesz moją walentynką?",
    nextState: null,
    yesToState: hellYeah,
    noToState: areYouSure,
    image: "/static/jamniczek.jpg",
    nextMessage: null
};

areYouSure.noToState = initial

function App() {
    const [state, setState] = useState(initial)
    const [yesNoReverse, setYesNoReverse] = useState(false)

    function handleYes() {
        if (state.image === "/static/sad-henio.webp") {
            setYesNoReverse(!yesNoReverse)
            return
        }
        setState(state.yesToState!)
    }

    function handleNo() {
        setState(state.noToState!)
        if (yesNoReverse) setYesNoReverse(false)
    }

    function handleNext() {
        setState(state.nextState!)
    }

  return (
    <div className="main-column-container">
        <div className="content-container">
            <div className="main-image-container">
                <img src={process.env.PUBLIC_URL + state.image} alt="cute-image"/>
            </div>
            <span className="query-paragraph">{state.query}</span>
            {state.nextState === null ?
                (state.yesToState !== null || state.noToState !== null ? <div
                    style={{
                        flexDirection: yesNoReverse ? "row-reverse" : "row"
                    }}
                    className="buttons-container">
                    <button onClick={(e) => handleYes()}>Tak</button>
                    <button onClick={(e) => handleNo()}>Nie</button>
                </div> : <div></div>) :
                <div className="buttons-container">
                    <button onClick={(e) => handleNext()}>{state.nextMessage}</button>
                </div>
            }
        </div>
        {state.image === "/static/happy-doggo.gif" &&
            <div>
            <span className="additional-text">Literalnie ja w tym momencie:</span>
            <img width="100px" src={process.env.PUBLIC_URL + "/static/jamnik-w-lozeczku.jpg"}/>
            </div>
        }
    </div>
  );
}

export default App;
