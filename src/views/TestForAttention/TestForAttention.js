import React from 'react';
import '../../styles/App.scss';
import Loader from "../../components/Loader";
import TTasks from "../../components/TTasks";
import ajax from "../../utils/ajax";
import {api} from "../../constants/api";
import Results from "../../components/Results";

const TT_USER = "__sttuser";

const modelUser = {
    name: "",
    email: "",
    start_time: undefined,
    date: new Date().getTime(),
    tasks: []
};

class TestForAttention extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            s_user: undefined,
            loaded: false,
            test_enabled: true
        }
    }

    componentDidMount() {

        let [__empty__, test_id, uid] = window.location.pathname.split('/');
        //console.log(uid)
        if((uid || '').trim() !== "") {
            this.getUser(uid)
        } else {
            this.loadUser()
        }
    }

    getUser = async (ttuid) => {
        let res = await ajax(api.tt_user, {ttuid});
        if (res.ok) {
            this.setState({s_user: res.tUser, loaded: true})
        } else {
            this.setState({test_enabled: false, loaded: true})
           // window.location = "/";
        }
    };

    loadUser = async () => {

        let status = await ajax(api.tt_status, {id: 0});
        if (!status.ok) {
            document.title = "404 NOT FOUND";
            return this.setState({loaded: true, test_enabled: false})
        }

        let ttUser = localStorage.getItem(TT_USER);

        let user = modelUser;
        if (ttUser !== null) {
            try {
                user = JSON.parse(ttUser)
            } catch (e) {
                user = modelUser
            }
        }
        this.setState({ user, loaded: true });
        if (user.tasks.length === 8) {
            this.save(user);
        }
    };

    save = async user => {
        user = {
            ...this.state.user,
            ...user
        };

        if (user.tasks.length === 8 && !user.end_time) {
            user.end_time = new Date().getTime();
        }

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
        const {loaded, user, s_user, test_enabled} = this.state;

        return <div className="App">
            {
                !loaded ?
                    <Loader/>
                    :
                    !test_enabled ?
                        <center><h1>404 NOT FOUND</h1></center> :
                        s_user ?
                            <Results user={s_user}/>
                            :
                            user ?
                                <TTasks user={user} save={this.save}/>
                                :
                                <Loader/>
            }
        </div>
    }
}

export default TestForAttention;

