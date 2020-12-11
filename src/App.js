import React from 'react';
import './styles/App.scss';
import Loader from "./components/Loader";
import TTasks from "./components/TTasks";
import ajax from "./utils/ajax";
import {api} from "./constants/api";
import Results from "./components/Results";
import TestForAttention from "./views/TestForAttention/TestForAttention";
import ArtTest from "./views/ArtTest/ArtTest";

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
            loaded: false,
            test_enabled: true
        }
    }

    componentDidMount() {
        //console.log(window.location.pathname)
        let [__empty__, uid] = window.location.pathname.split('/');

        this.getTest(uid)
    }

    getTest = async (tt_id) => {
        const res = await ajax(api.td_get_tasks, { tt_id });
        //console.log(res)
        if (res.ok && (res.ttask || {}).enabled) {
            this.setState({ type: res.ttask.id, loaded: true })
        } else {
            this.setState({ loaded: true, test_enabled: false })
        }
    };

    showTest = () => {
        const { type } = this.state;
        //console.log(type)

        switch (type) {
            case 0:
                return <TestForAttention/>
            case 1:
                return <ArtTest/>
            default:
                return <center><h1>404 NOT FOUND</h1></center>
        }
    }

    render() {
        const { loaded, test_enabled} = this.state;

        return <div className="App">
            {
                !loaded ?
                    <Loader/>
                    :
                    !test_enabled ?
                        <center><h1>404 NOT FOUND</h1></center> :
                        this.showTest()
            }
        </div>
    }
}

export default App;
