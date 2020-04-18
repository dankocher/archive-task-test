import React from 'react';
import './styles/App.css';
import Loader from "./components/Loader";
import TTasks from "./components/TTasks";

const TT_USER = "__sttuser";

const modelUser = {
    name: "",
    email: "",
    start_time: new Date().getTime(),
    tasks: []
};

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            loaded: false
        }
    }

    componentDidMount() {
        let ttUser = localStorage.getItem(TT_USER);

        let user = modelUser;
        if (ttUser !== null) {
            try {
                user = JSON.parse(ttUser)
            } catch (e) {
                user = modelUser
            }
        }
        this.setState({
            user,
            loaded: true
        });

    }

    save = async user => {

        this.setState({user});
        localStorage.setItem(TT_USER, JSON.stringify(user));
        //TODO: save to server only if las test finished
        console.log("save to localStorage")
    };

    componentWillUnmount() {
        const {user} = this.state;
        if (user) {
            localStorage.setItem(TT_USER, JSON.stringify(user));
        }
    }

    render() {
        const {loaded, user} = this.state;

        return <div className="App">
            {
                !loaded || !user ?
                    <Loader/>
                    :
                    <TTasks user={user} save={this.save}/>
            }
        </div>
    }
}

export default App;
