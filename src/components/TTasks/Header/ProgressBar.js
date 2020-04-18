import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


const BorderLinearProgress = withStyles({
    root: {
        height: 2,
        backgroundColor: lighten('#6202EE', 0.76),
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#6202EE',
    },
})(LinearProgress);


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        width: '100%',
        bottom: -2,
        left: 0
    }
}));

export default function CustomizedProgressBars(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BorderLinearProgress
                variant="determinate"
                color="primary"
                value={props.completed}
            />
        </div>
    );
}