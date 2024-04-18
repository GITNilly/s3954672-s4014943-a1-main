import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { Grid } from '@material-ui/core';

const Profile = ({profile, onEditClick, expanded, onMealClick}) => {

    const dataFields = (data) => {

        const displayNames = {
            name: 'Name',
            age: 'Age',
            weight: 'Weight (kg)',
            height: 'Height (cm)',
            activityLevel: 'Activity Level',
            goal: 'Goal',
            dietaryPreferences: 'Dietary Preferences'
        }

        return Object.keys(data).map((key) => {
            if( key === 'dietaryPreferences' && data[key].length === 0 ) return null;
            if( key === 'name' ) return null;
            return (
                <Grid item sm={4} lg={key === 'dietaryPreferences' ? 6: 3} key={key} style={{marginBottom: '10px'}}>
                    <div className='data-value'>
                        <span style={{fontWeight: '600'}}>{displayNames[key]}: </span> 
                        {
                            key === 'dietaryPreferences' && data[key].length > 0 ?
                            <div>
                                {
                                    data[key].map((item, index) => {
                                        return item + (index+1 !== data[key].length ? ', ' : '');
                                    })
                                }
                            </div>
                            :
                            <span>{data[key]}</span>
                        }
                    </div>
                </Grid>
            )
        })
    }


    return(
        <div key={profile.name} style={{marginBottom: '20px'}}>
            <Accordion defaultExpanded={expanded} sx={{ backgroundColor: 'lightgrey' }}>
                <AccordionSummary
                    expandIcon={profile.name === 'Create New Profile' ? <AddIcon sx={{color: 'white'}}/> : <ExpandMoreIcon sx={{color: 'white'}}/>}
                    aria-controls={`${profile.name}-content`}
                    id={`${profile.name}-header`}
                    sx={{fontSize: '1.2rem', fontWeight: '600', backgroundColor: '#a3b18a', color: 'white', borderRadius: '5px'}}
                >
                    {profile.name}
                </AccordionSummary>
                <AccordionDetails sx={{padding: '20px'}}>
                    <Grid spacing={3} container>
                        {dataFields(profile.data)}
                    </Grid>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div className="submit dark-hover" 
                            style={{width: '20%', backgroundColor: '#a3b18a', fontWeight: '700'}} 
                            onClick={() => onMealClick(profile)}
                        >
                            Go to My Meal Plans
                        </div>
                        <div className="submit" style={{width: '10%', marginLeft: '10px'}} onClick={() => onEditClick(profile)}>
                            Edit
                        </div>
                    </div>                
                </AccordionDetails>
            </Accordion>
        </div>
    )

}

export default Profile;