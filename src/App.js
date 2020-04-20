import React from 'react';
import './styles/App.css';
import Loader from "./components/Loader";
import TTasks from "./components/TTasks";
import ajax from "./utils/ajax";
import {api} from "./constants/api";

const TT_USER = "__sttuser";

const modelUser = {
    name: "",
    email: "",
    start_time: undefined,
    date: new Date().getTime(),
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
        if (user.tasks.length === 8) {
            this.save(user);
        }
    }

    save = async user => {
        user = {
            ...this.state.user,
            ...user
        };

        if (user.tasks.length === 8 && !user.end_time) {
            user.end_time = new Date().getTime();
        }
        // this.setState({user});
        let res = await ajax(api.tt_save, user);
        if (res.ok) {
            user = {
                ...res.user,
                ...user
            };
        }
        this.setState({user});
        if (user.tasks.length === 8 && res.ok) {
            localStorage.removeItem(TT_USER)
        } else if (user.tasks.length === 8 && !res.ok) {
            localStorage.setItem(TT_USER, JSON.stringify(user));
            alert("ERROR connection lost")
        } else {
            localStorage.setItem(TT_USER, JSON.stringify(user));
        }

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
