import React from "react";
import "./styles.scss";
import RHeader from "./RHeader";
import Task1_1 from "../TTasks/Tasks/Task1/Task1_1";
import Task1_2 from "../TTasks/Tasks/Task1/Task1_2";
import Task2 from "../TTasks/Tasks/Task2";
import Task3 from "../TTasks/Tasks/Task3";
import Task4 from "../TTasks/Tasks/Task4";
import RTable from "./RTable";
import checkResults from "./checkResults";

const __user__ = {"_id":"5eaed4d5b20755216ce63c53","name":"DENIS_TEST","email":"asdjiasjd@asdh.qwrko","start_time":1588516053752,"date":1588516053561,"tasks":[{"_id":"5eaed602b20755216ce63c81","start_time":1588516001310,"end_time":1588516053752},{"_id":"5eaed602b20755216ce63c80","start_time":1588516053752,"end_time":1588516055455},{"_id":"5eaed602b20755216ce63c7f","start_time":1588516055455,"result":{"black":["ф","ы","в","ф","ы","в","в","ф","ы","в","й","ц","у","1","2","3","1","2","у","в","ф","ы","в","ф"],"red":["в","ф","ы","в","й","ц","в","й","ц","у","й","ц","у","й","ц","в","ф","ы","в","ф","ы","в","в","ф","ы"]},"end_time":1588516073806},{"_id":"5eaed602b20755216ce63c7e","start_time":1588516073806,"result":{"red":["ф","в","ы","ф","в","у","й","у","й","3","2","а","о","р","а","а","а","в","й","к","в","ы","й","у","в"],"black":["ы","ф","в","ы","ф","в","ц","й","2","1","в","п","п","ы","ф","й","ы","а","ц","й","ф","в","ц","й"]},"end_time":1588516085471},{"_id":"5eaed602b20755216ce63c7d","start_time":1588516155656,"result":{"words":["врфывгшфрышргрфывшгфрывшгфрывгшфрвгфрывгфрывшр","Бремя","фырвгф",null,"Холод","вошыфщврщ","Дерево","СОКРОВИЩЕ","СКУКА","вфыовшфщывфыв",null,null,null,null,null,"вфывфывфывфывфвфыфыв "]},"end_time":1588516207279},{"_id":"5eaed602b20755216ce63c7c","start_time":1588516278283,"result":{"0":{"number":"","text":"ЯЙЦО"},"1":{"number":"","text":"свеЧА"},"2":{"number":"3","text":"фырвгш"},"3":{"number":"17","text":"012891977"},"4":{"number":"7в","text":"в87нрвфывпфрывпфыв"},"5":{"number":"5","text":"фыов флыв офлд лдф "},"6":{"number":"6","text":"змея"},"7":{"number":"81","text":"            овраг  "},"8":{"number":"12","text":""},"9":{"number":"","text":""}},"end_time":1588516343854},{"_id":"5eaed602b20755216ce63c7b","start_time":1588516343854,"result":{"0":{"captions":"","words":""},"1":{"captions":"фывфыв","words":"фывфыв"},"2":{"captions":"","words":"вфыв"},"3":{"captions":"","words":""},"4":{"captions":"","words":""}},"end_time":1588516354943},{"_id":"5eaed602b20755216ce63c7a","start_time":1588516354943}],"end_time":1588516354943}


class Results extends React.Component {



    nothing = () => {};

    getTable = index => {
        return <RTable index={index} task={
            this.props.user.tasks[index]
            //__user__.tasks[index]
        }/>;
    };

    render() {
        const {user} = this.props;
        //const user = __user__;
        return <div className="results">
            <div className="results-container">
                <RHeader user={user}/>
                <Task1_1 result={user.tasks[2].result} checking={checkResults(2, user.tasks[2])} finished={true} fResults={this.getTable(2)} onChange={this.nothing} timeOut={true} marginBottom={-13}/>
                <Task1_2 result={user.tasks[3].result} checking={checkResults(3, user.tasks[3])} finished={true} fResults={this.getTable(3)} onChange={this.nothing} timeOut={true} marginBottom={-13}/>
                <Task2 result={user.tasks[4].result} checking={checkResults(4, user.tasks[4])} finished={true} fResults={this.getTable(4)} onChange={this.nothing} timeOut={true} marginBottom={47}/>
                <Task3 result={user.tasks[5].result} checking={checkResults(5, user.tasks[5])} finished={true} fResults={this.getTable(5)} onChange={this.nothing} timeOut={true} marginBottom={-28}/>
                <Task4 result={user.tasks[6].result} finished={true} fResults={null} onChange={this.nothing} timeOut={true} marginBottom={5}/>
            </div>
        </div>
    }
}

export default Results;