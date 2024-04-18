import { Grid } from '@material-ui/core';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const Profile = ({loggedInUser, updateLoggedInUser, notify}) => {
    const [currentField, setCurrentField] = useState('');
    const [newUser, setNewUser] = useState(loggedInUser ?? {});
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    const onEditClick = (key) => {
        setCurrentField(key);
    }

    const onSaveClick = () => {
        updateLoggedInUser(newUser);
        const currentFieldToTitleCase = currentField.charAt(0).toUpperCase() + currentField.slice(1);
        notify(`${currentFieldToTitleCase} updated successfully`, 'success');
        setCurrentField('');
    }

    const onChange = (e) => {
        setNewUser({...newUser, [currentField]: e.target.value});
    }

    const onDeleteClick = () => {
        console.log('delete clicked');
        setShowConfirmation(true);
        console.log(showConfirmation);
    }

    const onConfirmation = (response) => {
        if(response) {
            updateLoggedInUser(null);
        }
        setShowConfirmation(false);
    }

    const detailTile = (label, value) => {
        return (
            <Grid key={label} item sm={4}>
                <div className="detail-tile">
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <h2>{label.charAt(0).toUpperCase() + label.slice(1)} </h2>
                        {
                            (label !== "created") && 
                                <BorderColorIcon 
                                    sx={{color: 'white', mt: 3, cursor: 'pointer', ':hover': {color: 'black'}}} 
                                    onClick={() => onEditClick(label)}                           
                                />
                        }
                    </div>
                    { 
                        label === currentField ? 
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <input 
                                type={label === "password" ? "password" : "text"} 
                                value={newUser[label]} onChange={onChange} 
                                onKeyDown={(e) => e.key === 'Enter' && onSaveClick()}
                            />
                            <button onClick={() => onSaveClick()}>Save</button>
                        </div>
                        :
                        <p style={{textAlign: 'center'}}>{value}</p>
                    }
                </div>
            </Grid>
        )
    }
    
    return (
        <div>
            <h1 className='page-title'>Profile</h1>
            {
                loggedInUser ? 
                <div>
                    <Grid container>
                        {Object.keys(newUser).map((key, index) => {
                            if(key === "id") {
                                return null;
                            } else if(key !== 'password') {
                                return detailTile(key, newUser[key]);
                            } else {
                                return detailTile(key, '********')
                            }  
                        })}
                    </Grid>
                </div> 
                : 'No user logged in. Please sign in.'
            }
            {
                showConfirmation ?
                <div className="confirmation">
                    <div style={{paddingTop: '8px', marginRight: '40px', fontSize: '20px', color: "#3a5a40"}}> 
                        Are you sure you want to delete this user? 
                    </div>
                    <div>
                        <Grid container>
                            <Grid item sm={6} style={{paddingRight: '50px', cursor: 'pointer'}}>
                                <CheckIcon fontSize={'large'} style={{color: 'green'}} onClick={() => onConfirmation(true)}/>                   
                            </Grid>
                            <Grid item sm={6} style={{cursor: 'pointer'}}>
                                <CloseIcon fontSize={'large'} style={{color: 'red'}} onClick={() => setShowConfirmation(false)}/>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                :
                <div className="delete-button" onClick={() => onDeleteClick()}>
                    <Grid container >
                        <Grid item sm={10} style={{paddingTop: '5px'}}>
                            Delete User
                        </Grid>
                        <Grid item sm={2}>
                            <DeleteIcon/>
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );
}

export default Profile;