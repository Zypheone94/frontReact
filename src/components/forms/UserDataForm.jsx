import React, { useState } from 'react';

const UserDataForm = ({ user, onUpdate }) => {

    const [formData, setFormData] = useState(user);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                <div className="flex justify-between mt-8 text-center
                md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '100px'
                    }}>Nom</label>
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Nom"
                        required
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="w-3/4 p-1 md:w-2/4"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>
                <div className="flex justify-between mt-8 text-center
                md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '100px'
                    }}>Prénom</label>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="Prénom"
                        required
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="w-3/4 p-1 md:w-2/4"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>

                <button type="submit" className="mt-8 text-right duration-200
                md:mt-12
                hover:text-pink">Enregistrer</button>
            </form>
        </>
    );
};

export default UserDataForm;
