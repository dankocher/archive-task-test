import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
    },
}));

export default function CircularIndeterminate(props) {
    const classes = useStyles();

    const height = props.fullScreen !== false ? '100vh' : "380px";

    return (
            <div className={classes.root} style={{height: props.height || height}}>
                <CircularProgress color="primary" />
            </div>
    );
}