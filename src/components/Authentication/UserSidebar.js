import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Avatar, Button } from '@mui/material';
import { CryptoState } from '../../CryptoContext';
import { makeStyles } from '@mui/styles';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { numberWithCommas } from '../Banner/Carousal';
import { AiFillDelete as AIFillDeleteIcon } from "react-icons/ai";
import { doc, setDoc } from 'firebase/firestore';


const useStyles = makeStyles({
  container:{
    width:350,
    height:"100%",
    padding:25,
    display:"flex",
    flexDirection:"column",
    fontfamily:"monospace",
  },
  profile:{
    flex:1,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:20,
    height:"92%",
  },
  picture:{
    width:150,
    height:150,
    cursor:"pointer",
    backgroundColor:"#EEBC1D",
    objectFit:"contain",
  },
  watchlist:{
    flex:1,
    width:"100%",
    backgroundColor:"grey",
    borderRadius:10,
    padding:10,
    paddingTop:20,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:10,
    overflowY:"scroll",
  },
  list:{
    padding:10,
    borderRadius:10,
    color:"black",
    width:"100%",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    backgroundColor:"#EEBC1D",
    boxShadow:"0 0 10px black",
  }

});

export default function UserSidebar() {

  const {user,setUser,setAlert, watchlist,coins,symbol}=CryptoState(); 
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const classes = useStyles();

  const logout=()=>{ 
    
    setUser(null);
    signOut(auth);
    setAlert({open:true, message:"Logout Successful", type:"success"});


  };

  const removeFromWatchlist= async(coin)=>{
    const coinRef= doc(db, "watchlist", user.uid);
    try{
      await setDoc(coinRef, {
        coins:watchlist.filter((watch)=> watch!==coin.id)},
        {merge:true}
      )
      setAlert({open:true, message:`${coin.name} removed from watchlist !`, type:"success"});
    } catch(error){
      setAlert({open:true, message:error.message, type:"error"});

    };
  };


  return (
    <div>

        <React.Fragment key={'right'}>
          <Avatar style={{ width: 38, height: 38, cursor: "pointer", backgroundColor:"#EEBC1D"}} onClick={toggleDrawer('right', true)}
            src={user.photoURL} alt={user.displayName || user.email}/>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar style={{width:150,
                                height:150,
                                cursor:"pointer",
                                backgroundColor:"#EEBC1D",
                                objectFit:"contain",}}
                  src={user.photoURL} alt={user.displayName || user.email}/>
                <span
                  style={{width: "100%",
                          fontSize: 25,
                          textAlign:"center",
                          fontWeight: "bolder",
                          wordWrap: "break-word"}}>
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchlist}>
                  <span style={{fontSize: 20, textShadow:"0 0 10px black"}}>Watchlist</span>
                  {coins.map((coin)=>{
                    if(watchlist.includes(coin.id)){
                      return(
                        <div className={classes.list}>
                          <img src={coin.image} alt={coin.name} height="30" width="30"/>
                          <span>{coin.name}</span>
                          <span>{symbol}{" "}{numberWithCommas(coin.current_price.toFixed(2))}</span>
                          <AIFillDeleteIcon style={{cursor:"pointer"}} fontSize="16" onClick={()=>removeFromWatchlist(coin)}/>
                        </div>
                      );
                    }
                    return null;
                    })}
                </div>
              </div>

              <Button variant="contained"
                size="large"
                style={{backgroundColor:"#EEBC1D",
                height:"8%",
                width:"100%",
                marginTop:20,}}
                onClick={logout}
                fullWidth>
                    Log Out</Button>

            </div>
          </Drawer>
        </React.Fragment>
    </div>
  );
}