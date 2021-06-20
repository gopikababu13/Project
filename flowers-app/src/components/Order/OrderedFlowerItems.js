import React from 'react'
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { List, Paper, InputBase, IconButton, makeStyles, ListItemSecondaryAction, ButtonGroup, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { roundTo2DecimalPoint } from "../../utils";

const useStyles = makeStyles(theme =>({
    paperRoot: {
        margin: '15px 0px',
        '&:hover': {
            cursor: 'pointer'
        },
        '&:hover $deleteButton': {
            display: 'block'
        }
    },
    buttonGroup: {
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        '& .MuiButtonBase-root ': {
            border: 'none',
            minWidth: '25px',
            padding: '1px'
        },
        '& button:nth-child(2)': {
            fontSize: '1.2em',
            color: '#000'
        }
    },
    deleteButton: {
        display: 'none',
        '& .MuiButtonBase-root': {
            color: '#E81719'
        },
    },
    totalPerItem: {
        fontWeight: 'bolder',
        fontSize: '1.2em',
        margin: '0px 10px'
    }
}))
export default function OrderedFlowerItems(props) {

    const { values, setValues } = props;
    const classes = useStyles();

    let orderedFlowerItems = values.orderDetails;

    const removeFlowerItem = (index, id) =>{
        let x ={...values};
        x.orderDetails = x.orderDetails.filter((_, i) => i != index);
        if (id != 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });

    }

    const updateQuantity =(idx, value) => {
        let x = { ...values };
        let flowerItem = x.orderDetails[idx];
        if (flowerItem.quantity + value > 0) {
            flowerItem.quantity += value;
            setValues({ ...x });
        }
    }

    return (
        <List>
            {orderedFlowerItems.length == 0 ?
                <ListItem>
                    <ListItemText
                        primary="Select flower"
                        primaryTypographyProps={{
                            style: {
                                textAlign: 'center',
                                fontStyle: 'italic'
                            }
                        }}
                    />
                </ListItem>
            : orderedFlowerItems.map((item,idx)=>(
                <Paper key={idx} className={classes.paperRoot}>
                <ListItem>
                    <ListItemText
                        primary={item.flowerItemNmae}
                        primaryTypographyProps={{
                            component: 'h1' ,
                            style: {
                                
                                fontWeight: '500',
                                fontSize: '1.2em'
                            }
                        }}
                        secondary={
                            <>
                                <ButtonGroup
                                    className={classes.buttonGroup}
                                    size="small">
                                    <Button
                                        onClick={e => updateQuantity(idx, -1)}
                                    >-</Button>
                                    <Button
                                        disabled
                                    >{item.quantity}</Button>
                                    <Button 
                                    onClick={e => updateQuantity(idx, +1)}
                                    >+</Button>
                                </ButtonGroup>
                                <span className={classes.totalPerItem}>
                                            {'$' + roundTo2DecimalPoint(item.quantity * item.flowerItemPrice)}
                                        </span>
                        </>
                        }
                        secondaryTypographyProps={{
                            component: 'div'
                        }}
                        />
                        <ListItemSecondaryAction
                        className={classes.deleteButton}>
                                <IconButton
                                  disableRipple
                                  onClick={e => removeFlowerItem(idx, item.orderDetailId)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                        </ListItemSecondaryAction>
                </ListItem>
                </Paper>
            ))
         }
    </List>
    )
}

