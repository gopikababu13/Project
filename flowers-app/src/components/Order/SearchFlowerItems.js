import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { List, Paper, InputBase, IconButton, makeStyles, ListItemSecondaryAction } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import FindInPageIcon from '@material-ui/icons/FindInPage';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex: 1,
    },
    listRoot: {
        marginTop: theme.spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000',
        },
        '& .MuiButtonBase-root': {
            display: 'none'
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'
        }
    }
}))

export default function SearchFlowerItems(props) {

    const { values, setValues} =props;

    let orderedFlowerItems = values.orderDetails;

    const [flowerItems, setFlowerItems] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const classes = useStyles();

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.FOODITEM).fetchAll()
            .then(res => {
                setFlowerItems(res.data);
                setSearchList(res.data);
            })
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        let x = [...flowerItems];
        x = x.filter(y => {
            return y.flowerItemName.toLowerCase().includes(searchKey.toLocaleLowerCase())
            && orderedFlowerItems.every(item => item.flowerItemId != y.flowerItemId)    

        });
        setSearchList(x);
    }, [searchKey, orderedFlowerItems])

    const addFlowerItem = flowerItem =>{
        let x ={
            orderMasterId : values.orderMasterId,
            orderDetailId : 0,
            flowerItemId : flowerItem.flowerItemId,
            quantity :1,
            flowerItemPrice :flowerItem.flowerItemPrice,
            flowerItemName : flowerItem.flowerItemName
        }
        setValues({
            ...values,
            orderDetails: [...values.orderDetails, x]
        })
    }

    return (
        <>
        <Paper className={classes.searchPaper}>
                <InputBase
                    className={classes.searchInput}
                    value={searchKey}
                    onChange={e => setSearchKey(e.target.value)}
                    placeholder="Search Flowers" />
                <IconButton>
                    <FindInPageIcon />
                </IconButton>
        </Paper>
        <List className={classes.listRoot}>
            {
                searchList.map((item, idx) => (
                    <ListItem
                    key={idx}
                    onClick={e =>addFlowerItem(item)}>
                        <ListItemText
                        primary = {item.flowerItemName}
                        secondary = {item.price} />
                        <ListItemSecondaryAction>
                                <IconButton onClick={e =>addFlowerItem(item)}>
                                    <AddIcon />
                                    
                                </IconButton>
                            </ListItemSecondaryAction>
                    </ListItem>
                ))
            }
        </List>
        </>
    )
}
