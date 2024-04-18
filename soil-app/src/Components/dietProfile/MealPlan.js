import { useState, useEffect } from 'react';
import { getItem } from '../../Utils/storageHelper.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MealPlan = ({profile, setMealPlan}) => {
    const [mealOptions, setMealOptions] = useState({});
    const [selectedType, setSelectedType] = useState('');
    const [selectedMeal, setSelectedMeal] = useState('');

    useEffect(() => {
        const options = getItem('mealOptions') ?? {}; 
        setMealOptions( filterOptions(options[profile.data.goal]) );  
    }, []);

    const filterOptions = (options) => {
        // Filter out meals that don't meet dietary preferences
        Object.keys(options).forEach((mealType) => {
            options[mealType] = options[mealType].filter((meal) => {
                let valid = true;
                profile.data.dietaryPreferences.forEach((preference) => {       
                    if(!meal[camelCase(preference)]) {
                        valid = false;
                    }
                });
                return valid;
            });
        });
        return options;
    }

    function camelCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    const onSelectChange = (e, type) => {
        setSelectedMeal({...selectedMeal, [type]: e.target.value});
        setSelectedType('');
    }

    return (
        <div>
            <div style={{paddingTop: '20px', cursor:'pointer'}} onClick={() => setMealPlan(null)}>
                <ArrowBackIcon fontSize='large'/>
            </div>
            <h1 className='page-title'>Meal Plans for <span style={{textDecoration: 'underline', color: '#3a5a40'}}>{profile.name}</span></h1>
            <div style={{width: '60%', margin: 'auto'}}>
                {
                    Object.keys(mealOptions).map((mealType) => {
                        return (
                            <div key={mealType}>
                                <h2 style={{color: '#3a5a40', marginTop: '50px'}}>{mealType}</h2>
                                <div>
                                    { 
                                        selectedType === mealType ? 
                                        <div style={{display: 'flex'}}>
                                            <select style={{marginBottom: '10px', width: '100%'}} onChange={(e) => onSelectChange(e, mealType)}>
                                                {
                                                    mealOptions[mealType].map((option, index) => {
                                                        return <option key={index} value={option.name}>{option.name} - Calories: {option.calories}</option>
                                                    })
                                                }
                                            </select>
                                            <div 
                                                style={{marginTop: '15px', marginLeft: '30px', color: 'red', fontSize: '24px', cursor: 'pointer'}}
                                                onClick={() => setSelectedType('')}
                                            >
                                                X
                                            </div>
                                        </div>
                                        :
                                        mealOptions[mealType].map((meal, index) => {                                       
                                            if((!selectedMeal[mealType] && index === 0) || selectedMeal[mealType] === meal.name) return (
                                                <div key={index} style={{marginBottom: '10px', display: 'flex', justifyContent: 'space-between', width:'100%'}}>
                                                    <div>
                                                        <div style={{fontWeight: '600', marginBottom: '5px'}}>{meal.name}</div>
                                                        <div>
                                                            <span style={{fontWeight: '600'}}>Calories: </span>
                                                            <span>{meal.calories}</span>
                                                        </div>
                                                    </div>
                                                    {
                                                        mealOptions[mealType].length > 1 && 
                                                        <div  
                                                            className="option-button" 
                                                            style={{
                                                                fontWeight: '700', 
                                                                backgroundColor: '#3a5a40', 
                                                                color: 'white', 
                                                                padding: '10px 15px', 
                                                                borderRadius: '5px',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => setSelectedType(mealType)}
                                                        >
                                                            Change Option
                                                        </div>
                                                    }
                                                </div>
                                            )
                                            else return '';
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MealPlan;