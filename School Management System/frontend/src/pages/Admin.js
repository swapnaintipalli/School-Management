import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SchoolCard from '../components/SchoolCard';
import SchoolForm from '../components/SchoolForm';

const Admin = () => {
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState(null);

  useEffect(() => {
    fetchSchools();
  }, []); 

  const fetchSchools = async () => {
    try {
      const response = await axios.get('http://localhost:3000/parents');
      setSchools(response.data.schools); // Assuming response data has a 'schools' array
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  const handleSave = async (editedSchool) => {
    try {
      if (editedSchool && school._id) {
        console.log("Updating existing school...");
        const response = await axios.put(`http://localhost:3000/admin/${school._id}`, editedSchool);
        console.log("Response:", response.data);
        if (response.status === 200) {
          const updatedSchools = schools.map((school) => (school._id === school._id ? school : school));
          setSchools(updatedSchools);
          setSchool(null);
          console.log("School updated successfully.");
        }
      } else {
        console.log("Creating new school...");
        const response = await axios.post('http://localhost:3000/admin/new', editedSchool);
        console.log("Response:", response.data);
        if (response.status === 201) {
          const data = response.data;
          setSchools([...schools, data]);
          setSchool(null);
          console.log("New school created successfully.");
        }
      }
    } catch (error) {
      console.error('Error saving school:', error);
    }
  };  

  const handleEdit = (schoolId, editedSchool) => {
    setSchool({ ...editedSchool, _id: schoolId });
  };

  const handleCancel = () => {
    if (school && school._id) {
      const updatedSchools = schools.filter((s) => s._id !== school._id);
      setSchools(updatedSchools);
    }
    setSchool(null);
  };

  const handleDelete = async (schoolId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/admin/${schoolId}`);
      if (response.status === 200) {
        const updatedSchools = schools.filter((s) => s._id !== schoolId);
        setSchools(updatedSchools);
      }
    } catch (error) {
      console.error('Error deleting school:', error);
    }
  };

  return (
    <div>
      <div className="school-cards-container">
        {schools.map((school) => (
          <div key={school._id}>
            <SchoolCard
              key={school._id}
              school={school}
              onEdit={() => handleEdit(school._id, { ...school })}
              onDelete={handleDelete}
              editable={true}
            />
          </div>
        ))}
      </div>
      {school ? (
        <SchoolForm school={school} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <button onClick={() => setSchool({ picture: '', name: '', fees: '', details: '' })}>
          Add School
        </button>
      )}
    </div>
  );
};

export default Admin;