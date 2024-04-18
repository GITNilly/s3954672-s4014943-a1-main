import { Grid } from "@material-ui/core";
import { useState } from "react";
import * as yup from 'yup';

const ProfileForm = ({addUserProfile, data, notify}) => {

    const formFields = [
        { 
            name: 'name',
            displayName: 'Profile Name',
            type: 'text'
        },

        { 
            name: 'age',
            displayName: 'Age',
            type: 'number'
        },

        { 
            name: 'weight',
            displayName: 'Weight (kg)',
            type: 'number'
        },

        { 
            name: 'height',
            displayName: 'Height (cm)',
            type: 'number'
        },

        { 
            name: 'activityLevel',
            displayName: 'Activity Level',
            type: 'select',
            options: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active']
        },

        { 
            name: 'goal',
            displayName: 'Goal',
            type: 'select',
            options: ['Lose Weight', 'Gain Muscle', 'Improve Fitness', 'Maintain Weight']
        },

        { 
            name: 'dietaryPreferences',
            displayName: 'Dietary Preferences',
            type: 'radio',
            options: ['Vegan', 'Vegetarian', 'Gluten Free', 'Lactose Free']
        },
    ];

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        weight: '',
        height: '',
        activityLevel: '',
        goal: '',
        dietaryPreferences: [],
        ...data
    });
    
    const formSchema = yup.object().shape({
        name: yup.string().required('Plan Name is required'),
        age: yup.number().required('Age is required').positive('Age must be positive'),
        weight: yup.number().required('Weight is required').positive('Weight must be positive'),
        height: yup.number().required('Height is required').positive('Height must be positive'),
        activityLevel: yup.string().required('Activity Level is required'),
        goal: yup.string().required('Goal is required'),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleRadioChange = (option) => {
        if(formData.dietaryPreferences.includes(option)) {
            setFormData({...formData, dietaryPreferences: formData.dietaryPreferences.filter((preference) => preference !== option)});
        } else {
            setFormData({...formData, dietaryPreferences: [...formData.dietaryPreferences, option]});
        }
    }

    const getFormField = (field) => {
        switch (field.type) {
            case 'text':
            case 'number':
                return (
                    <Grid item sm={12} lg={3} key={field.name}>
                        <div className="label-for"><label htmlFor={field.name}>{field.displayName}</label></div>
                        <input type={field.type} id={field.name} name={field.name} value={formData[field.name]} onChange={handleChange} required />
                    </Grid>
                );
            case 'select':
                return (
                    <Grid item sm={6} lg={4} key={field.name}>
                        <div className="label-for"><label htmlFor={field.name}>{field.displayName}</label></div>
                        <select id={field.name} name={field.name} value={formData[field.name]} onChange={handleChange} required>
                            <option value=''>Select an option</option>
                            {field.options.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </Grid>
                );
            case 'radio':
                return (
                    <Grid item sm={6} lg={4} key={field.name}>
                        <div className="label-for"><label htmlFor={field.name}>{field.displayName}</label></div>
                        <Grid container spacing={1} style={{ marginTop: '10px' }}>
                            {field.options.map((option) => (
                                <Grid item sm={6} key={option}>
                                    <div className={`radio-button ${formData.dietaryPreferences.includes(option) ? 'checked' : ''}`} name="preferences" onClick={() => handleRadioChange(option)}>{option}</div>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                );
            default:
                return null;
        }
    }

    const handleSubmit = async () => {
        try {
            await formSchema.validate(formData, { abortEarly: false });
            addUserProfile(formData);
        } catch (error) {
            console.log(error.errors);
            notify('Please fill in all fields', 'error');
        }
    }

    return (
        <div className="form-container">
            <Grid container>
                {formFields.map((field) => (
                    getFormField(field)
                ))}
            </Grid>
            <div className="submit" style={{ marginTop: '60px' }} onClick={handleSubmit}>Save</div>
        </div>
    );
}

export default ProfileForm;
    