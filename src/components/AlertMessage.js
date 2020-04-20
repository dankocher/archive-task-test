import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DraggableDialog(props) {

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                <DialogContent style={{padding: 0, width: 500}}>
                    <DialogContentText style={{padding: "35px 66px 35px 40px"}}>
                        {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{padding: '0px 29px 17px'}}>
                    <Button onClick={props.onClose} color="primary">
                        Понятно
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}