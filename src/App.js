import React from 'react';
import './styles/App.css';
import Loader from "./components/Loader";
import TTasks from "./components/TTasks";

const TT_USER = "__sttuser";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            loaded: false
        }
    }

    componentDidMount() {
        let ttUserId = localStorage.getItem(TT_USER);

        if (ttUserId !== null) {
            //TODO: get user from server
            let user = {
                _id: "0",
                name: "",
                email: ""
            };
            this.setState({
                user, loaded: true
            });
        } else {
            this.setState({
                loaded: true
            });
        }

    }

    save = async user => {

        this.setState({user});

        //TODO: save user to server

    };

    componentWillUnmount() {
        const {user} = this.state;
        if (user) {
            localStorage.setItem(TT_USER, user);
        }
    }

    render() {
        const {loaded, user} = this.state;

        return <div className="App">
            {
                !loaded ?
                    <Loader/>
                    :
                    <TTasks user={user} save={this.save}/>
            }
        </div>
    }
}

export default App;
